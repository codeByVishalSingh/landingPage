"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const CraftsmanshipSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "Hand-Joined European Timber",
      tag: "FSC® CERTIFIED",
      desc: "Every oak and ash frame is shaped by generational Scandinavian joiners using traditional mortise-and-tenon joints, then hand-rubbed with natural organic waxes that allow the grain to breathe.",
    },
    {
      title: "Geological Tactility & Natural Stone",
      tag: "HONED TRAVERTINE",
      desc: "Sourced from historic Italian quarries. Unfilled Kunis Breccia and Calacatta Viola slabs retain their prehistoric fossil veining, buffed by hand to a velvety matte honed surface.",
    },
    {
      title: "Artisanal Washi & Living Metals",
      tag: "TRADITIONAL FIBERS",
      desc: "Japanese paper-making techniques fused with Danish mathematical geometry. Diffusers scatter pure daylight, while uncoated cast brass develops an authentic, evolving patina over decades.",
    },
    {
      title: "Generational Circularity",
      tag: "10-YEAR WARRANTY",
      desc: "True luxury is permanence. Every joint is mechanically disassemblable, fabrics are modularly re-upholsterable, and replacement components remain in production for at least 25 years.",
    },
  ];

  return (
    <section
      id="craftsmanship"
      style={{
        padding: "7.5rem 0 8rem",
        backgroundColor: "#161514",
        color: "#FAF8F5",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(182, 146, 105, 0.08) 0%, rgba(22, 21, 20, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Editorial Pull Quote Header (Verbatim from Behance Case Study) */}
        <div style={{ textAlign: "center", maxWidth: "920px", margin: "0 auto 4.5rem" }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--color-brass)",
              display: "block",
              marginBottom: "1.25rem",
            }}
          >
            BRAND PHILOSOPHY & ARTISANAL TRUTH
          </motion.span>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.125rem, 4.5vw, 3.75rem)",
              fontWeight: 300,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              color: "#FAF8F5",
              margin: 0,
            }}
          >
            “Formed of curiosity, driven by design, rooted in{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-brass)" }}>
              Scandinavian heritage.
            </span>”
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "1rem",
              color: "#A8A298",
              marginTop: "1.5rem",
              fontWeight: 300,
              letterSpacing: "0.04em",
            }}
          >
            Soft minimalism is not the absence of detail, but the profound resonance of honest materials.
          </motion.p>
        </div>

        {/* 2-Column Workshop Showcase */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="workshop-grid"
        >
          {/* Workshop Photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              position: "relative",
              height: "560px",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Image
              src="/images/craft-workshop.jpg"
              alt="Danish Craftsmen Assembling Sculpted Chair in Workshop"
              fill
              sizes="(max-width: 992px) 100vw, 60vw"
              style={{ objectFit: "cover" }}
            />
            {/* Workshop Caption Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                right: "1.5rem",
                background: "rgba(22, 21, 20, 0.88)",
                backdropFilter: "blur(12px)",
                padding: "1rem 1.25rem",
                borderRadius: "3px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "0.625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-brass)", fontWeight: 600 }}>
                  THE COPENHAGEN ATELIER
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#FAF8F5" }}>
                  Hand-shaping the Tired Man Solid Oak Frame
                </div>
              </div>
              <span style={{ fontSize: "0.75rem", color: "#A8A298", fontWeight: 500 }}>
                Est. 1976
              </span>
            </div>
          </motion.div>

          {/* 4 Interactive Pillars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {pillars.map((pillar, idx) => {
              const isSelected = activePillar === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  style={{
                    background: isSelected ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.02)",
                    border: `1px solid ${isSelected ? "var(--color-brass)" : "rgba(255, 255, 255, 0.08)"}`,
                    borderRadius: "4px",
                    padding: "1.35rem 1.5rem",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.625rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: isSelected ? "var(--color-brass)" : "#A8A298",
                      }}
                    >
                      {pillar.tag}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-serif)",
                        color: isSelected ? "var(--color-brass)" : "rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      color: isSelected ? "#FAF8F5" : "rgba(250, 248, 245, 0.8)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.8125rem",
                      lineHeight: 1.6,
                      color: "#A8A298",
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .workshop-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
