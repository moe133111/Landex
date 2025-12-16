// app/legal/DSGVO/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Landex Digital",
  robots: { index: true, follow: true },
};

export default function DSGVOPage() {
  return (
    <div className="text-slate-900">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Datenschutzerklärung
        </h1>
        <p className="mt-3 text-sm text-slate-700">
          Stand: {new Date().toLocaleDateString("de-DE")}
        </p>
      </header>

      <section className="space-y-8">
        {/* Verantwortlicher */}
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
          <h2 className="text-base font-semibold text-slate-900">Verantwortlicher</h2>
          <div className="mt-4 text-sm text-slate-900 leading-relaxed">
            <p className="font-semibold">Landex Digital UG (haftungsbeschränkt)</p>
            <p>Arnold-Zweig-Straße 34</p>
            <p>13189 Berlin</p>

            <p className="mt-4">
              Vertreten durch: Moritz Gellert
              <br />
              E-Mail:{" "}
              <a
                href="mailto:service@landex.digital"
                className="font-semibold underline underline-offset-4"
              >
                service@landex.digital
              </a>
            </p>
          </div>
        </div>

        {/* Inhalt */}
        <div className="prose prose-neutral max-w-none prose-p:text-slate-900 prose-li:text-slate-900">
          <h2 className="font-semibold text-slate-900">1. Allgemeine Hinweise</h2>
          <p>
            Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Personenbezogene Daten sind alle
            Daten, mit denen Sie persönlich identifiziert werden können. Diese Datenschutzerklärung
            informiert Sie darüber, welche Daten wir auf dieser Website verarbeiten, zu welchen Zwecken
            und auf welcher Rechtsgrundlage.
          </p>

          <h2 className="font-semibold text-slate-900">2. Begriffe und Rechtsgrundlagen</h2>
          <p>
            Wir verarbeiten personenbezogene Daten insbesondere auf Grundlage der folgenden Vorschriften:
          </p>
          <ul>
            <li>Art. 6 Abs. 1 lit. b DSGVO (Vertrag / vorvertragliche Maßnahmen)</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</li>
            <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), sofern eine Einwilligung eingeholt wird</li>
          </ul>
          <p>
            Zusätzlich können (insbesondere bei Cookies/Tracking) Vorgaben des Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG)
            bzw. der ePrivacy-Regelungen zu beachten sein.
          </p>

          <h2 className="font-semibold text-slate-900">3. Zugriffsdaten und Server-Logfiles</h2>
          <p>
            Beim Aufruf dieser Website werden durch den Hosting-Anbieter technisch erforderliche Daten
            verarbeitet (sogenannte Server-Logfiles). Dazu gehören insbesondere IP-Adresse, Datum/Uhrzeit
            des Abrufs, aufgerufene Seite/Datei, Referrer-URL, Browsertyp/-version, Betriebssystem sowie
            ggf. weitere technische Metadaten.
          </p>
          <p>
            <span className="font-semibold">Zweck:</span> Betrieb, Sicherheit und Stabilität der Website
            (z. B. Abwehr von Angriffen, Fehleranalyse).
            <br />
            <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
          </p>

          <h2 className="font-semibold text-slate-900">4. Hosting (Vercel)</h2>
          <p>
            Diese Website wird über den Hosting-Dienstleister <span className="font-semibold">Vercel</span> betrieben.
            Dabei verarbeitet Vercel personenbezogene Daten als Auftragsverarbeiter, soweit dies zur Bereitstellung
            und zum Betrieb der Website erforderlich ist.
          </p>
          <p>
            <span className="font-semibold">Empfänger:</span> Vercel Inc. (Hosting-/Infrastruktur-Dienstleister).
            <br />
            <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer
            und effizienter Bereitstellung der Website).
          </p>
          <p>
            <span className="font-semibold">Auftragsverarbeitung:</span> Mit Vercel wird ein Vertrag zur Auftragsverarbeitung
            (Art. 28 DSGVO) abgeschlossen bzw. genutzt.
          </p>
          <p>
            <span className="font-semibold">Drittlandtransfer:</span> Je nach Konfiguration/Leistung kann eine Verarbeitung
            außerhalb der EU/EWR nicht ausgeschlossen werden. In diesen Fällen werden geeignete Garantien eingesetzt
            (z. B. EU-Standardvertragsklauseln).
          </p>

          <h2 className="font-semibold text-slate-900">5. Domain/DNS (IONOS)</h2>
          <p>
            Die Domain wird über <span className="font-semibold">IONOS</span> bereitgestellt. IONOS kann als Domain-Registrar/DNS-Dienstleister
            technische Daten im Rahmen der Domainverwaltung verarbeiten. Die Inhalte und der Websitebetrieb erfolgen über das Hosting (Vercel).
          </p>
          <p>
            <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an verlässlicher
            Domain-Infrastruktur).
          </p>

          <h2 className="font-semibold text-slate-900">6. Cookies und Einwilligungsverwaltung (Cookie-Banner)</h2>
          <p>
            Wir verwenden notwendige Technologien, um die Website bereitzustellen. Darüber hinaus können – abhängig von Ihrer Auswahl im Cookie-Banner –
            optionale Technologien (z. B. Analyse/Marketing) eingesetzt werden.
          </p>
          <p>
            Das Cookie-Banner speichert Ihre Auswahl, um diese zu dokumentieren und die Abfrage nicht bei jedem Seitenaufruf zu wiederholen.
            Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft ändern oder widerrufen, indem Sie Ihre Cookie-Einstellungen erneut aufrufen
            (sofern eine entsprechende Funktion bereitgestellt ist) oder die gespeicherten Einwilligungsdaten in Ihrem Browser löschen.
          </p>
          <p>
            <span className="font-semibold">Rechtsgrundlagen:</span>
            <br />
            – Notwendige Technologien: Art. 6 Abs. 1 lit. f DSGVO
            <br />
            – Optionale Technologien (Analyse/Marketing): Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
          </p>

          <h2 className="font-semibold text-slate-900">7. Kontaktaufnahme (Formular und E-Mail)</h2>
          <p>
            Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten
            (z. B. Name, E-Mail-Adresse, Unternehmens-/Branchenangaben und Nachricht), um Ihre Anfrage zu bearbeiten.
          </p>
          <p>
            <span className="font-semibold">Zweck:</span> Bearbeitung und Beantwortung Ihrer Anfrage; ggf. Anbahnung eines Vertrags.
            <br />
            <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen/Vertrag) sowie
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation).
          </p>

          <h2 className="font-semibold text-slate-900">8. Google-Dienste für Analyse und Marketing</h2>
          <p>
            <span className="font-semibold">Wichtig:</span> Derzeit setzen wir keine Tracking-Tools produktiv ein. Die folgenden Abschnitte beschreiben
            Google-Dienste, die zukünftig eingesetzt werden können. Eine Aktivierung erfolgt erst, wenn die entsprechenden Dienste technisch eingebunden
            und – soweit erforderlich – über das Cookie-Banner wirksam per Einwilligung freigeschaltet werden.
          </p>

          <h3 className="font-semibold text-slate-900">8.1 Google Tag Manager</h3>
          <p>
            Wir können den Google Tag Manager einsetzen, um Website-Tags zentral zu verwalten. Der Tag Manager selbst erstellt in der Regel keine Nutzerprofile,
            kann jedoch technische Daten (z. B. IP-Adresse) verarbeiten und ermöglicht das Auslösen weiterer Tags (z. B. Analytics/Ads).
          </p>
          <p>
            <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), soweit der Tag Manager zur Ausspielung
            optionaler Tags genutzt wird. Notwendige technische Einbindungen können auf Art. 6 Abs. 1 lit. f DSGVO gestützt werden.
          </p>

          <h3 className="font-semibold text-slate-900">8.2 Google Analytics 4</h3>
          <p>
            Wir können Google Analytics 4 zur Analyse der Nutzung dieser Website einsetzen (z. B. welche Seiten aufgerufen werden, Verweildauer, technische
            Informationen zum Endgerät). Dadurch können wir die Website verbessern.
          </p>
          <p>
            <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            <br />
            <span className="font-semibold">Hinweis zu Datenflüssen:</span> Google Analytics 4 bietet EU-bezogene Datenverarbeitungsschritte (z. B. EU-Server/Endpoints);
            dennoch kann eine weitere Verarbeitung durch Google (einschließlich Drittlandtransfer) nicht ausgeschlossen werden.
          </p>

          <h3 className="font-semibold text-slate-900">8.3 Google Ads (Conversion Tracking)</h3>
          <p>
            Wir können Google Ads Conversion Tracking einsetzen, um den Erfolg von Werbemaßnahmen zu messen (z. B. ob nach einem Anzeigenklick eine Anfrage
            ausgelöst wurde). Dabei können Cookies/Identifier eingesetzt werden.
          </p>
          <p>
            <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>

          <h3 className="font-semibold text-slate-900">8.4 Google Ads Remarketing</h3>
          <p>
            Wir können Google Ads Remarketing einsetzen, um Nutzern interessenbezogene Werbung anzuzeigen. Dazu können Cookies/Identifier verwendet werden,
            um Besucher wiederzuerkennen und ihnen auf anderen Websites/Plattformen Anzeigen auszuspielen.
          </p>
          <p>
            <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>

          <h3 className="font-semibold text-slate-900">8.5 Google Consent Mode</h3>
          <p>
            Wenn Google-Dienste (z. B. Analytics/Ads) verwendet werden, können wir den Google Consent Mode einsetzen. Damit wird das Verhalten von Google-Tags
            an Ihre Einwilligungsentscheidung angepasst (z. B. nur eingeschränkte Signale ohne Einwilligung; vollständige Messung erst nach Einwilligung).
          </p>
          <p>
            <span className="font-semibold">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) für Analyse/Marketing.
          </p>

          <h2 className="font-semibold text-slate-900">9. Empfänger und Kategorien von Empfängern</h2>
          <p>
            Wir geben personenbezogene Daten nur weiter, wenn dies zur Bereitstellung der Website, zur Vertragsabwicklung oder zur Kommunikation erforderlich ist,
            oder wenn eine gesetzliche Pflicht besteht. Empfänger können insbesondere sein:
          </p>
          <ul>
            <li>Hosting-/Infrastruktur-Dienstleister (Vercel)</li>
            <li>Domain-/DNS-Dienstleister (IONOS)</li>
            <li>E-Mail-/Kommunikationsdienstleister (zur Bearbeitung von Anfragen)</li>
            <li>Bei Aktivierung: Google Ireland Limited / Google LLC (Analytics/Ads/Tag Manager)</li>
          </ul>

          <h2 className="font-semibold text-slate-900">10. Drittlandtransfer</h2>
          <p>
            Bei bestimmten Dienstleistern kann eine Verarbeitung außerhalb der EU/EWR (insbesondere in den USA) nicht ausgeschlossen werden.
            Soweit erforderlich, stützen wir Datenübermittlungen auf geeignete Garantien (z. B. EU-Standardvertragsklauseln) und setzen zusätzliche Maßnahmen
            entsprechend dem Stand der Technik und der Rechtslage ein.
          </p>

          <h2 className="font-semibold text-slate-900">11. Speicherdauer</h2>
          <p>
            Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist. Kontaktanfragen speichern wir üblicherweise
            für die Bearbeitung und für Rückfragen; danach werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
          <p>
            Bei aktivierten Analyse-/Marketing-Diensten richtet sich die Speicherdauer nach den jeweiligen Einstellungen/Retention-Policies im Tool.
          </p>

          <h2 className="font-semibold text-slate-900">12. Ihre Rechte</h2>
          <p>Sie haben im Rahmen der DSGVO insbesondere folgende Rechte:</p>
          <ul>
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch (Art. 21 DSGVO), sofern die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht</li>
            <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO) mit Wirkung für die Zukunft</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte genügt eine Nachricht an{" "}
            <a
              href="mailto:service@landex.digital"
              className="font-semibold underline underline-offset-4"
            >
              service@landex.digital
            </a>
            .
          </p>

          <h2 className="font-semibold text-slate-900">13. Beschwerderecht bei der Aufsichtsbehörde</h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer
            personenbezogenen Daten gegen Datenschutzrecht verstößt (Art. 77 DSGVO). In Berlin ist dies in der Regel die Berliner Beauftragte für Datenschutz
            und Informationsfreiheit.
          </p>

          <h2 className="font-semibold text-slate-900">14. Sicherheitsmaßnahmen</h2>
          <p>
            Wir treffen angemessene technische und organisatorische Maßnahmen, um Ihre Daten gegen Verlust, Missbrauch und unberechtigten Zugriff zu schützen.
            Eine vollständige Sicherheit bei Internetübertragungen kann jedoch nicht garantiert werden.
          </p>

          <h2 className="font-semibold text-slate-900">15. Änderungen dieser Datenschutzerklärung</h2>
          <p>
            Wir können diese Datenschutzerklärung anpassen, wenn sich die Rechtslage oder unsere Datenverarbeitungen ändern. Es gilt die jeweils auf dieser Seite
            veröffentlichte Version.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-5">
          <p className="text-xs text-slate-600">
            Hinweis: Diese Datenschutzerklärung stellt keine Rechtsberatung dar. Bei Aktivierung von Google Analytics/Ads/Tag Manager sollten außerdem
            die jeweiligen Kontoeinstellungen (z. B. Datenaufbewahrung, ggf. IP-/Signal-Optionen, Consent Mode) dokumentiert und mit dem Cookie-Banner technisch
            korrekt verknüpft werden.
          </p>
        </div>
      </section>
    </div>
  );
}
