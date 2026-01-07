#!/bin/bash

# Script to detect and resolve merge conflicts in pull requests
# This script is designed to be run by GitHub Actions on a schedule

# Note: Not using 'set -e' to allow graceful error handling with specific exit codes
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
    
    # Get open PRs using GitHub CLI (using tab as delimiter to avoid issues with colons in branch names)
    # jq query: filter for conflicting PRs and format as: number<TAB>headBranch<TAB>baseBranch
    local jq_query='.[] | select(.mergeable == "CONFLICTING") | "\(.number)\t\(.headRefName)\t\(.baseRefName)"'
    local prs=$(gh pr list --state open --json number,headRefName,baseRefName,mergeable --jq "$jq_query")
    
    if [ -z "$prs" ]; then
        log_info "No pull requests with conflicts found"
        return $EXIT_NO_CONFLICTS
    fi
    
    echo "$prs"
    return $EXIT_SUCCESS
}

# Function to get default branch
get_default_branch() {
    # Try to get the default branch from origin/HEAD
    local default_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
    
    if [ -n "$default_branch" ]; then
        echo "$default_branch"
    else
        # Fallback to common default branch names
        for branch in main master develop; do
            if git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
                echo "$branch"
                return
            fi
        done
        # Last resort: return 'main'
        echo "main"
    fi
}

# Function to escape markdown special characters
escape_markdown() {
    local text="$1"
    # Escape backslashes first
    text="${text//\\/\\\\}"
    # Escape backticks
    text="${text//\`/\\\`}"
    # Escape asterisks
    text="${text//\*/\\\*}"
    # Escape underscores
    text="${text//_/\\_}"
    # Escape square brackets
    text="${text//\[/\\\[}"
    text="${text//\]/\\\]}"
    # Escape parentheses
    text="${text//\(/\\\(}"
    text="${text//\)/\\\)}"
    # Escape hash/pound
    text="${text//#/\\\#}"
    echo "$text"
}

# Function to attempt merge conflict resolution
resolve_conflicts() {
    local pr_number=$1
    local head_branch=$2
    local base_branch=$3
    
    log_info "Processing PR #$pr_number: $head_branch -> $base_branch"
    
    # Store the current branch (compatible with older Git versions)
    local original_branch=$(git rev-parse --abbrev-ref HEAD)
    
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
            local escaped_base_branch=$(escape_markdown "$base_branch")
            
            # Add a comment to the PR
            gh pr comment "$pr_number" --body "🤖 **Auto-Resolved Merge Conflicts**

Merge conflicts have been automatically resolved by merging the latest changes from \`${escaped_base_branch}\`.

Please review the changes to ensure they are correct." || log_warning "Failed to add comment to PR"
            
            # Cleanup with explicit logging
            if ! git checkout "$original_branch" 2>/dev/null; then
                log_warning "Failed to return to original branch, switching to default"
                git checkout "$(get_default_branch)" 2>/dev/null || true
            fi
            git branch -D "$temp_branch" || true
            
            return $EXIT_SUCCESS
        else
            log_error "Failed to push resolved changes"
            if ! git checkout "$original_branch" 2>/dev/null; then
                log_warning "Failed to return to original branch, switching to default"
                git checkout "$(get_default_branch)" 2>/dev/null || true
            fi
            git branch -D "$temp_branch" || true
            return $EXIT_RESOLUTION_FAILED
        fi
    else
        # Merge conflicts occurred
        log_warning "Merge conflicts detected in PR #$pr_number"
        
        # Check for specific conflict types that can be auto-resolved
        local conflicted_files=$(git diff --name-only --diff-filter=U)
        
        if [ -n "$conflicted_files" ]; then
            log_info "Conflicted files:"
            while read -r file; do
                log_info "  - $file"
            done <<< "$conflicted_files"
        else
            log_warning "No conflicted files found in diff (unexpected state)"
            conflicted_files="(Unable to determine conflicted files)"
        fi
        
        # Abort the merge
        git merge --abort
        
        # Checkout back to original branch with explicit logging
        if ! git checkout "$original_branch" 2>/dev/null; then
            log_warning "Failed to return to original branch, switching to default"
            git checkout "$(get_default_branch)" 2>/dev/null || true
        fi
        git branch -D "$temp_branch" || true
        
        # Escape variables for markdown to prevent injection
        local escaped_base_branch=$(escape_markdown "$base_branch")
        local escaped_files=$(escape_markdown "$conflicted_files")
        
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
    
    # Note: Git configuration is handled by the GitHub Actions workflow
    # This allows the script to work both in CI and locally
    if [ -z "$(git config --global user.name)" ]; then
        log_info "Configuring git..."
        git config --global user.name "github-actions[bot]"
        git config --global user.email "github-actions[bot]@users.noreply.github.com"
    fi
    
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
    
    # Process each PR with conflicts (using tab as delimiter)
    while IFS=$'\t' read -r pr_number head_branch base_branch; do
        total_prs=$((total_prs + 1))
        
        log_info "----------------------------------------"
        resolve_conflicts "$pr_number" "$head_branch" "$base_branch"
        local result=$?
        
        if [ $result -eq $EXIT_SUCCESS ]; then
            resolved_prs=$((resolved_prs + 1))
        elif [ $result -eq $EXIT_CONFLICT_DETECTED ]; then
            manual_prs=$((manual_prs + 1))
        else
            failed_prs=$((failed_prs + 1))
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
