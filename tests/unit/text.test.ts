import { describe, expect, it } from 'vitest';
import { keepHyphenatedWords, metaLine, separatorBefore } from '@/lib/text';

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

describe('metaLine', () => {
  it('joins card details with a middle dot and nothing else', () => {
    expect(
      metaLine([
        'Startup, creator marketplace',
        'Technical lead (part-time)',
        '2025 to present',
      ]),
    ).toBe(
      'Startup, creator marketplace · Technical lead (part-time) · 2025 to present',
    );
  });

  it('skips empty parts', () => {
    expect(metaLine(['Aviation', '', 'Lead engineer'])).toBe(
      'Aviation · Lead engineer',
    );
  });
});

describe('keepHyphenatedWords', () => {
  it('joins the parts of a hyphenated word so the line cannot break there', () => {
    expect(keepHyphenatedWords('Open to fixed-term roles.')).toBe(
      'Open to fixed-\u2060term roles.',
    );
  });

  it('leaves dashes between numbers and spaced dashes alone', () => {
    expect(keepHyphenatedWords('2022-2024 and a - b')).toBe(
      '2022-2024 and a - b',
    );
  });
});
