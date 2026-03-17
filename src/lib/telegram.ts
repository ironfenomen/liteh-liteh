const TELEGRAM_API = "https://api.telegram.org";

type TelegramResult =
  | { ok: true }
  | { ok: false; error: string; status?: number };

export async function sendTelegramMessage(
  text: string,
): Promise<TelegramResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const hasToken = Boolean(token);
  const hasChatId = Boolean(chatId);

  console.log(
    "[telegram] env",
    JSON.stringify({
      hasToken,
      hasChatId,
    }),
  );

  if (!hasToken || !hasChatId) {
    return {
      ok: false,
      error: "MISSING_ENV",
    };
  }

  const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
  console.log("[telegram] sendMessage url", url);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });

    const textBody = await res.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(textBody);
    } catch {
      parsed = textBody.slice(0, 300);
    }

    console.log(
      "[telegram] sendMessage response",
      JSON.stringify({
        status: res.status,
        ok: res.ok,
        body: parsed,
      }),
    );

    if (!res.ok) {
      return {
        ok: false,
        error: `TELEGRAM_HTTP_${res.status}`,
        status: res.status,
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("[telegram] sendMessage exception", error);
    return {
      ok: false,
      error: "NETWORK_ERROR",
    };
  }
}

export async function testTelegramGetMe(): Promise<TelegramResult & {
  details?: unknown;
}> {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  const hasToken = Boolean(token);
  console.log(
    "[telegram] test getMe env",
    JSON.stringify({
      hasToken,
    }),
  );

  if (!hasToken) {
    return {
      ok: false,
      error: "MISSING_BOT_TOKEN",
    };
  }

  const url = `${TELEGRAM_API}/bot${token}/getMe`;
  console.log("[telegram] getMe url", url);

  try {
    const res = await fetch(url, {
      method: "GET",
    });
    const textBody = await res.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(textBody);
    } catch {
      parsed = textBody.slice(0, 300);
    }

    console.log(
      "[telegram] getMe response",
      JSON.stringify({
        status: res.status,
        ok: res.ok,
        body: parsed,
      }),
    );

    if (!res.ok) {
      return {
        ok: false,
        error: `TELEGRAM_HTTP_${res.status}`,
        status: res.status,
        details: parsed,
      };
    }

    return {
      ok: true,
      details: parsed,
    };
  } catch (error) {
    console.error("[telegram] getMe exception", error);
    return {
      ok: false,
      error: "NETWORK_ERROR",
    };
  }
}

