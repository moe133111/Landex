// app/page.tsx
"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useEffect, useMemo, useState, FormEvent } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
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
} from "lucide-react";

type StatusType = "success" | "error" | null;

type Feature = {
  title: string;
  description: string;
  hoverHint: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "sky" | "emerald";
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
    tone: "emerald",
  },
  {
    title: "Mehr Anfragen, die passen",
    description: "Gute Botschaft + Vertrauen + CTA – ohne Umwege.",
    icon: Target,
    tone: "sky",
  },
  {
    title: "Weniger Rückfragen",
    description: "Die Seite beantwortet die wichtigsten Punkte vorab.",
    icon: MessageCircle,
    tone: "emerald",
  },
] as const;

const kpis = [
  {
    label: "Umgesetzte Landing Pages",
    value: "25+ Projekte",
    detail:
      "für lokale Unternehmen aus Dienstleistung, Gastronomie und Gesundheitsbereich.",
    icon: BadgeCheck,
  },
  {
    label: "Typischer Projektzeitraum",
    value: "2–4 Wochen",
    detail:
      "von der ersten Abstimmung bis zur fertigen, online geschalteten Landing Page.",
    icon: Timer,
  },
  {
    label: "Zeit bis zur ersten Version",
    value: "7–10 Tage",
    detail:
      "bei klar umrissenen Angeboten und vorhandenen Basisinhalten (Logo, Bilder, Kernaussagen).",
    icon: Rocket,
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

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<StatusType>(null);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Autoplay / Pause-on-hover für Testimonials
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  const features: Feature[] = useMemo(
    () => [
      {
        title: "Mehr Anfragen statt nur Besucher",
        description:
          "Struktur und klare Überschriften – damit aus Klicks echte Anfragen, Buchungen oder Verkäufe werden.",
        hoverHint:
          "Wir optimieren auf den nächsten Schritt: Anfrage, Termin, Buchung – nicht auf reine Seitenaufrufe.",
        icon: MousePointerClick,
        accent: "sky",
      },
      {
        title: "Perfekt für lokale Angebote",
        description:
          "Ideal für Dienstleister und Betriebe vor Ort – mit Fokus auf regionale Suchanfragen, Vertrauen und schnelle Kontaktwege.",
        hoverHint:
          "Ihre Zielgruppe soll sofort verstehen: Was bekomme ich, für wen ist es und wie geht es weiter?",
        icon: MapPin,
        accent: "emerald",
      },
      {
        title: "Individuell statt Baukasten",
        description:
          "Ein Design, das zu Ihrem Unternehmen passt – präzise, hochwertig und mit klarer Nutzerführung.",
        hoverHint:
          "Keine generischen Templates: Wir bauen eine Seite, die bewusst auf Ihr Ziel hin gestaltet ist.",
        icon: Palette,
        accent: "sky",
      },
    ],
    []
  );

  const steps: Step[] = useMemo(
    () => [
      {
        title: "Kurzes Gespräch",
        description:
          "In 20–30 Minuten klären wir Ziel, Angebot, Wunschkunden und vorhandenes Material (Logo, Bilder, Texte).",
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
          "Wir setzen die Landing Page technisch um, optimieren für Mobilgeräte und feilen an Details und Wirkung.",
        icon: Sparkles,
      },
      {
        title: "Live & messen",
        description:
          "Wir helfen bei Domain/Tracking und optionaler Kampagne – damit Sie sehen, wie viele Anfragen entstehen.",
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

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Autoplay: alle 5.5s, pausiert bei Hover
  useEffect(() => {
    if (isTestimonialPaused) return;

    const id = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => window.clearInterval(id);
  }, [isTestimonialPaused]);

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

        /* Hero Blobs (etwas kräftiger/verspielter) */
        .section-blob--hero-1 {
          width: 420px;
          height: 420px;
          top: -160px;
          left: -120px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(56, 189, 248, 0.98),
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
            rgba(59, 130, 246, 0.92),
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
            rgba(52, 211, 153, 0.9),
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
            rgba(129, 140, 248, 0.88),
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
            rgba(52, 211, 153, 0.92),
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
            rgba(56, 189, 248, 0.88),
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
            rgba(59, 130, 246, 0.9),
            transparent 66%
          );
          animation: blob3 16s ease-in-out infinite;
        }
        .section-blob--kpi-1 {
          width: 380px;
          height: 380px;
          top: -140px;
          right: -90px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(16, 185, 129, 0.7),
            transparent 70%
          );
          animation: blob1 18s ease-in-out infinite;
        }
        .section-blob--testimonials-1 {
          width: 360px;
          height: 360px;
          top: -120px;
          left: -90px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(52, 211, 153, 0.84),
            transparent 68%
          );
          animation: blob2 19s ease-in-out infinite;
        }
        .section-blob--contact-1 {
          width: 380px;
          height: 380px;
          top: -140px;
          right: -90px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(59, 130, 246, 0.92),
            transparent 66%
          );
          animation: blob1 15s ease-in-out infinite;
        }
        .section-blob--contact-2 {
          width: 340px;
          height: 340px;
          bottom: -140px;
          left: 25%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(52, 211, 153, 0.9),
            transparent 66%
          );
          animation: blob2 18s ease-in-out infinite;
        }

        /* Verspielte Floating-Icons */
        .floaty {
          position: absolute;
          pointer-events: none;
          opacity: 0.9;
          filter: drop-shadow(0 10px 18px rgba(2, 132, 199, 0.25));
          animation: floaty 6.5s ease-in-out infinite;
        }
        .floaty--slow {
          animation-duration: 9s;
        }
        .floaty--fast {
          animation-duration: 5.4s;
        }
        @keyframes floaty {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(0, -10px, 0) rotate(3deg);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
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
        {/* HERO */}
        <section className="relative px-4 py-12 sm:py-16 lg:py-20">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--hero-1" />
            <div className="section-blob section-blob--hero-2" />
            <div className="section-blob section-blob--hero-3" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center">
            <Reveal>
              <div className="flex-1">
                <div className="flex flex-col items-start gap-6">
                  <Link href="/" className="inline-flex items-center">
                    <img
                      src="/LandexDigital.svg"
                      alt="Landex Digital"
                      className="h-14 w-auto md:h-16"
                    />
                  </Link>

                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-400 bg-sky-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-800">
                    <Sparkles className="h-4 w-4 text-sky-700" />
                    Landing Pages für lokale Unternehmen
                    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Landing Pages,{" "}
                  <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                    die Besucher in Anfragen verwandeln.
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-balance text-base text-slate-800 sm:text-lg">
                  In einem kurzen Erstgespräch klären wir Ziel, Angebot und
                  Wunschkunden – danach bauen wir eine fokussierte Seite mit
                  klarer Führung, Vertrauen und einem eindeutigen nächsten
                  Schritt.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="#kontakt"
                    className="group inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/45 transition hover:-translate-y-0.5 hover:bg-sky-500"
                  >
                    Erstgespräch anfragen
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    href="#vorteile"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
                  >
                    Vorteile ansehen <ChevronDown className="h-4 w-4" />
                  </Link>
                </div>

                {/* Mini-Proof (kurz, geführt) */}
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {heroProof.map((item) => {
                    const Icon = item.icon;
                    const tone =
                      item.tone === "emerald"
                        ? "border-emerald-300 bg-emerald-50/70 text-emerald-800"
                        : "border-sky-300 bg-sky-50/70 text-sky-800";

                    return (
                      <div
                        key={item.title}
                        className={`group rounded-2xl border px-3 py-2 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${tone}`}
                      >
                        <div className="flex items-start gap-2">
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 opacity-90" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900">
                              {item.title}
                            </p>
                            <p className="mt-0.5 text-[0.72rem] text-slate-700">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex-1">
                <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-slate-300 bg-slate-50 p-6 shadow-2xl shadow-sky-300/60 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-sky-300">
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-sky-200/70 via-transparent to-blue-300/70 blur-xl" />

                  {/* Verspielte Floating-Icons auf der Karte */}
                  <div className="floaty -top-6 left-8 rounded-2xl border border-sky-300 bg-white/90 p-2">
                    <Sparkles className="h-5 w-5 text-sky-700" />
                  </div>
                  <div className="floaty floaty--slow -right-5 top-10 rounded-2xl border border-emerald-300 bg-white/90 p-2">
                    <Target className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="floaty floaty--fast bottom-6 -left-4 rounded-2xl border border-slate-300 bg-white/90 p-2">
                    <Wand2 className="h-5 w-5 text-slate-700" />
                  </div>

                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                      Was eine gute Landing Page bewirken kann
                    </h2>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                      <BadgeCheck className="h-4 w-4 text-emerald-700" />
                      Klar. Schnell. Führend.
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "Mehr Reservierungen / Termine",
                        description:
                          "Ein klarer Funnel statt „Scroll & Hoffnung“ – mit sichtbarer Aktion.",
                        icon: CalendarCheck,
                        tone: "emerald",
                      },
                      {
                        title: "Höhere Kontaktquote",
                        description:
                          "Starke Botschaft + Vertrauen + CTA – präzise auf Ihr Angebot.",
                        icon: MousePointerClick,
                        tone: "sky",
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      const dot =
                        item.tone === "emerald"
                          ? "bg-emerald-500"
                          : "bg-sky-500";

                      return (
                        <div
                          key={item.title}
                          className="group rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:border-sky-500/80 hover:bg-white hover:shadow-md"
                        >
                          <p className="flex items-center gap-2 text-xs font-semibold text-slate-900 sm:text-sm">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${dot} transition group-hover:scale-125`}
                            />
                            <Icon className="h-4 w-4 text-slate-700" />
                            {item.title}
                          </p>
                          <p className="mt-1 text-[0.7rem] text-slate-700 sm:text-xs">
                            {item.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-700">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                      <Timer className="h-4 w-4 text-slate-700" />
                      20–30 Min Erstgespräch
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                      <Sparkles className="h-4 w-4 text-sky-700" />
                      Copy & Design inklusive
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                      <BarChart3 className="h-4 w-4 text-emerald-700" />
                      Messbar statt Bauchgefühl
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3 BENEFITS (direkt nach Hero) */}
        <section className="relative px-4 py-10 sm:py-14" id="vorteile">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--mid-1" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Drei Dinge, die Ihre Landing Page leisten muss.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-slate-800 sm:text-base">
                    Nicht mehr Text – sondern klarere Führung: Botschaft,
                    Vertrauen und ein eindeutiger nächster Schritt.
                  </p>
                </div>

                <div className="text-xs text-slate-700 sm:text-sm">
                  <p className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-sky-700" />
                    Premium-sachlich, aber mit Persönlichkeit.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const accentRing =
                  feature.accent === "emerald"
                    ? "group-hover:shadow-emerald-200/70"
                    : "group-hover:shadow-sky-200/70";
                const iconBg =
                  feature.accent === "emerald"
                    ? "bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white"
                    : "bg-sky-100 text-sky-800 group-hover:bg-sky-600 group-hover:text-white";

                return (
                  <Reveal key={feature.title} delay={0.05 * index} y={30}>
                    <div
                      className={`group flex h-full flex-col gap-3 rounded-2xl border border-slate-300 bg-slate-50/95 p-5 shadow-md transition hover:-translate-y-1.5 hover:border-sky-500 hover:bg-white hover:shadow-lg ${accentRing}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition ${iconBg}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                            {feature.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-800">
                            {feature.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Details beim Hover
                        </span>
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

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-300 bg-slate-50/95 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Nächster Schritt: kurzes Erstgespräch
                  </p>
                  <p className="mt-1 text-sm text-slate-800">
                    Sie schildern kurz Ihr Angebot – wir skizzieren eine klare
                    Richtung für Struktur, Inhalte und Vorgehen.
                  </p>
                </div>
              </div>

              <Link
                href="#kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/45 transition hover:-translate-y-0.5 hover:bg-sky-500"
              >
                Erstgespräch anfragen
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* BRANCHEN (später, gestuft) */}
        <section className="relative px-4 py-10 sm:py-14" id="branchen">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--mid-2" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl rounded-3xl border border-slate-300 bg-slate-50/95 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <Reveal>
                <div className="max-w-md">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Für lokale Unternehmen gemacht.
                  </h2>
                  <p className="mt-3 text-sm text-slate-800 sm:text-base">
                    Ohne Fachsprache: Besucher sollen sofort verstehen, was Sie
                    anbieten – und wie sie den nächsten Schritt gehen.
                  </p>
                </div>
              </Reveal>

              <div className="mt-2 grid flex-1 grid-cols-1 gap-2 text-sm text-slate-900 sm:grid-cols-2">
                {industries.map((item, index) => (
                  <Reveal key={item} delay={0.03 * index} y={18}>
                    <div className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:-translate-y-1 hover:border-sky-500 hover:bg-white/90">
                      <MapPin className="h-4 w-4 text-emerald-700 transition group-hover:scale-110" />
                      <span>{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROZESS (mehr Icons, verspielter) */}
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
                Schlank im Prozess, präzise im Ergebnis: Sie liefern das
                Fachwissen – wir übersetzen es in eine überzeugende Seite mit
                klarer Führung.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.title} delay={0.04 * index} y={28}>
                    <div className="group relative flex gap-4 rounded-2xl border border-slate-300 bg-slate-50 p-5 shadow-md transition hover:-translate-y-1.5 hover:border-sky-500/80 hover:bg-white hover:shadow-lg">
                      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-sky-200/30 blur-2xl opacity-0 transition group-hover:opacity-100" />

                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 transition group-hover:bg-sky-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                            {step.title}
                          </h3>
                          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 shadow-sm">
                            Schritt {index + 1}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-slate-800">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-3xl border border-slate-300 bg-slate-50/95 p-5 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                <Timer className="h-4 w-4 text-slate-700" /> Erstgespräch: 20–30
                Minuten
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                <Sparkles className="h-4 w-4 text-sky-700" /> Copy & Design
                inklusive
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                <BarChart3 className="h-4 w-4 text-emerald-700" /> Fokus auf
                messbare Kontakte
              </div>
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
                    Orientierung in Zahlen.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm text-slate-800 sm:text-base">
                    Ergebnisse hängen immer von Angebot, Region und Kanälen ab.
                    Diese Kennzahlen helfen, Umfang und Ablauf realistisch
                    einzuordnen.
                  </p>
                </div>
                <Link
                  href="#kontakt"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
                >
                  Erstgespräch starten <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {kpis.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.label} delay={0.04 * index} y={22}>
                    <div className="group flex h-full flex-col rounded-2xl border border-slate-300 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-1.5 hover:border-sky-500/80 hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs font-medium text-slate-700 sm:text-sm">
                          {item.label}
                        </p>
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 transition group-hover:bg-emerald-600 group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">
                        {item.value}
                      </p>
                      <p className="mt-2 text-xs text-slate-700 sm:text-sm">
                        {item.detail}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials – Karussell (AUTO + Sterne) */}
        <section className="relative px-4 py-10 sm:py-14" id="stimmen">
          <div className="section-blob-wrapper">
            <div className="section-blob section-blob--testimonials-1" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Kundenstimmen.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 max-w-2xl text-sm text-slate-800 sm:text-base">
                Wichtig ist, ob die Seite im Alltag hilft: weniger Rückfragen,
                klarere Kontakte, bessere Planbarkeit.
              </p>
            </Reveal>

            <div className="mt-8 relative">
              <div
                className="overflow-hidden rounded-3xl border border-slate-300 bg-slate-50/95 p-4 shadow-md"
                onMouseEnter={() => setIsTestimonialPaused(true)}
                onMouseLeave={() => setIsTestimonialPaused(false)}
              >
                <div
                  className="flex transition-transform duration-700 ease-in-out"
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
                        {/* Sterne */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => {
                              const filled = idx < item.rating;
                              return (
                                <Star
                                  key={idx}
                                  className={`h-4 w-4 ${
                                    filled
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-slate-300"
                                  }`}
                                />
                              );
                            })}
                          </div>
                          <span className="text-xs text-slate-600">
                            {item.rating}/5
                          </span>
                        </div>

                        <p className="mt-4 text-sm text-slate-800 leading-relaxed">
                          „{item.quote}“
                        </p>

                        <div className="mt-4 text-xs text-slate-700">
                          <p className="font-semibold text-slate-900">
                            {item.name}
                          </p>
                          <p>{item.role}</p>
                        </div>

                        <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-700">
                          <BadgeCheck className="h-4 w-4" />
                          {item.result}
                        </p>
                      </div>
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
                        window.setTimeout(
                          () => setIsTestimonialPaused(false),
                          2500
                        );
                      }}
                      className={`h-2.5 rounded-full transition ${
                        activeTestimonial === index
                          ? "w-7 bg-sky-600"
                          : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Testimonial ${index + 1} anzeigen`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden text-xs text-slate-600 sm:inline">
                    {isTestimonialPaused ? "Pausiert" : "Automatisch"}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      prevTestimonial();
                      setIsTestimonialPaused(true);
                      window.setTimeout(
                        () => setIsTestimonialPaused(false),
                        2500
                      );
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-xs text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500 hover:text-sky-700"
                    aria-label="Vorherige Referenz"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      nextTestimonial();
                      setIsTestimonialPaused(true);
                      window.setTimeout(
                        () => setIsTestimonialPaused(false),
                        2500
                      );
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-xs text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500 hover:text-sky-700"
                    aria-label="Nächste Referenz"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ (Accordion) */}
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
                Kurz beantwortet – die Details klären wir im Gespräch.
              </p>
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
                        onClick={() =>
                          setOpenFaq((prev) => (prev === index ? null : index))
                        }
                        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 transition">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-semibold text-slate-900 sm:text-base">
                            {item.question}
                          </span>
                        </div>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm">
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
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
                className="group inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/45 transition hover:-translate-y-0.5 hover:bg-sky-500"
              >
                Fragen klären im Erstgespräch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Kontakt */}
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
                    Erstgespräch anfragen.
                  </h2>
                  <p className="mt-3 text-sm text-slate-800 sm:text-base">
                    Erzählen Sie kurz, was Sie anbieten und was die Seite
                    erreichen soll. Wir melden uns mit einem klaren Vorschlag
                    für Struktur, Vorgehen und Investition.
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
                        placeholder="z. B. mehr Terminanfragen, mehr Online-Buchungen, konkrete Aktion zu einem Angebot …"
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
                        className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/45 transition hover:-translate-y-0.5 hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? "Wird gesendet ..." : "Anfrage senden"}
                      </button>
                      <p className="text-xs text-slate-700">
                        Keine Newsletter, kein Spam – wir melden uns persönlich.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </Reveal>

            <footer className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-slate-300 pt-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} Landex Digital. Alle Rechte
                vorbehalten.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#vorteile" className="hover:text-slate-900">
                  Vorteile
                </Link>
                <Link href="#wie-wir-arbeiten" className="hover:text-slate-900">
                  Prozess
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
