# DESIGN.md — Visual Design System

## Color Palette
```
Background base:       #0A0A1F → #1E1042 (diagonal gradient, navy to deep purple)
Glow/accent cyan:       #22D3EE
Glow/accent purple:     #A855F7
Gradient CTA:           linear-gradient(135deg, #7C3AED, #22D3EE)
Card background:        rgba(15, 15, 35, 0.6)  with backdrop-blur
Card border (glow):     rgba(34, 211, 238, 0.4), box-shadow glow on hover
Text primary:           #FFFFFF
Text secondary:         #9CA3AF
Danger/risk:            #EF4444 
(used only for "High Risk" style verdicts, per existing RULES.md convention)
```

## Typography
- Font: a clean geometric sans-serif — **Inter** (Google Fonts, free, pairs perfectly with this Tailwind/premium-SaaS aesthetic)
- Headline (H1): 40-56px, bold (700), tight letter-spacing, charcoal
- Section headings (H2): 28-32px, semibold (600)
- Body text: 16px, regular (400), 1.6 line-height, `#6B7280` for secondary copy
- Buttons/labels: 14-15px, medium (500)

## Spacing & Layout
- Use Tailwind's default spacing scale — don't invent custom pixel values
- Max content width: `max-w-7xl` for full sections, `max-w-3xl` for text-heavy blocks, `max-w-xl` for the center video column specifically
- Generous vertical section padding: `py-20` to `py-28` between major homepage sections — this is a minimalist premium layout, not a dense one

## Visual Direction / Mood
Think **Linear, Vercel, Stripe** homepage aesthetics — not a typical hackathon "colorful gradient everywhere" look. Calm, confident, lots of white space, high-quality typography doing most of the visual work, with 3D/motion used sparingly as an accent rather than the whole show.

## 3D Scene Direction (for Scene3D.tsx)
- 2-4 floating abstract elements only: e.g. a soft-glowing wireframe torus/sphere, a few translucent flat shards/panels at varying depth, or thin ribbon shapes suggesting a soundwave
- Indigo/lavender tones with soft emissive glow — no harsh saturated colors
- Slow, subtle motion only (gentle rotation, slight mouse-parallax) — nothing fast or attention-grabbing that competes with the headline text or the demo video
- Should read as "premium tech ambiance," not a game/particle-effects showcase

## Component Style Rules
- Buttons: pill-shaped (`rounded-full`), filled primary style for main CTA, outline style for secondary CTA
- Cards: `rounded-2xl`, subtle border (`border-gray-100`) or soft shadow (`shadow-sm`), hover lifts slightly (`hover:shadow-md hover:-translate-y-0.5`)
- Verdict pills (in the Dialer Demo): small, rounded-full, bold text, color strictly tied to verdict (red = cloned, green = verified) — never used decoratively elsewhere in the UI
- Video column: rounded corners (`rounded-2xl`), subtle indigo-tinted glow/shadow around it (`shadow-[0_0_40px_rgba(79,70,229,0.15)]`) to tie it visually to the brand color and the 3D scene around it

## Tone of Copy
Calm and reassuring, never fear-mongering. The product's purpose is to reduce panic during a scam attempt — the UI language should model that same calm confidence throughout (headlines, button labels, error states, everything).
