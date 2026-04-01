import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-4 sm:px-6 lg:px-8 lg:pb-32 lg:pt-4">

        {/* Hero */}
        <section className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-md dark:border-white/15 dark:bg-neutral-900/60 lg:min-h-[calc(100svh-2rem)]">
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/50 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-neutral-950"
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

            <div className="relative mx-auto mt-10 flex w-full max-w-sm items-center justify-center lg:mt-0 lg:max-w-none">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-amber-300/40 via-pink-300/10 to-violet-300/40 blur-3xl dark:from-emerald-500/25 dark:via-sky-500/10 dark:to-fuchsia-500/25" />
              <div className="relative z-10 h-[300px] w-[300px] lg:h-[380px] lg:w-[380px]">
                <div className="absolute inset-x-0 bottom-0 h-[78%] overflow-hidden rounded-full border border-neutral-300/80 bg-neutral-100 shadow-[0_20px_40px_rgba(236,72,153,0.15)] dark:border-white/20 dark:bg-neutral-900" />
                <Image
                  src="/pranay.png"
                  alt="Portrait of Pranay Langhe"
                  width={640}
                  height={760}
                  className="absolute inset-x-0 bottom-0 z-10 h-[120%] w-full object-contain object-bottom"
                  priority
                />
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
          <section className="relative mt-20 border border-neutral-200/80 bg-white shadow-sm dark:border-white/15 dark:bg-neutral-900/60 sm:mt-28">
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
                        className={`w-auto object-contain opacity-90 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 ${
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
          <section className="relative mt-20 border border-neutral-200/80 bg-white shadow-sm dark:border-white/15 dark:bg-neutral-900/60 sm:mt-28">
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
                className={`group relative flex min-h-[320px] flex-col bg-white px-6 py-7 transition-all duration-300 sm:px-7 sm:py-8 dark:bg-neutral-900/60 ${
                  index < skillCards.length - 1
                    ? "border-b border-neutral-200/80 dark:border-white/20 lg:border-b-0"
                    : ""
                } ${
                  index !== skillCards.length - 1
                    ? "lg:border-r lg:border-neutral-200/80 lg:dark:border-white/20"
                    : ""
                } hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5 hover:bg-neutral-50/100 dark:hover:shadow-sky-500/10 dark:hover:bg-neutral-900/90 z-0 hover:z-10`}
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
          <section className="relative mt-20 border border-neutral-200/80 bg-white shadow-sm dark:border-white/15 dark:bg-neutral-900/60 sm:mt-28">
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
          <section className="relative mt-20 border border-neutral-200/80 bg-white shadow-sm dark:border-white/15 dark:bg-neutral-900/60 sm:mt-28">
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
                className={`group relative flex min-h-[430px] flex-col bg-white p-7 transition-all duration-300 sm:p-8 dark:bg-neutral-900/60 ${
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
                } hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.15)] z-0 hover:z-10`}
              >
                <span className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                  <span className="diagonal-border-animate absolute inset-y-0 left-0 w-px bg-gradient-to-b from-pink-400/40 to-orange-400/40 dark:from-pink-300/45 dark:to-orange-300/45" />
                  <span className="diagonal-border-animate absolute inset-y-0 right-0 w-px bg-gradient-to-b from-pink-400/40 to-orange-400/40 dark:from-pink-300/45 dark:to-orange-300/45" />
                  <span className="diagonal-border-animate absolute inset-x-0 top-0 h-px bg-gradient-to-r from-pink-400/40 to-orange-400/40 dark:from-pink-300/45 dark:to-orange-300/45" />
                  <span className="diagonal-border-animate absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-pink-400/40 to-orange-400/40 dark:from-pink-300/45 dark:to-orange-300/45" />
                </span>
                <CellDots />
                <div className="mb-6 overflow-hidden border border-neutral-200/80 bg-neutral-100 dark:border-white/20 dark:bg-neutral-900">
                  <Image
                    src={resolveProjectCover(project, projectCovers)}
                    alt={`${project.title} thumbnail`}
                    width={720}
                    height={420}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
