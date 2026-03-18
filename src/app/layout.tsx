// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, BreadcrumbJsonLd } from "./components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.landex.digital'),
  title: {
    default: 'Webdesigner für Landing Pages – Landex Digital',
    template: '%s | Landex Digital',
  },
  description: 'Landex Digital ist Ihr Webdesigner für Landing Pages, die konvertieren. Strategie, Copy, Design & Code für lokale Unternehmen – klar, fokussiert, aus einer Hand.',
  keywords: ['Webdesigner Landing Page', 'Landing Page erstellen lassen', 'Landing Page Agentur', 'Webdesigner für lokale Unternehmen', 'Landing Page für kleine Unternehmen'],
  authors: [{ name: 'Landex Digital' }],
  creator: 'Landex Digital',
  publisher: 'Landex Digital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.landex.digital',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.landex.digital',
    siteName: 'Landex Digital',
    title: 'Webdesigner für Landing Pages – Landex Digital',
    description: 'Landing Pages für lokale Unternehmen – Strategie, Copy, Design & Code aus einer Hand. Klar, fokussiert, ohne Baukasten.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Landex Digital – Webdesigner für Landing Pages',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webdesigner für Landing Pages – Landex Digital',
    description: 'Landing Pages für lokale Unternehmen – Strategie, Copy, Design & Code aus einer Hand.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <OrganizationJsonLd />
        <BreadcrumbJsonLd />
        {children}
      </body>
    </html>
  );
}
