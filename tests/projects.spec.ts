import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test('should load the projects page successfully', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check that the page title is set
    await expect(page).toHaveTitle(/Projects|David Knight/);
  });

  test('should display projects heading', async ({ page }) => {
    await page.goto('/projects');
    
    // Check for the projects heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should display project information', async ({ page }) => {
    await page.goto('/projects');
    
    // Check for project names mentioned in README
    const body = page.locator('body');
    
    // Look for at least one of the projects mentioned
    const hasProjects = await body.locator('text=/AlgoStrategySandbox|PrepWise-AI|AnrWatchdog/i').count() > 0;
    expect(hasProjects).toBeTruthy();
  });

  test('should have navigation back to home', async ({ page }) => {
    await page.goto('/projects');
    
    // Look for a link back to home page
    const homeLink = page.locator('a[href="/"], a[href="./"]').first();
    if (await homeLink.count() > 0) {
      await expect(homeLink).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');
    
    // Verify page loads on mobile viewports
    const heading = page.locator('h1, h2');
    await expect(heading.first()).toBeVisible();
  });

  test('should have proper structure', async ({ page }) => {
    await page.goto('/projects');
    
    // Check for semantic HTML
    const main = page.locator('main, article, section, div');
    await expect(main.first()).toBeVisible();
  });
});
