import { describe, expect, it } from 'vitest';
import { joinWithAnd } from '@/lib/text';

describe('joinWithAnd', () => {
  it('joins names in the house style, without an Oxford comma', () => {
    expect(
      joinWithAnd(['Abcam', 'Mastercard', 'the Ministry of Justice']),
    ).toBe('Abcam, Mastercard and the Ministry of Justice');
  });

  it('joins two names with "and"', () => {
    expect(joinWithAnd(['Abcam', 'Mastercard'])).toBe('Abcam and Mastercard');
  });

  it('returns one name as it is, and nothing for none', () => {
    expect(joinWithAnd(['Abcam'])).toBe('Abcam');
    expect(joinWithAnd([])).toBe('');
  });
});
