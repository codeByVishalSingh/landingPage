"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface JournalArticle {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  content: string[];
}

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  const articles: JournalArticle[] = [
    {
      id: "audo-hybrid-space",
      category: "ARCHITECTURE & SPACES",
      date: "OCTOBER 2026",
      readTime: "5 MIN READ",
      title: "The Audo Copenhagen: A Living Laboratory for Soft Minimalism",
      excerpt:
        "How a former 1918 Neo-Baroque merchant building in Copenhagen’s post-industrial Nordhavn was transformed into an interactive hotel, showroom, and creative forum.",
      image: "/images/hero.jpg",
      author: "Bjarne Hansen, Founder",
      content: [
        "In 2019, Audo Copenhagen set out to redefine what a design brand could be. Rather than maintaining a sterile showroom separated by stanchions and velvet ropes, we collaborated with Norm Architects to create The Audo—a living, breathing space where hotel guests sleep in our beds, sip coffee from our ceramics, and gather around our oak refectory tables.",
        "Situated in Nordhavn, Copenhagen’s burgeoning sustainable port district, the structure retains its historical concrete beams and industrial heritage, juxtaposed against warm chalk-washed walls, tactile bouclé upholstery, and natural travertine surfaces.",
        "Every single object throughout the 10 boutique suites and public salons can be experienced in authentic daily life before acquisition. It represents the ultimate manifestation of our belief: design must be lived with, touched, and weathered by human ritual.",
      ],
    },
    {
      id: "tactile-materiality",
      category: "MATERIALS & NEUROLOGY",
      date: "SEPTEMBER 2026",
      readTime: "4 MIN READ",
      title: "Materiality & The Mind: Why Honed Stone and Raw Timber Ground Us",
      excerpt:
        "Scientific and aesthetic investigations into how organic textures, unlacquered metals, and natural stone lower cortisol levels in contemporary homes.",
      image: "/images/plinth-table.jpg",
      author: "Norm Architects Studio",
      content: [
        "Modern urban environments subject our sensory nervous systems to an endless barrage of polished glass screens, synthetic polymers, and planar synthetic surfaces devoid of tactile feedback.",
        "Our ongoing architectural research into neuro-aesthetics demonstrates that interacting with natural materials—the cool porous surface of unsealed Kunis Breccia limestone, the fibrous warmth of European smoked oak, the comforting weight of curly sheepskin—activates parasympathetic relaxation pathways.",
        "By leaving our materials honest—buffing stone without high-gloss chemical sealers, treating wood with natural beeswax rather than synthetic polyurethane—we invite human touch back into daily living.",
      ],
    },
    {
      id: "longevity-over-novelty",
      category: "PHILOSOPHY & CRAFT",
      date: "AUGUST 2026",
      readTime: "6 MIN READ",
      title: "Designing for Generations: The Rejection of Disposable Aesthetics",
      excerpt:
        "Exploring the engineering principles and structural discipline required to build furniture destined to outlast the architects who drafted it.",
      image: "/images/craft-workshop.jpg",
      author: "Danielle Siggerud, Architect",
      content: [
        "The fastest way to achieve sustainability is simply to make objects that people refuse to throw away. When an armchair is upholstered in replaceable covers with mechanical fastenings, and framed in solid joinery oak, it ceases to be a consumable item and becomes an heirloom.",
        "At Audo Copenhagen, our design criteria rejects ephemeral seasonal trends in favor of geometric purity, architectural proportion, and honest structural honesty.",
        "Every piece in our permanent collection undergoes rigorous stress testing in Denmark, backed by our 10-Year Craftsmanship Guarantee and a commitment to maintain replacement components for decades.",
      ],
    },
  ];

  return (
    <section
      id="journal"
      style={{
        padding: "6.5rem 0 7rem",
        backgroundColor: "var(--color-canvas)",
        borderTop: "1px solid var(--color-card-border)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
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
                marginBottom: "0.75rem",
              }}
            >
              THE AUDO JOURNAL • DISPATCHES
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 300,
                color: "var(--color-text-main)",
                lineHeight: 1.15,
              }}
            >
              Stories & <span style={{ fontStyle: "italic" }}>Essays</span>
            </h2>
          </div>

          <a
            href="#film"
            className="btn-ghost"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Watch Documentary Films
          </a>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {articles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              onClick={() => setSelectedArticle(article)}
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-card-border)",
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
                e.currentTarget.style.borderColor = "var(--color-brass)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--color-card-border)";
              }}
            >
              {/* Image Banner */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "62%",
                  backgroundColor: "#F0ECE1",
                }}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Text Info */}
              <div
                style={{
                  padding: "1.75rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.625rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-brass)",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.375rem",
                    fontWeight: 500,
                    color: "var(--color-text-main)",
                    lineHeight: 1.25,
                    marginBottom: "0.75rem",
                  }}
                >
                  {article.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "var(--color-text-secondary)",
                    fontWeight: 300,
                    marginBottom: "1.5rem",
                    flex: 1,
                  }}
                >
                  {article.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--color-text-main)",
                  }}
                >
                  <span>Read Full Article</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(22, 21, 20, 0.75)",
                backdropFilter: "blur(8px)",
              }}
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                position: "relative",
                background: "#FAF8F5",
                borderRadius: "6px",
                maxWidth: "760px",
                width: "100%",
                maxHeight: "85vh",
                overflowY: "auto",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
                padding: "2.5rem",
                zIndex: 2,
              }}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                aria-label="Close reader"
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

              <div
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                {selectedArticle.category} • {selectedArticle.date}
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                  color: "var(--color-text-main)",
                }}
              >
                {selectedArticle.title}
              </h2>

              <div
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "2rem",
                  borderBottom: "1px solid rgba(28, 26, 24, 0.1)",
                  paddingBottom: "1rem",
                }}
              >
                By {selectedArticle.author}
              </div>

              {/* Body paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {selectedArticle.content.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "1.0625rem",
                      lineHeight: 1.8,
                      color: "var(--color-text-secondary)",
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
                <button
                  onClick={() => setSelectedArticle(null)}
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
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
