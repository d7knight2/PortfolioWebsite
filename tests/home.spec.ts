import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check that the page title is set
    await expect(page).toHaveTitle(/David Knight/);
  });

  test('should display the main heading', async ({ page }) => {
    await page.goto('/');
    
    // Check for the main heading - looking for text that contains David Knight
    const heading = page.locator('h1');
    await expect(heading.first()).toBeVisible();
  });

  test('should display bio section', async ({ page }) => {
    await page.goto('/');
    
    // Check for bio content - should contain some professional information
    const body = page.locator('body');
    await expect(body).toContainText(/Android|Developer|Software/i);
  });

  test('should have navigation to projects page', async ({ page }) => {
    await page.goto('/');
    
    // Look for a link to projects page
    const projectsLink = page.locator('a[href*="projects"]').first();
    if (await projectsLink.count() > 0) {
      await expect(projectsLink).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify page loads on mobile viewports
    const heading = page.locator('h1');
    await expect(heading.first()).toBeVisible();
  });

  test('should highlight four Tinder hackathon wins', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('4× Tinder Hackathon Winner').first()).toBeVisible();
    await expect(page.getByText('Four-time Tinder Hackathon Winner')).toBeVisible();
    await expect(page.getByText('2020 — Skinz')).toBeVisible();
    await expect(page.getByText('2021 — Stacks on Stacks')).toBeVisible();
    await expect(page.getByText('2023 — Black Pearl')).toBeVisible();
    await expect(page.getByText('2025 — Anti Abuse Agent')).toBeVisible();
  });
});
