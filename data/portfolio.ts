export const profile = {
  name: "Kethavath Shiva",
  role: "AI & Data Science Engineer",
  education: "B.E. Artificial Intelligence and Data Science, Chaitanya Bharathi Institute of Technology, Hyderabad",
  graduation: "2027",
  cgpa: "8.61/10",
  location: "Hyderabad, India",
  email: "shivakethavath50@gmail.com",
  github: "https://github.com/shiva123786",
  linkedin: "https://www.linkedin.com/in/kethavath-shiva-a6a0662b5/",
  resume: "/resume.pdf",
  intro:
    "I'm a final-year B.E. student in Artificial Intelligence & Data Science focused on machine learning, generative AI, and full-stack engineering. I turn research into shipped products — from autonomous zero-trust firewalls to computer-vision surveillance and analytics platforms.",
  about: [
    "I work across the full AI lifecycle — framing the problem, building models, shipping the product, and instrumenting it for real users. My toolkit spans classical ML and deep learning through to LLMs, AI agents, and modern web backends.",
    "I care about systems that are not just accurate but dependable: secure by design, observable in production, and genuinely useful to the people who rely on them.",
  ],
  focusAreas: [
    "Machine Learning & Deep Learning",
    "Generative AI & LLMs",
    "Computer Vision",
    "Full-Stack Engineering",
    "Cloud Security",
    "Data Analytics & BI",
  ],
};

export const skills = [
  { category: "Programming", items: ["Python", "Java", "JavaScript", "SQL", "R", "HTML5", "CSS3"] },
  { category: "AI / ML", items: ["Machine Learning", "Deep Learning", "Computer Vision", "scikit-learn", "TensorFlow", "PyTorch", "OpenCV", "NumPy", "Pandas", "Matplotlib"] },
  { category: "Generative AI", items: ["LLMs", "Hugging Face", "OpenAI API", "AutoGen", "AI Agents"] },
  { category: "Data Analytics", items: ["Power BI", "Power Query", "DAX", "Excel", "SQL", "Matplotlib"] },
  { category: "Full Stack", items: ["React.js", "Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"] },
  { category: "Databases", items: ["MySQL", "MongoDB", "SQLite"] },
  { category: "Cyber Security", items: ["Zero Trust Security", "Authentication", "Anomaly Detection", "Cyber Security"] },
  { category: "Cloud & DevOps", items: ["Git", "GitHub", "Docker", "AWS basics", "CI/CD basics"] },
  { category: "Core CS", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"] },
];

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  demo: string | null;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "cloudsentinel",
    name: "CloudSentinel",
    subtitle: "Autonomous Zero Trust AI Firewall In Progress",
    description:
      "AI-powered cloud security platform implementing continuous authentication, anomaly detection, and intelligent threat analysis with risk scoring and automated access control.",
    features: ["Continuous authentication", "Anomaly detection", "Risk scoring", "Automated alerts", "Access control"],
    tech: ["Python", "Machine Learning", "Anomaly Detection", "Zero Trust"],
    github: "https://github.com/",
    demo: null,
    featured: true,
  },
  {
    id: "sonicx",
    name: "SonicX",
    subtitle: "AI Event Rescue & Smart Surveillance",
    description:
      "Computer-vision system detecting fire, smoke, crowds, and emergency situations in real time, with an interactive dashboard and automated alerting.",
    features: ["Fire & smoke detection", "Crowd analysis", "Streamlit dashboard", "Automated alerts"],
    tech: ["Python", "OpenCV", "Deep Learning", "Computer Vision"],
    github: "https://github.com/shiva123786/SonicX-AI",
    demo: null,
  },
  {
    id: "dew",
    name: "DEW",
    subtitle: "Drive Engage Walk-together",
    description:
      "Full-stack ride-sharing app with authentication, ride management, live GPS tracking, REST APIs, and CO2 footprint tracking.",
    features: ["Authentication", "Ride management", "GPS tracking", "REST APIs", "CO2 tracking"],
    tech: ["React Native", "Node.js", "Express.js", "MongoDB", "Google Maps API"],
    github: "https://github.com/shiva123786/DEW-Drive-Engage-Walk-together-Ride-Sharing",
    demo: null,
  },
  {
    id: "biz-analytics",
    name: "Business & Social Media Analytics",
    subtitle: "Unified analytics dashboard",
    description:
      "Analytics dashboard unifying business and social media data — tracking CTR, CPC, ROI, engagement, campaign performance, customer behavior, and KPIs.",
    features: ["CTR / CPC / ROI", "Campaign performance", "Customer behavior", "KPI tracking"],
    tech: ["Python", "SQL", "Power BI"],
    github: "https://github.com/shiva123786/FUTURE_DS_01",
    demo: null,
  },
  {
    id: "redrob",
    name: "RedRob",
    subtitle: "AI Candidate Ranking System",
    description:
      "Machine-learning system for automated resume analysis, feature extraction, candidate scoring, and ranking to streamline recruitment.",
    features: ["Resume analysis", "Feature extraction", "Candidate scoring", "Ranking"],
    tech: ["Python", "Machine Learning", "scikit-learn"],
    github: "https://github.com/shiva123786/RedRob-Candidate-Ranker",
    demo: null,
  },
  {
    id: "expenseowl",
    name: "ExpenseOwl",
    subtitle: "Personal Finance Tracker",
    description:
      "Full-stack finance app for expense tracking, spending analysis, reporting, and secure database management with authentication.",
    features: ["Expense tracking", "Spending analysis", "Reporting", "Authentication"],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/shiva123786/ExpenseOwl",
    demo: null,
  },
];

export const experience = [
  {
    role: "AI Developer Intern",
    org: "Viswam.AI",
    period: "June 2025 — July 2025",
    description:
      "Worked on AI-driven solutions, applying machine learning and artificial intelligence concepts to practical development tasks and real-world problems.",
    tags: ["Artificial Intelligence", "Machine Learning"],
  },
  {
    role: "Data Analytics & Science Intern",
    org: "Future Interns",
    period: "August 2025 — September 2025",
    description:
      "Worked on data analytics and data science tasks involving data analysis, visualization, and extracting meaningful insights to support better decision-making.",
    tags: ["Data Analytics", "Data Science"],
  },
  {
    role: "Web Developer Intern",
    org: "The Developer Arena",
    period: "November 2025 — February 2026",
    description:
      "Worked on web development projects, building responsive applications and strengthening full-stack development skills using modern web technologies.",
    tags: ["Web Development", "Full Stack"],
  },
  {
    role: "AI & Data Science Student",
    org: "Chaitanya Bharathi Institute of Technology",
    period: "2023 — Present",
    description:
      "Pursuing B.E. in Artificial Intelligence and Data Science with a CGPA of 8.61/10, developing skills across AI, machine learning, data analytics, computer vision, and full-stack development.",
    tags: ["AI & Data Science", "CGPA 8.61"],
  },
];

export const certifications = [
  { title: "Agentforce Specialist", issuer: "Salesforce", year: "2025" },
  { title: "Data Analytics", issuer: "Deloitte", year: "2024" },
  { title: "Power BI", issuer: "Microsoft", year: "2024" },
  { title: "Building AI Agents with MongoDB", issuer: "MongoDB", year: "2025" },
  { title: "Data Analytics & Business Intelligence Workshop", issuer: "IBM", year: "2024" },
  { title: "SQL Advanced", issuer: "HackerRank", year: "2024" },
  { title: "Adobe India Hackathon 2025", issuer: "Adobe", year: "2025" },
];

export const achievements = [
  "Maintained a CGPA of 8.61/10 across a rigorous AI & Data Science curriculum.",
  "Selected for the Adobe India Hackathon 2025.",
  "Earned 7 industry-recognized certifications across AI, data analytics, and cloud.",
  "Built 6+ end-to-end projects spanning AI security, computer vision, BI, and full-stack.",
];

export const extracurricular = [
  {
    role: "Member & Leader",
    org: "Chaitanya Spandana Club",
    description:
      "Social-responsibility initiatives and leadership — organizing events, driving community engagement, and coordinating teams.",
  },
  {
    role: "PR & Social Media",
    org: "Ramanujan Math Club",
    description: "Public relations and social media outreach, growing engagement across events and campaigns.",
  },
];

export const stats = [
  { label: "CGPA", value: "8.61" },
  { label: "Projects", value: "6+" },
  { label: "Certifications", value: "7" },
  { label: "Graduating", value: "2027" },
];
