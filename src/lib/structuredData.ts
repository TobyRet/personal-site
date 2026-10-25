/**
 * JSON-LD structured data, so search engines and AI tools can read who the
 * site is about and what each case study covers. Pure functions: the layout
 * and pages pass in what they know, and BaseLayout prints the result.
 */
import type { SiteConfig } from '@/site.config';

export type JsonLdNode = Record<string, unknown>;

const absolute = (site: SiteConfig, path: string) =>
  new URL(path, site.url).href;

const personId = (site: SiteConfig) => `${absolute(site, '/')}#person`;

/** The website and the person behind it. Every page carries these. */
export function siteGraph(site: SiteConfig): JsonLdNode[] {
  return [
    {
      '@type': 'WebSite',
      '@id': `${absolute(site, '/')}#website`,
      url: absolute(site, '/'),
      name: site.name,
      inLanguage: 'en-AU',
      publisher: { '@id': personId(site) },
    },
    {
      '@type': 'Person',
      '@id': personId(site),
      name: site.name,
      url: absolute(site, '/'),
      jobTitle: site.jobTitle,
      image: absolute(site, '/og-default.png'),
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'QLD',
        addressCountry: 'AU',
      },
      sameAs: [site.linkedIn, site.github],
    },
  ];
}

export interface CaseStudyInput {
  path: string;
  title: string;
  summary: string;
  sector: string;
  stack: string[];
  /** YYYY-MM */
  start: string;
  /** YYYY-MM. Leave out for work that is still going. */
  end?: string | undefined;
}

/** A case study, credited to the person, with its breadcrumb trail. */
export function caseStudyGraph(
  site: SiteConfig,
  study: CaseStudyInput,
): JsonLdNode[] {
  const url = absolute(site, study.path);
  return [
    {
      '@type': 'CreativeWork',
      '@id': `${url}#case-study`,
      url,
      name: study.title,
      description: study.summary,
      about: study.sector,
      keywords: study.stack.join(', '),
      temporalCoverage: `${study.start}/${study.end ?? '..'}`,
      author: { '@id': personId(site) },
      inLanguage: 'en-AU',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        ['Home', '/'],
        ['Work', '/work/'],
        [study.title, study.path],
      ].map(([name, path], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: absolute(site, path ?? '/'),
      })),
    },
  ];
}

/**
 * The JSON for a <script type="application/ld+json"> tag. `<` is escaped,
 * so no value can close the script tag early.
 */
export function toJsonLd(nodes: JsonLdNode[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  }).replace(/</g, '\\u003c');
}
