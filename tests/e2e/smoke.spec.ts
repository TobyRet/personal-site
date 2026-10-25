import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
  '/',
  '/work/',
  '/work/amador/',
  '/work/student-housing-platform-stabilisation/',
  '/work/super-fund-member-portal/',
  '/work/abcam-ecommerce-rebuild/',
  '/work/airline-flight-scheduling/',
  '/how-i-work/',
  '/about/',
  '/cv/',
  '/contact/',
  '/privacy/',
  '/styleguide/',
];
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

test('a visitor can open a case study from the home page', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('region', { name: 'Selected work' })
    .getByRole('link', { name: /Amador/ })
    .click();
  await expect(page).toHaveURL(/\/work\/amador\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Amador');
  for (const section of [
    'At a glance',
    'The situation',
    'What I did',
    'The result',
    'Stack',
  ]) {
    await expect(
      page.getByRole('heading', { level: 2, name: section }),
    ).toBeVisible();
  }
  await page.getByRole('link', { name: /Next/ }).click();
  await expect(page).toHaveURL(/student-housing-platform-stabilisation/);
});

test('unknown pages return the 404 page', async ({ page }) => {
  const response = await page.goto('/no-such-page/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Page not found',
  );
});

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

test('pages send security headers', async ({ request }) => {
  const response = await request.get('/');
  const headers = response.headers();
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['content-security-policy']).toContain(
    "frame-ancestors 'none'",
  );
});

test('/health responds ok', async ({ request }) => {
  const response = await request.get('/health');
  expect(response.ok()).toBe(true);
  expect(await response.json()).toEqual({ status: 'ok' });
});

test('case study margin leads with the match line', async ({ page }) => {
  await page.goto('/work/airline-flight-scheduling/');
  const notes = page.getByRole('complementary', { name: 'Notes' });
  const text = (await notes.innerText()).replace(/\s+/g, ' ');
  const order = [
    'Relevant if you need',
    'A lead for a new React front end that handles very large data.',
    'Client',
    'Key stack',
    'Zustand',
  ].map((part) => text.indexOf(part));
  expect(order.every((index) => index >= 0)).toBe(true);
  expect(order).toEqual([...order].sort((a, b) => a - b));
});

test('team shows only when known', async ({ page }) => {
  await page.goto('/work/student-housing-platform-stabilisation/');
  const notes = page.getByRole('complementary', { name: 'Notes' });
  await expect(notes).toContainText('Team');
  await expect(notes).toContainText('Team in Australia and India');
  await page.goto('/work/super-fund-member-portal/');
  await expect(
    page
      .getByRole('complementary', { name: 'Notes' })
      .getByText('Team', { exact: true }),
  ).toHaveCount(0);
});

test('technical detail opens with the keyboard', async ({ page }) => {
  await page.goto('/work/abcam-ecommerce-rebuild/');
  const summary = page.getByText('Technical detail', { exact: true });
  const details = page.locator('details');
  await expect(details).not.toHaveAttribute('open', /.*/);
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
  await expect(page.getByText('Sign-in and access control')).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
