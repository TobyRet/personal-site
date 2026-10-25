import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const dir = join(process.cwd(), 'src/content/work');

/** Each case study body, with the frontmatter removed. */
const studies = readdirSync(dir)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const raw = readFileSync(join(dir, name), 'utf8');
    const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '');
    const headings = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
    return { name, body, headings };
  });

describe('case study format', () => {
  it('finds the case studies', () => {
    expect(studies.length).toBe(5);
  });

  it.each(studies)(
    '$name has the required sections in order',
    ({ headings }) => {
      expect(headings).toEqual([
        'At a glance',
        'The situation',
        'What I did',
        'The result',
        'Stack',
      ]);
    },
  );

  it.each(studies)(
    '$name keeps technical detail, when present, between The result and Stack',
    ({ body }) => {
      if (!body.includes('<details>')) return;
      expect(body).toContain('<summary>Technical detail</summary>');
      const at = body.indexOf('<details>');
      expect(at).toBeGreaterThan(body.indexOf('## The result'));
      expect(at).toBeLessThan(body.indexOf('## Stack'));
    },
  );

  it.each(studies)('$name has no placeholder copy', ({ body }) => {
    expect(body).not.toMatch(/lorem ipsum/i);
    expect(body).not.toMatch(/TODO/);
  });
});
