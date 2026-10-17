"use client";

import React from "react";
import { motion } from "framer-motion";

export const BrandPillars: React.FC = () => {
  const pillars = [
    {
      num: "01",
      title: "White Glove Installation",
      subtitle: "Insured Global Freight",
      description:
        "Complimentary delivery on orders over $1,500. Includes custom crate handling, room of choice placement, and packaging removal.",
      icon: "📦",
    },
    {
      num: "02",
      title: "30-Day In-Home Trial",
      subtitle: "Living With Form",
      description:
        "Observe how our honed travertine and bouclé fabrics interact with your natural ambient daylight before committing permanently.",
      icon: "🏛️",
    },
    {
      num: "03",
      title: "Architectural Concierge",
      subtitle: "Trade & Studio Support",
      description:
        "Dedicated specification assistance, custom contract finishes, physical material swatch libraries, and 3D CAD/BIM assets.",
      icon: "📐",
    },
    {
      num: "04",
      title: "10-Year Heirloom Warranty",
      subtitle: "Certified Scandinavian Craft",
      description:
        "Every joint, seam, and stone surface is engineered to endure. Sourced exclusively from FSC®-certified sustainable European forests.",
      icon: "🛡️",
    },
  ];

  return (
    <section
      id="pillars"
      style={{
        padding: "5rem 0",
        backgroundColor: "var(--color-canvas-alt)",
        borderTop: "1px solid var(--color-card-border)",
        borderBottom: "1px solid var(--color-card-border)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
          }}
        >
          {pillars.map((p, idx) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-card-border)",
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: "var(--shadow-sm)",
                transition: "transform var(--transition-normal), box-shadow var(--transition-normal)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.75rem",
                    color: "var(--color-brass)",
                    fontWeight: 300,
                  }}
                >
                  {p.num}
                </span>

                <span style={{ fontSize: "1.25rem" }}>{p.icon}</span>
              </div>

              <div
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.25rem",
                  fontWeight: 600,
                }}
              >
                {p.subtitle}
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  color: "var(--color-text-main)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {p.title}
              </h4>

              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  marginTop: "auto",
                }}
              >
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
