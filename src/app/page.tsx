// app/page.tsx
"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight, BadgeCheck, BarChart3, CalendarCheck, CheckCircle2,
  ChevronDown, ChevronUp, Eye, MapPin, MessageCircle, MousePointerClick,
  Palette, Phone, Rocket, Sparkles, Star, Target, Timer, TrendingUp,
  Users, Wand2, X, SlidersHorizontal, Zap, Clock, ThumbsUp, Globe,
} from "lucide-react";

type StatusType = "success" | "error" | null;
type Feature = { title: string; description: string; hoverHint: string; icon: React.ComponentType<{ className?: string }>; };
type Step = { title: string; description: string; icon: React.ComponentType<{ className?: string }>; };

/* ─── DATA ────────────────────────────────────────────────────────────── */

const industries = [
  { name: "Restaurants & Cafés", icon: "🍽️", stat: "Mehr Reservierungen" },
  { name: "Friseure & Barbiere", icon: "✂️", stat: "Mehr Terminbuchungen" },
  { name: "Kosmetik- & Nagelstudios", icon: "💅", stat: "Mehr Neukunden" },
  { name: "Physio- & Heilpraxen", icon: "🩺", stat: "Weniger Rückfragen" },
  { name: "Coaches & Berater", icon: "🎯", stat: "Mehr Erstgespräche" },
  { name: "Personal Trainer & Studios", icon: "💪", stat: "Mehr Anfragen" },
  { name: "Handwerksbetriebe", icon: "🔧", stat: "Mehr Aufträge" },
  { name: "Lokale Dienstleister", icon: "📍", stat: "Mehr Leads" },
];

const faqs = [
  { question: "Für wen ist dieser Service gedacht?", answer: "Für kleine Unternehmen, Selbstständige und lokale Betriebe, die ein klares Angebot haben und mehr Anfragen oder Buchungen über das Internet erhalten möchten – ohne sich selbst mit Technik und Marketing beschäftigen zu müssen.", icon: Users },
  { question: "Brauche ich schon eine Website?", answer: "Nein. Eine Landing Page kann Ihre erste Online-Präsenz sein oder eine Ergänzung zu einer bestehenden Website, um ein bestimmtes Angebot gezielt zu bewerben.", icon: Rocket },
  { question: "Was kostet eine Landing Page?", answer: "Das hängt vom Umfang ab – z. B. Anzahl der Sektionen, Mehrsprachigkeit oder Einbindung von Buchungssystemen. Im Erstgespräch klären wir Ihr Ziel und machen Ihnen ein klares, transparentes Angebot.", icon: BarChart3 },
  { question: "Wie lange dauert es, bis die Landing Page online ist?", answer: "In vielen Fällen kann eine erste Version innerhalb weniger Tage stehen – vorausgesetzt, die nötigen Inhalte (Texte, Bilder, Logo) sind vorhanden.", icon: Timer },
];

const heroProof = [
  { title: "Mehr Terminbuchungen", description: "Klarer Ablauf + sichtbarer nächster Schritt statt nur Infos.", icon: CalendarCheck },
  { title: "Mehr Anfragen, die passen", description: "Gute Botschaft + Vertrauen + CTA – ohne Umwege.", icon: Target },
  { title: "Weniger Rückfragen", description: "Die Seite beantwortet die wichtigsten Punkte vorab.", icon: MessageCircle },
] as const;

const timelineMeta = [
  { label: "Erstgespräch", value: "20–30 Min.", icon: MessageCircle },
  { label: "Erste Version", value: "7–10 Tage", icon: Rocket },
  { label: "Projektdauer", value: "2–4 Wochen", icon: Timer },
];

const testimonials = [
  { name: "Julia M.", role: "Friseursalon", city: "Berlin", rating: 5, quote: "Wir hatten vorher nur einen Google-Eintrag. Über die neue Landing Page kommen jetzt gezielt Termin-Anfragen, die auch wirklich zu unserem Angebot passen.", result: "Mehr planbare Online-Termine über einen klaren Buchungsfunnel.", metric: "+40%", metricLabel: "Buchungen" },
  { name: "Kemal A.", role: "Restaurant", city: "Köln", rating: 5, quote: "Die Seite nimmt unseren Gästen die wichtigsten Fragen vorweg – Öffnungszeiten, Reservierung, Speisekarte. Seitdem bekommen wir deutlich mehr Reservierungen über das Formular.", result: "Stabilere Auslastung unter der Woche durch Online-Reservierungen.", metric: "+55%", metricLabel: "Reservierungen" },
  { name: "Dr. Lisa M.", role: "Heilpraxis", city: "München", rating: 5, quote: "Für Erstkontakte ist die Landing Page ideal. Neue Patienten wissen genau, für welche Themen die Praxis geeignet ist und wie sie einen Termin bekommen.", result: "Besser vorbereitete Erstkontakte mit weniger Rückfragen am Telefon.", metric: "-60%", metricLabel: "Rückfragen" },
];

const heroFloats = [
  { icon: CalendarCheck, color: "emerald", label: "Neue Buchungsanfrage", sub: "Friseursalon · Berlin", delay: "0s", animClass: "float-a" },
  { icon: TrendingUp, color: "sky", label: "+31% mehr Anfragen", sub: "Physiotherapie · München", delay: "0.8s", animClass: "float-b" },
  { icon: Star, color: "amber", label: "5.0 ★ Bewertung", sub: "Restaurant · Köln", delay: "1.4s", animClass: "float-a" },
];

const marqueeItems = [
  "Restaurants & Cafés", "Friseure & Barbiere", "Physio- & Heilpraxen",
  "Coaches & Berater", "Personal Trainer", "Handwerksbetriebe", "Kosmetikstudios",
  "Lokale Dienstleister", "Landing Pages die konvertieren",
  "Strategie · Copy · Design · Code", "Aus einer Hand", "Klar · Fokussiert · Wirksam",
];

const typedVariants = [
  "für Ihren Friseursalon.",
  "für Ihr Restaurant.",
  "für Ihre Praxis.",
  "für Ihr Coaching.",
  "für Ihr Handwerk.",
];

const navSections = [
  { id: "hero", label: "Start" }, { id: "vorteile", label: "Vorteile" },
  { id: "kennzahlen", label: "Zahlen" }, { id: "proof", label: "Referenzen" },
  { id: "vergleich", label: "Vergleich" }, { id: "ablauf", label: "Ablauf" },
  { id: "kontakt", label: "Kontakt" }, { id: "faq", label: "FAQ" },
];

const mockupPages = [
  { label: "Friseursalon", color: "#10b981", bg: "#0a1628", headline: "Ihr Lieblingsfriseur in München", sub: "Online buchen in 2 Minuten", cta: "Termin wählen", nav: ["Leistungen", "Preise", "Kontakt"], trust: "★★★★★  4,9 · 180 Bewertungen" },
  { label: "Restaurant", color: "#f59e0b", bg: "#0f0a00", headline: "Tisch reservieren – sofort & ohne Anruf", sub: "Verfügbare Zeiten direkt einsehen", cta: "Jetzt reservieren", nav: ["Menü", "Öffnungszeiten", "Lage"], trust: "★★★★★  4,8 · 230 Bewertungen" },
  { label: "Heilpraxis", color: "#38bdf8", bg: "#00101a", headline: "Ersttermin online buchen", sub: "Unkompliziert – auch am Abend", cta: "Termin anfragen", nav: ["Angebot", "Praxis", "Kontakt"], trust: "★★★★★  5,0 · 90 Bewertungen" },
];

function formatNumberDE(n: number) {
  return new Intl.NumberFormat("de-DE").format(n);
}

/* ─── COOKIE BANNER ───────────────────────────────────────────────────── */
type CookieConsent = { necessary: true; analytics: boolean; marketing: boolean; timestamp: string; version: number; };
const CONSENT_STORAGE_KEY = "cookie_consent_v1";
const CONSENT_COOKIE_NAME = "cookie_consent_v1";
const CONSENT_VERSION = 1;

function setCookie(name: string, value: string, days = 180) {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${days * 24 * 3600}; SameSite=Lax`;
}
function readStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (!parsed || parsed.version !== CONSENT_VERSION || parsed.necessary !== true) return null;
    return parsed;
  } catch { return null; }
}
function storeConsent(consent: CookieConsent) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent)); } catch {}
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(consent));
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    const existing = readStoredConsent();
    if (!existing) { setVisible(true); return; }
    setAnalytics(!!existing.analytics); setMarketing(!!existing.marketing); setVisible(false);
  }, []);
  const make = (a: boolean, m: boolean): CookieConsent => ({ necessary: true, analytics: a, marketing: m, timestamp: new Date().toISOString(), version: CONSENT_VERSION });
  const acceptAll = () => { storeConsent(make(true, true)); setAnalytics(true); setMarketing(true); setVisible(false); setShowSettings(false); };
  const acceptNecessaryOnly = () => { storeConsent(make(false, false)); setAnalytics(false); setMarketing(false); setVisible(false); setShowSettings(false); };
  const saveSettings = () => { storeConsent(make(analytics, marketing)); setVisible(false); setShowSettings(false); };
  if (!visible) return null;
  return (
    <>
      <div className="fixed inset-x-0 bottom-3 z-[60] px-3">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-slate-700 bg-[#0d1526]/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white"><SlidersHorizontal className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold text-white">Cookies</p>
              <p className="mt-1 text-xs text-slate-400">Wir verwenden notwendige Cookies für die Funktionalität. Optionale Cookies nur mit Einwilligung.{" "}<Link href="/legal/DSGVO" className="font-semibold text-slate-200 underline underline-offset-4 hover:text-white">Datenschutz</Link></p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <button type="button" onClick={() => setShowSettings(true)} className="rounded-full border border-slate-600 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5">Einstellungen</button>
            <button type="button" onClick={acceptNecessaryOnly} className="rounded-full border border-slate-600 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5">Nur notwendig</button>
            <button type="button" onClick={acceptAll} className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400">Alle akzeptieren</button>
          </div>
        </div>
      </div>
      {showSettings && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-[#0d1526] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm font-semibold text-white">Cookie-Einstellungen</p><p className="mt-1 text-xs text-slate-400">Notwendige Cookies sind immer aktiv.</p></div>
              <button type="button" onClick={() => setShowSettings(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-white/5 text-slate-300 hover:bg-white/10" aria-label="Schließen"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { label: "Notwendig", desc: "Erforderlich für Grundfunktionen.", fixed: true, state: true },
                { label: "Analyse (optional)", desc: "Hilft zu verstehen, welche Bereiche genutzt werden.", state: analytics, set: setAnalytics },
                { label: "Marketing (optional)", desc: "Für personalisierte Inhalte/Remarketing.", state: marketing, set: setMarketing },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="text-sm font-semibold text-white">{item.label}</p><p className="mt-1 text-xs text-slate-400">{item.desc}</p></div>
                    {item.fixed ? <span className="rounded-full border border-slate-600 px-3 py-1 text-xs font-semibold text-slate-300">aktiv</span>
                      : <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300"><input type="checkbox" checked={item.state} onChange={() => item.set?.((p) => !p)} className="h-4 w-4 accent-emerald-500" />aktiv</label>}
                  </div>
                </div>
              ))}
              <p className="text-xs text-slate-500">Details: <Link href="/legal/DSGVO" className="font-semibold text-slate-300 underline underline-offset-4 hover:text-white">Datenschutzerklärung</Link></p>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={acceptNecessaryOnly} className="rounded-full border border-slate-700 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5">Nur notwendig</button>
              <button type="button" onClick={saveSettings} className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400">Speichern</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── MARQUEE ─────────────────────────────────────────────────────────── */
function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden border-y border-slate-800 bg-[#070d1a] py-4">
      <div className="marquee-track flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4 text-sm font-medium text-slate-400">
            {item}<span className="h-1 w-1 rounded-full bg-emerald-500" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── SCROLL PROGRESS ────────────────────────────────────────────────── */
function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = barRef.current; if (!el) return;
      const pct = document.documentElement.scrollHeight - window.innerHeight > 0
        ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 : 0;
      el.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px]">
      <div ref={barRef} className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]" style={{ width: "0%", transition: "none" }} />
    </div>
  );
}

/* ─── FLOATING NAV DOTS ──────────────────────────────────────────────── */
function FloatingNavDots({ activeSection }: { activeSection: string }) {
  return (
    <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
      {navSections.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} title={s.label} className="group relative flex items-center justify-end">
            <span className="mr-2 max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-slate-900/80 px-0 py-1 text-xs font-medium text-white backdrop-blur transition-all duration-300 group-hover:max-w-[120px] group-hover:px-2.5">{s.label}</span>
            <span className={`block rounded-full transition-all duration-300 ${isActive ? "h-3 w-3 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "h-2 w-2 bg-slate-400/60 hover:bg-slate-300"}`} />
          </a>
        );
      })}
    </div>
  );
}

/* ─── TYPED TEXT HOOK ────────────────────────────────────────────────── */
function useTypedText(variants: string[], speed = 60, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [varIdx, setVarIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    if (waiting) { const t = setTimeout(() => { setWaiting(false); setDeleting(true); }, pause); return () => clearTimeout(t); }
    const cur = variants[varIdx];
    if (!deleting) {
      if (charIdx < cur.length) { const t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx + 1)); setCharIdx((c) => c + 1); }, speed); return () => clearTimeout(t); }
      else setWaiting(true);
    } else {
      if (charIdx > 0) { const t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx - 1)); setCharIdx((c) => c - 1); }, speed / 2); return () => clearTimeout(t); }
      else { setDeleting(false); setVarIdx((v) => (v + 1) % variants.length); }
    }
  }, [charIdx, deleting, waiting, varIdx, variants, speed, pause]);
  return displayed;
}

/* ─── TILT CARD ──────────────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`;
  }, []);
  const onLeave = useCallback(() => { if (ref.current) ref.current.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)"; }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`transition-transform duration-200 ease-out will-change-transform ${className}`}>{children}</div>
  );
}

/* ─── BEFORE / AFTER SLIDER ──────────────────────────────────────────── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(48);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)));
  }, []);
  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging) updatePos(e.clientX); };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragging, updatePos]);

  return (
    <div ref={containerRef} className="relative select-none overflow-hidden rounded-2xl border border-slate-200 shadow-2xl cursor-col-resize" style={{ height: 360 }}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)} onTouchStart={(e) => updatePos(e.touches[0].clientX)}>

      {/* ── BEFORE: Typische lokale Seite ── */}
      <div className="absolute inset-0 bg-[#f2f0ec] p-0 overflow-hidden">
        {/* Fake nav */}
        <div className="flex items-center justify-between border-b border-gray-300 bg-white px-5 py-3">
          <span className="text-sm font-bold text-gray-700">Hair & Style GmbH</span>
          <div className="flex gap-4 text-xs text-gray-500"><span>Home</span><span>Leistungen</span><span>Galerie</span><span>Impressum</span></div>
        </div>
        {/* Hero */}
        <div className="px-5 pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Willkommen</p>
          <h3 className="mt-1 text-xl font-bold text-gray-700">Herzlich Willkommen bei Hair & Style</h3>
          <p className="mt-2 text-sm text-gray-500">Wir sind ein Friseursalon in Ihrer Nähe und freuen uns auf Ihren Besuch. Rufen Sie uns gerne an oder kommen Sie vorbei.</p>
          <div className="mt-4 flex gap-3">
            <div className="rounded border border-gray-400 bg-white px-4 py-2 text-xs text-gray-600">Jetzt anrufen</div>
            <div className="rounded border border-gray-300 bg-white px-4 py-2 text-xs text-gray-400">Galerie</div>
          </div>
          {/* Missing trust / social proof */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded border border-gray-200 bg-white p-3">
              <p className="text-xs font-semibold text-gray-500">Öffnungszeiten</p>
              <p className="mt-1 text-xs text-gray-400">Mo–Fr: 9–18 Uhr<br />Sa: 9–14 Uhr</p>
            </div>
            <div className="rounded border border-gray-200 bg-white p-3">
              <p className="text-xs font-semibold text-gray-500">Adresse</p>
              <p className="mt-1 text-xs text-gray-400">Musterstraße 12<br />80333 München</p>
            </div>
          </div>
          <div className="mt-3 rounded border border-dashed border-gray-300 bg-gray-50 p-3 text-center text-xs text-gray-400">
            Foto-Galerie (bald verfügbar)
          </div>
        </div>
        <div className="absolute bottom-3 left-3 rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-gray-700">Typische Seite</div>
      </div>

      {/* ── AFTER: Landex Digital ── */}
      <div className="absolute inset-0 overflow-hidden bg-[#070d1a]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* Fake nav dark */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
          <span className="text-sm font-bold text-white">Hair & Style</span>
          <div className="flex gap-4 text-xs text-slate-400"><span>Leistungen</span><span>Preise</span><span>Kontakt</span></div>
          <button className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">Termin</button>
        </div>
        {/* Hero */}
        <div className="px-5 pt-5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Friseursalon · München
          </div>
          <h3 className="mt-2 text-xl font-black text-white leading-tight">Ihr neuer Lieblings&shy;friseur – Termin in 2 Minuten</h3>
          <p className="mt-1.5 text-sm text-slate-400">Keine Wartezeit, kein Anruf. Wählen Sie Ihren Wunschtermin direkt online.</p>
          <div className="mt-3 flex gap-2">
            <div className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/30">Termin buchen →</div>
            <div className="rounded-full border border-white/20 px-4 py-2 text-xs text-slate-300">Preise ansehen</div>
          </div>
          {/* Trust row */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)}</div>
            <span className="text-xs text-slate-300">4,9 · 180 Bewertungen</span>
            <span className="ml-auto text-xs text-emerald-400">✓ Sofort verfügbar</span>
          </div>
          {/* Feature chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {["Online buchbar", "Keine Wartezeit", "Erinnerung per SMS"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />{t}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-emerald-500/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">Landex Digital</div>
      </div>

      {/* Divider */}
      <div className="absolute inset-y-0 z-10 flex items-center justify-center" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="h-full w-[2px] bg-white/70 shadow-[0_0_14px_rgba(255,255,255,0.5)]" />
        <div onMouseDown={() => setDragging(true)}
          className="absolute z-20 flex h-10 w-10 cursor-col-resize items-center justify-center rounded-full border-2 border-white bg-white/20 shadow-xl backdrop-blur-sm">
          <span className="flex gap-0.5">{[...Array(3)].map((_, i) => <span key={i} className="block h-3.5 w-[2px] rounded-full bg-white" />)}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── LIVE MOCKUP ────────────────────────────────────────────────────── */
function LiveMockup() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => { setActive((a) => (a + 1) % mockupPages.length); setTransitioning(false); }, 350);
    }, 3000);
    return () => clearInterval(id);
  }, []);
  const page = mockupPages[active];
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-t-xl border border-white/15 bg-white/8 px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <div className="ml-2 flex-1 rounded-full bg-white/10 px-3 py-0.5 text-xs text-slate-400">landex.page/{page.label.toLowerCase()}</div>
        </div>
      </div>
      <div className={`rounded-b-xl border-x border-b border-white/15 p-5 backdrop-blur-sm transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`} style={{ background: page.bg }}>
        <div className="mb-3 flex items-center justify-between">
          <div className="h-3 w-16 rounded-full opacity-70" style={{ background: page.color }} />
          <div className="flex gap-3">{page.nav.map((n) => <span key={n} className="text-[10px] text-slate-500">{n}</span>)}</div>
        </div>
        <div className="rounded-xl p-4" style={{ background: `${page.color}18`, border: `1px solid ${page.color}30` }}>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: page.color }}>Landex Digital</p>
          <h3 className="mt-1 text-sm font-black leading-tight text-white">{page.headline}</h3>
          <p className="mt-1 text-xs text-slate-400">{page.sub}</p>
          <div className="mt-2.5 inline-flex rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-lg" style={{ background: page.color }}>{page.cta}</div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
          <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />)}</div>
          <span className="text-[10px] text-slate-400">{page.trust}</span>
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {mockupPages.map((_, i) => (
            <button key={i} onClick={() => { setTransitioning(true); setTimeout(() => { setActive(i); setTransitioning(false); }, 350); }}
              className="rounded-full transition-all" style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? page.color : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ────────────────────────────────────────────────────────────── */
export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<StatusType>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);

  const kpiSectionRef = useRef<HTMLDivElement>(null);
  const [kpiHasStarted, setKpiHasStarted] = useState(false);
  const [kpiValues, setKpiValues] = useState({ projects: 0, years: 0, impressions: 0 });

  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mesh1Ref = useRef<HTMLDivElement>(null);
  const mesh2Ref = useRef<HTMLDivElement>(null);
  const mesh3Ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineActive, setTimelineActive] = useState(false);

  const kpiTargets = useMemo(() => ({ projects: 55, years: 6, impressions: 200_000 }), []);
  const typedText = useTypedText(typedVariants, 55, 2200);

  const features: Feature[] = useMemo(() => [
    { title: "Klare Botschaft (in 5 Sekunden verstanden)", description: "Überschriften und Struktur führen sofort zum Angebot: Was ist es, für wen ist es, warum lohnt es sich.", hoverHint: "Keine Textwüste: Wir priorisieren, was ein Interessent wirklich wissen muss – in der richtigen Reihenfolge.", icon: Sparkles },
    { title: "Vertrauen (bevor jemand Kontakt aufnimmt)", description: "Belege, Beispiele und Antworten auf typische Fragen – damit Anfragen leichter und schneller entstehen.", hoverHint: "Social Proof, klare Prozesse und konkrete Aussagen reduzieren Unsicherheit und Rückfragen.", icon: BadgeCheck },
    { title: "Nächster Schritt (ohne Umwege)", description: "Der CTA ist sichtbar, logisch platziert und passt zum Kontext – damit aus Besuchern echte Kontakte werden.", hoverHint: "Wir optimieren auf Termin/Anfrage/Buchung – nicht auf reine Seitenaufrufe.", icon: MousePointerClick },
  ], []);

  const steps: Step[] = useMemo(() => [
    { title: "Kurzes Gespräch", description: "Wir klären Ziel, Angebot, Wunschkunden und vorhandenes Material (Logo, Bilder, Kernaussagen).", icon: MessageCircle },
    { title: "Konzept & Copy", description: "Wir entwickeln Struktur, Kernaussagen und Vertrauenselemente – damit die Seite logisch und überzeugend führt.", icon: Wand2 },
    { title: "Design & Umsetzung", description: "Wir setzen die Landing Page technisch um, optimieren für Mobilgeräte und schärfen Wirkung und Details.", icon: Palette },
    { title: "Live & messen", description: "Wir unterstützen bei Domain/Tracking und optionaler Kampagne – damit Sie nachvollziehen können, was funktioniert.", icon: BarChart3 },
  ], []);

  useEffect(() => { if (typeof window !== "undefined") window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, []);

  useEffect(() => {
    if (isTestimonialPaused) return;
    const id = window.setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 4000);
    return () => window.clearInterval(id);
  }, [isTestimonialPaused]);

  useEffect(() => {
    if (kpiHasStarted) return;
    const el = kpiSectionRef.current; if (!el) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      setKpiHasStarted(true); observer.disconnect();
      if (prefersReduced) { setKpiValues({ projects: kpiTargets.projects, years: kpiTargets.years, impressions: kpiTargets.impressions }); return; }
      const start = performance.now(); const dur = 1400;
      const animate = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const e = 1 - Math.pow(1 - t, 3);
        setKpiValues({ projects: Math.round(kpiTargets.projects * e), years: Math.round(kpiTargets.years * e), impressions: Math.round(kpiTargets.impressions * e) });
        if (t < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [kpiHasStarted, kpiTargets]);

  useEffect(() => {
    const el = timelineRef.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { setTimelineActive(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observers = navSections.map(({ id }) => {
      const el = id === "hero" ? document.getElementById("hero-anchor") : document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setActiveSection(id); }, { threshold: 0.3 });
      obs.observe(el); return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (mesh1Ref.current) mesh1Ref.current.style.transform = `translateY(${y * 0.12}px)`;
      if (mesh2Ref.current) mesh2Ref.current.style.transform = `translateY(${y * 0.08}px)`;
      if (mesh3Ref.current) mesh3Ref.current.style.transform = `translateY(${y * 0.18}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleHeroMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!glowRef.current || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    glowRef.current.style.transform = `translate(${e.clientX - r.left - 300}px, ${e.clientY - r.top - 300}px)`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true); setStatusMessage(null); setStatusType(null);
    const d = new FormData(form);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: d.get("name"), email: d.get("email"), company: d.get("company"), goal: d.get("goal") }) });
      if (res.ok) { setStatusType("success"); setStatusMessage("Danke, Ihre Nachricht wurde gesendet."); form.reset(); }
      else { setStatusType("error"); setStatusMessage("Es ist ein Fehler aufgetreten."); }
    } catch { setStatusType("error"); setStatusMessage("Es ist ein technischer Fehler aufgetreten."); }
    finally { setIsSubmitting(false); }
  }

  return (
    <main className="relative text-slate-900" id="hero-anchor">
      <CookieBanner />
      <ScrollProgressBar />
      <FloatingNavDots activeSection={activeSection} />

      <style jsx global>{`
        .marquee-track { animation: marqueeScroll 28s linear infinite; width: max-content; }
        @keyframes marqueeScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes floatA { 0%,100%{transform:translateY(0px) rotate(-1.5deg)} 50%{transform:translateY(-14px) rotate(1deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(-7px) rotate(0.8deg)} 50%{transform:translateY(7px) rotate(-0.8deg)} }
        .float-a { animation: floatA 4.5s ease-in-out infinite; }
        .float-b { animation: floatB 5.2s ease-in-out infinite; }
        @keyframes meshPulse1 { 0%,100%{transform:scale(1) translate(0,0)} 33%{transform:scale(1.18) translate(-50px,30px)} 66%{transform:scale(0.95) translate(40px,-20px)} }
        @keyframes meshPulse2 { 0%,100%{transform:scale(1) translate(0,0)} 33%{transform:scale(1.12) translate(60px,-40px)} 66%{transform:scale(1.05) translate(-30px,50px)} }
        @keyframes meshPulse3 { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.2) translate(-40px,-30px)} }
        .mesh-1 { position:absolute; border-radius:50%; filter:blur(80px); will-change:transform; width:600px; height:600px; top:-200px; left:-150px; background:radial-gradient(circle,rgba(16,185,129,0.4) 0%,transparent 70%); animation:meshPulse1 18s ease-in-out infinite; }
        .mesh-2 { position:absolute; border-radius:50%; filter:blur(80px); will-change:transform; width:700px; height:700px; top:10%; right:-200px; background:radial-gradient(circle,rgba(56,189,248,0.3) 0%,transparent 70%); animation:meshPulse2 22s ease-in-out infinite; }
        .mesh-3 { position:absolute; border-radius:50%; filter:blur(100px); will-change:transform; width:500px; height:500px; bottom:-100px; left:40%; background:radial-gradient(circle,rgba(99,102,241,0.35) 0%,transparent 70%); animation:meshPulse3 16s ease-in-out infinite; }
        .hero-grid { position:absolute; inset:0; background-image:linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px); background-size:60px 60px; }
        .cursor-glow { position:absolute; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(16,185,129,0.12) 0%,transparent 65%); pointer-events:none; transition:transform 0.08s ease; will-change:transform; top:0; left:0; }
        @keyframes shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .gradient-shimmer { background:linear-gradient(90deg,#34d399,#22d3ee,#818cf8,#34d399,#22d3ee); background-size:300% auto; -webkit-background-clip:text; background-clip:text; color:transparent; animation:shimmer 4s linear infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .typed-cursor { display:inline-block; width:2px; height:1em; background:currentColor; margin-left:2px; vertical-align:middle; animation:blink 1s step-end infinite; }
        .lblob-wrapper { position:absolute; inset:-80px 0; pointer-events:none; overflow:hidden; z-index:0; mask-image:linear-gradient(to bottom,transparent 0%,rgba(0,0,0,0.9) 15%,rgba(0,0,0,1) 50%,rgba(0,0,0,0.9) 85%,transparent 100%); }
        .lblob { position:absolute; border-radius:50%; filter:blur(20px); }
        @keyframes lBlob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,-40px) scale(1.1)} }
        @keyframes lBlob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,35px) scale(1.08)} }
        @keyframes lBlob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,50px) scale(0.95)} }
        .lblob-sky { background:radial-gradient(circle,rgba(56,189,248,0.55),transparent 64%); animation:lBlob1 16s ease-in-out infinite; }
        .lblob-emerald { background:radial-gradient(circle,rgba(52,211,153,0.5),transparent 64%); animation:lBlob2 18s ease-in-out infinite; }
        .lblob-indigo { background:radial-gradient(circle,rgba(129,140,248,0.45),transparent 64%); animation:lBlob3 14s ease-in-out infinite; }
        .lblob-blue { background:radial-gradient(circle,rgba(59,130,246,0.5),transparent 64%); animation:lBlob1 20s ease-in-out infinite; }
        .timeline-line { transform-origin:top center; transform:scaleY(0); transition:transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .timeline-active .timeline-line { transform:scaleY(1); }
        .noise-overlay { position:fixed; inset:0; z-index:0; pointer-events:none; opacity:0.04; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E"); mix-blend-mode:overlay; }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .testimonial-enter { animation: fadeSlideUp 0.5s ease forwards; }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
        .pulse-ring { animation: pulseRing 1.8s ease-out infinite; }
        @keyframes stepReveal { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <div className="noise-overlay" />

      {/* ══ HERO ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="hero" onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen overflow-hidden bg-[#070d1a] px-4 pb-20 pt-8 sm:pb-28 sm:pt-10 lg:pt-12">
        <div ref={mesh1Ref} className="mesh-1" />
        <div ref={mesh2Ref} className="mesh-2" />
        <div ref={mesh3Ref} className="mesh-3" />
        <div className="hero-grid" />
        <div ref={glowRef} className="cursor-glow" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#f4f7fb]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal>
            <Link href="/" className="inline-flex items-center">
              <img src="/LandexDigital.svg" alt="Landex Digital" className="h-14 w-auto md:h-16" style={{ filter: "brightness(0) invert(1)" }} />
            </Link>
          </Reveal>
          <Reveal delay={0.04}>
            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />Landing Pages für lokale Unternehmen
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-black tracking-tighter text-white sm:text-6xl lg:text-8xl xl:text-[88px]">
              Landing Pages, <span className="gradient-shimmer">die Besucher</span> in Anfragen verwandeln.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-balance text-base text-slate-400 sm:text-lg lg:text-xl">
              Wir bauen fokussierte Seiten mit klarer Führung, Vertrauen und einem eindeutigen nächsten Schritt – damit Interessenten nicht suchen müssen, sondern handeln können.
            </p>
            <p className="mt-3 text-lg font-semibold text-emerald-400 sm:text-xl">
              Perfekt {typedText}<span className="typed-cursor" />
            </p>
          </Reveal>
          <Reveal delay={0.13}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400">
                Erstgespräch anfragen <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="#vorteile" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-slate-200">
                Mehr erfahren <ChevronDown className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-start">
            <div className="grid gap-3">
              {heroProof.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={0.05 * idx} y={18}>
                    <div className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10">
                      <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400"><Icon className="h-4 w-4" /></div>
                      <div><p className="text-sm font-semibold text-white">{item.title}</p><p className="mt-0.5 text-xs text-slate-400">{item.description}</p></div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <div className="relative hidden lg:block" style={{ height: 320 }}>
              {heroFloats.map((card, i) => {
                const Icon = card.icon;
                const positions = [{ top: "0px", left: "40px" }, { top: "100px", left: "0px" }, { top: "210px", left: "60px" }];
                const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
                  emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-400" },
                  sky: { bg: "bg-sky-500/20", text: "text-sky-400", dot: "bg-sky-400" },
                  amber: { bg: "bg-amber-500/20", text: "text-amber-400", dot: "bg-amber-400" },
                };
                const c = colorMap[card.color];
                return (
                  <div key={i} className={`absolute flex items-center gap-3 rounded-2xl border border-white/15 bg-[rgba(255,255,255,0.05)] px-4 py-3 backdrop-blur-md shadow-2xl ${card.animClass}`}
                    style={{ ...positions[i], animationDelay: card.delay, minWidth: 200 }}>
                    <div className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.text}`}><Icon className="h-4 w-4" /></div>
                    <div>
                      <div className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} /><p className="text-xs font-semibold text-white">{card.label}</p></div>
                      <p className="mt-0.5 text-xs text-slate-400">{card.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Reveal delay={0.15} y={24}>
              <div className="hidden lg:flex lg:justify-end"><LiveMockup /></div>
            </Reveal>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      <div className="bg-[#f4f7fb]">

        {/* ══ VORTEILE — Bento ═══════════════════════════════════════════ */}
        <section className="relative px-4 py-16 sm:py-20" id="vorteile">
          <div className="lblob-wrapper"><div className="lblob lblob-sky" style={{ width: 380, height: 380, top: -140, right: -140 }} /></div>
          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">So helfen wir Ihnen zu mehr Erfolg.</h2>
              <p className="mt-3 max-w-2xl text-slate-600">Die Seite ist so aufgebaut, dass ein Interessent in kurzer Zeit alles Wichtige versteht – und den nächsten Schritt ohne Zweifel geht.</p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
              <div className="md:col-span-2"><Reveal delay={0.04} y={28}>
                <TiltCard>
                  {(() => { const Icon = features[0].icon; return (
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
                      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-sky-100/60 blur-3xl group-hover:bg-sky-200/60 transition" />
                      <div className="relative flex items-start gap-5">
                        <div className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 transition group-hover:bg-sky-600 group-hover:text-white"><Icon className="h-6 w-6" /></div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900">{features[0].title}</h3>
                          <p className="mt-2 text-slate-600">{features[0].description}</p>
                          <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-4 py-2 text-sm text-sky-800"><Sparkles className="h-4 w-4" />{features[0].hoverHint}</div>
                        </div>
                      </div>
                    </div>
                  ); })()}
                </TiltCard>
              </Reveal></div>
              <div className="md:col-start-3 md:row-span-2"><Reveal delay={0.07} y={28}>
                <TiltCard className="h-full">
                  {(() => { const Icon = features[1].icon; return (
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-900 to-slate-800 p-6 shadow-lg sm:p-8">
                      <div className="pointer-events-none absolute -left-8 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
                      <div className="relative flex h-full flex-col justify-between">
                        <div>
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400"><Icon className="h-6 w-6" /></div>
                          <h3 className="mt-4 text-xl font-bold text-white">{features[1].title}</h3>
                          <p className="mt-3 text-slate-400">{features[1].description}</p>
                        </div>
                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-300">{features[1].hoverHint}</p></div>
                      </div>
                    </div>
                  ); })()}
                </TiltCard>
              </Reveal></div>
              <div className="md:col-span-2"><Reveal delay={0.1} y={28}>
                <TiltCard>
                  {(() => { const Icon = features[2].icon; return (
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-lg sm:p-8">
                      <div className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
                      <div className="relative flex items-start gap-5">
                        <div className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 group-hover:bg-emerald-400 transition"><Icon className="h-6 w-6" /></div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{features[2].title}</h3>
                          <p className="mt-2 text-slate-600">{features[2].description}</p>
                          <p className="mt-3 text-sm text-emerald-700">{features[2].hoverHint}</p>
                        </div>
                      </div>
                    </div>
                  ); })()}
                </TiltCard>
              </Reveal></div>
            </div>
          </div>
        </section>

        {/* ══ KENNZAHLEN ══════════════════════════════════════════════════ */}
        <section className="relative px-4 py-16 sm:py-20" id="kennzahlen">
          <div className="lblob-wrapper">
            <div className="lblob lblob-indigo" style={{ width: 360, height: 360, top: -100, left: "15%" }} />
            <div className="lblob lblob-sky" style={{ width: 300, height: 300, bottom: -80, right: -100 }} />
          </div>
          <div ref={kpiSectionRef} className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Projekte, Erfahrung, Reichweite.</h2>
              <p className="mt-3 max-w-2xl text-slate-600">Kennzahlen als Orientierung – für Größe, Routine und die Menge an gesammelten Praxiseindrücken aus echten Projekten.</p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { icon: Rocket, label: "Projekte", value: kpiValues.projects, suffix: "+", desc: "Umgesetzt – von klaren Angebotsseiten bis zu kampagnenfähigen Funnels.", accent: "sky" },
                { icon: Timer, label: "Jahre Erfahrung", value: kpiValues.years, suffix: "+", desc: "Jahre – mit Fokus auf Struktur, Copy und Conversion im lokalen Umfeld.", accent: "emerald" },
                { icon: Eye, label: "Impressionen", value: kpiValues.impressions, suffix: "+", desc: "Gesammelte Sichtkontakte über Projekte und Kampagnen.", accent: "indigo" },
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                const aMap: Record<string, { icon: string; num: string; badge: string; glow: string }> = {
                  sky: { icon: "bg-sky-100 text-sky-700 group-hover:bg-sky-600 group-hover:text-white", num: "text-sky-600", badge: "border-sky-100 bg-sky-50 text-sky-700", glow: "group-hover:shadow-sky-200/60" },
                  emerald: { icon: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white", num: "text-emerald-600", badge: "border-emerald-100 bg-emerald-50 text-emerald-700", glow: "group-hover:shadow-emerald-200/60" },
                  indigo: { icon: "bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white", num: "text-indigo-600", badge: "border-indigo-100 bg-indigo-50 text-indigo-700", glow: "group-hover:shadow-indigo-200/60" },
                };
                const a = aMap[kpi.accent];
                return (
                  <Reveal key={kpi.label} delay={0.05 * idx} y={24}>
                    <TiltCard>
                      <div className={`group rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-shadow hover:shadow-xl ${a.glow}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl transition ${a.icon}`}><Icon className="h-5 w-5" /></div>
                          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${a.badge}`}>{kpi.label}</span>
                        </div>
                        <div className="mt-6">
                          <p className={`text-5xl font-black tabular-nums tracking-tighter ${a.num}`}>
                            {formatNumberDE(kpi.value)}{kpi.suffix}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600">{kpi.desc}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ PROOF — Branchen + Testimonials ════════════════════════════ */}
        <section className="relative px-4 py-16 sm:py-20" id="proof">
          <div className="lblob-wrapper">
            <div className="lblob lblob-emerald" style={{ width: 340, height: 340, top: -80, right: "10%" }} />
            <div className="lblob lblob-blue" style={{ width: 300, height: 300, bottom: -80, left: -80 }} />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal><h2 className="text-3xl font-black tracking-tight sm:text-4xl">Für lokale Unternehmen gemacht – und im Alltag bewährt.</h2></Reveal>
            <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-slate-600">Verständliche Sprache, klare Struktur und schnelle Kontaktwege – damit Interessenten sofort wissen, ob Ihr Angebot passt.</p></Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">

              {/* ── Branchen — mit Hover-Stats ── */}
              <Reveal delay={0.04} y={24}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <p className="text-lg font-bold text-slate-900">Typische Branchen</p>
                      <p className="mt-1 text-sm text-slate-500">Hover über eine Branche für das typische Ergebnis.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-700 shadow-sm"><Globe className="h-4 w-4" />Lokal & regional</div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {industries.map((item, index) => (
                      <Reveal key={item.name} delay={0.025 * index} y={12}>
                        <div
                          className="group relative flex items-center justify-between gap-2 overflow-hidden rounded-xl border border-slate-100 bg-white px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md cursor-default"
                          onMouseEnter={() => setHoveredIndustry(index)}
                          onMouseLeave={() => setHoveredIndustry(null)}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{item.icon}</span>
                            <span className="text-sm font-medium text-slate-800">{item.name}</span>
                          </div>
                          <span className={`text-xs font-semibold text-emerald-600 transition-all duration-300 whitespace-nowrap ${hoveredIndustry === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}>
                            {item.stat}
                          </span>
                          <div className="pointer-events-none absolute inset-0 rounded-xl bg-emerald-500/5 opacity-0 transition group-hover:opacity-100" />
                        </div>
                      </Reveal>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5">
                    <Zap className="h-4 w-4 text-emerald-500" />
                    <p className="text-xs text-slate-600">Nicht dabei? Kein Problem – wir arbeiten branchenübergreifend.</p>
                  </div>
                </div>
              </Reveal>

              {/* ── Testimonials — neu gestaltet ── */}
              <Reveal delay={0.07} y={24}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:p-8"
                  onMouseEnter={() => setIsTestimonialPaused(true)} onMouseLeave={() => setIsTestimonialPaused(false)}>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <p className="text-lg font-bold text-slate-900">Kundenstimmen</p>
                      <p className="mt-1 text-sm text-slate-500">Echte Ergebnisse aus echten Projekten.</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div>
                      <span className="text-xs font-semibold text-amber-600">5.0 Ø</span>
                    </div>
                  </div>

                  {/* Active testimonial */}
                  <div key={activeTestimonial} className="testimonial-enter">
                    <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
                      {/* Pull quote */}
                      <div className="mb-3 flex items-start gap-3">
                        <div className="mt-0.5 shrink-0 text-4xl font-black leading-none text-emerald-300">"</div>
                        <p className="text-sm leading-relaxed text-slate-700 italic">{testimonials[activeTestimonial].quote}</p>
                      </div>
                      {/* Author */}
                      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 text-sm font-black text-white shadow-sm">
                            {testimonials[activeTestimonial].name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{testimonials[activeTestimonial].name}</p>
                            <p className="text-xs text-slate-500">{testimonials[activeTestimonial].role} · {testimonials[activeTestimonial].city}</p>
                          </div>
                        </div>
                        {/* Big metric */}
                        <div className="text-right">
                          <p className="text-2xl font-black text-emerald-600">{testimonials[activeTestimonial].metric}</p>
                          <p className="text-xs font-medium text-slate-500">{testimonials[activeTestimonial].metricLabel}</p>
                        </div>
                      </div>
                      {/* Result tag */}
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <BadgeCheck className="h-3.5 w-3.5" />{testimonials[activeTestimonial].result}
                      </div>
                    </div>
                  </div>

                  {/* Navigation dots + brand labels */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      {testimonials.map((t, index) => (
                        <button key={index} type="button"
                          onClick={() => { setActiveTestimonial(index); setIsTestimonialPaused(true); setTimeout(() => setIsTestimonialPaused(false), 3000); }}
                          className={`rounded-full transition-all text-xs font-semibold px-3 py-1 ${activeTestimonial === index ? "bg-sky-600 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                          {t.role}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{isTestimonialPaused ? "⏸" : "▶"}</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ VERGLEICH — Before/After ════════════════════════════════════ */}
        <section className="relative px-4 py-16 sm:py-20" id="vergleich">
          <div className="lblob-wrapper"><div className="lblob lblob-sky" style={{ width: 360, height: 360, top: -100, left: "25%" }} /></div>
          <div className="relative z-10 mx-auto max-w-5xl">
            <Reveal>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 mb-3">
                    <Zap className="h-3.5 w-3.5" />Interaktiver Vergleich
                  </div>
                  <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Der Unterschied ist sichtbar.</h2>
                </div>
                <p className="text-sm text-slate-500 sm:text-right">← Regler ziehen zum Vergleichen</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 max-w-2xl text-slate-600">Sehen Sie den Unterschied zwischen einer typischen lokalen Website und einer optimierten Landex-Seite – mit echten Inhalten, echter Struktur.</p>
            </Reveal>
            <Reveal delay={0.08} y={24}>
              <div className="mt-8"><BeforeAfterSlider /></div>
            </Reveal>
            {/* Legend */}
            <Reveal delay={0.12}>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500"><X className="h-4 w-4" /></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Typische lokale Website</p>
                    <p className="mt-1 text-xs text-slate-500">Kein klarer CTA, kein Vertrauen, kein Buchungssystem – Besucher rufen an oder gehen wieder.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow shadow-emerald-300"><BadgeCheck className="h-4 w-4" /></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Landex Digital Seite</p>
                    <p className="mt-1 text-xs text-slate-600">Klarer Ablauf, Social Proof, Online-Buchung – Interessenten werden zu Kunden.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ ABLAUF — Timeline ══════════════════════════════════════════ */}
        <section className="relative px-4 py-16 sm:py-20" id="ablauf">
          <div className="lblob-wrapper"><div className="lblob lblob-blue" style={{ width: 360, height: 360, top: -100, left: "20%" }} /></div>
          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 mb-3">
                <Clock className="h-3.5 w-3.5" />Klarer Prozess
              </div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">So läuft die Zusammenarbeit ab.</h2>
            </Reveal>
            <Reveal delay={0.05}><p className="mt-3 max-w-2xl text-slate-600">Ein klarer Ablauf mit kurzer Zeit bis zur ersten Version – damit Sie zügig Feedback geben und wir schnell iterieren können.</p></Reveal>

            <div className="mt-10 grid gap-8 lg:grid-cols-5">
              {/* Timeline – 3 cols */}
              <div className="lg:col-span-3">
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:p-8">
                  <div ref={timelineRef} className={`grid gap-0 ${timelineActive ? "timeline-active" : ""}`}>
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      const isLast = index === steps.length - 1;
                      const accentColors = [
                        "text-sky-600 bg-sky-100 group-hover:bg-sky-600 group-hover:text-white shadow-sky-100",
                        "text-indigo-600 bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white shadow-indigo-100",
                        "text-emerald-600 bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white shadow-emerald-100",
                        "text-amber-600 bg-amber-100 group-hover:bg-amber-600 group-hover:text-white shadow-amber-100",
                      ];
                      const lineColors = ["from-sky-400 to-indigo-400", "from-indigo-400 to-emerald-400", "from-emerald-400 to-amber-400"];
                      return (
                        <Reveal key={step.title} delay={0.07 * index} y={20}>
                          <div className="group relative flex gap-5">
                            <div className="flex flex-col items-center">
                              <div className={`relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-md transition-all duration-300 ${accentColors[index]}`}><Icon className="h-5 w-5" /></div>
                              {!isLast && (
                                <div className="relative mt-1 w-px flex-1 overflow-hidden bg-slate-200" style={{ minHeight: 52 }}>
                                  <div className={`timeline-line absolute inset-0 bg-gradient-to-b ${lineColors[index]}`} style={{ transitionDelay: `${index * 250}ms` }} />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 pb-8">
                              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                                <div className="flex items-start justify-between gap-3">
                                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                                  <span className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500">0{index + 1}</span>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                              </div>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Meta cards – 2 cols */}
              <div className="flex flex-col gap-4 lg:col-span-2">
                {timelineMeta.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <Reveal key={m.label} delay={0.08 * idx} y={20}>
                      <TiltCard>
                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
                          <div className="relative flex items-center justify-center">
                            <div className="pulse-ring absolute h-10 w-10 rounded-full bg-sky-400/30" style={{ animationDelay: `${idx * 0.6}s` }} />
                            <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700"><Icon className="h-5 w-5" /></div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500">{m.label}</p>
                            <p className="mt-0.5 text-xl font-black text-slate-900">{m.value}</p>
                          </div>
                        </div>
                      </TiltCard>
                    </Reveal>
                  );
                })}
                {/* CTA card */}
                <Reveal delay={0.28} y={20}>
                  <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-500 to-teal-500 p-5 shadow-lg shadow-emerald-200">
                    <p className="text-sm font-bold text-white">Bereit loszulegen?</p>
                    <p className="mt-1 text-xs text-emerald-100">Erstgespräch in 2 Minuten anfragen.</p>
                    <Link href="#kontakt" className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/30">
                      Jetzt anfragen <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══ KONTAKT ════════════════════════════════════════════════════ */}
        <section className="relative px-4 pb-16 pt-12 sm:pb-20 sm:pt-16" id="kontakt">
          <div className="lblob-wrapper"><div className="lblob lblob-emerald" style={{ width: 400, height: 400, bottom: -120, right: -100 }} /></div>
          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-emerald-800/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl sm:p-10">
                <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-emerald-500/25 blur-3xl" />
                <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-4">
                      <span className="relative flex h-2 w-2"><span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400/60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
                      Jetzt anfragen
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Erstgespräch anfragen.</h2>
                    <p className="mt-4 text-slate-400">Erzählen Sie kurz, was Sie anbieten und was die Seite erreichen soll. Wir melden uns mit einem klaren Vorschlag für Struktur, Vorgehen und Investition.</p>
                    <div className="mt-6 space-y-3">
                      {[
                        { icon: MessageCircle, text: "20–30 Minuten Erstgespräch" },
                        { icon: Zap, text: "Klarer Vorschlag statt vagen Angeboten" },
                        { icon: CheckCircle2, text: "Erste Version in 7–10 Tagen" },
                        { icon: ThumbsUp, text: "Kein Newsletter, kein Spam – nur echte Antworten" },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.text} className="flex items-center gap-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400"><Icon className="h-3.5 w-3.5" /></div>
                            <p className="text-sm text-slate-300">{item.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5"><label className="block text-xs font-semibold text-slate-300">Name</label><input type="text" name="name" required className="w-full rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white/15 transition" placeholder="Max Mustermann" /></div>
                        <div className="space-y-1.5"><label className="block text-xs font-semibold text-slate-300">E-Mail</label><input type="email" name="email" required className="w-full rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white/15 transition" placeholder="name@unternehmen.de" /></div>
                      </div>
                      <div className="space-y-1.5"><label className="block text-xs font-semibold text-slate-300">Unternehmen / Branche</label><input type="text" name="company" className="w-full rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white/15 transition" placeholder="z. B. Friseursalon, Restaurant, Praxis …" /></div>
                      <div className="space-y-1.5"><label className="block text-xs font-semibold text-slate-300">Was soll Ihre Landing Page erreichen?</label><textarea name="goal" required className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white/15 transition" placeholder="z. B. mehr Terminanfragen, mehr Online-Buchungen …" /></div>
                      {statusMessage && <p className={`text-xs ${statusType === "success" ? "text-emerald-400" : "text-red-400"}`}>{statusMessage}</p>}
                      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                        <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70">
                          {isSubmitting ? "Wird gesendet …" : <><span>Anfrage senden</span><ArrowUpRight className="h-4 w-4" /></>}
                        </button>
                        <span className="text-xs text-slate-500">Wir melden uns zeitnah zurück.</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ FAQ ════════════════════════════════════════════════════════ */}
        <section className="relative px-4 py-16 sm:py-20" id="faq">
          <div className="lblob-wrapper"><div className="lblob lblob-sky" style={{ width: 340, height: 340, top: -80, right: -80 }} /></div>
          <div className="relative z-10 mx-auto max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm mb-3">
                <MessageCircle className="h-3.5 w-3.5 text-sky-500" />Häufige Fragen
              </div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Häufige Fragen.</h2>
            </Reveal>
            <Reveal delay={0.05}><p className="mt-3 text-slate-600">Kurz beantwortet – die Details klären wir im Gespräch.</p></Reveal>
            <div className="mt-8 space-y-3">
              {faqs.map((item, index) => {
                const Icon = item.icon;
                const isOpen = openFaq === index;
                return (
                  <Reveal key={item.question} delay={0.05 * index} y={18}>
                    <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? "border-sky-200 bg-white shadow-lg shadow-sky-100/60" : "border-slate-200 bg-white/80 shadow-sm hover:border-sky-200 hover:shadow-md"} backdrop-blur-sm`}>
                      <button type="button" onClick={() => setOpenFaq((p) => (p === index ? null : index))} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left" aria-expanded={isOpen}>
                        <div className="flex items-center gap-3">
                          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300 ${isOpen ? "bg-sky-600 text-white shadow-md shadow-sky-200" : "bg-sky-100 text-sky-700"}`}><Icon className="h-5 w-5" /></div>
                          <span className={`font-semibold transition-colors ${isOpen ? "text-sky-900" : "text-slate-900"}`}>{item.question}</span>
                        </div>
                        <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border shadow-sm transition-all ${isOpen ? "border-sky-200 bg-sky-50 text-sky-600" : "border-slate-200 bg-white text-slate-500"}`}>
                          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      </button>
                      <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="px-5 pb-5 pt-1">
                          <div className="ml-[52px] rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-3">
                            <p className="text-sm leading-relaxed text-slate-700">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col items-center gap-4 text-center">
                <p className="text-sm text-slate-500">Noch offen gebliebene Fragen? Kein Problem.</p>
                <Link href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400">
                  Fragen klären im Erstgespräch <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ FOOTER ═════════════════════════════════════════════════════ */}
        <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-slate-500">
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Landex Digital. Alle Rechte vorbehalten.</p>
            <div className="flex flex-wrap gap-4">
              {["#vorteile", "#kennzahlen", "#proof", "#vergleich", "#ablauf", "#faq"].map((href) => (
                <Link key={href} href={href} className="capitalize hover:text-slate-900">{href.slice(1)}</Link>
              ))}
              <span className="mx-1 hidden text-slate-300 sm:inline">|</span>
              <Link href="/legal/AGB" className="hover:text-slate-900">AGB</Link>
              <Link href="/legal/DSGVO" className="hover:text-slate-900">Datenschutz</Link>
              <Link href="/legal/Impressum" className="hover:text-slate-900">Impressum</Link>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
