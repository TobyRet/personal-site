/** Small helpers for writing lists in running text. */

/**
 * The text that goes before item `index` in a list of `count` items, in the
 * house style without an Oxford comma: "A, B and C".
 */
export function separatorBefore(index: number, count: number): string {
  if (index === 0) return '';
  return index === count - 1 ? ' and ' : ', ';
}
