"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CurrencyCode, Hotspot, Product } from "@/types";
import { CURRENCIES, LOOKBOOK_ROOMS, PRODUCTS } from "@/data/products";

interface LookbookHotspotProps {
  currency: CurrencyCode;
  onQuickView: (p: Product) => void;
}

export const LookbookHotspot: React.FC<LookbookHotspotProps> = ({
  currency,
  onQuickView,
}) => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const room = LOOKBOOK_ROOMS[activeRoomIndex];
  const curr = CURRENCIES[currency];

  const handleHotspotClick = (hs: Hotspot) => {
    if (activeHotspot?.id === hs.id) {
      setActiveHotspot(null);
    } else {
      setActiveHotspot(hs);
    }
  };

  const handleViewProduct = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      onQuickView(prod);
    }
  };

  return (
    <section
      id="lookbook"
      style={{
        padding: "6rem 0",
        backgroundColor: "var(--color-canvas-alt)",
        borderTop: "1px solid var(--color-card-border)",
        borderBottom: "1px solid var(--color-card-border)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--color-brass)",
              marginBottom: "0.75rem",
            }}
          >
            THE AUDO HOUSE COPENHAGEN
          </span>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 300,
              color: "var(--color-text-main)",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            Curated Spaces, <span style={{ fontStyle: "italic" }}>Living In Harmony</span>
          </h2>

          <p
            style={{
              maxWidth: "640px",
              color: "var(--color-text-secondary)",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
            }}
          >
            Explore our architectural showroom rooms in Copenhagen. Click any interactive pin in the scene to inspect the individual furniture, lighting, and ceramic pieces in context.
          </p>

          {/* Room Switcher Tabs */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginTop: "2rem",
            }}
          >
            {LOOKBOOK_ROOMS.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => {
                  setActiveRoomIndex(idx);
                  setActiveHotspot(null);
                }}
                id={`room-tab-${idx}`}
                style={{
                  background: activeRoomIndex === idx ? "var(--color-dark)" : "rgba(255, 255, 255, 0.7)",
                  color: activeRoomIndex === idx ? "var(--color-canvas)" : "var(--color-text-secondary)",
                  border: "1px solid",
                  borderColor: activeRoomIndex === idx ? "var(--color-dark)" : "rgba(28, 26, 24, 0.12)",
                  padding: "0.6rem 1.4rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
              >
                {r.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Room Canvas */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%", // 16:9 ratio
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            border: "1px solid rgba(28, 26, 24, 0.1)",
          }}
          onClick={() => setActiveHotspot(null)}
        >
          <Image
            src={room.image}
            alt={room.title}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />

          {/* Hotspot Pins */}
          {room.hotspots.map((hs) => {
            const isSelected = activeHotspot?.id === hs.id;
            return (
              <div
                key={hs.id}
                style={{
                  position: "absolute",
                  left: `${hs.xPercent}%`,
                  top: `${hs.yPercent}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleHotspotClick(hs);
                }}
              >
                <div
                  className="hotspot-pin"
                  id={`pin-${hs.id}`}
                  style={{
                    background: isSelected ? "var(--color-brass)" : "rgba(22, 21, 20, 0.9)",
                    transform: isSelected ? "scale(1.2)" : "scale(1)",
                  }}
                  title={`View ${hs.title}`}
                >
                  {isSelected ? "✕" : "+"}
                </div>

                {/* Hotspot Detail Card Popup */}
                {isSelected && (
                  <div
                    className="glass-card"
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 12px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "260px",
                      padding: "1.2rem",
                      boxShadow: "var(--shadow-md)",
                      border: "1px solid rgba(28, 26, 24, 0.12)",
                      borderRadius: "2px",
                      zIndex: 20,
                      animation: "fadeIn 0.2s ease",
                      textAlign: "left",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span
                      style={{
                        fontSize: "0.625rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--color-brass)",
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {hs.category}
                    </span>
                    <h4
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.125rem",
                        lineHeight: 1.25,
                        color: "var(--color-text-main)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {hs.title}
                    </h4>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--color-text-main)",
                        marginBottom: "0.85rem",
                      }}
                    >
                      {curr.symbol}
                      {Math.round(hs.priceUSD * curr.rate).toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleViewProduct(hs.productId)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0",
                        background: "var(--color-dark)",
                        color: "#FFFFFF",
                        border: "none",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background var(--transition-fast)",
                      }}
                    >
                      INSPECT CREATION →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Room Note */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1.5rem",
            padding: "0 0.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-text-secondary)",
          }}
        >
          <div>
            <strong style={{ color: "var(--color-text-main)", fontWeight: 600 }}>{room.subtitle}</strong> — {room.description}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--color-brass)", letterSpacing: "0.08em" }}>
            TAP PINS TO REVEAL CREATIONS
          </div>
        </div>
      </div>
    </section>
  );
};
