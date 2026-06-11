const fs = require('fs');
const path = require('path');
const testDir = path.join(process.cwd(), 'tests');
const files = fs.readdirSync(testDir).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
for (const file of files) {
  const filePath = path.join(testDir, file);
  const content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const lines = content.split('\n');
  const newLines = [];
  for (const line of lines) {
    const stripped = line.trim();
    if (stripped === '') {
      newLines.push(line);
      continue;
    }
    if (stripped.startsWith('//') || stripped.startsWith('/*') || stripped.startsWith('*')) {
      newLines.push(line);
      continue;
    }
    const indent = line.match(/^\s*/)[0];
    let comment = null;
    if (stripped.startsWith('import ') || stripped.startsWith('const { test') || stripped.startsWith('const{test') || stripped.startsWith('const { faker') || stripped.startsWith('const{ faker') || (stripped.startsWith('const {') && stripped.includes("require('@playwright/test')"))) {
      comment = indent + '// Import Playwright test helpers and any required libraries.';
    } else if (stripped.startsWith('test.use(')) {
      comment = indent + '// Configure test-level fixtures or browser state before running the test.';
    } else if (stripped.startsWith('test(') || stripped.startsWith('test.skip(') || stripped.startsWith('test.only(')) {
      comment = indent + '// Define the test case and assign a descriptive name.';
    } else if (stripped.includes('.goto(')) {
      comment = indent + '// Navigate the browser to the target test page URL.';
    } else if (stripped.includes('.toHaveTitle(')) {
      comment = indent + '// Verify the page title matches the expected value or pattern.';
    } else if (stripped.includes('.toBeVisible(')) {
      comment = indent + '// Assert that the expected element is visible on the page.';
    } else if (stripped.includes('.toContainText(') || stripped.includes('.toMatchText(')) {
      comment = indent + '// Assert the element or page contains the expected text.';
    } else if (stripped.includes('.toHaveText(')) {
      comment = indent + '// Assert the exact text of the element matches the expected string.';
    } else if (stripped.includes('.toHaveURL(')) {
      comment = indent + '// Verify the browser navigated to the expected URL.';
    } else if (stripped.includes('.click(')) {
      comment = indent + '// Click the element to trigger the next user action.';
    } else if (stripped.includes('.fill(')) {
      comment = indent + '// Fill the target input field with the specified value.';
    } else if (stripped.includes('.press(')) {
      comment = indent + '// Send a keyboard action to the currently focused element.';
    } else if (stripped.includes('.hover(')) {
      comment = indent + '// Move the mouse pointer over the element to reveal hover behavior.';
    } else if (stripped.includes('.waitForTimeout(')) {
      comment = indent + '// Wait briefly to allow UI updates or manual observation.';
    } else if (stripped.includes('.screenshot(')) {
      comment = indent + '// Capture a screenshot of the current browser state.';
    } else if (stripped.includes('console.log(')) {
      comment = indent + '// Log information to the console for debugging or verification.';
    } else if (stripped.startsWith('const ') || stripped.startsWith('let ') || stripped.startsWith('var ')) {
      comment = indent + '// Store a value, element handle, or generated data for later use.';
    } else if (stripped.startsWith('await expect(')) {
      comment = indent + '// Assert a page condition with Playwright matchers.';
    } else if (stripped.includes('.selectOption(')) {
      comment = indent + '// Select a value from the dropdown menu.';
    } else if (stripped.includes('.check(') || stripped.includes('.uncheck(')) {
      comment = indent + '// Toggle the checkbox or option input.';
    } else if (stripped.includes('await browser.close') || stripped.includes('await page.close') || stripped.includes('page.close()')) {
      comment = indent + '// Close the current page or browser at the end of the test.';
    } else if (stripped.includes('.getByRole(') || stripped.includes('.getByText(') || stripped.includes('.getByPlaceholder(') || stripped.includes('.locator(')) {
      comment = indent + '// Locate the page element needed for the next interaction.';
    }
    if (comment) {
      const lastLine = newLines.length ? newLines[newLines.length - 1].trim() : '';
      if (lastLine !== comment.trim()) {
        newLines.push(comment);
      }
    }
    newLines.push(line);
  }
  fs.writeFileSync(filePath, newLines.join('\n') + '\n', 'utf8');
  console.log('Annotated', file);
}
