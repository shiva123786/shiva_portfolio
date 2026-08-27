# Kethavath Shiva — Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS portfolio, with a MongoDB-backed
contact form and per-project "like" counters, plus high-motion scroll/click
interactions (cursor glow, parallax hero, magnetic buttons, click ripples,
3D tilt project cards, scroll progress bar, typewriter role text).

## 1. Install

```bash
npm install
```

## 2. Configure MongoDB

Copy `.env.local.example` to `.env.local` and set your connection string
(e.g. a free MongoDB Atlas cluster):

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/
MONGODB_DB=portfolio
```

No manual schema setup needed — collections (`messages`, `project_likes`)
are created automatically on first write.

## 3. Configure contact email

The contact form sends messages directly to `shivakethavath50@gmail.com` with
the subject `New Portfolio Contact Message`. Configure the SMTP variables in
`.env.local`; for Gmail, use a Google app password rather than your account
password. `SMTP_USER` is used as the sender and the visitor's email is set as
`Reply-To`.

## 4. Run

```bash
npm run dev
```

Visit http://localhost:3000

## 5. Replace placeholders

Everything content-related lives in `data/portfolio.ts` — update GitHub/LinkedIn
URLs, email, and project repo/demo links there. Add your resume PDF at
`public/resume.pdf`.

## What uses MongoDB

- `app/api/contact/route.ts` — saves contact-form submissions to the `messages` collection.
- `app/api/visit/route.ts` — increments/reads a like counter per project in the `project_likes` collection (used by the heart button on each project card).

## Animation inventory (v3 — Network Canvas + Precision Cursor)

- **Live particle-network canvas** (`network-canvas.tsx`) — a fixed, full-viewport `<canvas>` behind the entire page (not just the hero). Drifting nodes connect with proximity-based lines; both node brightness and link opacity scale up with scroll progress, so the network "wakes up" as you scroll deeper. Reads `--bg`/`--accent` CSS vars live, so it re-colors instantly on theme toggle. Density adapts to viewport size, pauses via `visibilitychange` when the tab is backgrounded, and skips its animation loop entirely under `prefers-reduced-motion` (still renders one static frame).
- **Dual-layer cursor accent** (`cursor-glow.tsx`) — a small dot that tracks the pointer exactly (instant, scales up on mousedown) plus the existing large soft glow that lags behind via lerp. Both are additive on top of the real OS cursor — nothing is hidden, so it stays accessible. Off entirely on touch devices.
- **Letter-by-letter hero name reveal** (`split-text.tsx`) — "Kethavath Shiva" assembles character-by-character via staggered `.reveal-scale` spans (28ms/letter), timed so the rest of the hero's fade-ins follow it in sequence.
- 4-variant scroll reveal: `.reveal` (up), `.reveal-left`, `.reveal-right`, `.reveal-scale` — one IntersectionObserver hook (`use-reveal.ts`) drives all four via `[data-reveal]`
- Scroll progress bar (`scroll-progress.tsx`)
- Magnetic pull + expanding click-ripple on every interactive element (`.magnetic`, `use-magnetic.ts`), plus a standalone `<Magnetic>` wrapper for one-off elements
- Typewriter component cycling through role titles (`typewriter.tsx`)
- Animated count-up stats, cubic ease-out, triggered on scroll into view (`animated-counter.tsx`)
- 3D tilt cards with cursor-follow radial glow, used for skill cards and reusable via `<TiltCard>`; project cards use the same technique inline
- Flip cards for certifications — 3D `rotateY` flip on hover/focus, front = details, back = "Verified"
- Shine sweep (`.shine`) on primary/secondary buttons
- Gradient text on "Shiva" in the hero
- Animated nav-link underline that grows from center + scroll-spy active state
- Timeline pulse-ring dots in Experience
- Stat-card top-border sweep on hover
- Parallax hero (mouse-driven grid + floating orbs on different float cycles)
- Sticky navbar with blur-on-scroll
- Infinite tech marquee, pauses on hover, gradient fade edges
- GitHub-style contribution heatmap with hover scale
- All motion respects `prefers-reduced-motion`
