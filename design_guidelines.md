# SumUp Homepage Clone - Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based (Modern Fintech Marketing)

**Primary References:** SumUp's design system, Stripe's clean marketing aesthetic, and modern SaaS landing pages (Linear, Notion marketing sites)

**Key Design Principles:**
- Clean, professional fintech aesthetic with generous whitespace
- Product-forward showcasing with high-quality photography
- Clear information hierarchy emphasizing value propositions
- Trust-building through pricing transparency and social proof
- Mobile-first responsive design with seamless desktop scaling

## Typography

**Font Family:** Inter (Google Fonts) - clean, modern, highly readable sans-serif ideal for fintech
- Headers: Use Inter with weights 700-800 for strong presence
- Body: Inter weight 400-500 for optimal readability
- Accents: Inter weight 600 for emphasis

**Type Scale:**
- Hero Headline: 4xl to 6xl (responsive) - Bold, commanding presence
- Section Headers: 3xl to 4xl - Clear hierarchy
- Product Card Titles: xl to 2xl - Bold weight
- Body Text: base to lg - Regular weight with increased line-height (1.6-1.7)
- Pricing Numbers: 4xl to 5xl - Extra bold for impact
- Supporting Text: sm to base - Subtle weight reduction
- Button Text: base - Medium weight (500-600)

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32

**Key Spacing Patterns:**
- Section vertical padding: py-16 (mobile), py-24 to py-32 (desktop)
- Card internal padding: p-6 to p-8
- Component gaps: gap-4, gap-6, gap-8
- Container constraints: max-w-7xl with px-4 to px-8
- Hero section: min-h-screen with natural content flow

**Grid System:**
- Product cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Business types: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Pricing: grid-cols-1 md:grid-cols-2 with max-w-4xl centering
- Icon grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-6

## Component Library

### Navigation
- Fixed header with logo left, navigation center, CTA buttons right
- Mobile: Hamburger menu with slide-out drawer
- Subtle shadow on scroll for depth

### Hero Section
- Large headline with supporting subtext (max-w-3xl centered)
- Two prominent CTAs: "Shop Now" (primary) and "Get a Demo" (secondary)
- Hero image: Large product showcase (POS system with devices)
- Support link subtly placed below CTAs
- Height: 80vh minimum for impactful first impression

### Product Showcase Carousel
- Horizontal scrolling cards on mobile, grid on desktop
- Each card: Large product image (16:10 ratio), bold title, short description
- Navigation arrows and indicators for desktop
- Smooth snap scrolling behavior
- Cards have subtle hover lift effect

### Pricing Section
- Clean two-column layout (responsive to single column mobile)
- Large pricing numbers as focal points
- Clear transaction type labels
- Supporting explanation text
- Repeated CTA buttons below pricing

### Checkout Experience
- Full-width image showcase with overlay text
- Demonstrates product in action with real-world context

### Business Types Grid
- Photo-driven cards in 4-column grid (responsive collapse)
- Image fills card with gradient overlay for text readability
- Card titles positioned bottom-left
- Horizontal scrolling on mobile with visible next cards

### Testimonial Block
- Centered quote with large quotation marks
- Customer name and business prominently displayed
- Clean, spacious layout with max-w-3xl

### Product Icons Section
- 6-column grid collapsing to 2 on mobile
- Icon + label combinations
- Each item clickable with subtle hover state

### App Download Section
- Split layout: App screenshot left, content right (stacks on mobile)
- Large app screenshot showing interface
- Download buttons for both platforms
- Second variation for customer-facing app

### Footer
- Multi-column layout with legal disclaimers
- Links organized by category
- Newsletter signup integration
- Social media icons

## Animations

**Use Sparingly:**
- Card hover: Subtle lift (translateY) and shadow increase
- Hero CTAs: Gentle scale on hover
- Carousel: Smooth slide transitions
- Scroll reveal: Fade-in with slight translateY for sections (intersection observer)

## Images

**Hero Section:**
- Large, high-quality product image showing SumUp POS system with multiple devices
- Professional lifestyle photography with clean, bright lighting
- Image dimensions: 1500x1000px minimum
- Position: Right side on desktop, below headline on mobile

**Product Showcase Cards (5 images):**
1. POS system on wooden counter with card reader
2. Touchscreen kiosk with burger advertisement
3. Payment terminal displaying transaction amount with decorative items
4. Person holding payment card near reader in shop setting
5. Payment terminal showing contactless symbol with twine and plant

Each image: 800x600px, lifestyle photography style, real business contexts

**Seamless Checkout:**
- Full-width feature image (1500x800px) showing POS screen, cashier interaction, and reward offer
- Split into visual sections demonstrating workflow

**Business Types (9 images):**
- Professional lifestyle photos of various business settings
- Each 600x600px, showing business owner/employee in their environment
- Categories: Fast Casual, Barber Shop, Coffee & Tea, Nail Salon, Boutique, Pet Store, Dessert & Bakery, Home Goods, Enterprise

**App Screenshots:**
- Mobile phone mockup showing SumUp app interface
- 1284x2778px iPhone dimensions
- Shows transaction processing and business dashboard

**Product Icons:**
- Simple, clean icon set (use Heroicons or similar)
- 48x48px minimum for clarity

**Critical:** All images should maintain consistent lighting, professional quality, and showcase real business scenarios to build trust and relatability.