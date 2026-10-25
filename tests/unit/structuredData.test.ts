import { describe, expect, it } from 'vitest';
import { caseStudyGraph, siteGraph, toJsonLd } from '@/lib/structuredData';
import { site } from '@/site.config';

describe('siteGraph', () => {
  it('describes the site and the person behind it', () => {
    const [website, person] = siteGraph(site);
    expect(website).toMatchObject({
      '@type': 'WebSite',
      url: 'https://tobyretallick.com/',
      name: 'Toby Retallick',
    });
    expect(person).toMatchObject({
      '@type': 'Person',
      '@id': 'https://tobyretallick.com/#person',
      name: 'Toby Retallick',
      sameAs: [site.linkedIn, site.github],
    });
  });
});

describe('caseStudyGraph', () => {
  const nodes = caseStudyGraph(site, {
    path: '/work/amador/',
    title: 'Amador, from prototype to live marketplace',
    summary: 'A summary.',
    sector: 'Startup, creator marketplace',
    stack: ['Next.js', 'TypeScript'],
    start: '2025-04',
  });

  it('credits the case study to the person, with its stack as keywords', () => {
    expect(nodes[0]).toMatchObject({
      '@type': 'CreativeWork',
      url: 'https://tobyretallick.com/work/amador/',
      name: 'Amador, from prototype to live marketplace',
      author: { '@id': 'https://tobyretallick.com/#person' },
      keywords: 'Next.js, TypeScript',
      temporalCoverage: '2025-04/..',
    });
  });

  it('adds breadcrumbs: Home, Work, the case study', () => {
    expect(nodes[1]).toMatchObject({ '@type': 'BreadcrumbList' });
    const names = (
      nodes[1] as { itemListElement: { name: string }[] }
    ).itemListElement.map((item) => item.name);
    expect(names).toEqual([
      'Home',
      'Work',
      'Amador, from prototype to live marketplace',
    ]);
  });
});

describe('toJsonLd', () => {
  it('wraps nodes in a schema.org graph and cannot close the script tag', () => {
    const json = toJsonLd([{ '@type': 'Thing', name: '</script>' }]);
    expect(json).not.toContain('</script>');
    expect(JSON.parse(json)).toEqual({
      '@context': 'https://schema.org',
      '@graph': [{ '@type': 'Thing', name: '</script>' }],
    });
  });
});
