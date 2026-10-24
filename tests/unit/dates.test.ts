import { describe, expect, it } from 'vitest';
import { formatMonth, formatRange, formatYears } from '@/lib/dates';

describe('formatMonth', () => {
  it('formats a YYYY-MM month', () => {
    expect(formatMonth('2025-04')).toBe('Apr 2025');
    expect(formatMonth('2024-12')).toBe('Dec 2024');
  });

  it('rejects an invalid month', () => {
    expect(() => formatMonth('2025-13')).toThrow();
  });
});

describe('formatRange', () => {
  it('shows both months', () => {
    expect(formatRange('2025-04', '2025-09')).toBe('Apr 2025 to Sep 2025');
  });

  it('shows present for ongoing work', () => {
    expect(formatRange('2025-04')).toBe('Apr 2025 to present');
  });
});

describe('formatYears', () => {
  it('collapses a single year', () => {
    expect(formatYears('2025-05', '2025-09')).toBe('2025');
  });

  it('shows a year range', () => {
    expect(formatYears('2022-01', '2024-10')).toBe('2022 to 2024');
  });

  it('shows present for ongoing work', () => {
    expect(formatYears('2025-04')).toBe('2025 to present');
  });
});
