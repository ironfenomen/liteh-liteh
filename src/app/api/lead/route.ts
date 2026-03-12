import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_API = "https://api.telegram.org";

export type LeadBody = {
  formName: string;
  pageUrl?: string;
  name?: string;
  phone?: string;
  comment?: string;
  honeypot?: string;
  [key: string]: unknown;
};

function buildTelegramMessage(body: LeadBody): string {
  const name = String(body.name ?? "").trim() || "—";
  const phone = String(body.phone ?? "").trim() || "—";
  const formName = String(body.formName ?? "").trim() || "—";
  const pageUrl = String(body.pageUrl ?? "").trim() || "—";
  const comment = String(body.comment ?? "").trim();
  const dateTime = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "short",
    timeStyle: "short",
  });

  const lines = [
    "🔥 Новая заявка с сайта Liteh",
    "",
    `Форма: ${formName}`,
    `Страница: ${pageUrl}`,
    `Имя: ${name}`,
    `Телефон: ${phone}`,
  ];
  if (comment) {
    lines.push(`Комментарий: ${comment}`);
  }
  lines.push(`Дата: ${dateTime}`);

  return lines.join("\n");
}

async function sendToTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram sendMessage error:", res.status, err);
    return false;
  }
  return true;
}

async function sendToEmail(body: LeadBody): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpHost || !smtpUser || !smtpPass) return false;

  const name = String(body.name ?? "").trim() || "не указано";
  const phone = String(body.phone ?? "").trim();
  const comment = String(body.comment ?? "").trim();
  const formName = String(body.formName ?? "").trim() || "Заявка с сайта Литех";

  const textLines = [
    formName,
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    comment ? `Комментарий: ${comment}` : "",
  ].filter(Boolean);

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: smtpUser,
    to: "litehstavlab@gmail.com",
    subject: "Заявка с сайта Литех",
    text: textLines.join("\n"),
  });
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadBody;

    if (body.honeypot && String(body.honeypot).trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "PHONE_REQUIRED" },
        { status: 400 }
      );
    }

    const payload: LeadBody = {
      ...body,
      name: name || "—",
      phone,
      comment: String(body.comment ?? "").trim() || undefined,
      pageUrl: body.pageUrl ?? "",
      formName: body.formName ?? "Заявка с сайта Литех",
    };

    const text = buildTelegramMessage(payload);
    const telegramOk = await sendToTelegram(text);
    if (!telegramOk && process.env.TELEGRAM_BOT_TOKEN) {
      console.error("Lead: Telegram delivery failed");
    }

    const emailOk = await sendToEmail(payload);
    if (!emailOk && process.env.SMTP_HOST) {
      console.error("Lead: Email delivery failed");
    }

    if (!telegramOk && !emailOk) {
      return NextResponse.json(
        { ok: false, error: "DELIVERY_NOT_CONFIGURED" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead API error", error);
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
