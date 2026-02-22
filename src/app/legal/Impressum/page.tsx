// app/legal/Impressum/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Gellert & Ali Consulting",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="text-slate-900">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Impressum
        </h1>
        <p className="mt-3 text-sm text-slate-700">
          Angaben gemäß § 5 TMG
        </p>
      </header>

      <section className="space-y-8">
        {/* Anbieter */}
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Anbieter</h2>
          <div className="text-sm leading-relaxed text-slate-900">
            <p className="font-semibold">
              Gellert & Ali Consulting GbR
            </p>
            <p>Arnold-Zweig-Straße 34</p>
            <p>13189 Berlin</p>
          </div>
        </div>

        {/* Vertretung & Kontakt */}
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">
            Vertretungsberechtigte Personen
          </h2>
          <div className="text-sm leading-relaxed text-slate-900">
            <p>Vertreten durch: <span className="font-semibold">Moritz Gellert &amp; Saman Ali</span></p>
            <p className="mt-3">
              E-Mail:{" "}
              <a
                href="mailto:service@landex.digital"
                className="font-semibold underline underline-offset-4"
              >
                service@landex.digital
              </a>
            </p>
            <p className="mt-3 text-xs text-slate-600">
              Eine Telefonnummer wird derzeit nicht bereitgestellt.
            </p>
          </div>
        </div>

        {/* Register & Umsatzsteuer */}
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">
            Registereintrag
          </h2>
          <div className="text-sm leading-relaxed text-slate-900">
            <p>
              Rechtsform: Gesellschaft bürgerlichen Rechts (GbR)
            </p>
            <p className="mt-3 text-xs text-slate-600">
              Eintragung im Gesellschaftsregister wird nach Eintragung ergänzt.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">
            Umsatzsteuer
          </h2>
          <div className="text-sm leading-relaxed text-slate-900">
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
            </p>
            <p className="mt-2 text-xs text-slate-600">
              Derzeit noch nicht vergeben.
            </p>
          </div>
        </div>

        {/* Verantwortlich für Inhalte */}
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <div className="text-sm leading-relaxed text-slate-900">
            <p>Moritz Gellert &amp; Saman Ali</p>
            <p>Arnold-Zweig-Straße 34</p>
            <p>13189 Berlin</p>
          </div>
        </div>

        {/* Haftungsausschlüsse */}
        <div className="prose prose-neutral max-w-none prose-p:text-slate-900">
          <h2 className="font-semibold text-slate-900">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen
            zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
          </p>

          <h2 className="font-semibold text-slate-900">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich.
          </p>

          <h2 className="font-semibold text-slate-900">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-5">
          <p className="text-xs text-slate-600">
            Hinweis: Dieses Impressum wurde mit größtmöglicher Sorgfalt erstellt
            und ersetzt keine rechtliche Beratung.
          </p>
        </div>
      </section>
    </div>
  );
}
