# PHASES.md — Build Phases

Build in this exact order. Do not start a phase until the previous one is working and visually reviewed. Each phase should end in a runnable, non-broken app.

## Phase 0 — Project Setup
- Initialize Next.js 14 (App Router, TypeScript, Tailwind) project
- Install: @react-three/fiber, @react-three/drei, three, framer-motion, lucide-react
- Set up folder structure exactly as defined in `ARCHITECTURE.md`
- Configure Tailwind theme (colors, fonts) per `DESIGN.md`
- Create empty placeholder pages for all 5 routes (`/`, `/download`, `/login`, `/demo`, `/train-voice`) so routing works end-to-end before any real UI is built
- Add `Navbar` and `Footer` to the root layout

## Phase 1 — Homepage: Static Structure (no 3D, no video yet)
- Build `Hero.tsx` — headline, subheadline, two CTA buttons (static, no animation)
- Build `FeatureGrid.tsx` — 6 feature cards with icons
- Build `StatsStrip.tsx` — 3 stat cards (use placeholder numbers from `mockData.ts`)
- Build `TeamSection.tsx` — 6 team member cards
- Assemble all sections into `app/page.tsx` in order: Navbar → Hero → VideoColumn (placeholder box for now) → FeatureGrid → StatsStrip → TeamSection → Footer
- **Checkpoint:** homepage should scroll top to bottom with all sections visible and responsive, no console errors

## Phase 2 — Homepage: Video Column
- Build `VideoColumn.tsx` as its own centered column section, positioned in the **middle of the homepage** (between Hero and FeatureGrid, or as specified)
- Video: `autoPlay muted loop playsInline`, rounded corners, subtle shadow/glow border matching the color palette, contained in a max-width column (not full-bleed)
- Add a poster image fallback
- **Checkpoint:** video loops seamlessly, doesn't block page load, looks intentional (not just a raw unstyled `<video>` tag)

## Phase 3 — Homepage: 3D & Interactive Effects
- Build `Scene3D.tsx` using React Three Fiber — floating abstract geometric shapes (per `DESIGN.md` visual direction) positioned behind/around the Hero and VideoColumn sections
- Lazy-load via `next/dynamic` with `ssr: false`
- Add subtle mouse-parallax or gentle auto-rotation (nothing distracting)
- Include the static-fallback requirement from `RULES.md`
- **Checkpoint:** homepage feels premium/interactive but still loads fast; disable/simplify on mobile if performance suffers

## Phase 4 — Download App Page
- Build the 4-step setup flow, screenshots section (placeholder images fine), system requirements table, "what it does NOT do" honesty box
- **Checkpoint:** page is complete and responsive

## Phase 5 — Login Page
- Build login form (mocked — no real backend auth yet, just client-side state + redirect)
- Build the **Guest/Judge Mode** button prominently — clicking it sets a mock session and redirects straight to `/demo`
- **Checkpoint:** both "successful login" and "guest mode" correctly redirect to `/demo`

## Phase 6 — Dialer Demo Page (the centerpiece — give this the most polish time)
- Build `PhoneCallScreen.tsx` — simulated call UI with waveform animation
- Build `JudgeControlPanel.tsx` — dropdown/upload to select which mock clip "calls," scenario preset buttons
- Build `VerdictCard.tsx` — animated verdict reveal (real/cloned, confidence %)
- Build `SpectrogramView.tsx` — static or simply-animated placeholder graphic (real spectrogram data comes later when connected to the real backend)
- Wire everything to `lib/mockData.ts` first — clicking a scenario should trigger a realistic mocked loading → verdict sequence
- **Checkpoint:** a user can select a clip, watch a believable loading/analysis animation, and see a clear verdict — entirely on mock data, no backend needed yet

## Phase 7 — Train Your Voice Page
- Build `ConsentStep.tsx`, `RecordingStep.tsx` (with browser mic access + waveform), `ProcessingStep.tsx` (animated checklist), `VoiceLibrary.tsx` (dashboard of trained profiles, using mock/local state)
- Wire the "Test this voice" button on each profile card to redirect into `/demo` with that profile pre-selected
- **Checkpoint:** full flow works end to end using mocked processing (no real embedding generation yet)

## Phase 8 — Polish Pass
- Add Framer Motion page-transition animations between routes
- Add hover/tap micro-interactions to all buttons and cards
- Full responsive audit across all 5 pages
- Full accessibility audit (keyboard nav, contrast, aria-labels)
- **Checkpoint:** entire site feels cohesive and production-quality

## Phase 9 — Connect Real Backend (only after Phase 8 is stable)
- Replace `lib/mockData.ts` calls in the Dialer Demo with real calls to `/api/analyze`, which proxies to the FastAPI ML service
- Replace mocked voice-profile storage with real persistence
- **Checkpoint:** live audio uploaded by a judge gets a real verdict from the trained model
