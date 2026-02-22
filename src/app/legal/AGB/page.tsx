// app/legal/AGB/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB | Gellert & Ali Consulting",
  robots: { index: true, follow: true },
};

export default function AGBPage() {
  return (
    <div className="text-slate-900">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <p className="mt-3 text-sm text-slate-700">
          Stand: {new Date().toLocaleDateString("de-DE")}
        </p>
      </header>

      <section className="space-y-8">
        {/* Anbieterbox */}
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
          <h2 className="text-base font-semibold text-slate-900">Anbieter</h2>
          <div className="mt-4 text-sm text-slate-900 leading-relaxed">
            <p className="font-semibold">Gellert & Ali Consulting GbR</p>
            <p>Arnold-Zweig-Straße 34</p>
            <p>13189 Berlin</p>

            <p className="mt-4">
              Vertreten durch: Moritz Gellert &amp; Saman Ali
              <br />
              E-Mail:{" "}
              <a
                href="mailto:service@landex.digital"
                className="font-semibold underline underline-offset-4"
              >
                service@landex.digital
              </a>
            </p>

            <p className="mt-3 text-xs text-slate-600">
              Umsatzsteuer-Identifikationsnummer liegt derzeit noch nicht vor.
            </p>
          </div>
        </div>

        {/* Inhalt */}
        <div className="prose prose-neutral max-w-none prose-p:text-slate-900 prose-li:text-slate-900">
          <h2 className="font-semibold text-slate-900">1. Geltungsbereich</h2>
          <p>
            (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
            Verträge zwischen der Gellert & Ali Consulting GbR,
            Arnold-Zweig-Straße 34, 13189 Berlin, E-Mail: service@landex.digital –
            nachfolgend „Anbieter“ – und ihren Kunden – nachfolgend „Kunde“.
          </p>
          <p>
            (2) Das Angebot richtet sich ausschließlich an Unternehmer im Sinne
            von § 14 BGB. Verträge mit Verbrauchern werden nicht geschlossen.
          </p>
          <p>
            (3) Abweichende oder ergänzende Geschäftsbedingungen des Kunden
            finden keine Anwendung, es sei denn, ihrer Geltung wird ausdrücklich
            schriftlich zugestimmt.
          </p>

          <h2 className="font-semibold text-slate-900">2. Vertragsgegenstand</h2>
          <p>
            (1) Vertragsgegenstand ist die Erstellung von Landing Pages als
            Dienstleistung, insbesondere bestehend aus Konzeption und Struktur,
            Texterstellung (Copy), Gestaltung (Design) sowie technischer Umsetzung
            und Veröffentlichung.
          </p>
          <p>
            (2) Der konkrete Leistungsumfang ergibt sich aus dem individuellen
            Angebot bzw. der Auftragsbestätigung.
          </p>
          <p>
            (3) Der Anbieter schuldet keinen bestimmten wirtschaftlichen Erfolg,
            sondern ausschließlich die vereinbarte Leistung.
          </p>

          <h2 className="font-semibold text-slate-900">3. Zusatzleistungen (Add-ons)</h2>
          <p>(1) Neben dem Basisprodukt können folgende Zusatzleistungen vereinbart werden:</p>
          <ul>
            <li>Definition des Seitenziels: 150 €</li>
            <li>Referenzen &amp; Nachweise-Paket: 100 €</li>
            <li>Erweiterte Vertrauenselemente: 65 €</li>
            <li>Termin- / Buchungssystem-Integration: 200 €</li>
            <li>Basis-Tracking: 100 €</li>
            <li>Mehrsprachige Landing Page: 200 €</li>
            <li>Zusätzliche Landingpage für weiteres Angebot: 300 €</li>
          </ul>
          <p>(2) Zusatzleistungen werden nur Vertragsbestandteil, wenn sie im Angebot ausdrücklich aufgeführt sind.</p>

          <h2 className="font-semibold text-slate-900">4. Hosting, Domain und technische Infrastruktur</h2>
          <p>
            (1) Hosting- und Domain-Setup sind Bestandteil des Grundpakets und werden im Rahmen
            des Projekts eingerichtet.
          </p>
          <p>(2) Die technische Infrastruktur wird nach Projektabschluss an den Kunden übergeben.</p>
          <p>(3) Eine laufende Betreuung erfolgt nur, wenn eine monatliche Zusatzleistung vereinbart wird.</p>

          <h2 className="font-semibold text-slate-900">5. Projektablauf und Mitwirkungspflichten</h2>
          <p>(1) Der Anbieter erbringt seine Leistungen auf Basis der vom Kunden bereitgestellten Informationen.</p>
          <p>(2) Der Kunde verpflichtet sich insbesondere:</p>
          <ul>
            <li>Bereitstellung notwendiger Inhalte und Materialien,</li>
            <li>Benennung eines Ansprechpartners,</li>
            <li>
              <span className="font-semibold">Rechtzeitige</span> Freigaben und Rückmeldungen, d. h.{" "}
              <span className="font-semibold">innerhalb von 5 Werktagen</span> nach Zugang einer
              entsprechenden Anfrage des Anbieters, sofern nicht im Angebot/Projektplan abweichend vereinbart.
            </li>
          </ul>
          <p>
            (3) Im Basispreis ist eine Korrekturschleife enthalten. Weitere Änderungen können gesondert vergütet werden.
          </p>
          <p>
            (4) Verzögerungen aufgrund fehlender Mitwirkung des Kunden verlängern vereinbarte Zeitpläne entsprechend.
          </p>

          <h2 className="font-semibold text-slate-900">6. Abnahme</h2>
          <p>(1) Die Abnahme erfolgt gemäß der im Angebot vereinbarten Regelung.</p>
          <p>
            (2) Sofern im Angebot kein konkreter Zeitraum bestimmt ist, gilt: Erfolgt keine Beanstandung{" "}
            <span className="font-semibold">innerhalb von 7 Werktagen</span> nach Bereitstellung der
            abnahmefähigen Leistung (z. B. Live-Link/Staging-Link), gilt die Leistung als abgenommen.
          </p>

          <h2 className="font-semibold text-slate-900">7. Preise und Zahlungsbedingungen</h2>
          <p>(1) Alle Preise verstehen sich netto zuzüglich gesetzlicher Umsatzsteuer, sofern diese anfällt.</p>
          <p>(2) Die Rechnungsstellung erfolgt einmalig nach Abnahme.</p>
          <p>(3) Das Zahlungsziel beträgt 30 Tage nach Rechnungserhalt.</p>
          <p>(4) Eine Anzahlung wird nur erhoben, wenn dies ausdrücklich vereinbart wurde.</p>

          <h2 className="font-semibold text-slate-900">8. Laufende Leistungen</h2>
          <p>(1) Laufende Leistungen werden mit 35 € pro Monat berechnet, sofern vereinbart.</p>
          <p>(2) Die Leistung umfasst:</p>
          <ul>
            <li>Betrieb von Hosting und SSL</li>
            <li>Technische Updates im Rahmen</li>
            <li>Kleine inhaltliche Pflege (z. B. Textkorrekturen, Austausch einzelner Inhalte)</li>
            <li>Fehlerbehebung bei offensichtlichen technischen Problemen</li>
          </ul>
          <p>(3) Nicht enthalten sind insbesondere:</p>
          <ul>
            <li>Redesigns</li>
            <li>Erstellung neuer umfangreicher Inhalte</li>
            <li>Kampagnen-, Marketing- oder Optimierungsleistungen</li>
          </ul>
          <p>(4) Die Laufzeit ist unbefristet. Der Vertrag ist monatlich kündbar.</p>

          <h2 className="font-semibold text-slate-900">9. Nutzungsrechte und Referenznennung</h2>
          <p>
            (1) Der Kunde erhält nach vollständiger Zahlung die vereinbarten Nutzungsrechte an der erstellten Landing Page.
          </p>
          <p>(2) Der Kunde sichert zu, dass bereitgestellte Inhalte frei von Rechten Dritter sind.</p>
          <p>(3) Für vom Anbieter bereitgestellte Inhalte sorgt dieser für die erforderlichen Nutzungsrechte.</p>
          <p>(4) Der Anbieter ist berechtigt, das Projekt als Referenz zu nutzen, sofern nichts anderes vereinbart wurde.</p>

          <h2 className="font-semibold text-slate-900">10. Haftung</h2>
          <p>(1) Der Anbieter haftet nur für Vorsatz und grobe Fahrlässigkeit.</p>
          <p>(2) Eine Haftung für entgangenen Gewinn, Umsatzausfälle oder sonstige mittelbare Schäden ist ausgeschlossen.</p>
          <p>
            (3) Insbesondere wird keine Garantie für Reichweite, Rankings, Conversion-Raten oder wirtschaftlichen Erfolg übernommen.
          </p>

          <h2 className="font-semibold text-slate-900">11. Support und Erreichbarkeit</h2>
          <p>
            Anfragen an{" "}
            <a
              href="mailto:service@landex.digital"
              className="font-semibold underline underline-offset-4"
            >
              service@landex.digital
            </a>{" "}
            werden in der Regel innerhalb von 24 Stunden beantwortet.
          </p>

          <h2 className="font-semibold text-slate-900">12. Schlussbestimmungen</h2>
          <p>(1) Es gilt das Recht der Bundesrepublik Deutschland.</p>
          <p>(2) Gerichtsstand für alle Streitigkeiten ist, soweit zulässig, Berlin.</p>
          <p>(3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
        </div>

        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-5">
          <p className="text-xs text-slate-600">
            Hinweis: Diese AGB stellen keine Rechtsberatung dar.
          </p>
        </div>
      </section>
    </div>
  );
}

