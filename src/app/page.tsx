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
  maxItems: number;
  summary: string;
  items: string[];
};

const skillCards: SkillCard[] = [
  {
    title: "Languages & Frontend",
    icon: "frontend",
    maxItems: 8,
    summary:
      "Core frontend languages and frameworks for modern, responsive web apps.",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "HTML5",
      "CSS3/Sass",
    ],
  },
  {
    title: "Backend & Databases",
    icon: "backend",
    maxItems: 8,
    summary:
      "Building APIs and data layers with scalable backend architecture.",
    items: [
      "Node.js",
      "Express.js",
      "Laravel",
      "RESTful APIs",
      "MongoDB",
      "PostgreSQL",
      "Oracle",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "devops",
    maxItems: 10,
    summary:
      "Deployment, automation, testing, and collaboration tools for production delivery.",
    items: [
      "GitHub",
      "Docker",
      "Kubernetes",
      "CI/CD (GitHub Actions)",
      "Vercel",
      "DigitalOcean",
      "Linux",
      "Postman",
      "AWS S3",
      "Cloudinary",
      "ServiceNow",
      "PuTTY",
      "Jira",
      "Firebase",
      "Jest / Testing Library",
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

const projects = [
  {
    title: "Beyondwalls - Real Estate Property Listing",
    coverKey: "beyondwalls",
    thumbnail: "/project-thumb-1.png",
    description:
      "A premium Indian real estate platform featuring advanced property search, developer showcases, and conversion-optimized listing pages.",
    href: "https://www.beyondwalls.com/",
    points: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Real Estate Tech",
      "Lead Gen",
      "Responsive UI",
    ],
    cta: "gradient",
  },
  {
    title: "Kylas - Sales CRM Platform",
    coverKey: "kylas",
    thumbnail: "/project-thumb-2.png",
    description:
      "A comprehensive sales CRM designed to streamline lead management, pipeline tracking, and team collaboration for high-growth businesses.",
    href: "https://kylas.io/",
    points: [
      "React.js",
      "Node.js",
      "Express.js",
      "CRM Architecture",
      "Data Analytics",
      "B2B SaaS",
    ],
    cta: "gradient",
  },
  {
    title: "Modern Admin Dashboard - React & Chart-Based UI",
    coverKey: "admin-dashboard",
    thumbnail: "/project-thumb-1.png",
    description:
      "A sleek and responsive admin dashboard with analytics, user stats, dark/light mode, sidebar navigation, and interactive charts for operational insights.",
    href: "#",
    points: [
      "React.js",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Chart UI",
    ],
    cta: "gradient",
  },
  {
    title: "UrbanCart (React + Laravel)",
    coverKey: "urbancart",
    thumbnail: "/project-thumb-2.png",
    description:
      "Indian premium furniture and decor e-commerce platform with payments, tracking integrations, and a conversion-focused storefront experience.",
    href: "https://urbancart.in/",
    points: [
      "React.js",
      "HTML/CSS",
      "JavaScript",
      "Razorpay/PayPal",
      "Shopify",
      "Analytics",
    ],
    cta: "gradient",
  },
  {
    title: "Tomato - Food Delivery App",
    coverKey: "tomato",
    thumbnail: "/project-thumb-3.png",
    description:
      "React-based food delivery app featuring authentication, menu browsing, cart flows, and smooth client-side routing for a fast SPA experience.",
    href: "https://app-food-tomato.netlify.app/",
    points: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Routing",
      "Authentication",
    ],
    cta: "gradient",
  },
  {
    title: "VidTube - Modern YouTube UI Clone",
    coverKey: "vidtube",
    thumbnail: "/project-thumb-1.png",
    description:
      "YouTube-inspired streaming app with responsive layouts, search, and channel/video browsing for a dynamic media-style frontend.",
    href: "https://vidtube-sable.vercel.app/",
    points: [
      "React.js",
      "Context API",
      "Axios",
      "HTML/CSS",
      "JavaScript",
      "Responsive UI",
    ],
    cta: "gradient",
  },
  {
    title: "Netflix Clone - React Movie Streaming UI",
    coverKey: "netflix",
    thumbnail: "/project-thumb-2.png",
    description:
      "Netflix-style movie browsing interface with dynamic content rows, banners, and polished transitions using modern React patterns.",
    href: "https://netflix-clone-sooty-psi-69.vercel.app/",
    points: [
      "React.js",
      "Styled Components",
      "Material UI",
      "Framer",
      "Firebase",
      "TMDb API",
    ],
    cta: "gradient",
  },
  {
    title: "Prescripto - Doctor Appointment App",
    coverKey: "prescripto",
    thumbnail: "/project-thumb-3.png",
    description:
      "Full-stack MERN app for managing appointments and prescriptions with secure data handling and streamlined doctor workflows.",
    href: "https://prescripto.vercel.app/",
    points: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MERN Stack",
      "Secure Data",
    ],
    cta: "gradient",
  },
  {
    title: "The Wild Oasis (Next.js)",
    coverKey: "wild-oasis",
    thumbnail: "/project-thumb-1.png",
    description:
      "Hotel management web app with modern dashboard patterns, filtering, stats, and strong component-based architecture in Next.js.",
    href: "https://the-wild-oasis-website.vercel.app/",
    points: [
      "Next.js",
      "React",
      "Styled Components",
      "SSR Benefits",
      "Dashboard UI",
      "Filtering",
    ],
    cta: "gradient",
  },
  {
    title: "Omnifood - Nutrition App",
    coverKey: "omnifood",
    thumbnail: "/project-thumb-2.png",
    description:
      "Responsive landing page for an AI-powered nutrition service with strong visual hierarchy and clean section structure.",
    href: "https://omnifood.dev/",
    points: [
      "HTML/CSS",
      "SCSS",
      "UI/UX",
      "Landing Page",
      "Performance",
      "Responsive",
    ],
    cta: "gradient",
  },
  {
    title: "JWT Authentication",
    coverKey: "jwt-auth",
    thumbnail: "/project-thumb-3.png",
    description:
      "Authentication system using JWT with secure login/signup flows and protected API routes across client and server.",
    href: "https://mern-auth-client-seven.vercel.app/",
    points: [
      "React.js",
      "Node.js",
      "Express.js",
      "JWT/Bcrypt",
      "Mongoose",
      "Protected Routes",
    ],
    cta: "gradient",
  },
  {
    title: "Imagify - Image Generator",
    coverKey: "imagify",
    thumbnail: "/project-thumb-1.png",
    description:
      "AI-powered image generation app that turns text prompts into visuals for creators, marketers, and product ideation workflows.",
    href: "https://imagify-shozab.vercel.app/",
    points: [
      "React.js",
      "Node.js",
      "Express.js",
      "JWT/Bcrypt",
      "Firebase",
      "AI Generation",
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
    ...project.points.slice(0, 2).map((p) => normalizeKey(p)),
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
    <main className="relative isolate min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      
      {/* Fixed Theme Toggle */}
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10">
        <div className="ui-panel rounded-full p-0.5 sm:p-1">
          <ThemeToggle />
        </div>
      </div>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ HERO Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section
        className="relative flex min-h-[100svh] flex-col overflow-hidden pt-14 pb-12 sm:pt-16 sm:pb-14 lg:h-[100svh] lg:justify-between lg:pt-8 lg:pb-10"
        data-scroll-section
      >
          {/* Ã¢â€â‚¬Ã¢â€â‚¬ Background: ambient orbs Ã¢â€â‚¬Ã¢â€â‚¬ */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-orb absolute -left-28 -top-28 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-amber-300/30 via-orange-300/20 to-transparent blur-3xl dark:from-amber-500/18 dark:via-orange-500/10" />
            <div className="animate-orb-delay absolute -bottom-36 -right-28 h-[460px] w-[460px] rounded-full bg-gradient-to-tl from-violet-400/22 via-fuchsia-300/16 to-transparent blur-3xl dark:from-violet-500/14 dark:via-fuchsia-500/10" />
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-300/12 to-transparent blur-2xl dark:from-sky-500/10" />
            <span className="grid-trace-horizontal absolute top-0 h-px w-28 bg-gradient-to-r from-transparent via-sky-400/80 to-transparent dark:via-sky-300/80" />
            <span className="grid-trace-horizontal absolute bottom-0 h-px w-24 bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent dark:via-fuchsia-300/80 [animation-delay:1.4s]" />
            <span className="grid-trace-vertical absolute left-0 h-20 w-px bg-gradient-to-b from-transparent via-amber-400/70 to-transparent dark:via-amber-300/70 [animation-delay:0.8s]" />
            <span className="grid-trace-vertical absolute right-0 h-24 w-px bg-gradient-to-b from-transparent via-sky-400/70 to-transparent dark:via-sky-300/70 [animation-delay:2s]" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-4 sm:px-6 sm:py-6 lg:flex-1 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:px-8 lg:py-4">
            <div className="flex max-w-xl flex-col gap-6 sm:gap-7">
              <div className="hero-fade-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-teal-50 px-3.5 py-1.5 text-[11px] font-semibold text-emerald-700 shadow-sm shadow-emerald-100 sm:px-4 sm:text-xs dark:border-emerald-500/30 dark:from-emerald-500/10 dark:to-teal-500/10 dark:text-emerald-300 dark:shadow-none">
                  <span className="live-pulse h-2 w-2 rounded-full bg-emerald-500" />
                  Available for work
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/70 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-500 sm:px-3.5 sm:text-[10px] sm:tracking-[0.18em] dark:border-white/10 dark:bg-white/5 dark:text-neutral-400">
                  <span>Full-Stack Engineer</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                  <span>AI-Ready Products</span>
                </div>
              </div>

              <div className="hero-fade-2 space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.23em] text-neutral-400 dark:text-neutral-500">
                  Hi, I&apos;m Pranay Langhe
                </p>
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

              <div className="hero-fade-4 flex flex-wrap gap-2">
                {["JavaScript", "Node.js", "React", "Next.js", "TypeScript", "AI Workflows"].map((tag) => (
                  <span
                    key={tag}
                    className="ui-chip px-2.5 py-1 text-[0.72rem] sm:px-3 sm:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="hero-fade-5 flex w-full flex-wrap gap-3">
                <a
                  href="/Resume-Pranay%20Langhe.pdf"
                  download="Resume-Pranay-Langhe.pdf"
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

            <div className="relative mx-auto mt-10 flex w-full max-w-[260px] items-center justify-center sm:max-w-[330px] md:max-w-[360px] lg:mt-0 lg:max-w-none">
              <div className="pointer-events-none absolute inset-0 -z-10 scale-110 bg-gradient-to-br from-amber-300/35 via-pink-300/20 to-violet-400/25 blur-3xl dark:from-amber-500/18 dark:via-pink-500/14 dark:to-violet-500/16" />
              <div className="relative h-[240px] w-[240px] sm:h-[320px] sm:w-[320px] md:h-[340px] md:w-[340px] lg:h-[360px] lg:w-[360px]">
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
                  style={{ clipPath: "polygon(-50% -50%, 150% -50%, 150% 52%, -50% 52%)" }}
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

          {/* Ã¢â€â‚¬Ã¢â€â‚¬ Stats bar Ã¢â€â‚¬Ã¢â€â‚¬ */}
          <div className="relative z-10 mt-8 px-4 pt-4 pb-6 text-sm sm:mt-10 sm:px-6 sm:pt-5 sm:pb-8 lg:mt-0 lg:px-8 lg:pb-0">
            <div className="ui-panel mx-auto max-w-6xl">
              <div className="relative grid overflow-hidden rounded-[1.75rem] grid-cols-2 lg:grid-cols-4">
                <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
                  <span className="grid-trace-vertical absolute left-1/4 h-20 w-px bg-gradient-to-b from-transparent via-sky-400/70 to-transparent dark:via-sky-300/70" />
                  <span className="grid-trace-vertical absolute left-2/4 h-24 w-px bg-gradient-to-b from-transparent via-amber-400/70 to-transparent dark:via-amber-300/70 [animation-delay:1.1s]" />
                  <span className="grid-trace-vertical absolute left-3/4 h-20 w-px bg-gradient-to-b from-transparent via-fuchsia-400/70 to-transparent dark:via-fuchsia-300/70 [animation-delay:2.1s]" />
                </div>
                {[
                  { value: "4.5+", label: "Years experience", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-sky-500/70" },
                  { value: "10+", label: "Systems delivered", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-emerald-500/70" },
                  { value: "5+", label: "Domains covered", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", color: "text-amber-500/70" },
                  { value: "AI+", label: "Modern engineering", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "text-fuchsia-500/70" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`relative px-4 py-4 transition-colors hover:bg-neutral-50/70 sm:px-5 dark:hover:bg-white/[0.03] ${
                      i < 2 ? "border-b border-neutral-200/80 dark:border-white/10 lg:border-b-0" : ""
                    } ${i % 2 === 0 ? "border-r border-neutral-200/80 dark:border-white/10 lg:border-r" : ""} ${
                      i < 3 ? "lg:border-r lg:border-neutral-200/80 lg:dark:border-white/10" : "lg:border-r-0"
                    }`}
                  >
                    <CellDots />
                    <div className="flex items-end gap-2.5">
                      <p className="text-[1.65rem] font-extrabold leading-none tracking-tighter sm:text-[2rem]">{stat.value}</p>
                      <svg className={`mb-1 h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                      </svg>
                    </div>
                    <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400 sm:text-[10px]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Below-hero content container Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <div
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32"
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
                    <div className="mt-3 h-px w-40 bg-gradient-to-r from-orange-400/70 via-amber-400/70 to-transparent" />
                    <p className="ui-subtitle">
                      A selection of brands and teams I&apos;ve contributed to
                      across product, SaaS, and digital delivery.
                    </p>
                </div>

                <div className="ui-section-body relative overflow-hidden py-5 sm:py-6">
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20"
                    style={{ background: "linear-gradient(to right, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0) 100%)" }}
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20"
                    style={{ background: "linear-gradient(to left, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0) 100%)" }}
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-20 dark:block"
                    style={{ background: "linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0) 100%)" }}
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-20 dark:block"
                    style={{ background: "linear-gradient(to left, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0) 100%)" }}
                  />

                  <div className="marquee-rtl-track flex w-max items-center hover:[animation-play-state:paused]">
                    {[0, 1].map((set) => (
                    <div key={set} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
                        {companyLogos.map((logo) => (
                          <a
                            key={`${set}-${logo.src}`}
                            href={logo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${logo.alt}`}
                            className="ui-logo-card w-36 sm:w-44"
                          >
                            <Image
                              src={logo.src}
                              alt={logo.alt}
                              width={180}
                              height={72}
                              className="h-11 w-full object-contain opacity-100 sm:h-14"
                            />
                          </a>
                        ))}
                      </div>
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
                <div className="mt-3 h-px w-32 bg-gradient-to-r from-sky-400/70 via-fuchsia-400/70 to-amber-400/70" />
                <p className="ui-subtitle">
                  Production-focused engineering strengths across frontend,
                  backend, and DevOps.
                </p>
              </div>

              <div className="ui-section-body grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {skillCards.map((card, index) => (
                  <ScrollReveal
                    key={card.title}
                    delay={index * 90}
                  >
                    <article className="ui-card group relative flex min-h-[250px] flex-col overflow-hidden p-5 sm:min-h-[320px] sm:p-6">
                      <div
                        className={`absolute left-0 right-0 top-0 h-1 ${
                          card.icon === "frontend"
                            ? "bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500"
                            : card.icon === "backend"
                              ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-lime-500"
                              : "bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-500"
                        }`}
                      />
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="rounded-xl border border-neutral-200/80 bg-white p-2 shadow-sm dark:border-white/15 dark:bg-white/5">
                            <SkillIcon type={card.icon} />
                          </span>
                          <h3
                            className={`text-lg font-semibold leading-tight ${
                              card.icon === "frontend"
                                ? "text-sky-700 dark:text-sky-300"
                                : card.icon === "backend"
                                  ? "text-emerald-700 dark:text-emerald-300"
                                  : "text-fuchsia-700 dark:text-fuchsia-300"
                            }`}
                          >
                            {card.title}
                          </h3>
                        </div>
                        <span className="text-xs font-semibold tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                        {card.summary}
                      </p>

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {card.items.slice(0, card.maxItems).map((item) => (
                          <li
                            key={item}
                            className="ui-chip px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors group-hover:border-neutral-300 dark:group-hover:border-white/28"
                          >
                            {item}
                          </li>
                        ))}
                        {card.items.length > card.maxItems ? (
                          <li className="ui-chip bg-neutral-100 px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:border-white/18 dark:bg-white/5 dark:text-neutral-300">
                            +{card.items.length - card.maxItems} more
                          </li>
                        ) : null}
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
                    <div className="mt-3 h-px w-44 bg-gradient-to-r from-pink-400/70 via-orange-400/70 to-transparent" />
                    <p className="ui-subtitle">
                      A premium toolchain for moving from concept to clean,
                      production-ready delivery with more speed and precision.
                    </p>
                </div>

                <div className="ui-section-body relative overflow-hidden py-5 sm:py-6">
                  <div className="pointer-events-none absolute inset-0 hidden dark:block">
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/35 to-transparent" />
                    <div className="absolute -left-12 top-0 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl" />
                    <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-fuchsia-400/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px] opacity-35 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.55),transparent)]" />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16"
                    style={{ background: "linear-gradient(to right, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0) 100%)" }}
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16"
                    style={{ background: "linear-gradient(to left, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0) 100%)" }}
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-16 dark:block"
                    style={{ background: "linear-gradient(to right, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0) 100%)" }}
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-16 dark:block"
                    style={{ background: "linear-gradient(to left, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0) 100%)" }}
                  />

                  <div className="marquee-rtl-track flex w-max items-center hover:[animation-play-state:paused]">
                    {[0, 1].map((set) => (
                      <div
                        key={set}
                        aria-hidden={set === 1}
                        className="flex shrink-0 items-center gap-5 pr-5 sm:gap-8 sm:pr-8"
                      >
                        {aiProductivityTools.map((tool) => (
                          <div
                            key={`${set}-${tool.name}`}
                            className="ui-tool-pill px-2 py-2 sm:px-3"
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-r p-[1px] sm:h-12 sm:w-12 ${tool.accent}`}
                              aria-hidden="true"
                            >
                              <span className="flex h-full w-full items-center justify-center rounded-[5px] bg-white dark:bg-[#0f172a]">
                                <Image
                                  src={tool.logo}
                                  alt=""
                                  width={32}
                                  height={32}
                                  className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                                />
                              </span>
                            </span>
                            <span className="whitespace-nowrap text-base font-semibold leading-none tracking-[0.01em] text-neutral-900 sm:text-lg dark:text-neutral-50">
                              {tool.name}
                            </span>
                            <span className="ui-tool-pill-role whitespace-nowrap text-[0.68rem] font-bold uppercase leading-none tracking-[0.14em] sm:text-xs">
                              {tool.role}
                            </span>
                          </div>
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
                  <div className="mt-3 h-px w-36 bg-gradient-to-r from-sky-400/70 via-fuchsia-400/70 to-amber-400/70" />
                  <p className="ui-subtitle">
                    A curated mix of production web platforms, SaaS products,
                    and full-stack builds across different domains.
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
                    <article className="ui-card group relative flex h-full min-h-[370px] flex-col overflow-hidden p-4 sm:min-h-[460px] sm:p-5">
                      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60 dark:via-white/30" />
                      <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900">
                        <Image
                          src={resolveProjectCover(project, projectCovers)}
                          alt={`${project.title} thumbnail`}
                          width={720}
                          height={420}
                          className="h-44 w-full object-cover sm:h-52"
                          loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                        <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-white/40 bg-black/40 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                          Project {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="mt-5 flex flex-1 flex-col">
                        <h3 className="text-lg font-bold leading-snug tracking-tight text-neutral-900 dark:text-neutral-50">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                          {project.description}
                        </p>

                        <ul className="mt-4 flex flex-wrap gap-2">
                          {project.points.slice(0, 4).map((point) => (
                            <li
                              key={point}
                              className="ui-chip px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] dark:border-white/20"
                            >
                              {point}
                            </li>
                          ))}
                          {project.points.length > 4 ? (
                            <li className="ui-chip bg-neutral-100 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:border-white/20 dark:bg-white/5 dark:text-neutral-300">
                              +{project.points.length - 4} more
                            </li>
                          ) : null}
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
      </div>
    </main>
  );
}
