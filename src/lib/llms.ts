/**
 * Plain-text files for crawlers, built from the site's own content:
 *
 * - llms.txt: a short Markdown summary of the site for AI tools, in the
 *   format proposed at https://llmstxt.org
 * - robots.txt: crawl rules and the sitemap address
 */

export interface LlmsLink {
  title: string;
  path: string;
  summary: string;
}

export interface LlmsInput {
  siteUrl: string;
  name: string;
  /** One or two sentences: who this is and what they do. */
  summary: string;
  /** Short facts such as availability and location. */
  details: string[];
  goodFit: string[];
  caseStudies: LlmsLink[];
  pages: LlmsLink[];
  links: { title: string; href: string }[];
}

const linkLine = (siteUrl: string, link: LlmsLink) =>
  `- [${link.title}](${new URL(link.path, siteUrl).href}): ${link.summary}`;

export function buildLlmsTxt(input: LlmsInput): string {
  const sections = [
    `# ${input.name}`,
    `> ${input.summary}`,
    input.details.join('\n'),
    [
      '## Good fit if you need',
      ...input.goodFit.map((item) => `- ${item}`),
    ].join('\n'),
    [
      '## Case studies',
      ...input.caseStudies.map((c) => linkLine(input.siteUrl, c)),
    ].join('\n'),
    ['## Pages', ...input.pages.map((p) => linkLine(input.siteUrl, p))].join(
      '\n',
    ),
    [
      '## Elsewhere',
      ...input.links.map((l) => `- [${l.title}](${l.href})`),
    ].join('\n'),
  ];
  return `${sections.join('\n\n')}\n`;
}

/** Allows all crawlers, AI crawlers included, except on the listed paths. */
export function buildRobotsTxt(siteUrl: string, disallow: string[]): string {
  return [
    'User-agent: *',
    'Allow: /',
    ...disallow.map((path) => `Disallow: ${path}`),
    '',
    `Sitemap: ${new URL('/sitemap-index.xml', siteUrl).href}`,
    '',
  ].join('\n');
}
