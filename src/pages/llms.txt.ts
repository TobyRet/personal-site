/** /llms.txt: a plain summary of the site for AI tools. Built from content. */
import type { APIRoute } from 'astro';
import { availabilityMessage } from '@/lib/availability';
import { caseStudyHref, getCaseStudies, getPage } from '@/lib/content';
import { buildLlmsTxt } from '@/lib/llms';
import { site } from '@/site.config';

export const GET: APIRoute = async () => {
  const home = await getPage('home');
  const pages = await Promise.all(
    [
      ['how-i-work', '/how-i-work/'],
      ['about', '/about/'],
      ['cv', '/cv/'],
    ].map(async ([id, path]) => {
      const page = await getPage(id ?? '');
      return {
        title: page.data.title,
        path: path ?? '/',
        summary: page.data.description,
      };
    }),
  );
  const caseStudies = (await getCaseStudies()).map((entry) => ({
    title: entry.data.title,
    path: caseStudyHref(entry),
    summary: entry.data.summary,
  }));

  const body = buildLlmsTxt({
    siteUrl: site.url,
    name: site.name,
    summary: `${home.data.title} ${home.data.subtitle ?? ''}`.trim(),
    details: [
      availabilityMessage(site.availability),
      `Based in the ${site.location}. ${site.workingPattern}.`,
      `Contact: ${site.linkedIn}`,
    ],
    goodFit: home.data.goodFit ?? [],
    caseStudies,
    pages,
    links: [
      { title: 'LinkedIn', href: site.linkedIn },
      { title: 'GitHub', href: site.github },
    ],
  });

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
