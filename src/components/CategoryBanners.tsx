"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FilterCategory } from "./CategoryFilter";

interface CategoryBannersProps {
  onSelectCategory: (cat: FilterCategory) => void;
}

export const CategoryBanners: React.FC<CategoryBannersProps> = ({ onSelectCategory }) => {
  const banners = [
    {
      id: "furniture",
      category: "furniture" as FilterCategory,
      number: "01",
      title: "Living Architecture",
      subtitle: "Monolithic Plinths, Bouclé Lounges & Sculpted Oak",
      image: "/images/eave-sofa.jpg",
      tag: "18 PIECES",
    },
    {
      id: "lighting",
      category: "lighting" as FilterCategory,
      number: "02",
      title: "Atmospheric Light",
      subtitle: "Translucent Washi Lanterns & Cast Brass Pendants",
      image: "/images/hashira-lamp.jpg",
      tag: "12 FIXTURES",
    },
    {
      id: "objects",
      category: "objects" as FilterCategory,
      number: "03",
      title: "Objects & Vessels",
      subtitle: "Mouth-Blown Smoked Glass & Honed Pedestals",
      image: "/images/echasse-vase.jpg",
      tag: "24 CREATIONS",
    },
  ];

  const handleBannerClick = (cat: FilterCategory) => {
    onSelectCategory(cat);
    const element = document.getElementById("collection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="disciplines"
      style={{
        padding: "4.5rem 0 5rem",
        backgroundColor: "var(--color-canvas)",
        borderBottom: "1px solid var(--color-card-border)",
      }}
    >
      <div className="container">
        {/* Section Pre-Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-brass)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              ARCHITECTURAL DISCIPLINES
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                fontWeight: 300,
                lineHeight: 1.15,
              }}
            >
              Curated by <span style={{ fontStyle: "italic" }}>Spatial Function</span>
            </h2>
          </div>

          <a
            href="#collection"
            className="btn-ghost"
            style={{ fontSize: "0.75rem", letterSpacing: "0.14em" }}
          >
            VIEW ALL DISCIPLINES →
          </a>
        </div>

        {/* 3 Banners Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {banners.map((b, idx) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleBannerClick(b.category)}
              style={{
                position: "relative",
                height: "460px",
                overflow: "hidden",
                cursor: "pointer",
                borderRadius: "2px",
                boxShadow: "var(--shadow-sm)",
              }}
              whileHover="hover"
            >
              {/* Background Image with Hover Scale */}
              <motion.div
                variants={{
                  hover: { scale: 1.07 },
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>

              {/* Gradient Vignette for Readability */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(22, 21, 20, 0.15) 0%, rgba(22, 21, 20, 0.4) 50%, rgba(22, 21, 20, 0.88) 100%)",
                }}
              />

              {/* Number and Tag Top Bar */}
              <div
                style={{
                  position: "absolute",
                  top: "1.75rem",
                  left: "1.75rem",
                  right: "1.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.5rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: 300,
                  }}
                >
                  {b.number}
                </span>

                <span
                  style={{
                    fontSize: "0.625rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--color-brass)",
                    background: "rgba(22, 21, 20, 0.75)",
                    backdropFilter: "blur(6px)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "2px",
                    fontWeight: 600,
                  }}
                >
                  {b.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "1.75rem",
                  right: "1.75rem",
                  zIndex: 2,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.875rem",
                    color: "#FFFFFF",
                    lineHeight: 1.15,
                    marginBottom: "0.4rem",
                  }}
                >
                  {b.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(255, 255, 255, 0.78)",
                    lineHeight: 1.5,
                    marginBottom: "1.25rem",
                    fontWeight: 300,
                  }}
                >
                  {b.subtitle}
                </p>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--color-brass)",
                    fontWeight: 600,
                  }}
                >
                  <span>EXPLORE DISCIPLINE</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
