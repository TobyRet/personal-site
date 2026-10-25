/** /robots.txt: crawl rules and the sitemap address, from the site URL. */
import type { APIRoute } from 'astro';
import { buildRobotsTxt } from '@/lib/llms';
import { site } from '@/site.config';

export const GET: APIRoute = () =>
  new Response(
    buildRobotsTxt(site.url, ['/styleguide/', '/og-card/', '/privacy/']),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
