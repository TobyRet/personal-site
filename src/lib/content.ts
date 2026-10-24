/** Small helpers for reading content collections in pages. */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type CaseStudy = CollectionEntry<'work'>;

/** All case studies, in the order set by their `order` field. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const entries = await getCollection('work');
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return (await getCaseStudies()).filter((entry) => entry.data.featured);
}

/** Page copy by id (the Markdown file name). Fails the build if it is missing. */
export async function getPage(id: string): Promise<CollectionEntry<'pages'>> {
  const page = await getEntry('pages', id);
  if (!page) throw new Error(`Missing page copy: src/content/pages/${id}.md`);
  return page;
}

/** CV entries, most recent first. */
export async function getCvEntries(): Promise<CollectionEntry<'cv'>[]> {
  const entries = await getCollection('cv');
  return entries.sort((a, b) => b.data.start.localeCompare(a.data.start));
}

export function caseStudyHref(entry: CaseStudy): string {
  return `/work/${entry.id}/`;
}
