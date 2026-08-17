export type Collection = {
  id: string;
  name: string;
  count: number;
  indexes: number;
  storage: string;
  description: string;
};

export const DB_NAME = "piyush_makhija";

export const collections: Collection[] = [
  {
    id: "profile",
    name: "profile",
    count: 1,
    indexes: 1,
    storage: "12.4 kB",
    description: "Identity document — who is behind this cluster.",
  },
  {
    id: "projects",
    name: "projects",
    count: 4,
    indexes: 3,
    storage: "88.2 kB",
    description: "Shipped work, one document per build.",
  },
  {
    id: "skills",
    name: "skills",
    count: 5,
    indexes: 2,
    storage: "24.1 kB",
    description: "Aggregated by category with a $group stage.",
  },
  {
    id: "education",
    name: "education",
    count: 3,
    indexes: 1,
    storage: "16.7 kB",
    description: "Academic timeline, sorted by year descending.",
  },
  {
    id: "contact",
    name: "contact",
    count: 1,
    indexes: 1,
    storage: "8.9 kB",
    description: "Write here — insertOne() is open to everyone.",
  },
];

export const profile = {
  _id: 'ObjectId("piyush_makhija")',
  name: "Piyush Makhija",
  role: "Full-Stack Developer, APIs & Applied AI",
  location: "Mumbai, India",
  summary:
    "Full-stack developer building, testing and deploying web apps with React, Node, Express, MongoDB, MySQL, PostgreSQL and Redis. Comfortable across JWT-secured REST APIs, API testing with Postman and Jest, AWS (EC2, Nginx, SES) and Docker — currently going deeper on LangChain, RAG and GenAI.",
  focus: ["APIs", "Real-time systems", "Applied AI / RAG", "Deployment"],
  cgpa: 8.4,
  open_to_work: true,
};

export type Project = {
  _id: string;
  title: string;
  role: string;
  year: string;
  status: "live" | "shipped" | "collab";
  summary: string;
  highlights: string[];
  stack: string[];
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    _id: 'ObjectId("devtinder")',
    title: "devTinder",
    role: "Full-Stack Developer",
    year: "2025",
    status: "live",
    summary:
      "Full-stack MERN app with JWT-secured REST APIs, reusable React components and real-time communication over Socket.IO plus WebRTC video calling.",
    highlights: [
      "Automated API testing with Jest and manual test cases across auth, chat and video-call flows",
      "GitHub Actions CI/CD pipeline deploying to AWS EC2 behind Nginx",
      "AWS SES login notification emails",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Socket.IO", "WebRTC", "AWS EC2", "Nginx", "AWS SES"],
    link: { label: "piyushweb.online", href: "https://www.piyushweb.online/" },
  },
  {
    _id: 'ObjectId("regit")',
    title: "Regit",
    role: "Developer",
    year: "2025",
    status: "shipped",
    summary:
      "A platform where students upload, adopt and collaborate on unfinished engineering projects, with an AI module for project health analysis, continuation roadmaps and auto-generated pitch decks.",
    highlights: [
      "REST APIs built and tested with MongoDB, Express, React, Node and Postman",
      "Critical user workflows automated with Selenium WebDriver",
      "OpenRouterAI integrated for project health scoring",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "OpenRouterAI", "Selenium"],
  },
  {
    _id: 'ObjectId("bird_species")',
    title: "Bird Species Recognition System",
    role: "Developer",
    year: "2024",
    status: "shipped",
    summary:
      "Full-stack AI platform identifying bird species from images and audio recordings, served through a React front end and a Flask inference microservice.",
    highlights: [
      "Contributed to training a ResNet50 image classifier in PyTorch",
      "Audio classification model wrapped into a Flask microservice",
      "Real-time prediction REST APIs validated with Postman and curated test datasets",
    ],
    stack: ["React.js", "Node.js", "Express.js", "Flask", "MongoDB", "PyTorch"],
  },
  {
    _id: 'ObjectId("retrace")',
    title: "Retrace — AI Browser Memory Assistant",
    role: "Developer",
    year: "2026",
    status: "collab",
    summary:
      "A Chrome extension giving your browser a memory: semantic search, session restoration and automated browsing summaries.",
    highlights: [
      "Embedding-based indexing and vector retrieval in the LLM/RAG pipeline",
      "Context-aware response generation for higher search accuracy",
      "Validated retrieval quality, prompt behaviour and end-to-end AI workflows",
    ],
    stack: ["React.js", "TypeScript", "Chrome Extension API", "Convex", "LangChain", "OpenAI API", "RAG"],
  },
];

export type SkillGroup = {
  _id: string;
  count: number;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { _id: "databases", count: 4, items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"] },
  {
    _id: "frameworks",
    count: 9,
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
  },
  { _id: "languages", count: 4, items: ["JavaScript", "Python", "Java", "C++"] },
  {
    _id: "tools",
    count: 8,
    items: ["Git & GitHub", "Postman", "Firebase", "AppWrite", "AWS", "Nginx", "Docker", "Jest"],
  },
  {
    _id: "core",
    count: 4,
    items: ["Operating Systems", "Computer Networks", "System Design (HLD)", "DBMS"],
  },
];

export type EducationDoc = {
  _id: string;
  institution: string;
  qualification: string;
  place: string;
  period: string;
  score: string;
};

export const education: EducationDoc[] = [
  {
    _id: 'ObjectId("tsec_be")',
    institution: "Thadomal Shahani Engineering College",
    qualification: "B.E. Computer Engineering",
    place: "Mumbai",
    period: "2022 – 2026",
    score: "CGPA 8.4",
  },
  {
    _id: 'ObjectId("jaihind_hsc")',
    institution: "Z. B. Patil Jai Hind Senior College",
    qualification: "Higher Secondary Certificate",
    place: "Dhule",
    period: "2020 – 2022",
    score: "81%",
  },
  {
    _id: 'ObjectId("northpoint_icse")',
    institution: "North Point School",
    qualification: "ICSE Matriculation",
    place: "Dhule",
    period: "2019 – 2020",
    score: "96%",
  },
];

export const achievements = [
  "Microsoft Azure AI-900 certified, plus a Machine Learning Fundamentals course",
  "SQL fundamentals — DDL, DML, joins, aggregations, subqueries — applied in a DBMS project",
  'Senior Technical Committee "CodeStorm": led a 24-hour offline hackathon',
];

export const contact = {
  email: "piyushmakhijaa@gmail.com",
  phone: "+91 86240 69677",
  github: { label: "github.com/piyushmakhijaa", href: "https://github.com/piyushmakhijaa" },
  linkedin: {
    label: "linkedin.com/in/piyush-makhija",
    href: "https://www.linkedin.com/in/piyush-makhija-371b5a8b",
  },
  website: { label: "piyushweb.online", href: "https://www.piyushweb.online/" },
};
