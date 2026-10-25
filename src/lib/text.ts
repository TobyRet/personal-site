/** Small helpers for writing lists in running text. */

/** Joins items in the house style, without an Oxford comma: "A, B and C". */
export function joinWithAnd(items: readonly string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}
