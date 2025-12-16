// app/legal/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rechtliches",
  robots: {
    index: true,
    follow: true,
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Optionaler schlichter Kopf */}
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Rechtliches
          </p>
          <nav className="mt-3 flex gap-4 text-sm text-slate-700">
            <Link href="/legal/Impressum" className="hover:text-slate-900">
              Impressum
            </Link>
            <Link href="/legal/DSGVO" className="hover:text-slate-900">
              Datenschutz
            </Link>
            <Link href="/legal/AGB" className="hover:text-slate-900">
              AGB
            </Link>
          </nav>
        </div>
      </header>

      {/* Inhalt */}
      <main className="mx-auto max-w-3xl px-4 py-10">
        <article className="prose prose-slate max-w-none">
          {children}
        </article>
      </main>

      {/* Footer-Hinweis */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 py-6 text-xs text-slate-500">
          <p>
            Die folgenden Inhalte dienen der rechtlichen Information und
            ersetzen keine individuelle Rechtsberatung.
          </p>
        </div>
      </footer>
    </div>
  );
}
