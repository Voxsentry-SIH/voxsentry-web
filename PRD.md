# PRD.md — Project Requirements Document

## Project Name
**VoxSentry** (placeholder — rename everywhere via find-and-replace if you land on a different final name)

## One-Line Description
A web platform for an AI-powered real-time voice-clone detection system — showcases the product, lets visitors download the Android overlay app, and gives judges/visitors a live in-browser demo of the detection technology.

## Problem Being Solved
Voice-cloning scams (fake "relative in trouble," fake CEO/bank calls) are rising and hard to detect by ear. This project detects synthetic/cloned voices in real time during a call and warns the user before harm happens.

## Target Users
1. **End users** — people who install the Android app for real-world protection on calls
2. **Hackathon judges / evaluators** — need to understand and test the technology in under a minute, without installing anything
3. **Families** — parents/elderly relatives who want to "train" trusted voices (Mom, Dad) so the system recognizes real vs. cloned versions of people they know

## Core Pages / Features (MVP scope)

| Page | Purpose | Must-have elements |
|---|---|---|
| **Homepage** | Convert visitors into downloaders or demo-testers in seconds | Hero section, headline + subheadline, two CTA buttons ("Download App", "Try Live Demo"), a **center-column looping demo video**, feature grid (3-6 cards), stats strip (accuracy/latency numbers), 3D interactive background elements (Three.js), team section, footer |
| **Download App** | Get a real user from curious → installed | APK download CTA, 4-step setup flow (download → install → grant overlay permission → protected), screenshots, "what it does NOT do" honesty section, system requirements |
| **Login / Sign up** | Gate before the live demo + account system for saved voice profiles | Email+password form, Google login option, **Guest/Judge Mode** button that skips straight into the demo without an account |
| **Dialer Demo (post-login)** | The centerpiece — lets a judge test the AI live in-browser | Simulated phone call screen, dropdown/upload to select audio clip, live waveform, verdict pill (cloned/real + confidence %), explainability panel (spectrogram), scenario presets (bank fraud, family emergency, CEO impersonation) |
| **Train Your Voice** | Personalized voice enrollment | Consent screen, guided multi-sample recording flow with live progress, audio quality validation, processing/embedding animation, voice library dashboard (cards per enrolled person), "test this voice" button that feeds into the Dialer Demo |

## Non-Functional Requirements
- Fully responsive (desktop-first design, but must degrade gracefully on mobile/tablet)
- Fast initial load — 3D/Three.js elements must not block first paint (lazy-load them)
- Accessible: proper contrast, keyboard navigation, alt text, ARIA labels on interactive elements
- No real backend ML model required to ship the **frontend** — build with mocked/stubbed API responses first, wire to the real FastAPI backend (built separately, see ml_implementation doc) once the frontend is stable

## Explicitly Out of Scope (for this MVP)
- Actual iOS app (site shows "Coming Soon")
- Payment/subscription system
- Admin dashboard / analytics backend
- Real production authentication (email verification, password reset flows) — a working login form with mocked auth is enough for the hackathon build

## Success Criteria
A judge should be able to: land on the homepage → understand the product in 10 seconds → click "Try Live Demo" → reach the Dialer Demo without creating an account → test a cloned voice clip → see a clear, confident verdict with an explanation — all in under 60 seconds.
