import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ALIDEV — 3D Portfolio',
  description: 'Interactive 3D Personal Portfolio built with Next.js, Three.js, and React Three Fiber.',
  keywords: ['ALIDEV', '3D Portfolio', 'Next.js', 'React Three Fiber', 'Three.js', 'Developer'],
  authors: [{ name: 'ALIDEV' }],
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full`}>
      <body className="h-full bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
