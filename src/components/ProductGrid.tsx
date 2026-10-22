"use client";

import React from "react";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      id="product-grid"
      className="catalogue-3col-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "2.5rem 2rem",
        alignItems: "stretch",
        position: "relative",
        zIndex: 2,
      }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
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
    </motion.div>
  );
};

