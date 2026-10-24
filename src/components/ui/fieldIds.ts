/** Ids for a form field's hint and error, shared by Astro and React. */
export function fieldIds(id: string) {
  return { hint: `${id}-hint`, error: `${id}-error` };
}

/** The aria-describedby value for a control, or undefined when there is nothing to describe. */
export function describedBy(
  id: string,
  hasHint: boolean,
  hasError: boolean,
): string | undefined {
  const ids = fieldIds(id);
  const value = [hasHint && ids.hint, hasError && ids.error]
    .filter(Boolean)
    .join(' ');
  return value || undefined;
}
