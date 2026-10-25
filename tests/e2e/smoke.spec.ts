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

test('work cards show sector, role and stack tags', async ({ page }) => {
  await page.goto('/work/');
  const card = page
    .getByRole('article')
    .filter({ hasText: 'flight scheduling' });
  for (const text of [
    'Aviation',
    'Lead engineer',
    'React',
    'TypeScript',
    'Zustand',
  ]) {
    await expect(card).toContainText(text);
  }
  await expect(card).not.toContainText('Vite');
});

test('no horizontal scroll on phones', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  for (const path of [
    '/',
    '/work/',
    '/work/abcam-ecommerce-rebuild/',
    '/work/airline-flight-scheduling/',
  ]) {
    await page.goto(path);
    const fits = await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    );
    expect(fits, path).toBe(true);
  }
});

test('home leads with the pitch', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'I get software into production safely, when it matters.',
  );
  const recent = page.getByRole('link', {
    name: /an inherited prototype taken to production in about four months/,
  });
  await expect(recent).toHaveAttribute('href', '/work/amador/');
  await expect(page.locator('main')).toContainText('Recent work:');
});

for (const viewport of [
  { width: 360, height: 780 },
  { width: 1280, height: 800 },
]) {
  test(`get in touch is in the first screen at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(
      page.getByRole('link', { name: 'Get in touch' }).first(),
    ).toBeInViewport({ ratio: 1 });
  });
}

test('the testimonial stays hidden until permission is confirmed', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('main figure')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('What sets him apart');
});

test('clients and good fit are listed', async ({ page }) => {
  await page.goto('/');
  const main = page.locator('main');
  await expect(main).toContainText('Clients include');
  await expect(main).toContainText('Department for Education');
  const goodFit = page.getByRole('region', { name: 'Good fit if you need' });
  await expect(
    goodFit.getByRole('heading', { level: 2, name: 'Good fit if you need' }),
  ).toBeVisible();
  await expect(goodFit.getByRole('listitem')).toHaveCount(4);
});

test('AI experience is visible on the home page and linked from How I work', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('main')).toContainText(
    'I also add AI features to products',
  );
  await page.goto('/how-i-work/');
  await page.getByRole('link', { name: 'See how I used AI on Amador' }).click();
  await expect(page).toHaveURL(/\/work\/amador\/#how-i-used-ai$/);
  await expect(
    page.getByRole('heading', { level: 2, name: 'How I used AI' }),
  ).toBeVisible();
});

test('client names are plain text', async ({ page }) => {
  await page.goto('/');
  const line = page.locator('main p').filter({ hasText: 'Clients include' });
  await expect(line).toContainText(
    'Abcam, Mastercard, Amador, the Department for Education',
  );
  await expect(line.getByRole('link')).toHaveCount(0);
});

test('canonical and Open Graph URLs use the site address', async ({ page }) => {
  await page.goto('/work/amador/');
  const canonical =
    'https://personal-site.billowing-firefly-aa29.workers.dev/work/amador/';
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    canonical,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    canonical,
  );
});

test('contact offers LinkedIn, with no "not ready" message', async ({
  page,
}) => {
  await page.goto('/contact/');
  const main = page.locator('main');
  await expect(main).not.toContainText('not ready');
  await expect(
    main.getByRole('link', { name: 'Message me on LinkedIn' }).first(),
  ).toHaveAttribute('href', /linkedin\.com/);
});

test('placeholder sections are not published', async ({ page }) => {
  for (const path of ['/about/', '/how-i-work/']) {
    await page.goto(path);
    await expect(page.locator('main')).not.toContainText(/lorem ipsum/i);
  }
});

test('the consultancies show as linked logos', async ({ page }) => {
  await page.goto('/');
  const through = page.getByRole('list', { name: 'Through' });
  const consultancies: [string, string][] = [
    ['Equal Experts', 'https://www.equalexperts.com/'],
    ['Terem', 'https://terem.tech/'],
  ];
  for (const [name, href] of consultancies) {
    const link = through.getByRole('link', { name, exact: true });
    await expect(link).toHaveAttribute('href', href);
    const logo = link.locator('svg');
    await expect(logo).toHaveAttribute('aria-hidden', 'true');
    const box = await logo.boundingBox();
    expect(box?.height).toBeGreaterThan(0);
  }
});

test('case study pagination links have clear names', async ({ page }) => {
  await page.goto('/work/amador/');
  await expect(
    page.getByRole('link', {
      name: 'Next case study: Steadying a global student housing platform',
    }),
  ).toBeVisible();
});

test('availability shows on home, contact and case studies only', async ({
  page,
}) => {
  const shows = ['/', '/contact/', '/work/amador/'];
  const hides = ['/work/', '/about/', '/how-i-work/', '/cv/'];
  for (const path of [...shows, ...hides]) {
    await page.goto(path);
    const note = page
      .getByRole('complementary', { name: 'Notes' })
      .getByText('Availability', { exact: true });
    await expect(note).toHaveCount(shows.includes(path) ? 1 : 0);
  }
});

test('pages share an Open Graph image that exists', async ({
  page,
  request,
}) => {
  await page.goto('/about/');
  const image = await page
    .locator('meta[property="og:image"]')
    .getAttribute('content');
  expect(image).toBe(
    'https://personal-site.billowing-firefly-aa29.workers.dev/og-default.png',
  );
  const response = await request.get('/og-default.png');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('image/png');
});

test('phones see availability in the first screen', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/');
  await expect(
    page
      .locator('main')
      .getByText('Available for contract work from', { exact: false })
      .first(),
  ).toBeInViewport({ ratio: 1 });
});

test('the CV shows no download note until the PDF exists', async ({ page }) => {
  await page.goto('/cv/');
  await expect(page.locator('main')).not.toContainText('coming soon');
});
