"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnalysisCone() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible">
      {/* Background soft ambient bloom */}
      <motion.div 
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.45, 0.65, 0.45]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[150%] max-w-[900px] h-[600px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 25%, rgba(99, 102, 241, 0.35), rgba(168, 85, 247, 0.25), rgba(6, 182, 212, 0.18), transparent 70%)"
        }}
      />

      {/* Main High-Density Inverted Funnel SVG */}
      <svg
        viewBox="0 0 800 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[850px] max-h-[680px] select-none overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Neon & Bloom Filters */}
          <filter id="coneGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="flareGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="16" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
          </filter>

          {/* Plus (+) grid pattern for the tech background */}
          <pattern id="plusGrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 18,14 L 18,22 M 14,18 L 22,18" stroke="#818CF8" strokeWidth="1" opacity="0.12" />
          </pattern>

          {/* Trapezoid Base Gradient Fill */}
          <linearGradient id="funnelInterior" x1="400" y1="20" x2="400" y2="560" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E164D" stopOpacity="0.55" />
            <stop offset="30%" stopColor="#2E1065" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#1E1B4B" stopOpacity="0.5" />
            <stop offset="95%" stopColor="#0B092B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#050514" stopOpacity="0.95" />
          </linearGradient>

          {/* Edge Glow Gradients */}
          <linearGradient id="leftEdgeGrad" x1="60" y1="20" x2="330" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#818CF8" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="rightEdgeGrad" x1="740" y1="20" x2="470" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#818CF8" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
          </linearGradient>

          {/* Waveform Mesh Gradients */}
          <linearGradient id="meshGrad1" x1="80" y1="0" x2="720" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
            <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#C084FC" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E879F9" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="meshGrad2" x1="120" y1="0" x2="680" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.2" />
            <stop offset="30%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.2" />
          </linearGradient>

          {/* Badge Background Gradients */}
          <linearGradient id="badgeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
          </linearGradient>

          {/* Top/Bottom Fade Mask */}
          <linearGradient id="funnelMaskGrad" x1="400" y1="0" x2="400" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="5%" stopColor="#fff" stopOpacity="1" />
            <stop offset="90%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          <mask id="funnelMask">
            <polygon points="50,15 750,15 480,560 320,560" fill="url(#funnelMaskGrad)" />
          </mask>
        </defs>

        {/* ======================================================== */}
        {/* 1. BACKGROUND PLUS (+) GRID PATTERN */}
        {/* ======================================================== */}
        <rect x="0" y="0" width="800" height="680" fill="url(#plusGrid)" />

        {/* ======================================================== */}
        {/* 2. VOLUMETRIC TRAPEZOID TUNNEL INTERIOR */}
        {/* ======================================================== */}
        <g mask="url(#funnelMask)">
          {/* Main Translucent Volumetric Base */}
          <polygon
            points="60,20 740,20 470,540 330,540"
            fill="url(#funnelInterior)"
          />

          {/* Inner radial gradient glow */}
          <ellipse
            cx="400"
            cy="150"
            rx="320"
            ry="180"
            fill="radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(168,85,247,0.1) 50%, transparent 80%)"
          />

          {/* ======================================================== */}
          {/* 3. DENSE PERSPECTIVE CONVERGENCE RAYS (3D Tunnel Depth) */}
          {/* ======================================================== */}
          <g opacity="0.45" strokeWidth="0.75">
            {/* Left Bank Perspective Rays converging to (400, 520) */}
            <line x1="80" y1="20" x2="400" y2="520" stroke="#38BDF8" strokeOpacity="0.4" strokeDasharray="4 6" />
            <line x1="120" y1="20" x2="400" y2="520" stroke="#818CF8" strokeOpacity="0.5" />
            <line x1="160" y1="20" x2="400" y2="520" stroke="#6366F1" strokeOpacity="0.45" />
            <line x1="200" y1="20" x2="400" y2="520" stroke="#38BDF8" strokeOpacity="0.6" strokeDasharray="6 4" />
            <line x1="240" y1="20" x2="400" y2="520" stroke="#818CF8" strokeOpacity="0.5" />
            <line x1="280" y1="20" x2="400" y2="520" stroke="#6366F1" strokeOpacity="0.55" />
            <line x1="320" y1="20" x2="400" y2="520" stroke="#38BDF8" strokeOpacity="0.7" strokeDasharray="3 5" />
            <line x1="360" y1="20" x2="400" y2="520" stroke="#818CF8" strokeOpacity="0.7" />

            {/* Right Bank Perspective Rays converging to (400, 520) */}
            <line x1="440" y1="20" x2="400" y2="520" stroke="#818CF8" strokeOpacity="0.7" />
            <line x1="480" y1="20" x2="400" y2="520" stroke="#A855F7" strokeOpacity="0.7" strokeDasharray="3 5" />
            <line x1="520" y1="20" x2="400" y2="520" stroke="#6366F1" strokeOpacity="0.55" />
            <line x1="560" y1="20" x2="400" y2="520" stroke="#818CF8" strokeOpacity="0.5" />
            <line x1="600" y1="20" x2="400" y2="520" stroke="#C084FC" strokeOpacity="0.6" strokeDasharray="6 4" />
            <line x1="640" y1="20" x2="400" y2="520" stroke="#6366F1" strokeOpacity="0.45" />
            <line x1="680" y1="20" x2="400" y2="520" stroke="#818CF8" strokeOpacity="0.5" />
            <line x1="720" y1="20" x2="400" y2="520" stroke="#A855F7" strokeOpacity="0.4" strokeDasharray="4 6" />

            {/* Lateral wall angled perspective rays */}
            <line x1="145" y1="180" x2="400" y2="520" stroke="#38BDF8" strokeOpacity="0.3" />
            <line x1="205" y1="300" x2="400" y2="520" stroke="#818CF8" strokeOpacity="0.35" />
            <line x1="265" y1="410" x2="400" y2="520" stroke="#6366F1" strokeOpacity="0.4" />

            <line x1="655" y1="180" x2="400" y2="520" stroke="#A855F7" strokeOpacity="0.3" />
            <line x1="595" y1="300" x2="400" y2="520" stroke="#818CF8" strokeOpacity="0.35" />
            <line x1="535" y1="410" x2="400" y2="520" stroke="#6366F1" strokeOpacity="0.4" />
          </g>

          {/* ======================================================== */}
          {/* 4. CONCENTRIC 3D SCANNING WIREFRAME RINGS */}
          {/* ======================================================== */}
          {/* Ring 1 (Top Level) */}
          <g opacity="0.5">
            <ellipse cx="400" cy="85" rx="310" ry="26" stroke="#818CF8" strokeWidth="1" strokeDasharray="12 8 4 8" />
            <ellipse cx="400" cy="85" rx="290" ry="24" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.6" />
          </g>

          {/* Ring 2 (Upper-Mid Level) */}
          <g opacity="0.6">
            <ellipse cx="400" cy="190" rx="230" ry="20" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="16 10 6 10" />
            <ellipse cx="400" cy="190" rx="210" ry="18" stroke="#818CF8" strokeWidth="0.6" strokeOpacity="0.5" />
          </g>

          {/* Ring 3 (Mid-Level 3D Latitude Mesh) */}
          <g opacity="0.7">
            <ellipse cx="400" cy="300" rx="160" ry="16" stroke="#C084FC" strokeWidth="1.2" strokeDasharray="10 6 3 6" filter="url(#coneGlow)" />
            <ellipse cx="400" cy="300" rx="145" ry="14" stroke="#818CF8" strokeWidth="0.75" />
            {/* Latitude Grid Ticks */}
            <circle cx="240" cy="300" r="2.5" fill="#38BDF8" />
            <circle cx="560" cy="300" r="2.5" fill="#C084FC" />
          </g>

          {/* Ring 4 (Lower Scanning Ellipse) */}
          <g opacity="0.8">
            <ellipse cx="400" cy="410" rx="100" ry="12" stroke="#22D3EE" strokeWidth="1.4" strokeDasharray="8 5 2 5" filter="url(#coneGlow)" />
            <ellipse cx="400" cy="410" rx="90" ry="10" stroke="#818CF8" strokeWidth="0.75" />
          </g>

          {/* Ring 5 (Convergence Collar) */}
          <g opacity="0.9">
            <ellipse cx="400" cy="505" rx="55" ry="8" stroke="#38BDF8" strokeWidth="1.5" filter="url(#coneGlow)" />
            <ellipse cx="400" cy="505" rx="42" ry="6" stroke="#818CF8" strokeWidth="0.8" />
          </g>

          {/* ======================================================== */}
          {/* 5. ORGANIC MULTI-LAYER AUDIO WAVEFORM MESH (Cyan to Magenta) */}
          {/* ======================================================== */}
          <g filter="url(#coneGlow)" opacity="0.95">
            {/* Layer 1: Primary Upper Sine Wave Ribbon */}
            <path
              d="M 70,85 C 120,40 160,135 210,75 C 260,20 300,140 350,65 C 400,-10 440,150 490,75 C 540,10 580,140 630,70 C 680,15 710,110 730,85"
              fill="none"
              stroke="url(#meshGrad1)"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
            {/* Layer 2: Harmonic Interlaced Wave */}
            <path
              d="M 85,90 C 135,140 175,50 225,100 C 275,150 315,40 365,95 C 415,155 455,30 505,105 C 555,160 595,50 645,100 C 690,145 715,65 725,90"
              fill="none"
              stroke="url(#meshGrad2)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Layer 3: High-Frequency Dotted Signal Trail */}
            <path
              d="M 90,82 C 140,55 180,115 230,80 C 280,45 320,120 370,75 C 420,30 460,130 510,80 C 560,35 600,125 650,80 C 690,45 715,100 720,82"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              strokeOpacity="0.8"
            />

            {/* Secondary Waveform Layer in Extraction Zone */}
            <path
              d="M 150,195 C 190,165 230,230 270,185 C 310,145 350,235 390,180 C 430,135 470,230 510,180 C 550,140 590,220 620,195 C 640,180 650,210 660,195"
              fill="none"
              stroke="url(#meshGrad1)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Vertical Spectrogram Bar Field */}
            <g stroke="#818CF8" strokeWidth="1.2" opacity="0.45">
              {[120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620, 640, 660, 680].map((x, i) => {
                const h = 8 + ((i * 11) % 28);
                return <line key={x} x1={x} y1={85 - h / 2} x2={x} y2={85 + h / 2} stroke={i % 2 === 0 ? "#38BDF8" : "#C084FC"} />;
              })}
            </g>
          </g>

          {/* ======================================================== */}
          {/* 6. EXTRACTED DATA PARTICLES (Flowing along perspective) */}
          {/* ======================================================== */}
          <g>
            {[
              { cx: 180, cy: 65, r: 2, f: "#38BDF8" },
              { cx: 270, cy: 110, r: 1.5, f: "#818CF8" },
              { cx: 340, cy: 155, r: 2.5, f: "#22D3EE" },
              { cx: 480, cy: 130, r: 2, f: "#C084FC" },
              { cx: 580, cy: 95, r: 2.5, f: "#38BDF8" },
              { cx: 640, cy: 70, r: 1.5, f: "#E879F9" },

              { cx: 230, cy: 220, r: 2, f: "#38BDF8" },
              { cx: 310, cy: 245, r: 2.5, f: "#818CF8" },
              { cx: 490, cy: 235, r: 2, f: "#A855F7" },
              { cx: 560, cy: 215, r: 2.5, f: "#38BDF8" },

              { cx: 290, cy: 330, r: 2.5, f: "#22D3EE" },
              { cx: 350, cy: 355, r: 2, f: "#818CF8" },
              { cx: 450, cy: 345, r: 2, f: "#C084FC" },
              { cx: 510, cy: 325, r: 2.5, f: "#38BDF8" },

              { cx: 345, cy: 435, r: 2, f: "#38BDF8" },
              { cx: 380, cy: 460, r: 2.5, f: "#22D3EE" },
              { cx: 420, cy: 455, r: 2.5, f: "#A855F7" },
              { cx: 455, cy: 430, r: 2, f: "#818CF8" },
            ].map((p, idx) => (
              <circle key={idx} cx={p.cx} cy={p.cy} r={p.r} fill={p.f} filter="url(#coneGlow)" />
            ))}
          </g>

          {/* ======================================================== */}
          {/* 7. CENTRAL VERTICAL FLOW & STAGE ANNOTATION BADGES */}
          {/* ======================================================== */}
          {/* Central Vertical Luminous Axis */}
          <line x1="400" y1="30" x2="400" y2="520" stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.7" filter="url(#coneGlow)" />
          <line x1="400" y1="30" x2="400" y2="520" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.8" />

          {/* ---------------------------------------------------- */}
          {/* STAGE 1: VOICE SIGNAL */}
          {/* ---------------------------------------------------- */}
          <g transform="translate(320, 48)">
            {/* Circular Glassmorphic Badge */}
            <circle cx="0" cy="0" r="18" fill="url(#badgeFill)" stroke="#818CF8" strokeWidth="1.2" filter="url(#coneGlow)" />
            <circle cx="0" cy="0" r="14" fill="#1E1B4B" fillOpacity="0.6" stroke="#38BDF8" strokeWidth="0.75" />
            {/* Microphone Icon */}
            <path
              d="M -3,-6 C -3,-7.5 -1.5,-9 0,-9 C 1.5,-9 3,-7.5 3,-6 L 3,-1 C 3,0.5 1.5,2 0,2 C -1.5,2 -3,0.5 -3,-1 Z M -5,-1 C -5,2 -2.5,4.5 0,4.5 C 2.5,4.5 5,2 5,-1 M 0,4.5 L 0,8 M -3,8 L 3,8"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Labels */}
            <text x="30" y="-3" fill="#FFFFFF" fontSize="10.5" fontWeight="700" letterSpacing="0.08em" fontFamily="Inter, sans-serif">
              VOICE SIGNAL
            </text>
            <text x="30" y="10" fill="#A5B4FC" fontSize="8.5" fontWeight="400" letterSpacing="0.02em" fontFamily="Inter, sans-serif">
              Captured in real-time
            </text>
          </g>

          {/* ---------------------------------------------------- */}
          {/* STAGE 2: FEATURE EXTRACTION */}
          {/* ---------------------------------------------------- */}
          <g transform="translate(320, 158)">
            {/* Badge */}
            <circle cx="0" cy="0" r="18" fill="url(#badgeFill)" stroke="#38BDF8" strokeWidth="1.2" filter="url(#coneGlow)" />
            <circle cx="0" cy="0" r="14" fill="#1E1B4B" fillOpacity="0.6" stroke="#818CF8" strokeWidth="0.75" />
            {/* Equalizer Wave Icon */}
            <path
              d="M -7,2 L -7,-2 M -3.5,5 L -3.5,-5 M 0,8 L 0,-8 M 3.5,4 L 3.5,-4 M 7,1.5 L 7,-1.5"
              stroke="#38BDF8"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            {/* Labels */}
            <text x="30" y="-3" fill="#FFFFFF" fontSize="10.5" fontWeight="700" letterSpacing="0.08em" fontFamily="Inter, sans-serif">
              FEATURE EXTRACTION
            </text>
            <text x="30" y="10" fill="#A5B4FC" fontSize="8.5" fontWeight="400" letterSpacing="0.02em" fontFamily="Inter, sans-serif">
              Analyzing voice patterns
            </text>
          </g>

          {/* ---------------------------------------------------- */}
          {/* STAGE 3: AI ANALYSIS */}
          {/* ---------------------------------------------------- */}
          <g transform="translate(320, 268)">
            {/* Badge */}
            <circle cx="0" cy="0" r="18" fill="url(#badgeFill)" stroke="#A855F7" strokeWidth="1.2" filter="url(#coneGlow)" />
            <circle cx="0" cy="0" r="14" fill="#1E1B4B" fillOpacity="0.6" stroke="#C084FC" strokeWidth="0.75" />
            {/* AI Chip Icon */}
            <rect x="-5" y="-5" width="10" height="10" rx="2" fill="none" stroke="#C084FC" strokeWidth="1.2" />
            <path d="M -2,-8 L -2,-5 M 2,-8 L 2,-5 M -2,5 L -2,8 M 2,5 L 2,8 M -8,-2 L -5,-2 M -8,2 L -5,2 M 5,-2 L 8,-2 M 5,2 L 8,2" stroke="#C084FC" strokeWidth="1" strokeLinecap="round" />
            <circle cx="0" cy="0" r="1.5" fill="#38BDF8" />

            {/* Labels */}
            <text x="30" y="-3" fill="#FFFFFF" fontSize="10.5" fontWeight="700" letterSpacing="0.08em" fontFamily="Inter, sans-serif">
              AI ANALYSIS
            </text>
            <text x="30" y="10" fill="#A5B4FC" fontSize="8.5" fontWeight="400" letterSpacing="0.02em" fontFamily="Inter, sans-serif">
              Detecting anomalies
            </text>
          </g>

          {/* ---------------------------------------------------- */}
          {/* STAGE 4: RISK DETECTION */}
          {/* ---------------------------------------------------- */}
          <g transform="translate(320, 378)">
            {/* Badge */}
            <circle cx="0" cy="0" r="18" fill="url(#badgeFill)" stroke="#22D3EE" strokeWidth="1.2" filter="url(#coneGlow)" />
            <circle cx="0" cy="0" r="14" fill="#1E1B4B" fillOpacity="0.6" stroke="#38BDF8" strokeWidth="0.75" />
            {/* Shield Icon */}
            <path
              d="M 0,-7 L 5.5,-4.5 C 5.5,2 3,5.5 0,7.5 C -3,5.5 -5.5,2 -5.5,-4.5 Z M 0,-2.5 L 0,1 M 0,3 L 0,3.5"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Labels */}
            <text x="30" y="-3" fill="#FFFFFF" fontSize="10.5" fontWeight="700" letterSpacing="0.08em" fontFamily="Inter, sans-serif">
              RISK DETECTION
            </text>
            <text x="30" y="10" fill="#A5B4FC" fontSize="8.5" fontWeight="400" letterSpacing="0.02em" fontFamily="Inter, sans-serif">
              Calculating risk score
            </text>
          </g>
        </g>

        {/* ======================================================== */}
        {/* 8. LUMINOUS CONE BORDER BEAMS & CORNER NODES */}
        {/* ======================================================== */}
        {/* Ambient Soft Glow underneath */}
        <line x1="60" y1="20" x2="330" y2="540" stroke="#38BDF8" strokeWidth="12" opacity="0.35" filter="url(#softGlow)" />
        <line x1="740" y1="20" x2="470" y2="540" stroke="#A855F7" strokeWidth="12" opacity="0.35" filter="url(#softGlow)" />

        {/* Left Glowing Diagonal Beam */}
        <line
          x1="60"
          y1="20"
          x2="330"
          y2="540"
          stroke="url(#leftEdgeGrad)"
          strokeWidth="2.75"
          strokeLinecap="round"
          filter="url(#coneGlow)"
        />
        <line
          x1="60"
          y1="20"
          x2="330"
          y2="540"
          stroke="#E0F2FE"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Right Glowing Diagonal Beam */}
        <line
          x1="740"
          y1="20"
          x2="470"
          y2="540"
          stroke="url(#rightEdgeGrad)"
          strokeWidth="2.75"
          strokeLinecap="round"
          filter="url(#coneGlow)"
        />
        <line
          x1="740"
          y1="20"
          x2="470"
          y2="540"
          stroke="#E0F2FE"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Top Horizontal Perimeter Light Bar */}
        <line
          x1="60"
          y1="20"
          x2="740"
          y2="20"
          stroke="url(#meshGrad1)"
          strokeWidth="1.8"
          strokeOpacity="0.6"
          strokeDasharray="8 6"
        />

        {/* Corner Nodes with Bright Core */}
        <circle cx="60" cy="20" r="5" fill="#38BDF8" filter="url(#flareGlow)" />
        <circle cx="60" cy="20" r="2" fill="#FFFFFF" />

        <circle cx="740" cy="20" r="5" fill="#C084FC" filter="url(#flareGlow)" />
        <circle cx="740" cy="20" r="2" fill="#FFFFFF" />

        {/* ======================================================== */}
        {/* 9. LUMINOUS CONVERGENCE STARBURST FLARE (Behind Phone Apex) */}
        {/* ======================================================== */}
        <g transform="translate(400, 520)">
          {/* Wide Horizontal Lens Flare Streak */}
          <ellipse cx="0" cy="0" rx="75" ry="3.5" fill="#38BDF8" filter="url(#flareGlow)" opacity="0.9" />
          <ellipse cx="0" cy="0" rx="35" ry="1.5" fill="#FFFFFF" />

          {/* Radial Core Flare */}
          <circle cx="0" cy="0" r="14" fill="#818CF8" filter="url(#flareGlow)" opacity="0.8" />
          <circle cx="0" cy="0" r="6" fill="#38BDF8" filter="url(#coneGlow)" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
