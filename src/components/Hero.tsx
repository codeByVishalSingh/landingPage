"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Scroll-linked cinematic scale & depth transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const videoRadius = useTransform(scrollYProgress, [0, 1], ["0px", "28px"]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-45px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    [desktopVideoRef.current, mobileVideoRef.current].forEach((video) => {
      if (video) {
        video.defaultMuted = true;
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Handled browser autoplay restrictions gracefully
          });
        }
      }
    });
  }, []);

  return (
    <section id="hero" ref={containerRef} className="hero-section">
      {/* Scroll-Linked 3D Cinematic Video Stage */}
      <motion.div
        className="hero-video-wrapper"
        style={{
          scale: isMounted ? videoScale : 1,
          borderRadius: isMounted ? videoRadius : "0px",
          y: isMounted ? videoY : "0%",
          transformOrigin: "center center",
          overflow: "hidden",
        }}
      >
        {/* Desktop Landscape Video (16:9 / 1280x720) */}
        <video
          ref={desktopVideoRef}
          src="/hero.mp4"
          poster="/images/hero.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="hero-video-element hero-video-desktop"
        />

        {/* Mobile Portrait Video (9:16 / 720x1280 story.mp4) */}
        <video
          ref={mobileVideoRef}
          src="/story.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="hero-video-element hero-video-mobile"
        />

        {/* Ambient Film Vignette Gradient */}
        <div className="hero-video-overlay" />
      </motion.div>

      {/* Hero Content with 3D Parallax Drift */}
      <div className="container hero-content-container">
        <motion.div
          style={{
            y: isMounted ? textY : "0px",
            opacity: isMounted ? textOpacity : 1,
          }}
          className="hero-text-block"
        >
          {/* Subtle 3D Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "rgba(16, 43, 70, 0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(200, 184, 154, 0.35)",
              padding: "0.4rem 1rem",
              borderRadius: "30px",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--color-gold)",
                boxShadow: "0 0 10px var(--color-gold)",
              }}
            />
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#FAF8F5",
              }}
            >
              CASABLANCA SOFAS · ARCHITECTURAL LIVING
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title"
          >
            Curated Living Spaces <br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--color-gold)" }}>
              for Discerning Homes.
            </span>
          </motion.h1>

          {/* Subtitle description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hero-subtitle"
          >
            Explore handcrafted solid Burma teakwood suites, German motorized OKIN recliners, and Italian monolithic marble dining tables engineered for generations of timeless comfort.
          </motion.p>

          {/* Action CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hero-cta-group"
            style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}
          >
            <a
              href="#collection"
              id="hero-shop-now-btn"
              className="hero-cta-btn"
            >
              <span>EXPLORE COLLECTION</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="/furniture-showroom-kurnool"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#FAF8F5",
                fontSize: "0.8125rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 500,
                padding: "0.85rem 1.6rem",
                borderRadius: "30px",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(10px)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-gold)";
                e.currentTarget.style.color = "var(--color-gold)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                e.currentTarget.style.color = "#FAF8F5";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>VISIT SHOWROOM</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating 3D Scroll Cue Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2.25rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          cursor: "pointer",
        }}
        onClick={() => {
          document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(250, 248, 245, 0.65)",
            fontWeight: 600,
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(250, 248, 245, 0.75)" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};
