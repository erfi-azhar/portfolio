// Your work history and education, newest first. Used by the About timeline
// and the company logos on the home page.

import type { ImageMetadata } from 'astro';
import bytedance from '../assets/logos/bytedance.png';
import cakeGroup from '../assets/logos/cake-group.svg';
import manyone from '../assets/logos/manyone.svg';
import bolt from '../assets/logos/bolt.png';
import standardChartered from '../assets/logos/standard-chartered.png';
import stanford from '../assets/logos/stanford.png';
import nus from '../assets/logos/nus.svg';

/** The full-screen overlay that opens when you click a role's card. */
export interface RoleStory {
  /** A few short paragraphs about the role. */
  about: string[];
  /** Things you shipped or led. A badge is an optional pill, e.g. 'Launching soon'. */
  contributions?: { title: string; text: string; badge?: string }[];
  /** Ids of files in src/content/projects to show as selected work. */
  work?: string[];
  /** Colour of the glow behind the badge. */
  glow?: string;
  /** Colour of the hanging ID badge and its strap. Defaults to a neutral dark. */
  brand?: string;
}

export interface Role {
  /** Short city code, shown in the role details. */
  code: string;
  /** Month the role started, as 'YYYY-MM'. */
  start: string;
  /** Month it ended, as 'YYYY-MM'; leave out for your current role. */
  end?: string;
  company: string;
  href?: string;
  current?: boolean;
  role: string;
  description?: string;
  /** Logomark image; leave out to show the initials below instead. */
  logo?: ImageMetadata;
  /** Initials, shown when there is no logo. */
  logos: string[];
  /** Ids of files in src/content/projects to list under this role. */
  projects?: string[];
  /** Add this to make the card open a full-screen overlay about the role. */
  story?: RoleStory;
}

// Newest first, from your LinkedIn profile.
export const timeline: Role[] = [
  {
    code: 'SIN',
    start: '2024-03',
    company: 'ByteDance',
    logo: bytedance,
    current: true,
    role: 'Senior Product Designer',
    logos: ['BD'],
    // Placeholder copy: replace it with your own.
    story: {
      glow: '#3c8cff',
      brand: '#0b1f4d',
      about: [
        '[Placeholder] Two or three sentences about your role at ByteDance: the team, the products you design for, and what you own.',
        '[Placeholder] A second paragraph on how you work there, or what the team is like.',
      ],
      contributions: [
        { title: '[Placeholder] First contribution', text: 'One or two lines on something you shipped or led, and why it mattered.', badge: 'Optional label' },
        { title: '[Placeholder] Second contribution', text: 'Another project, improvement or result you are proud of.' },
        { title: '[Placeholder] Third contribution', text: 'Delete any you do not need.' },
      ],
    },
  },
  {
    code: 'SIN',
    start: '2022-09',
    end: '2023-11',
    company: 'Cake Group',
    logo: cakeGroup,
    role: 'Senior Product Designer',
    description:
      "One of Southeast Asia's fastest-growing digital asset companies. Led the design of the group's enterprise offering, from a proof of concept at Singapore Fintech Festival 2022 to a go-to-market product, and worked on open-source products across its enterprise (Levain) and R&D (Birthday Research) arms.",
    logos: ['CK'],
    story: {
      glow: '#7b3fe4',
      brand: '#4c1bb8',
      about: [
        "Cake Group is one of Southeast Asia's fastest-growing digital asset companies. I worked across its enterprise arm, Levain, and its research and development arm, Birthday Research.",
      ],
      contributions: [
        {
          title: 'Group enterprise offering',
          text: 'Led the concept and design of the group’s enterprise offering, from a proof-of-concept feature at Singapore Fintech Festival 2022 to a go-to-market product.',
        },
        {
          title: 'Open-source products',
          text: 'Led exploration, iteration and maintenance on current and new open-source products.',
        },
      ],
    },
  },
  {
    code: 'SIN',
    start: '2020-02',
    end: '2022-03',
    company: 'Manyone',
    logo: manyone,
    role: 'Senior Product Designer',
    description:
      'Strategy and design agency. Led business management and digital product design for projects in the UK, Hong Kong and Singapore.',
    logos: ['MO'],
    story: {
      glow: '#6d6dff',
      brand: '#16093a',
      about: [
        'Manyone is a strategy and design consultancy that combines creative thinking, strategy and technology to help businesses move fast.',
        'I led business management and digital product design for projects in the UK, Hong Kong and Singapore.',
      ],
    },
  },
  {
    code: 'SIN',
    start: '2017-10',
    end: '2020-12',
    company: 'BOLT Global',
    logo: bolt,
    role: 'Head of Product & User Experience',
    description:
      'Defined product strategy and directed UI and UX across a blockchain-based media ecosystem for live TV and short video, built to stream well on low-bandwidth phones. Launched in Kenya, Indonesia, Malaysia and Brunei with partners including Al Jazeera, Discovery Channel and CNA.',
    logos: ['BT'],
    story: {
      glow: '#2a8cff',
      brand: '#0e1a2b',
      about: [
        'BOLT is a new kind of entertainment built by users for users, focused on live TV and short-form video for an individual mobile experience, on a blockchain-based media ecosystem.',
        'We delivered a first-class experience on every mobile device, including low-bandwidth smartphones, through web-browser streaming.',
      ],
      contributions: [
        {
          title: 'Product strategy and design direction',
          text: 'Defined product strategy and requirements, and directed UI and UX design across the suite of products in the BOLT ecosystem.',
        },
        {
          title: 'Launch across four markets',
          text: 'Went live in Kenya, Indonesia, Malaysia and Brunei, with content partners including Al Jazeera, Discovery Channel, Citizen TV and Channel NewsAsia.',
        },
      ],
    },
  },
  {
    code: 'SFO',
    start: '2015-08',
    end: '2017-07',
    company: 'Loop Commerce',
    role: 'Product Designer',
    description:
      "Designed Loop's turnkey e-gifting product for businesses and consumers. Led design and research for the consumer product built with PayPal for a potential 1 million customers, and introduced design sprints and a shared component library.",
    logos: ['LC'],
    story: {
      about: [
        'Loop Commerce reshaped buying for others: a new way to buy, deliver and receive gifts online, without needing to know the recipient’s size, colour, style or even shipping address.',
        'I was responsible for Loop’s turnkey e-gifting product for businesses and consumers, as well as marketing assets and user research.',
      ],
      contributions: [
        {
          title: 'Consumer gifting with PayPal',
          text: 'Led design and facilitated research for Loop’s consumer product, built with PayPal from concept to completion, with a potential customer pool of 1 million.',
        },
        {
          title: 'Design and research sprints',
          text: 'Introduced design and research sprints into product discovery and testing to define and drive product strategy.',
        },
        {
          title: 'Component libraries and style guides',
          text: 'Led the creation of scalable component libraries and style guides for future initiatives.',
        },
        {
          title: 'Interaction design processes',
          text: 'Set up flow creation, greybox design and wireframing standards to produce visual designs efficiently.',
        },
      ],
    },
  },
  {
    code: 'SIN',
    start: '2014-08',
    end: '2020-01',
    company: 'Verso',
    role: 'Co-Founder, Design & Experience',
    description:
      'Co-founded a creative development studio of designers, technologists and strategists. Verso joined Manyone in 2020.',
    logos: ['VS'],
    story: {
      about: [
        'Verso was a creative development studio: a diverse team of craftspeople, innovators and strategists who believed in the transformative power of design and technology.',
        'We set out to create for the needs of tomorrow, making digital experiences that tell better human stories. Verso joined Manyone in 2020.',
      ],
    },
  },
  {
    code: 'SIN',
    start: '2013-10',
    end: '2015-06',
    company: 'Lompang Rideshare',
    role: 'Co-Founder & Lead, Creative Operations & UX',
    description:
      'Co-founded an app-based ridesharing community built to improve transport in emerging economies, connecting trusted riders and drivers across Southeast Asia.',
    logos: ['LR'],
    story: {
      about: [
        'Lompang was an app-based ridesharing community that set out to change how people get from point to point in Asia, connecting trusted, reviewed riders and drivers nearby in real time.',
        'We were building operations in emerging markets, including Myanmar and Cambodia in Southeast Asia, as well as Africa.',
      ],
    },
  },
  {
    code: 'SIN',
    start: '2012-12',
    end: '2014-02',
    company: 'Standard Chartered Bank',
    logo: standardChartered,
    role: 'Customer Experience Analyst',
    description:
      "Designed new banking processes and digital channels, leading creative direction and product experience in the digital banking arm. Part of the core design team for the bank's AI venture.",
    logos: ['SC'],
    story: {
      glow: '#0473ea',
      brand: '#0a3d91',
      about: [
        'I worked with cross-disciplinary teams on new banking processes and digital channels, internet and mobile banking, alongside producing marketing content for products and initiatives.',
        'I started in Group Consumer Banking and Channel Operations, then moved to Group Digital Banking.',
      ],
      contributions: [
        {
          title: 'The bank’s AI venture',
          text: 'Part of the core design team for Standard Chartered’s artificial intelligence venture, featured in Next Bank Asia, unifying customer interfaces across services through UI design, content, product testing and research.',
        },
        {
          title: 'Dashboards across 13 countries',
          text: 'Designed data visualisation for digital dashboards and service requests across 13 countries.',
        },
        {
          title: 'Digital self-service',
          text: 'Worked on responsive public websites: information architecture and the integration of analytics and web tools.',
        },
        {
          title: 'Above and Beyond',
          text: 'Visualised marketing and social reach for the campaign that made the world’s highest transaction on the summit of Mount Everest, showcasing the bank’s Breeze mobile banking.',
        },
      ],
    },
  },
];

export interface School {
  code: string;
  /** Months attended, as 'YYYY-MM'. */
  start: string;
  end: string;
  school: string;
  /** Degree or programme. */
  course: string;
  /** Logomark image; leave out to show the initials below instead. */
  logo?: ImageMetadata;
  /** Initials, shown when there is no logo. */
  logos: string[];
}

// Newest first, from your LinkedIn profile.
export const education: School[] = [
  {
    code: 'SFO',
    start: '2015-08',
    end: '2016-07',
    school: 'Stanford University',
    logo: stanford,
    course: 'Management Science & Engineering, Stanford Center for Professional Development',
    logos: ['SU'],
  },
  {
    code: 'SIN',
    start: '2013-08',
    end: '2016-12',
    school: 'National University of Singapore',
    logo: nus,
    course: 'Bachelor of Arts, Communications and New Media',
    logos: ['NU'],
  },
];

export interface Milestone {
  /** 'YYYY-MM' */
  date: string;
  label: string;
}

// Small markers along the bottom of the About timeline.
export const milestones: Milestone[] = [{ date: '2016-12', label: 'Graduated — NUS' }];

// ——— Date helpers ———
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 'YYYY-MM' to a month count, so dates can be compared and subtracted. */
export const toMonth = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};

/** This month, as 'YYYY-MM'. */
export const thisMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

/** 'YYYY-MM' to "Mar 24". */
export const shortDate = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${String(y).slice(2)}`;
};

/** "2024 – Present" style range for compact labels. */
export const yearRange = (start: string, end?: string) => `${start.slice(0, 4)} – ${end ? end.slice(0, 4) : 'Present'}`;

/** "2 yrs 3 mos" between two dates, inclusive of the final month. */
export const duration = (start: string, end?: string) => {
  const total = toMonth(end ?? thisMonth()) - toMonth(start) + 1;
  const y = Math.floor(total / 12);
  const m = total % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
};
