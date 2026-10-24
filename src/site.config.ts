/**
 * Site-wide settings. Edit this file to change the name, contact links,
 * availability or analytics. Components read from here; none hard-code these.
 */

export type Availability =
  | { status: 'available'; from: string; note?: string }
  | { status: 'limited'; note: string }
  | { status: 'unavailable'; note?: string };

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  jobTitle: string;
  location: string;
  workingPattern: string;
  linkedIn: string;
  github: string;
  company: string;
  /** Path to the public CV PDF in public/, without a phone number. Empty hides the link. */
  cvPdf: string;
  availability: Availability;
  nav: NavItem[];
  analytics: {
    /** Cloudflare Web Analytics beacon token. Empty turns it off. */
    cloudflareToken: string;
    /** Google Analytics 4 measurement ID. Empty turns it off. Loads only after consent. */
    ga4MeasurementId: string;
  };
}

export const site: SiteConfig = {
  name: 'Toby Retallick',
  jobTitle: 'Technical Lead and Senior Full-Stack Engineer',
  location: 'Greater Brisbane Area, Queensland',
  workingPattern: 'Remote across Australia, happy to travel',
  linkedIn: 'https://www.linkedin.com/in/tobyret',
  github: 'https://github.com/TobyRet',
  company: 'Byte Size Australia Pty Ltd',
  cvPdf: '', // TODO: add a CV PDF without a phone number to public/cv/ and set the path.
  availability: {
    status: 'available',
    from: 'November 2026',
    note: 'Contract preferred. Open to fixed-term or permanent roles.',
  },
  nav: [
    { label: 'Work', href: '/work/' },
    { label: 'How I work', href: '/how-i-work/' },
    { label: 'About', href: '/about/' },
    { label: 'CV', href: '/cv/' },
    { label: 'Contact', href: '/contact/' },
  ],
  analytics: {
    cloudflareToken: '', // TODO: add the token from the Cloudflare dashboard (phase 5).
    ga4MeasurementId: '',
  },
};
