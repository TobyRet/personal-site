/** Small helpers for writing lists and short notes in running text. */

/**
 * The text that goes before item `index` in a list of `count` items, in the
 * house style without an Oxford comma: "A, B and C".
 */
export function separatorBefore(index: number, count: number): string {
  if (index === 0) return '';
  return index === count - 1 ? ' and ' : ', ';
}

/** Joins short details into one line with a middle dot: "A · B · C". Empty parts are skipped. */
export function metaLine(parts: readonly string[]): string {
  return parts.filter(Boolean).join(' · ');
}

/**
 * Stops a line break after the hyphen in a hyphenated word, such as
 * "fixed-term", by adding a word joiner. Use it for text in narrow columns.
 */
export function keepHyphenatedWords(text: string): string {
  return text.replace(/(\p{L})-(\p{L})/gu, '$1-\u2060$2');
}
