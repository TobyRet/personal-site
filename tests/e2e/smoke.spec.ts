import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = ['/', '/styleguide/'];
const schemes = ['light', 'dark'] as const;

for (const path of pages) {
  for (const colorScheme of schemes) {
    test(`${path} in ${colorScheme} mode has one h1 and no axe violations`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}

test('skip link is the first focusable element and targets main', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute('href', '#main');
  await expect(page.locator('main#main')).toHaveCount(1);
});

test('reading settings apply, persist and close with Escape', async ({
  page,
}) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Reading settings' });
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');

  await page.getByRole('radio', { name: 'Larger' }).check();
  await page.getByRole('radio', { name: 'Sans serif' }).check();
  await page.getByRole('radio', { name: 'Dark' }).check();

  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-text-size', 'xl');
  await expect(html).toHaveAttribute('data-reading-font', 'sans');
  await expect(html).toHaveAttribute('data-theme', 'dark');

  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();

  await page.reload();
  await expect(html).toHaveAttribute('data-text-size', 'xl');
  await expect(html).toHaveAttribute('data-theme', 'dark');
});

test('pages load no UI framework', async ({ page }) => {
  const scripts: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'script') scripts.push(request.url());
  });
  await page.goto('/');
  expect(scripts.filter((url) => /react|client\./i.test(url))).toEqual([]);
});

test('styleguide is kept out of search results', async ({ page }) => {
  await page.goto('/styleguide/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
});

test('/health responds ok', async ({ request }) => {
  const response = await request.get('/health');
  expect(response.ok()).toBe(true);
  expect(await response.json()).toEqual({ status: 'ok' });
});
