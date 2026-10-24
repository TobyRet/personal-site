/**
 * Class strings shared by Astro components and React islands, so a control
 * looks the same whether it renders on the server or in the browser.
 * Every class maps to a design token.
 */

export const linkClasses = {
  /** Links in running text: accent ink, always underlined. */
  default:
    'text-link underline decoration-1 underline-offset-4 hover:decoration-2',
  /** Navigation: plain ink, underline on hover or when current. */
  quiet:
    'text-text no-underline underline-offset-4 hover:underline hover:decoration-1',
} as const;

export const buttonClasses = {
  base: 'inline-flex items-center justify-center gap-2 border px-6 py-3 font-ui text-ui font-semibold no-underline transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
  primary: 'border-text bg-text text-bg hover:bg-accent hover:border-accent',
  secondary: 'border-control bg-bg text-text hover:border-text',
} as const;

export const fieldClasses = {
  group: 'flex flex-col gap-2 font-ui',
  label: 'block font-semibold text-ui text-text',
  hint: 'block text-ui text-text-secondary',
  error: 'block font-semibold text-ui text-error',
  control:
    'block w-full border border-control bg-bg px-3 py-2 font-ui text-ui text-text placeholder:text-text-secondary',
  controlError: 'border-2 border-error',
} as const;

export const tagClasses =
  'inline-block border border-rule px-2 font-ui text-ui text-text-secondary';
