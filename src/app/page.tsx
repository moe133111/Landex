// app/page.tsx
"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Eye,
  MapPin,
  MessageCircle,
  MousePointerClick,
  Palette,
  Rocket,
  Sparkles,
  Star,
  Target,
  Timer,
  Users,
  Wand2,
  X,
  SlidersHorizontal,
} from "lucide-react";

type StatusType = "success" | "error" | null;

type Feature = {
  title: string;
  description: string;
  hoverHint: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Step = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const industries = [
  "Restaurants & Cafés",
  "Friseure & Barbiere",
  "Kosmetik- & Nagelstudios",
  "Physio- & Heilpraxen",
  "Coaches & Berater",
  "Personal Trainer & Studios",
  "Handwerksbetriebe",
  "Lokale Dienstleister aller Art",
];

const faqs = [
  {
    question: "Für wen ist dieser Service gedacht?",
    answer:
      "Für kleine Unternehmen, Selbstständige und lokale Betriebe, die ein klares Angebot haben und mehr Anfragen oder Buchungen über das Internet erhalten möchten – ohne sich selbst mit Technik und Marketing beschäftigen zu müssen.",
    icon: Users,
  },
  {
    question: "Brauche ich schon eine Website?",
    answer:
      "Nein. Eine Landing Page kann Ihre erste Online-Präsenz sein oder eine Ergänzung zu einer bestehenden Website, um ein bestimmtes Angebot gezielt zu bewerben.",
    icon: Rocket,
  },
  {
    question: "Was kostet eine Landing Page?",
    answer:
      "Das hängt vom Umfang ab (z. B. Anzahl der Sektionen, Mehrsprachigkeit, Einbindung von Buchungssystemen). Im Erstgespräch klären wir Ihr Ziel und machen Ihnen ein klares, transparentes Angebot.",
    icon: BarChart3,
  },
  {
    question: "Wie lange dauert es, bis die Landing Page online ist?",
    answer:
      "In vielen Fällen kann eine erste Version innerhalb weniger Tage stehen – vorausgesetzt, die nötigen Inhalte (Texte, Bilder, Logo) sind vorhanden.",
    icon: Timer,
  },
];

const heroProof = [
  {
    title: "Mehr Terminbuchungen",
    description: "Klarer Ablauf + sichtbarer nächster Schritt statt „nur Infos“.",
    icon: CalendarCheck,
  },
  {
    title: "Mehr Anfragen, die passen",
    description: "Gute Botschaft + Vertrauen + CTA – ohne Umwege.",
    icon: Target,
  },
  {
    title: "Weniger Rückfragen",
    description: "Die Seite beantwortet die wichtigsten Punkte vorab.",
    icon: MessageCircle,
  },
] as const;

const timelineMeta = [
  {
    label: "Erstgespräch",
    value: "20–30 Minuten",
    icon: MessageCircle,
  },
  {
    label: "Zeit bis zur ersten Version",
    value: "7–10 Tage",
    icon: Rocket,
  },
  {
    label: "Typischer Projektzeitraum",
    value: "2–4 Wochen",
    icon: Timer,
  },
];

const testimonials = [
  {
    name: "Julia M.",
    role: "Inhaberin eines Friseursalons in Berlin",
    rating: 5,
    quote:
      "Wir hatten vorher nur einen Google-Eintrag. Über die neue Landing Page kommen jetzt gezielt Termin-Anfragen, die auch wirklich zu unserem Angebot passen.",
    result: "Mehr planbare Online-Termine über einen klaren Buchungsfunnel.",
  },
  {
    name: "Kemal A.",
    role: "Betreiber eines Restaurants in Köln",
    rating: 5,
    quote:
      "Die Seite nimmt unseren Gästen die wichtigsten Fragen vorweg – Öffnungszeiten, Reservierung, Speisekarte. Seitdem bekommen wir deutlich mehr Reservierungen über das Formular.",
    result: "Stabilere Auslastung unter der Woche durch Online-Reservierungen.",
  },
  {
    name: "Dr. Lisa M.",
    role: "Inhaberin einer Praxis in München",
    rating: 5,
    quote:
      "Für Erstkontakte ist die Landing Page ideal. Neue Patientinnen und Patienten wissen genau, für welche Themen die Praxis geeignet ist und wie sie einen Termin bekommen.",
    result: "Besser vorbereitete Erstkontakte mit weniger Rückfragen am Telefon.",
  },
];

function formatNumberDE(n: number) {
  return new Intl.NumberFormat("de-DE").format(n);
}

/* ---------------- Cookie Banner (leichtgewichtig, nicht aufdringlich) ---------------- */

type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
};

const CONSENT_STORAGE_KEY = "cookie_consent_v1";
const CONSENT_COOKIE_NAME = "cookie_consent_v1";
const CONSENT_VERSION = 1;

function setCookie(name: string, value: string, days = 180) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function readStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    if (parsed.necessary !== true) return null;
    return parsed;
  } catch {
    return null;
  }
}

function storeConsent(consent: CookieConsent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore
  }
  // Zusätzlich als Cookie (für serverseitige Auswertung, falls später benötigt)
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(consent));
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readStoredConsent();
    if (!existing) {
      setVisible(true);
      return;
    }
    // Falls gespeichert, UI-States spiegeln
    setAnalytics(!!existing.analytics);
    setMarketing(!!existing.marketing);
    setVisible(false);
  }, []);

  function acceptAll() {
    const consent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    storeConsent(consent);
    setAnalytics(true);
    setMarketing(true);
    setVisible(false);
    setShowSettings(false);
  }

  function acceptNecessaryOnly() {
    const consent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    storeConsent(consent);
    setAnalytics(false);
    setMarketing(false);
    setVisible(false);
    setShowSettings(false);
  }

  function saveSettings() {
    const consent: CookieConsent = {
      necessary: true,
      analytics: !!analytics,
      marketing: !!marketing,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    storeConsent(consent);
    setVisible(false);
    setShowSettings(false);
  }

  if (!visible) return null;

  return (
    <>
      {/* Kompakter Banner unten */}
      <div className="fixed inset-x-0 bottom-3 z-[60] px-3">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-slate-300 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Cookies</p>
              <p className="mt-1 text-xs text-slate-600">
                Wir verwenden notwendige Cookies für die Funktionalität. Optionale Cookies (z. B. Analyse) nur mit Einwilligung.{" "}
                <Link href="/legal/DSGVO" className="font-semibold text-slate-800 underline underline-offset-4 hover:text-slate-900">
                  Datenschutz
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400"
            >
              Einstellungen
            </button>
            <button
              type="button"
              onClick={acceptNecessaryOnly}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400"
            >
              Nur notwendig
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal (minimal, nur wenn geöffnet) */}
      {showSettings && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/35" onClick={() => setShowSettings(false)} />
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-300 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Cookie-Einstellungen</p>
                <p className="mt-1 text-xs text-slate-600">
                  Notwendige Cookies sind immer aktiv. Optionale Kategorien können Sie hier steuern.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
                aria-label="Schließen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Notwendig</p>
                    <p className="mt-1 text-xs text-slate-600">Erforderlich für Grundfunktionen (z. B. Formular/Session).</p>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    aktiv
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Analyse (optional)</p>
                    <p className="mt-1 text-xs text-slate-600">Hilft zu verstehen, welche Bereiche genutzt werden.</p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={() => setAnalytics((p) => !p)}
                      className="h-4 w-4 accent-sky-600"
                    />
                    aktiv
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Marketing (optional)</p>
                    <p className="mt-1 text-xs text-slate-600">Für personalisierte Inhalte/Remarketing (falls genutzt).</p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={() => setMarketing((p) => !p)}
                      className="h-4 w-4 accent-sky-600"
                    />
                    aktiv
                  </label>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                Details finden Sie in der{" "}
                <Link href="/legal/DSGVO" className="font-semibold text-slate-800 underline underline-offset-4 hover:text-slate-900">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={acceptNecessaryOnly}
                className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400"
              >
                Nur notwendig
              </button>
              <button
                type="button"
                onClick={saveSettings}
                className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-600/30 transition hover:-translate-y-0.5 hover:bg-sky-500"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- Page ---------------- */

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<StatusType>(null);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Autoplay / Pause-on-hover für Testimonials
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  // --- KPI Sektion: Count-Up on Scroll ---
  const kpiSectionRef = useRef<HTMLDivElement | null>(null);
  const [kpiHasStarted, setKpiHasStarted] = useState(false);
  const [kpiValues, setKpiValues] = useState<{
    projects: number;
    years: number;
    impressions: number;
  }>({
    projects: 0,
    years: 0,
    impressions: 0,
  });

  const kpiTargets = useMemo(
    () => ({
      projects: 55,
      years: 6,
      impressions: 200_000,
    }),
    []
  );

  // Blau = Information, Grün = Aktion (Buttons/Form)
  const features: Feature[] = useMemo(
    () => [
      {
        title: "Klare Botschaft (in 5 Sekunden verstanden)",
        description:
          "Überschriften und Struktur führen sofort zum Angebot: Was ist es, für wen ist es, warum lohnt es sich.",
        hoverHint:
          "Keine Textwüste: Wir priorisieren, was ein Interessent wirklich wissen muss – in der richtigen Reihenfolge.",
        icon: Sparkles,
      },
      {
        title: "Vertrauen (bevor jemand Kontakt aufnimmt)",
        description:
          "Belege, Beispiele und Antworten auf typische Fragen – damit Anfragen leichter und schneller entstehen.",
        hoverHint:
          "Social Proof, klare Prozesse und konkrete Aussagen reduzieren Unsicherheit und Rückfragen.",
        icon: BadgeCheck,
      },
      {
        title: "Nächster Schritt (ohne Umwege)",
        description:
          "Der CTA ist sichtbar, logisch platziert und passt zum Kontext – damit aus Besuchern echte Kontakte werden.",
        hoverHint:
          "Wir optimieren auf Termin/Anfrage/Buchung – nicht auf reine Seitenaufrufe.",
        icon: MousePointerClick,
      },
    ],
    []
  );

  const steps: Step[] = useMemo(
    () => [
      {
        title: "Kurzes Gespräch",
        description:
          "Wir klären Ziel, Angebot, Wunschkunden und vorhandenes Material (Logo, Bilder, Kernaussagen).",
        icon: MessageCircle,
      },
      {
        title: "Konzept & Copy",
        description:
          "Wir entwickeln Struktur, Kernaussagen und Vertrauenselemente – damit die Seite logisch und überzeugend führt.",
        icon: Wand2,
      },
      {
        title: "Design & Umsetzung",
        description:
          "Wir setzen die Landing Page technisch um, optimieren für Mobilgeräte und schärfen Wirkung und Details.",
        icon: Palette,
      },
      {
        title: "Live & messen",
        description:
          "Wir unterstützen bei Domain/Tracking und optionaler Kampagne – damit Sie nachvollziehen können, was funktioniert.",
        icon: BarChart3,
      },
    ],
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  // Autoplay: alle 3.5s, pausiert bei Hover
  useEffect(() => {
    if (isTestimonialPaused) return;

    const id = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => window.clearInterval(id);
  }, [isTestimonialPaused]);

  // KPI: starten, wenn Sektion sichtbar ist (einmalig)
  useEffect(() => {
    if (kpiHasStarted) return;

    const el = kpiSectionRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        setKpiHasStarted(true);
        observer.disconnect();

        if (prefersReduced) {
          setKpiValues({
            projects: kpiTargets.projects,
            years: kpiTargets.years,
            impressions: kpiTargets.impressions,
          });
          return;
        }

        const start = performance.now();
        const duration = 1200;

        const animate = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);

          setKpiValues({
            projects: Math.round(kpiTargets.projects * eased),
            years: Math.round(kpiTargets.years * eased),
            impressions: Math.round(kpiTargets.impressions * eased),
          });

          if (t < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [kpiHasStarted, kpiTargets]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    setIsSubmitting(true);
    setStatusMessage(null);
    setStatusType(null);

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      goal: formData.get("goal"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatusType("success");
        setStatusMessage("Danke, Ihre Nachricht wurde gesendet.");
        form.reset();
      } else {
        setStatusType("error");
        setStatusMessage("Es ist ein Fehler beim Senden der Nachricht aufgetreten.");
      }
    } catch (error) {
      console.error(error);
      setStatusType("error");
      setStatusMessage("Es ist ein technischer Fehler aufgetreten.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative bg-slate-100 text-slate-900">
      {/* Cookie Banner */}
      <CookieBanner />

      {/* Globaler Hintergrund */}
      <div className="page-bg">
        <div className="page-bg-grid" />
        <div className="page-bg-noise" />
      </div>

      {/* Globale Styles */}
      <style jsx global>{`
        .page-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .page-bg-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              to right,
              rgba(148, 163, 184, 0.06) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(148, 163, 184, 0.06) 1px,
              transparent 1px
            );
          background-size: 72px 72px;
        }
        .page-bg-noise {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }

        .section-blob-wrapper {
          position: absolute;
          top: -90px;
          bottom: -90px;
          left: 0;
          right: 0;
          width: 100%;
          max-width: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.85) 12%,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0.85) 88%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.85) 12%,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0.85) 88%,
            transparent 100%
          );
        }
        .section-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(18px);
          opacity: 1;
          will-change: transform, border-radius;
        }

        /* Blobs – bewusst ruhiger (Info blau, Aktion grün eher als Akzent) */
        .section-blob--hero-1 {
          width: 420px;
          height: 420px;
          top: -160px;
          left: -120px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(56, 189, 248, 0.8),
            transparent 64%
          );
          animation: blob1 14s ease-in-out infinite;
        }
        .section-blob--hero-2 {
          width: 460px;
          height: 460px;
          top: 35%;
          right: -180px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(59, 130, 246, 0.72),
            transparent 64%
          );
          animation: blob2 16s ease-in-out infinite;
        }
        .section-blob--hero-3 {
          width: 380px;
          height: 380px;
          bottom: -170px;
          left: 45%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(52, 211, 153, 0.55),
            transparent 66%
          );
          animation: blob3 18s ease-in-out infinite;
        }

        .section-blob--mid-1 {
          width: 380px;
          height: 380px;
          top: -140px;
          right: -140px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(129, 140, 248, 0.55),
            transparent 66%
          );
          animation: blob3 15s ease-in-out infinite;
        }
        .section-blob--mid-2 {
          width: 340px;
          height: 340px;
          bottom: -140px;
          left: 10%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(56, 189, 248, 0.5),
            transparent 66%
          );
          animation: blob1 17s ease-in-out infinite;
        }
        .section-blob--lower-1 {
          width: 360px;
          height: 360px;
          top: -120px;
          left: 20%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(59, 130, 246, 0.55),
            transparent 66%
          );
          animation: blob2 17s ease-in-out infinite;
        }
        .section-blob--lower-2 {
          width: 380px;
          height: 380px;
          bottom: -150px;
          right: -130px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(52, 211, 153, 0.45),
            transparent 66%
          );
          animation: blob3 16s ease-in-out infinite;
        }

        @keyframes blob1 {
          0% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            border-radius: 50% / 50%;
          }
          25% {
            transform: translate3d(70px, -50px, 0) scale(1.12) rotate(6deg);
            border-radius: 60% 40% 55% 45% / 55% 45% 60% 40%;
          }
          50% {
            transform: translate3d(-45px, 25px, 0) scale(0.96) rotate(-4deg);
            border-radius: 48% 52% 60% 40% / 40% 60% 45% 55%;
          }
          75% {
            transform: translate3d(30px, 40px, 0) scale(1.08) rotate(3deg);
            border-radius: 55% 45% 48% 52% / 52% 48% 60% 40%;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            border-radius: 50% / 50%;
          }
        }
        @keyframes blob2 {
          0% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            border-radius: 50% / 50%;
          }
          25% {
            transform: translate3d(-80px, 40px, 0) scale(1.1) rotate(-5deg);
            border-radius: 65% 35% 55% 45% / 45% 55% 60% 40%;
          }
          50% {
            transform: translate3d(40px, -60px, 0) scale(0.95) rotate(4deg);
            border-radius: 45% 55% 65% 35% / 55% 45% 40% 60%;
          }
          75% {
            transform: translate3d(-50px, 20px, 0) scale(1.08) rotate(-3deg);
            border-radius: 58% 42% 48% 52% / 48% 52% 62% 38%;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            border-radius: 50% / 50%;
          }
        }
        @keyframes blob3 {
          0% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            border-radius: 50% / 50%;
          }
          25% {
            transform: translate3d(60px, -35px, 0) scale(1.13) rotate(8deg);
            border-radius: 62% 38% 52% 48% / 50% 50% 65% 35%;
          }
          50% {
            transform: translate3d(-55px, 50px, 0) scale(0.94) rotate(-6deg);
            border-radius: 42% 58% 60% 40% / 60% 40% 45% 55%;
          }
          75% {
            transform: translate3d(35px, 20px, 0) scale(1.09) rotate(3deg);
            border-radius: 55% 45% 48% 52% / 52% 48% 58% 42%;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            border-radius: 50% / 50%;
          }
        }
      `}</style>

      {/* Inhaltsebene */}
      <div className="relative z-10">
        {/* HERO – bewusst einspaltig, CTA reduziert (Info zuerst) */}
        <section className="relative px-4 py-12 sm:py-16 lg:py-20">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--hero-1" />
            <div className="section-blob section-blob--hero-2" />
            <div className="section-blob section-blob--hero-3" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col items-start gap-6">
                <Link href="/" className="inline-flex items-center">
                  <img src="/LandexDigital.svg" alt="Landex Digital" className="h-14 w-auto md:h-16" />
                </Link>

                {/* Blau = Information */}
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-800">
                  <Sparkles className="h-4 w-4 text-sky-700" />
                  Landing Pages für lokale Unternehmen
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Landing Pages,{" "}
                <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
                  die Besucher in Anfragen verwandeln.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 max-w-2xl text-balance text-base text-slate-800 sm:text-lg">
                Wir bauen fokussierte Seiten mit klarer Führung, Vertrauen und einem eindeutigen nächsten Schritt – damit Interessenten nicht
                suchen müssen, sondern handeln können.
              </p>
            </Reveal>

            {/* Nur Info-Link im Hero */}
            <Reveal delay={0.12}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link href="#vorteile" className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 underline-offset-4 hover:underline">
                  Vorteile ansehen <ChevronDown className="h-4 w-4" />
                </Link>

                <span className="text-xs text-slate-600">Erstgespräch & Formular nach dem Ablauf (unten).</span>
              </div>
            </Reveal>

            {/* Mini-Proof (kurz) */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroProof.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={0.04 * idx} y={18}>
                    <div className="group rounded-2xl border border-slate-300 bg-slate-50/95 px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:border-sky-500/80 hover:bg-white hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 transition group-hover:bg-sky-600 group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                          <p className="mt-1 text-sm text-slate-700">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vorteile – Nutzen klar, keine Dopplung mit „Was bewirkt…“ */}
        <section className="relative px-4 py-10 sm:py-14" id="vorteile">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--mid-1" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">So helfen wir Ihnen zu mehr Erfolg.</h2>
                  <p className="mt-3 max-w-2xl text-sm text-slate-800 sm:text-base">
                    Die Seite ist so aufgebaut, dass ein Interessent in kurzer Zeit alles Wichtige versteht – und den nächsten Schritt ohne
                    Zweifel geht.
                  </p>
                </div>

                <div className="text-xs text-slate-700 sm:text-sm">
                  <p className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-sky-700" />
                    Fokus: Anfrage, Termin oder Buchung.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <Reveal key={feature.title} delay={0.05 * index} y={28}>
                    <div className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-300 bg-slate-50/95 p-5 shadow-md transition hover:-translate-y-1.5 hover:border-sky-500/80 hover:bg-white hover:shadow-lg">
                      <div className="flex items-start gap-3">
                        {/* Blau = Information */}
                        <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 transition group-hover:bg-sky-600 group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{feature.title}</h3>
                          <p className="mt-1 text-sm text-slate-800">{feature.description}</p>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">Details beim Hover</span>
                        <span className="inline-flex items-center gap-2 text-xs font-medium text-sky-800 opacity-80 transition group-hover:opacity-100">
                          <Sparkles className="h-4 w-4" />
                          Hinweis
                        </span>
                      </div>

                      <div className="mt-1 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-700 opacity-0 transition group-hover:opacity-100">
                        {feature.hoverHint}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Kennzahlen (Projekte / Jahre / Impressionen) */}
        <section className="relative px-4 py-10 sm:py-14" id="kennzahlen">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--mid-2" />
          </div>

          <div ref={kpiSectionRef} className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Projekte, Erfahrung, Reichweite.</h2>
                  <p className="mt-3 max-w-2xl text-sm text-slate-800 sm:text-base">
                    Kennzahlen als Orientierung – für Größe, Routine und die Menge an gesammelten Praxiseindrücken aus echten Projekten.
                  </p>
                </div>

                <div className="text-xs text-slate-700 sm:text-sm" />
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Reveal delay={0.03} y={22}>
                <div className="group rounded-3xl border border-slate-300 bg-slate-50/95 p-6 shadow-md transition hover:-translate-y-1 hover:border-sky-500/80 hover:bg-white hover:shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 transition group-hover:bg-sky-600 group-hover:text-white">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                      Projekte
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-4xl font-semibold tracking-tight text-slate-900">{formatNumberDE(kpiValues.projects)}+</p>
                    <p className="mt-2 text-sm text-slate-800">
                      Umgesetzt – von klaren Angebotsseiten bis zu kampagnenfähigen Funnels.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06} y={22}>
                <div className="group rounded-3xl border border-slate-300 bg-slate-50/95 p-6 shadow-md transition hover:-translate-y-1 hover:border-sky-500/80 hover:bg-white hover:shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 transition group-hover:bg-sky-600 group-hover:text-white">
                      <Timer className="h-5 w-5" />
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                      Erfahrung
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-4xl font-semibold tracking-tight text-slate-900">{formatNumberDE(kpiValues.years)}+</p>
                    <p className="mt-2 text-sm text-slate-800">
                      Jahre – mit Fokus auf Struktur, Copy und Conversion im lokalen Umfeld.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.09} y={22}>
                <div className="group rounded-3xl border border-slate-300 bg-slate-50/95 p-6 shadow-md transition hover:-translate-y-1 hover:border-sky-500/80 hover:bg-white hover:shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 transition group-hover:bg-sky-600 group-hover:text-white">
                      <Eye className="h-5 w-5" />
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                      Impressionen
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-4xl font-semibold tracking-tight text-slate-900">
                      {formatNumberDE(kpiValues.impressions)}+
                    </p>
                    <p className="mt-2 text-sm text-slate-800">Gesammelte Sichtkontakte über Projekte und Kampagnen.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Proof – Branchen + Kundenstimmen zusammengeführt */}
        <section className="relative px-4 py-10 sm:py-14" id="proof">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--mid-2" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Für lokale Unternehmen gemacht – und im Alltag bewährt.</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 max-w-3xl text-sm text-slate-800 sm:text-base">
                Verständliche Sprache, klare Struktur und schnelle Kontaktwege – damit Interessenten sofort wissen, ob Ihr Angebot passt.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Branchen */}
              <div className="rounded-3xl border border-slate-300 bg-slate-50/95 p-6 shadow-md sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Typische Branchen</p>
                    <p className="mt-1 text-sm text-slate-700">
                      Beispiele – wenn Sie nicht dabei sind, ist das in der Regel kein Problem.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                    <MapPin className="h-4 w-4 text-sky-700" />
                    Lokal & regional
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {industries.map((item, index) => (
                    <Reveal key={item} delay={0.03 * index} y={18}>
                      <div className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:-translate-y-1 hover:border-sky-500/80 hover:bg-white/90">
                        <MapPin className="h-4 w-4 text-sky-700 transition group-hover:scale-110" />
                        <span className="text-sm text-slate-900">{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div
                className="rounded-3xl border border-slate-300 bg-slate-50/95 p-6 shadow-md sm:p-8"
                onMouseEnter={() => setIsTestimonialPaused(true)}
                onMouseLeave={() => setIsTestimonialPaused(false)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Kundenstimmen</p>
                    <p className="mt-1 text-sm text-slate-700">
                      Schwerpunkt: weniger Rückfragen, klarere Kontakte, bessere Planbarkeit.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    5.0
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                  >
                    {testimonials.map((item) => (
                      <div key={item.name} className="min-w-full p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => {
                              const filled = idx < item.rating;
                              return (
                                <Star
                                  key={idx}
                                  className={`h-4 w-4 ${filled ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                                />
                              );
                            })}
                          </div>
                          <span className="text-xs text-slate-600">{item.rating}/5</span>
                        </div>

                        <p className="mt-4 text-sm text-slate-800 leading-relaxed">„{item.quote}“</p>

                        <div className="mt-4 text-xs text-slate-700">
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p>{item.role}</p>
                        </div>

                        <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-700">
                          <BadgeCheck className="h-4 w-4" />
                          {item.result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setActiveTestimonial(index);
                          setIsTestimonialPaused(true);
                          window.setTimeout(() => setIsTestimonialPaused(false), 2500);
                        }}
                        className={`h-2.5 rounded-full transition ${
                          activeTestimonial === index ? "w-7 bg-sky-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Testimonial ${index + 1} anzeigen`}
                      />
                    ))}
                  </div>

                  <span className="text-xs text-slate-600">{isTestimonialPaused ? "Pausiert" : "Automatisch"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prozess – als Timeline + Zeiten integriert (CTA danach) */}
        <section className="relative px-4 py-10 sm:py-14" id="ablauf">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--lower-1" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">So läuft die Zusammenarbeit ab.</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 max-w-2xl text-sm text-slate-800 sm:text-base">
                Ein klarer Ablauf mit kurzer Zeit bis zur ersten Version – damit Sie zügig Feedback geben und wir schnell iterieren können.
              </p>
            </Reveal>

            <div className="mt-8 rounded-3xl border border-slate-300 bg-slate-50/95 p-6 shadow-md sm:p-8">
              <div className="grid gap-5">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === steps.length - 1;

                  return (
                    <Reveal key={step.title} delay={0.04 * index} y={24}>
                      <div className="relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
                            <Icon className="h-5 w-5" />
                          </div>
                          {!isLast && <div className="mt-2 h-full w-px bg-slate-300" />}
                        </div>

                        <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{step.title}</h3>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 shadow-sm">
                              Schritt {index + 1}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-slate-800">{step.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {timelineMeta.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <Reveal key={m.label} delay={0.03 * idx} y={18}>
                      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-700">{m.label}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{m.value}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Kontakt – Formular bewusst nach Prozess */}
        <section className="relative px-4 pb-12 pt-10 sm:pb-16 sm:pt-12" id="kontakt">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--lower-2" />
          </div>

          <div className="relative z-10">
            <Reveal>
              <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-emerald-300 bg-slate-50 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-emerald-200 sm:p-8">
                <div className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-emerald-200/45 blur-3xl" />

                <div className="relative grid gap-8 lg:grid-cols-2 lg:items-start">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Erstgespräch anfragen.</h2>
                    <p className="mt-3 text-sm text-slate-800 sm:text-base">
                      Erzählen Sie kurz, was Sie anbieten und was die Seite erreichen soll. Wir melden uns mit einem klaren Vorschlag für
                      Struktur, Vorgehen und Investition.
                    </p>

                    <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                          <BadgeCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Kurzer nächster Schritt</p>
                          <p className="mt-1 text-sm text-slate-800">
                            Formular ausfüllen (1–2 Minuten) – danach klären wir im Erstgespräch die wichtigsten Punkte und machen den nächsten
                            Schritt konkret.
                          </p>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs text-slate-700">
                              <MessageCircle className="h-4 w-4 text-emerald-700" />
                              20–30 Minuten Gespräch
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs text-slate-700">
                              <CalendarCheck className="h-4 w-4 text-emerald-700" />
                              Klarer Vorschlag statt Vage
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-5 text-xs text-slate-700">Keine Newsletter, kein Spam – wir melden uns persönlich.</p>
                  </div>

                  <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-slate-800">Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500"
                            placeholder="Max Mustermann"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-slate-800">E-Mail</label>
                          <input
                            type="email"
                            name="email"
                            required
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500"
                            placeholder="name@unternehmen.de"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-800">Unternehmen / Branche</label>
                        <input
                          type="text"
                          name="company"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500"
                          placeholder="z. B. Friseursalon, Restaurant, Praxis, Coaching …"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-800">Was soll Ihre Landing Page erreichen?</label>
                        <textarea
                          name="goal"
                          required
                          className="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500"
                          placeholder="z. B. mehr Terminanfragen, mehr Online-Buchungen, konkrete Aktion zu einem Angebot …"
                        />
                      </div>

                      {statusMessage && (
                        <p className={`text-xs ${statusType === "success" ? "text-emerald-700" : "text-red-600"}`}>{statusMessage}</p>
                      )}

                      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:-translate-y-0.5 hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? "Wird gesendet ..." : "Anfrage senden"}
                        </button>

                        <span className="inline-flex items-center gap-2 text-xs text-slate-700">
                          <ArrowUpRight className="h-4 w-4 text-emerald-700" />
                          Wir melden uns zeitnah zurück.
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ – CTA danach bewusst als „letzter Hinweis“ */}
        <section className="relative px-4 py-10 sm:py-14" id="faq">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--mid-1" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Häufige Fragen.</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 text-sm text-slate-800 sm:text-base">Kurz beantwortet – die Details klären wir im Gespräch.</p>
            </Reveal>

            <div className="mt-6 space-y-4">
              {faqs.map((item, index) => {
                const Icon = item.icon;
                const isOpen = openFaq === index;

                return (
                  <Reveal key={item.question} delay={0.04 * index} y={24}>
                    <div className="rounded-2xl border border-slate-300 bg-slate-50 shadow-md transition hover:-translate-y-1 hover:border-sky-500/80 hover:bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenFaq((prev) => (prev === index ? null : index))}
                        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-semibold text-slate-900 sm:text-base">{item.question}</span>
                        </div>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm">
                          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5">
                          <p className="text-sm text-slate-800">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="#kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:-translate-y-0.5 hover:bg-emerald-500"
              >
                Fragen klären im Erstgespräch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto mt-6 max-w-6xl px-4 pb-10 text-xs text-slate-600">
          <div className="flex flex-col gap-3 border-t border-slate-300 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Landex Digital. Alle Rechte vorbehalten.</p>

            {/* Navigationslinks + Legal */}
            <div className="flex flex-wrap gap-4">
              <Link href="#vorteile" className="hover:text-slate-900">
                Vorteile
              </Link>
              <Link href="#kennzahlen" className="hover:text-slate-900">
                Kennzahlen
              </Link>
              <Link href="#proof" className="hover:text-slate-900">
                Proof
              </Link>
              <Link href="#ablauf" className="hover:text-slate-900">
                Ablauf
              </Link>
              <Link href="#faq" className="hover:text-slate-900">
                FAQ
              </Link>
              <span className="mx-1 hidden text-slate-400 sm:inline">|</span>
              <Link href="/legal/AGB" className="hover:text-slate-900">
                AGB
              </Link>
              <Link href="/legal/DSGVO" className="hover:text-slate-900">
                Datenschutz
              </Link>
              <Link href="/legal/Impressum" className="hover:text-slate-900">
                Impressum
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

