// Your work history and education, newest first. Used by the About timeline
// and the company logos on the home page.

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
  /** Initials shown in the logo circles until you add real logos. */
  logos: string[];
  /** Ids of files in src/content/projects to list under this role. */
  projects?: string[];
}

// Newest first, from your LinkedIn profile.
export const timeline: Role[] = [
  {
    code: 'SIN',
    start: '2024-03',
    company: 'ByteDance',
    current: true,
    role: 'Senior Product Designer',
    logos: ['BD'],
  },
  {
    code: 'SIN',
    start: '2022-09',
    end: '2023-11',
    company: 'Cake Group',
    role: 'Senior Product Designer',
    description:
      "One of Southeast Asia's fastest-growing digital asset companies. Led the design of the group's enterprise offering, from a proof of concept at Singapore Fintech Festival 2022 to a go-to-market product, and worked on open-source products across its enterprise (Levain) and R&D (Birthday Research) arms.",
    logos: ['CK'],
  },
  {
    code: 'SIN',
    start: '2020-02',
    end: '2022-03',
    company: 'Manyone',
    role: 'Senior Product Designer',
    description:
      'Strategy and design agency. Led business management and digital product design for projects in the UK, Hong Kong and Singapore.',
    logos: ['MO'],
  },
  {
    code: 'SIN',
    start: '2017-10',
    end: '2020-12',
    company: 'BOLT Global',
    role: 'Head of Product & User Experience',
    description:
      'Defined product strategy and directed UI and UX across a blockchain-based media ecosystem for live TV and short video, built to stream well on low-bandwidth phones. Launched in Kenya, Indonesia, Malaysia and Brunei with partners including Al Jazeera, Discovery Channel and CNA.',
    logos: ['BT'],
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
  },
  {
    code: 'SIN',
    start: '2012-12',
    end: '2014-02',
    company: 'Standard Chartered Bank',
    role: 'Customer Experience Analyst',
    description:
      "Designed new banking processes and digital channels, leading creative direction and product experience in the digital banking arm. Part of the core design team for the bank's AI venture.",
    logos: ['SC'],
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
  logos: string[];
}

// Newest first, from your LinkedIn profile.
export const education: School[] = [
  {
    code: 'SFO',
    start: '2015-08',
    end: '2016-07',
    school: 'Stanford University',
    course: 'Management Science & Engineering, Stanford Center for Professional Development',
    logos: ['SU'],
  },
  {
    code: 'SFO',
    start: '2015-08',
    end: '2016-07',
    school: 'NUS Overseas Colleges',
    course: 'Entrepreneurship Studies',
    logos: ['NO'],
  },
  {
    code: 'SIN',
    start: '2013-08',
    end: '2016-12',
    school: 'National University of Singapore',
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
