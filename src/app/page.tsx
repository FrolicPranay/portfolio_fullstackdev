import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import ScrollReveal from "@/components/scroll-reveal";
import fs from "node:fs";
import path from "node:path";

type SkillType = "frontend" | "backend" | "devops";

type SkillCard = {
  title: string;
  icon: SkillType;
  summary: string;
  highlights: string[];
  sections: Array<{
    label: string;
    details: string;
  }>;
};

const techBadgeMap: Record<string, { src: string; bg: string }> = {
  "JavaScript": {
    src: "https://cdn.simpleicons.org/javascript/F7DF1E",
    bg: "bg-[#F7DF1E]/10 dark:bg-[#F7DF1E]/15",
  },
  "TypeScript": {
    src: "https://cdn.simpleicons.org/typescript/3178C6",
    bg: "bg-[#3178C6]/10 dark:bg-[#3178C6]/20",
  },
  "React": {
    src: "https://cdn.simpleicons.org/react/61DAFB",
    bg: "bg-[#61DAFB]/10 dark:bg-[#61DAFB]/15",
  },
  "React Native": {
    src: "https://cdn.simpleicons.org/react/61DAFB",
    bg: "bg-[#61DAFB]/10 dark:bg-[#61DAFB]/15",
  },
  "Next.js": {
    src: "https://cdn.simpleicons.org/nextdotjs/000000/ffffff",
    bg: "bg-black/8 dark:bg-white/10",
  },
  "HTML5": {
    src: "https://cdn.simpleicons.org/html5/E34F26",
    bg: "bg-[#E34F26]/10 dark:bg-[#E34F26]/20",
  },
  "CSS3": {
    src: "https://cdn.simpleicons.org/css/1572B6",
    bg: "bg-[#1572B6]/10 dark:bg-[#1572B6]/20",
  },
  "Tailwind CSS": {
    src: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    bg: "bg-[#06B6D4]/10 dark:bg-[#06B6D4]/20",
  },
  "Node.js": {
    src: "https://cdn.simpleicons.org/nodedotjs/339933",
    bg: "bg-[#339933]/10 dark:bg-[#339933]/20",
  },
  "Express.js": {
    src: "https://cdn.simpleicons.org/express/000000/ffffff",
    bg: "bg-black/8 dark:bg-white/10",
  },
  "Laravel": {
    src: "https://cdn.simpleicons.org/laravel/FF2D20",
    bg: "bg-[#FF2D20]/10 dark:bg-[#FF2D20]/20",
  },
  "GraphQL": {
    src: "https://cdn.simpleicons.org/graphql/E10098",
    bg: "bg-[#E10098]/10 dark:bg-[#E10098]/20",
  },
  "REST": {
    src: "https://cdn.simpleicons.org/openapiinitiative/6BA539",
    bg: "bg-[#6BA539]/10 dark:bg-[#6BA539]/20",
  },
  "MongoDB": {
    src: "https://cdn.simpleicons.org/mongodb/47A248",
    bg: "bg-[#47A248]/10 dark:bg-[#47A248]/20",
  },
  "PostgreSQL": {
    src: "https://cdn.simpleicons.org/postgresql/4169E1",
    bg: "bg-[#4169E1]/10 dark:bg-[#4169E1]/20",
  },
  "Oracle": {
    src: "https://cdn.simpleicons.org/oracle/F80000",
    bg: "bg-[#F80000]/10 dark:bg-[#F80000]/20",
  },
  "Firebase": {
    src: "https://cdn.simpleicons.org/firebase/FFCA28",
    bg: "bg-[#FFCA28]/10 dark:bg-[#FFCA28]/20",
  },
  "Styled Components": {
    src: "https://cdn.simpleicons.org/styledcomponents/DB7093",
    bg: "bg-[#DB7093]/10 dark:bg-[#DB7093]/20",
  },
  "Docker": {
    src: "https://cdn.simpleicons.org/docker/2496ED",
    bg: "bg-[#2496ED]/10 dark:bg-[#2496ED]/20",
  },
  "Kubernetes": {
    src: "https://cdn.simpleicons.org/kubernetes/326CE5",
    bg: "bg-[#326CE5]/10 dark:bg-[#326CE5]/20",
  },
  "GitHub Actions": {
    src: "https://cdn.simpleicons.org/githubactions/2088FF",
    bg: "bg-[#2088FF]/10 dark:bg-[#2088FF]/20",
  },
  "Vercel": {
    src: "https://cdn.simpleicons.org/vercel/000000/ffffff",
    bg: "bg-black/8 dark:bg-white/10",
  },
  "AWS S3": {
    src: "https://cdn.simpleicons.org/amazons3/569A31",
    bg: "bg-[#569A31]/10 dark:bg-[#569A31]/20",
  },
  "GitHub": {
    src: "https://cdn.simpleicons.org/github/181717/ffffff",
    bg: "bg-black/8 dark:bg-white/10",
  },
  "Jest": {
    src: "https://cdn.simpleicons.org/jest/C21325",
    bg: "bg-[#C21325]/10 dark:bg-[#C21325]/20",
  },
  "Postman": {
    src: "https://cdn.simpleicons.org/postman/FF6C37",
    bg: "bg-[#FF6C37]/10 dark:bg-[#FF6C37]/20",
  },
  "Jira": {
    src: "https://cdn.simpleicons.org/jira/0052CC",
    bg: "bg-[#0052CC]/10 dark:bg-[#0052CC]/20",
  },
  "Cursor AI": {
    src: "https://www.google.com/s2/favicons?domain=cursor.com&sz=64",
    bg: "bg-rose-100 dark:bg-rose-500/15",
  },
  "GitHub Copilot": {
    src: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
    bg: "bg-slate-100 dark:bg-slate-500/15",
  },
  "Claude": {
    src: "https://www.google.com/s2/favicons?domain=claude.ai&sz=64",
    bg: "bg-orange-100 dark:bg-orange-500/15",
  },
  "OpenAI Codex": {
    src: "https://www.google.com/s2/favicons?domain=openai.com&sz=64",
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
  },
  "Cloudinary": {
    src: "https://cdn.simpleicons.org/cloudinary/3448C5",
    bg: "bg-[#3448C5]/10 dark:bg-[#3448C5]/20",
  },
  "ServiceNow": {
    src: "https://cdn.simpleicons.org/servicenow/81B5A1",
    bg: "bg-[#81B5A1]/10 dark:bg-[#81B5A1]/20",
  },
};

const skillCards: SkillCard[] = [
  {
    title: "Frontend",
    icon: "frontend",
    summary:
      "Modern UI work for fast, polished, responsive products.",
    highlights: ["JavaScript", "TypeScript", "React", "React Native", "Next.js", "Tailwind CSS"],
    sections: [
      {
        label: "Frontend Stack",
        details:
          "JavaScript (ES6+), TypeScript, React, React Native, Next.js, HTML5, CSS3, Sass, Tailwind CSS, and responsive UI development.",
      },
      {
        label: "UI Engineering",
        details:
          "Reusable components, landing pages, dashboards, e-commerce flows, admin panels, and polished mobile-first experiences.",
      },
      {
        label: "Application Features",
        details:
          "Authentication flows, protected routes, form-heavy interfaces, dynamic filtering, media-rich layouts, and API-connected pages.",
      },
    ],
  },
  {
    title: "Backend",
    icon: "backend",
    summary:
      "API-first backend work with solid integrations and business logic.",
    highlights: ["Node.js", "Express.js", "Laravel", "REST", "GraphQL", "GitHub"],
    sections: [
      {
        label: "Backend Stack",
        details:
          "Node.js, Express.js, Laravel, GraphQL, REST API development, server-side routing, and business logic implementation.",
      },
      {
        label: "API Capabilities",
        details:
          "REST API development, authentication APIs, protected routes, request validation, server-side routing, and business logic implementation.",
      },
      {
        label: "Integrations",
        details:
          "Cloudinary, payment and third-party service integrations, asset handling, authentication APIs, and deployment-ready backend services.",
      },
    ],
  },
  {
    title: "Databases",
    icon: "backend",
    summary:
      "Practical database work across product and CRUD-heavy apps.",
    highlights: ["MongoDB", "PostgreSQL", "Oracle", "Firebase"],
    sections: [
      {
        label: "Primary Databases",
        details:
          "MongoDB, PostgreSQL, Oracle, and Firebase across full-stack apps, dashboards, and CRUD-heavy product flows.",
      },
      {
        label: "Data Work",
        details:
          "Schema-aware feature development, collection and relational modeling, query-driven screens, and structured content handling.",
      },
      {
        label: "Product Usage",
        details:
          "Lead management, authentication data, booking and commerce flows, analytics-oriented dashboards, and media-linked records.",
      },
    ],
  },
  {
    title: "DevOps",
    icon: "devops",
    summary:
      "Deployment and infra tools for shipping and maintaining products.",
    highlights: ["Docker", "Kubernetes", "GitHub Actions", "Vercel", "AWS S3"],
    sections: [
      {
        label: "Deployment & Infra",
        details:
          "Vercel, DigitalOcean, Linux environments, AWS S3, Docker, Kubernetes, and production deployment workflows.",
      },
      {
        label: "Workflow Automation",
        details:
          "Git, GitHub, CI/CD with GitHub Actions, environment-aware builds, release iteration, and delivery coordination.",
      },
      {
        label: "Testing & Ops",
        details:
          "Postman, Jest, Testing Library, debugging support tools, ServiceNow, and practical issue-tracking through Jira.",
      },
    ],
  },
  {
    title: "Tools",
    icon: "devops",
    summary:
      "Testing, debugging, and delivery tools for day-to-day execution.",
    highlights: ["Jest", "Postman", "Jira", "Cloudinary", "ServiceNow"],
    sections: [
      {
        label: "Testing & Validation",
        details:
          "Jest, Testing Library, Postman, manual QA passes, API validation, and practical debugging during implementation.",
      },
      {
        label: "Team Workflow",
        details:
          "Jira for issue tracking, GitHub for collaboration, ServiceNow support workflows, and structured delivery across moving priorities.",
      },
      {
        label: "Operational Tools",
        details:
          "Cloudinary for asset workflows, Linux environments, deployment checks, and support tooling tied to real project execution.",
      },
    ],
  },
  {
    title: "AI Tools",
    icon: "frontend",
    summary:
      "AI tools that speed up coding, debugging, and codebase work.",
    highlights: ["Cursor AI", "GitHub Copilot", "Claude", "OpenAI Codex"],
    sections: [
      {
        label: "AI Workflow",
        details:
          "GitHub Copilot, Cursor AI, Claude, and OpenAI Codex for faster coding, refactoring, debugging, and solution exploration.",
      },
      {
        label: "Practical Usage",
        details:
          "Prompt-driven development support, documentation synthesis, code generation review, and AI-assisted iteration during feature delivery.",
      },
      {
        label: "Engineering Mindset",
        details:
          "Using AI as a multiplier for shipping quality software while validating outputs, preserving maintainability, and keeping product context central.",
      },
    ],
  },
];

function SkillIcon({ type }: { type: "frontend" | "backend" | "devops" }) {
  if (type === "frontend") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-sky-600 dark:text-sky-300"
        aria-hidden="true"
      >
        <path
          d="M4 6h16v12H4zM9 18V6m6 12V6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "backend") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-emerald-600 dark:text-emerald-300"
        aria-hidden="true"
      >
        <path
          d="M12 4c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zm-8 3v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7m-16 5v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-300"
      aria-hidden="true"
    >
      <path
        d="M14.7 6.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4l-6.8 6.8-3 1 1-3 6.8-6.8zM4 20h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type AIProductivityTool = {
  name: string;
  role: string;
  focus: string;
  accent: string;
  logo: string;
};

const aiProductivityTools: AIProductivityTool[] = [
  {
    name: "Cursor AI",
    role: "IDE Copilot",
    focus: "Fast edits, navigation, and multi-file implementation.",
    accent: "from-pink-400 via-fuchsia-400 to-violet-500",
    logo: "https://www.google.com/s2/favicons?domain=cursor.com&sz=64",
  },
  {
    name: "GitHub Copilot",
    role: "Pair Programmer",
    focus: "Accelerates scaffolding, suggestions, and repetitive logic.",
    accent: "from-orange-400 via-amber-400 to-yellow-500",
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
  },
  {
    name: "Claude",
    role: "Reasoning Partner",
    focus: "Helps with architecture, debugging, and product thinking.",
    accent: "from-sky-400 via-cyan-400 to-blue-500",
    logo: "https://www.google.com/s2/favicons?domain=claude.ai&sz=64",
  },
  {
    name: "OpenAI Codex",
    role: "Execution Agent",
    focus: "Speeds up code changes, refactors, and task completion.",
    accent: "from-emerald-400 via-teal-400 to-cyan-500",
    logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=64",
  },
  {
    name: "Augment Code",
    role: "Codebase Context",
    focus: "Useful for large-context analysis and implementation support.",
    accent: "from-rose-400 via-pink-400 to-orange-400",
    logo: "https://www.google.com/s2/favicons?domain=augmentcode.com&sz=64",
  },
  {
    name: "LangChain",
    role: "Workflow Layer",
    focus: "Connects AI features into structured product workflows.",
    accent: "from-violet-400 via-purple-400 to-fuchsia-500",
    logo: "https://www.google.com/s2/favicons?domain=langchain.com&sz=64",
  },
  {
    name: "Prompt Engineering",
    role: "Quality Control",
    focus: "Sharpens outputs for ideation, coding, and content generation.",
    accent: "from-cyan-400 via-sky-400 to-indigo-500",
    logo: "https://www.google.com/s2/favicons?domain=promptingguide.ai&sz=64",
  },
  {
    name: "AI-Assisted Debugging",
    role: "Reliability Boost",
    focus: "Shortens the loop from issue discovery to validated fixes.",
    accent: "from-amber-400 via-orange-400 to-rose-500",
    logo: "https://www.google.com/s2/favicons?domain=sentry.io&sz=64",
  },
  {
    name: "Code Refactoring",
    role: "Code Health",
    focus: "Keeps delivery fast while improving structure and maintainability.",
    accent: "from-lime-400 via-emerald-400 to-teal-500",
    logo: "https://www.google.com/s2/favicons?domain=refactoring.guru&sz=64",
  },
];

type ProjectCard = {
  title: string;
  coverKey: string;
  thumbnail: string;
  href: string;
  category: string;
  summary: string;
  architecture: string;
  focus: string;
  stack: string[];
  capabilities: string[];
  cta: string;
};

const projects: ProjectCard[] = [
  {
    title: "Beyondwalls - Real Estate Property Listing",
    coverKey: "beyondwalls",
    thumbnail: "/project-thumb-1.png",
    href: "https://www.beyondwalls.com/",
    category: "Real Estate Platform",
    summary:
      "Property discovery platform built for search-heavy journeys and lead-focused listing experiences.",
    architecture:
      "Next.js architecture with component-driven listing pages and SSR-friendly catalog browsing.",
    focus:
      "Focused on scalable UI, responsive performance, and lead capture.",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
    ],
    capabilities: [
      "Search-first UX",
      "Listing architecture",
      "Responsive UI",
      "Lead generation flows",
    ],
    cta: "gradient",
  },
  {
    title: "Kylas - Sales CRM Platform",
    coverKey: "kylas",
    thumbnail: "/project-thumb-2.png",
    href: "https://kylas.io/",
    category: "B2B SaaS CRM",
    summary:
      "Sales CRM built around lead management, pipeline visibility, and operational workflows.",
    architecture:
      "Modular React frontend with Node.js and Express services for dashboard-heavy workflows.",
    focus:
      "Built maintainable SaaS modules and CRM-oriented data views.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
    ],
    capabilities: [
      "CRM workflows",
      "Data-heavy dashboards",
      "B2B SaaS modules",
      "Operational UI",
    ],
    cta: "gradient",
  },
  {
    title: "UrbanCart (React + Laravel)",
    coverKey: "urbancart",
    thumbnail: "/project-thumb-2.png",
    href: "https://urbancart.in/",
    category: "E-commerce Storefront",
    summary:
      "Premium commerce storefront balancing polished merchandising with checkout and fulfillment flows.",
    architecture:
      "React storefront integrated with Laravel logic and third-party payment workflows.",
    focus:
      "Focused on storefront UX, integrations, and conversion-oriented user journeys.",
    stack: [
      "React",
      "Laravel",
      "JavaScript",
      "Cloudinary",
    ],
    capabilities: [
      "Commerce UX",
      "Payment integrations",
      "Catalog presentation",
      "Conversion-first pages",
    ],
    cta: "gradient",
  },
  {
    title: "Prescripto - Doctor Appointment App",
    coverKey: "prescripto",
    thumbnail: "/project-thumb-3.png",
    href: "https://prescripto.vercel.app/",
    category: "Healthcare Workflow App",
    summary:
      "Appointment and prescription workflow app built around secure, role-based user flows.",
    architecture:
      "MERN architecture with React modules, Express APIs, and MongoDB-backed workflows.",
    focus:
      "Focused on patient-doctor journeys, booking logic, and secure CRUD flows.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    capabilities: [
      "Role-based flows",
      "Secure CRUD",
      "Booking workflows",
      "Healthcare UI",
    ],
    cta: "gradient",
  },
  {
    title: "The Wild Oasis (Next.js)",
    coverKey: "wild-oasis",
    thumbnail: "/project-thumb-1.png",
    href: "https://the-wild-oasis-website.vercel.app/",
    category: "Hospitality Management",
    summary:
      "Hotel operations app for cabin management, bookings, and dashboard workflows.",
    architecture:
      "Next.js dashboard architecture with reusable admin components and filtering flows.",
    focus:
      "Focused on admin UX, filtering systems, and operational product design.",
    stack: [
      "Next.js",
      "React",
      "Styled Components",
    ],
    capabilities: [
      "Dashboard architecture",
      "Filtering systems",
      "Admin workflows",
      "Design systems",
    ],
    cta: "gradient",
  },
  {
    title: "Imagify - Image Generator",
    coverKey: "imagify",
    thumbnail: "/project-thumb-1.png",
    href: "https://imagify-shozab.vercel.app/",
    category: "AI Product Build",
    summary:
      "AI image generation product built around prompt input, auth, and creator workflows.",
    architecture:
      "React frontend with Node.js, Express, auth flows, and Firebase-backed support.",
    focus:
      "Focused on usable AI workflows, prompt handling, and reliable product behavior.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "Firebase",
    ],
    capabilities: [
      "AI workflow UI",
      "Auth flows",
      "Prompt handling",
      "Product integration",
    ],
    cta: "gradient",
  },
  {
    title: "JWT Authentication",
    coverKey: "jwt-auth",
    thumbnail: "/project-thumb-3.png",
    href: "https://mern-auth-client-seven.vercel.app/",
    category: "Security Foundation",
    summary:
      "Reusable auth system for sign-up, login, token validation, and protected routes.",
    architecture:
      "MERN auth flow with Express APIs, JWT sessions, and guarded React routes.",
    focus:
      "Focused on secure access control and reusable API protection.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    capabilities: [
      "JWT auth",
      "Protected routes",
      "API security",
      "Reusable auth base",
    ],
    cta: "gradient",
  },
  {
    title: "Modern Admin Dashboard - React & Chart-Based UI",
    coverKey: "admin-dashboard",
    thumbnail: "/project-thumb-1.png",
    href: "#",
    category: "Analytics Dashboard",
    summary:
      "Admin dashboard built for analytics, user insights, and operations-focused monitoring.",
    architecture:
      "React-based dashboard architecture with chart modules, reusable panels, and API-connected data views.",
    focus:
      "Focused on data presentation, dashboard UX, and modular admin components.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    capabilities: [
      "Dashboard UI",
      "Chart-driven views",
      "Operational analytics",
      "Modular panels",
    ],
    cta: "gradient",
  },
  {
    title: "Tomato - Food Delivery App",
    coverKey: "tomato",
    thumbnail: "/project-thumb-3.png",
    href: "https://app-food-tomato.netlify.app/",
    category: "Consumer Delivery App",
    summary:
      "Food delivery app built around menu discovery, cart flows, and fast client-side interactions.",
    architecture:
      "React frontend with Node.js, Express, and MongoDB supporting routing, auth, and order-oriented workflows.",
    focus:
      "Focused on smooth SPA behavior, cart UX, and user-facing ordering flows.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    capabilities: [
      "Cart flows",
      "Menu browsing",
      "SPA routing",
      "Auth flows",
    ],
    cta: "gradient",
  },
  {
    title: "VidTube - Modern YouTube UI Clone",
    coverKey: "vidtube",
    thumbnail: "/project-thumb-1.png",
    href: "https://vidtube-sable.vercel.app/",
    category: "Media Interface",
    summary:
      "Video browsing interface inspired by streaming platforms with search and responsive media layouts.",
    architecture:
      "React frontend using component-based media screens, Context API state sharing, and API-driven content rendering.",
    focus:
      "Focused on responsive layout systems, content browsing, and scalable frontend composition.",
    stack: [
      "React",
      "JavaScript",
      "TypeScript",
    ],
    capabilities: [
      "Media-style UI",
      "Responsive layouts",
      "Content browsing",
      "Shared state",
    ],
    cta: "gradient",
  },
  {
    title: "Netflix Clone - React Movie Streaming UI",
    coverKey: "netflix",
    thumbnail: "/project-thumb-2.png",
    href: "https://netflix-clone-sooty-psi-69.vercel.app/",
    category: "Streaming UI",
    summary:
      "Movie streaming interface focused on immersive browsing, banners, and dynamic content rows.",
    architecture:
      "React-based UI with styled component patterns, API-fed content sections, and reusable display modules.",
    focus:
      "Focused on polished visual systems, motion-aware UI, and entertainment-style browsing.",
    stack: [
      "React",
      "Firebase",
      "JavaScript",
    ],
    capabilities: [
      "Visual polish",
      "Dynamic rows",
      "Reusable UI",
      "API content feeds",
    ],
    cta: "gradient",
  },
  {
    title: "Omnifood - Nutrition App",
    coverKey: "omnifood",
    thumbnail: "/project-thumb-2.png",
    href: "https://omnifood.dev/",
    category: "Marketing Experience",
    summary:
      "Responsive product marketing site for a nutrition brand with strong hierarchy and landing-page clarity.",
    architecture:
      "Frontend-first build centered on semantic layout, section composition, and performance-conscious responsive styling.",
    focus:
      "Focused on visual hierarchy, conversion-friendly storytelling, and clean responsive execution.",
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    capabilities: [
      "Landing page UX",
      "Responsive design",
      "Performance-minded UI",
      "Visual hierarchy",
    ],
    cta: "gradient",
  },
];

const companyLogoLinks: Record<string, { name: string; href: string }> = {
  "3e9a8f00-d0ed-425b-b7ce-8c356b184120.jpg": {
    name: "Amura",
    href: "https://www.amuratech.com/",
  },
  "4147e237-4ff3-4ced-b651-c67456a78a6d.jpg": {
    name: "Lax Tech",
    href: "https://laxtech.pro/",
  },
  "45a9f5e0-9fed-4cbe-8eae-4254cebb01e9.jpg": {
    name: "Kylas",
    href: "https://kylas.io/",
  },
  "90afae74-ed9d-4fe0-93b7-dfeaa4936de2.jpg": {
    name: "Newgen",
    href: "https://newgen.co/",
  },
  "d45183b6-85ba-4f15-8483-9267216cc737.jpg": {
    name: "IDC Technologies",
    href: "https://www.idctechnologies.com/",
  },
  "e3ff3a34-b00d-46ee-bcb6-e377141efbf7.jpg": {
    name: "BeyondWalls",
    href: "https://corporate.beyondwalls.com/",
  },
  "fec515a6-012e-4327-bf8a-16bbf6de4a5e.jpg": {
    name: "INAT Technologies",
    href: "https://itwebsoft.com/",
  },
};

function getCompanyLogos() {
  const logosDir = path.join(process.cwd(), "public", "companylogos");

  if (!fs.existsSync(logosDir)) {
    return [];
  }

  return fs
    .readdirSync(logosDir)
    .filter((file) => /\.(svg|png|jpg|jpeg|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file, index) => ({
      src: `/companylogos/${file}`,
      alt: companyLogoLinks[file]?.name ?? `Company logo ${String(index + 1).padStart(2, "0")}`,
      href: companyLogoLinks[file]?.href ?? "#",
    }));
}

function getProjectCovers() {
  const coversDir = path.join(process.cwd(), "public", "ProjectsCover");

  if (!fs.existsSync(coversDir)) {
    return [];
  }

  return fs
    .readdirSync(coversDir)
    .filter((file) => /\.(svg|png|jpg|jpeg|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      path: `/ProjectsCover/${file}`,
      key: file
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),
    }));
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function resolveProjectCover(
  project: (typeof projects)[number],
  covers: { path: string; key: string }[]
) {
  if (!covers.length) {
    return project.thumbnail;
  }

  const targetKeys = [
    normalizeKey(project.coverKey),
    normalizeKey(project.title),
    ...project.stack.slice(0, 2).map((p) => normalizeKey(p)),
  ];

  const exactMatch = covers.find((cover) =>
    targetKeys.some((key) => cover.key === key)
  );
  if (exactMatch) return exactMatch.path;

  const fuzzyMatch = covers.find((cover) =>
    targetKeys.some((key) => cover.key.includes(key) || key.includes(cover.key))
  );
  if (fuzzyMatch) return fuzzyMatch.path;

  return project.thumbnail;
}

function CellDots() {
  return null;
}

export default function Home() {
  const companyLogos = getCompanyLogos();
  const projectCovers = getProjectCovers();

  return (
    <main className="relative isolate min-h-screen">
      <div className="geometric-overlay">
        {/* Large Decorative Triangles */}
        <svg className="geometric-shape -left-32 -top-20 h-[600px] w-[600px] rotate-12" viewBox="0 0 100 100">
          <polygon points="50,15 90,85 10,85" fill="currentColor" />
        </svg>
        <svg className="geometric-shape -right-40 bottom-20 h-[800px] w-[800px] -rotate-12" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="currentColor" rx="2" />
        </svg>
        
        {/* Ambient Atmosphere */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-sky-500/5 blur-[120px] dark:bg-sky-400/8" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-400/8" />
      </div>
      
      {/* Fixed Theme Toggle */}
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10">
        <div className="ui-panel rounded-full p-0.5 sm:p-1">
          <ThemeToggle />
        </div>
      </div>

      {/* â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ HERO â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ â”€â”€ */}
      <section
        className="relative flex min-h-[100svh] flex-col overflow-hidden pt-4 pb-6 sm:pt-8 sm:pb-8 lg:justify-center lg:gap-6 lg:pt-8 lg:pb-8"
        data-scroll-section
      >
          {/* â”€â”€ â”€â”€ Background: ambient orbs â”€â”€ â”€â”€ */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-orb absolute -left-28 -top-28 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-amber-300/30 via-orange-300/20 to-transparent blur-3xl dark:from-amber-500/18 dark:via-orange-500/10" />
            <div className="animate-orb-delay absolute -bottom-36 -right-28 h-[460px] w-[460px] rounded-full bg-gradient-to-tl from-violet-400/22 via-fuchsia-300/16 to-transparent blur-3xl dark:from-violet-500/14 dark:via-fuchsia-500/10" />
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-300/12 to-transparent blur-2xl dark:from-sky-500/10" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[1220px] flex-col justify-center px-4 py-2 sm:px-6 sm:py-4 lg:flex-1 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10 lg:px-8 lg:py-0">
            <div className="flex max-w-xl flex-col gap-4 sm:gap-6 items-center text-center lg:items-start lg:text-left">
              <div className="hero-fade-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-teal-50 px-3.5 py-1.5 text-[11px] font-semibold text-emerald-700 shadow-sm shadow-emerald-100 sm:px-4 sm:text-xs dark:border-emerald-500/30 dark:from-emerald-500/10 dark:to-teal-500/10 dark:text-emerald-300 dark:shadow-none">
                  <span className="live-pulse h-2 w-2 rounded-full bg-emerald-500" />
                  Available for work
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-gradient-to-r from-white/80 via-violet-50/60 to-fuchsia-50/60 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-500 shadow-sm shadow-violet-100/50 sm:px-3.5 sm:text-[10px] sm:tracking-[0.18em] dark:border-violet-500/20 dark:from-violet-500/8 dark:via-fuchsia-500/5 dark:to-white/0 dark:text-neutral-400 dark:shadow-none">
                  <span>Full-Stack Engineer</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                  <span className="inline-flex items-center gap-1">
                    {/* sparkle icon */}
                    <svg viewBox="0 0 16 16" className="h-3 w-3 flex-shrink-0" aria-hidden="true" fill="none">
                      <path d="M8 1.5 L8.9 5.8 L13 6.5 L8.9 7.2 L8 11.5 L7.1 7.2 L3 6.5 L7.1 5.8 Z" fill="url(#ai-star-grad)" />
                      <path d="M12 1 L12.5 2.8 L14.5 3 L12.5 3.2 L12 5 L11.5 3.2 L9.5 3 L11.5 2.8 Z" fill="url(#ai-star-grad)" opacity="0.7"/>
                      <defs>
                        <linearGradient id="ai-star-grad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#a855f7"/>
                          <stop offset="100%" stopColor="#ec4899"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text font-black text-transparent dark:from-violet-400 dark:to-fuchsia-400">AI</span>
                    <span className="text-neutral-400 dark:text-neutral-500">-Ready Products</span>
                  </span>
                </div>
              </div>

              <div className="hero-fade-2 space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="h-5 w-[2px] rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
                  <p className="text-[17px] font-black uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
                    Hi, I&apos;m Pranay Langhe
                  </p>
                </div>
                <h1 className="max-w-2xl text-[2.2rem] font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.35rem]">
                  Building reliable web products
                  <span className="animate-gradient-text block bg-gradient-to-r from-amber-400 via-rose-500 to-violet-500 bg-clip-text text-transparent">
                    with speed and taste.
                  </span>
                </h1>
              </div>

              <p className="hero-fade-3 max-w-xl text-[0.98rem] leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-300">
                Full-stack engineer focused on high-performance MERN and Next.js systems. I ship polished interfaces, scalable APIs, and AI-powered workflows for teams that move fast.
              </p>

              <div className="hero-fade-4 flex flex-wrap justify-center lg:justify-start gap-2">
                {[
                  {
                    label: "JavaScript",
                    src: "https://cdn.simpleicons.org/javascript/F7DF1E",
                    bg: "bg-[#F7DF1E]/10 dark:bg-[#F7DF1E]/15",
                  },
                  {
                    label: "Node.js",
                    src: "https://cdn.simpleicons.org/nodedotjs/339933",
                    bg: "bg-[#339933]/10 dark:bg-[#339933]/20",
                  },
                  {
                    label: "React",
                    src: "https://cdn.simpleicons.org/react/61DAFB",
                    bg: "bg-[#61DAFB]/10 dark:bg-[#61DAFB]/15",
                  },
                  {
                    label: "Next.js",
                    src: "https://cdn.simpleicons.org/nextdotjs/000000/ffffff",
                    bg: "bg-black/8 dark:bg-white/10",
                  },
                  {
                    label: "TypeScript",
                    src: "https://cdn.simpleicons.org/typescript/3178C6",
                    bg: "bg-[#3178C6]/10 dark:bg-[#3178C6]/20",
                  },
                ].map(({ label, src, bg }) => (
                  <span
                    key={label}
                    className="ui-chip inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.72rem] sm:px-3 sm:text-xs"
                  >
                    <span className={`inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm ${bg}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" width={12} height={12} className="h-3 w-3 object-contain" aria-hidden="true" />
                    </span>
                    {label}
                  </span>
                ))}
              </div>


              <div className="hero-fade-5 relative z-20 flex items-center justify-center lg:justify-start w-full flex-wrap gap-3">
                <a
                  href="/Pranay_Langhe_Resume.pdf"
                  download="Pranay_Langhe_Resume.pdf"
                  className="ui-button-primary w-full sm:w-auto"
                >
                  View Resume
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0-5 5m5-5H6" />
                  </svg>
                </a>

                <Link
                  href="https://www.linkedin.com/in/pranay-langhe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-button-secondary w-full sm:w-auto"
                >
                  Connect on LinkedIn
                </Link>
              </div>
            </div>

            <div className="relative z-10 mx-auto mt-12 flex w-full max-w-[220px] items-center justify-center sm:mt-8 sm:max-w-[280px] md:max-w-[300px] lg:mt-0 lg:max-w-none">
              <div className="pointer-events-none absolute inset-0 -z-10 scale-110 bg-gradient-to-br from-amber-300/35 via-pink-300/20 to-violet-400/25 blur-3xl dark:from-amber-500/18 dark:via-pink-500/14 dark:to-violet-500/16" />
              <div className="relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[300px] md:w-[300px] lg:h-[320px] lg:w-[320px]">
                <div className="animate-ring-spin absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400 via-fuchsia-500 to-sky-400 p-[2px] opacity-55 blur-[1px]" />
                <div className="absolute -inset-6 rounded-full border border-neutral-300/30 dark:border-neutral-700/30" />
                <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-white bg-gradient-to-b from-neutral-100 to-neutral-200 shadow-2xl dark:border-neutral-800 dark:from-neutral-800 dark:to-neutral-900">
                  <Image
                    src="/pranay.png"
                    alt="Portrait of Pranay Langhe"
                    width={640}
                    height={760}
                    className="absolute bottom-0 left-1/2 h-[122%] w-auto max-w-none -translate-x-1/2 object-contain"
                    priority
                  />
                </div>

                {/* Bring head outside the circle for 3D breakout effect */}
                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{ clipPath: "polygon(-50% -50%, 150% -50%, 150% 38%, -50% 38%)" }}
                >
                  <Image
                    src="/pranay.png"
                    alt=""
                    width={640}
                    height={760}
                    className="absolute bottom-0 left-1/2 h-[122%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                <div className="badge-float-a absolute -left-5 top-[12%] z-20 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-sky-700 shadow-lg sm:-left-1 sm:top-[18%] sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.12em] dark:border-white/15 dark:bg-neutral-900/90 dark:text-sky-300">
                  Create
                </div>
                <div className="badge-float-b absolute -right-4 top-[10%] z-20 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-fuchsia-700 shadow-lg sm:right-0 sm:top-[15%] sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.12em] dark:border-white/15 dark:bg-neutral-900/90 dark:text-fuchsia-300">
                  Build
                </div>
                <div className="badge-float-d absolute -left-5 bottom-[14%] z-20 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-amber-700 shadow-lg sm:-left-1 sm:bottom-[18%] sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.12em] dark:border-white/15 dark:bg-neutral-900/90 dark:text-amber-300">
                  Evolve
                </div>
                <div className="badge-float-c absolute -right-4 bottom-[12%] z-20 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-700 shadow-lg sm:right-0 sm:bottom-[16%] sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.12em] dark:border-white/15 dark:bg-neutral-900/90 dark:text-emerald-300">
                  Inspire
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 sm:mt-8 lg:mt-0">
            <div className="mx-auto w-full max-w-xl lg:max-w-[1220px] px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {[
                  { value: "4.5+", label: "Years experience", gradient: "from-indigo-500 to-purple-400", border: "from-indigo-500/80 to-purple-500/80" },
                  { value: "10+", label: "Systems delivered", gradient: "from-pink-500 to-rose-400", border: "from-pink-500/80 to-rose-500/80" },
                  { value: "5+", label: "Domains covered", gradient: "from-teal-400 to-emerald-400", border: "from-teal-400/80 to-emerald-400/80" },
                  { value: "AI+", label: "Modern engineering", gradient: "from-orange-500 to-amber-400", border: "from-orange-500/80 to-amber-400/80" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="relative flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white/60 py-5 px-3 sm:py-6 sm:px-4 shadow-sm backdrop-blur-sm dark:border-white/5 dark:bg-neutral-900/60"
                  >
                    {/* Top glowing border line */}
                    <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r opacity-0 dark:opacity-100" style={{ backgroundImage: `linear-gradient(to right, transparent, var(--tw-gradient-from), var(--tw-gradient-to), transparent)` }} />
                    <div className={`absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r ${stat.border} opacity-0 dark:opacity-100`} />
                    <div className={`absolute top-0 left-1/4 right-1/4 h-[3px] bg-gradient-to-r ${stat.border} blur-[4px] opacity-0 dark:opacity-60`} />
                    
                    {/* Top glow for light mode */}
                    <div className={`absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r ${stat.border} opacity-100 dark:opacity-0`} />
                    
                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-[0.95rem] text-neutral-600 dark:text-neutral-300 text-center">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* â”€â”€ Below-hero content container â”€â”€ */}
      <div
        className="relative z-10 mx-auto w-full max-w-[1220px] px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32"
        data-scroll-root
      >
          {/* Companies Section */}
          {companyLogos.length > 0 ? (
            <section
              className="ui-section-divider"
              data-scroll-section
            >
              <div className="relative z-10 px-1">
                <div className="ui-section-head">
                    <p className="ui-kicker">
                      Experience
                    </p>
                    <h2 className="ui-title">
                      Companies and Client Worked With
                    </h2>
                    <div className="mt-3 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
                    <p className="ui-subtitle">
                      A selection of brands and teams I&apos;ve contributed to
                      across product, SaaS, and digital delivery.
                    </p>
                </div>

                <div className="ui-section-body space-y-10 sm:space-y-14">
                  {/* Row 1: 5 Logos */}
                  <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16">
                    {companyLogos.slice(0, 5).map((logo, index) => (
                      <ScrollReveal key={logo.src} delay={index * 40}>
                        <a
                          href={logo.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${logo.alt}`}
                          className="ui-logo-card block"
                        >
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={160}
                            height={70}
                            className="h-9 w-auto object-contain opacity-90 transition-all hover:opacity-100 sm:h-12"
                          />
                        </a>
                      </ScrollReveal>
                    ))}
                  </div>
                  {/* Row 2: 2 Logos */}
                  <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16">
                    {companyLogos.slice(5).map((logo, index) => (
                      <ScrollReveal key={logo.src} delay={(index + 5) * 40}>
                        <a
                          href={logo.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${logo.alt}`}
                          className="ui-logo-card block"
                        >
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={160}
                            height={70}
                            className="h-9 w-auto object-contain opacity-90 transition-all hover:opacity-100 sm:h-12"
                          />
                        </a>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {/* Core Capabilities / Skills */}
          <section
            className="ui-section-divider"
            data-scroll-section
          >
            <div className="relative z-10 px-1">
              <div className="ui-section-head">
                <p className="ui-kicker">
                  Core Capabilities
                </p>
                <h2 className="ui-title">
                  Skills & Expertise
                </h2>
                <div className="mt-3 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent" />
                <p className="ui-subtitle">
                  A more detailed view of the stack, delivery tooling, and
                  engineering strengths behind the products I build.
                </p>
              </div>

              <div className="ui-section-body grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
                {skillCards.map((card, index) => (
                  <ScrollReveal
                    key={card.title}
                    delay={index * 90}
                    className="h-full"
                  >
                    <article className="ui-card group relative flex h-full flex-col overflow-hidden p-4 sm:p-5">
                      <div className={`ui-card-glow bg-gradient-to-br ${
                        card.icon === "frontend" 
                        ? "from-sky-400 to-blue-600" 
                        : card.icon === "backend" 
                        ? "from-emerald-400 to-teal-600" 
                        : "from-fuchsia-400 to-violet-600"
                      }`} />
                      
                      <div className="relative z-10 mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br p-[1px] shadow-sm ${
                            card.icon === "frontend" 
                            ? "from-sky-400 to-blue-500" 
                            : card.icon === "backend" 
                            ? "from-emerald-400 to-teal-500" 
                            : "from-fuchsia-400 to-violet-500"
                          }`}>
                            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-neutral-950">
                              <SkillIcon type={card.icon} />
                            </div>
                          </div>
                          <div>
                            <h3 className={`text-[0.95rem] font-bold leading-tight ${
                              card.icon === "frontend"
                                ? "text-sky-700 dark:text-sky-300"
                                : card.icon === "backend"
                                  ? "text-emerald-700 dark:text-emerald-300"
                                  : "text-fuchsia-700 dark:text-fuchsia-300"
                            }`}>
                              {card.title}
                            </h3>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold tabular-nums uppercase tracking-widest text-neutral-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mt-2 text-[0.92rem] leading-6 text-neutral-600 dark:text-neutral-300">
                        {card.summary}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {card.highlights.map((item) => {
                          const logo = techBadgeMap[item];

                          return (
                            <span
                              key={item}
                              className="ui-chip inline-flex items-center gap-1.5 px-2 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.08em]"
                            >
                              {logo ? (
                                <span className={`inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm ${logo.bg}`}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={logo.src}
                                    alt=""
                                    width={12}
                                    height={12}
                                    className="h-3 w-3 object-contain"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                              {item}
                            </span>
                          );
                        })}
                      </div>

                      <ul className="mt-5 space-y-3">
                        {card.sections.map((section) => (
                          <li
                            key={section.label}
                            className="border-l border-neutral-200/80 pl-3 text-[0.92rem] leading-6 text-neutral-600 dark:border-white/12 dark:text-neutral-300"
                          >
                            <span className="block font-semibold text-neutral-900 dark:text-neutral-100">
                              {section.label}
                            </span>
                            <span className="mt-1 block">
                              {section.details}
                            </span>
                          </li>
                        ))}
                      </ul>

                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Workflow Section */}
          <section
            className="ui-section-divider"
            data-scroll-section
          >
            <div className="relative z-10 px-1">
              <div>
                <div className="ui-section-head">
                    <p className="ui-kicker">
                      Workflow
                    </p>
                    <h2 className="ui-title">
                      AI-Powered Productivity Stack
                    </h2>
                    <div className="mt-3 mx-auto h-px w-44 bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
                    <p className="ui-subtitle">
                      A premium toolchain for moving from concept to clean,
                      production-ready delivery with more speed and precision.
                    </p>
                </div>

                <div className="ui-section-body relative overflow-hidden py-4">
                  <div className="marquee-rtl-track flex w-max items-center hover:[animation-play-state:paused]">
                    {[0, 1].map((set) => (
                      <div
                        key={set}
                        className="flex shrink-0 items-center gap-6 pr-6"
                      >
                        {aiProductivityTools.map((tool) => (
                          <article key={`${set}-${tool.name}`} className="ui-card relative overflow-hidden group w-[300px] sm:w-[340px] shrink-0 p-6 sm:p-7">
                            {/* Orbital Accent Background */}
                            <div className={`ui-card-glow bg-gradient-to-br ${tool.accent}`} />
                            
                            <div className="relative z-10 flex items-center justify-between">
                              <div className="ui-ai-node-icon">
                                <div className={`absolute inset-0 rounded-2xl opacity-10 bg-gradient-to-br ${tool.accent}`} />
                                <Image
                                  src={tool.logo}
                                  alt=""
                                  width={28}
                                  height={28}
                                  className="relative z-10 h-7 w-7 object-contain"
                                />
                              </div>
                              <div className="flex flex-col items-end text-right">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                                  {tool.role}
                                </span>
                                <div className="mt-1 flex gap-1">
                                  {[1, 2, 3].map((i) => (
                                    <div 
                                      key={i} 
                                      className={`h-1 w-3 rounded-full transition-all duration-300 ${
                                        i <= 2 
                                          ? `bg-neutral-800 dark:bg-neutral-200 group-hover:bg-gradient-to-r ${tool.accent}` 
                                          : 'bg-neutral-200 dark:bg-neutral-800'
                                      }`} 
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="relative z-10 mt-8 space-y-2">
                              <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                {tool.name}
                              </h3>
                              <p className="text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                                {tool.focus}
                              </p>
                            </div>

                          </article>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Projects */}
          <section
            className="ui-section-divider"
            data-scroll-section
          >
            <div className="relative z-10 px-1">
              <div className="ui-section-head">
                  <p className="ui-kicker">
                    Portfolio
                  </p>
                  <h2 className="ui-title">
                    Selected Projects
                  </h2>
                  <div className="mt-3 mx-auto h-px w-36 bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent" />
                  <p className="ui-subtitle">
                    Architecture-led product work across SaaS, commerce,
                    healthcare, AI, and operational web platforms.
                    <span className="mt-3 block rounded-md border border-amber-300/60 bg-amber-100/70 px-4 py-2 font-semibold text-amber-950 shadow-sm dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-100">
                      Some client projects are confidential, so only selected
                      public work is shown here.
                    </span>
                  </p>
              </div>
            </div>

            <div className="ui-section-body grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project, index) => (
                  <ScrollReveal
                    key={project.title}
                    delay={(index % 3) * 90}
                    className="h-full"
                  >
                    <article className="ui-card group relative flex h-full min-h-[520px] flex-col overflow-hidden p-4 sm:min-h-[580px] sm:p-5">
                      <div className="ui-card-glow bg-gradient-to-tr from-sky-400 via-fuchsia-500 to-amber-400" />
                      
                      <div className="relative z-10 mb-5 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-fuchsia-500 p-[1px] shadow-sm">
                            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white dark:bg-neutral-950">
                              <svg viewBox="0 0 24 24" className="h-5 w-5 text-neutral-800 dark:text-neutral-200" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                              {project.category}
                            </p>
                            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold tabular-nums uppercase tracking-widest text-neutral-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="relative z-10 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900">
                        <Image
                          src={resolveProjectCover(project, projectCovers)}
                          alt={`${project.title} thumbnail`}
                          width={720}
                          height={420}
                          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-52"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      <div className="relative z-10 mt-5 flex flex-1 flex-col">
                        <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                          {project.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.stack.map((item) => {
                            const logo = techBadgeMap[item];

                            return (
                              <span
                                key={item}
                                className="ui-chip inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] dark:border-white/20"
                              >
                                {logo ? (
                                  <span className={`inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm ${logo.bg}`}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={logo.src}
                                      alt=""
                                      width={12}
                                      height={12}
                                      className="h-3 w-3 object-contain"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                                {item}
                              </span>
                            );
                          })}
                        </div>

                        <div className="mt-5 space-y-4">
                          <div className="border-l border-sky-200/80 pl-4 dark:border-sky-400/20">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                              Architecture
                            </p>
                            <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                              {project.architecture}
                            </p>
                          </div>

                          <div className="border-l border-fuchsia-200/80 pl-4 dark:border-fuchsia-400/20">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-fuchsia-700 dark:text-fuchsia-300">
                              Engineering Focus
                            </p>
                            <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                              {project.focus}
                            </p>
                          </div>
                        </div>

                        <ul className="mt-5 flex flex-wrap gap-2">
                          {project.capabilities.map((point) => (
                            <li
                              key={point}
                              className="ui-chip px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-neutral-600 dark:border-white/20 dark:text-neutral-300"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-6">
                          <Link
                            href={project.href}
                            target="_blank"
                            className="inline-flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-sky-500 hover:via-fuchsia-500 hover:to-amber-400 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-transparent"
                          >
                            <span>Open Project</span>
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M7 17 17 7M8 7h9v9" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
            </div>
          </section>

          {/* â”€â”€ Education â”€â”€ */}
          <section className="ui-section-divider" data-scroll-section>
            <div className="relative z-10 px-1">
              <div className="ui-section-head">
                <p className="ui-kicker">Academic Background</p>
                <h2 className="ui-title">Education</h2>
                <div className="mt-3 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
                <p className="ui-subtitle">
                  Grounded in computer science fundamentals, built on real-world engineering practice.
                </p>
              </div>

              <div className="ui-section-body">
                <ScrollReveal>
                  <div className="ui-card group relative overflow-hidden p-0">
                    <div className="ui-card-glow bg-gradient-to-br from-sky-400 to-blue-600" />

                    <div className="relative z-10 grid gap-0 lg:grid-cols-[1fr_0.9fr]">

                      {/* â”€â”€ Left: Degree Details â”€â”€ */}
                      <div className="flex flex-col justify-between gap-8 p-7 sm:p-9">

                        {/* Header */}
                        <div>
                          <div className="flex items-start gap-4">
                            {/* College Logo Badge */}
                            <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-[2px] shadow-lg">
                              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white dark:bg-neutral-950">
                                <svg viewBox="0 0 24 24" className="h-7 w-7 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-2xl">
                                MIT World Peace University
                              </h3>
                              <p className="mt-0.5 text-sm font-semibold text-sky-600 dark:text-sky-400">
                                MITWPU · Pune, Maharashtra
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky-700 ring-1 ring-sky-200/80 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25l7.5 7.5 7.5-7.5" /></svg>
                                Bachelor of Technology
                              </span>
                            </div>
                            <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
                              Computer Engineering
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              School of Computer Engineering &amp; Technology
                            </p>
                          </div>
                        </div>

                        {/* Meta Grid */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {[
                            { label: "Batch", value: "2017 – 2021" },
                            { label: "Duration", value: "4 Years" },
                            { label: "Mode", value: "Full-Time" },
                          ].map((m) => (
                            <div key={m.label} className="rounded-2xl border border-neutral-200/80 bg-neutral-50/80 p-3 dark:border-white/10 dark:bg-white/[0.04]">
                              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500">{m.label}</p>
                              <p className="mt-1 text-sm font-bold text-neutral-800 dark:text-neutral-100">{m.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Coursework */}
                        <div>
                          <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                            Relevant Coursework
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {[
                              "Data Structures & Algorithms",
                              "Operating Systems",
                              "Database Management",
                              "Computer Networks",
                              "Web Technologies",
                              "Software Engineering",
                              "Object-Oriented Programming",
                              "Cloud Computing",
                            ].map((course) => (
                              <li
                                key={course}
                                className="ui-chip px-2.5 py-1 text-[0.68rem] font-semibold"
                              >
                                {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* â”€â”€ Right: Image Gallery â”€â”€ */}
                      <div className="relative overflow-hidden rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
                        {/* Top image */}
                        <div className="relative h-56 w-full overflow-hidden sm:h-64 lg:h-[55%]">
                          <Image
                            src="/education/MIT World Peace University (MITWPU), Pune_banner210501054449.jpg"
                            alt="MIT World Peace University campus banner"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 via-transparent to-transparent" />
                          <span className="absolute bottom-3 left-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                            MITWPU Campus
                          </span>
                        </div>
                        {/* Bottom two images */}
                        <div className="grid h-44 grid-cols-2 lg:h-[45%]">
                          <div className="relative overflow-hidden border-t border-r border-white/10">
                            <Image
                              src="/education/MIT WPU Pic_20260129180105_original_image_31.webp"
                              alt="MIT WPU campus view"
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="25vw"
                            />
                          </div>
                          <div className="relative overflow-hidden border-t border-white/10">
                            <Image
                              src="/education/MIT-WPU-1.tif.png"
                              alt="MIT WPU building"
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="25vw"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* â”€â”€ Courses & Certifications â”€â”€ */}
          <section className="ui-section-divider" data-scroll-section>
            <div className="relative z-10 px-1">
              <div className="ui-section-head">
                <p className="ui-kicker">Learning &amp; Development</p>
                <h2 className="ui-title">Courses &amp; Certifications</h2>
                <div className="mt-3 mx-auto h-px w-44 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
                <p className="ui-subtitle">
                  Continuously upskilling across full-stack development, cloud, and modern web engineering.
                </p>
              </div>

              <div className="ui-section-body grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  {
                    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
                    platform: "Udemy",
                    instructor: "Jonas Schmedtmann",
                    category: "JavaScript",
                    logo: "https://cdn.simpleicons.org/udemy/A435F0",
                    accent: "from-violet-400 to-purple-600",
                    categoryColor: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 ring-violet-200/80 dark:ring-violet-500/30",
                  },
                  {
                    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
                    platform: "Udemy",
                    instructor: "Jonas Schmedtmann",
                    category: "Node.js",
                    logo: "https://cdn.simpleicons.org/udemy/A435F0",
                    accent: "from-emerald-400 to-teal-600",
                    categoryColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 ring-emerald-200/80 dark:ring-emerald-500/30",
                  },
                  {
                    title: "React - The Complete Guide (incl. Next.js, Redux)",
                    platform: "Udemy",
                    instructor: "Maximilian Schwarzmüller",
                    category: "React",
                    logo: "https://cdn.simpleicons.org/udemy/A435F0",
                    accent: "from-cyan-400 to-sky-600",
                    categoryColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 ring-cyan-200/80 dark:ring-cyan-500/30",
                  },
                  {
                    title: "Next.js & React — The Complete Guide",
                    platform: "Udemy",
                    instructor: "Maximilian Schwarzmüller",
                    category: "Next.js",
                    logo: "https://cdn.simpleicons.org/udemy/A435F0",
                    accent: "from-neutral-400 to-neutral-700",
                    categoryColor: "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-white/8 ring-neutral-200/80 dark:ring-white/15",
                  },
                  {
                    title: "The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert",
                    platform: "Udemy",
                    instructor: "Colt Steele",
                    category: "Database",
                    logo: "https://cdn.simpleicons.org/udemy/A435F0",
                    accent: "from-orange-400 to-amber-600",
                    categoryColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 ring-amber-200/80 dark:ring-amber-500/30",
                  },
                  {
                    title: "Docker & Kubernetes: The Practical Guide",
                    platform: "Udemy",
                    instructor: "Maximilian Schwarzmüller",
                    category: "DevOps",
                    logo: "https://cdn.simpleicons.org/udemy/A435F0",
                    accent: "from-blue-400 to-indigo-600",
                    categoryColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 ring-blue-200/80 dark:ring-blue-500/30",
                  },
                ].map((course, index) => (
                  <ScrollReveal key={course.title} delay={index * 80} className="h-full">
                    <article className="ui-card group relative flex h-full flex-col overflow-hidden p-5 sm:p-6">
                      <div className={`ui-card-glow bg-gradient-to-br ${course.accent}`} />

                      <div className="relative z-10 flex flex-col gap-4 h-full">
                        {/* Top row: platform logo + completed badge */}
                        <div className="flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 ring-1 ring-violet-200/60 dark:ring-violet-500/20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={course.logo} alt={course.platform} width={20} height={20} className="h-5 w-5 object-contain" aria-hidden="true" />
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-700 ring-1 ring-emerald-200/80 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Completed
                          </span>
                        </div>

                        {/* Course title */}
                        <h3 className="text-[0.9rem] font-bold leading-snug tracking-tight text-neutral-900 dark:text-neutral-50 flex-1">
                          {course.title}
                        </h3>

                        {/* Instructor */}
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          by <span className="font-semibold text-neutral-700 dark:text-neutral-300">{course.instructor}</span>
                        </p>

                        {/* Footer: platform + category */}
                        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-white/8">
                          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{course.platform}</span>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ring-1 ${course.categoryColor}`}>
                            {course.category}
                          </span>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>


          {/* Footer */}
          <footer className="mt-24 border-t border-neutral-100 py-12 dark:border-white/5">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <p className="text-sm font-bold tracking-tight text-neutral-500">
                © {new Date().getFullYear()} Pranay Langhe<span className="text-primary-500">.</span> All rights reserved.
              </p>
              <div className="max-w-sm text-center sm:text-right">
                <p className="text-xs italic leading-relaxed text-neutral-400 dark:text-neutral-500">
                  &quot;The only way to do great work is to love what you do.&quot;
                  <span className="mt-1 block font-bold not-italic tracking-widest text-neutral-500 dark:text-neutral-600">
                    — STEVE JOBS
                  </span>
                </p>
              </div>
            </div>
          </footer>
      </div>
    </main>
  );
}
