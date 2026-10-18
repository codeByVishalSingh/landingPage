"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const SustainableBanner: React.FC = () => {
  const [manifestoOpen, setManifestoOpen] = useState(false);

  return (
    <section
      id="sustainability"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "78vh",
        maxHeight: "900px",
        overflow: "hidden",
        backgroundColor: "#2E2421",
        color: "#FAF8F5",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background Architectural Photo */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/sustainable-space.jpg"
          alt="Audo Copenhagen Sustainable Architectural Pavilion"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 50%",
            filter: "brightness(0.9) contrast(1.05)",
          }}
        />
        {/* Soft Warm Film Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(30, 24, 22, 0.45) 0%, rgba(30, 24, 22, 0.25) 50%, rgba(30, 24, 22, 0.8) 100%)",
          }}
        />
      </div>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
      >
        <div style={{ maxWidth: "880px" }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#FAF8F5",
              display: "inline-block",
              marginBottom: "1rem",
              background: "rgba(30, 24, 22, 0.65)",
              backdropFilter: "blur(10px)",
              padding: "0.4rem 1.1rem",
              borderRadius: "30px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            CIRCULAR PRINCIPLES & GENERATIONAL STEWARDSHIP
          </motion.span>

          {/* Prominent Headline from Behance Reference */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#FAF8F5",
              marginBottom: "1.5rem",
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.35)",
            }}
          >
            Sustainable <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>by design.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              lineHeight: 1.65,
              color: "rgba(250, 248, 245, 0.92)",
              maxWidth: "680px",
              marginBottom: "2.75rem",
              fontWeight: 300,
            }}
          >
            True sustainability begins with permanence. We reject transient consumer cycles by crafting
            objects with natural non-toxic finishes, mechanically disassemblable joints, and certified
            traceable European materials.
          </motion.p>

          {/* Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2.5rem",
              padding: "1.5rem 1.75rem",
              background: "rgba(30, 24, 22, 0.72)",
              backdropFilter: "blur(14px)",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-brass)", fontWeight: 500 }}>
                100%
              </div>
              <div style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "#FAF8F5" }}>
                FSC® Certified Woods
              </div>
              <div style={{ fontSize: "0.75rem", color: "#A8A298", marginTop: "0.2rem" }}>
                Traceable European forests
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-brass)", fontWeight: 500 }}>
                10-Year
              </div>
              <div style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "#FAF8F5" }}>
                Structural Guarantee
              </div>
              <div style={{ fontSize: "0.75rem", color: "#A8A298", marginTop: "0.2rem" }}>
                Guaranteed replacement parts
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-brass)", fontWeight: 500 }}>
                0%
              </div>
              <div style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "#FAF8F5" }}>
                Single-Use Plastics
              </div>
              <div style={{ fontSize: "0.75rem", color: "#A8A298", marginTop: "0.2rem" }}>
                100% recyclable pulp packaging
              </div>
            </div>
          </motion.div>

          {/* Action Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setManifestoOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.9rem 2.25rem",
                background: "#FAF8F5",
                color: "#161514",
                borderRadius: "999px",
                border: "none",
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                fontWeight: 700,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-brass)";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FAF8F5";
                e.currentTarget.style.color = "#161514";
              }}
            >
              <span>Read Sustainability Manifesto</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Manifesto Dialog Modal */}
      <AnimatePresence>
        {manifestoOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setManifestoOpen(false)}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(22, 21, 20, 0.75)",
                backdropFilter: "blur(8px)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                position: "relative",
                background: "#FAF8F5",
                borderRadius: "6px",
                maxWidth: "700px",
                width: "100%",
                maxHeight: "85vh",
                overflowY: "auto",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
                padding: "2.5rem",
                color: "var(--color-text-main)",
                zIndex: 2,
              }}
            >
              <button
                onClick={() => setManifestoOpen(false)}
                aria-label="Close manifesto"
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "#EBE7DF",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <span
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                THE AUDO COMMITMENT • 2026 ARCHIVE
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2rem",
                  fontWeight: 400,
                  marginBottom: "1.25rem",
                }}
              >
                Architectural Responsibility & Permanence
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
                <p>
                  At Audo Copenhagen, our design language is inseparable from our responsibility to the living planet. We define sustainability not as an afterthought or a marketing badge, but as the foundational engineering constraint of every chair, lamp, and table we release.
                </p>
                <p>
                  <strong>1. Traceable Provenance:</strong> 100% of the solid oak and ash utilized in our furniture is sourced from FSC®-certified European timber reserves, ensuring re-planting rates exceed harvest quotas.
                </p>
                <p>
                  <strong>2. Clean Chemistry:</strong> Our finishes utilize zero VOC (volatile organic compound) water-based emulsions and natural beeswax oils, safeguarding indoor air quality for your home and our craftsmen.
                </p>
                <p>
                  <strong>3. Modular Architecture:</strong> Every armchair and sofa features detachable upholstery and mechanical fasteners, enabling localized repair and refurbishment rather than disposal.
                </p>
              </div>

              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <button
                  onClick={() => setManifestoOpen(false)}
                  style={{
                    padding: "0.75rem 2rem",
                    background: "var(--color-dark)",
                    color: "#FAF8F5",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Return to Exploration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
