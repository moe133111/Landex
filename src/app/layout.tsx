// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Landex Digital",
    template: "%s | Landex Digital",
  },
  description:
    "Landex Digital erstellt Landing Pages für lokale Unternehmen – Strategie, Copy, Design und Umsetzung aus einer Hand. Klar, fokussiert, ohne Baukasten.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
