import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import XBanner from '@/components/XBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lusentinel — Precision Agent Engine',
  description:
    'Lusentinel is a precision agent engine built for intelligent automation, real-time execution monitoring, and multi-agent orchestration.',
  keywords: ['agent engine', 'automation', 'multi-agent', 'orchestration', 'Lusentinel'],
  openGraph: {
    title: 'Lusentinel — Precision Agent Engine',
    description: 'Intelligent automation through precision agent orchestration.',
    url: 'https://lusentinel.fun',
    siteName: 'Lusentinel',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-base text-light antialiased`}>
        <XBanner />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
