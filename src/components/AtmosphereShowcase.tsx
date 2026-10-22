"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { PRODUCTS, formatPriceWithCurrency } from "@/data/products";

interface AtmosphereShowcaseProps {
  currency: CurrencyCode;
  onQuickView: (p: Product) => void;
  onAddToCart?: (p: Product, f: ProductFinish) => void;
}

// 3D Floating Product Card Component with Spring Physics
const AtmosphereFloatingCard: React.FC<{
  product: Product;
  currency: CurrencyCode;
  onQuickView: (p: Product) => void;
}> = ({ product, currency, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics for realistic 3D tactile interaction
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { damping: 22, stiffness: 240 });
  const mouseYSpring = useSpring(y, { damping: 22, stiffness: 240 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const formattedPrice = formatPriceWithCurrency(
    product.priceUSD,
    currency,
    product.priceINR
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onQuickView(product)}
      style={{
        perspective: "1000px",
        cursor: "pointer",
        width: "100%",
        maxWidth: "260px",
      }}
      className="atmosphere-floating-card-wrap"
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          background: "#FFFFFF",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: isHovered
            ? "0 28px 55px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(197, 164, 93, 0.45)"
            : "0 16px 36px rgba(0, 0, 0, 0.22)",
          transition: "box-shadow 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Product Image Extending Edge-to-Edge */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "140px",
            overflow: "hidden",
            backgroundColor: "#F4F1EA",
          }}
          className="atmosphere-card-img-wrap"
        >
          <motion.div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              src={product.primaryImage}
              alt={product.name}
              fill
              sizes="260px"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>

        {/* Text Area */}
        <div style={{ padding: "0.85rem 1rem 0.75rem", width: "100%" }}>
          {/* Product Title */}
          <h4
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#102B46",
              marginBottom: "0.3rem",
              lineHeight: 1.35,
            }}
            className="atmosphere-card-title"
          >
            {product.name}
          </h4>

          {/* Price */}
          <div
            suppressHydrationWarning
            style={{
              fontSize: "0.75rem",
              color: "#575D65",
              fontWeight: 500,
              letterSpacing: "0.04em",
              marginBottom: "0.55rem",
            }}
          >
            {formattedPrice}
          </div>

          {/* Quick action link */}
          <div
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--color-gold)",
              borderTop: "1px solid rgba(16, 43, 70, 0.08)",
              paddingTop: "0.45rem",
              width: "100%",
            }}
          >
            View Details →
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Continuous Auto-Scrolling Product Reel Component (Seamless Infinite Marquee)
const AtmosphereContinuousReel: React.FC<{
  products: Product[];
  currency: CurrencyCode;
  onQuickView: (p: Product) => void;
}> = ({ products, currency, onQuickView }) => {
  // Triplicate the array for seamless infinite looping (0% to -33.333%)
  const loopProducts = [...products, ...products, ...products];

  return (
    <div
      className="atmosphere-reel-viewport"
      tabIndex={0}
      role="region"
      aria-label="Continuous auto-scrolling product showcase"
    >
      <div className="atmosphere-reel-track">
        {loopProducts.map((p, idx) => (
          <div key={`${p.id}-${idx}`} className="atmosphere-reel-item">
            <AtmosphereFloatingCard
              product={p}
              currency={currency}
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const AtmosphereShowcase: React.FC<AtmosphereShowcaseProps> = ({
  currency,
  onQuickView,
}) => {
  // Curated product sets for each atmospheric space
  const livingProducts = [
    PRODUCTS.find((p) => p.id === "contemporary-comfort-sofa") || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === "cloudcomfort-motorized-recliner") || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === "aurelia-wave-sofa") || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === "royal-chesterfield-suite") || PRODUCTS[4],
  ];

  const bedroomProducts = [
    PRODUCTS.find((p) => p.id === "heritage-teakwood-king-cot") ||
      PRODUCTS.find((p) => p.category === "beds") ||
      PRODUCTS[3],
    PRODUCTS.find((p) => p.id === "cloudcomfort-motorized-recliner") || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === "contemporary-comfort-sofa") || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === "aurelia-wave-sofa") || PRODUCTS[2],
  ];

  const diningProducts = [
    PRODUCTS.find((p) => p.id === "italian-marble-dining-table") ||
      PRODUCTS.find((p) => p.category === "dining") ||
      PRODUCTS[2],
    PRODUCTS.find((p) => p.id === "penthouse-modular-sectional") || PRODUCTS[3],
    PRODUCTS.find((p) => p.id === "contemporary-comfort-sofa") || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === "cloudcomfort-motorized-recliner") || PRODUCTS[1],
  ];

  // Generous 300vh scroll track to give each card ample, unhurried distance to stack sequentially
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activePhase, setActivePhase] = useState<number>(0);

  // Sync active phase with scroll progression for navigation pills
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.38) {
      if (activePhase !== 0) setActivePhase(0);
    } else if (latest < 0.72) {
      if (activePhase !== 1) setActivePhase(1);
    } else {
      if (activePhase !== 2) setActivePhase(2);
    }
  });

  // =========================================================================
  // CARD 0: LIVING ROOM (Base card)
  // Stays flat at 0 until Card 1 slides up and stacks over it
  // Then scales down to 0.94 and dims to 0.65 for realistic 3D depth
  // When Card 2 enters, scales down further to 0.89 and dims to 0.40
  // =========================================================================
  const card0Scale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.52, 0.62, 0.86],
    [1, 1, 0.94, 0.94, 0.89]
  );
  const card0Brightness = useTransform(
    scrollYProgress,
    [0, 0.28, 0.52, 0.62, 0.86],
    [1, 1, 0.68, 0.68, 0.45]
  );
  const card0Y = useTransform(
    scrollYProgress,
    [0, 0.28, 0.52, 0.62, 0.86],
    [0, 0, -22, -22, -40]
  );

  // =========================================================================
  // CARD 1: BEDROOM (Stacks sequentially on top of Card 0)
  // Starts below at y: "100%", slides up during [0.26, 0.52] and stacks over Card 0
  // When Card 2 enters during [0.62, 0.86], Card 1 scales to 0.94 and dims to 0.68
  // =========================================================================
  const card1Y = useTransform(
    scrollYProgress,
    [0.26, 0.52, 0.62, 0.86],
    ["100%", "0%", "0%", "-22px"]
  );
  const card1Scale = useTransform(
    scrollYProgress,
    [0.26, 0.52, 0.62, 0.86],
    [1, 1, 1, 0.94]
  );
  const card1Brightness = useTransform(
    scrollYProgress,
    [0.26, 0.52, 0.62, 0.86],
    [1, 1, 1, 0.68]
  );

  // =========================================================================
  // CARD 2: DINING (Stacks sequentially on top of Card 1)
  // Starts below at y: "100%", slides up during [0.60, 0.86] and stacks over Card 1
  // =========================================================================
  const card2Y = useTransform(
    scrollYProgress,
    [0.60, 0.86],
    ["100%", "0%"]
  );

  // Direct smooth scroll to each card's stacked position
  const scrollToPhase = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.54 : 0.92;
    window.scrollTo({
      top: scrollTop + totalScroll * targetProgress,
      behavior: "smooth",
    });
  };

  const nextPhase = () => {
    const nextIdx = (activePhase + 1) % 3;
    scrollToPhase(nextIdx);
  };

  const prevPhase = () => {
    const prevIdx = (activePhase - 1 + 3) % 3;
    scrollToPhase(prevIdx);
  };

  const PHASES_DATA = [
    {
      id: 0,
      label: "Living",
      title: "Living.",
      desc: "Handcrafted modular seating, German motorized recliners, and curved statement loungers.",
      href: "/sofas-kurnool",
      linkText: "Shop Living",
      image: "/images/mf-gold-drum-living.jpg",
      alt: "Living Atmosphere Casablanca Sofas",
      objectPosition: "center 40%",
      products: livingProducts,
    },
    {
      id: 1,
      label: "Bedroom",
      title: "Bedroom.",
      desc: "Solid Burma teakwood king cots with German gas-lift hydraulic storage and custom headboards.",
      href: "/beds-cots-kurnool",
      linkText: "Shop Bedroom",
      image: "/images/Analysis output 3 (1).png",
      alt: "Bedroom Atmosphere Casablanca Sofas",
      objectPosition: "center 45%",
      products: bedroomProducts,
    },
    {
      id: 2,
      label: "Dining",
      title: "Dining.",
      desc: "Monolithic Italian marble and solid teak dining tables with sculptural ergonomic chairs.",
      href: "/dining-tables-kurnool",
      linkText: "Shop Dining",
      image: "/images/Analysis output 2 (1).png",
      alt: "Dining Atmosphere Casablanca Sofas",
      objectPosition: "center 40%",
      products: diningProducts,
    },
  ];

  return (
    <div
      id="atmosphere-showcases"
      ref={containerRef}
      style={{
        position: "relative",
        backgroundColor: "#102B46",
        height: "300vh",
        width: "100%",
      }}
    >
      {/* Sticky Viewport Stage */}
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          margin: 0,
          zIndex: 8,
          overflow: "hidden",
        }}
        className="atmosphere-sticky-wrap"
      >
        <div
          className="atmosphere-block"
          style={{
            maxWidth: "100%",
            width: "100%",
            height: "100%",
            position: "relative",
            borderRadius: 0,
            overflow: "hidden",
            boxShadow: "none",
            border: "none",
          }}
        >
          {/* =========================================================
              CARD 0: 01 LIVING (Base Layer - Stacks Underneath)
             ========================================================= */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              scale: card0Scale,
              y: card0Y,
              filter: useTransform(card0Brightness, (b) => `brightness(${b})`),
              zIndex: 1,
              overflow: "hidden",
              backgroundColor: "#102B46",
              willChange: "transform, filter",
            }}
            className="atmosphere-stack-card"
          >
            {/* Background Image */}
            <div style={{ position: "absolute", inset: "-3%", zIndex: 0 }}>
              <Image
                src={PHASES_DATA[0].image}
                alt={PHASES_DATA[0].alt}
                fill
                priority
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: PHASES_DATA[0].objectPosition,
                }}
              />
            </div>

            {/* Vignette Contrast Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(16, 43, 70, 0.88) 0%, rgba(16, 43, 70, 0.55) 48%, rgba(16, 43, 70, 0.28) 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
              className="atmosphere-overlay"
            />

            {/* Content Grid */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                maxWidth: "1680px",
                height: "100%",
                margin: "0 auto",
                padding: "6.5rem 5rem 4rem",
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                alignItems: "center",
                gap: "3rem",
              }}
              className="atmosphere-inner-grid"
            >
              {/* Editorial Text */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
                className="atmosphere-text-container"
              >
                <div className="atmosphere-text-block" style={{ maxWidth: "480px" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                      fontWeight: 300,
                      color: "#FAF8F5",
                      lineHeight: 1.1,
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>{PHASES_DATA[0].title}</span>
                  </h2>
                  <p
                    style={{
                      color: "rgba(250, 248, 245, 0.88)",
                      fontSize: "1.0625rem",
                      lineHeight: 1.6,
                      fontWeight: 300,
                      marginBottom: "1.85rem",
                    }}
                    className="atmosphere-desc"
                  >
                    {PHASES_DATA[0].desc}
                  </p>
                  <Link
                    href={PHASES_DATA[0].href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      backgroundColor: "#FFFFFF",
                      color: "#102B46",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "0.85rem 1.85rem",
                      borderRadius: "30px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--color-gold)";
                      e.currentTarget.style.color = "#FFFFFF";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.color = "#102B46";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span>{PHASES_DATA[0].linkText}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Continuous Auto-Scrolling Product Reel */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                className="atmosphere-cards-wrap"
              >
                <div className="atmosphere-cards-col" style={{ position: "relative" }}>
                  <AtmosphereContinuousReel
                    products={PHASES_DATA[0].products}
                    currency={currency}
                    onQuickView={onQuickView}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* =========================================================
              CARD 1: 02 BEDROOM (Stacks on Top of Card 0)
             ========================================================= */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              y: card1Y,
              scale: card1Scale,
              filter: useTransform(card1Brightness, (b) => `brightness(${b})`),
              zIndex: 2,
              borderRadius: "28px 28px 0 0",
              boxShadow: "0 -25px 65px rgba(0, 0, 0, 0.65)",
              overflow: "hidden",
              backgroundColor: "#102B46",
              willChange: "transform, filter",
            }}
            className="atmosphere-stack-card"
          >
            {/* Background Image */}
            <div style={{ position: "absolute", inset: "-3%", zIndex: 0 }}>
              <Image
                src={PHASES_DATA[1].image}
                alt={PHASES_DATA[1].alt}
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: PHASES_DATA[1].objectPosition,
                }}
              />
            </div>

            {/* Vignette Contrast Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(16, 43, 70, 0.88) 0%, rgba(16, 43, 70, 0.55) 48%, rgba(16, 43, 70, 0.28) 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
              className="atmosphere-overlay"
            />

            {/* Content Grid */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                maxWidth: "1680px",
                height: "100%",
                margin: "0 auto",
                padding: "6.5rem 5rem 4rem",
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                alignItems: "center",
                gap: "3rem",
              }}
              className="atmosphere-inner-grid"
            >
              {/* Editorial Text */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
                className="atmosphere-text-container"
              >
                <div className="atmosphere-text-block" style={{ maxWidth: "480px" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                      fontWeight: 300,
                      color: "#FAF8F5",
                      lineHeight: 1.1,
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>{PHASES_DATA[1].title}</span>
                  </h2>
                  <p
                    style={{
                      color: "rgba(250, 248, 245, 0.88)",
                      fontSize: "1.0625rem",
                      lineHeight: 1.6,
                      fontWeight: 300,
                      marginBottom: "1.85rem",
                    }}
                    className="atmosphere-desc"
                  >
                    {PHASES_DATA[1].desc}
                  </p>
                  <Link
                    href={PHASES_DATA[1].href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      backgroundColor: "#FFFFFF",
                      color: "#102B46",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "0.85rem 1.85rem",
                      borderRadius: "30px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--color-gold)";
                      e.currentTarget.style.color = "#FFFFFF";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.color = "#102B46";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span>{PHASES_DATA[1].linkText}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Continuous Auto-Scrolling Product Reel */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                className="atmosphere-cards-wrap"
              >
                <div className="atmosphere-cards-col" style={{ position: "relative" }}>
                  <AtmosphereContinuousReel
                    products={PHASES_DATA[1].products}
                    currency={currency}
                    onQuickView={onQuickView}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* =========================================================
              CARD 2: 03 DINING (Stacks on Top of Card 1)
             ========================================================= */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              y: card2Y,
              zIndex: 3,
              borderRadius: "28px 28px 0 0",
              boxShadow: "0 -30px 75px rgba(0, 0, 0, 0.75)",
              overflow: "hidden",
              backgroundColor: "#102B46",
              willChange: "transform",
            }}
            className="atmosphere-stack-card"
          >
            {/* Background Image */}
            <div style={{ position: "absolute", inset: "-3%", zIndex: 0 }}>
              <Image
                src={PHASES_DATA[2].image}
                alt={PHASES_DATA[2].alt}
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: PHASES_DATA[2].objectPosition,
                }}
              />
            </div>

            {/* Vignette Contrast Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(16, 43, 70, 0.88) 0%, rgba(16, 43, 70, 0.55) 48%, rgba(16, 43, 70, 0.28) 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
              className="atmosphere-overlay"
            />

            {/* Content Grid */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                maxWidth: "1680px",
                height: "100%",
                margin: "0 auto",
                padding: "6.5rem 5rem 4rem",
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                alignItems: "center",
                gap: "3rem",
              }}
              className="atmosphere-inner-grid"
            >
              {/* Editorial Text */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
                className="atmosphere-text-container"
              >
                <div className="atmosphere-text-block" style={{ maxWidth: "480px" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                      fontWeight: 300,
                      color: "#FAF8F5",
                      lineHeight: 1.1,
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>{PHASES_DATA[2].title}</span>
                  </h2>
                  <p
                    style={{
                      color: "rgba(250, 248, 245, 0.88)",
                      fontSize: "1.0625rem",
                      lineHeight: 1.6,
                      fontWeight: 300,
                      marginBottom: "1.85rem",
                    }}
                    className="atmosphere-desc"
                  >
                    {PHASES_DATA[2].desc}
                  </p>
                  <Link
                    href={PHASES_DATA[2].href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      backgroundColor: "#FFFFFF",
                      color: "#102B46",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "0.85rem 1.85rem",
                      borderRadius: "30px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--color-gold)";
                      e.currentTarget.style.color = "#FFFFFF";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.color = "#102B46";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span>{PHASES_DATA[2].linkText}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Continuous Auto-Scrolling Product Reel */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                className="atmosphere-cards-wrap"
              >
                <div className="atmosphere-cards-col" style={{ position: "relative" }}>
                  <AtmosphereContinuousReel
                    products={PHASES_DATA[2].products}
                    currency={currency}
                    onQuickView={onQuickView}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* =========================================================
              LAYER 4: INTERACTIVE STACKING NAVIGATION CONTROLS
             ========================================================= */}
          <div
            style={{
              position: "absolute",
              bottom: "2.25rem",
              left: "5rem",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
            className="atmosphere-phase-nav"
          >
            {/* Previous / Next Manual Stepping Chevrons */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <button
                type="button"
                onClick={prevPhase}
                aria-label="Previous Atmosphere"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(16, 43, 70, 0.65)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FAF8F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-gold)";
                  e.currentTarget.style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.color = "#FAF8F5";
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextPhase}
                aria-label="Next Atmosphere"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(16, 43, 70, 0.65)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FAF8F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-gold)";
                  e.currentTarget.style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.color = "#FAF8F5";
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Atmosphere Selection Pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {PHASES_DATA.map((phase, idx) => {
                const isActive = activePhase === idx;
                return (
                  <button
                    key={phase.label}
                    type="button"
                    onClick={() => scrollToPhase(idx)}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      background: isActive
                        ? "rgba(16, 43, 70, 0.88)"
                        : "rgba(16, 43, 70, 0.4)",
                      border: isActive
                        ? "1px solid var(--color-gold)"
                        : "1px solid rgba(255, 255, 255, 0.18)",
                      color: isActive ? "#FAF8F5" : "rgba(250, 248, 245, 0.65)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      padding: "0.38rem 0.95rem",
                      borderRadius: "20px",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: isActive
                          ? "var(--color-gold)"
                          : "rgba(255, 255, 255, 0.4)",
                        boxShadow: isActive ? "0 0 6px var(--color-gold)" : "none",
                        display: "inline-block",
                        transition: "background-color 0.25s ease",
                      }}
                    />
                    <span>{phase.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
