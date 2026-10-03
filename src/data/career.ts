// Your work history and education, newest first. Used by the About timeline
// and the company logos on the home page.

export interface Role {
  /** Short city code shown above the year. */
  code: string;
  /** Year the role started. */
  year: number;
  /** Year it ended; leave out for your current role. */
  until?: number;
  company: string;
  href?: string;
  current?: boolean;
  role: string;
  description?: string;
  /** Initials shown in the logo circles until you add real logos. */
  logos: string[];
  /** Ids of files in src/content/projects to list under this role. */
  projects?: string[];
}

// Newest first, from your LinkedIn profile.
export const timeline: Role[] = [
  {
    code: 'SIN',
    year: 2024,
    company: 'ByteDance',
    current: true,
    role: 'Senior Product Designer',
    logos: ['BD'],
  },
  {
    code: 'SIN',
    year: 2022,
    until: 2023,
    company: 'Cake Group',
    role: 'Senior Product Designer',
    description:
      "One of Southeast Asia's fastest-growing digital asset companies. Led the design of the group's enterprise offering, from a proof of concept at Singapore Fintech Festival 2022 to a go-to-market product, and worked on open-source products across its enterprise (Levain) and R&D (Birthday Research) arms.",
    logos: ['CK'],
  },
  {
    code: 'SIN',
    year: 2020,
    until: 2022,
    company: 'Manyone',
    role: 'Senior Product Designer',
    description:
      'Strategy and design agency. Led business management and digital product design for projects in the UK, Hong Kong and Singapore.',
    logos: ['MO'],
  },
  {
    code: 'SIN',
    year: 2017,
    until: 2020,
    company: 'BOLT Global',
    role: 'Head of Product & User Experience',
    description:
      'Defined product strategy and directed UI and UX across a blockchain-based media ecosystem for live TV and short video, built to stream well on low-bandwidth phones. Launched in Kenya, Indonesia, Malaysia and Brunei with partners including Al Jazeera, Discovery Channel and CNA.',
    logos: ['BT'],
  },
  {
    code: 'SFO',
    year: 2015,
    until: 2017,
    company: 'Loop Commerce',
    role: 'Product Designer',
    description:
      "Designed Loop's turnkey e-gifting product for businesses and consumers. Led design and research for the consumer product built with PayPal for a potential 1 million customers, and introduced design sprints and a shared component library.",
    logos: ['LC'],
  },
  {
    code: 'SIN',
    year: 2014,
    until: 2020,
    company: 'Verso',
    role: 'Co-Founder, Design & Experience',
    description:
      'Co-founded a creative development studio of designers, technologists and strategists. Verso joined Manyone in 2020.',
    logos: ['VS'],
  },
  {
    code: 'SIN',
    year: 2013,
    until: 2015,
    company: 'Lompang Rideshare',
    role: 'Co-Founder & Lead, Creative Operations & UX',
    description:
      'Co-founded an app-based ridesharing community built to improve transport in emerging economies, connecting trusted riders and drivers across Southeast Asia.',
    logos: ['LR'],
  },
  {
    code: 'SIN',
    year: 2012,
    until: 2014,
    company: 'Standard Chartered Bank',
    role: 'Customer Experience Analyst',
    description:
      "Designed new banking processes and digital channels, leading creative direction and product experience in the digital banking arm. Part of the core design team for the bank's AI venture.",
    logos: ['SC'],
  },
];

export interface School {
  code: string;
  /** Year you started. */
  year: number;
  school: string;
  /** Degree or programme. */
  course: string;
  /** Shown under the course, e.g. the years you attended. */
  detail?: string;
  logos: string[];
}

// Newest first, from your LinkedIn profile.
export const education: School[] = [
  {
    code: 'SFO',
    year: 2015,
    school: 'Stanford University',
    course: 'Management Science & Engineering, Stanford Center for Professional Development',
    detail: '2015 – 2016',
    logos: ['SU'],
  },
  {
    code: 'SFO',
    year: 2015,
    school: 'NUS Overseas Colleges',
    course: 'Entrepreneurship Studies',
    detail: '2015 – 2016',
    logos: ['NO'],
  },
  {
    code: 'SIN',
    year: 2013,
    school: 'National University of Singapore',
    course: 'Bachelor of Arts, Communications and New Media',
    detail: '2013 – 2016',
    logos: ['NU'],
  },
];
