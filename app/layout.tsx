import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Batika',
    default: 'Batika (Belajar etika)',
  },
  description: "Batika Belajar Etika",
  generator: 'Next.js',
  applicationName: 'Batika Belajar Etika',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'Belajar etika', 'batika', 'pendidikan agama islam','PAI', 'Edukasi', 'akhlak', 'islam'],
  authors: [{ name: 'Frisnadi' }, { name: 'Batika', url: 'https://frisyk.vercel.app' }],
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
