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
            aspectRatio: "1 / 1",
            overflow: "hidden",
            backgroundColor: "#F7F5F0",
          }}
        >
          {/* Main Image with Smooth Micro-zoom on Hover */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transform: isHovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              src={selectedFinish.image || (isHovered && product.hoverImage ? product.hoverImage : product.primaryImage)}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
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
            padding: "18px 12px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          {/* Finish Swatches */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              height: "12px",
              marginBottom: "8px",
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
                  title={f.name}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: f.colorHex || "#C8B89A",
                    border: "none",
                    outline: isSelected ? "1.5px solid #111111" : "none",
                    outlineOffset: "1.5px",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.15s ease",
                  }}
                />
              );
            })}
            {product.finishes.length > 3 && (
              <span style={{ fontSize: "9px", color: "#111111", lineHeight: 1, marginLeft: "1px" }}>
                +{product.finishes.length - 3}
              </span>
            )}
          </div>

          {/* Title in tracked uppercase */}
          <h3
            style={{
              margin: "0 0 5px",
              maxWidth: "100%",
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              lineHeight: 1.25,
              fontWeight: 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#111111",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div
            suppressHydrationWarning
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              lineHeight: 1.25,
              letterSpacing: "0.04em",
              color: "#9A9A9A",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            {formattedPrice}
          </div>

          {/* Instant WhatsApp Action Link - Both Icon and Text */}
          <a
            href={getWhatsAppEnquiryUrl(product.name, undefined, selectedFinish.name, formattedPrice)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            title="Enquire on WhatsApp"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              backgroundColor: "rgba(24, 134, 75, 0.08)",
              color: "#18864B",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-whatsapp)";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(24, 134, 75, 0.08)";
              e.currentTarget.style.color = "#18864B";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
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
            style={{ display: "flex", width: `${(tabProducts.length * 100) / VISIBLE}%`, alignItems: "flex-start" }}
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
