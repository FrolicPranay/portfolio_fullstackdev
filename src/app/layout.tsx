import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Pranay Langhe | Full‑Stack Developer",
  description:
    "Portfolio of Pranay Langhe, a React / Next.js / MERN full‑stack developer with 4 years of industry experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100`}>
        {children}
      </body>
    </html>
  );
}
