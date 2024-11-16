import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Batik',
    default: 'Batik (Belajar etika)',
  },
  description: "Batik Belajar Etika",
  generator: 'Next.js',
  applicationName: 'Batik Belajar Etika',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'Belajar etika', 'batik', 'pendidikan agama islam','PAI', 'Edukasi', 'akhlak', 'islam'],
  authors: [{ name: 'Frisnadi' }, { name: 'Batik', url: 'https://frisyk.vercel.app' }],
  creator: 'Frisnadi Nurul Huda',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
