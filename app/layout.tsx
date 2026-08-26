import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammad Ali — Anime Village 3D Portfolio",
  description:
    "Explore an interactive anime-inspired 3D village portfolio by Mohammad Ali. Move through houses to discover skills, projects, experience, and creative engineering.",
  keywords: [
    "3D Portfolio",
    "Three.js",
    "React Three Fiber",
    "Anime Web App",
    "Creative Web Developer",
    "WebGL",
    "Mohammad Ali",
  ],
  authors: [{ name: "Mohammad Ali" }],
  openGraph: {
    title: "Mohammad Ali — Anime Village 3D Portfolio",
    description:
      "Explore an interactive anime-inspired 3D village portfolio by Mohammad Ali.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
        {children}
      </body>
    </html>
  );
}
