import { NextResponse } from "next/server";
import { testTelegramGetMe } from "@/lib/telegram";

export async function GET() {
  const hasToken = Boolean(process.env.TELEGRAM_BOT_TOKEN);
  const hasChatId = Boolean(process.env.TELEGRAM_CHAT_ID);

  console.log(
    "[telegram-test] env",
    JSON.stringify({
      hasToken,
      hasChatId,
    }),
  );

  const getMeResult = await testTelegramGetMe();

  const body = {
    ok: getMeResult.ok,
    env: {
      hasToken,
      hasChatId,
    },
    getMe: {
      ok: getMeResult.ok,
      error: getMeResult.ok ? undefined : getMeResult.error,
      status: "status" in getMeResult ? getMeResult.status : undefined,
      details: "details" in getMeResult ? getMeResult.details : undefined,
    },
  };

  return NextResponse.json(body, {
    status: getMeResult.ok ? 200 : 500,
  });
}

