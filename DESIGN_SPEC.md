# ATHLYNX PLATFORM - COMPLETE DESIGN SPECIFICATION
## Based on 127 Screenshots from Netlify Sites

---

## COLOR PALETTE

### Primary Colors
- **Background Gradient**: `from-slate-900 via-blue-900 to-slate-900` (dark blue/navy)
- **Accent Cyan**: `#00D9FF` / `text-cyan-400`
- **Accent Yellow/Gold**: `#FFD700` / `text-yellow-400`
- **White Text**: `#FFFFFF`

### Secondary Colors
- **Card Background**: `bg-slate-800/50` (semi-transparent dark)
- **Border**: `border-slate-700`
- **Button Primary**: `bg-cyan-500 hover:bg-cyan-600`
- **Button Secondary**: `bg-yellow-500 hover:bg-yellow-600`

---

## TYPOGRAPHY

### Fonts
- **Primary**: Inter, system-ui, sans-serif
- **Headings**: Bold, uppercase tracking-wide
- **Body**: Regular weight, normal tracking

### Sizes
- **Hero Title**: `text-6xl md:text-8xl font-bold`
- **Section Title**: `text-4xl md:text-5xl font-bold`
- **Subtitle**: `text-xl md:text-2xl`
- **Body**: `text-base md:text-lg`
- **Small**: `text-sm`

---

## LOGO HIERARCHY

### Top Center (Main)
- **DHG Crab Logo** - 128x128px, centered

### Icon Row (Below Crab)
- **Diamond Grind** - 80x80px, rounded-2xl
- **Dozier Holdings** - 80x80px, rounded-2xl
- **NIL Portal** - 80x80px, rounded-2xl
- **Warriors Playbook/Athlynx** - 80x80px, rounded-2xl

---

## PAGE LAYOUTS

### 1. VIP EARLY ACCESS LANDING (/)
**Components:**
- DHG Crab logo (top center)
- 4 app icons row
- "THE FUTURE OF ATHLETE SUCCESS" (cyan, uppercase)
- "ATHLYNX" (huge white text)
- "THE ATHLETE'S PLAYBOOK" (yellow/gold)
- VIP badge: "🏆 VIP EARLY ACCESS 6 MONTHS FREE" (cyan/blue gradient)
- Countdown timer (DAYS, HRS, MIN, SEC) - yellow numbers
- "FEBRUARY 1, 2026"
- "🔥 FOUNDING MEMBER SPOTS LIMITED TO 10,000"
- Progress bar (spots remaining)
- Email signup form
- Phone input (optional)
- Role selection: Athlete, Parent, Coach, Brand
- Sport selection: Baseball, Football, Basketball, etc.
- "🏆 CLAIM MY VIP SPOT" button (yellow)
- "Preview the App →" link

### 2. "YOU'RE IN!" CONFIRMATION
**Components:**
- Success message
- "Welcome to the future of athlete success"
- Next steps
- Download app links

### 3. THE ATHLETE'S PLAYBOOK
**Components:**
- Black background with gold accents
- "Your Complete Success System"
- Feature cards
- Call to action

### 4. NIL PORTAL
**Components:**
- "THE FUTURE OF ATHLETE FINANCE IS COMING"
- Deal marketplace
- Brand connections
- Earnings tracker

### 5. DIAMOND GRIND DASHBOARD
**Components:**
- "Good afternoon, Diamond!"
- Exposure score (circular progress)
- Recent activity
- Training schedule
- Performance metrics

### 6. DHG PLATFORM HUB
**Components:**
- "Empowering Athletes Through Innovation"
- 3 app cards (NIL Portal, Messenger, Diamond Grind)
- Feature highlights
- Get started CTA

### 7. OUR APPS PAGE
**Components:**
- Grid layout
- NIL Portal card
- Diamond Grind card
- Messenger card (coming soon)
- Feature descriptions

### 8. ATHLETE PROFILES
**Components:**
- Profile header (photo, name, sport, position)
- Stats section
- Highlights/videos
- Recruiting info
- Contact button

### 9. MESSAGING INTERFACE
**Components:**
- Conversation list
- Chat window
- Message composer
- Attachment support

### 10. STORE/E-COMMERCE
**Components:**
- Product grid
- Category filters
- Product cards (image, name, price)
- Add to cart
- Checkout flow

---

## COMPONENT STYLES

### Buttons
```
Primary: bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg
Secondary: bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg
Outline: border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black py-3 px-8 rounded-lg
```

### Cards
```
bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl
```

### Input Fields
```
bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400
```

### Badges
```
bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2 px-6 rounded-full
```

---

## NAVIGATION

### Top Navigation (Logged Out)
- Logo (left)
- Links: Home, Features, Pricing, About
- "Sign In" button
- "Get Started" button (cyan)

### Top Navigation (Logged In)
- Logo (left)
- Links: Dashboard, NIL Portal, Diamond Grind, Messenger, Store
- Profile dropdown (right)
- Notifications icon

### Mobile Navigation
- Hamburger menu
- Slide-out drawer
- Same links as desktop

---

## ANIMATIONS

### Hover Effects
- Buttons: scale(1.05) + brightness increase
- Cards: translateY(-4px) + shadow increase
- Links: color transition

### Page Transitions
- Fade in on load
- Slide up for cards
- Stagger animation for lists

### Countdown Timer
- Flip animation for number changes
- Pulse effect on reaching milestones

---

## RESPONSIVE BREAKPOINTS

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Adjustments
- Stack hero elements vertically
- Single column layouts
- Larger touch targets (min 44px)
- Simplified navigation

---

## ICONS & IMAGERY

### Icon Style
- Line icons (2px stroke)
- Rounded corners
- Consistent sizing (24px default)

### Image Treatment
- Rounded corners (8px-16px)
- Subtle shadow
- Aspect ratios: 16:9 (hero), 1:1 (profile), 4:3 (products)

---

## SPECIAL EFFECTS

### Gradient Backgrounds
- Radial gradients for hero sections
- Linear gradients for cards
- Animated gradient shifts on hover

### Glass Morphism
- backdrop-blur-sm
- bg-opacity-50
- border with low opacity

### Shadows
- sm: `shadow-sm` (subtle)
- md: `shadow-md` (cards)
- lg: `shadow-lg` (modals)
- xl: `shadow-xl` (hero elements)

---

## BRAND VOICE

### Tone
- Confident
- Empowering
- Professional
- Aspirational

### Key Messages
- "The Future of Athlete Success"
- "Your Complete Playbook"
- "Empowering Athletes Through Innovation"
- "One App. Everything Built In."

---

## IMPLEMENTATION NOTES

1. Use Tailwind CSS for all styling
2. Leverage shadcn/ui components where possible
3. Maintain consistent spacing (4px grid)
4. Ensure WCAG AA accessibility
5. Optimize images (WebP format, lazy loading)
6. Test on real devices (iOS, Android)
7. Performance budget: < 3s load time

---

## PRIORITY PAGES (Build Order)

1. ✅ VIP Early Access Landing
2. ⬜ You're In! Confirmation
3. ⬜ The Athlete's Playbook
4. ⬜ DHG Platform Hub
5. ⬜ OUR APPS Page
6. ⬜ NIL Portal Landing
7. ⬜ Diamond Grind Dashboard
8. ⬜ Athlete Profiles
9. ⬜ Messaging Interface
10. ⬜ Store/E-Commerce

---

*Last Updated: December 28, 2025*
*Based on: 127 screenshots from Netlify deployments*
