// Fails when site copy uses words or punctuation the style rules ban.
// Rules: CLAUDE.md "Copy". Scans content, pages and components.
// Also counts lorem ipsum placeholders, so you can see how much copy is left.
// The styleguide's sample text is not counted.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOTS = [
  'src/content',
  'src/pages',
  'src/components',
  'src/site.config.ts',
];
const EXTENSIONS = ['.md', '.mdx', '.astro', '.json', '.ts'];

const RULES = [
  {
    name: 'banned word',
    pattern: /\b(elevat|empower|seamless|unlock|leverag)\w*/gi,
  },
  { name: 'em dash', pattern: /—/g },
];

async function* walk(path) {
  if (EXTENSIONS.some((ext) => path.endsWith(ext))) {
    yield path;
    return;
  }
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) yield* walk(child);
    else if (EXTENSIONS.some((ext) => child.endsWith(ext))) yield child;
  }
}

const problems = [];
let placeholders = 0;
const SAMPLE_FILES = new Set(['src/pages/styleguide.astro']);

for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, index) => {
      if (!SAMPLE_FILES.has(file) && /lorem ipsum/i.test(line)) {
        placeholders += 1;
      }
      for (const rule of RULES) {
        for (const match of line.matchAll(rule.pattern)) {
          problems.push(`${file}:${index + 1}  ${rule.name}: ${match[0]}`);
        }
      }
    });
  }
}

if (problems.length > 0) {
  console.error(
    `Copy check failed. Rewrite these in plain words:\n${problems.join('\n')}`,
  );
  process.exit(1);
}

console.log(
  `Copy check passed. ${placeholders} lorem ipsum placeholders remain.`,
);
