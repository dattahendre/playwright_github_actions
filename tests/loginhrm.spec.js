import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Page Tests', () => {

    test('should successfully log in with valid demo credentials', async ({ page }) => {
        // 1. Navigate to the login page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); // Adjust URL to your environment

        // 2. Extract the demo credentials dynamically from the UI card context
        const credentialsCard = page.locator('.orangehrm-demo-credentials');
        
        const usernameText = await credentialsCard.locator('p:has-text("Username")').innerText();
        const passwordText = await credentialsCard.locator('p:has-text("Password")').innerText();

        // Extract values string splitting (removes the "Username : " prefix)
        const usernameData = usernameText.split(':')[1].trim(); // Resolves to: Admin
        const passwordData = passwordText.split(':')[1].trim(); // Resolves to: admin123

        // 3. Select fields using semantic placeholder locators and input data
        const usernameInput = page.getByPlaceholder('Username');
        const passwordInput = page.getByPlaceholder('Password');

        await usernameInput.fill(usernameData);
        await passwordInput.fill(passwordData);

        // 4. Assert input values before submission
        await expect(usernameInput).toHaveValue('Admin');
        await expect(passwordInput).toHaveValue('admin123');

        // 5. Submit the form using the Button role locator
        await page.getByRole('button', { name: 'Login' }).click();

        // 6. Assert successful navigation redirection or landing page condition
        await expect(page).not.toHaveURL(/.*login/);
        await expect(page).toHaveURL(/.*dashboard/); 
    });

    test('should visually validate structural login components', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Verify elements match specified HTML structures safely without tight attribute coupling
        await expect(page.locator('.orangehrm-login-slot')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
        await expect(page.locator('form.oxd-form')).toBeVisible();
        await expect(page.locator('.orangehrm-login-forgot')).toHaveText('Forgot your password? ');
    });
});
