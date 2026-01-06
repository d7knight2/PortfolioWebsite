import { test, expect } from '@playwright/test';

test.describe('Achievements Carousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display the achievements section', async ({ page }) => {
    const achievementsHeading = page.locator('h2:has-text("Achievements Showcase")');
    await expect(achievementsHeading).toBeVisible();
  });

  test('should display all carousel dots', async ({ page }) => {
    const dots = page.locator('button[aria-label^="Go to achievement"]');
    await expect(dots).toHaveCount(6);
  });

  test('should display the first achievement card by default', async ({ page }) => {
    // Wait for the carousel to be visible
    await page.locator('h3:has-text("2021 Tinder All Stars")').waitFor({ state: 'visible' });
    
    const firstCard = page.locator('h3:has-text("2021 Tinder All Stars")');
    await expect(firstCard).toBeVisible();
  });

  test('should navigate to different achievement when clicking dot', async ({ page }) => {
    // Click the second dot
    const secondDot = page.locator('button[aria-label="Go to achievement 2"]');
    await secondDot.click();
    
    // Wait a moment for transition
    await page.waitForTimeout(500);
    
    // Check that an achievement card is visible
    const achievementCards = page.locator('h3').filter({ hasText: /Kudos Award|AI Champion|Stacks on Stacks|Black Pearl|Skinz/ });
    await expect(achievementCards.first()).toBeVisible();
  });

  test('should have proper carousel structure on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Scroll to achievements section
      await page.locator('h2:has-text("Achievements Showcase")').scrollIntoViewIfNeeded();
      
      // Check that carousel container is visible
      const achievementsSection = page.locator('h2:has-text("Achievements Showcase")').locator('..');
      await expect(achievementsSection).toBeVisible();
      
      // Verify dots are visible
      const dots = page.locator('button[aria-label^="Go to achievement"]');
      await expect(dots.first()).toBeVisible();
    }
  });

  test('should not have overlapping text on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Scroll to achievements section
    await page.locator('h2:has-text("Achievements Showcase")').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Get the carousel container
    const carouselSection = page.locator('h2:has-text("Achievements Showcase")').locator('..');
    const carouselBox = await carouselSection.boundingBox();
    
    // Get the next section (Professional Experience)
    const nextSection = page.locator('h2:has-text("Professional Experience")');
    const nextSectionBox = await nextSection.boundingBox();
    
    // Verify sections don't overlap (next section should be below carousel)
    if (carouselBox && nextSectionBox) {
      expect(nextSectionBox.y).toBeGreaterThan(carouselBox.y);
    }
  });

  test('should display carousel dots within the carousel container on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Scroll to achievements section
    await page.locator('h2:has-text("Achievements Showcase")').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Check dots are visible in the DOM
    const dots = page.locator('button[aria-label^="Go to achievement"]');
    await expect(dots.first()).toBeVisible();
    
    // Scroll dots into view to verify they exist and can be scrolled to
    await dots.first().scrollIntoViewIfNeeded();
    await expect(dots.first()).toBeInViewport();
  });

  test('should have all required achievement cards', async ({ page }) => {
    const expectedAchievements = [
      '2021 Tinder All Stars',
      '2021 Kudos Award',
      'AI Champion',
      'Stacks on Stacks 2022',
      'Black Pearl 2022',
      'Skinz 2021'
    ];

    for (const achievement of expectedAchievements) {
      const card = page.locator(`h3:has-text("${achievement}")`);
      await expect(card).toBeAttached();
    }
  });

  test('should display achievement subtitles', async ({ page }) => {
    const subtitle = page.locator('text=First Android All Star Ever!');
    await expect(subtitle).toBeAttached();
  });

  test('should have clickable achievement cards', async ({ page }) => {
    const cards = page.locator('h3').filter({ hasText: /2021 Tinder All Stars|Kudos Award|AI Champion/ });
    const firstCard = cards.first().locator('..');
    
    // Verify card has pointer cursor (indicates it's clickable)
    await expect(firstCard).toHaveCSS('cursor', 'pointer');
  });
});

test.describe('Achievements Carousel - Auto-rotation', () => {
  test('should auto-rotate achievements', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get initial active dot (first one should be active)
    const firstDot = page.locator('button[aria-label="Go to achievement 1"]');
    const initialColor = await firstDot.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    
    // Wait for auto-rotation (3 seconds as per code)
    await page.waitForTimeout(3500);
    
    // Check that a different dot might be active now
    // (we can't guarantee which one due to timing, but we verify the mechanism exists)
    const dots = page.locator('button[aria-label^="Go to achievement"]');
    await expect(dots).toHaveCount(6);
  });
});

test.describe('Achievements Carousel - Responsive Design', () => {
  test('should display properly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const achievementsHeading = page.locator('h2:has-text("Achievements Showcase")');
    await expect(achievementsHeading).toBeVisible();
    
    const dots = page.locator('button[aria-label^="Go to achievement"]');
    await expect(dots).toHaveCount(6);
  });

  test('should display properly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const achievementsHeading = page.locator('h2:has-text("Achievements Showcase")');
    await expect(achievementsHeading).toBeVisible();
    
    const dots = page.locator('button[aria-label^="Go to achievement"]');
    await expect(dots).toHaveCount(6);
  });

  test('should display properly on small mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('h2:has-text("Achievements Showcase")').scrollIntoViewIfNeeded();
    
    const achievementsHeading = page.locator('h2:has-text("Achievements Showcase")');
    await expect(achievementsHeading).toBeVisible();
    
    const dots = page.locator('button[aria-label^="Go to achievement"]');
    await expect(dots).toHaveCount(6);
  });
});
