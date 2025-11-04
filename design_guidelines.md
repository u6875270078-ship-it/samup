# Minimal Black & White Login Page - Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based (Minimalist Authentication)

**Primary References:** Linear login, Notion authentication, Stripe's monochrome admin interfaces

**Key Design Principles:**
- Radical simplicity through black and white constraint
- Generous whitespace as a design element
- Typography hierarchy creates all visual interest
- Form-focused with zero distractions
- Centered, balanced composition

## Typography

**Font Family:** Inter (Google Fonts) - exceptional clarity in monochrome contexts

**Type Scale:**
- Page Title: 3xl to 4xl, weight 700 - Strong, confident
- Form Labels: sm, weight 500 - Subtle, purposeful
- Input Text: base, weight 400 - Optimal readability
- Button Text: sm, weight 600 - Medium emphasis
- Helper Text: xs to sm, weight 400 - Understated guidance
- Error Messages: sm, weight 500 - Clear but not alarming
- Link Text: sm, weight 500 - Distinct through underline only

## Layout System

**Spacing Primitives:** Tailwind units of 2, 3, 4, 6, 8, 12, 16, 24

**Core Layout:**
- Centered card approach: max-w-md with full viewport centering
- Internal card padding: p-8 to p-12
- Form field vertical spacing: space-y-6
- Input group spacing: space-y-2
- Button top margin: mt-8
- Section dividers: my-8

**Composition:**
- Left-aligned text within centered container
- Balanced whitespace (equal margins all around)
- Single column form layout
- Optional logo placement: top-left absolute or centered above card

## Component Library

### Container Card
- White background (default body)
- Subtle border: 1px solid with very light treatment
- Rounded corners: rounded-lg
- Optional subtle shadow for depth perception
- Width: w-full max-w-md
- Position: Centered both horizontally and vertically in viewport

### Form Inputs
- Border style: 1px solid black
- Height: h-12 for comfortable touch targets
- Padding: px-4
- Rounded: rounded-md
- Focus state: Thicker border (2px) for clarity
- Placeholder: Light treatment for hierarchy
- Full width within container

### Labels
- Positioned above inputs with mb-2
- Left-aligned for scannability
- Optional asterisk for required fields

### Primary Button
- Full width: w-full
- Height: h-12 for consistency with inputs
- Background: Solid black
- Text: White, centered
- Rounded: rounded-md
- Hover state: Slight transparency shift
- Active state: Subtle scale

### Secondary Actions
- Text-only links
- Underline on hover only
- Positioned below button with mt-4
- Center-aligned

### Divider
- Horizontal rule with text ("or" continuation)
- Text centered with line on either side
- Spacing: my-8

### Error States
- Error text: Below relevant input with mt-2
- Border color change on input (remains black, but thicker)
- Small icon optional (exclamation mark)

### Social Login Buttons (Optional)
- Outlined style: 1px border, transparent background
- Logo + text layout
- Height: h-12
- Spacing between buttons: space-y-3
- Hover: Background fills with very subtle treatment

## Page Structure

**Single Column Layout:**
1. **Header Area** (optional)
   - Logo positioned top-center or top-left (mb-12)
   - Minimal, icon-only or wordmark

2. **Main Content Card**
   - Title/Heading: "Welcome back" or "Sign in"
   - Supporting text if needed (mb-8)
   - Form fields:
     - Email input with label
     - Password input with label and visibility toggle
     - "Forgot password?" link right-aligned below password
   - Primary CTA button
   - Divider (if social login present)
   - Social login buttons (if needed)
   - Bottom links: "Don't have an account? Sign up" centered

3. **Footer** (optional)
   - Minimal links (Privacy, Terms) centered at bottom
   - Small text size (text-xs)

## Interaction States

**Minimal Animation:**
- Input focus: Smooth border transition (150ms)
- Button hover: Opacity transition (200ms)
- Form submission: Button disabled state with subtle indicator

**No Complex Animations:**
- No slide-ins, fade-ins, or scroll effects
- Instant page load
- Direct, immediate feedback

## Accessibility

- High contrast maintained (pure black on white)
- Proper label/input associations
- Visible focus states with clear borders
- Keyboard navigation fully supported
- Error messages announced to screen readers
- Touch targets minimum 44x44px

## Images

**No Images Required** - This is a pure form-based interface. If branding is needed:
- Logo: Simple SVG icon or wordmark (100x40px max)
- Position: Top-center with mb-8 to mb-12
- Monochrome treatment only

## Critical Implementation Notes

- Body background: Pure white
- All text: Pure black (#000000)
- All borders: Pure black
- No gradients, shadows optional and extremely subtle
- Input backgrounds: White (matching page)
- Button: Solid black background, white text
- Maintain consistent border weights: 1px default, 2px focus
- Form centered: min-h-screen flex items-center justify-center
- Responsive: Same design on all viewports (form stays max-w-md)