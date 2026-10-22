"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CurrencyCode, Product } from "@/types";
import {
  LOOKBOOK_ROOMS,
  PRODUCTS,
  formatPriceWithCurrency,
  getWhatsAppEnquiryUrl,
} from "@/data/products";
import { StackingCards, StackingCardItem } from "@/components/ui/stacking-cards";

interface LookbookHotspotProps {
  currency: CurrencyCode;
  onQuickView: (p: Product) => void;
}

export const LookbookHotspot: React.FC<LookbookHotspotProps> = ({
  currency,
  onQuickView,
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getHotspotProduct = (productId: string): Product | undefined => {
    return PRODUCTS.find((p) => p.id === productId);
  };

  return (
    <section
      id="lookbook-inspiration"
      style={{
        padding: "6rem 0 5rem",
        backgroundColor: "var(--color-canvas)",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: "1360px", margin: "0 auto" }}>
        {/* Section Header: Matching Inspiration Screenshot */}
        <div
          className="lookbook-header"
          style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 4rem" }}
        >
          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--color-gold)",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            INTERACTIVE CURATION
          </span>

          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
              fontWeight: 700,
              color: "#102B46",
              marginBottom: "0.85rem",
              letterSpacing: "-0.01em",
            }}
          >
            Inspiration
          </h2>

          <p
            style={{
              color: "#575D65",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            Inspire a more creative way of living through good design that is good to
            everyone. Click the hotspot pins (+) to inspect featured furniture pieces.
          </p>
        </div>

        {/* Stacking Card Scroll Effect Stage */}
        <StackingCards
          totalCards={LOOKBOOK_ROOMS.length}
          showPills={false}
        >
          {LOOKBOOK_ROOMS.map((room, index) => {
            return (
              <StackingCardItem
                key={room.id}
                index={index}
                total={LOOKBOOK_ROOMS.length}
                className="lookbook-stack-card"
                topOffset={110}
                stackSpacing={28}
                distance="50vh"
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "28px",
                  }}
                  onClick={() => {
                    setActiveHotspotId(null);
                    setHoveredHotspotId(null);
                  }}
                >
                  {/* Clipped Room Image & Atmosphere Vignette Layer */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "28px",
                      overflow: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1040px"
                      style={{ objectFit: "cover" }}
                      priority={index === 0}
                    />

                    {/* Gradient Contrast Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0.22) 0%, transparent 40%, rgba(16, 43, 70, 0.72) 100%)",
                      }}
                    />
                  </div>

                  {/* Interactive Hotspot Pins & Popovers Layer (Unclipped & Fully Visible) */}
                  {room.hotspots.map((hs) => {
                    const isOpen = activeHotspotId === hs.id || hoveredHotspotId === hs.id;
                    const product = getHotspotProduct(hs.productId);
                    const isRight = hs.xPercent >= 68;
                    const isLeft = hs.xPercent <= 32;
                    const isTop = hs.yPercent < 45;

                    return (
                      <div
                        key={hs.id}
                        onMouseEnter={() => {
                          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                          setHoveredHotspotId(hs.id);
                        }}
                        onMouseLeave={() => {
                          hoverTimeoutRef.current = setTimeout(() => {
                            setHoveredHotspotId(null);
                          }, 220);
                        }}
                        style={{
                          position: "absolute",
                          top: `${hs.yPercent}%`,
                          left: `${hs.xPercent}%`,
                          transform: "translate(-50%, -50%)",
                          zIndex: isOpen ? 120 : 30,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Hotspot Trigger Button (+) */}
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeHotspotId === hs.id) {
                              setActiveHotspotId(null);
                              setHoveredHotspotId(null);
                            } else {
                              setActiveHotspotId(hs.id);
                              setHoveredHotspotId(hs.id);
                            }
                          }}
                          aria-label={`View ${hs.title}`}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            backgroundColor: isOpen
                              ? "#102B46"
                              : "rgba(255, 255, 255, 0.96)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            border: "2px solid var(--color-gold)",
                            color: isOpen ? "#FFFFFF" : "#102B46",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 6px 22px rgba(0, 0, 0, 0.38)",
                            position: "relative",
                            transition: "background-color 0.2s ease, color 0.2s ease",
                          }}
                        >
                          {/* Pulsing Outer Ring */}
                          <span
                            style={{
                              position: "absolute",
                              inset: "-8px",
                              borderRadius: "50%",
                              border: "1.5px solid var(--color-gold)",
                              opacity: isOpen ? 0.9 : 0.75,
                              animation: isOpen
                                ? "none"
                                : "ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite",
                            }}
                          />
                          <span
                            style={{
                              fontSize: isOpen ? "1rem" : "1.25rem",
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            {isOpen ? "✕" : "+"}
                          </span>
                        </motion.button>

                        {/* Floating Popover Card */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.92, y: isTop ? -8 : 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.92, y: isTop ? -8 : 8 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="hotspot-popover"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                position: "absolute",
                                ...(isTop
                                  ? { top: "calc(100% + 14px)" }
                                  : { bottom: "calc(100% + 14px)" }),
                                ...(isRight
                                  ? { right: "-10px", left: "auto", transform: "none" }
                                  : isLeft
                                  ? { left: "-10px", right: "auto", transform: "none" }
                                  : { left: "50%", right: "auto", transform: "translateX(-50%)" }),
                                background: "#FFFFFF",
                                borderRadius: "14px",
                                padding: "0.85rem",
                                boxShadow:
                                  "0 24px 60px rgba(0, 0, 0, 0.32), 0 4px 16px rgba(16, 43, 70, 0.08), 0 0 0 1px rgba(16, 43, 70, 0.06)",
                                width: "255px",
                                zIndex: 120,
                                pointerEvents: "auto",
                              }}
                            >
                              {/* Product Image */}
                              {product && (
                                <div
                                  style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "125px",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    backgroundColor: "#F4F1EA",
                                    marginBottom: "0.65rem",
                                  }}
                                >
                                  <Image
                                    src={product.primaryImage}
                                    alt={hs.title}
                                    fill
                                    sizes="255px"
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>
                              )}

                              {/* Category */}
                              <span
                                style={{
                                  fontSize: "0.625rem",
                                  letterSpacing: "0.14em",
                                  textTransform: "uppercase",
                                  color: "var(--color-gold)",
                                  fontWeight: 700,
                                  display: "block",
                                  marginBottom: "0.25rem",
                                }}
                              >
                                {hs.category}
                              </span>

                              {/* Title */}
                              <h4
                                style={{
                                  fontFamily: "var(--font-serif)",
                                  fontSize: "0.9375rem",
                                  fontWeight: 700,
                                  color: "#102B46",
                                  marginBottom: "0.35rem",
                                  lineHeight: 1.28,
                                }}
                              >
                                {hs.title}
                              </h4>

                              {/* Price */}
                              <div
                                suppressHydrationWarning
                                style={{
                                  fontSize: "0.8125rem",
                                  color: "#575D65",
                                  fontWeight: 600,
                                  marginBottom: "0.75rem",
                                }}
                              >
                                {formatPriceWithCurrency(hs.priceUSD, currency, product?.priceINR)}
                              </div>

                              {/* Action Buttons Row */}
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  gap: "0.5rem",
                                  width: "100%",
                                }}
                              >
                                {product && (
                                  <button
                                    onClick={() => {
                                      setActiveHotspotId(null);
                                      setHoveredHotspotId(null);
                                      onQuickView(product);
                                    }}
                                    style={{
                                      background: "#102B46",
                                      color: "#FFFFFF",
                                      border: "none",
                                      borderRadius: "4px",
                                      padding: "0.5rem 0",
                                      fontSize: "0.6875rem",
                                      fontWeight: 700,
                                      cursor: "pointer",
                                      textTransform: "uppercase",
                                      letterSpacing: "0.08em",
                                      textAlign: "center",
                                      transition: "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) =>
                                      (e.currentTarget.style.backgroundColor = "var(--color-gold)")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.currentTarget.style.backgroundColor = "#102B46")
                                    }
                                  >
                                    Quick View
                                  </button>
                                )}
                                <a
                                  href={getWhatsAppEnquiryUrl(
                                    hs.title,
                                    undefined,
                                    undefined,
                                    formatPriceWithCurrency(hs.priceUSD, currency, product?.priceINR)
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    background: "var(--color-whatsapp)",
                                    color: "#FFFFFF",
                                    textDecoration: "none",
                                    borderRadius: "4px",
                                    padding: "0.5rem 0",
                                    fontSize: "0.6875rem",
                                    fontWeight: 700,
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    display: "block",
                                    transition: "filter 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
                                  onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
                                >
                                  WhatsApp
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* Room Title & Subtitle in Bottom Left */}
                  <div
                    className="lookbook-title-wrap"
                    style={{
                      position: "absolute",
                      bottom: "2.25rem",
                      left: "2.5rem",
                      color: "#FFFFFF",
                      zIndex: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {room.subtitle}
                    </span>
                    <h3
                      className="lookbook-card-title"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
                        fontWeight: 400,
                        margin: 0,
                        textShadow: "0 2px 14px rgba(0, 0, 0, 0.6)",
                        lineHeight: 1.15,
                      }}
                    >
                      {room.title}
                    </h3>
                  </div>
                </div>
              </StackingCardItem>
            );
          })}
        </StackingCards>
      </div>
    </section>
  );
};
