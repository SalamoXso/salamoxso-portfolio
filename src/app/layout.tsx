import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SalamoXSO - Full-Stack Developer & Cybersecurity Expert',
  description: 'Professional portfolio of SalamoXSO, showcasing skills in full-stack development, cybersecurity, and web app pentesting.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-900 text-white">
          {children}
        </main>
      </body>
    </html>
  );
}