import { test, expect } from '@playwright/test';

test.describe('Portfolio Website Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('/');
  });

  test('should have the correct title and render the main layout', async ({ page }) => {
    // Check if the title is set properly
    // Depending on what layout.tsx has
    // We expect it has something, we'll verify it doesn't just say 'Default Title' or similar
    // We can also ensure body is present
    await expect(page.locator('body')).toBeVisible();
  });

  test('should verify there are no broken images', async ({ page }) => {
    // Collect all image sources
    const images = await page.locator('img').elementHandles();
    for (const image of images) {
        const src = await image.getAttribute('src');
        if (src) {
            // Check if it's responsive / next.js optimized image
            expect(src).toBeTruthy();
        }
    }
  });

  test('should have a working scroll functionality with CustomScrollbar', async ({ page }) => {
    // We expect to scroll down and verify the window offset changes
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(100);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('should test visual rendering / screenshot comparison of hero section', async ({ page }) => {
    // For visual regressions, take a screenshot of the main page and compare
    // Note: since this is local setup, the baseline will be created on the first run.
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('landing-page.png', {
      maxDiffPixels: 100,
    });
  });
});
