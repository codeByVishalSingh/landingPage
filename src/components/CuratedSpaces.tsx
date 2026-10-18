"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { CURRENCIES, PRODUCTS } from "@/data/products";

interface CuratedSpacesProps {
  currency: CurrencyCode;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, f: ProductFinish) => void;
}

interface RoomConfig {
  id: string;
  name: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  products: Product[];
  pins: { x: number; y: number; productId: string; label: string }[];
}

export const CuratedSpaces: React.FC<CuratedSpacesProps> = ({
  currency,
  onQuickView,
  onAddToCart,
}) => {
  const curr = CURRENCIES[currency];

  const rooms: RoomConfig[] = [
    {
      id: "living",
      name: "Living Room",
      number: "01",
      title: "The Sculptural Lounge",
      subtitle: "Soft Minimalism & Architectural Volumes",
      description:
        "Low-slung proportions and generous tactile bouclé contours designed for contemplative stillness. Raw timber roof beams frame natural sunlight against matte plaster walls.",
      image: "/images/banner-living.jpg",
      products: [
        PRODUCTS.find((p) => p.id === "eave-modular-sofa") || PRODUCTS[0],
        PRODUCTS.find((p) => p.id === "plinth-table") || PRODUCTS[2],
        PRODUCTS.find((p) => p.id === "tired-man-lounge") || PRODUCTS[0],
      ],
      pins: [
        { x: 50, y: 70, productId: "eave-modular-sofa", label: "Eave Modular Sofa" },
        { x: 55, y: 88, productId: "plinth-table", label: "Plinth Low Table" },
        { x: 19, y: 72, productId: "tired-man-lounge", label: "The Tired Man Chair" },
      ],
    },
    {
      id: "dining",
      name: "Dining & Hospitality",
      number: "02",
      title: "The Dining Dialogue",
      subtitle: "Smoked Oak & Tactile Gastronomy",
      description:
        "Centering human interaction around deep smoked European oak, sculptural leather seating, and the warm atmospheric diffusion of brushed brass pendants.",
      image: "/images/dining-space.jpg",
      products: [
        PRODUCTS.find((p) => p.id === "androgyne-dining-table") || PRODUCTS[2],
        PRODUCTS.find((p) => p.id === "echasse-vase") || PRODUCTS[3],
        PRODUCTS.find((p) => p.id === "hashira-lamp") || PRODUCTS[1],
      ],
      pins: [
        { x: 58, y: 68, productId: "androgyne-dining-table", label: "Snaregade Dining Table" },
        { x: 59, y: 25, productId: "hashira-lamp", label: "Cast Brass Pendant" },
        { x: 60, y: 56, productId: "echasse-vase", label: "Mouth-Blown Carafe" },
      ],
    },
    {
      id: "bedroom",
      name: "Bedroom Sanctuary",
      number: "03",
      title: "The Restorative Retreat",
      subtitle: "Unbleached Linen & Washi Illumination",
      description:
        "Designed to decelerate sensory overload. Low solid oak platform framing, washed Belgian linen, and gentle ambient lantern illumination evoke timeless Danish hygge.",
      image: "/images/bedroom-space.jpg",
      products: [
        PRODUCTS.find((p) => p.id === "hashira-lamp") || PRODUCTS[1],
        PRODUCTS.find((p) => p.id === "plinth-table") || PRODUCTS[2],
        PRODUCTS.find((p) => p.id === "echasse-vase") || PRODUCTS[3],
      ],
      pins: [
        { x: 21, y: 35, productId: "hashira-lamp", label: "Hashira Lantern" },
        { x: 54, y: 68, productId: "plinth-table", label: "Oak Platform Bed" },
        { x: 21, y: 66, productId: "echasse-vase", label: "Passage Bedside Table" },
      ],
    },
    {
      id: "hotel",
      name: "The Audo Suite",
      number: "04",
      title: "Nordhavn Concept Residence",
      subtitle: "Curated Boutique Living by Norm Architects",
      description:
        "A hybrid residence where every single element—from the honed travertine door lintels to the bespoke bedside pendants—can be acquired by visiting collectors.",
      image: "/images/lookbook.jpg",
      products: [
        PRODUCTS.find((p) => p.id === "tired-man-lounge") || PRODUCTS[0],
        PRODUCTS.find((p) => p.id === "plinth-table") || PRODUCTS[2],
        PRODUCTS.find((p) => p.id === "hashira-lamp") || PRODUCTS[1],
      ],
      pins: [
        { x: 50, y: 65, productId: "plinth-table", label: "Plinth Dining Table" },
        { x: 30, y: 55, productId: "tired-man-lounge", label: "Harbour Dining Chair" },
        { x: 80, y: 40, productId: "hashira-lamp", label: "Hashira Chandelier" },
      ],
    },
  ];

  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activePin, setActivePin] = useState<string | null>(null);

  const currentRoom = rooms[activeRoomIndex];

  return (
    <section
      id="spaces"
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
            gap: "2rem",
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
              CURATED SPACES • SHOP BY ROOM
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 300,
                color: "var(--color-text-main)",
                lineHeight: 1.15,
              }}
            >
              Living by <span style={{ fontStyle: "italic" }}>Spatial Atmosphere</span>
            </h2>
          </div>

          {/* Room Navigation Tabs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              background: "#EBE7DF",
              padding: "0.35rem",
              borderRadius: "999px",
            }}
          >
            {rooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoomIndex(idx);
                  setActivePin(null);
                }}
                style={{
                  background: activeRoomIndex === idx ? "#FFFFFF" : "transparent",
                  color: activeRoomIndex === idx ? "var(--color-text-main)" : "var(--color-text-secondary)",
                  border: "none",
                  borderRadius: "999px",
                  padding: "0.55rem 1.15rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                  boxShadow: activeRoomIndex === idx ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                }}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>

        {/* Room Showcase Layout (Asymmetric 60/40 Magazine Grid) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "2.5rem",
            alignItems: "stretch",
          }}
          className="spaces-grid"
        >
          {/* LEFT: Architectural Lifestyle Photo with Interactive Hotspots */}
          <div
            style={{
              position: "relative",
              minHeight: "560px",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              border: "1px solid var(--color-card-border)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoom.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={currentRoom.image}
                  alt={currentRoom.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(22, 21, 20, 0.1) 0%, rgba(22, 21, 20, 0.45) 100%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Pulsing Hotspot Pins on Room Image */}
            {currentRoom.pins.map((pin, i) => {
              const matchedProd = PRODUCTS.find((p) => p.id === pin.productId) || PRODUCTS[0];
              const isHovered = activePin === pin.productId;

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: `${pin.y}%`,
                    left: `${pin.x}%`,
                    zIndex: 15,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <button
                    onClick={() => setActivePin(isHovered ? null : pin.productId)}
                    onMouseEnter={() => setActivePin(pin.productId)}
                    aria-label={`View ${pin.label}`}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: isHovered ? "var(--color-brass)" : "rgba(255, 255, 255, 0.95)",
                      border: "2px solid #FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                      transition: "transform 0.2s ease, background 0.2s ease",
                      transform: isHovered ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: isHovered ? "#FFFFFF" : "#161514",
                      }}
                    />
                  </button>

                  {/* Hotspot Hover Card */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 12px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(22, 21, 20, 0.95)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "4px",
                        padding: "0.85rem 1rem",
                        width: "220px",
                        color: "#FAF8F5",
                        zIndex: 30,
                        boxShadow: "0 14px 30px rgba(0, 0, 0, 0.35)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.625rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--color-brass)",
                          fontWeight: 600,
                          marginBottom: "0.2rem",
                        }}
                      >
                        FEATURED PIECE
                      </div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.2rem" }}>
                        {matchedProd.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#A8A298", marginBottom: "0.6rem" }}>
                        {curr.symbol}
                        {Math.round(matchedProd.priceUSD * curr.rate).toLocaleString()} {currency}
                      </div>
                      <button
                        onClick={() => onQuickView(matchedProd)}
                        style={{
                          width: "100%",
                          padding: "0.45rem",
                          background: "#FAF8F5",
                          color: "#161514",
                          border: "none",
                          borderRadius: "2px",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.08em",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          cursor: "pointer",
                        }}
                      >
                        Quick View
                      </button>
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Room Story Badge at Bottom */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                right: "1.5rem",
                background: "rgba(255, 255, 255, 0.88)",
                backdropFilter: "blur(12px)",
                padding: "1.25rem 1.5rem",
                borderRadius: "3px",
                border: "1px solid rgba(28, 26, 24, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <div style={{ fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-brass)", fontWeight: 600 }}>
                  SPACE {currentRoom.number}
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-text-main)", fontWeight: 500 }}>
                  {currentRoom.title}
                </div>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", maxWidth: "340px", lineHeight: 1.5 }}>
                {currentRoom.description}
              </div>
            </div>
          </div>

          {/* RIGHT: Stacked Companion Product Cards for this Room */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--color-card-border)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Featured In This Atmosphere</span>
              <span>{currentRoom.products.length} Pieces</span>
            </div>

            {currentRoom.products.map((prod) => {
              const convertedPrice = Math.round(prod.priceUSD * curr.rate);
              const selectedFinish = prod.finishes[0];

              return (
                <div
                  key={prod.id}
                  style={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-card-border)",
                    borderRadius: "3px",
                    padding: "1rem",
                    display: "grid",
                    gridTemplateColumns: "100px 1fr",
                    gap: "1.25rem",
                    alignItems: "center",
                    boxShadow: "var(--shadow-sm)",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-brass)";
                    e.currentTarget.style.boxShadow = "var(--shadow-card)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-card-border)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                      background: "#F6F3EE",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={prod.primaryImage}
                      alt={prod.name}
                      fill
                      sizes="100px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Info and Actions */}
                  <div>
                    <div
                      style={{
                        fontSize: "0.625rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                        fontWeight: 600,
                        marginBottom: "0.2rem",
                      }}
                    >
                      {prod.designer} • {prod.year}
                    </div>

                    <h4
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--color-text-main)",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {prod.name}
                    </h4>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-main)" }}>
                        {curr.symbol}
                        {convertedPrice.toLocaleString()} {currency}
                      </span>
                      <span style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>
                        {selectedFinish.name}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "0.6rem" }}>
                      <button
                        onClick={() => onAddToCart(prod, selectedFinish)}
                        style={{
                          padding: "0.45rem 0.95rem",
                          background: "var(--color-dark)",
                          color: "#FAF8F5",
                          border: "none",
                          borderRadius: "999px",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-brass)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-dark)")}
                      >
                        Add to Bag
                      </button>

                      <button
                        onClick={() => onQuickView(prod)}
                        style={{
                          padding: "0.45rem 0.85rem",
                          background: "transparent",
                          color: "var(--color-text-main)",
                          border: "1px solid var(--color-card-border)",
                          borderRadius: "999px",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          cursor: "pointer",
                          transition: "border-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-text-main)")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-card-border)")}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .spaces-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
