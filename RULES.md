# RULES.md — Boundaries for the AI Coding Assistant

## Libraries — Use ONLY these unless explicitly told otherwise
- Next.js 14+ (App Router), TypeScript
- Tailwind CSS for all styling — **no inline styles, no styled-components, no CSS modules**
- @react-three/fiber + @react-three/drei for all 3D/Three.js work — **never write raw Three.js imperative code directly**
- Framer Motion for animations/transitions
- lucide-react for icons
- No new npm package may be installed without first stating which package and why — don't silently add dependencies

## Code Style Rules
- Every component is a **separate file** in the folder structure defined in `ARCHITECTURE.md` — never put multiple unrelated components in one file
- Use TypeScript types/interfaces for all props — no `any` types
- Every interactive element (button, link, form input) must have proper accessibility attributes (aria-label where the visual label isn't descriptive enough)
- Mobile responsiveness is not optional — every component must be checked at `sm`, `md`, and `lg` Tailwind breakpoints before being considered done
- Never fabricate data as if it were real — mock data in `lib/mockData.ts` must be clearly labeled as mock, and any accuracy/latency numbers shown must come from `mockData.ts`, not invented inline in a component

## 3D / Three.js Specific Rules
- All 3D scenes must be **lazy-loaded** with `next/dynamic({ ssr: false })` — never rendered server-side
- Must include a **static fallback** (a gradient background or static image) for low-power devices or if WebGL fails to initialize — detect via a try/catch or `@react-three/drei`'s `Detailed`/`Preload` patterns
- Keep 3D scenes to 2-4 objects maximum — this is a minimalist premium aesthetic (per `DESIGN.md`), not a busy particle-effect showcase
- Animation loops must use `useFrame` responsibly — no unbounded loops that spike CPU/GPU on idle pages

## Video Rules
- The homepage demo video uses native `<video autoPlay muted loop playsInline>` — **never** a heavy JS video library for this
- Always include a `poster` attribute (a static frame) so there's no blank flash before the video loads
- Video file must live in `public/videos/` and be referenced by relative path — do not hardcode an external URL

## Error Handling Rules
- Every API call (`fetch` to `/api/analyze` etc.) must have a loading state, an error state, and a success state shown in the UI — never leave a silent failure
- Form inputs (login, voice training) must show inline validation messages, not just block submission silently

## What the AI Should NOT Do
- Do not modify files outside the current phase's scope (see `PHASES.md`) unless fixing a bug that blocks the current phase
- Do not delete or rewrite `PRD.md`, `ARCHITECTURE.md`, `RULES.md`, `PHASES.md`, or `DESIGN.md` — these are the source of truth
- Do not invent new pages/routes not listed in `ARCHITECTURE.md` without flagging it first
- Do not silently change the color palette, fonts, or spacing scale defined in `DESIGN.md`
- Do not connect to the real FastAPI ML backend until explicitly instructed — build against `lib/mockData.ts` first

## When Stuck
If a requirement is ambiguous, state the assumption being made in a code comment and proceed with the most reasonable interpretation rather than stalling — but flag it in the response so it can be corrected later.
