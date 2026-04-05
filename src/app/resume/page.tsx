"use client";

import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12 dark:bg-neutral-950 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="mx-auto mb-8 flex max-w-4xl items-center justify-between print:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
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

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
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
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print to PDF
        </button>
      </div>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 print:max-w-none print:rounded-none print:border-none print:shadow-none">
        <header className="relative bg-neutral-900 px-8 py-12 text-white dark:bg-black/40 sm:px-12">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Pranay Langhe
            </h1>
            <p className="mt-4 text-xl font-medium text-neutral-400">
              Full Stack Engineer • React / Next.js Architect • MERN Stack Developer
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 text-sm text-neutral-300 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Phone:</span> 9284771780
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Email:</span> pranaylanghe20@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Location:</span> Pune, MH, India
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">LinkedIn:</span> linkedin.com/in/pranaylanghe
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Website:</span> pranaylanghe.com
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] print:grid-cols-[1fr_2fr]">
          <aside className="border-r border-neutral-100 bg-neutral-50/50 p-8 dark:border-neutral-800 dark:bg-neutral-950/30 sm:p-10">
            <section className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Summary
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Full Stack Developer with 3.5 years of experience building scalable web applications using React.js, Next.js, and modern JS tools. Skilled in delivering end-to-end solutions with a strong focus on performance and usability.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Technical Expertise
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Frontend</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"].map((s) => (
                      <span key={s} className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[10px] font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Backend</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"].map((s) => (
                      <span key={s} className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[10px] font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">AI Tools</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Cursor AI", "Claude", "GitHub Copilot", "LangChain"].map((s) => (
                      <span key={s} className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Education
              </h2>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">B.Tech in Computer Science</p>
                  <p className="text-xs text-neutral-500">MIT, Pune | 2017-2021</p>
                </div>
              </div>
            </section>
          </aside>

          <main className="p-8 sm:p-12">
            <section className="mb-12">
              <h2 className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-neutral-400 after:h-px after:flex-1 after:bg-neutral-100 dark:after:bg-neutral-800">
                Work Experience
              </h2>

              <div className="mt-8 space-y-12">
                <div className="relative">
                  <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Beyondwalls</h3>
                      <p className="text-sm font-medium text-neutral-500">Full Stack Application Developer</p>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-amber-600 sm:mt-0">July 2025 - March 2026</p>
                  </div>
                  <ul className="mt-4 list-outside list-disc space-y-2 pl-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>Built modules for property listings, city pages, and lead management logic.</li>
                    <li>Developed AI-powered chat system using RAG architecture for contextual responses.</li>
                    <li>Migrated legacy apps to Next.js, improving SEO and performance significantly.</li>
                    <li>Integrated Razorpay, Porter API, Google Maps, and Firebase services.</li>
                  </ul>
                </div>

                <div className="relative">
                  <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Inat Technologies</h3>
                      <p className="text-sm font-medium text-neutral-500">React Developer</p>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-amber-600 sm:mt-0">Nov 2023 - June 2025</p>
                  </div>
                  <ul className="mt-4 list-outside list-disc space-y-2 pl-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>Developed client-facing web apps for healthcare and retail domains.</li>
                    <li>Built role-based modules, advanced dashboards, and workflow-driven interfaces.</li>
                    <li>Managed complex states with Redux Toolkit and integrated APIs with React Query.</li>
                  </ul>
                </div>

                <div className="relative">
                  <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">IDC Technologies</h3>
                      <p className="text-sm font-medium text-neutral-500">Application Consultant</p>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-amber-600 sm:mt-0">April 2023 - Oct 2023</p>
                  </div>
                  <ul className="mt-4 list-outside list-disc space-y-2 pl-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>Contributed to Loan Lifecycle Management System for Bank of Maharashtra.</li>
                    <li>Developed responsive modules using React.js and Material UI.</li>
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
                ].map((c) => (
                  <div key={c} className="rounded-lg border border-neutral-100 p-3 dark:border-neutral-800">
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{c}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="mx-auto mt-12 max-w-4xl text-center text-xs text-neutral-400 print:hidden">
        <p>© 2026 Pranay Langhe. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
