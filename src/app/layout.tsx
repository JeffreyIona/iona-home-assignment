import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { shop } from '@/lib/contents';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: shop.meta_title, template: `%s | ${shop.title}` },
  description: shop.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased bg-gray-50`}>
        <NextTopLoader color="#00a63e" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
