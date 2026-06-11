import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://cgi-lib.berkeley.edu/ex/fup.html');
  await expect(page.getByRole('heading', { name: 'Sample File Upload Form' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Please fill in the file-' })).toBeVisible();
  await page.locator('//input[@name="upfile"]').setInputFiles('D:/Swamini/Playwright/Tests/fileupload.spec.js');
  // click on press button to upload file
  await page.getByRole('button', { name: 'Press' }).click();
  //verify file is uploaded successfully
  //await expect(page.getByText('You've uploaded a file.  Your notes on the file were:')).toBeVisible();
  //store the uploaded file name for verification
  const uploadedFileName = await page.locator("//p[contains(text(),'You')]").textContent();

  console.log("Uploaded file name:", uploadedFileName);
  await page.waitForTimeout(5000);
  //closethe browser
  await page.close();

});

