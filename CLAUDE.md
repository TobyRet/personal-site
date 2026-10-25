# Working on this repo

## Git

- Do not add `Co-Authored-By:` lines, or any other AI attribution, to commit messages or pull request descriptions.
- Make small, clear commits. Commit after each phase.
- Ask before creating or pushing to a GitHub repo.

## Personal data (this repo is public)

- Never commit personal data that is not meant for the public website: phone numbers, home address, citizenship or visa details, local file paths, private notes, or third parties' names, posts or contact details.
- Keep private source material (CV, testimonials, client notes) in `private/`, which git ignores.
- Only quote a third party on the site after they agree. Keep their source text in `private/` until then.
- The CV PDF in `public/` must be a version without a phone number.
- Commit with the GitHub noreply email, not a personal address.
- Before pushing, run `bun run check:pii`.

## Tooling

- Use bun for everything: `bun install`, `bun run <script>`, `bunx <tool>`. Do not use npm or pnpm.
- Before calling a phase done, run `bun run lint`, `bun run check`, `bun run test` and `bun run build`.

## Copy

- Write in Simple Technical English: short sentences, active voice, plain words, one idea per sentence.
- Do not use em dashes, three-part slogans, or the words "elevate", "empower", "seamless", "unlock" or "leverage".
- Do not put TODO comments in code or content. Track copy changes in `private/copy-notes.md` and other follow-ups in `private/todo.md`.

## Code

- Use design tokens only. Do not put magic values in components.
- Pages compose components. They do not hold styling decisions.
