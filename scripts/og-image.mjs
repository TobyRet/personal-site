// Captures the share card at /og-card/ to public/og-default.png (1200 by 630).
// Usage: node scripts/og-image.mjs <base-url>
// Example: node scripts/og-image.mjs http://localhost:4321
import { chromium } from '@playwright/test';

const [base] = process.argv.slice(2);
if (!base) {
  console.error('Usage: node scripts/og-image.mjs <base-url>');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 600, height: 315 },
  deviceScaleFactor: 2,
  colorScheme: 'light',
});
await page.goto(new URL('/og-card/', base).href);
await page.evaluate(() => document.fonts.ready);
// The dev server adds a toolbar. Keep it out of the image.
await page.addStyleTag({
  content: 'astro-dev-toolbar { display: none !important; }',
});
await page.locator('body > div').first().screenshot({
  path: 'public/og-default.png',
});
await browser.close();
console.log('Wrote public/og-default.png');
