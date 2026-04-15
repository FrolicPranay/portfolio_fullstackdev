"use client";

import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 sm:px-6 sm:py-10 lg:px-8 print:bg-white print:p-0">
      <div className="mx-auto mb-8 flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <Link href="/" className="ui-button-secondary w-full px-4 py-2 text-sm sm:w-auto">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Portfolio
        </Link>

        <button onClick={handlePrint} className="ui-button-primary w-full px-5 py-2 sm:w-auto">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2m2 4h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2zm8-12V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4h10z"
            />
          </svg>
          Print to PDF
        </button>
      </div>

      <div className="ui-panel mx-auto max-w-4xl overflow-hidden print:max-w-none print:rounded-none print:border-none print:bg-white print:shadow-none">
        <header className="relative overflow-hidden bg-neutral-900 px-5 py-8 text-white dark:bg-black/40 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />
          </div>

          <div className="relative z-10">
            <p className="ui-kicker !text-neutral-400">Resume</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Pranay Langhe
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-neutral-400 sm:text-lg lg:text-xl">
              Full Stack Engineer &middot; React / Next.js Architect &middot;
              {" "}MERN Stack Developer
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 text-sm text-neutral-300 sm:grid-cols-2 xl:grid-cols-3">
              <div className="flex items-start gap-2 break-words">
                <span className="text-neutral-500">Phone:</span> 9284771780
              </div>
              <div className="flex items-start gap-2 break-all">
                <span className="text-neutral-500">Email:</span>{" "}
                pranaylanghe20@gmail.com
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-500">Location:</span> Pune, MH,
                India
              </div>
              <div className="flex items-start gap-2 break-all">
                <span className="text-neutral-500">LinkedIn:</span>{" "}
                linkedin.com/in/pranaylanghe
              </div>
              <div className="flex items-start gap-2 break-all">
                <span className="text-neutral-500">Website:</span>{" "}
                pranaylanghe.com
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.45fr] print:grid-cols-[1fr_2fr]">
          <aside className="border-b border-neutral-100 bg-neutral-50/70 p-6 dark:border-neutral-800 dark:bg-neutral-950/30 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <section className="mb-10">
              <h2 className="ui-kicker">Summary</h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Full Stack Developer with 3.5 years of experience building
                scalable web applications using React.js, Next.js, and modern
                JavaScript tools. Skilled in delivering end-to-end solutions
                with a strong focus on performance and usability.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="ui-kicker">Technical Expertise</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    Frontend
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Tailwind CSS",
                      "Redux",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="ui-chip rounded-md px-2 py-1 text-[10px] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    Backend
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Node.js",
                      "Express",
                      "MongoDB",
                      "PostgreSQL",
                      "REST APIs",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="ui-chip rounded-md px-2 py-1 text-[10px] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    AI Tools
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Cursor AI",
                      "Claude",
                      "GitHub Copilot",
                      "LangChain",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="ui-kicker">Education</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    B.Tech in Computer Science
                  </p>
                  <p className="text-xs text-neutral-500">
                    MIT, Pune | 2017-2021
                  </p>
                </div>
              </div>
            </section>
          </aside>

          <main className="p-6 sm:p-8 lg:p-12">
            <section className="mb-12">
              <h2 className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-neutral-400 after:h-px after:flex-1 after:bg-neutral-100 dark:after:bg-neutral-800">
                Work Experience
              </h2>

              <div className="mt-8 space-y-12">
                <div className="relative">
                  <div className="flex flex-col gap-2 justify-between md:flex-row md:items-center">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        Beyondwalls
                      </h3>
                      <p className="text-sm font-medium text-neutral-500">
                        Full Stack Application Developer
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-amber-600 md:text-right">
                      July 2025 - March 2026
                    </p>
                  </div>
                  <ul className="mt-4 list-outside list-disc space-y-2 pl-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>
                      Built modules for property listings, city pages, and lead
                      management logic.
                    </li>
                    <li>
                      Developed AI-powered chat system using RAG architecture
                      for contextual responses.
                    </li>
                    <li>
                      Migrated legacy apps to Next.js, improving SEO and
                      performance significantly.
                    </li>
                    <li>
                      Integrated Razorpay, Porter API, Google Maps, and
                      Firebase services.
                    </li>
                  </ul>
                </div>

                <div className="relative">
                  <div className="flex flex-col gap-2 justify-between md:flex-row md:items-center">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        Inat Technologies
                      </h3>
                      <p className="text-sm font-medium text-neutral-500">
                        React Developer
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-amber-600 md:text-right">
                      Nov 2023 - June 2025
                    </p>
                  </div>
                  <ul className="mt-4 list-outside list-disc space-y-2 pl-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>
                      Developed client-facing web apps for healthcare and retail
                      domains.
                    </li>
                    <li>
                      Built role-based modules, advanced dashboards, and
                      workflow-driven interfaces.
                    </li>
                    <li>
                      Managed complex states with Redux Toolkit and integrated
                      APIs with React Query.
                    </li>
                  </ul>
                </div>

                <div className="relative">
                  <div className="flex flex-col gap-2 justify-between md:flex-row md:items-center">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        IDC Technologies
                      </h3>
                      <p className="text-sm font-medium text-neutral-500">
                        Application Consultant
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-amber-600 md:text-right">
                      April 2023 - Oct 2023
                    </p>
                  </div>
                  <ul className="mt-4 list-outside list-disc space-y-2 pl-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>
                      Contributed to Loan Lifecycle Management System for Bank
                      of Maharashtra.
                    </li>
                    <li>
                      Developed responsive modules using React.js and Material
                      UI.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-neutral-400 after:h-px after:flex-1 after:bg-neutral-100 dark:after:bg-neutral-800">
                Certifications
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  "React & Next.js: Complete Guide",
                  "Complete JavaScript: Zero to Expert",
                  "Node.js Bootcamp",
                  "Google UX Design Professional",
                ].map((certification) => (
                  <div
                    key={certification}
                    className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/30"
                  >
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      {certification}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="mx-auto mt-12 max-w-4xl text-center text-xs text-neutral-400 print:hidden">
        <p>&copy; 2026 Pranay Langhe. Built with Next.js &amp; Tailwind CSS.</p>
      </footer>
    </div>
  );
}
