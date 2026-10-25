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

/** An organisation named on the site, linked to its own website. */
export interface Organisation {
  name: string;
  href: string;
}

/** A consultancy the work came through, shown as a monochrome logo. */
export interface Consultancy extends Organisation {
  /** Which logo in src/assets/logos/ to show. */
  logo: 'equal-experts' | 'terem';
}

export interface SiteConfig {
  name: string;
  jobTitle: string;
  location: string;
  workingPattern: string;
  linkedIn: string;
  github: string;
  company: string;
  /** Clients for the home page's "Clients include" line. Only names already public. */
  clients: Organisation[];
  /** Consultancies for the home page's "Through" logos. */
  through: Consultancy[];
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
  clients: [
    { name: 'Abcam', href: 'https://www.abcam.com/' },
    { name: 'Mastercard', href: 'https://www.mastercard.com/' },
    { name: 'Amador', href: 'https://www.amador.life/' },
    {
      name: 'the Department for Education',
      href: 'https://www.gov.uk/government/organisations/department-for-education',
    },
    {
      name: 'the Ministry of Justice',
      href: 'https://www.gov.uk/government/organisations/ministry-of-justice',
    },
    {
      name: 'the Government Digital Service',
      href: 'https://www.gov.uk/government/organisations/government-digital-service',
    },
  ],
  through: [
    {
      name: 'Equal Experts',
      href: 'https://www.equalexperts.com/',
      logo: 'equal-experts',
    },
    { name: 'Terem', href: 'https://terem.tech/', logo: 'terem' },
  ],
  cvPdf: '',
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
    cloudflareToken: '',
    ga4MeasurementId: '',
  },
};
