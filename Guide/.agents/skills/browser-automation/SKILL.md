---
name: browser-automation
description: Browse, navigate, render, screenshot, and interact with ANY website or URL using system-wide Playwright CLI and headless Chromium.
---

# Browser Automation & Web Navigation Protocol

Use this skill when you need to visit, open, render, inspect, or interact with ANY website or URL.

## Instructions for Agents

### 1. Fast One-Line Screenshot of Any URL
To capture a quick screenshot of any website directly from CLI:
```bash
npx playwright screenshot <URL> <OUTPUT_PATH.png> --viewport-size=1440,900
```
*Example:*
```bash
npx playwright screenshot https://example.com /home/adityar/.gemini/antigravity-ide/brain/<CONVERSATION_ID>/screenshot.png --viewport-size=1440,900
```

### 2. Handling Scroll Animations & Full-Page Rendering
For web apps with scroll-triggered animations (Framer Motion, AOS, GSAP):
Create a temporary node script in `<appDataDir>/brain/<conversation-id>/scratch/render_site.js`:

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(process.argv[2] || 'https://example.com', { waitUntil: 'networkidle' });

  // Scroll progressively to trigger intersection observers
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= scrollHeight; y += 300) {
    await page.evaluate((yPos) => window.scrollTo(0, yPos), y);
    await page.waitForTimeout(150);
  }

  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));

  const outPath = process.argv[3] || 'fullpage.png';
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Saved rendered screenshot to ${outPath}`);
  await browser.close();
})();
```
Run with:
```bash
node <path_to_script> <URL> <OUTPUT_PATH.png>
```

### 3. Viewing the Rendered Images
Use the `view_file` tool to visually inspect the resulting image file directly in the IDE.
