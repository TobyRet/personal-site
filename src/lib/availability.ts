/** The one-line availability message, shared by the margin note and the phone line. */
import type { Availability } from '@/site.config';

export function availabilityMessage(availability: Availability): string {
  if (availability.status === 'available') {
    return `Available for contract work from ${availability.from}.`;
  }
  return availability.status === 'limited'
    ? 'Limited availability.'
    : 'Not available for new work.';
}
