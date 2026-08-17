export type Collection = {
  id: string;
  name: string;
  count: number;
  indexes: { name: string; keys: string; type: string; size: string }[];
  storage: string;
  description: string;
  query: string;
};

export const DB_NAME = "piyush_makhija";
export const CLUSTER = "localhost:27017";

export const collections: Collection[] = [
  {
    id: "profile",
    name: "profile",
    count: 1,
    storage: "12.4 kB",
    description: "Identity document — who is behind this cluster.",
    query: "{ open_to_work: true }",
    indexes: [{ name: "_id_", keys: "{ _id: 1 }", type: "UNIQUE", size: "20.0 kB" }],
  },
  {
    id: "projects",
    name: "projects",
    count: 4,
    storage: "88.2 kB",
    description: "Shipped work, one document per build.",
    query: "{ status: { $in: ['live', 'shipped', 'collab'] } }",
    indexes: [
      { name: "_id_", keys: "{ _id: 1 }", type: "UNIQUE", size: "20.0 kB" },
      { name: "year_-1", keys: "{ year: -1 }", type: "REGULAR", size: "16.4 kB" },
      { name: "stack_1", keys: "{ stack: 1 }", type: "MULTIKEY", size: "24.6 kB" },
    ],
  },
  {
    id: "skills",
    name: "skills",
    count: 5,
    storage: "24.1 kB",
    description: "Grouped by category with a $group stage.",
    query: "{ }",
    indexes: [
      { name: "_id_", keys: "{ _id: 1 }", type: "UNIQUE", size: "20.0 kB" },
      { name: "category_1", keys: "{ category: 1 }", type: "REGULAR", size: "12.2 kB" },
    ],
  },
  {
    id: "education",
    name: "education",
    count: 3,
    storage: "16.7 kB",
    description: "Academic timeline, sorted by year descending.",
    query: "{ }",
    indexes: [{ name: "_id_", keys: "{ _id: 1 }", type: "UNIQUE", size: "20.0 kB" }],
  },
  {
    id: "achievements",
    name: "achievements",
    count: 3,
    storage: "10.2 kB",
    description: "Certifications, leadership and coursework.",
    query: "{ }",
    indexes: [{ name: "_id_", keys: "{ _id: 1 }", type: "UNIQUE", size: "20.0 kB" }],
  },
  {
    id: "contact",
    name: "contact",
    count: 1,
    storage: "8.9 kB",
    description: "Write here — insertOne() is open to everyone.",
    query: "{ }",
    indexes: [{ name: "_id_", keys: "{ _id: 1 }", type: "UNIQUE", size: "20.0 kB" }],
  },
];

export type Doc = Record<string, unknown>;

const oid = (s: string) => `ObjectId('${s}')`;

export const profileDocs: Doc[] = [
  {
    _id: oid("68da3358dcff741e543ec001"),
    name: "Piyush Makhija",
    role: "Full-Stack Developer",
    focus: "APIs, Real-time Systems & Applied AI",
    location: "Mumbai, India",
    email: "piyushmakhijaa@gmail.com",
    website: "https://www.piyushweb.online/",
    summary:
      "Full-stack developer building, testing and deploying web apps with React, Node, Express, MongoDB, MySQL, PostgreSQL and Redis. Comfortable across JWT-secured REST APIs, API testing with Postman and Jest, AWS (EC2, Nginx, SES) and Docker.",
    currentlyLearning: ["LangChain", "RAG pipelines", "GenAI evaluation"],
    strengths: ["REST API design", "Real-time systems", "Testing & CI/CD", "Cloud deployment"],
    cgpa: 8.4,
    yearsCoding: 4,
    openToWork: true,
    createdAt: "2022-07-01T09:00:00.000+00:00",
    updatedAt: "2026-08-17T09:12:04.118+00:00",
    __v: 0,
  },
];

export const projectDocs: Doc[] = [
  {
    _id: oid("68da3358dcff741e543ec45c"),
    name: "devTinder",
    category: "Full-Stack / Real-time",
    role: "Full-Stack Developer",
    description:
      "MERN app with JWT-secured REST APIs, reusable React components and real-time communication over Socket.IO plus WebRTC video calling.",
    highlights: [
      "Automated API testing with Jest across auth, chat and video-call flows",
      "GitHub Actions CI/CD pipeline deploying to AWS EC2 behind Nginx",
      "AWS SES login notification emails",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Socket.IO", "WebRTC", "AWS EC2", "Nginx"],
    link: "https://www.piyushweb.online/",
    status: "live",
    year: 2025,
    rating: 4.9,
    createdAt: "2025-02-11T07:20:56.235+00:00",
    updatedAt: "2025-11-02T10:04:12.881+00:00",
    __v: 0,
  },
  {
    _id: oid("68da3358dcff741e543ec45d"),
    name: "Regit",
    category: "Platform / Applied AI",
    role: "Developer",
    description:
      "A platform where students upload, adopt and collaborate on unfinished engineering projects, with an AI module for project health analysis, continuation roadmaps and auto-generated pitch decks.",
    highlights: [
      "REST APIs built and tested with MongoDB, Express, React, Node and Postman",
      "Critical user workflows automated with Selenium WebDriver",
      "OpenRouterAI integrated for project health scoring",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "OpenRouterAI", "Selenium"],
    status: "shipped",
    year: 2025,
    rating: 4.6,
    createdAt: "2025-05-04T11:41:02.010+00:00",
    updatedAt: "2025-09-18T16:22:47.500+00:00",
    __v: 0,
  },
  {
    _id: oid("68da3358dcff741e543ec45e"),
    name: "Bird Species Recognition System",
    category: "AI / Computer Vision",
    role: "Developer",
    description:
      "Full-stack AI platform identifying bird species from images and audio recordings, served through a React front end and a Flask inference microservice.",
    highlights: [
      "Contributed to training a ResNet50 image classifier in PyTorch",
      "Audio classification model wrapped into a Flask microservice",
      "Real-time prediction REST APIs validated with Postman and curated datasets",
    ],
    stack: ["React.js", "Node.js", "Express.js", "Flask", "MongoDB", "PyTorch"],
    status: "shipped",
    year: 2024,
    rating: 4.4,
    createdAt: "2024-08-19T13:05:31.702+00:00",
    updatedAt: "2024-12-01T08:55:19.223+00:00",
    __v: 0,
  },
  {
    _id: oid("68da3358dcff741e543ec45f"),
    name: "Retrace — AI Browser Memory Assistant",
    category: "AI / RAG",
    role: "Developer",
    description:
      "A Chrome extension giving your browser a memory: semantic search, session restoration and automated browsing summaries.",
    highlights: [
      "Embedding-based indexing and vector retrieval in the LLM/RAG pipeline",
      "Context-aware response generation for higher search accuracy",
      "Validated retrieval quality, prompt behaviour and end-to-end AI workflows",
    ],
    stack: ["React.js", "TypeScript", "Chrome Extension API", "Convex", "LangChain", "OpenAI API"],
    status: "collab",
    year: 2026,
    rating: 4.8,
    createdAt: "2026-01-22T06:12:00.000+00:00",
    updatedAt: "2026-08-02T18:31:45.909+00:00",
    __v: 0,
  },
];

export const skillDocs: Doc[] = [
  {
    _id: oid("68da3358dcff741e543ec101"),
    category: "databases",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
    count: 4,
    proficiency: 4.5,
    primary: true,
  },
  {
    _id: oid("68da3358dcff741e543ec102"),
    category: "frameworks",
    items: [
      "React.js",
      "Node.js",
      "Express.js",
      "Socket.IO",
      "WebRTC",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "LangChain",
    ],
    count: 9,
    proficiency: 4.6,
    primary: true,
  },
  {
    _id: oid("68da3358dcff741e543ec103"),
    category: "languages",
    items: ["JavaScript", "Python", "Java", "C++"],
    count: 4,
    proficiency: 4.3,
    primary: true,
  },
  {
    _id: oid("68da3358dcff741e543ec104"),
    category: "tools",
    items: ["Git & GitHub", "Postman", "Firebase", "AppWrite", "AWS", "Nginx", "Docker", "Jest"],
    count: 8,
    proficiency: 4.2,
    primary: false,
  },
  {
    _id: oid("68da3358dcff741e543ec105"),
    category: "core cs",
    items: ["Operating Systems", "Computer Networks", "System Design (HLD)", "DBMS"],
    count: 4,
    proficiency: 4.0,
    primary: false,
  },
];

export const educationDocs: Doc[] = [
  {
    _id: oid("68da3358dcff741e543ec201"),
    institution: "Thadomal Shahani Engineering College",
    qualification: "B.E. Computer Engineering",
    place: "Mumbai",
    startYear: 2022,
    endYear: 2026,
    score: "CGPA 8.4",
    ongoing: true,
  },
  {
    _id: oid("68da3358dcff741e543ec202"),
    institution: "Z. B. Patil Jai Hind Senior College",
    qualification: "Higher Secondary Certificate",
    place: "Dhule",
    startYear: 2020,
    endYear: 2022,
    score: "81%",
    ongoing: false,
  },
  {
    _id: oid("68da3358dcff741e543ec203"),
    institution: "North Point School",
    qualification: "ICSE Matriculation",
    place: "Dhule",
    startYear: 2019,
    endYear: 2020,
    score: "96%",
    ongoing: false,
  },
];

export const achievementDocs: Doc[] = [
  {
    _id: oid("68da3358dcff741e543ec301"),
    title: "Microsoft Azure AI-900 Certified",
    type: "certification",
    issuer: "Microsoft",
    year: 2025,
    notes: "Plus a Machine Learning Fundamentals course",
  },
  {
    _id: oid("68da3358dcff741e543ec302"),
    title: "SQL Fundamentals",
    type: "coursework",
    issuer: "DBMS project",
    year: 2024,
    notes: "DDL, DML, joins, aggregations and subqueries applied end to end",
  },
  {
    _id: oid("68da3358dcff741e543ec303"),
    title: 'Senior Technical Committee — "CodeStorm"',
    type: "leadership",
    issuer: "TSEC",
    year: 2025,
    notes: "Led a 24-hour offline hackathon",
  },
];

export const contactDocs: Doc[] = [
  {
    _id: oid("68da3358dcff741e543ec401"),
    email: "piyushmakhijaa@gmail.com",
    phone: "+91 86240 69677",
    github: "https://github.com/piyushmakhijaa",
    linkedin: "https://www.linkedin.com/in/piyush-makhija-371b5a8b",
    website: "https://www.piyushweb.online/",
    location: "Mumbai, India",
    availability: "open to full-time & internships",
    responseTimeHours: 24,
  },
];

export const documents: Record<string, Doc[]> = {
  profile: profileDocs,
  projects: projectDocs,
  skills: skillDocs,
  education: educationDocs,
  achievements: achievementDocs,
  contact: contactDocs,
};

function typeOf(v: unknown): string {
  if (Array.isArray(v)) return "Array";
  if (v === null) return "Null";
  if (typeof v === "string") return v.startsWith("ObjectId(") ? "ObjectId" : "String";
  if (typeof v === "number") return Number.isInteger(v) ? "Int32" : "Double";
  if (typeof v === "boolean") return "Boolean";
  return "Object";
}

export function schemaOf(docs: Doc[]) {
  const fields = new Map<string, { types: Set<string>; present: number; sample: unknown }>();
  for (const d of docs) {
    for (const [k, v] of Object.entries(d)) {
      const e = fields.get(k) ?? { types: new Set<string>(), present: 0, sample: v };
      e.types.add(typeOf(v));
      e.present += 1;
      fields.set(k, e);
    }
  }
  return [...fields.entries()].map(([name, e]) => ({
    name,
    types: [...e.types].join(" | "),
    coverage: Math.round((e.present / docs.length) * 100),
    sample: e.sample,
  }));
}
