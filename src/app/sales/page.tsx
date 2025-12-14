"use client";

import { useEffect, useMemo, useState } from "react";

type YesNoUnknown = "Ja" | "Nein" | "Unklar";
type YesNo = "Ja" | "Nein";

type NextStep = "Angebot senden" | "Intern klären" | "Rückmelde-Termin";

type DeliveryModel = "handover" | "managed" | "editor";

type Addon = {
  id: string;
  label: string;
  price: number;
  group: "Inhalte & Darstellung" | "Funktion & Technik" | "Erweiterungen";
  description: string;
  includes: string[];
  notes?: string[];
};

const BASE_PRICE = 500;

const CONTACT_CHANNELS = [
  {
    id: "form",
    label: "Kontaktformular",
    helper:
      "Formular auf der Seite (z. B. Name, E-Mail, Nachricht). Eignet sich für strukturierte Anfragen.",
  },
  {
    id: "phone",
    label: "Telefon",
    helper:
      "Call-to-Action führt zum Anruf (Click-to-Call mobil). Eignet sich für schnelle Erstkontakte.",
  },
  {
    id: "email",
    label: "E-Mail",
    helper:
      "Direkter Mail-Link. Eignet sich, wenn Kunden schriftlich anfragen sollen.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    helper:
      "WhatsApp-CTA für schnelle, informelle Kontakte (nur wenn kundenseitig gewünscht).",
  },
  {
    id: "booking",
    label: "Termin/Buchung (extern)",
    helper:
      "Weiterleitung auf ein Buchungssystem. Eignet sich für verbindliche Terminlogik.",
  },
] as const;

type ContactChannelId = (typeof CONTACT_CHANNELS)[number]["id"];

const PAGE_PURPOSES = [
  {
    id: "anfragen",
    label: "Mehr passende Anfragen",
    helper:
      "Besucher sollen nachvollziehen, wofür das Angebot geeignet ist – und gezielt anfragen.",
  },
  {
    id: "termine",
    label: "Mehr Terminvereinbarungen",
    helper:
      "Die Seite führt in einen klaren Ablauf: Terminoptionen, Voraussetzungen, nächster Schritt.",
  },
  {
    id: "reservierungen",
    label: "Mehr Reservierungen",
    helper:
      "Für Gastronomie/Events: Öffnungszeiten, Reservierungslogik, klare CTA-Führung.",
  },
  {
    id: "infos",
    label: "Weniger Rückfragen",
    helper:
      "Die Seite beantwortet häufige Fragen, reduziert Unklarheiten und sorgt für Vorqualifizierung.",
  },
  {
    id: "angebot",
    label: "Aktion / Angebot klar bewerben",
    helper:
      "Konkretes Angebot mit eindeutiger Darstellung: Umfang, Preisindikationen, Bedingungen, Laufzeit.",
  },
] as const;

type PagePurposeId = (typeof PAGE_PURPOSES)[number]["id"];

const TRUST_ELEMENTS = [
  {
    id: "testimonials",
    label: "Kundenstimmen / Referenzen",
    helper:
      "Kurz & glaubwürdig: 2–3 Aussagen mit Kontext (Name/Branche) oder anonymisiert, wenn nötig.",
  },
  {
    id: "before_after",
    label: "Vorher/Nachher / Ergebnisse (ohne Versprechen)",
    helper:
      "Darstellung von Ausgangslage/Verbesserung als Beispiel – ohne Garantien.",
  },
  {
    id: "faq",
    label: "FAQ / Einwände beantworten",
    helper:
      "Kurze, präzise Antworten auf die häufigsten Rückfragen (z. B. Ablauf, Preise, Voraussetzungen).",
  },
  {
    id: "certs",
    label: "Zertifikate / Qualifikationen / Siegel",
    helper:
      "Nur echte, prüfbare Nachweise. Keine generischen Placeholder-Siegel.",
  },
  {
    id: "process",
    label: "Ablauf/Prozess erklären",
    helper:
      "Schritt-für-Schritt: Wie läuft es ab, was braucht es vom Kunden, wann passiert was.",
  },
] as const;

type TrustElementId = (typeof TRUST_ELEMENTS)[number]["id"];

const REQUIRED_ASSETS = [
  {
    id: "logo",
    label: "Logo",
    helper: "Wenn nicht vorhanden: Text-Logo als Übergang möglich.",
  },
  {
    id: "photos",
    label: "Bilder (eigene Fotos)",
    helper:
      "Ideal: reale Bilder vom Team/Location/Leistung. Alternativ Stock (als Add-on).",
  },
  {
    id: "offer_details",
    label: "Leistungsdetails / Angebotstexte",
    helper:
      "Was genau wird angeboten? Für wen? Voraussetzungen? Umfang? Besonderheiten?",
  },
  {
    id: "contact",
    label: "Kontaktinfos",
    helper: "Telefon/E-Mail/Adresse/Öffnungszeiten, je nach Branche.",
  },
] as const;

type RequiredAssetId = (typeof REQUIRED_ASSETS)[number]["id"];

const ADDONS: Addon[] = [
  // Inhalte & Darstellung
  {
    id: "rev_round",
    label: "Zusätzliche Korrekturschleife",
    price: 100,
    group: "Inhalte & Darstellung",
    description:
      "Zusätzliche Anpassungsrunde nach der im Basispreis enthaltenen Korrekturschleife. Sinnvoll, wenn mehrere interne Stakeholder abstimmen oder Inhalte noch nicht final vorliegen.",
    includes: [
      "Zusätzliche Review-Runde (Text/Struktur/kleine Layout-Anpassungen)",
      "Gezielte Feinjustierung nach Kundenfeedback",
    ],
    notes: [
      "Keine inhaltliche Neuausrichtung des Projekts; dafür wäre ein Re-Briefing nötig.",
    ],
  },
  {
    id: "images",
    label: "Bildauswahl & Bildoptimierung",
    price: 120,
    group: "Inhalte & Darstellung",
    description:
      "Auswahl geeigneter Bilder (Stock oder Kundenvorlagen) und technische Aufbereitung für Web: Zuschnitt, Komprimierung, konsistente Bildwirkung.",
    includes: [
      "Bildrecherche/Selektion (passend zur Branche und Tonalität)",
      "Optimierung (Größe/Format/Komprimierung)",
      "Einbindung an passenden Stellen (Hero, Sektionen)",
    ],
    notes: ["Lizenzkosten für Stockbilder sind ggf. separat, je nach Quelle."],
  },
  {
    id: "trust",
    label: "Einbindung von Trust-Elementen (Referenzen, Siegel)",
    price: 150,
    group: "Inhalte & Darstellung",
    description:
      "Gezielte Vertrauenselemente zur Vorqualifizierung: Kundenstimmen, Qualifikationen, Prozessdarstellung, FAQ. Ziel ist Klarheit und Seriosität – ohne Ergebnisversprechen.",
    includes: [
      "Struktur & Platzierung der Trust-Elemente",
      "Aufbereitung vorhandener Inhalte (Kurzform, klare Darstellung)",
      "FAQ-Sektion (typische Rückfragen, kurz beantwortet)",
    ],
  },

  // Funktion & Technik
  {
    id: "booking",
    label: "Termin- / Buchungssystem (Einbindung)",
    price: 250,
    group: "Funktion & Technik",
    description:
      "Einbindung eines externen Termin- oder Buchungssystems in die Landing Page. Inklusive sinnvoller Platzierung, CTA-Führung und grundlegender Prüfung der Nutzerführung.",
    includes: [
      "Integration (Link/Embed – je nach System)",
      "CTA-Verknüpfung (Buttons, Sektionen, ggf. Sticky CTA)",
      "Basisprüfung der Customer Journey (mobil/desktop)",
    ],
    notes: ["Account/Tool-Lizenz beim Anbieter ist nicht enthalten."],
  },
  {
    id: "tracking",
    label: "Basis-Tracking (Seitenaufrufe, Klicks, Formulare)",
    price: 120,
    group: "Funktion & Technik",
    description:
      "Messbarkeit der wichtigsten Interaktionen auf der Seite, ohne Zielwerte oder Erfolgszusagen. Dient der Transparenz und internen Auswertung.",
    includes: [
      "Einbindung Analytics (z. B. GA4 oder Alternative nach Vorgabe)",
      "Erfassung grundlegender Events (CTA-Klicks, Formular-Sendungen)",
      "Kurzcheck: Tracking feuert korrekt",
    ],
    notes: [
      "Cookie-/Consent-Lösung ist nicht automatisch enthalten (abhängig vom Setup).",
    ],
  },
  {
    id: "domain_hosting",
    label: "Domain- & Hosting-Setup",
    price: 150,
    group: "Funktion & Technik",
    description:
      "Technische Unterstützung bei Domain/Hosting: DNS, Weiterleitungen, SSL/HTTPS, Go-Live-Checks. Sinnvoll, wenn der Kunde das Setup nicht selbst betreut.",
    includes: [
      "DNS/Weiterleitung (www/non-www, ggf. Alt-Domain → neu)",
      "SSL/HTTPS-Check",
      "Go-Live Basisprüfung (Erreichbarkeit, offensichtliche Fehler)",
    ],
    notes: ["Provider-Zugänge müssen kundenseitig bereitgestellt werden."],
  },

  // Erweiterungen
  {
    id: "local_seo",
    label: "Lokale SEO-Grundoptimierung",
    price: 250,
    group: "Erweiterungen",
    description:
      "Grundlegende lokale Auffindbarkeit: saubere Titel/Descriptions, lokale Kontextsignale, strukturierte Inhalte (ohne langfristige SEO-Betreuung).",
    includes: [
      "Onpage-Basis: Title/Meta/Überschriftenlogik",
      "Lokale Begriffe (Stadt/Region) sinnvoll integriert",
      "Strukturhinweise für bessere Verständlichkeit (kein Keyword-Stuffing)",
    ],
    notes: [
      "Kein Ranking-Versprechen. Langfristige SEO wäre ein separates Paket.",
    ],
  },
  {
    id: "lang",
    label: "Mehrsprachigkeit (zusätzliche Sprache)",
    price: 300,
    group: "Erweiterungen",
    description:
      "Zusätzliche Sprachversion der Landing Page. Struktur bleibt gleich; Inhalte werden pro Sprache gepflegt.",
    includes: [
      "Technische Umsetzung der zweiten Sprache",
      "Struktur/Navigation je nach Setup",
      "Einbindung der Übersetzungen (bereitgestellt oder separat organisiert)",
    ],
    notes: [
      "Übersetzungstexte sind nicht automatisch enthalten; kann optional organisiert werden.",
    ],
  },
  {
    id: "sections",
    label: "Erweiterte Landing Page (zusätzliche Sektionen)",
    price: 300,
    group: "Erweiterungen",
    description:
      "Erweiterung über den Standard-Onepager hinaus, z. B. zusätzliche Angebotsvarianten, detailliertere Prozessabschnitte oder zusätzliche FAQ/Leistungsbausteine.",
    includes: [
      "Zusätzliche Sektionen (nach Abstimmung)",
      "Struktur-/Copy-Anpassungen passend zur erweiterten Tiefe",
      "Konsistente Designintegration",
    ],
  },
];

function formatEurStable(n: number, mounted: boolean) {
  if (!mounted) return `${n} €`;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export default function SalesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Kundendaten
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");

  const [hasWebsite, setHasWebsite] = useState<YesNoUnknown>("Unklar");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [hasDomain, setHasDomain] = useState<YesNoUnknown>("Unklar");
  const [domainName, setDomainName] = useState("");

  // Briefing (Mehrfachauswahl)
  const [pagePurposes, setPagePurposes] = useState<
    Record<PagePurposeId, boolean>
  >({
    anfragen: false,
    termine: false,
    reservierungen: false,
    infos: false,
    angebot: false,
  });

  const [contactChannels, setContactChannels] = useState<
    Record<ContactChannelId, boolean>
  >({
    form: true,
    phone: false,
    email: false,
    whatsapp: false,
    booking: false,
  });

  const [primaryChannel, setPrimaryChannel] =
    useState<ContactChannelId>("form");

  const [trustElements, setTrustElements] = useState<
    Record<TrustElementId, boolean>
  >({
    testimonials: false,
    before_after: false,
    faq: true,
    certs: false,
    process: true,
  });

  const [requiredAssets, setRequiredAssets] = useState<
    Record<RequiredAssetId, boolean>
  >({
    logo: true,
    photos: false,
    offer_details: true,
    contact: true,
  });

  const [targetAudience, setTargetAudience] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [offerText, setOfferText] = useState("");
  const [keyBenefits, setKeyBenefits] = useState("");
  const [differentiators, setDifferentiators] = useState("");
  const [constraints, setConstraints] = useState("");

  const [hasOffer, setHasOffer] = useState<YesNo>("Nein");

  // Add-ons
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [addonOpen, setAddonOpen] = useState<Record<string, boolean>>({});

  // Übergabe & Betrieb
  const [deliveryModel, setDeliveryModel] =
    useState<DeliveryModel>("handover");

  const [transitionHostingEnabled, setTransitionHostingEnabled] =
    useState(false);
  const [transitionHostingMonths, setTransitionHostingMonths] =
    useState<number>(2);
  const [transitionHostingMonthly, setTransitionHostingMonthly] =
    useState<number>(0);

  const [managedMonthly, setManagedMonthly] = useState<number>(30);

  const [editorSetupOneTime, setEditorSetupOneTime] =
    useState<number>(250);
  const [editorMonthly, setEditorMonthly] = useState<number>(0);

  // Interne Notizen / Next steps
  const [internalNote, setInternalNote] = useState("");
  const [nextStep, setNextStep] =
    useState<NextStep>("Angebot senden");

  // Versand-Status (Button in Summary)
  const [sendingEmail, setSendingEmail] = useState(false);

  const groups = useMemo(() => {
    const map = new Map<Addon["group"], Addon[]>();
    for (const a of ADDONS) {
      if (!map.has(a.group)) map.set(a.group, []);
      map.get(a.group)!.push(a);
    }
    return Array.from(map.entries());
  }, []);

  const selectedAddons = useMemo(
    () => ADDONS.filter((a) => !!selected[a.id]),
    [selected]
  );

  const addonsTotal = useMemo(
    () => selectedAddons.reduce((sum, a) => sum + a.price, 0),
    [selectedAddons]
  );

  function toggleSelected(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAddonOpen(id: string) {
    setAddonOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function togglePurpose(id: PagePurposeId) {
    setPagePurposes((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleTrust(id: TrustElementId) {
    setTrustElements((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAsset(id: RequiredAssetId) {
    setRequiredAssets((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleContactChannel(id: ContactChannelId) {
    setContactChannels((prev) => {
      const next = { ...prev, [id]: !prev[id] };

      if (!next[id] && primaryChannel === id) {
        const firstActive = (Object.keys(next) as ContactChannelId[]).find(
          (k) => next[k]
        );
        if (firstActive) setPrimaryChannel(firstActive);
      }

      const anyActive = (Object.keys(next) as ContactChannelId[]).some(
        (k) => next[k]
      );
      if (!anyActive) {
        next.form = true;
        setPrimaryChannel("form");
      }

      return next;
    });
  }

  const activeContactChannels = useMemo(() => {
    return CONTACT_CHANNELS.filter((c) => !!contactChannels[c.id]);
  }, [contactChannels]);

  useEffect(() => {
    if (!contactChannels[primaryChannel]) {
      const firstActive = activeContactChannels[0]?.id;
      if (firstActive) setPrimaryChannel(firstActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactChannels]);

  const oneTimeDeliveryAdd = useMemo(() => {
    if (deliveryModel === "editor")
      return Math.max(0, Number(editorSetupOneTime) || 0);
    return 0;
  }, [deliveryModel, editorSetupOneTime]);

  const oneTimeTotal = BASE_PRICE + addonsTotal + oneTimeDeliveryAdd;

  const monthlyTotal = useMemo(() => {
    let sum = 0;

    if (deliveryModel === "managed")
      sum += Math.max(0, Number(managedMonthly) || 0);
    if (deliveryModel === "editor")
      sum += Math.max(0, Number(editorMonthly) || 0);

    if (
      (deliveryModel === "handover" || deliveryModel === "editor") &&
      transitionHostingEnabled
    ) {
      sum += Math.max(0, Number(transitionHostingMonthly) || 0);
    }

    return sum;
  }, [
    deliveryModel,
    managedMonthly,
    editorMonthly,
    transitionHostingEnabled,
    transitionHostingMonthly,
  ]);

  function resetAll() {
    setCompany("");
    setContactName("");
    setEmail("");
    setPhone("");
    setIndustry("");
    setRegion("");
    setHasWebsite("Unklar");
    setWebsiteUrl("");
    setHasDomain("Unklar");
    setDomainName("");

    setPagePurposes({
      anfragen: false,
      termine: false,
      reservierungen: false,
      infos: false,
      angebot: false,
    });
    setContactChannels({
      form: true,
      phone: false,
      email: false,
      whatsapp: false,
      booking: false,
    });
    setPrimaryChannel("form");
    setTrustElements({
      testimonials: false,
      before_after: false,
      faq: true,
      certs: false,
      process: true,
    });
    setRequiredAssets({
      logo: true,
      photos: false,
      offer_details: true,
      contact: true,
    });

    setTargetAudience("");
    setServiceArea("");
    setHasOffer("Nein");
    setOfferText("");
    setKeyBenefits("");
    setDifferentiators("");
    setConstraints("");

    setSelected({});
    setAddonOpen({});

    setDeliveryModel("handover");
    setTransitionHostingEnabled(false);
    setTransitionHostingMonths(2);
    setTransitionHostingMonthly(0);
    setManagedMonthly(30);
    setEditorSetupOneTime(250);
    setEditorMonthly(0);

    setInternalNote("");
    setNextStep("Angebot senden");
  }

  const eur = (n: number) => formatEurStable(n, mounted);

  const deliveryLabel = useMemo(() => {
    if (deliveryModel === "handover")
      return "Übergabe (ohne laufende Betreuung)";
    if (deliveryModel === "managed")
      return "Managed Service (Hosting & Pflege)";
    return "Übergabe mit Editor (Kunde kann Inhalte pflegen)";
  }, [deliveryModel]);

  const offerSummaryText = useMemo(() => {
    const lines: string[] = [];
    lines.push("Angebotsübersicht – Landing Page");
    lines.push("================================");

    if (company) lines.push(`Unternehmen: ${company}`);
    if (contactName) lines.push(`Ansprechpartner: ${contactName}`);
    if (email) lines.push(`E-Mail: ${email}`);
    if (phone) lines.push(`Telefon: ${phone}`);
    if (industry) lines.push(`Branche: ${industry}`);
    if (region) lines.push(`Region: ${region}`);

    lines.push(
      `Website vorhanden: ${hasWebsite}${
        hasWebsite === "Ja" && websiteUrl ? ` (${websiteUrl})` : ""
      }`
    );
    lines.push(
      `Domain vorhanden: ${hasDomain}${
        hasDomain === "Ja" && domainName ? ` (${domainName})` : ""
      }`
    );
    lines.push("");

    lines.push(`Basisprodukt: Landing Page (Fixpreis) – ${eur(BASE_PRICE)}`);
    lines.push("- Erstgespräch & Seitenfokus");
    lines.push("- Onepager-Struktur");
    lines.push("- Texterstellung");
    lines.push("- Individuelles Design & responsive Umsetzung");
    lines.push("- Ein zentraler Kontakt-/Handlungsweg (mind. 1 Kanal)");
    lines.push("- 1 Korrekturschleife");
    lines.push("- Unterstützung beim Livegang (bei vorhandenem Hosting)");
    lines.push("");

    lines.push("Seitenfokus & Briefing");
    lines.push("----------------------");

    const selectedPurposes = PAGE_PURPOSES.filter((p) => pagePurposes[p.id]).map(
      (p) => p.label
    );
    lines.push(
      `Zwecke/Schwerpunkte: ${
        selectedPurposes.length ? selectedPurposes.join(", ") : "nicht festgelegt"
      }`
    );

    const selectedChannels = CONTACT_CHANNELS.filter(
      (c) => contactChannels[c.id]
    ).map((c) => c.label);
    lines.push(`Kontaktwege sichtbar: ${selectedChannels.join(", ")}`);
    lines.push(
      `Primärer Kontaktweg: ${
        CONTACT_CHANNELS.find((c) => c.id === primaryChannel)?.label ??
        primaryChannel
      }`
    );

    lines.push(`Konkretes Angebot/Aktion: ${hasOffer}`);
    if (hasOffer === "Ja" && offerText)
      lines.push(`Angebotsdetails: ${offerText}`);

    const selectedTrust = TRUST_ELEMENTS.filter((t) => trustElements[t.id]).map(
      (t) => t.label
    );
    lines.push(
      `Vertrauenselemente: ${
        selectedTrust.length ? selectedTrust.join(", ") : "nicht festgelegt"
      }`
    );

    const selectedAssets = REQUIRED_ASSETS.filter(
      (a) => requiredAssets[a.id]
    ).map((a) => a.label);
    lines.push(
      `Benötigte Kundeninhalte: ${
        selectedAssets.length ? selectedAssets.join(", ") : "nicht festgelegt"
      }`
    );

    if (targetAudience) lines.push(`Zielgruppe: ${targetAudience}`);
    if (serviceArea) lines.push(`Einzugsgebiet/Region: ${serviceArea}`);
    if (keyBenefits) lines.push(`Kernaussagen/Nutzen: ${keyBenefits}`);
    if (differentiators) lines.push(`Abgrenzung/Warum wir: ${differentiators}`);
    if (constraints) lines.push(`Rahmenbedingungen/Constraints: ${constraints}`);
    lines.push("");

    lines.push("Zusatzleistungen");
    lines.push("---------------");
    if (!selectedAddons.length) {
      lines.push("Keine Zusatzleistungen ausgewählt.");
    } else {
      for (const a of selectedAddons) lines.push(`- ${a.label}: ${eur(a.price)}`);
    }
    lines.push("");

    lines.push("Übergabe & Betrieb");
    lines.push("------------------");
    lines.push(`Betriebsmodell: ${deliveryLabel}`);

    if (deliveryModel === "managed") {
      lines.push(
        `Monatlich: ${eur(Math.max(0, Number(managedMonthly) || 0))} / Monat`
      );
    }

    if (deliveryModel === "editor") {
      lines.push(
        `Einmalig (Editor-Setup): ${eur(
          Math.max(0, Number(editorSetupOneTime) || 0)
        )}`
      );
      const m = Math.max(0, Number(editorMonthly) || 0);
      if (m > 0) lines.push(`Monatlich (Editor/CMS Betrieb): ${eur(m)} / Monat`);
    }

    if (
      (deliveryModel === "handover" || deliveryModel === "editor") &&
      transitionHostingEnabled
    ) {
      lines.push(
        `Übergabehosting (befristet): ${transitionHostingMonths} Monat(e) · ${eur(
          Math.max(0, Number(transitionHostingMonthly) || 0)
        )} / Monat`
      );
    }

    lines.push("");
    lines.push(`Gesamt (einmalig): ${eur(oneTimeTotal)}`);
    if (monthlyTotal > 0)
      lines.push(`Gesamt (monatlich): ${eur(monthlyTotal)} / Monat`);
    lines.push("");

    lines.push(`Nächster Schritt: ${nextStep}`);

    if (internalNote) {
      lines.push("");
      lines.push("Interne Notiz");
      lines.push("------------");
      lines.push(internalNote);
    }

    return lines.join("\n");
  }, [
    mounted,
    company,
    contactName,
    email,
    phone,
    industry,
    region,
    hasWebsite,
    websiteUrl,
    hasDomain,
    domainName,
    pagePurposes,
    contactChannels,
    primaryChannel,
    hasOffer,
    offerText,
    trustElements,
    requiredAssets,
    targetAudience,
    serviceArea,
    keyBenefits,
    differentiators,
    constraints,
    selectedAddons,
    deliveryModel,
    deliveryLabel,
    managedMonthly,
    editorSetupOneTime,
    editorMonthly,
    transitionHostingEnabled,
    transitionHostingMonths,
    transitionHostingMonthly,
    oneTimeTotal,
    monthlyTotal,
    nextStep,
    internalNote,
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
      // ✅ Nutzt die bestehende, funktionierende Route:
      // src/app/api/contact/route.ts  ->  POST /api/contact
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Die contact-route erwartet: name, email, company?, goal
          // Wir mappen die Sales-Zusammenfassung in "goal".
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
      const msg =
        (maybeJson && (maybeJson.error || maybeJson.message)) ||
        "E-Mail-Versand fehlgeschlagen.";
      alert(String(msg));
    } catch {
      alert("E-Mail-Versand ist derzeit nicht erreichbar.");
    } finally {
      setSendingEmail(false);
    }
  }

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-3 rounded-3xl border border-slate-300 bg-white/80 p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Intern – Vertrieb
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Angebotsformular – Landing Page
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-700">
                Strukturierte Angebotsaufnahme. Keine Erfolgs- oder
                Ergebniszusagen.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
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
                Zusammenfassung kopieren
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400"
              >
                Zurücksetzen
              </button>
            </div>
          </div>

          {/* Preis-Teaser */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
              Einmalig: {eur(oneTimeTotal)}
            </span>
            <span className="inline-flex items-center rounded-full border border-sky-300 bg-sky-50 px-3 py-1 font-semibold text-sky-800">
              Monatlich:{" "}
              {monthlyTotal > 0 ? `${eur(monthlyTotal)} / Monat` : "–"}
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 font-semibold text-slate-700">
              Modell: {deliveryLabel}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Linke Spalte */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grunddaten */}
            <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
              <h2 className="text-lg font-semibold">1) Grunddaten</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Unternehmen / Marke"
                  value={company}
                  onChange={setCompany}
                  placeholder="z. B. Muster GmbH"
                />
                <Field
                  label="Ansprechpartner"
                  value={contactName}
                  onChange={setContactName}
                  placeholder="Vorname Nachname"
                />
                <Field
                  label="E-Mail"
                  value={email}
                  onChange={setEmail}
                  placeholder="name@unternehmen.de"
                  type="email"
                />
                <Field
                  label="Telefon"
                  value={phone}
                  onChange={setPhone}
                  placeholder="+49 ..."
                />
                <Field
                  label="Branche"
                  value={industry}
                  onChange={setIndustry}
                  placeholder="z. B. Restaurant, Praxis, Coaching"
                />
                <Field
                  label="Standort / Region"
                  value={region}
                  onChange={setRegion}
                  placeholder="z. B. Berlin"
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Select
                  label="Bestehende Website?"
                  helper="Gibt es bereits eine Website, die berücksichtigt oder ersetzt werden soll?"
                  value={hasWebsite}
                  onChange={(v) => {
                    const nv = v as YesNoUnknown;
                    setHasWebsite(nv);
                    if (nv !== "Ja") setWebsiteUrl("");
                  }}
                  options={["Ja", "Nein", "Unklar"]}
                />

                <Select
                  label="Domain vorhanden?"
                  helper="Ist eine Domain registriert, die genutzt werden soll (z. B. firma.de)?"
                  value={hasDomain}
                  onChange={(v) => {
                    const nv = v as YesNoUnknown;
                    setHasDomain(nv);
                    if (nv !== "Ja") setDomainName("");
                  }}
                  options={["Ja", "Nein", "Unklar"]}
                />
              </div>

              {(hasWebsite === "Ja" || hasDomain === "Ja") && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {hasWebsite === "Ja" && (
                    <Field
                      label="Website-URL"
                      value={websiteUrl}
                      onChange={setWebsiteUrl}
                      placeholder="https://..."
                      type="url"
                    />
                  )}
                  {hasDomain === "Ja" && (
                    <Field
                      label="Domain"
                      value={domainName}
                      onChange={setDomainName}
                      placeholder="z. B. firma.de"
                    />
                  )}
                </div>
              )}
            </section>

            {/* Basisprodukt */}
            <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
              <h2 className="text-lg font-semibold">2) Basisprodukt (Fix)</h2>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Landing Page – Fixpreis
                  </p>
                  <p className="text-xs text-slate-700">
                    Leistungsumfang ist fest definiert.
                  </p>
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {eur(BASE_PRICE)}
                </div>
              </div>

              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-800">
                <li>Erstgespräch & Seitenfokus</li>
                <li>Onepager-Struktur</li>
                <li>Texterstellung</li>
                <li>Individuelles Design & responsive Umsetzung</li>
                <li>Mindestens ein sichtbarer Kontakt-/Handlungsweg</li>
                <li>1 Korrekturschleife</li>
                <li>Unterstützung beim Livegang (bei vorhandenem Hosting)</li>
              </ul>
            </section>

            {/* Seitenfokus & Briefing */}
            <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
              <h2 className="text-lg font-semibold">3) Seitenfokus & Briefing</h2>
              <p className="mt-2 text-sm text-slate-700">
                Dieser Abschnitt definiert,{" "}
                <span className="font-semibold">
                  was die Seite klar vermitteln soll
                </span>{" "}
                und{" "}
                <span className="font-semibold">
                  wie Besucher den nächsten Schritt gehen
                </span>
                . Keine Zielwerte, keine Erfolgszusagen.
              </p>

              {/* Zwecke / Schwerpunkte */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Zwecke / Schwerpunkte (Mehrfachauswahl)
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Wofür soll die Landing Page primär genutzt werden? Mehrfach
                  möglich.
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {PAGE_PURPOSES.map((p) => (
                    <CheckCard
                      key={p.id}
                      checked={!!pagePurposes[p.id]}
                      title={p.label}
                      helper={p.helper}
                      onToggle={() => togglePurpose(p.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Kontaktwege */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Kontaktwege auf der Seite (Mehrfachauswahl)
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Welche Wege sollen Besucher sichtbar nutzen können? Mindestens
                  ein Kanal ist erforderlich.
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {CONTACT_CHANNELS.map((c) => (
                    <CheckCard
                      key={c.id}
                      checked={!!contactChannels[c.id]}
                      title={c.label}
                      helper={c.helper}
                      onToggle={() => toggleContactChannel(c.id)}
                    />
                  ))}
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Select
                    label="Primärer Kontaktweg (Priorität)"
                    helper="Welcher Weg soll visuell am stärksten geführt werden (Haupt-CTA)?"
                    value={primaryChannel}
                    onChange={(v) => setPrimaryChannel(v as ContactChannelId)}
                    options={activeContactChannels.map((c) => c.id)}
                    optionLabels={Object.fromEntries(
                      CONTACT_CHANNELS.map((c) => [c.id, c.label])
                    )}
                  />

                  <Select
                    label="Konkretes Angebot / Aktion?"
                    helper="Gibt es ein klar definierbares Angebot, das im Zentrum steht (z. B. Kennenlerntermin, Aktion, Paket)?"
                    value={hasOffer}
                    onChange={(v) => setHasOffer(v as YesNo)}
                    options={["Nein", "Ja"]}
                  />
                </div>

                {hasOffer === "Ja" && (
                  <div className="mt-4">
                    <Textarea
                      label="Angebotsdetails (präzise)"
                      helper="Was genau wird angeboten? Für wen? Umfang/Leistung, Bedingungen, ggf. Zeitraum."
                      value={offerText}
                      onChange={setOfferText}
                      placeholder="z. B. Kennenlerntermin 30 Min, Zeitraum, Voraussetzungen, was enthalten ist, was nicht ..."
                    />
                  </div>
                )}
              </div>

              {/* Vertrauenselemente */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Vertrauenselemente (Mehrfachauswahl)
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Welche Elemente sollen Vertrauen schaffen bzw. Rückfragen
                  reduzieren?
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {TRUST_ELEMENTS.map((t) => (
                    <CheckCard
                      key={t.id}
                      checked={!!trustElements[t.id]}
                      title={t.label}
                      helper={t.helper}
                      onToggle={() => toggleTrust(t.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Benötigte Inhalte vom Kunden */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Benötigte Kundeninhalte (Checkliste)
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Welche Inhalte sind für eine zügige Umsetzung erforderlich?
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {REQUIRED_ASSETS.map((a) => (
                    <CheckCard
                      key={a.id}
                      checked={!!requiredAssets[a.id]}
                      title={a.label}
                      helper={a.helper}
                      onToggle={() => toggleAsset(a.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Freitext-Felder */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Textarea
                  label="Zielgruppe (konkret)"
                  helper="Wer soll sich angesprochen fühlen (z. B. Erstkunden, Stammkunden, bestimmte Zielgruppen)?"
                  value={targetAudience}
                  onChange={setTargetAudience}
                  placeholder="z. B. Neukunden in Berlin, Privatpatienten, Paare, Unternehmen ..."
                />
                <Textarea
                  label="Einzugsgebiet / Region"
                  helper="Welche Orte/Regionen sind relevant? (Hilft bei Klarheit und ggf. lokaler Auffindbarkeit.)"
                  value={serviceArea}
                  onChange={setServiceArea}
                  placeholder="z. B. Berlin-Mitte, Umkreis 10 km, Köln Innenstadt ..."
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="Kernaussagen / Nutzen (stichpunktartig)"
                  helper="Was sind 3–5 klare Nutzenpunkte, die Besucher sofort verstehen sollen?"
                  value={keyBenefits}
                  onChange={setKeyBenefits}
                  placeholder="z. B. schnelle Termine, transparente Preise, spezialisierte Leistung, zentrale Lage ..."
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Textarea
                  label="Abgrenzung (Warum dieses Angebot?)"
                  helper="Was unterscheidet das Angebot vom Wettbewerb? (Fakten, Prozesse, Spezialisierung.)"
                  value={differentiators}
                  onChange={setDifferentiators}
                  placeholder="z. B. Spezialisierung, Erfahrung, Methodik, Ausstattung, Ablauf ..."
                />
                <Textarea
                  label="Rahmenbedingungen / Constraints"
                  helper="Gibt es Dinge, die wir beachten müssen? (Rechtliches, Tonalität, Ausschlüsse, No-Gos.)"
                  value={constraints}
                  onChange={setConstraints}
                  placeholder="z. B. keine Preisangaben, bestimmte Aussagen vermeiden, Pflichtinhalte ..."
                />
              </div>
            </section>

            {/* Add-ons */}
            <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
              <h2 className="text-lg font-semibold">4) Zusatzleistungen (optional)</h2>
              <p className="mt-2 text-sm text-slate-700">
                Zusatzleistungen sind modular. Keine laufenden Kosten – alle
                Preise einmalig.
              </p>

              <div className="mt-5 space-y-6">
                {groups.map(([group, items]) => (
                  <div
                    key={group}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-semibold text-slate-900">{group}</p>

                    <div className="mt-3 space-y-2">
                      {items.map((a) => {
                        const checked = !!selected[a.id];
                        const open = !!addonOpen[a.id];

                        return (
                          <div
                            key={a.id}
                            className={`rounded-xl border transition ${
                              checked
                                ? "border-sky-400 bg-white shadow-sm"
                                : "border-slate-200 bg-white/70 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3 px-3 py-2">
                              <label className="flex cursor-pointer items-start gap-3 text-sm">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleSelected(a.id)}
                                  className="mt-1 h-4 w-4 accent-sky-600"
                                />
                                <div>
                                  <div className="text-slate-900 font-medium">
                                    {a.label}
                                  </div>
                                  <div className="text-xs text-slate-600">
                                    Einmalig:{" "}
                                    <span className="font-semibold text-slate-800">
                                      + {eur(a.price)}
                                    </span>
                                  </div>
                                </div>
                              </label>

                              <button
                                type="button"
                                onClick={() => toggleAddonOpen(a.id)}
                                className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500"
                                aria-expanded={open}
                              >
                                {open ? "Details schließen" : "Details anzeigen"}
                              </button>
                            </div>

                            {open && (
                              <div className="border-t border-slate-200 px-4 py-3 text-sm">
                                <p className="text-slate-800">{a.description}</p>

                                <div className="mt-3">
                                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                                    Enthalten
                                  </p>
                                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-800">
                                    {a.includes.map((x) => (
                                      <li key={x}>{x}</li>
                                    ))}
                                  </ul>
                                </div>

                                {a.notes?.length ? (
                                  <div className="mt-3">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                                      Hinweise
                                    </p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                                      {a.notes.map((x) => (
                                        <li key={x}>{x}</li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : null}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Übergabe & Betrieb */}
            <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
              <h2 className="text-lg font-semibold">5) Übergabe & Betrieb</h2>
              <p className="mt-2 text-sm text-slate-700">
                Hier wird festgelegt,{" "}
                <span className="font-semibold">wer Hosting/Domain betreibt</span>{" "}
                und{" "}
                <span className="font-semibold">wer Inhalte künftig pflegt</span>.
                Einmalige und monatliche Kosten werden getrennt ausgewiesen.
              </p>

              <div className="mt-5 grid gap-3">
                <RadioCard
                  checked={deliveryModel === "handover"}
                  title="Übergabe (ohne laufende Betreuung)"
                  helper="Wir liefern die fertige Landing Page. Hosting/Domain liegen beim Kunden. Änderungen erfolgen entweder durch den Kunden/IT oder als neues Projekt."
                  onSelect={() => setDeliveryModel("handover")}
                />

                <RadioCard
                  checked={deliveryModel === "managed"}
                  title="Managed Service (Hosting & Pflege durch uns)"
                  helper="Wir betreiben die Seite inkl. Hosting/SSL und übernehmen kleine Pflegeanpassungen im vereinbarten Rahmen. Monatlicher Betrag planbar."
                  onSelect={() => setDeliveryModel("managed")}
                >
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <NumberField
                      label="Monatlicher Betrag (Managed Service)"
                      helper="Standard: 30 € / Monat (anpassbar)."
                      value={managedMonthly}
                      onChange={setManagedMonthly}
                      min={0}
                      suffix="€ / Monat"
                    />
                  </div>
                </RadioCard>

                <RadioCard
                  checked={deliveryModel === "editor"}
                  title="Übergabe mit Editor (Kunde kann Inhalte selbst ändern)"
                  helper="Wir übergeben die Seite inkl. einfachem Bearbeitungsbereich (Texte/Bilder/definierte Farben). Der Kunde kann Inhalte pflegen, ohne die Struktur zu verändern."
                  onSelect={() => setDeliveryModel("editor")}
                >
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <NumberField
                      label="Einmalig: Editor-/CMS-Setup"
                      helper="Aufwand für Einrichtung der editierbaren Bereiche (Model, Felder, Übergabe)."
                      value={editorSetupOneTime}
                      onChange={setEditorSetupOneTime}
                      min={0}
                      suffix="€ einmalig"
                    />
                    <NumberField
                      label="Optional: monatlicher Betrieb (Editor/CMS)"
                      helper="Nur falls ihr zusätzlich Betrieb/Updates/Support übernehmen wollt."
                      value={editorMonthly}
                      onChange={setEditorMonthly}
                      min={0}
                      suffix="€ / Monat"
                    />
                  </div>
                </RadioCard>
              </div>

              {(deliveryModel === "handover" || deliveryModel === "editor") && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Optional: Übergabehosting (befristet)
                      </p>
                      <p className="mt-1 text-xs text-slate-700">
                        Zwischenlösung, wenn der Kunde noch kein finales
                        Hosting/Domain-Setup hat. Befristet, damit es nicht zu
                        „Betreuung ohne Vertrag“ wird.
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

                  {transitionHostingEnabled && (
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
                  )}
                </div>
              )}
            </section>

            {/* Next steps */}
            <section className="rounded-3xl border border-slate-300 bg-white/90 p-6 shadow-sm">
              <h2 className="text-lg font-semibold">6) Nächste Schritte (intern)</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Select
                  label="Nächster Schritt"
                  value={nextStep}
                  onChange={(v) => setNextStep(v as NextStep)}
                  options={["Angebot senden", "Intern klären", "Rückmelde-Termin"]}
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="Interne Notiz"
                  value={internalNote}
                  onChange={setInternalNote}
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
                <Row label="Zusatzleistungen (einmalig)" value={eur(addonsTotal)} />
                {oneTimeDeliveryAdd > 0 ? (
                  <Row
                    label="Übergabe/Editor (einmalig)"
                    value={eur(oneTimeDeliveryAdd)}
                  />
                ) : null}
                <div className="my-3 border-t border-slate-200" />
                <Row label="Gesamt (einmalig)" value={eur(oneTimeTotal)} strong />
                <Row
                  label="Gesamt (monatlich)"
                  value={monthlyTotal > 0 ? `${eur(monthlyTotal)} / Monat` : "–"}
                />
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Betriebsmodell
                </p>
                <p className="mt-2 text-sm text-slate-800">{deliveryLabel}</p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Gewählte Add-ons
                </p>
                {selectedAddons.length === 0 ? (
                  <p className="mt-2 text-sm text-slate-700">
                    Keine Zusatzleistungen ausgewählt.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-2 text-sm text-slate-800">
                    {selectedAddons.map((a) => (
                      <li key={a.id} className="flex items-start justify-between gap-3">
                        <span>{a.label}</span>
                        <span className="shrink-0 font-semibold text-slate-900">
                          {eur(a.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Export
                </p>
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
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-600">
                  Hinweis: Diese Seite enthält keine Erfolgs- oder
                  Ergebniszusagen.
                </p>
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
  );
}

/* ---------- UI Helpers ---------- */

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`text-slate-700 ${strong ? "font-semibold" : ""}`}>
        {label}
      </span>
      <span
        className={`text-slate-900 ${
          strong ? "text-base font-semibold" : "font-semibold"
        }`}
      >
        {value}
      </span>
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

function CheckCard({
  checked,
  title,
  helper,
  onToggle,
}: {
  checked: boolean;
  title: string;
  helper: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-2xl border px-3 py-2 text-left transition ${
        checked
          ? "border-sky-400 bg-white shadow-sm"
          : "border-slate-200 bg-white/70 hover:border-slate-300"
      }`}
      aria-pressed={checked}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-1 inline-flex h-4 w-4 items-center justify-center rounded border ${
            checked ? "border-sky-500 bg-sky-600" : "border-slate-300 bg-white"
          }`}
        >
          {checked ? <span className="h-2 w-2 rounded-sm bg-white" /> : null}
        </span>

        <div>
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <p className="mt-1 text-xs text-slate-600">{helper}</p>
        </div>
      </div>
    </button>
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
        {suffix ? (
          <span className="shrink-0 text-xs font-semibold text-slate-600">
            {suffix}
          </span>
        ) : null}
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
        checked
          ? "border-sky-400 bg-white shadow-sm"
          : "border-slate-200 bg-white/70 hover:border-slate-300"
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
