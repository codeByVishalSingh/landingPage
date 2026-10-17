"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface VideoChapter {
  id: string;
  youtubeId: string;
  title: string;
  subtitle: string;
  duration: string;
  thumbnail: string;
  description: string;
  featuredPiece: string;
  featuredAnchor: string;
}

const CHAPTERS: VideoChapter[] = [
  {
    id: "chapter-1",
    youtubeId: "JREKXk96weE",
    title: "The Living Showroom",
    subtitle: "The Audo Hotel & Architecture • Nordhavn",
    duration: "4:32",
    thumbnail: "/images/hero.jpg",
    description:
      "A walkthrough of The Audo in Copenhagen with founder Bjarne Hansen and Norm Architects. Experience how our furniture and lighting interact with daylight, raw concrete, and Dinesen oak floors.",
    featuredPiece: "Plinth Low Table & Hashira Lighting",
    featuredAnchor: "#collection",
  },
  {
    id: "chapter-2",
    youtubeId: "ezxH-HNn98M",
    title: "Connecting Spaces & People",
    subtitle: "The Brand Film • Copenhagen Design Archive",
    duration: "2:58",
    thumbnail: "/images/lookbook.jpg",
    description:
      "Exploring soft minimalism as a way of living. From hand-finishing European smoked oak to shaping tactile bouclé curves that embrace the human form in calm domestic sanctuaries.",
    featuredPiece: "The Tired Man Lounge & Eave Sofa",
    featuredAnchor: "#collection",
  },
];

export const VideoShowcase: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const activeChapter = CHAPTERS[activeChapterIndex];

  return (
    <section
      id="film"
      style={{
        padding: "7rem 0",
        backgroundColor: "var(--color-dark)",
        color: "var(--color-canvas)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle Ambient Grain Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 30%, rgba(182, 146, 105, 0.08) 0%, rgba(22, 21, 20, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 3.5rem" }}>
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
              marginBottom: "0.75rem",
            }}
          >
            CINEMATOGRAPHY • COPENHAGEN ARCHIVE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.12,
              marginBottom: "1rem",
              fontFamily: "var(--font-serif)",
            }}
          >
            A Film on Space, <span style={{ fontStyle: "italic" }}>Light & Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              color: "#A8A298",
              fontSize: "1rem",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Witness the tactile atmosphere of The Audo in Copenhagen. A living architecture where monolithic stone,
            sculpted bouclé seating, and morning Nordic light converge into quiet domestic poetry.
          </motion.p>
        </div>

        {/* Video Cinema Player Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1180px",
            margin: "0 auto 3rem",
            background: "#0D0C0B",
            borderRadius: "2px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6)",
            overflow: "hidden",
          }}
        >
          {/* 16:9 Aspect Ratio Container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
            }}
          >
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeChapter.youtubeId}?autoplay=1&mute=${isMuted ? "1" : "0"}&rel=0&modestbranding=1&controls=1&showinfo=0`}
                title={activeChapter.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            ) : (
              // Poster & Play Preview
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  cursor: "pointer",
                }}
                onClick={() => setIsPlaying(true)}
              >
                <Image
                  src={activeChapter.thumbnail}
                  alt={activeChapter.title}
                  fill
                  style={{
                    objectFit: "cover",
                    filter: "brightness(0.7) contrast(1.05)",
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)",
                  }}
                />

                {/* Center Play Button with Pulsing Wave */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.25rem",
                    zIndex: 2,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "50%",
                      background: "rgba(250, 248, 245, 0.95)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--color-dark)">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </motion.div>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                    }}
                  >
                    WATCH FILM ({activeChapter.duration})
                  </span>
                </div>

                {/* Film Title on Poster */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "2.5rem",
                    right: "2.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    zIndex: 2,
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--color-brass)",
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {activeChapter.subtitle}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                        color: "#FFFFFF",
                        lineHeight: 1.2,
                      }}
                    >
                      {activeChapter.title}
                    </h3>
                  </div>

                  <div
                    style={{
                      background: "rgba(22, 21, 20, 0.8)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      padding: "0.5rem 1rem",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                    }}
                  >
                    FEATURED: {activeChapter.featuredPiece}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Film Control Footer */}
          <div
            style={{
              padding: "1.25rem 2rem",
              background: "rgba(22, 21, 20, 0.95)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* Audio Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {isPlaying && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "2px",
                    padding: "0.4rem 0.85rem",
                    color: "#FFFFFF",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>{isMuted ? "UNMUTE AUDIO" : "MUTED"}</span>
                  <span style={{ color: "var(--color-brass)" }}>{isMuted ? "🔇" : "🔊"}</span>
                </button>
              )}

              <span style={{ fontSize: "0.8125rem", color: "#A8A298" }}>
                {activeChapter.description}
              </span>
            </div>

            <a
              href={activeChapter.featuredAnchor}
              className="btn-secondary"
              style={{
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "#FFFFFF",
                padding: "0.6rem 1.25rem",
                fontSize: "0.6875rem",
              }}
            >
              SHOP FEATURED ARCHIVE →
            </a>
          </div>
        </motion.div>

        {/* Film Chapters Selector Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.75rem",
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          {CHAPTERS.map((ch, idx) => {
            const isSelected = activeChapterIndex === idx;
            return (
              <div
                key={ch.id}
                onClick={() => {
                  setActiveChapterIndex(idx);
                  setIsPlaying(false);
                }}
                style={{
                  background: isSelected ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
                  border: "1px solid",
                  borderColor: isSelected ? "var(--color-brass)" : "rgba(255, 255, 255, 0.1)",
                  padding: "1.5rem",
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "1.25rem",
                  alignItems: "center",
                  transition: "all var(--transition-normal)",
                  borderRadius: "2px",
                }}
              >
                {/* Mini Thumbnail */}
                <div
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "70px",
                    borderRadius: "2px",
                    overflow: "hidden",
                    backgroundColor: "#161514",
                  }}
                >
                  <Image src={ch.thumbnail} alt={ch.title} fill style={{ objectFit: "cover" }} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      right: "4px",
                      background: "rgba(0,0,0,0.8)",
                      fontSize: "0.5625rem",
                      padding: "1px 4px",
                      borderRadius: "2px",
                      color: "#FFFFFF",
                    }}
                  >
                    {ch.duration}
                  </div>
                </div>

                {/* Chapter Meta */}
                <div>
                  <div
                    style={{
                      fontSize: "0.625rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: isSelected ? "var(--color-brass)" : "#8E8880",
                      fontWeight: 600,
                      marginBottom: "0.2rem",
                    }}
                  >
                    CHAPTER 0{idx + 1}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.125rem",
                      color: "#FAF8F5",
                      marginBottom: "0.25rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {ch.title}
                  </h4>
                  <div style={{ fontSize: "0.75rem", color: "#A8A298" }}>{ch.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
