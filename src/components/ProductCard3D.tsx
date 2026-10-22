"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { CURRENCIES, formatPriceINR, formatPriceWithCurrency, getWhatsAppEnquiryUrl } from "@/data/products";

interface ProductCard3DProps {
  product: Product;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart?: (p: Product, finish: ProductFinish) => void;
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll parallax effect for the product image inside its container
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageParallaxY = useTransform(cardScrollProgress, [0, 1], ["-5%", "5%"]);

  // Mouse tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for buttery smooth tilt
  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Glare / light reflection position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const formattedPrice = product.priceOnEnquiry
    ? "Price on enquiry"
    : formatPriceWithCurrency(product.priceUSD, currency, product.priceINR);

  const whatsappUrl = getWhatsAppEnquiryUrl(
    product.name,
    product.configurations ? product.configurations[0] : undefined,
    selectedFinish.name,
    product.priceINR ? formatPriceINR(product.priceINR) : "Price guidance"
  );

  return (
    <div
      style={{
        perspective: "1200px",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isMounted && isHovered ? rotateX : 0,
          rotateY: isMounted && isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          background: "var(--color-card)",
          border: "1px solid var(--color-card-border)",
          borderRadius: "4px",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(16, 43, 70, 0.16), 0 0 0 1px rgba(197, 164, 93, 0.3)"
            : "var(--shadow-sm)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "100%",
          width: "100%",
        }}
        data-cursor="hover"
      >
        {/* Dynamic Specular Sheen Layer */}
        {isHovered && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 80%)`,
              pointerEvents: "none",
              zIndex: 3,
              borderRadius: "4px",
            }}
          />
        )}

        {/* Visual Canvas Container with 3D Depth */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "108%",
            flexShrink: 0,
            overflow: "hidden",
            backgroundColor: "#F2EDE4",
            transformStyle: "preserve-3d",
            cursor: "pointer",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
          onClick={() => onQuickView(product)}
        >
          {/* Scroll-driven Parallax Container */}
          <motion.div
            style={{
              position: "absolute",
              inset: "-6%",
              y: isMounted ? imageParallaxY : 0,
            }}
          >
            {/* Main Image with Smooth Scaling & 3D Depth on Hover */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transform: isHovered ? "scale(1.06) translateZ(18px)" : "scale(1) translateZ(0px)",
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image
                src={isHovered && product.hoverImage ? product.hoverImage : product.primaryImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>

          {/* Floating Tag / Warranty Badge */}
          {product.badge && (
            <span
              style={{
                position: "absolute",
                top: "1.15rem",
                left: "1.15rem",
                background: "rgba(16, 43, 70, 0.92)",
                backdropFilter: "blur(6px)",
                color: "#FFFFFF",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "0.35rem 0.75rem",
                fontWeight: 600,
                transform: "translateZ(35px)",
                zIndex: 4,
                borderRadius: "2px",
                border: "1px solid rgba(197, 164, 93, 0.35)",
              }}
            >
              {product.badge}
            </span>
          )}

          {/* Wishlist Shortlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            aria-label={isWishlisted ? "Remove from shortlist" : "Save to shortlist"}
            style={{
              position: "absolute",
              top: "1.15rem",
              right: "1.15rem",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(6px)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transform: "translateZ(35px)",
              zIndex: 4,
              transition: "transform 0.2s ease",
              boxShadow: "0 4px 12px rgba(16, 43, 70, 0.12)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "var(--color-gold)" : "none"}
              stroke={isWishlisted ? "var(--color-gold)" : "var(--color-navy)"}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          {/* Hover Actions Bar Floating in 3D */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              right: "1rem",
              display: "flex",
              gap: "0.5rem",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateZ(45px) translateY(0)" : "translateZ(0px) translateY(10px)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 4,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(8px)",
                color: "var(--color-navy)",
                border: "1px solid rgba(16, 43, 70, 0.15)",
                padding: "0.68rem 0",
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer",
                borderRadius: "3px",
              }}
            >
              VIEW DETAILS
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-whatsapp"
              style={{
                flex: 1.3,
                padding: "0.68rem 0",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
                borderRadius: "3px",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>

        {/* Product Meta Section */}
        <div
          style={{
            padding: "1.35rem 1.4rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            justifyContent: "space-between",
            transform: "translateZ(20px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Category Eyebrow & Warranty Tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.6875rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                fontWeight: 600,
                marginBottom: "0.45rem",
                minHeight: "1.1rem",
              }}
            >
              <span>{product.category.toUpperCase()} · KURNOOL</span>
              {product.warranty && (
                <span style={{ color: "var(--color-text-secondary)", fontSize: "0.6875rem" }}>
                  15-YR WARRANTY
                </span>
              )}
            </div>

            {/* Product Title - Fixed 2-line height for uniform alignment */}
            <h3
              onClick={() => onQuickView(product)}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.45rem",
                lineHeight: 1.25,
                fontWeight: 500,
                color: "var(--color-navy)",
                marginBottom: "0.4rem",
                cursor: "pointer",
                height: "3.65rem",
                minHeight: "3.65rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.name}
            </h3>

            {/* Short Subtitle - Fixed 2-line height for uniform alignment */}
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
                marginBottom: "0.95rem",
                height: "2.65rem",
                minHeight: "2.65rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                fontWeight: 300,
              }}
            >
              {product.subtitle}
            </p>

            {/* Finish Swatches - Fixed height for uniform alignment */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.1rem",
                height: "1.65rem",
                minHeight: "1.65rem",
              }}
            >
              {product.finishes.map((f) => {
                const isSelected = selectedFinish.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinish(f)}
                    title={f.name}
                    aria-label={`Select finish ${f.name}`}
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      backgroundColor: f.colorHex,
                      border: isSelected ? "2px solid var(--color-navy)" : "1px solid rgba(0,0,0,0.18)",
                      padding: 0,
                      cursor: "pointer",
                      outline: isSelected ? "2px solid #FFFFFF" : "none",
                      outlineOffset: "-2px",
                      transition: "transform 0.2s ease",
                      transform: isSelected ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                );
              })}
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                  marginLeft: "0.3rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {selectedFinish.name}
              </span>
            </div>
          </div>

          <div style={{ marginTop: "auto" }}>
            {/* Price & Rating Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.85rem",
                borderTop: "1px solid rgba(16, 43, 70, 0.08)",
                height: "2.5rem",
                minHeight: "2.5rem",
              }}
            >
              <div
                suppressHydrationWarning
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--color-navy)",
                  letterSpacing: "0.01em",
                }}
              >
                {formattedPrice}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                <span style={{ color: "var(--color-gold)" }}>★</span>
                <span style={{ fontWeight: 600 }}>{product.rating.toFixed(1)}</span>
                <span style={{ color: "var(--color-text-muted)" }}>({product.reviewCount})</span>
              </div>
            </div>

            {/* Direct Mobile/Quick WhatsApp Link */}
            <div style={{ marginTop: "0.85rem" }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{
                  width: "100%",
                  padding: "0.68rem 1rem",
                  fontSize: "0.8125rem",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>ENQUIRE ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};
