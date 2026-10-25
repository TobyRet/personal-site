// Full-page screenshots of each route at mobile, tablet and desktop widths.
// Usage: node scripts/screenshots.mjs <base-url> <out-dir> <path> [<path>...]
// Example: node scripts/screenshots.mjs http://localhost:8787 screenshots / /work/
// Set COLOR_SCHEME=dark for dark mode screenshots.
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const WIDTHS = [360, 768, 1280];
const colorScheme = process.env['COLOR_SCHEME'] === 'dark' ? 'dark' : 'light';
const [base, outDir, ...paths] = process.argv.slice(2);

if (!base || !outDir || paths.length === 0) {
  console.error(
    'Usage: node scripts/screenshots.mjs <base-url> <out-dir> <path>...',
  );
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

for (const width of WIDTHS) {
  const page = await browser.newPage({
    viewport: { width, height: 800 },
    colorScheme,
  });
  for (const path of paths) {
    await page.goto(new URL(path, base).href);
    // The dev server adds a toolbar. Keep it out of the screenshots.
    await page.addStyleTag({
      content: 'astro-dev-toolbar { display: none !important; }',
    });
    const name = path.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home';
    await page.screenshot({
      path: `${outDir}/${name}-${colorScheme}-${width}.png`,
      fullPage: true,
    });
  }
  await page.close();
}

await browser.close();
