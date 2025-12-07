// app/page.tsx
"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useState, FormEvent, useEffect } from "react";

const features = [
  {
    title: "Mehr Anfragen statt nur Besucher",
    description:
      "Klare Struktur, starke Überschriften und überzeugende Call-to-Actions – damit aus Klicks echte Anfragen, Buchungen oder Bestellungen werden.",
    hoverHint:
      "Fokus auf konkrete Aktionen wie Anfrage, Termin oder Buchung – nicht nur auf Seitenaufrufe.",
  },
  {
    title: "Perfekt für lokale Angebote",
    description:
      "Ideal für Restaurants, Friseure, Praxen, Coaches, Handwerker, Fitnessstudios, Kosmetikstudios und alle anderen lokalen Dienstleister.",
    hoverHint:
      "Landing Pages, die auf lokale Zielgruppen, Suchanfragen und regionale Besonderheiten zugeschnitten sind.",
  },
  {
    title: "Keine Baukasten-Optik",
    description:
      "Individuelles Design, das zu Ihrem Unternehmen passt – ohne generische Templates, sondern gezielt für Ihr Ziel entworfen.",
    hoverHint:
      "Statt Einheitslayout entsteht eine Seite, die sich klar von typischen Baukasten-Websites absetzt.",
  },
];

const steps = [
  {
    title: "Kurzes Gespräch",
    description:
      "Wir klären in 20–30 Minuten: Ziel der Landing Page, Wunschkunden, Angebot, vorhandenes Material (Logo, Bilder, Texte).",
  },
  {
    title: "Konzept & Entwurf",
    description:
      "Wir entwickeln Struktur, Inhalte und Aufbau der Landing Page – von der Hauptbotschaft bis zu den Vertrauenselementen.",
  },
  {
    title: "Umsetzung & Feinschliff",
    description:
      "Wir setzen die Seite technisch um, optimieren für Mobilgeräte und passen alles so lange an, bis es wirklich stimmig ist.",
  },
  {
    title: "Live-Schaltung & Auswertung",
    description:
      "Wir helfen bei Domain, Tracking und ggf. Werbeanzeigen – damit Sie sehen, wie viele Anfragen über die Seite kommen.",
  },
];

const faqs = [
  {
    question: "Für wen ist dieser Service gedacht?",
    answer:
      "Für kleine Unternehmen, Selbstständige und lokale Betriebe, die ein klares Angebot haben und mehr Anfragen oder Buchungen über das Internet erhalten möchten – ohne sich selbst mit Technik und Marketing beschäftigen zu müssen.",
  },
  {
    question: "Brauche ich schon eine Website?",
    answer:
      "Nein. Eine Landing Page kann Ihre erste Online-Präsenz sein oder eine Ergänzung zu einer bestehenden Website, um ein bestimmtes Angebot gezielt zu bewerben.",
  },
  {
    question: "Was kostet eine Landing Page?",
    answer:
      "Das hängt vom Umfang ab (z. B. Anzahl der Sektionen, Mehrsprachigkeit, Einbindung von Buchungssystemen). Im Erstgespräch klären wir Ihr Ziel und machen Ihnen ein klares, transparentes Angebot.",
  },
  {
    question: "Wie lange dauert es, bis die Landing Page online ist?",
    answer:
      "In vielen Fällen kann eine erste Version innerhalb weniger Tage stehen – vorausgesetzt, die nötigen Inhalte (Texte, Bilder, Logo) sind vorhanden.",
  },
];

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

const heroStats = [
  {
    title: "Mehr Terminbuchungen für Ihren Friseursalon",
    description:
      "Klare Darstellung Ihres Angebots, Öffnungszeiten und Online-Buchungsoptionen auf einer fokussierten Seite.",
  },
  {
    title: "Mehr Reservierungen für Ihr Restaurant",
    description:
      "Eine Seite, die Speisekarte, Lage, Öffnungszeiten und Reservierungsmöglichkeiten übersichtlich bündelt.",
  },
  {
    title: "Mehr passende Erstkontakte für Ihre Praxis",
    description:
      "Strukturierte Informationen zu Leistungen, Abläufen und Kontaktwegen, damit neue Patientinnen und Patienten wissen, wie der erste Schritt aussieht.",
  },
];

const kpis = [
  {
    label: "Umgesetzte Landing Pages",
    value: "25+ Projekte",
    detail:
      "für lokale Unternehmen aus Dienstleistung, Gastronomie und Gesundheitsbereich.",
  },
  {
    label: "Typischer Projektzeitraum",
    value: "2–4 Wochen",
    detail:
      "von der ersten Abstimmung bis zur fertigen, online geschalteten Landing Page.",
  },
  {
    label: "Zeit bis zur ersten Version",
    value: "7–10 Tage",
    detail:
      "bei klar umrissenen Angeboten und vorhandenen Basisinhalten (Logo, Bilder, Kernaussagen).",
  },
];

const testimonials = [
  {
    name: "Julia M.",
    role: "Inhaberin eines Friseursalons in Berlin",
    quote:
      "Wir hatten vorher nur einen Google-Eintrag. Über die neue Landing Page kommen jetzt gezielt Termin-Anfragen, die auch wirklich zu unserem Angebot passen.",
    result: "Mehr planbare Online-Termine über einen klaren Buchungsfunnel.",
  },
  {
    name: "Kemal A.",
    role: "Betreiber eines Restaurants in Köln",
    quote:
      "Die Seite nimmt unseren Gästen die wichtigsten Fragen vorweg – Öffnungszeiten, Reservierung, Speisekarte. Seitdem bekommen wir deutlich mehr Reservierungen über das Formular.",
    result: "Stabilere Auslastung unter der Woche durch Online-Reservierungen.",
  },
  {
    name: "Dr. Lisa M.",
    role: "Inhaberin einer Praxis in München",
    quote:
      "Für Erstkontakte ist die Landing Page ideal. Neue Patientinnen und Patienten wissen genau, für welche Themen die Praxis geeignet ist und wie sie einen Termin bekommen.",
    result: "Besser vorbereitete Erstkontakte mit weniger Rückfragen am Telefon.",
  },
];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setStatusType(null);

    const formData = new FormData(e.currentTarget);

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
        e.currentTarget.reset();
      } else {
        setStatusType("error");
        setStatusMessage(
          "Es ist ein Fehler beim Senden der Nachricht aufgetreten."
        );
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
      {/* Globales, dezentes Raster im Hintergrund */}
      <div className="page-bg">
        <div className="page-bg-grid" />
      </div>

      {/* Globale Styles für Hintergrund & section-basierte Blobs */}
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

        /* WICHTIG: keine 110vw mehr, kein horizontaler Offset, Overflow wird gekappt */
        .section-blob-wrapper {
          position: absolute;
          top: -80px;
          bottom: -80px;
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
            rgba(0, 0, 0, 0.85) 10%,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0.85) 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.85) 10%,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0.85) 90%,
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

        /* Hero-Blobs */
        .section-blob--hero-1 {
          width: 360px;
          height: 360px;
          top: -140px;
          left: -90px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(56, 189, 248, 0.95),
            transparent 65%
          );
          animation: blob1 14s ease-in-out infinite;
        }

        .section-blob--hero-2 {
          width: 420px;
          height: 420px;
          top: 45%;
          right: -160px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(59, 130, 246, 0.9),
            transparent 65%
          );
          animation: blob2 16s ease-in-out infinite;
        }

        /* Vorteile / Branchen-Bereich */
        .section-blob--mid-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          right: -140px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(129, 140, 248, 0.9),
            transparent 65%
          );
          animation: blob3 15s ease-in-out infinite;
        }

        .section-blob--mid-2 {
          width: 320px;
          height: 320px;
          bottom: -120px;
          left: 10%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(52, 211, 153, 0.95),
            transparent 65%
          );
          animation: blob1 17s ease-in-out infinite;
        }

        /* Prozess / KPI / Testimonials / FAQ-Bereich */
        .section-blob--lower-1 {
          width: 360px;
          height: 360px;
          top: -100px;
          left: 20%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(56, 189, 248, 0.9),
            transparent 65%
          );
          animation: blob2 17s ease-in-out infinite;
        }

        .section-blob--lower-2 {
          width: 380px;
          height: 380px;
          bottom: -140px;
          right: -120px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(59, 130, 246, 0.9),
            transparent 65%
          );
          animation: blob3 16s ease-in-out infinite;
        }

        /* KPI-Bereich */
        .section-blob--kpi-1 {
          width: 360px;
          height: 360px;
          top: -120px;
          right: -80px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(79, 70, 229, 0.9),
            transparent 65%
          );
          animation: blob1 18s ease-in-out infinite;
        }

        /* Testimonials-Bereich */
        .section-blob--testimonials-1 {
          width: 340px;
          height: 340px;
          top: -100px;
          left: -80px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(52, 211, 153, 0.9),
            transparent 65%
          );
          animation: blob2 19s ease-in-out infinite;
        }

        /* Kontakt-Bereich */
        .section-blob--contact-1 {
          width: 360px;
          height: 360px;
          top: -120px;
          right: -80px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(59, 130, 246, 0.95),
            transparent 65%
          );
          animation: blob1 15s ease-in-out infinite;
        }

        .section-blob--contact-2 {
          width: 320px;
          height: 320px;
          bottom: -120px;
          left: 25%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(52, 211, 153, 0.95),
            transparent 65%
          );
          animation: blob2 18s ease-in-out infinite;
        }

        @keyframes blob1 {
          0% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
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
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          }
        }

        @keyframes blob2 {
          0% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
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
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          }
        }

        @keyframes blob3 {
          0% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
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
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          }
        }
      `}</style>

      {/* Inhaltsebene über dem Hintergrund */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="relative px-4 py-12 sm:py-16 lg:py-20">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--hero-1" />
            <div className="section-blob section-blob--hero-2" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
            <Reveal>
              <div className="flex-1">
                {/* Logo + Badge gruppiert */}
                <div className="flex flex-col items-start gap-6">
                  <Link href="/" className="inline-flex items-center">
                    <img
                      src="/LandexDigital.svg"
                      alt="Landex Digital"
                      className="h-14 w-auto md:h-16"
                    />
                  </Link>

                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-400 bg-sky-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Landing Pages für lokale Unternehmen
                  </div>
                </div>

                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Wir bauen Landing Pages,{" "}
                  <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                    die aus Besuchern Kunden machen.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-balance text-base text-slate-800 sm:text-lg">
                  Kein Baukasten, keine Spielerei. Wir planen und gestalten
                  zielgerichtete Landing Pages, die genau das tun, was sie
                  sollen: Anfragen, Termine oder Verkäufe für Ihr Unternehmen
                  erzeugen.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="#kontakt"
                    className="group rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/50 transition hover:-translate-y-0.5 hover:bg-sky-500"
                  >
                    <span className="inline-flex items-center gap-2">
                      Unverbindliches Erstgespräch anfragen
                      <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </span>
                  </Link>
                  <Link
                    href="#wie-wir-arbeiten"
                    className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
                  >
                    Wie wir arbeiten
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-800 sm:text-sm">
                  <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>Fokus auf kleine & lokale Unternehmen</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>Direkte persönliche Abstimmung statt Baukasten</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex-1">
                <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-slate-300 bg-slate-50 p-6 shadow-2xl shadow-sky-300/70 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-sky-300">
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-sky-200/70 via-transparent to-blue-300/70 blur-xl" />

                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                      Was eine gute Landing Page bewirken kann
                    </h2>
                  </div>

                  <div className="mt-5 space-y-3">
                    {heroStats.map((item) => (
                      <div
                        key={item.title}
                        className="group rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:border-sky-500/80 hover:bg-white hover:shadow-md"
                      >
                        <p className="flex items-center gap-2 text-xs font-semibold text-slate-900 sm:text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 group-hover:bg-emerald-500 transition" />
                          {item.title}
                        </p>
                        <p className="mt-1 text-[0.7rem] text-slate-700 sm:text-xs">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Vorteile */}
        <section className="relative px-4 py-10 sm:py-14" id="vorteile">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--mid-1" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Was eine gute Landing Page für kleine Unternehmen leisten
                    muss.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-slate-800 sm:text-base">
                    Eine gute Landing Page ist kein „schönes Plakat“, sondern
                    ein klares System: verständliche Botschaft, logischer
                    Aufbau, Vertrauen und ein eindeutiges nächstes
                    Schrittangebot.
                  </p>
                </div>
                <div className="text-xs text-slate-700 sm:text-sm">
                  <p>Wir kombinieren Gestaltung, Text und Struktur,</p>
                  <p>damit Interessenten nicht nur schauen, sondern handeln.</p>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={0.05 * index} y={30}>
                  <div className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-300 bg-slate-50/95 p-5 shadow-md transition hover:-translate-y-1.5 hover:border-sky-500 hover:bg-white">
                    <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-800">
                      {feature.description}
                    </p>
                    <span className="mt-2 text-xs text-sky-800 opacity-0 transition group-hover:opacity-100">
                      {feature.hoverHint}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Branchen */}
        <section className="relative px-4 py-10 sm:py-14" id="branchen">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--mid-2" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl rounded-3xl border border-slate-300 bg-slate-50/95 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <Reveal>
                <div className="max-w-md">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Speziell für lokale und kleine Unternehmen.
                  </h2>
                  <p className="mt-3 text-sm text-slate-800 sm:text-base">
                    Wir sprechen nicht in Marketing-Fachbegriffen, sondern in
                    klaren Worten: Was bringen Ihnen mehr Besucher, wenn keine
                    Anfragen entstehen? Genau hier setzt eine gute Landing Page
                    an.
                  </p>
                </div>
              </Reveal>
              <div className="mt-2 grid flex-1 grid-cols-1 gap-2 text-sm text-slate-900 sm:grid-cols-2">
                {industries.map((item, index) => (
                  <Reveal key={item} delay={0.03 * index} y={18}>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:-translate-y-1 hover:border-sky-500 hover:bg-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-600 transition group-hover:bg-emerald-500" />
                      <span>{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prozess */}
        <section className="relative px-4 py-10 sm:py-14" id="wie-wir-arbeiten">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--lower-1" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                So läuft die Zusammenarbeit ab.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 max-w-2xl text-sm text-slate-800 sm:text-base">
                Der Prozess ist bewusst schlank gehalten: Sie liefern das
                Fachwissen zu Ihrem Angebot, wir übersetzen es in eine klare,
                überzeugende Online-Präsenz.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={0.04 * index} y={28}>
                  <div className="group flex gap-4 rounded-2xl border border-slate-300 bg-slate-50 p-5 shadow-md transition hover:-translate-y-1.5 hover:border-sky-500/80 hover:bg-white">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-800 transition group-hover:bg-sky-600 group-hover:text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-800">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* KPIs / Ergebnisse */}
        <section className="relative px-4 py-10 sm:py-14" id="ergebnisse">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--kpi-1" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl rounded-3xl border border-slate-300 bg-slate-50 p-6 shadow-md sm:p-8">
            <Reveal>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Was unsere Landing Pages in der Praxis zeigen.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm text-slate-800 sm:text-base">
                    Die genauen Ergebnisse hängen immer von Angebot, Region und
                    bestehenden Kanälen ab. Die Kennzahlen helfen, die
                    Größenordnung und den Rahmen der Zusammenarbeit einzuordnen.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {kpis.map((item, index) => (
                <Reveal key={item.label} delay={0.04 * index} y={22}>
                  <div className="group flex h-full flex-col rounded-2xl border border-slate-300 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-1.5 hover:border-sky-500/80 hover:shadow-md">
                    <p className="text-xs font-medium text-slate-700 sm:text-sm">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">
                      {item.value}
                    </p>
                    <p className="mt-2 text-xs text-slate-700 sm:text-sm">
                      {item.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Kundenstimmen / Testimonials – Karussell */}
        <section className="relative px-4 py-10 sm:py-14" id="stimmen">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--testimonials-1" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Was Kundinnen und Kunden über die Zusammenarbeit sagen.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 max-w-2xl text-sm text-slate-800 sm:text-base">
                Die Rückmeldungen sind für uns wichtiger als einzelne
                Kennzahlen. Sie zeigen, ob die Landing Page im Alltag wirklich
                hilft – bei Anfragen, Planung und Kommunikation.
              </p>
            </Reveal>

            <div className="mt-8 relative">
              <div className="overflow-hidden rounded-3xl border border-slate-300 bg-slate-50/95 p-4 shadow-md">
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${activeTestimonial * 100}%)`,
                  }}
                >
                  {testimonials.map((item) => (
                    <div
                      key={item.name}
                      className="min-w-full px-1 py-2 sm:px-4 sm:py-4"
                    >
                      <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-500/80 hover:shadow-md">
                        <p className="text-sm text-slate-800 leading-relaxed">
                          „{item.quote}“
                        </p>
                        <div className="mt-4 text-xs text-slate-700">
                          <p className="font-semibold text-slate-900">
                            {item.name}
                          </p>
                          <p>{item.role}</p>
                        </div>
                        <p className="mt-3 text-xs font-medium text-emerald-700">
                          {item.result}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-2.5 rounded-full transition ${
                        activeTestimonial === index
                          ? "w-6 bg-sky-600"
                          : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Testimonial ${index + 1} anzeigen`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prevTestimonial}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xs text-slate-700 shadow-sm transition hover:border-sky-500 hover:text-sky-700"
                    aria-label="Vorherige Referenz"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={nextTestimonial}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xs text-slate-700 shadow-sm transition hover:border-sky-500 hover:text-sky-700"
                    aria-label="Nächste Referenz"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-4 py-10 sm:py-14" id="faq">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--lower-2" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Häufige Fragen.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 text-sm text-slate-800 sm:text-base">
                Kurz und verständlich beantwortet – ohne Fachchinesisch.
              </p>
            </Reveal>

            <div className="mt-6 space-y-4">
              {faqs.map((item, index) => (
                <Reveal key={item.question} delay={0.04 * index} y={24}>
                  <div className="group rounded-2xl border border-slate-300 bg-slate-50 p-5 shadow-md transition hover:-translate-y-1 hover:border-sky-500/80 hover:bg-white">
                    <h3 className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-900 sm:text-base">
                      <span>{item.question}</span>
                      <span className="text-xs text-sky-600 opacity-0 transition group-hover:opacity-100">
                        ?
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-slate-800">
                      {item.answer}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Kontakt / Abschluss-CTA */}
        <section
          className="relative px-4 pb-12 pt-10 sm:pb-16 sm:pt-12"
          id="kontakt"
        >
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--contact-1" />
            <div className="section-blob section-blob--contact-2" />
          </div>

          <div className="relative z-10">
            <Reveal>
              <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-sky-400 bg-slate-50 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-sky-300 sm:p-8">
                <div className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-sky-200/60 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-emerald-200/50 blur-3xl" />

                <div className="relative">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Lassen Sie uns über Ihre Landing Page sprechen.
                  </h2>
                  <p className="mt-3 text-sm text-slate-800 sm:text-base">
                    Erzählen Sie uns kurz, was Sie anbieten und was eine Landing
                    Page für Sie erreichen soll. Wir melden uns mit einem klaren
                    Vorschlag für Vorgehen, Inhalte und Investition.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-800">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-sky-500"
                          placeholder="Max Mustermann"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-800">
                          E-Mail
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 placeholder:text-slate-400"
                          placeholder="name@unternehmen.de"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-800">
                        Unternehmen / Branche
                      </label>
                      <input
                        type="text"
                        name="company"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 placeholder:text-slate-400"
                        placeholder="z. B. Friseursalon, Restaurant, Praxis, Coaching …"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-800">
                        Was soll Ihre Landing Page erreichen?
                      </label>
                      <textarea
                        name="goal"
                        required
                        className="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 placeholder:text-slate-400"
                        placeholder="z. B. mehr Terminanfragen, mehr Online-Buchungen, konkrete Aktion zu einem Angebot, Kampagne für ein neues Produkt …"
                      />
                    </div>

                    {statusMessage && (
                      <p
                        className={`text-xs ${
                          statusType === "success"
                            ? "text-emerald-700"
                            : "text-red-600"
                        }`}
                      >
                        {statusMessage}
                      </p>
                    )}

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/50 transition hover:-translate-y-0.5 hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting
                          ? "Wird gesendet ..."
                          : "Unverbindliche Anfrage senden"}
                      </button>
                      <p className="text-xs text-slate-700">
                        Keine Newsletter, kein Spam – wir melden uns persönlich
                        bei Ihnen.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </Reveal>

            <footer className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-slate-300 pt-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} Landing-Page-Service. Alle Rechte
                vorbehalten.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#vorteile" className="hover:text-slate-900">
                  Vorteile
                </Link>
                <Link href="#branchen" className="hover:text-slate-900">
                  Branchen
                </Link>
                <Link href="#faq" className="hover:text-slate-900">
                  FAQ
                </Link>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
