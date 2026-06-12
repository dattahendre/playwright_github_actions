const { faker } = require('@faker-js/faker');
const { test } = require('@playwright/test');

class ScreenshotPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Takes a screenshot, saves it to your local path, and attaches it to the HTML report.
     * @param {string} [basePath] - Optional override for the directory.
     */
    async takeRandomScreenshot(basePath = 'D:\\Swamini\\Playwright\\screenshot\\') {
        const cleanName = faker.person.fullName().replace(/[^a-zA-Z0-9]/g, '_');
        const fullPath = `${basePath}${cleanName}.png`;
        
        // 1. Capture the screenshot to your local drive
        await this.page.screenshot({ path: fullPath });

        // 2. Attach the generated screenshot file to the Playwright HTML report
        await test.info().attach(cleanName, {
            path: fullPath,
            contentType: 'image/png'
        });
    }
}

module.exports = { ScreenshotPage };
