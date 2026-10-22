"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { FilterCategory } from "./CategoryFilter";

interface CategoryBannersProps {
  onSelectCategory: (cat: FilterCategory) => void;
}

interface BannerItem {
  id: string;
  category: FilterCategory;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

// -------------------------------------------------------------
// INDIVIDUAL PARALLAX CATEGORY CARD COMPONENT
// Layered movement: outer card float + inner image glide + 3D tilt
// -------------------------------------------------------------
const ParallaxCategoryCard: React.FC<{
  banner: BannerItem;
  index: number;
  sectionProgress: MotionValue<number>;
  onClick: (cat: FilterCategory) => void;
}> = ({ banner, index, sectionProgress, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Multi-speed column parallax offsets (staggered depths)
  const yOffsets = [
    [-32, 32],  // Column 1 (Sofas): gentle drift
    [48, -48],  // Column 2 (Recliners): counter-speed drift
    [-24, 24],  // Column 3 (Beds): moderate drift
    [56, -56],  // Column 4 (Dining): elevated dynamic speed
  ];
  const [startOffset, endOffset] = yOffsets[index % 4];

  const rawCardY = useTransform(sectionProgress, [0, 1], [startOffset, endOffset]);
  const cardY = useSpring(rawCardY, { damping: 26, stiffness: 190 });

  // 2. Layered image parallax inside the card frame
  const rawImgY = useTransform(sectionProgress, [0, 1], ["-12%", "12%"]);
  const imgY = useSpring(rawImgY, { damping: 26, stiffness: 190 });

  // 3. Foreground content counter-drift for enhanced 3D stereoscopic depth
  const rawContentY = useTransform(sectionProgress, [0, 1], [10, -10]);
  const contentY = useSpring(rawContentY, { damping: 26, stiffness: 190 });

  // 4. Scroll-based secondary image transition (subtle cross-fade past scroll midpoint)
  const scrollSecondaryOpacity = useTransform(
    sectionProgress,
    [0.32, 0.52, 0.72],
    [0, 0.88, 0]
  );

  // 5. Tactile 3D mouse tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { damping: 22, stiffness: 240 });
  const mouseYSpring = useSpring(mouseY, { damping: 22, stiffness: 240 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      style={{
        y: cardY,
        willChange: "transform",
      }}
      className="category-parallax-card-wrapper"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(banner.category)}
        style={{
          perspective: "1000px",
          cursor: "pointer",
          height: "460px",
          width: "100%",
        }}
        className="category-card-perspective"
      >
        <motion.div
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d",
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: isHovered
              ? "0 28px 60px rgba(10, 25, 42, 0.38), 0 0 0 1px rgba(197, 164, 93, 0.45)"
              : "0 10px 30px rgba(10, 25, 42, 0.16)",
            transition: "box-shadow 0.4s ease",
          }}
          className="category-parallax-card"
        >
          {/* =========================================================
              LAYER 1: PARALLAX BACKGROUND IMAGES (MULTI-SPEED DRIFT)
             ========================================================= */}
          <motion.div
            style={{
              position: "absolute",
              inset: "-16% 0", // Extra vertical margin allows smooth internal gliding
              y: imgY,
              willChange: "transform",
            }}
            className="category-img-parallax-container"
          >
            {/* Unique Architectural Image with hover scale */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                scale: isHovered ? 1.08 : 1,
                transition: "scale 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </motion.div>
          </motion.div>

          {/* =========================================================
              LAYER 2: VIGNETTES & GLOW
             ========================================================= */}
          {/* Deep Architectural Bottom Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(16, 43, 70, 0.08) 0%, transparent 35%, rgba(10, 25, 42, 0.45) 65%, rgba(10, 25, 42, 0.94) 100%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Golden Ambient Corner Glow on Hover */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 100%, rgba(197, 164, 93, 0.25) 0%, transparent 60%)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.4s ease",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />



          {/* =========================================================
              LAYER 4: FOREGROUND CONTENT (WITH COUNTER-DRIFT PARALLAX)
             ========================================================= */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "1.75rem",
              left: "1.5rem",
              right: "1.5rem",
              zIndex: 2,
              y: contentY,
            }}
            className="category-card-content"
          >
            <h3
              style={{
                fontFamily: '"Marcellus", var(--font-serif)',
                fontSize: "1.5rem",
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: "0.65rem",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
              }}
            >
              {banner.title}
            </h3>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                fontWeight: 700,
                transition: "transform 0.25s ease, color 0.25s ease",
                transform: isHovered ? "translateX(4px)" : "translateX(0)",
              }}
            >
              <span>EXPLORE COLLECTION</span>
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.25s ease",
                  transform: isHovered ? "translateX(4px)" : "translateX(0)",
                }}
              >
                →
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const CategoryBanners: React.FC<CategoryBannersProps> = ({ onSelectCategory }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const banners: BannerItem[] = [
    {
      id: "sofas",
      category: "sofas" as FilterCategory,
      slug: "/sofas-kurnool",
      number: "01",
      title: "Curved & Modular Sofas",
      subtitle: "Tactile Bouclé Upholstery & Bespoke Living Room Layouts",
      image: "/images/mf-curved-modular-sofa.jpg",
      tag: "24 DESIGNS",
    },
    {
      id: "dining",
      category: "dining" as FilterCategory,
      slug: "/dining-tables-kurnool",
      number: "02",
      title: "Italian Marble & Teak Dining",
      subtitle: "Natural Polished Marble Tops on Fluted Burma Teak Pedestals",
      image: "/images/mf-marble-dual-living.jpg",
      tag: "18 SUITES",
    },
    {
      id: "beds",
      category: "beds" as FilterCategory,
      slug: "/beds-cots-kurnool",
      number: "03",
      title: "Heirloom Teakwood Suites",
      subtitle: "Solid Seasoned Burma Teak Beds & Architectural Casegoods",
      image: "/images/Analysis output 3.png",
      tag: "28 HEIRLOOMS",
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
      ref={sectionRef}
      style={{
        padding: "5.5rem 0 6.5rem",
        backgroundColor: "var(--color-canvas)",
        borderBottom: "1px solid var(--color-card-border)",
        overflow: "hidden", // Prevents vertical drift from overflowing the viewport
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
            marginBottom: "3rem",
          }}
          className="category-banners-header"
        >
          <div>
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--color-gold)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              SHOP BY CATEGORY · KURNOOL SHOWROOM
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "var(--color-navy)",
              }}
            >
              Find Your <span style={{ fontStyle: "italic", color: "var(--color-gold)" }}>Perfect Furniture</span>
            </h2>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "1rem",
                fontWeight: 300,
                marginTop: "0.5rem",
                lineHeight: 1.5,
              }}
            >
              Explore our collections for every room in your home.
            </p>
          </div>

          <a
            href="#collection"
            className="btn-ghost"
            style={{ fontSize: "0.75rem", letterSpacing: "0.14em", color: "var(--color-navy)" }}
          >
            EXPLORE COLLECTION →
          </a>
        </div>

        {/* 3 Cards Parallax Grid matching screenshot */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.75rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
          }}
          className="category-parallax-grid"
        >
          {banners.map((b, idx) => (
            <ParallaxCategoryCard
              key={b.id}
              banner={b}
              index={idx}
              sectionProgress={scrollYProgress}
              onClick={handleBannerClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
