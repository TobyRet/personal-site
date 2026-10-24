// Full-page screenshots of each route at mobile, tablet and desktop widths.
// Usage: node scripts/screenshots.mjs <base-url> <out-dir> <path> [<path>...]
// Example: node scripts/screenshots.mjs http://localhost:8787 screenshots / /work/
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const WIDTHS = [360, 768, 1280];
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
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  for (const path of paths) {
    await page.goto(new URL(path, base).href);
    const name = path.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home';
    await page.screenshot({
      path: `${outDir}/${name}-${width}.png`,
      fullPage: true,
    });
  }
  await page.close();
}

await browser.close();
