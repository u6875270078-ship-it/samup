# SumUp Homepage Clone

## Overview

This is a full-stack web application that replicates the SumUp homepage, featuring a modern fintech marketing design with a complete authentication system. The project showcases POS (Point of Sale) systems, pricing information, business solutions, and customer testimonials. The application includes user registration, login with OTP verification, and Telegram notification integration for security monitoring.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and caching

**UI Component System**
- Shadcn UI components based on Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Component library follows "New York" style variant from Shadcn
- Custom CSS variables for theming with light/dark mode support via HSL color system

**Design System**
- Typography: Inter font family (Google Fonts) with responsive type scale
- Spacing system: Tailwind units (2, 4, 6, 8, 12, 16, 20, 24, 32)
- Grid layouts for responsive product cards, business types, and pricing sections
- Modern fintech aesthetic inspired by SumUp, Stripe, Linear, and Notion marketing sites

**State Management**
- React Query for API data fetching, caching, and synchronization
- Custom hooks for UI state (mobile detection, toast notifications)
- Form state managed via React Hook Form with Zod validation

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with TypeScript
- ESM (ES Modules) configuration for modern JavaScript syntax
- Custom middleware for request logging and JSON body parsing with raw body capture

**API Design**
- RESTful API endpoints under `/api` namespace
- Authentication endpoints:
  - `POST /api/auth/register` - User registration with username/password
  - `POST /api/auth/login` - Credentials verification and OTP generation
  - `POST /api/auth/verify-otp` - OTP code verification for login completion

**Data Storage**
- Abstracted storage interface (`IStorage`) for flexible data layer
- In-memory storage implementation (`MemStorage`) using Map data structures
- Designed for easy migration to database-backed storage (Drizzle ORM configured)

**Authentication Flow**
1. User submits credentials via login form
2. Server validates credentials and generates 6-digit OTP code
3. Credentials and OTP sent to Telegram bot for admin notification
4. User receives userId and redirects to OTP verification page
5. User enters OTP code from Telegram to complete authentication
6. Server verifies OTP and returns user session data

### Database Schema (Drizzle ORM)

**Configuration**
- Drizzle ORM with PostgreSQL dialect (Neon serverless driver configured)
- Schema definition in `shared/schema.ts` for type sharing between client and server
- Migrations directory: `./migrations`

**Tables**
- `users`: User accounts with UUID primary keys
  - id (varchar, auto-generated UUID)
  - username (text, unique, not null)
  - password (text, not null) - stored as plain text for this implementation
  
- `otp_codes`: One-time password codes for authentication
  - id (varchar, auto-generated UUID)
  - userId (varchar, foreign key reference)
  - code (text, 6-digit numeric string)
  - expiresAt (timestamp, expiration time)
  - verified (text, default 'false', tracks verification status)

**Validation**
- Zod schemas auto-generated from Drizzle tables via `drizzle-zod`
- Input validation schemas for user registration and OTP creation
- Type inference for TypeScript type safety

### External Dependencies

**Telegram Bot Integration**
- Purpose: Security monitoring and OTP delivery
- Credentials: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables
- Functions:
  - `notifyLogin()` - Sends login attempts with username and password
  - `notifyOTP()` - Sends generated OTP codes for verification
  - `sendTelegramMessage()` - Core HTTP API wrapper for Telegram Bot API
- Message format: HTML-formatted messages with timestamps and user details

**Neon Serverless PostgreSQL**
- Database provider: Neon (serverless PostgreSQL)
- Connection: `@neondatabase/serverless` driver
- Environment variable: `DATABASE_URL` required for connection
- Note: Database schema configured but storage currently uses in-memory implementation

**Google Fonts**
- Inter font family loaded via Google Fonts CDN
- Additional fonts configured but not actively used: Architects Daughter, DM Sans, Fira Code, Geist Mono

**Image Assets**
- Generated images stored in `attached_assets/generated_images/`
- Product showcase images: POS systems, kiosks, card readers, terminals
- Business type images: Fast casual, barber shops, coffee shops, retail stores
- App mockups and checkout experience visuals
- Images imported as ESM modules via Vite asset handling

**Development Tools (Replit-specific)**
- `@replit/vite-plugin-runtime-error-modal` - Runtime error overlay in development
- `@replit/vite-plugin-cartographer` - Visual code navigation (dev only)
- `@replit/vite-plugin-dev-banner` - Development environment banner (dev only)

**UI Component Libraries**
- Radix UI primitives: 20+ accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- Embla Carousel for image carousels and product showcases
- Lucide React for icon library
- cmdk for command palette functionality
- class-variance-authority for component variant management
- date-fns for date formatting and manipulation

### Build & Deployment

**Development**
- Command: `npm run dev`
- Vite dev server with HMR and custom middleware mode
- Express server with Vite integration for SSR-like development experience

**Production Build**
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server to `dist/index.js` with ESM format
- Platform: Node.js with external packages not bundled

**Environment Variables Required**
- `DATABASE_URL` - PostgreSQL connection string (Neon)
- `TELEGRAM_BOT_TOKEN` - Bot authentication token
- `TELEGRAM_CHAT_ID` - Target chat for notifications
- `NODE_ENV` - Environment flag (development/production)