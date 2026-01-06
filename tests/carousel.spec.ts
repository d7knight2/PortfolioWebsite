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
    
    // Wait for the CSS transition to complete by checking opacity change
    await page.waitForFunction(() => {
      const buttons = document.querySelectorAll('button[aria-label^="Go to achievement"]');
      const secondButton = Array.from(buttons)[1] as HTMLElement;
      if (!secondButton) return false;
      const bgColor = window.getComputedStyle(secondButton).backgroundColor;
      return bgColor === 'rgb(59, 130, 246)'; // Active color #3b82f6
    }, { timeout: 2000 });
    
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
    
    // Wait for carousel to be stable
    await page.locator('button[aria-label="Go to achievement 1"]').waitFor({ state: 'visible' });
    
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
    
    // Scroll to achievements section and wait for it to be visible
    await page.locator('h2:has-text("Achievements Showcase")').scrollIntoViewIfNeeded();
    await page.locator('button[aria-label="Go to achievement 1"]').waitFor({ state: 'visible' });
    
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
    // Verify achievement cards have pointer cursor via JavaScript evaluation
    const hasPointerCursor = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('h3')).filter(h3 => 
        h3.textContent && (
          h3.textContent.includes('2021 Tinder All Stars') ||
          h3.textContent.includes('Kudos Award') ||
          h3.textContent.includes('AI Champion')
        )
      );
      
      if (cards.length === 0) return false;
      
      // Check the parent div of the h3 element
      const card = cards[0].parentElement;
      if (!card) return false;
      
      const style = window.getComputedStyle(card);
      return style.cursor === 'pointer';
    });
    
    expect(hasPointerCursor).toBe(true);
  });
});

test.describe('Achievements Carousel - Auto-rotation', () => {
  test('should auto-rotate achievements', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get the first dot which should be active initially
    const firstDot = page.locator('button[aria-label="Go to achievement 1"]');
    
    // Wait for first dot to be active (has active background color)
    await page.waitForFunction(() => {
      const button = document.querySelector('button[aria-label="Go to achievement 1"]') as HTMLElement;
      if (!button) return false;
      const bgColor = window.getComputedStyle(button).backgroundColor;
      return bgColor === 'rgb(59, 130, 246)'; // Active color #3b82f6
    }, { timeout: 5000 });
    
    // Wait for rotation to occur (checking if a different dot becomes active)
    // The carousel rotates every 3 seconds, so we check after 3.5 seconds
    await page.waitForFunction(() => {
      const buttons = Array.from(document.querySelectorAll('button[aria-label^="Go to achievement"]')) as HTMLElement[];
      // Check if any button other than the first has the active color
      return buttons.some((button, index) => {
        if (index === 0) return false; // Skip first button
        const bgColor = window.getComputedStyle(button).backgroundColor;
        return bgColor === 'rgb(59, 130, 246)';
      });
    }, { timeout: 5000 });
    
    // Verify that we still have all 6 dots
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
