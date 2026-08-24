# ARCHITECTURE.md — App Flow & Technical Architecture

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** with TypeScript | File-based routing matches our page structure exactly; great for a vibe-coding workflow since AI tools generate clean Next.js code reliably |
| Styling | **Tailwind CSS** | Fast, consistent utility classes, easy for AI to generate correctly without inventing custom CSS |
| 3D / Interactive effects | **React Three Fiber (@react-three/fiber) + drei** | React-native wrapper around Three.js — far less error-prone for AI-generated code than raw Three.js |
| Animation (non-3D) | **Framer Motion** | Smooth page transitions, card hovers, button micro-interactions |
| State management | React built-in state (useState/useContext) — **no Redux/Zustand needed** for this scope | Keeps the codebase simple; avoid over-engineering |
| Video | Native HTML5 `<video>` with `autoPlay muted loop playsInline` | Simplest, most reliable way to loop the homepage demo video |
| Backend (site logic: auth, voice profile storage) | **Next.js API routes** (mocked initially) | Keeps frontend and lightweight backend logic in one deployable unit |
| Backend (ML inference) | **Separate FastAPI Python service** (built per the ML implementation doc) | Python is required for the PyTorch/HuggingFace model — kept as its own service, called via a `/api/analyze` proxy route from Next.js |
| Deployment (frontend) | Vercel (free tier) | Native Next.js support, zero-config |
| Deployment (ML backend) | Render or Railway (free tier) | Simple Python service hosting |

## High-Level App Flow

```
/                       → Homepage
/download               → Download App page
/login                  → Login / Signup (+ Guest Mode button)
/demo                   → Dialer Demo (protected route — Guest Mode or logged-in)
/train-voice            → Train Your Voice (protected route)
/api/analyze             → Proxy route → calls the FastAPI ML backend
/api/voice-profiles      → Mocked CRUD for trained voice profiles (localStorage/mock DB initially)
```

## Folder Structure

```
voxsentry-web/
├── app/
│   ├── layout.tsx                     # root layout, fonts, global providers
│   ├── page.tsx                       # Homepage
│   ├── globals.css                    # Tailwind base + custom CSS vars
│   ├── download/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── demo/
│   │   └── page.tsx                   # Dialer Demo
│   ├── train-voice/
│   │   └── page.tsx
│   └── api/
│       ├── analyze/route.ts           # proxies to FastAPI backend
│       └── voice-profiles/route.ts    # mocked profile storage
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── VideoColumn.tsx            # center-column looping demo video
│   │   ├── FeatureGrid.tsx
│   │   ├── StatsStrip.tsx
│   │   ├── TeamSection.tsx
│   │   └── Scene3D.tsx                # React Three Fiber canvas + effects
│   ├── demo/
│   │   ├── PhoneCallScreen.tsx
│   │   ├── JudgeControlPanel.tsx
│   │   ├── VerdictCard.tsx
│   │   └── SpectrogramView.tsx
│   ├── train-voice/
│   │   ├── ConsentStep.tsx
│   │   ├── RecordingStep.tsx
│   │   ├── ProcessingStep.tsx
│   │   └── VoiceLibrary.tsx
│   └── ui/                            # shared buttons, cards, inputs
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Pill.tsx
├── lib/
│   ├── mockData.ts                    # sample clips, mock verdicts for frontend-only testing
│   └── utils.ts
├── public/
│   ├── videos/
│   │   └── homepage-demo.mp4          # the looping center-column video
│   └── audio-samples/                 # demo clips for the Dialer Demo dropdown
├── PRD.md
├── ARCHITECTURE.md
├── RULES.md
├── PHASES.md
├── DESIGN.md
└── package.json
```

## Key Architectural Decisions
- **Frontend and ML backend are decoupled** — the Next.js app never imports Python code; it always talks to the FastAPI service over HTTP. This lets the frontend be built and demoed even before the model is fully trained (using `lib/mockData.ts` as a stand-in).
- **3D scene is isolated in its own component** (`Scene3D.tsx`) and lazy-loaded with `next/dynamic` (`ssr: false`) — Three.js code must never block server-side rendering or slow the initial page load.
- **Video sits in its own dedicated component** (`VideoColumn.tsx`), not inline in the Hero, so it can be swapped/updated independently.
