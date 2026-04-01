import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import ScrollProgressLine from "@/components/scroll-progress-line";
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
      "Git & GitHub",
      "Docker",
      "Jenkins",
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

const aiProductivityTools = [
  "Cursor AI",
  "GitHub Copilot",
  "Claude",
  "Prompt Engineering",
  "Augment Code",
  "OpenAI Codex",
  "Antigravity",
  "AI-Assisted Debugging",
  "Code Refactoring",
  "LangChain",
];

const projects = [
  {
    title: "Modern Admin Dashboard - React & Chart-Based UI",
    coverKey: "admin-dashboard",
    thumbnail: "/project-thumb-1.png",
    description:
      "A sleek and responsive admin dashboard with analytics, user stats, dark/light mode, sidebar navigation, and interactive charts for operational insights.",
    points: [
      "Reactjs",
      "JavaScript",
      "Nodejs",
      "ExpressJs",
      "Mongodb",
      "Chart UI",
    ],
    cta: "outline",
  },
  {
    title: "UrbanCart (React + Laravel)",
    coverKey: "urbancart",
    thumbnail: "/project-thumb-2.png",
    description:
      "Indian premium furniture and decor e-commerce platform with payments, tracking integrations, and a conversion-focused storefront experience.",
    points: [
      "Reactjs",
      "HTML/CSS",
      "JavaScript",
      "Razorpay/PayPal",
      "Shopify",
      "Analytics",
    ],
    cta: "outline",
  },
  {
    title: "Tomato - Food Delivery App",
    coverKey: "tomato",
    thumbnail: "/project-thumb-3.png",
    description:
      "React-based food delivery app featuring authentication, menu browsing, cart flows, and smooth client-side routing for a fast SPA experience.",
    points: [
      "Reactjs",
      "Nodejs",
      "ExpressJs",
      "Mongodb",
      "Routing",
      "Authentication",
    ],
    cta: "outline",
  },
  {
    title: "VidTube - Modern YouTube UI Clone",
    coverKey: "vidtube",
    thumbnail: "/project-thumb-1.png",
    description:
      "YouTube-inspired streaming app with responsive layouts, search, and channel/video browsing for a dynamic media-style frontend.",
    points: [
      "Reactjs",
      "Context API",
      "Axios",
      "HTML/CSS",
      "JavaScript",
      "Responsive UI",
    ],
    cta: "outline",
  },
  {
    title: "Netflix Clone - React Movie Streaming UI",
    coverKey: "netflix",
    thumbnail: "/project-thumb-2.png",
    description:
      "Netflix-style movie browsing interface with dynamic content rows, banners, and polished transitions using modern React patterns.",
    points: [
      "Reactjs",
      "Styled Components",
      "Material UI",
      "Framer",
      "Firebase",
      "TMDb API",
    ],
    cta: "outline",
  },
  {
    title: "Prescripto - Doctor Appointment App",
    coverKey: "prescripto",
    thumbnail: "/project-thumb-3.png",
    description:
      "Full-stack MERN app for managing appointments and prescriptions with secure data handling and streamlined doctor workflows.",
    points: [
      "Reactjs",
      "Nodejs",
      "ExpressJs",
      "Mongodb",
      "MERN Stack",
      "Secure Data",
    ],
    cta: "outline",
  },
  {
    title: "The Wild Oasis (NextJs)",
    coverKey: "wild-oasis",
    thumbnail: "/project-thumb-1.png",
    description:
      "Hotel management web app with modern dashboard patterns, filtering, stats, and strong component-based architecture in Next.js.",
    points: [
      "NextJs",
      "React",
      "Styled Components",
      "SSR Benefits",
      "Dashboard UI",
      "Filtering",
    ],
    cta: "outline",
  },
  {
    title: "Omnifood - Nutrition App",
    coverKey: "omnifood",
    thumbnail: "/project-thumb-2.png",
    description:
      "Responsive landing page for an AI-powered nutrition service with strong visual hierarchy and clean section structure.",
    points: [
      "HTML/CSS",
      "SCSS",
      "UI/UX",
      "Landing Page",
      "Performance",
      "Responsive",
    ],
    cta: "outline",
  },
  {
    title: "JWT Authentication",
    coverKey: "jwt-auth",
    thumbnail: "/project-thumb-3.png",
    description:
      "Authentication system using JWT with secure login/signup flows and protected API routes across client and server.",
    points: [
      "Reactjs",
      "Nodejs",
      "ExpressJs",
      "JWT/Bcrypt",
      "Mongoose",
      "Protected Routes",
    ],
    cta: "outline",
  },
  {
    title: "Imagify - Image Generator",
    coverKey: "imagify",
    thumbnail: "/project-thumb-1.png",
    description:
      "AI-powered image generation app that turns text prompts into visuals for creators, marketers, and product ideation workflows.",
    points: [
      "Reactjs",
      "Nodejs",
      "ExpressJs",
      "JWT/Bcrypt",
      "Firebase",
      "AI Generation",
    ],
    cta: "outline",
  },
];

function getCompanyLogos() {
  const logosDir = path.join(process.cwd(), "public", "companylogos");
  const fallbackDir = path.join(process.cwd(), "public", "companies");
  const targetDir = fs.existsSync(logosDir) ? logosDir : fallbackDir;

  if (!fs.existsSync(targetDir)) {
    return [];
  }

  return fs
    .readdirSync(targetDir)
    .filter((file) => /\.(svg|png|jpg|jpeg|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      src: fs.existsSync(logosDir) ? `/companylogos/${file}` : `/companies/${file}`,
      name: file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
    }));
}

function getProjectCovers() {
  const coversDir = path.join(process.cwd(), "public", "projectscover");

  if (!fs.existsSync(coversDir)) {
    return [];
  }

  return fs
    .readdirSync(coversDir)
    .filter((file) => /\.(svg|png|jpg|jpeg|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      path: `/projectscover/${file}`,
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
  return (
    <>
      <span className="pointer-events-none absolute -left-0.5 -top-0.5 h-1.5 w-1.5 rounded-full border border-neutral-300 bg-white dark:border-white/35 dark:bg-neutral-900" />
    </>
  );
}

export default function Home() {
  const companyLogos = getCompanyLogos();
  const projectCovers = getProjectCovers();

  return (
    <main className="relative isolate min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      
      {/* Fixed Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50 lg:bottom-10 lg:right-10">
        <div className="rounded-full shadow-lg border border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/80">
          <ThemeToggle />
        </div>
      </div>

      <div
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-4 sm:px-6 lg:px-8 lg:pb-32 lg:pt-4"
        data-scroll-root
      >
        
        <ScrollProgressLine />

        {/* Hero */}
        <section
          className="relative flex flex-col justify-between overflow-hidden border border-neutral-200/80 bg-white shadow-md dark:border-white/15 dark:bg-neutral-900/60 lg:min-h-[calc(100svh-2rem)]"
          data-scroll-section
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="grid-trace-horizontal absolute top-0 h-px w-28 bg-gradient-to-r from-transparent via-sky-400/80 to-transparent dark:via-sky-300/80" />
            <span className="grid-trace-horizontal absolute bottom-0 h-px w-24 bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent dark:via-fuchsia-300/80 [animation-delay:1.4s]" />
            <span className="grid-trace-vertical absolute left-0 h-20 w-px bg-gradient-to-b from-transparent via-amber-400/70 to-transparent dark:via-amber-300/70 [animation-delay:0.8s]" />
            <span className="grid-trace-vertical absolute right-0 h-24 w-px bg-gradient-to-b from-transparent via-sky-400/70 to-transparent dark:via-sky-300/70 [animation-delay:2s]" />
          </div>
          <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-14 lg:py-8">
            <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Available for work</span>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">
                Hi, I&apos;m Pranay Langhe
              </p>
              <h1 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
                Creative full‑stack engineer
                <br />
                who builds{" "}
                <span className="bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                  fast, intuitive experiences.
                </span>
              </h1>
              <p className="max-w-xl text-balance text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
                React / Next.js / MERN developer with 4 years of industry
                experience delivering production‑grade dashboards, platforms,
                and internal tools. I focus on clean architecture, performance,
                and pixel‑perfect interfaces.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/Pranay-Langhe-Portfolio.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-400/40 transition-colors duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-neutral-950"
              >
                Download Portfolio
              </a>

              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3 text-sm font-medium text-neutral-900 shadow-sm transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:border-white/15 dark:bg-white/5 dark:text-neutral-50 dark:hover:bg-emerald-400/10 dark:focus-visible:ring-neutral-50 dark:focus-visible:ring-offset-neutral-950"
              >
                View LinkedIn
              </Link>
            </div>

            </div>

            <div className="relative mx-auto mt-14 flex w-full max-w-sm items-center justify-center lg:mt-0 lg:max-w-none">
              <div className="pointer-events-none absolute inset-0 -z-10 scale-125 bg-gradient-to-br from-amber-300/30 via-pink-300/20 to-violet-300/30 blur-3xl dark:from-emerald-500/20 dark:via-sky-500/20 dark:to-fuchsia-500/20" />
              
              <div className="relative z-10 h-[300px] w-[300px] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px]">
                
                {/* Outer decorative ring */}
                <div className="absolute -inset-4 rounded-full border-[1px] border-neutral-300/50 dark:border-neutral-700/50" />
                <div className="absolute -inset-8 rounded-full border-[1px] border-neutral-300/30 dark:border-neutral-700/30" />
                
                {/* Main Circle (clips the body) */}
                <div className="absolute inset-0 rounded-full border-[6px] border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] bg-gradient-to-b from-neutral-50 to-neutral-200 overflow-hidden dark:border-neutral-800 dark:bg-gradient-to-b dark:from-neutral-800 dark:to-neutral-900 dark:shadow-[0_20px_50px_-10px_rgba(255,255,255,0.05)]">
                  {/* Inner Image (Clipped) */}
                  <Image
                    src="/pranay.png"
                    alt="Portrait of Pranay Langhe"
                    width={640}
                    height={760}
                    className="absolute bottom-0 left-1/2 h-[125%] w-auto max-w-none -translate-x-1/2 object-contain"
                    priority
                  />
                </div>

                {/* Outer 3D Image (Head bursting out) */}
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ clipPath: 'polygon(-50% -50%, 150% -50%, 150% 55%, -50% 55%)' }}>
                  <Image
                    src="/pranay.png"
                    alt=""
                    width={640}
                    height={760}
                    className="absolute bottom-0 left-1/2 h-[125%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Floating Tech Badges */}
                <div className="absolute left-[5%] top-[20%] z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-xl dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/10 animate-[bounce_4s_infinite]">
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 text-[#61DAFB]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none"/>
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                  </svg>
                </div>
                
                <div className="absolute bottom-[10%] left-[2%] z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-xl dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/10 animate-[bounce_5s_infinite]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 text-[#339933]" fill="currentColor">
                    <path d="M11.874 0c-1.259 0-2.457.195-3.538.55C3.39 2.213 0 6.649 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm4.18 5.918h-.022A3.203 3.203 0 0 0 12.83 9.12v8.941c0 1.767 1.433 3.2 3.2 3.2s3.2-1.433 3.2-3.2V9.12a3.203 3.203 0 0 0-3.176-3.202M7.288 8.005h-.002a2.378 2.378 0 0 0-2.373 2.373v5.196c0 1.309 1.063 2.372 2.373 2.372 1.309 0 2.371-1.063 2.371-2.372v-5.196A2.378 2.378 0 0 0 7.288 8.005zm0 1.373a.998.998 0 0 1 .998.998v5.196a.998.998 0 0 1-1.996 0v-5.196a.998.998 0 0 1 .998-.998z" />
                  </svg>
                </div>

                <div className="absolute right-[5%] bottom-[20%] z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-xl dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/10 animate-[bounce_4.5s_infinite]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 rounded-[4px] overflow-hidden">
                    <rect width="24" height="24" fill="#000" />
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855l-1.68 1.156c.375.584.764 1.05 1.17 1.409 1.636 1.155 3.346 1.155 4.396.15 1.095-1.08 1.02-3.21 1.02-4.996 0-1.921.031-3.886-.115-5.865z" fill="#F7DF1E" />
                  </svg>
                </div>

                <div className="absolute right-[10%] top-[10%] z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-xl dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/10 animate-[bounce_5s_infinite]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6 text-black dark:text-white">
                    <path d="M18.784 19.388c-1.823 1.558-4.212 2.502-6.811 2.502-5.748 0-10.435-4.664-10.457-10.407A10.428 10.428 0 0 1 11.973 1.05C17.72 1.05 22.4 5.753 22.4 11.48c0 2.378-.802 4.564-2.146 6.307l-7.398-9.988H10.16v8.941h1.996v-6.39l6.628 8.94zM14.621 11.666V7.798h1.996v5.826l-1.996-1.958zM11.973 0C5.358 0 0 5.378 0 11.995s5.36 12 11.973 12c3.279 0 6.252-1.325 8.423-3.483l-1.442-1.933a9.88 9.88 0 0 1-6.98 3.32C6.417 21.9 1.936 17.433 1.936 11.995 1.936 6.556 6.417 2.053 11.973 2.053c5.556 0 10.05 4.503 10.05 9.942 0 1.956-.566 3.778-1.536 5.309l1.493 2.016C23.235 17.15 24 14.671 24 11.995 24 5.378 18.643 0 11.973 0z"/>
                  </svg>
                </div>

              </div>
            </div>
          </div>

          <div className="relative z-10 -mt-10 grid border-t border-neutral-200/80 text-sm dark:border-white/20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
              <span className="grid-trace-vertical absolute left-1/4 h-20 w-px bg-gradient-to-b from-transparent via-sky-400/70 to-transparent dark:via-sky-300/70" />
              <span className="grid-trace-vertical absolute left-2/4 h-24 w-px bg-gradient-to-b from-transparent via-amber-400/70 to-transparent dark:via-amber-300/70 [animation-delay:1.1s]" />
              <span className="grid-trace-vertical absolute left-3/4 h-20 w-px bg-gradient-to-b from-transparent via-fuchsia-400/70 to-transparent dark:via-fuchsia-300/70 [animation-delay:2.1s]" />
              <span className="grid-trace-horizontal absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-sky-400/80 to-transparent dark:via-sky-300/80 [animation-delay:0.6s]" />
            </div>
            <div className="relative border-b border-neutral-200/80 px-6 py-4 dark:border-white/20 lg:border-b-0 lg:border-r">
              <CellDots />
              <p className="text-4xl font-semibold">4.5+</p>
              <p className="mt-1 text-neutral-500">Years of experience</p>
            </div>
            <div className="relative border-b border-neutral-200/80 px-6 py-4 dark:border-white/20 sm:border-l lg:border-b-0 lg:border-r">
              <CellDots />
              <p className="text-4xl font-semibold">10+</p>
              <p className="mt-1 text-neutral-500">Production-ready modules built</p>
            </div>
            <div className="relative border-b border-neutral-200/80 px-6 py-4 dark:border-white/20 lg:border-b-0 lg:border-r">
              <CellDots />
              <p className="text-4xl font-semibold">5+</p>
              <p className="mt-1 text-neutral-500">Domains worked in</p>
            </div>
            <div className="relative px-6 py-4 sm:border-l lg:border-l-0">
              <CellDots />
              <p className="text-3xl font-semibold">AI + Full Stack</p>
              <p className="mt-1 text-neutral-500">Modern product engineering</p>
            </div>
          </div>
        </section>

        {/* Professional Journey / Companies */}
        {companyLogos.length > 0 ? (
          <section
            className="relative mt-20 border border-neutral-200/80 bg-white shadow-sm dark:border-white/15 dark:bg-neutral-900/60 sm:mt-28"
            data-scroll-section
          >
            <div className="relative z-10 border-b border-neutral-200/80 px-7 pb-0 pt-8 dark:border-white/15 sm:px-10 sm:pt-10">
              <div className="text-center">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                  Professional Journey
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-neutral-800 sm:text-xl dark:text-neutral-100">
                  Companies I&apos;ve worked with
                </h2>
                <div className="mx-auto mt-2 h-px w-32 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent dark:via-orange-300/55" />
              </div>
              <div className="-mx-7 mt-0 border-y border-neutral-200/80 dark:border-white/20 sm:-mx-8">
                <div className="grid gap-0 sm:grid-cols-3 lg:grid-cols-6">
                {companyLogos.map((logo, index) => {
                  const normalizedName = logo.name.toLowerCase();
                  const isInat = normalizedName.includes("inat");
                  const isBeyondwalls = normalizedName.includes("beyondwalls");
                  const isLargeLogo =
                    normalizedName.includes("inat") ||
                    normalizedName.includes("beyondwalls") ||
                    normalizedName.includes("vlax");

                  return (
                    <div
                      key={logo.src}
                      className={`relative flex items-center justify-center bg-white px-4 py-4 dark:bg-neutral-900/60 ${
                        isInat ? "min-h-44" : isBeyondwalls ? "min-h-32" : "min-h-16"
                      } ${
                        index !== companyLogos.length - 1
                          ? "border-b border-neutral-200/80 dark:border-white/20 sm:border-b-0 sm:border-r"
                          : ""
                      }`}
                    >
                      <CellDots />
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={120}
                        height={40}
                        className={`w-auto object-contain opacity-90 grayscale transition-colors duration-200 hover:opacity-100 hover:grayscale-0 ${
                          isInat ? "h-40" : isBeyondwalls ? "h-28" : isLargeLogo ? "h-11" : "h-8"
                        }`}
                      />
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </section>
          ) : null}

          {/* Core Capabilities / Skills */}
          <section
            className="relative mt-20 border border-neutral-200/80 bg-white shadow-sm dark:border-white/15 dark:bg-neutral-900/60 sm:mt-28"
            data-scroll-section
          >
          <div className="relative z-10 -mt-px border-b border-neutral-200/80 px-7 py-10 text-center dark:border-white/15 sm:px-10 sm:py-14">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
              Core Capabilities
            </p>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              Skills & Expertise
            </h2>
            <div className="mx-auto mt-2 h-px w-32 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent dark:via-pink-300/55" />
            <p className="mx-auto mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
              Production-focused engineering strengths across frontend,
              backend, and DevOps.
            </p>
          </div>
          <div className="relative z-10 grid gap-0 lg:grid-cols-3">
            <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
              <span className="grid-trace-vertical absolute left-1/3 h-24 w-px bg-gradient-to-b from-transparent via-amber-400/70 to-transparent dark:via-amber-300/70" />
              <span className="grid-trace-vertical absolute left-2/3 h-20 w-px bg-gradient-to-b from-transparent via-sky-400/70 to-transparent dark:via-sky-300/70 [animation-delay:1.2s]" />
              <span className="grid-trace-horizontal absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent dark:via-fuchsia-300/80 [animation-delay:0.8s]" />
            </div>
            {skillCards.map((card, index) => (
              <article
                key={card.title}
                className={`group relative flex min-h-[320px] flex-col bg-white px-6 py-7 transition-colors duration-200 sm:px-7 sm:py-8 dark:bg-neutral-900/60 ${
                  index < skillCards.length - 1
                    ? "border-b border-neutral-200/80 dark:border-white/20 lg:border-b-0"
                    : ""
                } ${
                  index !== skillCards.length - 1
                    ? "lg:border-r lg:border-neutral-200/80 lg:dark:border-white/20"
                    : ""
                } hover:bg-neutral-50/100 dark:hover:bg-neutral-900/90`}
              >
                <CellDots />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="border border-neutral-200/80 bg-gradient-to-br from-white to-neutral-100 p-1.5 shadow-sm dark:border-white/20 dark:from-white/10 dark:to-white/5">
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
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {card.summary}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-800 dark:text-neutral-200">
                  {card.items.slice(0, card.maxItems).map((item) => (
                    <li
                      key={item}
                      className="border border-neutral-200/80 bg-white/95 px-2.5 py-1.5 text-[0.72rem] font-medium tracking-[0.02em] text-neutral-700 transition-colors group-hover:border-neutral-300 group-hover:bg-neutral-100 dark:border-white/20 dark:bg-white/5 dark:text-neutral-200 dark:group-hover:border-white/30 dark:group-hover:bg-white/10"
                    >
                      {item}
                    </li>
                  ))}
                  {card.items.length > card.maxItems ? (
                    <li className="border border-neutral-200/80 bg-neutral-50 px-2.5 py-1.5 text-[0.72rem] font-semibold tracking-[0.02em] text-neutral-500 dark:border-white/20 dark:bg-white/5 dark:text-neutral-300">
                      +{card.items.length - card.maxItems} more
                    </li>
                  ) : null}
                </ul>
              </article>
            ))}
          </div>
          </section>

          {/* Workflow Section */}
          <section
            className="relative mt-20 border border-neutral-200/80 bg-white shadow-sm dark:border-white/15 dark:bg-neutral-900/60 sm:mt-28"
            data-scroll-section
          >
          <div className="relative z-10 border-b border-neutral-200/80 px-7 py-8 dark:border-white/15 sm:px-10 sm:py-12">
            <div className="text-center">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                Workflow
              </p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent via-pink-400/70 to-orange-400/70" />
                <p className="text-lg font-semibold tracking-[0.04em] text-neutral-800 dark:text-neutral-100">
                  AI-Powered Productivity Stack
                </p>
                <span className="h-px w-12 bg-gradient-to-r from-pink-400/70 to-orange-400/70 via-transparent" />
              </div>
            </div>
            <div className="relative mt-4 overflow-hidden py-3">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.12),transparent_60%)]" />
              <div className="marquee-rtl-track relative z-10 flex w-max items-center gap-8 whitespace-nowrap pr-8">
                {[0, 1].map((group) => (
                  <div key={group} className="flex items-center gap-8">
                    {aiProductivityTools.map((tool) => (
                      <div key={`${group}-${tool}`} className="flex items-center gap-8">
                        <p className="text-base font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
                          {tool}
                        </p>
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 opacity-70"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          </section>

          {/* Portfolio Projects */}
          <section
            className="relative mt-20 border border-neutral-200/80 bg-white shadow-sm dark:border-white/15 dark:bg-neutral-900/60 sm:mt-28"
            data-scroll-section
          >
          <div className="relative z-10 border-b border-neutral-200/80 px-7 py-10 text-center dark:border-white/15 sm:px-10 sm:py-14">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
              Portfolio
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-neutral-800 sm:text-xl dark:text-neutral-100">
              Selected Projects
            </h2>
            <div className="mx-auto mt-2 h-px w-32 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent dark:via-pink-300/55" />
            <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
              A snapshot of products and internal tools I&apos;ve helped
              deliver.
            </p>
          </div>

          <div className="relative z-10 grid gap-0 lg:grid-cols-3">
            <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
              <span className="grid-trace-vertical absolute left-1/3 h-28 w-px bg-gradient-to-b from-transparent via-sky-400/70 to-transparent dark:via-sky-300/70" />
              <span className="grid-trace-vertical absolute left-2/3 h-24 w-px bg-gradient-to-b from-transparent via-amber-400/70 to-transparent dark:via-amber-300/70 [animation-delay:1.3s]" />
              <span className="grid-trace-horizontal absolute top-1/3 h-px w-32 bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent dark:via-fuchsia-300/80 [animation-delay:0.6s]" />
              <span className="grid-trace-horizontal absolute top-2/3 h-px w-36 bg-gradient-to-r from-transparent via-sky-400/80 to-transparent dark:via-sky-300/80 [animation-delay:2.1s]" />
            </div>
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`group relative flex min-h-[430px] flex-col bg-white p-7 transition-colors duration-200 sm:p-8 dark:bg-neutral-900/60 ${
                  index < projects.length - 1
                    ? "border-b border-neutral-200/80 dark:border-white/20"
                    : ""
                } ${
                  index < projects.length - 3
                    ? "lg:border-b lg:border-neutral-200/80 lg:dark:border-white/20"
                    : "lg:border-b-0"
                } ${
                  (index + 1) % 3 !== 0
                    ? "lg:border-r lg:border-neutral-200/80 lg:dark:border-white/20"
                    : ""
                }`}
              >
                <CellDots />
                <div className="mb-6 overflow-hidden border border-neutral-200/80 bg-neutral-100 dark:border-white/20 dark:bg-neutral-900">
                  <Image
                    src={resolveProjectCover(project, projectCovers)}
                    alt={`${project.title} thumbnail`}
                    width={720}
                    height={420}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-neutral-50">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {project.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2 text-xs text-neutral-800 dark:text-neutral-200">
                  {project.points.map((point) => (
                    <li
                      key={point}
                      className="border border-neutral-200/80 bg-neutral-50/90 px-2.5 py-1.5 text-[0.72rem] font-medium tracking-[0.02em] text-neutral-700 dark:border-white/20 dark:bg-white/5 dark:text-neutral-200"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <button
                    className={`w-full rounded-full px-6 py-2.5 text-sm font-medium transition ${
                      project.cta === "gradient"
                        ? "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 text-white shadow-lg shadow-pink-500/30 hover:brightness-110"
                        : "border border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300 hover:bg-neutral-100 dark:border-white/20 dark:bg-transparent dark:text-neutral-100 dark:hover:border-white/30 dark:hover:bg-white/10"
                    }`}
                  >
                    See Project
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
