const fs = require('fs');
const path = require('path');

async function globalSetup() {
    // Define the directory you want to clean
    const screenshotDir = 'D:\\Swamini\\Playwright\\screenshot';

    // Check if the directory exists
    if (fs.existsSync(screenshotDir)) {
        console.log(`🧹 Cleaning old files from: ${screenshotDir}`);
        
        // Read all items inside the directory
        const files = fs.readdirSync(screenshotDir);

        for (const file of files) {
            const currentPath = path.join(screenshotDir, file);
            
            // Make sure we only delete files, not nested subfolders
            if (fs.lstatSync(currentPath).isFile()) {
                fs.unlinkSync(currentPath);
            }
        }
        console.log('✅ Screenshot folder cleaned successfully.');
    } else {
        // If the folder doesn't exist, create it so Playwright doesn't throw errors later
        console.log(`📁 Directory not found. Creating: ${screenshotDir}`);
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
}

module.exports = globalSetup;