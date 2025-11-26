// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, company, goal } = await request.json();

    if (!name || !email || !goal) {
      return NextResponse.json(
        { error: "Fehlende Felder" },
        { status: 400 }
      );
    }

    // Transporter mit SMTP-Daten aus Environment Variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,          // z. B. "smtp.strato.de"
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === "true", // meist "true" bei Port 465
      auth: {
        user: process.env.SMTP_USER,        // dein Login-User
        pass: process.env.SMTP_PASS,        // dein Passwort / App-Passwort
      },
    });

    const mailText = `
Es ist eine neue Anfrage über das Landing-Page-Formular eingegangen:

Name: ${name}
E-Mail: ${email}
Unternehmen / Branche: ${company || "-"}
Ziel der Landing Page:
${goal}
    `.trim();

    await transporter.sendMail({
      from: `"Landingpage Formular" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO, // deine Zieladresse
      replyTo: email,
      subject: "Neue Anfrage über die Landing Page",
      text: mailText,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("MAIL_ERROR", error);
    return NextResponse.json(
      { error: "Fehler beim Senden der Nachricht" },
      { status: 500 }
    );
  }
}
