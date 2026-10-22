"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { PRODUCTS, formatPriceWithCurrency, getWhatsAppEnquiryUrl } from "@/data/products";

interface AudoProductStageProps {
  currency: CurrencyCode;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart?: (p: Product, f: ProductFinish) => void;
}

type TabType = "new" | "bestsellers" | "sale" | "all";

// Interactive 3D Card within the stage
const AudoCardItem: React.FC<{
  product: Product;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  showDivider: boolean;
}> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  showDivider,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [isHovered, setIsHovered] = useState(false);

  const formattedPrice = formatPriceWithCurrency(product.priceUSD, currency, product.priceINR);

  return (
    <div
      style={{
        position: "relative",
        borderRight: showDivider ? "1px solid #ECEAE5" : "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#FFFFFF",
      }}
      className="audo-card-col"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onQuickView(product)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        {/* Full-bleed Edge-to-Edge Product Visual Canvas */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Main Image with Smooth Micro-zoom on Hover */}
          <div
            style={{
              position: "relative",
              width: "100%",
              transform: isHovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              src={selectedFinish.image || (isHovered && product.hoverImage ? product.hoverImage : product.primaryImage)}
              alt={product.name}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>

          {/* Floating Wishlist Heart Icon Overlaid on Image */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            aria-label={isWishlisted ? "Remove from shortlist" : "Save to shortlist"}
            style={{
              position: "absolute",
              top: "0.875rem",
              right: "0.875rem",
              zIndex: 10,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border: "1px solid rgba(16, 43, 70, 0.08)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isWishlisted ? "var(--color-gold)" : "#102B46",
              transition: "transform 0.2s ease, background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "var(--color-gold)" : "none"}
              stroke={isWishlisted ? "var(--color-gold)" : "currentColor"}
              strokeWidth="1.8"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Card Details & Actions Area */}
        <div
          style={{
            padding: "1.5rem 1.25rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            flex: 1,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Finish Swatches */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              marginBottom: "0.85rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {product.finishes.slice(0, 3).map((f) => {
              const isSelected = selectedFinish.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFinish(f)}
                  aria-label={`Select finish ${f.name}`}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: f.colorHex || "#C8B89A",
                    border: isSelected ? "2px solid #102B46" : "1px solid rgba(0,0,0,0.15)",
                    outline: isSelected ? "2px solid var(--color-gold)" : "none",
                    outlineOffset: "2px",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.15s ease",
                  }}
                />
              );
            })}
            {product.finishes.length > 3 && (
              <span style={{ fontSize: "0.6875rem", color: "#848B94", fontWeight: 500, marginLeft: "0.2rem" }}>
                +{product.finishes.length - 3}
              </span>
            )}
          </div>

          {/* Title in tracked uppercase */}
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#102B46",
              textAlign: "center",
              marginBottom: "0.4rem",
              lineHeight: 1.35,
            }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div
            suppressHydrationWarning
            style={{
              fontSize: "0.875rem",
              color: "#575D65",
              fontWeight: 400,
              letterSpacing: "0.04em",
              textAlign: "center",
              marginBottom: "1.1rem",
            }}
          >
            {formattedPrice}
          </div>

          {/* Instant WhatsApp Action Link */}
          <a
            href={getWhatsAppEnquiryUrl(product.name, undefined, selectedFinish.name, formattedPrice)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--color-whatsapp)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              padding: "0.45rem 1rem",
              borderRadius: "20px",
              backgroundColor: "rgba(24, 134, 75, 0.08)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-whatsapp)";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(24, 134, 75, 0.08)";
              e.currentTarget.style.color = "var(--color-whatsapp)";
            }}
          >
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const STAGE_PRODUCTS: Product[] = [
  {
    id: "eave-modular-sofa",
    name: "Eave Modular Bouclé Sofa",
    subtitle: "Architectural curves inspired by building eaves with tactile luxury bouclé",
    category: "sofas",
    priceUSD: 1250,
    priceINR: 98000,
    priceOnEnquiry: false,
    designer: "Norm Architects for Audo Copenhagen",
    year: 2025,
    description: "Taking its name from 'eaves' – the lower edges of a roof that overhang a wall – the Eave Modular Sofa is an architectural piece that curves gently into open-plan spaces.",
    details: [
      "Modular components for flexible corner or straight configurations",
      "Tactile bouclé upholstery with high Martindale rub endurance",
      "Generous curved internal armrests engineered for lounging",
    ],
    dimensions: "W 240 cm x D 96 cm x H 70 cm (Seat Height: 40 cm)",
    materials: "Kiln-dried solid frame, High-resilience cold foam, Bouclé wool blend",
    primaryImage: "/images/eave-sofa.jpg",
    finishes: [
      { id: "ivory-boucle", name: "Ivory Bouclé", colorHex: "#F2EDE4" },
      { id: "charcoal", name: "Charcoal Wool", colorHex: "#333538" },
      { id: "terracotta", name: "Warm Terracotta", colorHex: "#A05A46" },
    ],
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    featured: true,
  },
  {
    id: "echasse-smoked-vase",
    name: "Échasse Smoked Glass Brass Vase",
    subtitle: "Mouth-blown drop-shaped smoked glass balanced upon stilted brass legs",
    category: "objects" as any,
    priceUSD: 320,
    priceINR: 24000,
    priceOnEnquiry: false,
    designer: "Theresa Rand for Audo Copenhagen",
    year: 2025,
    description: "The Échasse Vase reimagines the classic elegance of glass vessels. The French word 'échasse' means stilts – the slender, stilt-like brass legs that suspend the smoked glass form.",
    details: [
      "Mouth-blown smoked glass with subtle gradient tinting",
      "Solid bronzed brass stilt armature with brushed satin finish",
      "Sculptural presence both empty or arranged with botanical branches",
    ],
    dimensions: "Diameter 28 cm x H 60 cm",
    materials: "Mouth-blown Smoked Glass, Solid Bronzed Brass",
    primaryImage: "/images/echasse-vase.jpg",
    finishes: [
      { id: "smoked-brass", name: "Smoked Glass & Brass", colorHex: "#C5A45D" },
      { id: "amber-bronze", name: "Amber Glass & Dark Bronze", colorHex: "#4A3326" },
    ],
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    featured: true,
  },
  {
    id: "hashira-ambient-column-lamp",
    name: "Hashira Ambient Column Lamp",
    subtitle: "Geometric Japanese lantern inspiration in natural linen and blackened steel",
    category: "lighting" as any,
    priceUSD: 410,
    priceINR: 32000,
    priceOnEnquiry: false,
    designer: "Norm Architects for Audo Copenhagen",
    year: 2026,
    description: "Taking inspiration from traditional Japanese paper lanterns, Hashira combines a cylindrical silhouette with a translucent linen shade that diffuses light in multiple directions.",
    details: [
      "Natural raw woven linen shade casting warm ambient glow",
      "Blackened ash wood base with tactile brass dimmer dial",
      "Architectural column geometry suited for bedside or living corners",
    ],
    dimensions: "Diameter 24 cm x H 83 cm",
    materials: "Natural Linen, Blackened Ash, Solid Brass Dial",
    primaryImage: "/images/hashira-lamp.jpg",
    finishes: [
      { id: "raw-linen", name: "Raw Oat Linen", colorHex: "#D8CDBA" },
      { id: "white-linen", name: "Pure White Linen", colorHex: "#F7F5F0" },
    ],
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    featured: true,
  },
];

export const AudoProductStage: React.FC<AudoProductStageProps> = ({
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("new");
  const [index, setIndex] = useState(0);

  const [VISIBLE, setVisible] = useState(3);

  useEffect(() => {
    const update = () => setVisible(window.innerWidth <= 640 ? 1 : window.innerWidth <= 992 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const tabProducts = React.useMemo(() => {
    const all = [...STAGE_PRODUCTS, ...PRODUCTS.filter((p) => !STAGE_PRODUCTS.some((s) => s.id === p.id))];
    if (activeTab === "bestsellers") return [...all].sort((a, b) => b.reviewCount - a.reviewCount);
    if (activeTab === "sale") return [...all].sort((a, b) => (a.priceINR ?? a.priceUSD) - (b.priceINR ?? b.priceUSD)).slice(0, 8);
    return [...STAGE_PRODUCTS, ...all.filter((p) => !STAGE_PRODUCTS.some((s) => s.id === p.id)).sort((a, b) => b.year - a.year)];
  }, [activeTab]);

  const maxIndex = Math.max(0, tabProducts.length - VISIBLE);
  const clamped = Math.min(index, maxIndex);

  // Swipe / drag the track sideways to move one card at a time.
  const swipeStart = React.useRef<number | null>(null);
  const onSwipeStart = (e: React.PointerEvent) => {
    swipeStart.current = e.clientX;
  };
  const onSwipeEnd = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) < 40) return;
    setIndex(dx < 0 ? Math.min(maxIndex, clamped + 1) : Math.max(0, clamped - 1));
  };

  const selectTab = (tab: TabType) => {
    setActiveTab(tab);
    setIndex(0);
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: "new", label: "New Designs" },
    { key: "bestsellers", label: "Best Sellers" },
    { key: "sale", label: "Sale" },
  ];

  return (
    <section id="audo-product-stage" style={{ padding: 0, backgroundColor: "var(--color-canvas)" }}>
      <div className="audo-stage-container" style={{ background: "#FFFFFF", overflow: "hidden" }}>
        {/* Header Row: Tabs on Left + Carousel Arrows on Right */}
        <div className="audo-header-row">
          <div className="audo-header-tabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => selectTab(t.key)}
                className={`audo-tab-btn ${activeTab === t.key ? "is-active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <button
              onClick={() => setIndex(Math.max(0, clamped - 1))}
              disabled={clamped === 0}
              aria-label="Previous products"
              className="audo-arrow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setIndex(Math.min(maxIndex, clamped + 1))}
              disabled={clamped >= maxIndex}
              aria-label="Next products"
              className="audo-arrow audo-arrow--next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sliding product track */}
        <div
          style={{ overflow: "hidden", touchAction: "pan-y" }}
          onPointerDown={onSwipeStart}
          onPointerUp={onSwipeEnd}
          onPointerCancel={() => (swipeStart.current = null)}
        >
          <motion.div
            key={activeTab}
            className="audo-stage-grid"
            initial={false}
            animate={{ x: `-${(clamped * 100) / tabProducts.length}%` }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", width: `${(tabProducts.length * 100) / VISIBLE}%`, alignItems: "stretch" }}
          >
            {tabProducts.map((product, idx) => (
              <div key={product.id} style={{ width: `${100 / tabProducts.length}%`, display: "flex", flexDirection: "column" }}>
                <AudoCardItem
                  product={product}
                  currency={currency}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  showDivider={idx < tabProducts.length - 1}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile progress, like the reference: 01 / 06 and a bar */}
        <div className="audo-progress">
          <span>
            {String(clamped + 1).padStart(2, "0")} / {String(maxIndex + 1).padStart(2, "0")}
          </span>
          <div className="audo-progress__bar">
            <motion.div
              className="audo-progress__fill"
              animate={{ width: `${((clamped + 1) / (maxIndex + 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Bottom Row: Shop All Link */}
        <div
          style={{
            borderTop: "1px solid #ECEAE5",
            padding: "1.5rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            href="/furniture"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "#111111",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span>Shop All</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
