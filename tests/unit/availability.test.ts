import { describe, expect, it } from 'vitest';
import { availabilityMessage } from '@/lib/availability';

describe('availabilityMessage', () => {
  it('names the start date when available', () => {
    expect(
      availabilityMessage({ status: 'available', from: 'November 2026' }),
    ).toBe('Available for contract work from November 2026.');
  });

  it('covers limited and unavailable', () => {
    expect(availabilityMessage({ status: 'limited', note: 'x' })).toBe(
      'Limited availability.',
    );
    expect(availabilityMessage({ status: 'unavailable' })).toBe(
      'Not available for new work.',
    );
  });
});
