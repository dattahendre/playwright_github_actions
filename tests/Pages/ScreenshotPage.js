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
     * Takes a screenshot, saves it locally, and attaches it to the HTML report.
     * @param {boolean} [fullPage=false] - Set to true to capture the entire scrollable page.
     * @param {string} [basePath] - Optional override for the directory.
     */
    async takeRandomScreenshot(fullPage = false, basePath = 'D:\\Swamini\\Playwright\\screenshot\\') {
        const cleanName = faker.person.fullName().replace(/[^a-zA-Z0-9]/g, '_');
        const fullPath = `${basePath}${cleanName}.png`;
        
        // Pass 'fullPage: true' into the options block to scroll and capture everything
        await this.page.screenshot({ 
            path: fullPath,
            fullPage: fullPage 
        });

        await test.info().attach(cleanName, {
            path: fullPath,
            contentType: 'image/png'
        });
    }
}

module.exports = { ScreenshotPage };
