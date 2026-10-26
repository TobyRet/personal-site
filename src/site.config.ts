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

/** A logo in src/assets/logos/, shown in one ink by the OrgLogo component. */
export type LogoKey = 'equal-experts' | 'terem';

/** A consultancy the work came through, shown as a monochrome logo. */
export interface Consultancy extends Organisation {
  logo: LogoKey;
}

/** A quote for the home page. */
export interface Testimonial {
  /** Show it on the home page. Keep this false until the author agrees. */
  show: boolean;
  /** Word for word from the source. Shorten only with an ellipsis. */
  quote: string;
  /** The person who said it. Leave empty to credit only the organisation. */
  name: string;
  role: string;
  organisation: string;
  /** Where the quote was first published. */
  link: string;
  /** A logo to show in the credit. */
  logo?: LogoKey;
}

export interface SiteConfig {
  /** The site's public address, with no trailing slash. Canonical URLs, Open Graph tags and the sitemap use it. */
  url: string;
  name: string;
  jobTitle: string;
  location: string;
  workingPattern: string;
  linkedIn: string;
  /** Where the home page buttons go. Their label says "Message me on LinkedIn", so change it too if this stops being LinkedIn. */
  contactHref: string;
  github: string;
  company: string;
  /** Client names for the home page's "Clients include" line, as plain text. Only names already public. */
  clients: string[];
  /** Consultancies for the home page's "Contracted through" logos. */
  through: Consultancy[];
  testimonial: Testimonial;
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

const linkedIn = 'https://www.linkedin.com/in/tobyret';

export const site: SiteConfig = {
  url: 'https://tobyretallick.com',
  name: 'Toby Retallick',
  jobTitle: 'Technical Lead and Senior Full-Stack Engineer',
  location: 'Greater Brisbane Area, Queensland',
  workingPattern: 'Remote across Australia, happy to travel',
  linkedIn,
  contactHref: linkedIn,
  github: 'https://github.com/TobyRet',
  company: 'Byte Size Australia Pty Ltd',
  clients: [
    'Abcam',
    'Mastercard',
    'Amador',
    'the Department for Education',
    'the Ministry of Justice',
    'the Government Digital Service',
  ],
  through: [
    {
      name: 'Equal Experts',
      href: 'https://www.equalexperts.com/',
      logo: 'equal-experts',
    },
    { name: 'Terem', href: 'https://terem.tech/', logo: 'terem' },
  ],
  testimonial: {
    show: true,
    quote:
      'What sets him apart is the combination … Proven, high quality engineering paired with genuine consulting skills … an ability to read the room, earn trust with stakeholders and bring the team along, you don’t find that in a single lead often.',
    name: '',
    role: '',
    organisation: 'Equal Experts Australia',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7518490572039294976/',
  },
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
    // Public site token from Cloudflare Web Analytics. It appears in every page.
    cloudflareToken: '4a6c84caf8c349d3a1201acb05765fde',
    ga4MeasurementId: '',
  },
};
