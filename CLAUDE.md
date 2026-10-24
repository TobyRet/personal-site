# Working on this repo

## Git

- Do not add `Co-Authored-By:` lines, or any other AI attribution, to commit messages or pull request descriptions.
- Make small, clear commits. Commit after each phase.
- Ask before creating or pushing to a GitHub repo.

## Tooling

- Use bun for everything: `bun install`, `bun run <script>`, `bunx <tool>`. Do not use npm or pnpm.
- Before calling a phase done, run `bun run lint`, `bun run check`, `bun run test` and `bun run build`.

## Copy

- Write in Simple Technical English: short sentences, active voice, plain words, one idea per sentence.
- Do not use em dashes, three-part slogans, or the words "elevate", "empower", "seamless", "unlock" or "leverage".
- Mark placeholder copy with a TODO comment.

## Code

- Use design tokens only. Do not put magic values in components.
- Pages compose components. They do not hold styling decisions.
