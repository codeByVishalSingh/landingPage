"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CurrencyCode, Product } from "@/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Toast } from "@/components/Toast";
import { ProductCard3D } from "@/components/ProductCard3D";
import { PRODUCTS, SHOWROOM_INFO, formatPriceWithCurrency, getProductPDPWhatsAppUrl } from "@/data/products";

export interface CategoryTile {
  title: string;
  countText: string;
  image: string;
  tag?: string;
}

export interface CategoryLandingProps {
  categorySlug: string;
  categoryName: string;
  heading: string;
  subheading: string;
  introduction: string;
  filterCategoryKey?: string;
  categoryTiles: CategoryTile[];
  seoFaqs?: { question: string; answer: string }[];
}

export const CategoryLandingTemplate: React.FC<CategoryLandingProps> = ({
  categorySlug,
  categoryName,
  heading,
  subheading,
  introduction,
  filterCategoryKey,
  categoryTiles,
  seoFaqs,
}) => {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[0].id]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter states
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("featured");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const categoryProducts = useMemo(() => {
    let prods = PRODUCTS;
    if (filterCategoryKey) {
      prods = prods.filter((p) => p.category === filterCategoryKey);
    }

    if (selectedStyle !== "all") {
      prods = prods.filter((p) => p.details.some((d) => d.toLowerCase().includes(selectedStyle.toLowerCase())));
    }

    if (selectedSort === "price-asc") {
      prods = [...prods].sort((a, b) => (a.priceINR || a.priceUSD * 83.5) - (b.priceINR || b.priceUSD * 83.5));
    } else if (selectedSort === "price-desc") {
      prods = [...prods].sort((a, b) => (b.priceINR || b.priceUSD * 83.5) - (a.priceINR || a.priceUSD * 83.5));
    } else if (selectedSort === "rating") {
      prods = [...prods].sort((a, b) => b.rating - a.rating);
    }

    return prods;
  }, [filterCategoryKey, selectedStyle, selectedSort]);

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed ${product.name} from shortlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Added ${product.name} to shortlist`);
        return [...prev, product.id];
      }
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--color-canvas)" }}>
      {/* Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={0}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {/* Breadcrumb & Hero */}
        <section
          style={{
            padding: "6.5rem 0 3rem",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid rgba(16, 43, 70, 0.08)",
          }}
        >
          <div className="container">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs tracking-wider uppercase mb-7 text-charcoal/80"
            >
              <Link href="/" className="text-navy font-semibold hover:text-gold transition-colors no-underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-gold font-bold">{categoryName}</span>
            </nav>

            {/* Title & Introduction */}
            <div className="max-w-4xl">
              <span className="block text-xs font-bold uppercase tracking-widest text-gold mb-3">
                {subheading}
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
                }}
                className="font-light text-navy leading-tight mb-5"
              >
                {heading}
              </h1>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light mb-7 max-w-3xl">
                {introduction}
              </p>

              {/* Showroom CTA strip */}
              <div className="inline-flex items-center gap-4 flex-wrap p-3.5 sm:px-5 bg-navy/5 border border-gold/30 rounded">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-navy font-semibold">
                  <span className="text-gold">📍</span>
                  <span>On live display in our 15,000 sq. ft. Kurnool Showroom (Bellary Road)</span>
                </div>
                <a
                  href={`https://wa.me/${SHOWROOM_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Casablanca Sofas Kurnool, I am browsing your ${categoryName} catalogue. Please share models on display and current offers.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp py-1.5 px-3.5 text-xs font-semibold tracking-wider rounded"
                >
                  ENQUIRE ON WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Category Sub-Tiles (e.g. 3-seater, 2-seater, sectional, L-shaped) */}
        {categoryTiles.length > 0 && (
          <section className="py-12 bg-ivory border-b border-navy/10">
            <div className="container">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                {categoryTiles.map((tile, i) => (
                  <div
                    key={i}
                    className="group relative rounded-md overflow-hidden bg-white border border-navy/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative w-full h-32 overflow-hidden">
                      <Image
                        src={tile.image}
                        alt={tile.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/10" />
                      {tile.tag && (
                        <span className="absolute top-2 left-2 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          {tile.tag}
                        </span>
                      )}
                    </div>
                    <div className="p-3.5">
                      <h3
                        style={{ fontFamily: "var(--font-serif)" }}
                        className="text-base text-navy leading-tight mb-1"
                      >
                        {tile.title}
                      </h3>
                      <span className="text-xs text-charcoal/70">
                        {tile.countText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Filters and Product Grid */}
        <section style={{ padding: "4rem 0 6rem" }}>
          <div className="container">
            {/* Filter Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#FFFFFF",
                borderRadius: "6px",
                border: "1px solid rgba(16, 43, 70, 0.08)",
                marginBottom: "2.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-navy)", fontWeight: 700 }}>
                  FILTERS:
                </span>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  style={{
                    padding: "0.45rem 0.85rem",
                    border: "1px solid rgba(16, 43, 70, 0.15)",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    color: "var(--color-navy)",
                    outline: "none",
                  }}
                >
                  <option value="all">All Styles</option>
                  <option value="teakwood">Burma Teakwood</option>
                  <option value="bouclé">Bouclé & Velvet</option>
                  <option value="motorized">Motorized / Recliner</option>
                </select>
                <span suppressHydrationWarning style={{ fontSize: "0.75rem", color: "var(--color-charcoal)", opacity: 0.7 }}>
                  Showing {categoryProducts.length} verified showroom designs
                </span>
              </div>

              {/* Sort Selector */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: "var(--color-charcoal)", fontWeight: 600 }}>
                  SORT:
                </span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  style={{
                    padding: "0.45rem 0.85rem",
                    border: "1px solid rgba(16, 43, 70, 0.15)",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    color: "var(--color-navy)",
                    fontWeight: 600,
                    outline: "none",
                  }}
                >
                  <option value="featured">Featured in Kurnool Showroom</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="full-bleed">
            <div className="catalogue-3col-grid">
              {categoryProducts.map((product) => (
                <ProductCard3D
                  key={product.id}
                  product={product}
                  currency={currency}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={setQuickViewProduct}
                  onAddToCart={() => {
                    setQuickViewProduct(product);
                  }}
                />
              ))}
            </div>
            </div>

            {/* Local FAQs & Showroom Help for Kurnool Local SEO */}
            {seoFaqs && seoFaqs.length > 0 && (
              <div
                style={{
                  marginTop: "5rem",
                  padding: "3rem",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  border: "1px solid rgba(16, 43, 70, 0.08)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--color-gold)",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  FREQUENTLY ASKED QUESTIONS · KURNOOL SHOWROOM
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.85rem",
                    color: "var(--color-navy)",
                    fontWeight: 400,
                    marginBottom: "2rem",
                  }}
                >
                  Questions about buying {categoryName} in Kurnool?
                </h2>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                  {seoFaqs.map((faq, idx) => (
                    <div key={idx} style={{ borderBottom: "1px solid rgba(16, 43, 70, 0.08)", paddingBottom: "1.25rem" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.15rem",
                          color: "var(--color-navy)",
                          fontWeight: 500,
                          marginBottom: "0.5rem",
                        }}
                      >
                        {faq.question}
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Modals & Drawers */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        currency={currency}
        onSelectProduct={setQuickViewProduct}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToCart={() => {}}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={currency}
        onSelectProduct={setQuickViewProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={[]}
        currency={currency}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onClearCart={() => {}}
      />

      <QuickViewModal
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={() => {}}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <Toast message={toastMessage} />
    </div>
  );
};
