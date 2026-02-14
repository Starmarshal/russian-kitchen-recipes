import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Providers} from '@/app/providers';
import {siteConfig} from '@/config/site.config';
import Header from '@/components/UI/header';
import {layoutConfig} from '@/config/layout.config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <Providers>
      <Header />
      <main
        className={`flex flex-col w-full justify-start items-center`}
        style={{height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`}}
      >
        {children}
      </main>
      <footer
        className={`flex justify-center items-center h-[${layoutConfig.footerHeight}]`}
        style={{height: `${layoutConfig.footerHeight}`}}
      >
        <p>{siteConfig.description}</p>
      </footer>
    </Providers>
    </body>
    </html>
  );
}
