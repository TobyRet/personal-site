// Fails when tracked files contain personal data that should not be public.
// This repo is public: see "Personal data" in CLAUDE.md.
//
// It checks git-tracked text files (plus anything staged) for phone numbers,
// local home paths, citizenship or visa details, and email addresses that are
// not on the allow list. Keep private material in private/ (gitignored).
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

// Email addresses that are meant to be public.
const ALLOWED_EMAILS = [
  /@example\.(com|org)$/i,
  /@users\.noreply\.github\.com$/i,
  /^noreply@/i,
];

const RULES = [
  {
    name: 'phone number',
    pattern: /(?:\+?61[\s-]?|\b0)4\d{2}[\s-]?\d{3}[\s-]?\d{3}\b/g,
  },
  {
    name: 'local home path',
    pattern: /(?:\/Users\/[A-Za-z]|~\/(?:Downloads|Documents|Desktop))/g,
  },
  {
    name: 'citizenship or visa detail',
    pattern: /\b(?:citizen(?:ship)?|work rights|visa)\b/gi,
  },
];

const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)*\.[A-Za-z]{2,}\b/g;

// Files that define the rules, and generated files with no personal data.
const SKIP_FILES = new Set([
  'CLAUDE.md',
  'scripts/check-pii.mjs',
  'bun.lock',
  'worker-configuration.d.ts',
]);
const BINARY = /\.(png|jpe?g|gif|webp|avif|ico|woff2?|pdf|lockb)$/i;

const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard'],
  {
    encoding: 'utf8',
  },
)
  .split('\n')
  .filter((file) => file && !BINARY.test(file) && !SKIP_FILES.has(file));

const problems = [];

for (const file of files) {
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch {
    continue;
  }
  text.split('\n').forEach((line, index) => {
    for (const rule of RULES) {
      for (const match of line.matchAll(rule.pattern)) {
        problems.push(`${file}:${index + 1}  ${rule.name}: ${match[0]}`);
      }
    }
    for (const match of line.matchAll(EMAIL)) {
      const email = match[0];
      if (!ALLOWED_EMAILS.some((allowed) => allowed.test(email))) {
        problems.push(
          `${file}:${index + 1}  email not on the allow list: ${email}`,
        );
      }
    }
  });
}

if (problems.length > 0) {
  console.error(
    `Personal data check failed. Move this to private/ or remove it:\n${problems.join('\n')}`,
  );
  process.exit(1);
}

console.log(`Personal data check passed (${files.length} files).`);
