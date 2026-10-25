import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator } from '@playwright/test';

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

/** The top of an element on the page, or NaN if it is missing, so comparisons fail. */
const topOf = async (locator: Locator) =>
  (await locator.boundingBox())?.y ?? Number.NaN;

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

test('the theme switch follows the device, then remembers a choice', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const html = page.locator('html');
  const button = page.getByRole('button', { name: 'Dark mode' });
  await expect(button).toHaveAttribute('aria-pressed', 'false');
  await expect(html).not.toHaveAttribute('data-theme', /.+/);

  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-pressed', 'true');
  await expect(html).toHaveAttribute('data-theme', 'dark');

  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Dark mode' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('the theme switch starts pressed on a dark device', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Dark mode' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
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

test('the Amador client note links to its website in a new tab', async ({
  page,
}) => {
  await page.goto('/work/amador/');
  const link = page
    .getByRole('complementary', { name: 'Notes' })
    .getByRole('link', { name: 'Amador (opens in a new tab)' });
  await expect(link).toHaveAttribute('href', 'https://www.amador.life');
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
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

test('work cards show the stack as plain text in the detail line', async ({
  page,
}) => {
  await page.goto('/work/');
  const card = page
    .getByRole('article')
    .filter({ hasText: 'flight scheduling' });
  await expect(card).toContainText(
    'Aviation · Lead engineer · 2025 · React, TypeScript, Zustand',
  );
  await expect(card).not.toContainText('Vite');
  await expect(card.getByRole('list')).toHaveCount(0);
});

test('get in touch goes straight to LinkedIn', async ({ page }) => {
  for (const path of ['/', '/work/amador/']) {
    await page.goto(path);
    const links = page.getByRole('link', { name: 'Get in touch' });
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/tobyret',
      );
    }
  }
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

test('home leads with the headline, intro and good fit list', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'I’ve owned the product, built the software and led the team.',
  );
  const main = page.locator('main');
  await expect(main).toContainText(
    'I came to engineering after seven years leading digital products',
  );
  await expect(main).not.toContainText('I lead the team and I write the code.');
  const description =
    'Toby Retallick is a technical lead and senior full-stack engineer who has owned products, built the software and led the team. 12 years of consulting and contract work in the UK and Australia.';
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    description,
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    description,
  );
});

test('get in touch is in the first screen at 1280x800', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: 'Get in touch' }).first(),
  ).toBeInViewport({ ratio: 1 });
});

test('on phones, get in touch comes straight after the good fit list', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const list = page.getByRole('list', { name: 'I’m a good fit if you need:' });
  const button = page.getByRole('link', { name: 'Get in touch' }).first();
  const listBox = await list.boundingBox();
  const listBottom = (listBox?.y ?? Number.NaN) + (listBox?.height ?? 0);
  expect(await topOf(button)).toBeGreaterThan(listBottom);
  expect(await topOf(button)).toBeLessThan(
    await topOf(page.locator('main figure')),
  );
});

test('the Equal Experts quote shows after the hero, credited and linked', async ({
  page,
}) => {
  await page.goto('/');
  const figure = page
    .locator('main figure')
    .filter({ hasText: 'What sets him apart is the combination' });
  await expect(figure).toHaveCount(1);
  const caption = figure.locator('figcaption');
  await expect(caption).toContainText('Equal Experts Australia');
  await expect(
    caption.getByRole('link', { name: 'Read the original post on LinkedIn' }),
  ).toHaveAttribute(
    'href',
    'https://www.linkedin.com/feed/update/urn:li:activity:7518490572039294976/',
  );
  await expect(figure.locator('svg')).toHaveAttribute('aria-hidden', 'true');
  expect(await topOf(figure)).toBeLessThan(
    await topOf(page.getByText('Clients include')),
  );
});

test('the home page notes show the headshot, then the quote', async ({
  page,
}) => {
  await page.goto('/');
  const notes = page.getByRole('complementary', { name: 'Notes' });
  const headshot = notes.getByRole('img', {
    name: 'Toby Retallick, outdoors in a cap and a green jacket',
  });
  const quote = notes
    .locator('figure')
    .filter({ hasText: 'What sets him apart is the combination' });
  await expect(headshot).toHaveCount(1);
  await expect(quote).toHaveCount(1);
  expect(await topOf(headshot)).toBeLessThan(await topOf(quote));
});

test('the About page links to Youth Music and two case studies', async ({
  page,
}) => {
  await page.goto('/about/');
  const main = page.locator('main');
  await expect(
    main.getByRole('link', { name: 'Youth Music', exact: true }),
  ).toHaveAttribute('href', 'https://www.youthmusic.org.uk/');
  await expect(
    main.getByRole('link', { name: 'Youth Music', exact: true }),
  ).toHaveAttribute('rel', 'external');
  const links: [string, string][] = [
    [
      'steady a global student housing platform',
      '/work/student-housing-platform-stabilisation/',
    ],
    ['taken Amador', '/work/amador/'],
  ];
  for (const [name, href] of links) {
    const link = main.getByRole('link', { name, exact: true });
    await expect(link).toHaveAttribute('href', href);
    const response = await page.request.get(href);
    expect(response.ok()).toBe(true);
  }
});

test('good fit sits in the hero, before the button, and only once', async ({
  page,
}) => {
  await page.goto('/');
  const list = page.getByRole('list', { name: 'I’m a good fit if you need:' });
  await expect(list.getByRole('listitem')).toHaveCount(4);
  await expect(page.getByText('I’m a good fit if you need:')).toHaveCount(1);
  expect(await topOf(list)).toBeLessThan(
    await topOf(page.getByRole('link', { name: 'Get in touch' }).first()),
  );
  await expect(page.locator('main')).toContainText('Clients include');
});

test('AI experience is visible on the home page and linked from How I work', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('main')).toContainText('Safe, practical use of AI');
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
  const canonical = 'https://tobyretallick.com/work/amador/';
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
      name: 'Next case study Steadying a global student housing platform',
    }),
  ).toBeVisible();
});

test('availability shows on home, contact and case studies only', async ({
  page,
}) => {
  const shows = ['/contact/', '/work/amador/'];
  const hides = ['/', '/work/', '/about/', '/how-i-work/', '/cv/'];
  for (const path of [...shows, ...hides]) {
    await page.goto(path);
    const note = page
      .getByRole('complementary', { name: 'Notes' })
      .getByText('Availability', { exact: true });
    await expect(note).toHaveCount(shows.includes(path) ? 1 : 0);
  }
});

test('home has one call to action in the hero and one at the end', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Get in touch' })).toHaveCount(2);
  await expect(
    page.getByText(
      'Available from November 2026 for contract work · Greater Brisbane, remote across Australia',
    ),
  ).toBeVisible();
  const closing = page.getByRole('region', { name: 'Work with me' });
  await expect(closing).toContainText(
    'Contract preferred. Open to fixed-term or permanent roles.',
  );
  await expect(closing).toContainText(
    'Greater Brisbane Area, Queensland. Remote across Australia, happy to travel.',
  );
});

test('pages share an Open Graph image that exists', async ({
  page,
  request,
}) => {
  await page.goto('/about/');
  const image = await page
    .locator('meta[property="og:image"]')
    .getAttribute('content');
  expect(image).toBe('https://tobyretallick.com/og-default.png');
  const response = await request.get('/og-default.png');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('image/png');
});

test('on phones, availability comes straight after the hero', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/');
  const button = await topOf(
    page.getByRole('link', { name: 'Get in touch' }).first(),
  );
  const availability = await topOf(
    page.getByText(/^Available from .* for contract work/),
  );
  const clients = await topOf(page.getByText('Clients include'));
  expect(availability).toBeGreaterThan(button);
  expect(availability).toBeLessThan(clients);
});

test('the CV shows no download note until the PDF exists', async ({ page }) => {
  await page.goto('/cv/');
  await expect(page.locator('main')).not.toContainText('coming soon');
});

test('the privacy page is hidden until its copy is reviewed', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.locator('footer').getByRole('link', { name: 'Privacy' }),
  ).toHaveCount(0);
  await page.goto('/privacy/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
});

test('public pages can be indexed', async ({ request }) => {
  const response = await request.get('/');
  expect(response.headers()['x-robots-tag']).toBeUndefined();
});

test('robots.txt allows crawling and points to the sitemap', async ({
  request,
}) => {
  const text = await (await request.get('/robots.txt')).text();
  expect(text).toContain('User-agent: *\nAllow: /');
  expect(text).toContain('Disallow: /styleguide/');
  expect(text).toContain(
    'Sitemap: https://tobyretallick.com/sitemap-index.xml',
  );
});

test('llms.txt summarises the site and links every case study', async ({
  request,
}) => {
  const text = await (await request.get('/llms.txt')).text();
  expect(text.startsWith('# Toby Retallick')).toBe(true);
  for (const slug of [
    'amador',
    'student-housing-platform-stabilisation',
    'super-fund-member-portal',
    'abcam-ecommerce-rebuild',
    'airline-flight-scheduling',
  ]) {
    expect(text).toContain(`https://tobyretallick.com/work/${slug}/`);
  }
});

test('pages carry valid structured data', async ({ page }) => {
  const graphOf = async () =>
    JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .textContent()) ?? '{}',
    ) as { '@graph': { '@type': string }[] };

  await page.goto('/');
  const home = (await graphOf())['@graph'].map((node) => node['@type']);
  expect(home).toEqual(['WebSite', 'Person']);
  await expect(page).toHaveTitle(
    'Toby Retallick | Technical Lead and Senior Full-Stack Engineer',
  );

  await page.goto('/work/amador/');
  const study = (await graphOf())['@graph'].map((node) => node['@type']);
  expect(study).toEqual([
    'WebSite',
    'Person',
    'CreativeWork',
    'BreadcrumbList',
  ]);
});

test('pages load Cloudflare Web Analytics with the site token', async ({
  page,
}) => {
  await page.goto('/');
  const beacon = page.locator(
    'script[src="https://static.cloudflareinsights.com/beacon.min.js"]',
  );
  await expect(beacon).toHaveCount(1);
  await expect(beacon).toHaveAttribute(
    'data-cf-beacon',
    '{"token":"4a6c84caf8c349d3a1201acb05765fde"}',
  );
});
