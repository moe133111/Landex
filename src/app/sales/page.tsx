"use client";

import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";

type YesNoUnknown = "Ja" | "Nein" | "Unklar";
type YesNo = "Ja" | "Nein";

type DeliveryModel = "handover" | "managed" | "editor";

type BranchId =
  | "restaurant_cafe"
  | "hair_barber"
  | "cosmetic_nails"
  | "physio_practice"
  | "coach_consultant"
  | "trainer_studio"
  | "crafts";

type AddonGroup = "Strategie" | "Inhalte & Nachweise" | "Funktion & Tracking" | "Erweiterungen";

type Addon = {
  id: string;
  label: string;
  price: number;
  group: AddonGroup;
  description: string;
  includes: string[];
  excludes?: string[];
  notes?: string[];
  examples?: string[];
};

type ServiceAccordion = {
  title: string;
  description: string;
  includes: string[];
  excludes?: string[];
  notes?: string[];
  examples?: string[];
};

type BranchFieldType = "text" | "textarea" | "yesno" | "select" | "url";

type BranchField = {
  id: string;
  label: string;
  type: BranchFieldType;
  helper: string;
  options?: string[];
  placeholder?: string;
};

const BASE_PRICE = 500;

const BRANCHES: { id: BranchId; label: string; helper: string }[] = [
  { id: "restaurant_cafe", label: "Restaurants & Cafés", helper: "Reservierung, Öffnungszeiten, Karte, Standort, Events." },
  { id: "hair_barber", label: "Friseure & Barbiere", helper: "Leistungen, Terminlogik, Zielgruppe, Preise ab, No-Show." },
  { id: "cosmetic_nails", label: "Kosmetik- & Nagelstudios", helper: "Behandlungen, Dauer, Preisrahmen, Hygiene, Qualifikationen." },
  { id: "physio_practice", label: "Physio- & Heilpraxen", helper: "Kasse/Privat, Rezept, Hinweise, Schwerpunkte, Terminaufnahme." },
  { id: "coach_consultant", label: "Coaches & Berater", helper: "Angebote, Zielgruppe, Erstgespräch, Proof, Abgrenzung." },
  { id: "trainer_studio", label: "Personal Trainer & Studios", helper: "Probetraining, Mitgliedschaften, Kursplan, Standort, Buchung." },
  { id: "crafts", label: "Handwerksbetriebe", helper: "Leistungen, Einzugsgebiet, Projekte, Prozess, Notdienst." },
];

/**
 * Add-ons (bereinigt, ohne Dopplungen):
 * - Local SEO ist Bestandteil des Basisprodukts (kein Add-on mehr).
 */
const ADDONS: Addon[] = [
  {
    id: "goal_definition",
    label: "Definition des Seitenziels",
    price: 150,
    group: "Strategie",
    description:
      "Gemeinsame, saubere Zieldefinition (Primärziel, CTA-Logik, Priorisierung), damit die Seite später konsistent umgesetzt werden kann.",
    includes: [
      "Klärung des Primärziels (z. B. Lead, Buchung, Info, Recruiting)",
      "Ableitung der CTA-Logik und Priorisierung der Inhalte",
      "Kurz-Dokumentation als Leitlinie für Umsetzung und Abnahme",
    ],
    excludes: ["Keine Erfolgs- oder Ergebniszusagen", "Keine Kampagnen-/Marketingstrategie über die Seite hinaus"],
  },
  {
    id: "proof_pack",
    label: "Referenzen & Nachweise-Paket",
    price: 100,
    group: "Inhalte & Nachweise",
    description:
      "Aufbereitung und Integration glaubwürdiger Nachweise über die Basis hinaus. Ziel ist mehr Vertrauen ohne Übertreibung.",
    includes: [
      "Aufbereitung von 2–5 Kundenstimmen mit Kontext (wenn vorhanden)",
      "Einbindung von Siegeln/Qualifikationen/Nachweisen (nur echte Nachweise)",
      "Saubere Platzierung im Seitenfluss (nicht überladen)",
    ],
    excludes: ["Keine Erfolgs- oder Ergebnisgarantien", "Keine künstlichen/erfundenen Bewertungen oder Platzhalter-Siegel"],
    examples: [
      "Handwerk: Meistertitel + 3 Beispielprojekte (kurz) + 2 Kundenstimmen",
      "Gastro: Bewertungsdurchschnitt + 2–3 Review-Auszüge (wenn freigegeben)",
    ],
  },
  {
    id: "trust_plus",
    label: "Erweiterte Vertrauenselemente",
    price: 65,
    group: "Inhalte & Nachweise",
    description:
      "Zusätzliche, saubere Vertrauenselemente über die Standarddarstellung hinaus (ohne Überladung).",
    includes: [
      "Erweiterter Vertrauensabschnitt (faktenbasiert, keine Versprechen)",
      "Optionale Mikro-Elemente: Prozess-Icons, Qualitäts-/Ablaufhinweise, Hinweis-Boxen",
      "Feinschliff der Platzierung (Lesefluss/UX)",
    ],
    excludes: ["Keine Fake-Siegel/Bewertungen", "Keine Ergebnis-Claims/Ranking-Claims"],
  },
  {
    id: "booking_integration",
    label: "Termin- / Buchungssystem-Integration",
    price: 200,
    group: "Funktion & Tracking",
    description:
      "Einbindung eines externen Buchungs-/Reservierungssystems inkl. CTA-Führung und Basis-Check der Nutzerführung.",
    includes: ["Integration (Link oder Embed – abhängig vom Tool)", "CTA-Verknüpfung (Buttons/Sektionen) passend zur Seite", "Basisprüfung der Journey (mobil/desktop)"],
    excludes: ["Tool-Lizenz/Account beim Anbieter", "Komplexe Regelwerke/Automationen des Tools"],
    examples: ["Doctolib/Calendly: Terminbutton + Einbettung", "Gastro: Reservierungslink + prominenter CTA"],
  },
  {
    id: "tracking_basic",
    label: "Basis-Tracking",
    price: 100,
    group: "Funktion & Tracking",
    description:
      "Messbarkeit der wichtigsten Interaktionen. Dient Transparenz und interner Auswertung, ohne Zielwerte oder Erfolgszusagen.",
    includes: ["Seitenaufrufe", "CTA-Klicks (z. B. Telefon, Buchung, Formular)", "Formularabsendungen (wenn Formular genutzt wird)", "Kurzcheck: Tracking feuert korrekt"],
    excludes: ["Kampagnen-Tracking/Attribution", "Conversion-Optimierung", "Reporting-Routinen"],
    notes: ["Cookie-/Consent-Lösung ist abhängig vom Setup und nicht automatisch enthalten."],
  },
  {
    id: "multilang_lp",
    label: "Mehrsprachige Landing Page",
    price: 200,
    group: "Erweiterungen",
    description:
      "Zusätzliche Sprachversion der bestehenden Landing Page (Inhalte pro Sprache getrennt gepflegt).",
    includes: ["Technische Umsetzung der Mehrsprachigkeit (eine zusätzliche Sprache)", "Sprachumschaltung/Struktur je nach Setup", "Einbindung der Übersetzungen (bereitgestellt)"],
    excludes: ["Übersetzungsleistung (Texterstellung)"],
  },
  {
    id: "additional_landingpage",
    label: "Zusätzliche Landingpage für weiteres Angebot",
    price: 300,
    group: "Erweiterungen",
    description:
      "Zusätzliche Landing Page für ein weiteres Angebot (eigene Storyline, eigener CTA), im gleichen Projektkontext.",
    includes: ["Zweite Landing Page (eigene Inhalte/Argumentation)", "Eigene CTA- und Kontaktlogik im Rahmen des Setups", "Abstimmung der Struktur passend zum zusätzlichen Angebot"],
    excludes: ["Umfangreiche Multi-Page-Websites", "Mehrere zusätzliche Seiten ohne separate Vereinbarung"],
    notes: ["Diese Zusatzleistung erhöht Abstimmungs- und Umsetzungsaufwand deutlich."],
  },
];

const BASE_SERVICE_ACCORDION: ServiceAccordion[] = [
  {
    title: "Strategie & Struktur (Basis)",
    description:
      "Klares, vertikales Seitenkonzept: eine Argumentationslinie, saubere Reihenfolge, keine unnötigen Nebenmodule.",
    includes: [
      "Struktur/Storyline für einen Standard-Onepager",
      "Priorisierung der Inhalte nach Relevanz für Erstinteressenten",
      "CTA-Führung nach dem vereinbarten Setup (ohne separate Zieldefinition als Add-on)",
    ],
    excludes: ["Keine Kampagnen-/Marketingstrategie", "Keine Mehrseiten-Strukturen"],
  },
  {
    title: "Texte & Inhalte (Basis)",
    description:
      "Texte werden nachvollziehbar und handlungsorientiert erstellt – ohne überzogene Versprechen.",
    includes: [
      "Hero-Überschrift + Unterzeile (Kernbotschaft)",
      "Nutzenargumente (Benefits) in verständlicher Sprache",
      "Leistungsbeschreibung (branchentypisch, passend zum Formular)",
      "Kurzer Ablaufabschnitt",
      "Basis-FAQ (5–7 typische Rückfragen kurz beantwortet)",
      "CTA-Texte passend zur Seite",
    ],
    excludes: ["Keine umfangreichen redaktionellen Langtexte (Blog/Ratgeber)", "Keine rechtliche Textprüfung"],
  },
  {
    title: "Design & UX (Basis)",
    description:
      "Reduziertes Design mit klarer Logik. Fokus auf Lesbarkeit, Orientierung und konsistente CTA-Führung.",
    includes: ["Individuelles, reduziertes Layout (Desktop & Mobile)", "Saubere Hierarchie (Überschriften, Abstände, Sektionen)", "Vertikaler Aufbau statt paralleler Module"],
    excludes: ["Kein umfassendes Brand-Design-System", "Kein Komplett-Rebranding"],
  },
  {
    title: "Local SEO Basis (im Grundpaket)",
    description:
      "Lokale Grundoptimierung zur sauberen Auffindbarkeit. Kein SEO-Projekt und keine Ranking-Versprechen.",
    includes: [
      "Integration lokaler Begriffe (Stadt/Region/Einzugsgebiet) in sinnvoller Form",
      "Strukturelle Onpage-Erweiterung für lokale Relevanz (ohne Keyword-Stuffing)",
      "Saubere Maps-/Anfahrt-Verknüpfung (je nach Setup)",
    ],
    excludes: ["Keine Ranking-Garantien", "Keine laufende SEO-Betreuung"],
    notes: ["SEO-Hygiene (Titel/Meta/Struktur) ist zusätzlich im Technik-Teil enthalten."],
  },
  {
    title: "Technik & Livegang (Basis)",
    description:
      "Technische Umsetzung als performante Landing Page inkl. Go-Live-Basis. Ziel ist stabiler Betrieb nach Veröffentlichung.",
    includes: [
      "Responsive Umsetzung",
      "E-Mail-Benachrichtigung bei Formularanfragen (wenn Formular genutzt wird)",
      "SEO-Hygiene (Titel, Meta, saubere Struktur) im Grundumfang",
      "Go-Live Basischeck: Erreichbarkeit, SSL/HTTPS, Standard-Weiterleitung (www/non-www)",
      "1 Korrekturschleife im Rahmen des vereinbarten Inhalts",
    ],
    excludes: ["Keine dauerhafte Betreuung ohne Vertrag", "Keine Werbekampagnen-Setups (Ads)", "Keine laufende SEO-Betreuung"],
    notes: ["Komplexe DNS-/Provider-Themen sind kein Standardbestandteil; nur im Rahmen klarer Vereinbarung."],
  },
];

const DELIVERY_ACCORDIONS: Record<DeliveryModel, ServiceAccordion> = {
  handover: {
    title: "Übergabe (ohne laufende Betreuung) – Details",
    description:
      "Wir liefern die fertige Landing Page. Betrieb (Hosting/Domain) liegt beim Kunden. Änderungen nach Projektabschluss erfolgen als neues Ticket/Projekt oder kundenseitig.",
    includes: [
      "Übergabe der fertigen Seite im vereinbarten Umfang",
      "Kurzcheck nach Livegang (Erreichbarkeit / offensichtliche Fehler)",
      "Dokumentierter Stand (Zusammenfassung als Export)",
    ],
    excludes: ["Keine laufende Pflege/Updates", "Keine Reaktionszeiten/Support außerhalb neuer Beauftragung"],
  },
  managed: {
    title: "Laufende Leistung (Hosting & Pflege) – Details",
    description:
      "Wir betreiben die Seite inkl. Hosting/SSL und übernehmen kleine Pflegeanpassungen im vereinbarten Rahmen. Monatlicher Betrag planbar.",
    includes: [
      "Hosting & SSL Betrieb",
      "Technische Updates im Rahmen (wenn relevant)",
      "Kleine inhaltliche Pflege (z. B. Textkorrekturen, Austausch einzelner Inhalte)",
      "Fehlerbehebung bei offensichtlichen Problemen der Seite",
    ],
    excludes: ["Kein permanentes Redesign", "Keine Erstellung neuer umfangreicher Inhalte", "Keine Kampagnen-/Optimierungsleistung (nur separat)"],
    notes: ["Umfang (Pflegeanteil) intern klar definieren (Erwartungsmanagement)."],
  },
  editor: {
    title: "Übergabe mit Editor (Kunde kann Inhalte pflegen) – Details",
    description:
      "Wir übergeben die Seite inkl. einfacher editierbarer Bereiche. Struktur bleibt geschützt, damit die Seite stabil und konsistent bleibt.",
    includes: ["Einrichtung editierbarer Felder (Texte/Bilder nach Abstimmung)", "Übergabe/Einweisung in die Pflege (kurz, pragmatisch)", "Optionaler monatlicher Betrieb/Support, falls vereinbart"],
    excludes: ["Keine freie Strukturänderung", "Keine unbegrenzte Support-Leistung ohne monatlichen Betrieb"],
  },
};

const TRANSITION_HOSTING_ACCORDION: ServiceAccordion = {
  title: "Übergabehosting (befristet) – Details",
  description:
    "Zwischenlösung, wenn der Kunde noch kein finales Hosting/Domain-Setup hat. Befristet, damit es nicht zu Betreuung ohne Vertrag wird.",
  includes: ["Betrieb der Seite für die vereinbarte Dauer", "Erreichbarkeit/SSL in dieser Übergangszeit", "Zeit für kundenseitige Domain/Provider-Klärung"],
  excludes: ["Kein Dauerbetrieb ohne laufende Leistung", "Keine inhaltliche Weiterentwicklung im Übergabehosting enthalten"],
  notes: ["Monatlicher Betrag kann 0 € (Kulanz) oder bepreist sein – intern festlegen."],
};

const BRANCH_FORMS: Record<BranchId, { title: string; helper: string; fields: BranchField[] }> = {
  restaurant_cafe: {
    title: "Branchenformular: Restaurants & Cafés",
    helper: "Nur branchenspezifische Inputs. Keine Wiederholung der Grunddaten.",
    fields: [
      { id: "concept", label: "Küche / Konzept", type: "textarea", helper: "Was ist das Konzept? Was macht das Angebot besonders?", placeholder: "z. B. italienisch, modern, Frühstück, vegan, Family-style ..." },
      { id: "opening_hours", label: "Öffnungszeiten + Ruhetage", type: "textarea", helper: "Für Walk-in/Info-Ziele wichtig. Bitte vollständig.", placeholder: "Mo–Fr 12–22, Sa 12–23, So geschlossen ..." },
      { id: "reservation", label: "Reservierung möglich?", type: "yesno", helper: "Wenn ja: Tool/Link im nächsten Feld angeben." },
      { id: "reservation_link", label: "Reservierungslink/Tool", type: "url", helper: "Link zum Reservierungssystem (wenn vorhanden).", placeholder: "https://..." },
      { id: "menu", label: "Karte/Angebot", type: "textarea", helper: "Highlights, Signature Dishes, Specials." },
      { id: "events", label: "Events/Anlässe (optional)", type: "textarea", helper: "z. B. Brunch, Live-Musik, Catering." },
      { id: "location_info", label: "Standortinfos", type: "textarea", helper: "Parken/ÖPNV/Barrierefreiheit." },
    ],
  },
  hair_barber: {
    title: "Branchenformular: Friseure & Barbiere",
    helper: "Nur branchenspezifische Inputs.",
    fields: [
      { id: "services", label: "Leistungen", type: "textarea", helper: "Welche Leistungen sind relevant (Schnitt, Farbe, Bart etc.)?" },
      { id: "audience", label: "Zielgruppe", type: "select", helper: "Wen bedient der Salon primär?", options: ["Damen", "Herren", "Kinder", "Gemischt"] },
      { id: "booking_flow", label: "Terminaufnahme", type: "select", helper: "Wie werden Termine vereinbart?", options: ["Telefon", "Online-Buchung", "Beides", "Walk-in"] },
      { id: "booking_link", label: "Buchungslink (falls vorhanden)", type: "url", helper: "Link zum Buchungssystem.", placeholder: "https://..." },
      { id: "pricing", label: "Preisrahmen", type: "select", helper: "Soll es ab-Preise geben oder nicht?", options: ["Keine Preise", "ab-Preise", "Preisliste (kurz)"] },
      { id: "no_show", label: "No-Show-Regelung", type: "textarea", helper: "Wenn relevant: Absagen/Fristen/Anzahlung (nur als Info)." },
      { id: "opening_hours", label: "Öffnungszeiten", type: "textarea", helper: "Bitte vollständig." },
      { id: "location_info", label: "Standortinfos", type: "textarea", helper: "Parken/ÖPNV/Barrierefreiheit." },
      { id: "team_experience", label: "Team/Erfahrung (kurz)", type: "textarea", helper: "Was ist relevant: Erfahrung, Spezialisierung, Ausbildung." },
    ],
  },
  cosmetic_nails: {
    title: "Branchenformular: Kosmetik- & Nagelstudios",
    helper: "Nur branchenspezifische Inputs.",
    fields: [
      { id: "treatments", label: "Behandlungen", type: "textarea", helper: "Welche Behandlungen bietet ihr an?" },
      { id: "duration", label: "Dauer je Behandlung (Richtwerte)", type: "textarea", helper: "Hilft bei Erwartungsmanagement und Buchungslogik." },
      { id: "pricing", label: "Preisrahmen", type: "select", helper: "Preisangaben ja/nein?", options: ["Keine Preise", "ab-Preise", "Preisliste (kurz)"] },
      { id: "booking_flow", label: "Terminlogik", type: "select", helper: "Wie sollen Termine laufen?", options: ["Telefon", "Online-Buchung", "Beides"] },
      { id: "booking_link", label: "Buchungslink (falls vorhanden)", type: "url", helper: "Link zum Buchungssystem.", placeholder: "https://..." },
      { id: "hygiene", label: "Hygiene/Standards (optional)", type: "textarea", helper: "Wenn wichtig: sachlich formulieren, keine Übertreibung." },
      { id: "qualifications", label: "Qualifikationen", type: "textarea", helper: "z. B. Fortbildungen, Spezialisierungen." },
      { id: "opening_hours", label: "Öffnungszeiten", type: "textarea", helper: "Bitte vollständig." },
    ],
  },
  physio_practice: {
    title: "Branchenformular: Physio- & Heilpraxen",
    helper: "Nur branchenspezifische Inputs (sachlich, ohne Heilsversprechen).",
    fields: [
      { id: "focus", label: "Schwerpunkte", type: "textarea", helper: "Welche Behandlungen/Schwerpunkte sind relevant?" },
      { id: "billing", label: "Abrechnung", type: "select", helper: "Wie ist die Praxis aufgestellt?", options: ["Kasse & Privat", "Nur Privat", "Kasse (auf Anfrage)"] },
      { id: "referral", label: "Rezept erforderlich?", type: "select", helper: "Wenn ja: Hinweistext im nächsten Feld.", options: ["Unklar", "Nein", "Ja"] },
      { id: "referral_notes", label: "Hinweis zum Rezept (optional)", type: "textarea", helper: "Sachlich formulieren. Kein medizinischer Rat." },
      { id: "booking_flow", label: "Terminlogik", type: "select", helper: "Wie soll der nächste Schritt erfolgen?", options: ["Telefon", "E-Mail", "Online-Buchung", "Mix"] },
      { id: "booking_link", label: "Buchungslink (falls vorhanden)", type: "url", helper: "Link zum Buchungssystem.", placeholder: "https://..." },
      { id: "process_short", label: "Ablauf (kurz)", type: "textarea", helper: "In 3–5 Stichpunkten: wie läuft es ab?" },
      { id: "legal_notes", label: "Hinweise/Restriktionen (Wording)", type: "textarea", helper: "z. B. Heilmittelwerbung: Aussagen, die vermieden werden sollen." },
      { id: "opening_hours", label: "Öffnungszeiten", type: "textarea", helper: "Bitte vollständig." },
    ],
  },
  coach_consultant: {
    title: "Branchenformular: Coaches & Berater",
    helper: "Nur branchenspezifische Inputs.",
    fields: [
      { id: "offers", label: "Angebot(e)", type: "textarea", helper: "Welche Leistungen/Pakete gibt es?" },
      { id: "audience", label: "Zielgruppe", type: "textarea", helper: "Wen wollt ihr ansprechen? (konkret)" },
      { id: "first_call", label: "Ablauf Erstgespräch", type: "textarea", helper: "Wie läuft das Erstgespräch ab? (kurz und klar)" },
      { id: "format", label: "Angebotsform", type: "select", helper: "Wie arbeitet ihr?", options: ["1:1", "Gruppe", "Paket", "Mix"] },
      { id: "proof", label: "Proof (Cases/Referenzen)", type: "textarea", helper: "Welche Nachweise sind nutzbar? (ohne Versprechen)" },
      { id: "differentiation", label: "Abgrenzung", type: "textarea", helper: "Warum dieses Angebot? (faktenbasiert)" },
      { id: "pricing", label: "Preisrahmen kommunizieren?", type: "select", helper: "Sollen Preise genannt werden?", options: ["Nein", "ab-Preis", "Pakete", "nur im Gespräch"] },
      { id: "booking_flow", label: "Terminlogik", type: "select", helper: "Wie soll der nächste Schritt erfolgen?", options: ["Buchung", "Formular", "Telefon", "E-Mail"] },
      { id: "booking_link", label: "Buchungslink (falls vorhanden)", type: "url", helper: "Link zum Kalender/Buchung.", placeholder: "https://..." },
    ],
  },
  trainer_studio: {
    title: "Branchenformular: Personal Trainer & Studios",
    helper: "Nur branchenspezifische Inputs.",
    fields: [
      { id: "offers", label: "Angebot(e)", type: "textarea", helper: "Welche Leistungen gibt es (PT, Kurse, Mitgliedschaft)?" },
      { id: "trial", label: "Probetraining möglich?", type: "select", helper: "Wenn ja: Hinweis im nächsten Feld.", options: ["Nein", "Ja"] },
      { id: "trial_notes", label: "Probetraining – Hinweise", type: "textarea", helper: "Regeln, Dauer, Kosten (sachlich)." },
      { id: "schedule", label: "Kursplan/Zeiten (falls relevant)", type: "textarea", helper: "Kurzüberblick oder Link." },
      { id: "pricing", label: "Preisrahmen", type: "select", helper: "Preisangaben ja/nein?", options: ["Keine Preise", "ab-Preise", "Pakete", "nur im Gespräch"] },
      { id: "booking_flow", label: "Termin-/Buchungslogik", type: "select", helper: "Wie soll der nächste Schritt laufen?", options: ["Buchung", "Formular", "Telefon", "Mix"] },
      { id: "booking_link", label: "Buchungslink (falls vorhanden)", type: "url", helper: "Link zum Buchungssystem.", placeholder: "https://..." },
    ],
  },
  crafts: {
    title: "Branchenformular: Handwerksbetriebe",
    helper: "Nur branchenspezifische Inputs.",
    fields: [
      { id: "services", label: "Leistungen", type: "textarea", helper: "Welche Leistungen sollen klar dargestellt werden?" },
      { id: "service_area", label: "Einzugsgebiet", type: "textarea", helper: "Stadtteile/Umkreis/Regionen – wichtig für Erwartungsmanagement." },
      { id: "projects", label: "Typische Projekte", type: "textarea", helper: "Welche Projektarten sind typisch (Beispiele)?" },
      { id: "process", label: "Angebotsprozess", type: "textarea", helper: "Wie läuft es ab? Anfrage → Besichtigung → Angebot → Umsetzung." },
      { id: "emergency", label: "Notdienst?", type: "select", helper: "Wenn ja: Zeiten/Regeln im nächsten Feld.", options: ["Nein", "Ja"] },
      { id: "emergency_notes", label: "Notdienst-Hinweise", type: "textarea", helper: "Zeiten, Einschränkungen, Abgrenzung (sachlich)." },
      { id: "qualifications", label: "Qualifikationen", type: "textarea", helper: "z. B. Meisterbetrieb, Zertifikate, Innungsmitgliedschaft (falls relevant)." },
      { id: "project_photos", label: "Projektbilder vorhanden?", type: "select", helper: "Wenn ja: Art/Quelle im nächsten Feld.", options: ["Nein", "Ja"] },
      { id: "project_photos_notes", label: "Projektbilder – Hinweise/Quelle", type: "textarea", helper: "z. B. Ordner/Link, Auswahlkriterien, Freigaben." },
      { id: "response_time", label: "Reaktionszeit-Hinweis (optional)", type: "textarea", helper: "Sachlich: z. B. „Rückmeldung i. d. R. innerhalb von 24–48h“ (nur wenn zuverlässig)." },
    ],
  },
};

function formatEurStable(n: number, mounted: boolean) {
  if (!mounted) return `${n} €`;
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function clampNumber(n: number, min = 0) {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, n);
}

function sumAddons(selected: Record<string, boolean>) {
  return ADDONS.filter((a) => !!selected[a.id]).reduce((acc, a) => acc + a.price, 0);
}

export default function Page() {
  // --- Zugriffsschutz (leichtgewichtig) ---
  const PASSWORD = "Samoe104";
  const AUTH_KEY = "landex_internal_auth_ok";

  const [isAuthed, setIsAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  // UI mount
  const [mounted, setMounted] = useState(false);

  // 6) Grunddaten
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");

  const [hasWebsite, setHasWebsite] = useState<YesNoUnknown>("Unklar");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [hasDomain, setHasDomain] = useState<YesNoUnknown>("Unklar");
  const [domainName, setDomainName] = useState("");

  // Branchenwahl (über Buttons, nicht in Grunddaten)
  const [industry, setIndustry] = useState<BranchId>("restaurant_cafe");

  // 2) Add-ons
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});

  // 3) Branchenformular
  const [branchAnswers, setBranchAnswers] = useState<Record<string, string>>({});

  // 4) Constraints
  const [constraints, setConstraints] = useState("");

  // 5) Übergabe
  const [deliveryModel, setDeliveryModel] = useState<DeliveryModel>("handover");
  const [transitionHostingEnabled, setTransitionHostingEnabled] = useState(false);
  const [transitionHostingMonths, setTransitionHostingMonths] = useState<number>(2);
  const [transitionHostingMonthly, setTransitionHostingMonthly] = useState<number>(0);

  const [managedMonthly, setManagedMonthly] = useState<number>(35);

  const [editorSetupOneTime, setEditorSetupOneTime] = useState<number>(250);
  const [editorMonthly, setEditorMonthly] = useState<number>(0);

  // 7) Notizen
  const [nextStepsNote, setNextStepsNote] = useState("");

  // Versand-Status
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const ok = sessionStorage.getItem(AUTH_KEY) === "1";
      setIsAuthed(ok);
    } catch {
      setIsAuthed(false);
    }
  }, []);

  function submitPassword() {
    if (pw === PASSWORD) {
      setPwError(null);
      setIsAuthed(true);
      try {
        sessionStorage.setItem(AUTH_KEY, "1");
      } catch {
        // ignore
      }
      return;
    }
    setPwError("Passwort ist nicht korrekt.");
  }

  function logout() {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
    setIsAuthed(false);
    setPw("");
    setPwError(null);
  }

  const eur = (n: number) => formatEurStable(n, mounted);

  const branchMeta = useMemo(() => BRANCHES.find((b) => b.id === industry), [industry]);

  const addonsByGroup = useMemo(() => {
    const map = new Map<AddonGroup, Addon[]>();
    for (const a of ADDONS) {
      if (!map.has(a.group)) map.set(a.group, []);
      map.get(a.group)!.push(a);
    }
    return Array.from(map.entries());
  }, []);

  const addonsTotal = useMemo(() => sumAddons(selectedAddons), [selectedAddons]);

  const selectedAddonList = useMemo(() => {
    return ADDONS.filter((a) => !!selectedAddons[a.id]);
  }, [selectedAddons]);

  const deliveryLabel = useMemo(() => {
    if (deliveryModel === "handover") return "Übergabe (ohne laufende Betreuung)";
    if (deliveryModel === "managed") return "Laufende Leistung (Hosting & Pflege)";
    return "Übergabe mit Editor (Kunde kann Inhalte pflegen)";
  }, [deliveryModel]);

  const oneTimeDeliveryAdd = useMemo(() => {
    if (deliveryModel === "editor") return clampNumber(editorSetupOneTime, 0);
    return 0;
  }, [deliveryModel, editorSetupOneTime]);

  const oneTimeTotal = useMemo(() => {
    return BASE_PRICE + addonsTotal + oneTimeDeliveryAdd;
  }, [addonsTotal, oneTimeDeliveryAdd]);

  const monthlyTotal = useMemo(() => {
    let m = 0;
    if (deliveryModel === "managed") m += clampNumber(managedMonthly, 0);
    if (deliveryModel === "editor") m += clampNumber(editorMonthly, 0);
    if ((deliveryModel === "handover" || deliveryModel === "editor") && transitionHostingEnabled) {
      m += clampNumber(transitionHostingMonthly, 0);
    }
    return m;
  }, [deliveryModel, managedMonthly, editorMonthly, transitionHostingEnabled, transitionHostingMonthly]);

  const offerSummaryText = useMemo(() => {
    const lines: string[] = [];

    lines.push("Basisprodukt (Fix)");
    lines.push("------------------");
    lines.push(`Fixpreis: ${eur(BASE_PRICE)}`);
    lines.push("Enthält: Local SEO Basis");
    lines.push("");

    lines.push("Zusatzleistungen (einmalig)");
    lines.push("---------------------------");
    if (!selectedAddonList.length) {
      lines.push("Keine Zusatzleistungen ausgewählt.");
    } else {
      for (const a of selectedAddonList) lines.push(`- ${a.label}: ${eur(a.price)}`);
    }
    lines.push("");

    lines.push("Branche");
    lines.push("-------");
    lines.push(branchMeta?.label ?? industry);
    lines.push("");

    lines.push(`Branchenspezifische Angaben (${branchMeta?.label ?? industry})`);
    lines.push("-------------------------------------------");
    const bf = BRANCH_FORMS[industry];
    for (const f of bf.fields) {
      const v = (branchAnswers[f.id] ?? "").trim();
      if (v) lines.push(`${f.label}: ${v}`);
    }
    const anyBranch = bf.fields.some((f) => (branchAnswers[f.id] ?? "").trim().length > 0);
    if (!anyBranch) lines.push("–");
    lines.push("");

    lines.push("Rahmenbedingungen / Constraints");
    lines.push("------------------------------");
    lines.push(constraints ? constraints : "–");
    lines.push("");

    lines.push("Übergabe & Betrieb");
    lines.push("------------------");
    lines.push(`Betriebsmodell: ${deliveryLabel}`);
    if (deliveryModel === "managed")
      lines.push(`Monatlich (laufende Leistung): ${eur(clampNumber(managedMonthly, 0))} / Monat`);
    if (deliveryModel === "editor") {
      lines.push(`Einmalig (Editor-Setup): ${eur(clampNumber(editorSetupOneTime, 0))}`);
      const m = clampNumber(editorMonthly, 0);
      if (m > 0) lines.push(`Monatlich (Editor Betrieb): ${eur(m)} / Monat`);
    }
    if ((deliveryModel === "handover" || deliveryModel === "editor") && transitionHostingEnabled) {
      lines.push(
        `Übergabehosting: ${transitionHostingMonths} Monat(e) · ${eur(
          clampNumber(transitionHostingMonthly, 0)
        )} / Monat`
      );
    }
    lines.push("");

    lines.push("Grunddaten");
    lines.push("----------");
    if (company) lines.push(`Unternehmen: ${company}`);
    if (contactName) lines.push(`Kontakt: ${contactName}`);
    if (email) lines.push(`E-Mail: ${email}`);
    if (phone) lines.push(`Telefon: ${phone}`);
    if (region) lines.push(`Region: ${region}`);
    lines.push(`Website vorhanden: ${hasWebsite}`);
    if (websiteUrl) lines.push(`Website-URL: ${websiteUrl}`);
    lines.push(`Domain vorhanden: ${hasDomain}`);
    if (domainName) lines.push(`Domain: ${domainName}`);
    lines.push("");

    lines.push("Notizen");
    lines.push("-------");
    lines.push(nextStepsNote ? nextStepsNote : "–");

    lines.push("");
    lines.push(`Gesamt (einmalig): ${eur(oneTimeTotal)}`);
    lines.push(`Gesamt (monatlich): ${monthlyTotal > 0 ? `${eur(monthlyTotal)} / Monat` : "–"}`);

    return lines.join("\n");
  }, [
    mounted,
    industry,
    branchMeta,
    branchAnswers,
    constraints,
    selectedAddonList,
    deliveryModel,
    deliveryLabel,
    managedMonthly,
    editorSetupOneTime,
    editorMonthly,
    transitionHostingEnabled,
    transitionHostingMonths,
    transitionHostingMonthly,
    company,
    contactName,
    email,
    phone,
    region,
    hasWebsite,
    websiteUrl,
    hasDomain,
    domainName,
    nextStepsNote,
    oneTimeTotal,
    monthlyTotal,
  ]);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(offerSummaryText);
      alert("Zusammenfassung wurde in die Zwischenablage kopiert.");
    } catch {
      alert("Kopieren nicht möglich (Browser-Einschränkung).");
    }
  }

  async function sendInternalEmail() {
    if (sendingEmail) return;
    setSendingEmail(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName || "Sales Export",
          email: email || "service@landex.digital",
          company: company || "Sales Seite",
          goal: offerSummaryText,
        }),
      });

      if (res.ok) {
        alert("Formular wurde intern per E-Mail versendet.");
        return;
      }

      const maybeJson = await res.json().catch(() => null);
      const msg = (maybeJson && (maybeJson.error || maybeJson.message)) || "E-Mail-Versand fehlgeschlagen.";
      alert(String(msg));
    } catch {
      alert("E-Mail-Versand ist derzeit nicht erreichbar.");
    } finally {
      setSendingEmail(false);
    }
  }

  function resetAll() {
    setCompany("");
    setContactName("");
    setEmail("");
    setPhone("");
    setRegion("");
    setHasWebsite("Unklar");
    setWebsiteUrl("");
    setHasDomain("Unklar");
    setDomainName("");

    setIndustry("restaurant_cafe");

    setSelectedAddons({});
    setBranchAnswers({});
    setConstraints("");

    setDeliveryModel("handover");
    setTransitionHostingEnabled(false);
    setTransitionHostingMonths(2);
    setTransitionHostingMonthly(0);

    setManagedMonthly(35);
    setEditorSetupOneTime(250);
    setEditorMonthly(0);

    setNextStepsNote("");
  }

  const branchForm = BRANCH_FORMS[industry];

  function setBranchAnswer(id: string, v: string) {
    setBranchAnswers((p) => ({ ...p, [id]: v }));
  }

  return (
    <>
      {/* Noindex/Nofollow (zusätzlich empfohlen: über route layout metadata setzen) */}
      <Head>
        <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" />
      </Head>

      {/* Passwort-Sperre */}
      {!isAuthed ? (
        <main className="min-h-screen px-4 py-10">
          <div className="mx-auto max-w-xl">
            <div className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Geschützter Bereich</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight">Zugriff erforderlich</h1>
              <p className="mt-2 text-sm text-slate-700">
                Bitte Passwort eingeben, um diese Seite zu öffnen.
              </p>

              <div className="mt-5 space-y-2">
                <label className="block text-xs font-medium text-slate-700">Passwort</label>
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitPassword();
                  }}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500"
                  placeholder="••••••••"
                  autoFocus
                />
                {pwError ? <p className="text-sm font-semibold text-red-600">{pwError}</p> : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={submitPassword}
                  className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-600/35 transition hover:-translate-y-0.5 hover:bg-sky-500"
                >
                  Öffnen
                </button>
              </div>

              <p className="mt-6 text-xs text-slate-600">
                Hinweis: Dieser Schutz ist für eine interne Einschränkung gedacht. Für echte Zugriffskontrolle empfehlen wir Basic Auth via Middleware.
              </p>
            </div>
          </div>
        </main>
      ) : (
        <main className="px-4 py-10">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="flex flex-col gap-3 rounded-3xl border border-slate-300 bg-white/80 p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Intern – Vertrieb</p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Angebotsformular – Landing Page</h1>
                  <p className="mt-2 max-w-3xl text-sm text-slate-700">
                    Strukturierte Angebotsaufnahme. Keine Erfolgs- oder Ergebniszusagen.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400"
                    title="Sperre aktivieren (Session zurücksetzen)"
                  >
                    Sperren
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500"
                  >
                    Drucken
                  </button>
                  <button
                    type="button"
                    onClick={copySummary}
                    className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-600/35 transition hover:-translate-y-0.5 hover:bg-sky-500"
                  >
                    Text-Zusammenfassung kopieren
                  </button>
                  <button
                    type="button"
                    onClick={sendInternalEmail}
                    disabled={sendingEmail}
                    className={`rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 ${
                      sendingEmail
                        ? "cursor-not-allowed bg-slate-300 text-slate-700 shadow-none"
                        : "bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-emerald-500"
                    }`}
                  >
                    {sendingEmail ? "Sende …" : "Intern per E-Mail senden"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
              {/* Linke Spalte */}
              <div className="space-y-6">
                {/* Branchenwahl Buttons (steuert Branchenformular) */}
                <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">Branche wählen</h2>
                  <p className="mt-2 text-sm text-slate-700">
                    Auswahl über die Buttons. Das Branchenformular (3) lädt automatisch passend zur Branche.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setIndustry(b.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          industry === b.id
                            ? "border-sky-400 bg-white shadow-sm"
                            : "border-slate-200 bg-white/70 hover:border-slate-300"
                        }`}
                        aria-pressed={industry === b.id}
                      >
                        <p className="text-sm font-semibold text-slate-900">{b.label}</p>
                        <p className="mt-1 text-xs text-slate-600">{b.helper}</p>
                      </button>
                    ))}
                  </div>
                </section>

                {/* 1) Basisprodukt */}
                <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">1) Basisprodukt (Fix)</h2>
                      <p className="mt-2 text-sm text-slate-700">Fixer Leistungsumfang als klare Grundlage.</p>
                    </div>
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 sm:mt-0">
                      {eur(BASE_PRICE)}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {BASE_SERVICE_ACCORDION.map((a) => (
                      <ServiceGuideAccordion key={a.title} data={a} />
                    ))}
                  </div>
                </section>

                {/* 2) Zusatzleistungen */}
                <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">2) Zusatzleistungen</h2>
                      <p className="mt-2 text-sm text-slate-700">Optional zubuchbar. Keine Doppelabfragen.</p>
                    </div>
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 sm:mt-0">
                      {addonsTotal > 0 ? eur(addonsTotal) : "–"}
                    </div>
                  </div>

                  <div className="mt-5 space-y-6">
                    {addonsByGroup.map(([group, items]) => (
                      <div key={group}>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{group}</p>
                        <div className="mt-3 grid gap-3">
                          {items.map((a) => {
                            const checked = !!selectedAddons[a.id];
                            const details: ServiceAccordion = {
                              title: `${a.label} – Details`,
                              description: a.description,
                              includes: a.includes,
                              excludes: a.excludes,
                              notes: a.notes,
                              examples: a.examples,
                            };

                            return (
                              <div key={a.id} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                  <label className="flex items-start gap-3 text-sm font-semibold text-slate-900">
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() => setSelectedAddons((p) => ({ ...p, [a.id]: !p[a.id] }))}
                                      className="mt-1 h-4 w-4 accent-sky-600"
                                    />
                                    <span>{a.label}</span>
                                  </label>

                                  <div className="text-sm font-semibold text-slate-900">{eur(a.price)}</div>
                                </div>

                                <div className="mt-3">
                                  <ServiceGuideAccordion data={details} compact />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3) Branchenformular */}
                <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">3) Branchenformular</h2>
                  <p className="mt-2 text-sm text-slate-700">{branchForm.helper}</p>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">{branchForm.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{branchMeta?.label ?? industry}</p>
                  </div>

                  <div className="mt-4 grid gap-4">
                    {branchForm.fields.map((f) => {
                      const v = branchAnswers[f.id] ?? "";
                      if (f.type === "textarea") {
                        return (
                          <Textarea
                            key={f.id}
                            label={f.label}
                            helper={f.helper}
                            value={v}
                            onChange={(nv) => setBranchAnswer(f.id, nv)}
                            placeholder={f.placeholder}
                          />
                        );
                      }
                      if (f.type === "select") {
                        return (
                          <Select
                            key={f.id}
                            label={f.label}
                            helper={f.helper}
                            value={v || (f.options?.[0] ?? "")}
                            onChange={(nv) => setBranchAnswer(f.id, nv)}
                            options={f.options ?? []}
                          />
                        );
                      }
                      if (f.type === "yesno") {
                        return (
                          <Select
                            key={f.id}
                            label={f.label}
                            helper={f.helper}
                            value={v || "Nein"}
                            onChange={(nv) => setBranchAnswer(f.id, nv)}
                            options={["Nein", "Ja"]}
                          />
                        );
                      }
                      return (
                        <Field
                          key={f.id}
                          label={f.label}
                          helper={f.helper}
                          value={v}
                          onChange={(nv) => setBranchAnswer(f.id, nv)}
                          placeholder={f.placeholder}
                          type={f.type === "url" ? "url" : "text"}
                        />
                      );
                    })}
                  </div>
                </section>

                {/* 4) Constraints */}
                <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">4) Constraints</h2>
                  <p className="mt-2 text-sm text-slate-700">
                    Rahmenbedingungen, die beachtet werden müssen (Wording, Zeit, Rechtliches, interne Vorgaben).
                  </p>

                  <div className="mt-4">
                    <Textarea
                      label="Constraints / Hinweise"
                      value={constraints}
                      onChange={setConstraints}
                      placeholder="z. B. Aussagen vermeiden, bestimmte Begriffe, Freigabeprozess, Deadline ..."
                    />
                  </div>
                </section>

                {/* 5) Übergabe */}
                <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">5) Übergabe</h2>
                  <p className="mt-2 text-sm text-slate-700">
                    Betriebsmodell wählen. Monatliche Beträge nur, wenn laufende Leistung vereinbart wird.
                  </p>

                  <div className="mt-4 grid gap-3">
                    <RadioCard
                      checked={deliveryModel === "handover"}
                      title="Übergabe (ohne laufende Betreuung)"
                      helper="Kunde hostet/betreibt selbst. Keine laufende Pflege enthalten."
                      onSelect={() => setDeliveryModel("handover")}
                    >
                      <div className="mt-3">
                        <ServiceGuideAccordion data={DELIVERY_ACCORDIONS.handover} compact />
                      </div>
                    </RadioCard>

                    <RadioCard
                      checked={deliveryModel === "managed"}
                      title="Laufende Leistung (Hosting & Pflege)"
                      helper="Monatlicher Betrag – planbarer Betrieb und kleine Pflege."
                      onSelect={() => setDeliveryModel("managed")}
                    >
                      <div className="mt-3">
                        <ServiceGuideAccordion data={DELIVERY_ACCORDIONS.managed} compact />
                      </div>

                      {deliveryModel === "managed" ? (
                        <div className="mt-4">
                          <NumberField
                            label="Monatlicher Betrag"
                            helper="Standard: 35 € / Monat (anpassbar, falls intern anders vereinbart)."
                            value={managedMonthly}
                            onChange={setManagedMonthly}
                            min={0}
                            suffix="€ / Monat"
                          />
                        </div>
                      ) : null}
                    </RadioCard>

                    <RadioCard
                      checked={deliveryModel === "editor"}
                      title="Übergabe mit Editor (Kunde kann Inhalte pflegen)"
                      helper="Einmaliger Setup-Aufwand. Optional monatlicher Betrieb."
                      onSelect={() => setDeliveryModel("editor")}
                    >
                      <div className="mt-3">
                        <ServiceGuideAccordion data={DELIVERY_ACCORDIONS.editor} compact />
                      </div>

                      {deliveryModel === "editor" ? (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <NumberField
                            label="Editor-Setup (einmalig)"
                            helper="Einmaliger Setup-Aufwand."
                            value={editorSetupOneTime}
                            onChange={setEditorSetupOneTime}
                            min={0}
                            suffix="€"
                          />
                          <NumberField
                            label="Monatlicher Betrieb (optional)"
                            helper="Nur wenn laufender Betrieb/Support vereinbart."
                            value={editorMonthly}
                            onChange={setEditorMonthly}
                            min={0}
                            suffix="€ / Monat"
                          />
                        </div>
                      ) : null}
                    </RadioCard>
                  </div>

                  {(deliveryModel === "handover" || deliveryModel === "editor") && (
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Übergabehosting (optional)</p>
                          <p className="mt-1 text-xs text-slate-600">
                            Befristete Zwischenlösung, wenn Hosting/Domain noch nicht final sind.
                          </p>
                        </div>

                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                          <input
                            type="checkbox"
                            checked={transitionHostingEnabled}
                            onChange={() => setTransitionHostingEnabled((p) => !p)}
                            className="h-4 w-4 accent-sky-600"
                          />
                          aktiv
                        </label>
                      </div>

                      <div className="mt-3">
                        <ServiceGuideAccordion data={TRANSITION_HOSTING_ACCORDION} compact />
                      </div>

                      {transitionHostingEnabled ? (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <NumberField
                            label="Dauer"
                            helper="Empfehlung: 1–2 Monate."
                            value={transitionHostingMonths}
                            onChange={setTransitionHostingMonths}
                            min={1}
                            suffix="Monat(e)"
                          />
                          <NumberField
                            label="Monatlicher Betrag (Übergabehosting)"
                            helper="Optional bepreisen oder als Kulanz auf 0 € setzen."
                            value={transitionHostingMonthly}
                            onChange={setTransitionHostingMonthly}
                            min={0}
                            suffix="€ / Monat"
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                </section>

                {/* 6) Grunddaten */}
                <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">6) Grunddaten</h2>
                  <p className="mt-2 text-sm text-slate-700">
                    Basisdaten. Die Branche wird ausschließlich über die Buttons gewählt.
                  </p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Unternehmen" value={company} onChange={setCompany} placeholder="z. B. Muster GmbH" />
                    <Field label="Ansprechpartner" value={contactName} onChange={setContactName} placeholder="z. B. Max Mustermann" />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="E-Mail" value={email} onChange={setEmail} placeholder="name@firma.de" type="email" />
                    <Field label="Telefon" value={phone} onChange={setPhone} placeholder="+49 ..." />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Region / Stadt" value={region} onChange={setRegion} placeholder="z. B. Berlin, Umgebung" />
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Branche</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{branchMeta?.label ?? industry}</p>
                      <p className="mt-1 text-xs text-slate-600">{branchMeta?.helper ?? ""}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Select
                      label="Website vorhanden?"
                      value={hasWebsite}
                      onChange={(v) => setHasWebsite(v as YesNoUnknown)}
                      options={["Unklar", "Nein", "Ja"]}
                    />
                    <Select
                      label="Domain vorhanden?"
                      value={hasDomain}
                      onChange={(v) => setHasDomain(v as YesNoUnknown)}
                      options={["Unklar", "Nein", "Ja"]}
                    />
                  </div>

                  {(hasWebsite === "Ja" || hasDomain === "Ja") && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {hasWebsite === "Ja" ? (
                        <Field label="Website-URL" value={websiteUrl} onChange={setWebsiteUrl} placeholder="https://..." type="url" />
                      ) : null}
                      {hasDomain === "Ja" ? (
                        <Field label="Domain" value={domainName} onChange={setDomainName} placeholder="z. B. firma.de" />
                      ) : null}
                    </div>
                  )}
                </section>

                {/* 7) Notizen */}
                <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">7) Notizen</h2>
                  <p className="mt-2 text-sm text-slate-700">Nur als Notizfeld.</p>

                  <div className="mt-4">
                    <Textarea
                      label="Notiz"
                      value={nextStepsNote}
                      onChange={setNextStepsNote}
                      placeholder="z. B. offene Punkte, interne Abhängigkeiten, gewünschter Zeitplan ..."
                    />
                  </div>
                </section>
              </div>

              {/* Rechte Spalte: Zusammenfassung */}
              <aside className="space-y-6">
                <section className="sticky top-6 rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">Zusammenfassung</h2>

                  <div className="mt-4 space-y-2 text-sm">
                    <Row label="Basis (Fixpreis)" value={eur(BASE_PRICE)} />
                    <Row label="Zusatzleistungen (einmalig)" value={addonsTotal > 0 ? eur(addonsTotal) : "–"} />
                    {oneTimeDeliveryAdd > 0 ? <Row label="Editor-Setup (einmalig)" value={eur(oneTimeDeliveryAdd)} /> : null}
                    <div className="my-3 border-t border-slate-200" />
                    <Row label="Gesamt (einmalig)" value={eur(oneTimeTotal)} strong />
                    <Row label="Gesamt (monatlich)" value={monthlyTotal > 0 ? `${eur(monthlyTotal)} / Monat` : "–"} />
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Branche</p>
                    <p className="mt-2 text-sm text-slate-800">{branchMeta?.label ?? industry}</p>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Betriebsmodell</p>
                    <p className="mt-2 text-sm text-slate-800">{deliveryLabel}</p>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Gewählte Add-ons</p>
                    {selectedAddonList.length === 0 ? (
                      <p className="mt-2 text-sm text-slate-700">Keine Zusatzleistungen ausgewählt.</p>
                    ) : (
                      <ul className="mt-2 space-y-2 text-sm text-slate-800">
                        {selectedAddonList.map((a) => (
                          <li key={a.id} className="flex items-start justify-between gap-3">
                            <span>{a.label}</span>
                            <span className="shrink-0 font-semibold text-slate-900">{eur(a.price)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Im Basisprodukt enthalten</p>
                    <p className="mt-2 text-sm text-slate-800">Local SEO Basis</p>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Export</p>
                    <div className="mt-2 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={copySummary}
                        className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-600/35 transition hover:-translate-y-0.5 hover:bg-sky-500"
                      >
                        Text-Zusammenfassung kopieren
                      </button>

                      <button
                        type="button"
                        onClick={sendInternalEmail}
                        disabled={sendingEmail}
                        className={`rounded-2xl px-4 py-2 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 ${
                          sendingEmail
                            ? "cursor-not-allowed bg-slate-300 text-slate-700 shadow-none"
                            : "bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-emerald-500"
                        }`}
                      >
                        {sendingEmail ? "Sende …" : "Intern per E-Mail senden"}
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500"
                      >
                        Druckansicht
                      </button>

                      <button
                        type="button"
                        onClick={resetAll}
                        className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400"
                      >
                        Alles zurücksetzen
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs text-slate-600">Hinweis: Diese Seite enthält keine Erfolgs- oder Ergebniszusagen.</p>
                  </div>
                </section>
              </aside>
            </div>

            {/* Print CSS */}
            <style jsx global>{`
              @media print {
                button {
                  display: none !important;
                }
                summary {
                  list-style: none !important;
                }
                .sticky {
                  position: static !important;
                }
                body {
                  background: #fff !important;
                }
              }
            `}</style>
          </div>
        </main>
      )}
    </>
  );
}

/* ---------- UI Helpers ---------- */

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`text-slate-700 ${strong ? "font-semibold" : ""}`}>{label}</span>
      <span className={`text-slate-900 ${strong ? "text-base font-semibold" : "font-semibold"}`}>{value}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  helper,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  helper?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-700">{label}</label>
      {helper ? <p className="text-xs text-slate-600">{helper}</p> : null}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  helper,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-700">{label}</label>
      {helper ? <p className="text-xs text-slate-600">{helper}</p> : null}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[120px] w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  helper,
  optionLabels,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  helper?: string;
  optionLabels?: Record<string, string>;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-700">{label}</label>
      {helper ? <p className="text-xs text-slate-600">{helper}</p> : null}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {optionLabels?.[o] ?? o}
          </option>
        ))}
      </select>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  helper,
  min = 0,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  helper?: string;
  min?: number;
  suffix?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-700">{label}</label>
      {helper ? <p className="text-xs text-slate-600">{helper}</p> : null}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500"
        />
        {suffix ? <span className="shrink-0 text-xs font-semibold text-slate-600">{suffix}</span> : null}
      </div>
    </div>
  );
}

function RadioCard({
  checked,
  title,
  helper,
  onSelect,
  children,
}: {
  checked: boolean;
  title: string;
  helper: string;
  onSelect: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        checked ? "border-sky-400 bg-white shadow-sm" : "border-slate-200 bg-white/70 hover:border-slate-300"
      }`}
      aria-pressed={checked}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border ${
            checked ? "border-sky-500 bg-sky-600" : "border-slate-300 bg-white"
          }`}
        >
          {checked ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
        </span>

        <div className="w-full">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-xs text-slate-600">{helper}</p>
          {children ? <div className="mt-2">{children}</div> : null}
        </div>
      </div>
    </button>
  );
}

/**
 * Details-Element als Verkäufer-Leitfaden.
 * Keine Doppelungen: Im UI steht nur die Leistung (Name/Preis). Details stehen hier.
 */
function ServiceGuideAccordion({ data, compact }: { data: ServiceAccordion; compact?: boolean }) {
  return (
    <details className={`group rounded-2xl border border-slate-200 bg-white/80 ${compact ? "px-3 py-2" : "px-4 py-3"}`}>
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">{data.title}</p>
            <p className="mt-1 text-xs text-slate-600">{compact ? "Details anzeigen" : "Leitfaden anzeigen"}</p>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition group-open:border-sky-300">
            Details
          </span>
        </div>
      </summary>

      <div className="mt-3 border-t border-slate-200 pt-3 text-sm">
        <p className="text-slate-800">{data.description}</p>

        {data.includes?.length ? (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Enthalten</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-800">
              {data.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {data.excludes?.length ? (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Nicht enthalten</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {data.excludes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {data.examples?.length ? (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Beispiele</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {data.examples.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {data.notes?.length ? (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Hinweise</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {data.notes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </details>
  );
}
