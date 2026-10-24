/**
 * Class strings shared by Astro components and React islands, so a control
 * looks the same whether it renders on the server or in the browser.
 * Every class maps to a design token.
 */

export const linkClasses = {
  default:
    'text-link underline decoration-1 underline-offset-4 hover:decoration-2',
  quiet:
    'text-link no-underline underline-offset-4 hover:underline hover:decoration-2',
  /** For links on an ink background. */
  inverse:
    'text-white underline decoration-1 underline-offset-4 hover:decoration-2',
} as const;

export const buttonClasses = {
  base: 'inline-flex items-center justify-center gap-2 border-2 px-6 py-3 font-bold text-body no-underline transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
  primary:
    'border-ink bg-ink text-white hover:bg-grey-700 hover:border-grey-700',
  secondary: 'border-ink bg-white text-ink hover:bg-grey-50',
} as const;

export const fieldClasses = {
  group: 'flex flex-col gap-2',
  groupError: 'border-l-4 border-error pl-4',
  label: 'block font-bold text-body',
  hint: 'block text-body text-text-secondary',
  error: 'block font-bold text-body text-error',
  control:
    'block w-full border-2 border-ink bg-white px-3 py-2 text-body text-text placeholder:text-text-secondary',
  controlError: 'border-error',
} as const;

export const tagClasses =
  'inline-block border border-border bg-bg-subtle px-2 py-1 font-mono text-small text-text';
