// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('verify popover appears on hover', async ({ page }) => {
  // Navigate to the IoT Dashboard demo page.
  // Navigate the browser to the target test page URL.
  await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');

  // Confirm the page loaded by checking the IoT Dashboard link is visible.
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'IoT Dashboard' })).toBeVisible();

  // Confirm the Modal & Overlays section is visible before navigating.
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Modal & Overlays' })).toBeVisible();

  // Click the Modal & Overlays link to navigate to that section of the UI demo.
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Modal & Overlays' }).click();

  // Verify the Popover option is visible in the side navigation.
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Popover' })).toBeVisible();

  // Click the Popover link to open the popover demo page.
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Popover' }).click();

  // Ensure the hover button is visible before interacting with it.
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('button', { name: 'on hover' })).toBeVisible();

  // Locate the button that should trigger the popover on hover.
  // Store a value, element handle, or generated data for later use.
  const hoverButton = page.getByRole('button', { name: 'on hover' });

  // Perform a hover action over the button so the popover appears.
  // Move the mouse pointer over the element to reveal hover behavior.
  await hoverButton.hover();

  // Assert the popover content appears and contains the expected text.
  // Assert the element or page contains the expected text.
  await expect(page.locator('nb-popover')).toContainText('Hello, how are you today?');

  // Pause briefly so the popover can be observed manually if needed.
  // Wait briefly to allow UI updates or manual observation.
  await page.waitForTimeout(4000);

  // Close the browser page and end the test session.
  // Close the current page or browser at the end of the test.
  await page.close();
});
