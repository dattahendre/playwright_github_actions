const fs = require('fs');
const path = require('path');

class ScreenshotPage {
  constructor(page, options = {}) {
    this.page = page;
    // default screenshot directory: ./tests/screenshots
    const defaultDir = path.join(process.cwd(), 'tests', 'screenshots');
    this.screenshotDir = options.screenshotDir ? options.screenshotDir : defaultDir;
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }
    this.counter = 0;
  }

  async takeRandomScreenshot(fullPage = true) {
    this.counter += 1;
    const filename = `screenshot-${Date.now()}-${this.counter}.png`;
    const dest = path.join(this.screenshotDir, filename);
    await this.page.screenshot({ path: dest, fullPage });
    return dest;
  }
}

module.exports = { ScreenshotPage };