// app/page.tsx
"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useState, FormEvent } from "react";

const features = [
  {
    title: "Mehr Anfragen statt nur Besucher",
    description:
      "Klare Struktur, starke Überschriften und überzeugende Call-to-Actions – damit aus Klicks echte Anfragen, Buchungen oder Bestellungen werden.",
  },
  {
    title: "Perfekt für lokale Angebote",
    description:
      "Ideal für Restaurants, Friseure, Praxen, Coaches, Handwerker, Fitnessstudios, Kosmetikstudios und alle anderen lokalen Dienstleister.",
  },
  {
    title: "Keine Baukasten-Optik",
    description:
      "Individuelles Design, das zu Ihrem Unternehmen passt – ohne generische Templates, sondern gezielt für Ihr Ziel entworfen.",
  },
];

const steps = [
  {
    title: "1. Kurzes Gespräch",
    description:
      "Wir klären in 20–30 Minuten: Ziel der Landing Page, Wunschkunden, Angebot, vorhandenes Material (Logo, Bilder, Texte).",
  },
  {
    title: "2. Konzept & Entwurf",
    description:
      "Wir entwickeln Struktur, Inhalte und Aufbau der Landing Page – von der Hauptbotschaft bis zu den Vertrauenselementen.",
  },
  {
    title: "3. Umsetzung & Feinschliff",
    description:
      "Wir setzen die Seite technisch um, optimieren für Mobilgeräte und passen alles so lange an, bis es wirklich stimmig ist.",
  },
  {
    title: "4. Live-Schaltung & Auswertung",
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
    label: "Friseursalon",
    goal: "Mehr Terminbuchungen",
    result: "+68% Online-Termine",
  },
  {
    label: "Restaurant",
    goal: "Mehr Reservierungen",
    result: "+42% Tischanfragen",
  },
  {
    label: "Praxis",
    goal: "Klare Erstkontakte",
    result: "+35% qualifizierte Anfragen",
  },
];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );

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
    <main className="relative min-h-screen bg-slate-950 text-slate-50">
      {/* Hintergrund-Effekte */}
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.16),_transparent_55%)]" />
        <div className="absolute left-1/2 top-1/3 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      {/* Subtiles Raster */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.55)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Hero */}
      <section className="relative px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
          {/* Text-Spalte */}
          <Reveal>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Landing Pages für lokale Unternehmen
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Wir bauen Landing Pages,{" "}
                <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  die aus Besuchern Kunden machen.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-balance text-base text-slate-200/80 sm:text-lg">
                Kein Baukasten, keine Spielerei. Wir planen und gestalten
                zielgerichtete Landing Pages, die genau das tun, was sie sollen:
                Anfragen, Termine oder Verkäufe für Ihr Unternehmen erzeugen.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="#kontakt"
                  className="group rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-400/40 transition hover:bg-sky-300"
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
                  className="text-sm font-medium text-slate-100/80 underline-offset-4 hover:underline"
                >
                  Wie wir arbeiten
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-300/80 sm:text-sm">
                <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Fokus auf kleine & lokale Unternehmen</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Direkte persönliche Abstimmung statt Baukasten</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Rechte Spalte: Ergebnis-Übersicht */}
          <Reveal delay={0.1}>
            <div className="flex-1">
              <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-2xl shadow-sky-950/70 backdrop-blur-sm">
                {/* dezente Umrandung */}
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/20 via-transparent to-blue-500/20 blur-xl" />

                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                    Was eine gute Landing Page bewirken kann
                  </h2>
                  <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[0.7rem] text-slate-300">
                    Beispiele aus echten Projekten
                  </span>
                </div>

                <p className="text-xs text-slate-300/85 sm:text-sm">
                  Jede Branche hat andere Ziele – aber das Prinzip ist immer
                  gleich: ein klares Angebot, ein roter Faden und ein eindeutiger
                  nächster Schritt.
                </p>

                {/* überarbeitete Stats-Karten: Inhalt vertikal angeordnet */}
                <div className="mt-5 space-y-3">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3"
                    >
                      <p className="text-xs font-semibold text-slate-100 sm:text-sm">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[0.7rem] text-slate-400 sm:text-xs">
                        {item.goal}
                      </p>
                      <p className="mt-2 text-xs font-semibold text-emerald-400 sm:text-sm">
                        {item.result}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-[0.75rem] sm:text-sm">
                  <span className="text-slate-300">
                    Sie bringen das Fachwissen mit, wir sorgen dafür, dass es
                    online verstanden wird.
                  </span>
                  <span className="rounded-full border border-sky-400/60 px-3 py-1 text-[0.7rem] text-sky-200">
                    Ideal für ein klares Hauptangebot
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vorteile */}
      <section className="px-4 py-10 sm:py-14" id="vorteile">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Was eine gute Landing Page für kleine Unternehmen leisten
                  muss.
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-200/80 sm:text-base">
                  Eine gute Landing Page ist kein „schönes Plakat“, sondern ein
                  klares System: verständliche Botschaft, logischer Aufbau,
                  Vertrauen und ein eindeutiges nächstes Schrittangebot.
                </p>
              </div>
              <div className="text-xs text-slate-300/80 sm:text-sm">
                <p>Wir kombinieren Gestaltung, Text und Struktur,</p>
                <p>damit Interessenten nicht nur schauen, sondern handeln.</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={0.05 * index} y={30}>
                <div className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:-translate-y-1 hover:border-sky-500/60 hover:bg-slate-900">
                  <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-300/85">
                    {feature.description}
                  </p>
                  <span className="mt-2 text-xs text-sky-300 opacity-0 transition group-hover:opacity-100">
                    Fokus: klare nächste Schritte statt „schöner“ Startseite.
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Branchen */}
      <section className="px-4 py-10 sm:py-14" id="branchen">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <Reveal>
              <div className="max-w-md">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Speziell für lokale und kleine Unternehmen.
                </h2>
                <p className="mt-3 text-sm text-slate-200/80 sm:text-base">
                  Wir sprechen nicht in Marketing-Fachbegriffen, sondern in
                  klaren Worten: Was bringen Ihnen mehr Besucher, wenn keine
                  Anfragen entstehen? Genau hier setzt eine gute Landing Page
                  an.
                </p>
              </div>
            </Reveal>
            <div className="mt-2 grid flex-1 grid-cols-1 gap-2 text-sm text-slate-200/90 sm:grid-cols-2">
              {industries.map((item, index) => (
                <Reveal key={item} delay={0.03 * index} y={18}>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prozess */}
      <section className="px-4 py-10 sm:py-14" id="wie-wir-arbeiten">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              So läuft die Zusammenarbeit ab.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 max-w-2xl text-sm text-slate-200/80 sm:text-base">
              Der Prozess ist bewusst schlank gehalten: Sie liefern das
              Fachwissen zu Ihrem Angebot, wir übersetzen es in eine klare,
              überzeugende Online-Präsenz.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={0.04 * index} y={28}>
                <div className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <div className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-sky-400/15 text-center text-xs font-semibold leading-8 text-sky-300">
                    {step.title.split(".")[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300/85">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-10 sm:py-14" id="faq">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Häufige Fragen.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 text-sm text-slate-200/80 sm:text-base">
              Kurz und verständlich beantwortet – ohne Fachchinesisch.
            </p>
          </Reveal>

          <div className="mt-6 space-y-4">
            {faqs.map((item, index) => (
              <Reveal key={item.question} delay={0.04 * index} y={24}>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300/85">
                    {item.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt / Abschluss-CTA */}
      <section className="px-4 pb-12 pt-10 sm:pb-16 sm:pt-12" id="kontakt">
        <Reveal>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-sky-500/40 bg-slate-900/80 p-6 sm:p-8">
            <div className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Lassen Sie uns über Ihre Landing Page sprechen.
              </h2>
              <p className="mt-3 text-sm text-slate-200/85 sm:text-base">
                Erzählen Sie uns kurz, was Sie anbieten und was eine Landing
                Page für Sie erreichen soll. Wir melden uns mit einem klaren
                Vorschlag für Vorgehen, Inhalte und Investition.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-200/90">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400"
                      placeholder="Max Mustermann"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-200/90">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-400"
                      placeholder="name@unternehmen.de"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-200/90">
                    Unternehmen / Branche
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-400"
                    placeholder="z. B. Friseursalon, Restaurant, Praxis, Coaching …"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-200/90">
                    Was soll Ihre Landing Page erreichen?
                  </label>
                  <textarea
                    name="goal"
                    required
                    className="min-h-[110px] w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-400"
                    placeholder="z. B. mehr Terminanfragen, mehr Online-Buchungen, konkrete Aktion zu einem Angebot, Kampagne für ein neues Produkt …"
                  />
                </div>

                {statusMessage && (
                  <p
                    className={`text-xs ${
                      statusType === "success"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-400/40 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting
                      ? "Wird gesendet ..."
                      : "Unverbindliche Anfrage senden"}
                  </button>
                  <p className="text-xs text-slate-400">
                    Keine Newsletter, kein Spam – wir melden uns persönlich bei
                    Ihnen.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Reveal>

        <footer className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-slate-800 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Landing-Page-Service. Alle Rechte
            vorbehalten.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#vorteile" className="hover:text-slate-300">
              Vorteile
            </Link>
            <Link href="#branchen" className="hover:text-slate-300">
              Branchen
            </Link>
            <Link href="#faq" className="hover:text-slate-300">
              FAQ
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
