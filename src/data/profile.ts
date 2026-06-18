/* ============================================================================
   SINGLE SOURCE OF TRUTH — all site content lives here.
   (A fitting structure for someone whose craft is exactly that.)
   Everything is derived from Mahdi's master profile and his two signed letters.
   ========================================================================== */

export const profile = {
  name: "Mahdi Kchaou",
  initials: "MK",
  role: "Revenue Operations & Data",
  // hero thesis — his actual professional value proposition
  thesisLead: "I turn messy pipeline data into",
  thesisHighlight: "a single source of truth.",
  thesisSub:
    "Revenue & data operations practitioner. I keep CRM and pipeline data clean, build the reports and automations that sales and marketing teams trust, and make the numbers tell the truth — in Salesforce, HubSpot, SQL and Power BI.",
  location: "Nuremberg, Germany",
  remote: "Open to on-site, hybrid & remote across the EU",
  workAuth: "Authorized to work in Germany / EU",
  email: "mahdikchaou.de@gmail.com",
  phone: "+49 1573 6271152",
  linkedin: "https://www.linkedin.com/in/mahdi-kchaou/",
  github: "https://github.com/Mahdikchaw",
  repo: "https://github.com/Mahdikchaw/mahdi-kchaou-portfolio",
  cv: "/cv/Mahdi_Kchaou_CV.pdf",
  // role families he credibly fits — shown as range, not a gimmicky switcher
  openTo: ["Revenue Operations", "Sales Operations", "Data Analyst", "CRM / RevOps Analyst"],
} as const;

export const about = {
  paragraphs: [
    "I'm an Information Systems master's student at FAU Erlangen-Nürnberg (graduating September 2026), currently a working student in Data & CRM Operations at NanoTemper Technologies in Munich.",
    "My work sits where revenue meets data. I enforce data standards in Salesforce, build and test the automations that move a lead from first touch to closed order, and turn pipeline data into dashboards leaders actually act on. When records are clean and the reporting is honest, teams stop arguing about the numbers and start using them.",
    "I work across four languages and three countries' worth of teams, and I care about the unglamorous discipline that makes operations dependable: naming conventions, validation checks, documentation, and a single place where the truth lives.",
  ],
} as const;

export type Metric = { value: string; unit?: string; label: string };
export const metrics: Metric[] = [
  { value: "2021", label: "building CRM, data & revenue operations since" },
  { value: "70", unit: "+", label: "people coordinated in one Notion source of truth at START Nuremberg" },
  { value: "20", unit: "+", label: "projects tracked, documented & automated end-to-end" },
  { value: "4", label: "working languages · Arabic · English · French · German" },
];

export type Experience = {
  org: string;
  title: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  blurb: string;
  bullets: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    org: "NanoTemper Technologies",
    title: "Working Student — Data & CRM Operations",
    location: "Munich, Germany",
    start: "Jun 2025",
    end: "Jun 2026",
    current: true,
    blurb:
      "Biophysical-instruments scale-up. I kept the revenue team's Salesforce trustworthy and turned its data into reporting leadership could rely on.",
    bullets: [
      "Maintained Salesforce records to a single source of truth — enforcing naming conventions and data standards across sales and marketing.",
      "Built and tested automated Salesforce Flows with conditional logic across multiple triggers, streamlining the lead-to-order process and cutting manual work.",
      "Built dashboards in Salesforce, Excel and Power BI tracking pipeline health, conversion, win rates and sales productivity for leadership.",
    ],
    stack: ["Salesforce", "HubSpot", "Power BI", "Excel", "Sales Navigator"],
  },
  {
    org: "International School of Business",
    title: "Data & Outreach Operations Coordinator",
    location: "Sfax, Tunisia",
    start: "Sep 2022",
    end: "May 2023",
    blurb:
      "Ran end-to-end outreach and kept the prospect data behind it clean and reportable.",
    bullets: [
      "Coordinated outreach campaigns across email, phone and social — managing timelines, follow-ups and deliverables.",
      "Analyzed campaign performance in Excel, tracking conversion and engagement and shipping process improvements.",
      "Maintained accurate prospect records and interaction logs in CRM for consistent, reliable reporting.",
    ],
    stack: ["CRM", "Excel", "Market research"],
  },
  {
    org: "Acteol — Access Group ERP",
    title: "CRM Operations & Data Analyst Intern",
    location: "Tunisia · UK-facing SaaS",
    start: "Mar 2021",
    end: "Aug 2021",
    blurb:
      "Data internship inside a UK-facing SaaS — querying, validating and documenting client CRM data.",
    bullets: [
      "Queried databases with SQL to retrieve, filter and analyze client and campaign data, surfacing trends for stakeholders.",
      "Tested and validated CRM features and workflows in a sandbox, catching inconsistencies before release.",
      "Documented CRM workflows so UK clients could maintain data quality and run campaigns independently.",
    ],
    stack: ["SQL", "Excel", "CRM", "Sandbox QA"],
  },
  {
    org: "START Nuremberg",
    title: "Operations & Growth Team Assistant",
    location: "Nuremberg, Germany · Volunteer",
    start: "Oct 2024",
    end: "Apr 2025",
    blurb:
      "Built the operational backbone for a student-led tech initiative.",
    bullets: [
      "Designed and automated onboarding workflows with Notion Forms and Zapier.",
      "Built a structured Notion database tracking 20+ projects and 70 team members.",
      "Trained 8 teammates, translating complex processes into something anyone could follow.",
    ],
    stack: ["Notion", "Zapier", "Process design"],
  },
];

export type SkillGroup = { key: string; label: string; items: string[] };
export const skillGroups: SkillGroup[] = [
  {
    key: "crm",
    label: "CRM & RevOps",
    items: [
      "Salesforce (admin, custom fields, Flows)",
      "HubSpot (workflows & automation)",
      "Pipeline management & forecasting",
      "Lead qualification & enrichment",
      "LinkedIn Sales Navigator",
      "Single source of truth",
    ],
  },
  {
    key: "data",
    label: "Data & Analytics",
    items: [
      "SQL (retrieval, analysis, modeling)",
      "Power BI (dashboards & reporting)",
      "Excel (PivotTables, formulas, macros)",
      "Python (working level)",
      "KPI definition & revenue metrics",
      "Data quality & validation",
    ],
  },
  {
    key: "tools",
    label: "Tools & Automation",
    items: ["Notion", "Zapier", "Jira & Confluence", "Google Workspace", "AI workflow tools"],
  },
  {
    key: "wow",
    label: "Ways of working",
    items: [
      "Cross-functional, international collaboration",
      "Stakeholder communication & data storytelling",
      "Process documentation & playbooks",
      "Structured, detail-oriented execution",
    ],
  },
];

export type Reference = {
  quote: string;
  author: string;
  authorRole: string;
  org: string;
  context: string;
  date: string;
  pdf: string;
  kind: "Employer reference" | "Academic recommendation";
};

export const references: Reference[] = [
  {
    quote:
      "Due to his precise analytical ability, he understood complex situations immediately and found good solutions straight away … He always was extremely reliable, earning our complete recognition in every respect.",
    author: "Steffen Schneider",
    authorRole: "Sales & Marketing",
    org: "NanoTemper Technologies",
    context: "Letter of Reference · Working Student, Data & CRM Operations",
    date: "Munich, June 2026",
    pdf: "/letters/NanoTemper_Reference_Mahdi_Kchaou.pdf",
    kind: "Employer reference",
  },
  {
    quote:
      "Mahdi is a careful and creative thinker with an eye for detail and devotion to logic … I have no doubt that he would be a tremendous asset.",
    author: "Mohamed-Jawhar Maalej",
    authorRole: "Lecturer in Management & Finance",
    org: "International School of Business",
    context: "Letter of Recommendation · Management & Decision Sciences",
    date: "Sfax, February 2023",
    pdf: "/letters/ISB_Recommendation_Mahdi_Kchaou.pdf",
    kind: "Academic recommendation",
  },
];

export type EducationItem = {
  school: string;
  degree: string;
  dates: string;
  note?: string;
};
export const education: EducationItem[] = [
  {
    school: "Friedrich-Alexander-Universität Erlangen-Nürnberg",
    degree: "M.Sc. International Information Systems",
    dates: "In progress · graduating Sep 2026",
  },
  {
    school: "North American Private University, Tunisia",
    degree: "B.A. Business Administration",
    dates: "2019 – 2022",
    note: "Graduated with honors · 3.54 / 4.0",
  },
];

export type Language = { name: string; level: string; cefr: string };
export const languages: Language[] = [
  { name: "Arabic", level: "Native", cefr: "Native" },
  { name: "English", level: "Professional working", cefr: "C1" },
  { name: "French", level: "Professional working", cefr: "C1" },
  { name: "German", level: "Working · improving to B2", cefr: "B1" },
];

export const sections = [
  { id: "about", index: "01", label: "About" },
  { id: "experience", index: "02", label: "Experience" },
  { id: "skills", index: "03", label: "Skills" },
  { id: "references", index: "04", label: "References" },
  { id: "contact", index: "05", label: "Contact" },
] as const;
