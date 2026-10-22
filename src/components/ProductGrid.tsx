"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { ProductCard3D } from "./ProductCard3D";

interface ProductGridProps {
  products: Product[];
  currency: CurrencyCode;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart?: (p: Product, finish: ProductFinish) => void;
  showShopAll?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  showShopAll = true,
}) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setIsMobile(window.innerWidth <= 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Re-key on the product set so every filter / sort change resets index and replays entrance.
  const setKey = products.map((p) => p.id).join("|");

  useEffect(() => {
    setIndex(0);
  }, [setKey]);

  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "5rem 1rem",
          background: "var(--color-card)",
          border: "1px solid var(--color-card-border)",
        }}
      >
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          No creations found in this selection.
        </p>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
          Try clearing your filter or selecting another category above.
        </p>
      </div>
    );
  }

  const maxIndex = Math.max(0, products.length - 1);
  const clamped = Math.min(index, maxIndex);

  // Swipe support matching AudoProductStage
  const swipeStart = useRef<number | null>(null);
  const onSwipeStart = (e: React.PointerEvent) => {
    swipeStart.current = e.clientX;
  };
  const onSwipeEnd = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) < 35) return;
    if (dx < 0) {
      setIndex((prev) => Math.min(maxIndex, prev + 1));
    } else {
      setIndex((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="full-bleed">
      {mounted && isMobile ? (
        /* Mobile slider identical in interaction and progress to top section AudoProductStage */
        <div style={{ position: "relative", zIndex: 2, width: "100%", background: "#FFFFFF" }}>
          {/* Sliding track */}
          <div
            style={{ overflow: "hidden", touchAction: "pan-y", width: "100%", position: "relative" }}
            onPointerDown={onSwipeStart}
            onPointerUp={onSwipeEnd}
            onPointerCancel={() => (swipeStart.current = null)}
          >
            <motion.div
              key={setKey}
              className="catalogue-mobile-track"
              initial={false}
              animate={{ x: `-${clamped * 100}%` }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    width: "100%",
                    minWidth: "100%",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ProductCard3D
                    product={product}
                    currency={currency}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile progress indicator and arrow controls matching top section */}
          <div
            className="catalogue-mobile-controls"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.1rem 1.25rem 0.75rem",
              background: "#FFFFFF",
              borderBottom: "1px solid #ECEAE5",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1, marginRight: "1rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  color: "#555555",
                  whiteSpace: "nowrap",
                }}
              >
                {String(clamped + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
              </span>
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  height: "2px",
                  background: "#E4E4E4",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    background: "#111111",
                  }}
                  animate={{ width: `${((clamped + 1) / products.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
                disabled={clamped === 0}
                aria-label="Previous product"
                className="audo-arrow"
                style={{ width: "34px", height: "34px" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIndex((prev) => Math.min(maxIndex, prev + 1))}
                disabled={clamped >= maxIndex}
                aria-label="Next product"
                className="audo-arrow audo-arrow--next"
                style={{ width: "34px", height: "34px" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop / Tablet 3-column / 2-column luxury grid */
        <div
          id="product-grid"
          className="catalogue-3col-grid"
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          {products.map((product, i) => (
            <motion.div
              key={`${setKey}-${product.id}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: Math.min(i, 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <ProductCard3D
                product={product}
                currency={currency}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            </motion.div>
          ))}
        </div>
      )}

      {showShopAll && (
        <Link href="/furniture" className="shop-all-link">
          Shop All <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
};

