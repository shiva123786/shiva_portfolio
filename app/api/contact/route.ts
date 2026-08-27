import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDb } from "@/lib/mongodb";

const contactEmail = "shivakethavath50@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid field types" }, { status: 400 });
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json({ error: "name, email and message are required" }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (!smtpUser || !smtpPass) {
      throw new Error("SMTP_USER and SMTP_PASS are not configured");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user: smtpUser, pass: smtpPass },
    });

    const safeName = name.trim().slice(0, 200);
    const safeEmail = email.trim().slice(0, 200);
    const safeMessage = message.trim().slice(0, 5000);

    await transporter.sendMail({
      from: smtpUser,
      to: contactEmail,
      replyTo: safeEmail,
      subject: safeName,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${safeMessage}`,
    });

    try {
      const db = await getDb();
      await db.collection("messages").insertOne({
        name: safeName,
        email: safeEmail,
        message: safeMessage,
        createdAt: new Date(),
        userAgent: req.headers.get("user-agent") ?? "",
      });
    } catch (dbError) {
      console.error("contact database save error", dbError);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json(
      { error: "Could not send your message. Check the SMTP configuration." },
      { status: 500 }
    );
  }
}
