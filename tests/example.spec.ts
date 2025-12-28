import { test, expect } from '@playwright/test';

test('first test', async ({ page }) => {
  let exerciseAutomationHeading = await page.locator('div').nth(2);
  await page.goto('https://automationexercise.com/')
  console.log(await page.title());
  await expect(exerciseAutomationHeading).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');
});