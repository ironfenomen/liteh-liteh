import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      comment,
      context = "Обратный звонок с сайта Литех",
    } = body as {
      name?: string;
      phone?: string;
      comment?: string;
      context?: string;
    };

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "PHONE_REQUIRED" },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("SMTP env vars are not configured");
      return NextResponse.json(
        { ok: false, error: "SMTP_NOT_CONFIGURED" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const textLines = [
      context,
      "",
      `Имя: ${name || "не указано"}`,
      `Телефон: ${phone}`,
      comment ? `Комментарий: ${comment}` : "",
    ].filter(Boolean);

    await transporter.sendMail({
      from: smtpUser,
      to: "litehstavlab@gmail.com",
      subject: "Заявка с сайта Литех",
      text: textLines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Callback API error", error);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}

