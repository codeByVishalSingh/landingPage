"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export const Hero: React.FC = () => {
  const [cphTime, setCphTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  // Subtle parallax transforms
  const backgroundY = useTransform(scrollY, [0, 800], ["0%", "18%"]);
  const contentY = useTransform(scrollY, [0, 800], ["0%", "24%"]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  useEffect(() => {
    setIsMounted(true);
    const updateTime = () => {
      const now = new Date();
      // Copenhagen is in CET/CEST
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Copenhagen",
        hour: "2-digit",
        minute: "2-digit",
      });
      setCphTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "94vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 0 4rem",
        overflow: "hidden",
      }}
    >
      {/* Background Photography Container with Parallax */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% 0",
          zIndex: 0,
          y: isMounted ? backgroundY : undefined,
        }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Audo Copenhagen Architectural Living Interior"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 38%",
            filter: "brightness(0.95) saturate(1.02)",
          }}
        />
        {/* Soft Warm Film & Vignette Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(250, 248, 245, 0.45) 0%, rgba(250, 248, 245, 0.7) 45%, rgba(250, 248, 245, 0.96) 100%)",
            backdropFilter: "blur(1.5px)",
          }}
        />
      </motion.div>

      {/* Hero Content with Staggered Framer Motion Entrance */}
      <motion.div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "1080px",
          margin: "0 auto",
          y: isMounted ? contentY : undefined,
          opacity: isMounted ? opacity : 1,
        }}
      >
        {/* Top Status Bar: Copenhagen Time & Seasonal Archive */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1.25rem",
            padding: "0.5rem 1.4rem",
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(28, 26, 24, 0.1)",
            borderRadius: "40px",
            marginBottom: "2rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--color-brass)",
                display: "inline-block",
                boxShadow: "0 0 8px rgba(182, 146, 105, 0.8)",
              }}
            />
            <span
              suppressHydrationWarning
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-text-main)",
              }}
            >
              COPENHAGEN {cphTime ? `${cphTime} CET` : "FLAGSHIP"}
            </span>
          </div>

          <span style={{ color: "rgba(28, 26, 24, 0.2)" }}>|</span>

          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
            }}
          >
            SPRING / SUMMER 2026 ARCHIVE
          </span>
        </motion.div>

        {/* Editorial Headline with Word-by-Word Reveal */}
        <div style={{ overflow: "hidden", marginBottom: "1.25rem" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.75rem, 6.8vw, 5.5rem)",
              lineHeight: 1.05,
              fontWeight: 300,
              color: "var(--color-text-main)",
              letterSpacing: "-0.025em",
            }}
          >
            Quiet Spaces, <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>Soft Minimalism.</span>
          </motion.h1>
        </div>

        {/* Subtitle with Fade In */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(1.0625rem, 2vw, 1.25rem)",
            color: "var(--color-text-secondary)",
            maxWidth: "720px",
            margin: "0 auto 3rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Rooted in Danish architectural heritage. Honed natural travertine, sculpted bouclé seating,
          and ambient paper lanterns designed to elevate human contemplation.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            flexWrap: "wrap",
            marginBottom: "4.5rem",
          }}
        >
          <a href="#3d-studio" className="btn-primary" id="hero-3d-btn" data-cursor="hover">
            <span>EXPERIENCE 3D STUDIO</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </a>

          <a href="#collection" className="btn-secondary" id="hero-explore-btn" data-cursor="hover">
            <span>EXPLORE COLLECTION</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </motion.div>

        {/* Scandinavian Heritage Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "1.5rem",
            padding: "2rem 1.75rem",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(28, 26, 24, 0.08)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {[
            { metric: "1976", label: "Copenhagen Heritage", desc: "Decades of Danish craftsmanship" },
            { metric: "100%", label: "FSC® Certified Woods", desc: "Traceable European timber" },
            { metric: "38+", label: "International Honors", desc: "Red Dot & Wallpaper* Awards" },
            { metric: "Nordhavn", label: "Flagship Showroom", desc: "The Audo Hotel & Concept Store" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                textAlign: "center",
                borderRight: idx < 3 ? "1px solid rgba(28, 26, 24, 0.08)" : "none",
                padding: "0 0.5rem",
              }}
              className="metric-card"
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2rem",
                  lineHeight: 1.1,
                  color: "var(--color-text-main)",
                  marginBottom: "0.25rem",
                  fontWeight: 500,
                }}
              >
                {item.metric}
              </div>
              <div
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--color-text-main)",
                  marginBottom: "0.2rem",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <style jsx>{`
        @media (max-width: 768px) {
          .metric-card {
            border-right: none !important;
            border-bottom: 1px solid rgba(28, 26, 24, 0.08);
            padding-bottom: 1rem !important;
          }
          .metric-card:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
};
