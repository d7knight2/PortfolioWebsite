#!/bin/bash

# Script to detect and resolve merge conflicts in pull requests
# This script is designed to be run by GitHub Actions on a schedule

set -e  # Exit on error
set -o pipefail  # Catch errors in pipes

# Color codes for logging
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Exit codes
EXIT_SUCCESS=0
EXIT_NO_CONFLICTS=0  # No conflicts found is also success
EXIT_CONFLICT_DETECTED=1
EXIT_RESOLUTION_FAILED=2
EXIT_VALIDATION_FAILED=3
EXIT_MISSING_REQUIREMENTS=4

# Function to check requirements
check_requirements() {
    log_info "Checking requirements..."
    
    if ! command -v git &> /dev/null; then
        log_error "git is not installed"
        return $EXIT_MISSING_REQUIREMENTS
    fi
    
    if ! command -v gh &> /dev/null; then
        log_error "GitHub CLI (gh) is not installed"
        return $EXIT_MISSING_REQUIREMENTS
    fi
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a git repository"
        return $EXIT_MISSING_REQUIREMENTS
    fi
    
    log_success "All requirements met"
    return $EXIT_SUCCESS
}

# Function to get open pull requests
get_open_prs() {
    log_info "Fetching open pull requests..."
    
    # Get open PRs using GitHub CLI
    local prs=$(gh pr list --state open --json number,headRefName,baseRefName,mergeable --jq '.[] | select(.mergeable == "CONFLICTING") | "\(.number):\(.headRefName):\(.baseRefName)"')
    
    if [ -z "$prs" ]; then
        log_info "No pull requests with conflicts found"
        return $EXIT_NO_CONFLICTS
    fi
    
    echo "$prs"
    return $EXIT_SUCCESS
}

# Function to attempt merge conflict resolution
resolve_conflicts() {
    local pr_number=$1
    local head_branch=$2
    local base_branch=$3
    
    log_info "Processing PR #$pr_number: $head_branch -> $base_branch"
    
    # Store the current branch
    local original_branch=$(git branch --show-current)
    
    # Create a temporary working branch with timestamp and PID for uniqueness
    local temp_branch="auto-resolve-conflicts-pr-$pr_number-$(date +%s)-$$"
    
    log_info "Creating temporary branch: $temp_branch"
    
    # Fetch the latest changes
    git fetch origin "$base_branch" || {
        log_error "Failed to fetch base branch $base_branch"
        return $EXIT_RESOLUTION_FAILED
    }
    
    git fetch origin "$head_branch" || {
        log_error "Failed to fetch head branch $head_branch"
        return $EXIT_RESOLUTION_FAILED
    }
    
    # Checkout and create the temporary branch from head
    git checkout -b "$temp_branch" "origin/$head_branch" || {
        log_error "Failed to create temporary branch"
        return $EXIT_RESOLUTION_FAILED
    }
    
    log_info "Attempting to merge $base_branch into $head_branch..."
    
    # Try to merge the base branch
    if git merge "origin/$base_branch" --no-edit; then
        log_success "Merge successful with no conflicts!"
        
        # Push the resolved changes back to the head branch
        log_info "Pushing resolved changes to $head_branch..."
        if git push origin "$temp_branch:$head_branch"; then
            log_success "Successfully pushed resolved changes for PR #$pr_number"
            
            # Escape variables for markdown to prevent injection
            local escaped_base_branch="${base_branch//\\/\\\\}"
            escaped_base_branch="${escaped_base_branch//\`/\\\`}"
            
            # Add a comment to the PR
            gh pr comment "$pr_number" --body "🤖 **Auto-Resolved Merge Conflicts**

Merge conflicts have been automatically resolved by merging the latest changes from \`${escaped_base_branch}\`.

Please review the changes to ensure they are correct." || log_warning "Failed to add comment to PR"
            
            # Cleanup
            git checkout "$original_branch" 2>/dev/null || git checkout main 2>/dev/null || true
            git branch -D "$temp_branch" || true
            
            return $EXIT_SUCCESS
        else
            log_error "Failed to push resolved changes"
            git checkout "$original_branch" 2>/dev/null || git checkout main 2>/dev/null || true
            git branch -D "$temp_branch" || true
            return $EXIT_RESOLUTION_FAILED
        fi
    else
        # Merge conflicts occurred
        log_warning "Merge conflicts detected in PR #$pr_number"
        
        # Check for specific conflict types that can be auto-resolved
        local conflicted_files=$(git diff --name-only --diff-filter=U)
        log_info "Conflicted files:"
        echo "$conflicted_files" | while read -r file; do
            log_info "  - $file"
        done
        
        # Abort the merge
        git merge --abort
        
        # Checkout back to original branch
        git checkout "$original_branch" 2>/dev/null || git checkout main 2>/dev/null || true
        git branch -D "$temp_branch" || true
        
        # Escape variables for markdown to prevent injection
        local escaped_base_branch="${base_branch//\\/\\\\}"
        escaped_base_branch="${escaped_base_branch//\`/\\\`}"
        local escaped_files="${conflicted_files//\\/\\\\}"
        escaped_files="${escaped_files//\`/\\\`}"
        
        # Add a comment to notify about conflicts
        gh pr comment "$pr_number" --body "⚠️ **Merge Conflicts Detected**

This pull request has merge conflicts with the \`${escaped_base_branch}\` branch that require manual resolution.

**Conflicted files:**
\`\`\`
${escaped_files}
\`\`\`

Please resolve these conflicts manually." || log_warning "Failed to add comment to PR"
        
        return $EXIT_CONFLICT_DETECTED
    fi
}

# Main function
main() {
    log_info "Starting merge conflict resolution check..."
    log_info "Timestamp: $(date)"
    
    # Check requirements
    if ! check_requirements; then
        log_error "Requirements check failed"
        exit $EXIT_MISSING_REQUIREMENTS
    fi
    
    # Configure git
    git config --global user.name "github-actions[bot]"
    git config --global user.email "github-actions[bot]@users.noreply.github.com"
    
    # Get open PRs with conflicts
    local conflicting_prs=$(get_open_prs)
    local exit_code=$?
    
    if [ $exit_code -eq $EXIT_NO_CONFLICTS ]; then
        log_success "No conflicts to resolve. Exiting."
        exit $EXIT_SUCCESS
    fi
    
    # Track resolution results
    local total_prs=0
    local resolved_prs=0
    local failed_prs=0
    local manual_prs=0
    
    # Process each PR with conflicts
    while IFS=':' read -r pr_number head_branch base_branch; do
        total_prs=$((total_prs + 1))
        
        log_info "----------------------------------------"
        if resolve_conflicts "$pr_number" "$head_branch" "$base_branch"; then
            resolved_prs=$((resolved_prs + 1))
        else
            case $? in
                $EXIT_CONFLICT_DETECTED)
                    manual_prs=$((manual_prs + 1))
                    ;;
                *)
                    failed_prs=$((failed_prs + 1))
                    ;;
            esac
        fi
    done <<< "$conflicting_prs"
    
    log_info "----------------------------------------"
    log_info "Summary:"
    log_info "  Total PRs with conflicts: $total_prs"
    log_success "  Auto-resolved: $resolved_prs"
    log_warning "  Manual resolution needed: $manual_prs"
    log_error "  Failed: $failed_prs"
    
    # Exit with appropriate code
    if [ $resolved_prs -gt 0 ] || [ $manual_prs -gt 0 ]; then
        log_info "Conflict resolution workflow completed"
        exit $EXIT_SUCCESS
    elif [ $failed_prs -gt 0 ]; then
        log_error "Some resolutions failed"
        exit $EXIT_RESOLUTION_FAILED
    else
        log_success "No conflicts found"
        exit $EXIT_SUCCESS
    fi
}

# Run main function
main "$@"
