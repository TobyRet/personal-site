import { describe, expect, it } from 'vitest';
import { buildLlmsTxt, buildRobotsTxt } from '@/lib/llms';

describe('buildLlmsTxt', () => {
  const text = buildLlmsTxt({
    siteUrl: 'https://tobyretallick.com',
    name: 'Toby Retallick',
    summary: 'Technical lead and senior full-stack engineer.',
    details: ['Available for contract work from November 2026.'],
    goodFit: ['Someone to steady a legacy platform.'],
    caseStudies: [
      { title: 'Amador', path: '/work/amador/', summary: 'Prototype to live.' },
    ],
    pages: [{ title: 'About', path: '/about/', summary: 'Background.' }],
    links: [{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/tobyret' }],
  });

  it('follows the llms.txt shape: title, summary quote, then sections', () => {
    expect(text.startsWith('# Toby Retallick\n\n> Technical lead')).toBe(true);
    expect(text).toContain('## Case studies');
  });

  it('links each case study by its full address, with its summary', () => {
    expect(text).toContain(
      '- [Amador](https://tobyretallick.com/work/amador/): Prototype to live.',
    );
  });
});

describe('buildRobotsTxt', () => {
  it('allows crawling, hides internal pages and points to the sitemap', () => {
    const text = buildRobotsTxt('https://tobyretallick.com', ['/styleguide/']);
    expect(text).toContain('User-agent: *\nAllow: /\nDisallow: /styleguide/');
    expect(text).toContain(
      'Sitemap: https://tobyretallick.com/sitemap-index.xml',
    );
  });
});
