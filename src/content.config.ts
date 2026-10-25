/**
 * Content collections. Copy lives here, not in components, so it can be
 * edited without touching code.
 *
 * - work:  one Markdown file per case study in src/content/work/
 * - pages: page copy in src/content/pages/
 * - cv:    CV entries in src/content/cv.json
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** A month, written as YYYY-MM, for example 2025-04. */
const month = z
  .string()
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])$/,
    'Use the format YYYY-MM, for example 2025-04',
  );

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    /** One line under the title, set in italic. */
    subtitle: z.string(),
    /** The client's name, or an anonymised description such as "A global student housing platform". */
    client: z.string(),
    /** True when the client may be named publicly. */
    clientNamed: z.boolean(),
    sector: z.string(),
    role: z.string(),
    /** The consultancy or agency the work came through, if any. */
    through: z.string().optional(),
    start: month,
    /** Leave out for work that is still going. */
    end: month.optional(),
    /** The key stack, four to six items. Cards show the first three. The full stack goes in the body. */
    stack: z.array(z.string()).min(4).max(6),
    /** Completes "Relevant if you need", as a full sentence. */
    relevantIf: z.string(),
    /** The team's size or shape, only where the source says it. */
    team: z.string().optional(),
    /** One or two sentences for lists and search results. */
    summary: z.string(),
    featured: z.boolean().default(false),
    /** Sort order on the Work page, lowest first. */
    order: z.number().int(),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    /** For the <meta name="description"> tag and search results. */
    description: z.string(),
    subtitle: z.string().optional(),
    /** Home page: completes "Good fit if you need", one full sentence per item. */
    goodFit: z.array(z.string()).optional(),
  }),
});

const cv = defineCollection({
  loader: file('src/content/cv.json'),
  schema: z.object({
    id: z.string(),
    organisation: z.string(),
    role: z.string(),
    location: z.string(),
    start: month,
    end: month.optional(),
    summary: z.string(),
  }),
});

export const collections = { work, pages, cv };
