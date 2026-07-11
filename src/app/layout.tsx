import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Sidebar } from '@/components/sidebar';
import { TopBar } from '@/components/top-bar';

export const metadata: Metadata = {
  title: 'Tensor Lab — The world of Tensor Decomposition',
  description:
    'The most comprehensive, visual, and interactive learning platform for Tensor Decomposition. From mathematics to AI and quantum computing.',
  keywords: [
    'tensor decomposition',
    'CP',
    'PARAFAC',
    'Tucker',
    'tensor train',
    'tensor networks',
    'machine learning',
    'quantum computing',
  ],
  authors: [{ name: 'Tensor Lab' }],
  openGraph: {
    title: 'Tensor Lab',
    description: 'Learn Tensor Decomposition from Mathematics to AI and Quantum Computing',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 min-w-0">
              <TopBar />
              <main className="page-enter">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
