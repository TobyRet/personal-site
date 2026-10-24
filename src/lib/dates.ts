/** Formats YYYY-MM months for display, for example "Apr 2025". */

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatMonth(value: string): string {
  const [year, month] = value.split('-');
  const name = MONTHS[Number(month) - 1];
  if (!year || !name) throw new Error(`Invalid month: ${value}`);
  return `${name} ${year}`;
}

/** "Apr 2025 to Sep 2025", or "Apr 2025 to present" when there is no end. */
export function formatRange(start: string, end?: string): string {
  return `${formatMonth(start)} to ${end ? formatMonth(end) : 'present'}`;
}

/** Just the years: "2025", "2022 to 2024" or "2025 to present". */
export function formatYears(start: string, end?: string): string {
  const startYear = start.slice(0, 4);
  if (!end) return `${startYear} to present`;
  const endYear = end.slice(0, 4);
  return startYear === endYear ? startYear : `${startYear} to ${endYear}`;
}
