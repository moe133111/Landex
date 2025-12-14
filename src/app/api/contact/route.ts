export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, company, goal } = await req.json();

    if (!name || !email || !goal) {
      return NextResponse.json(
        { ok: false, error: "Pflichtfelder fehlen." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY fehlt." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Landex Digital <service@landex.digital>",
      to: ["service@landex.digital"],
      replyTo: email,
      subject: "Neue Anfrage über das Kontaktformular",
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>E-Mail:</b> ${escapeHtml(email)}</p>
        <p><b>Unternehmen:</b> ${escapeHtml(company || "-")}</p>
        <p><b>Nachricht:</b><br/>${escapeHtml(goal).replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error || !data?.id) {
      return NextResponse.json(
        { ok: false, error: error?.message || "Resend-Fehler" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json(
      { ok: false, error: "Serverfehler" },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
