import { describe, expect, it } from 'vitest';
import { separatorBefore } from '@/lib/text';

/** Builds the sentence the way a component does, one separator per item. */
const join = (items: string[]) =>
  items
    .map((item, index) => separatorBefore(index, items.length) + item)
    .join('');

describe('separatorBefore', () => {
  it('joins names in the house style, without an Oxford comma', () => {
    expect(join(['Abcam', 'Mastercard', 'the Ministry of Justice'])).toBe(
      'Abcam, Mastercard and the Ministry of Justice',
    );
  });

  it('joins two names with "and"', () => {
    expect(join(['Abcam', 'Mastercard'])).toBe('Abcam and Mastercard');
  });

  it('puts nothing before the first name', () => {
    expect(join(['Abcam'])).toBe('Abcam');
    expect(separatorBefore(0, 3)).toBe('');
  });
});
