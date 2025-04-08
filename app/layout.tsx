import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from '@/providers/AuthProvider';
import SessionSyncProvider from '@/components/ui/SessionSyncProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Batik Education',
    default: 'Batik Education',
  },
  description: "Belajar tentang batik dan warisan budaya Indonesia melalui platform pembelajaran interaktif",
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
    <html lang="id">
      <body className={inter.className}>
        <SessionSyncProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SessionSyncProvider>
      </body>
    </html>
  );
}
