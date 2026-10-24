// Fails when components use values outside the design tokens:
// Tailwind arbitrary values (`p-[13px]`, `bg-[#fff]`) or inline style attributes.
// Tokens themselves live in src/styles/tokens.css, which this script does not scan.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOTS = ['src/components', 'src/layouts', 'src/pages'];
const EXTENSIONS = ['.astro', '.ts', '.tsx'];

const RULES = [
  { name: 'Tailwind arbitrary value', pattern: /[\w:-]+-\[[^\]\s]+\]/g },
  { name: 'inline style attribute', pattern: /\sstyle=["{]/g },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (EXTENSIONS.some((ext) => path.endsWith(ext))) yield path;
  }
}

const problems = [];

for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, index) => {
      for (const rule of RULES) {
        for (const match of line.matchAll(rule.pattern)) {
          problems.push(
            `${file}:${index + 1}  ${rule.name}: ${match[0].trim()}`,
          );
        }
      }
    });
  }
}

if (problems.length > 0) {
  console.error(
    `Design token check failed. Use a token instead:\n${problems.join('\n')}`,
  );
  process.exit(1);
}

console.log('Design token check passed.');
