"use client";

import React from "react";
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
  onAddToCart: (p: Product, finish: ProductFinish) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
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

  // Re-key on the product set so every filter / sort change replays the entrance.
  const setKey = products.map((p) => p.id).join("|");

  return (
    <div className="full-bleed">
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
    <Link href="/furniture" className="shop-all-link">
      Shop All <span aria-hidden="true">→</span>
    </Link>
    </div>
  );
};

