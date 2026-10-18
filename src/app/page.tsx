"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { CartItem, CurrencyCode, Product, ProductFinish } from "@/types";
import { PRODUCTS } from "@/data/products";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryFilter, FilterCategory, SortOption } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { VideoShowcase } from "@/components/VideoShowcase";
import { LookbookHotspot } from "@/components/LookbookHotspot";
import { MaterialitySection } from "@/components/MaterialitySection";
import { DesignerSpotlight } from "@/components/DesignerSpotlight";
import { PressAndReviews } from "@/components/PressAndReviews";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SearchModal } from "@/components/SearchModal";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { Toast } from "@/components/Toast";
import { CategoryBanners } from "@/components/CategoryBanners";
import { BrandPillars } from "@/components/BrandPillars";
import { EditorialLivingBanner } from "@/components/EditorialLivingBanner";
import { CuratedSpaces } from "@/components/CuratedSpaces";
import { BedroomShowcase } from "@/components/BedroomShowcase";
import { DiningShowcase } from "@/components/DiningShowcase";
import { CraftsmanshipSection } from "@/components/CraftsmanshipSection";
import { JournalSection } from "@/components/JournalSection";
import { SustainableBanner } from "@/components/SustainableBanner";

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/ScrollProgress").then((mod) => mod.ScrollProgress),
  { ssr: false }
);

const ThreeProductViewer = dynamic(
  () => import("@/components/ThreeProductViewer").then((mod) => mod.ThreeProductViewer),
  {
    ssr: false,
    loading: () => (
      <section
        id="3d-studio"
        style={{
          minHeight: "780px",
          backgroundColor: "#161514",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FAF8F5",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "2px solid rgba(182, 146, 105, 0.3)",
              borderTopColor: "var(--color-brass)",
              borderRadius: "50%",
              margin: "0 auto 1rem",
              animation: "spin 1s linear infinite",
            }}
          />
          <p
            style={{
              fontSize: "0.875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#A8A298",
            }}
          >
            INITIALIZING 3D STUDIO...
          </p>
        </div>
      </section>
    ),
  }
);

export default function Home() {
  // Currency state
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  // Bag / Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // The Tired Man Lounge Chair
      finish: PRODUCTS[0].finishes[0],
      quantity: 1,
    },
    {
      product: PRODUCTS[1], // Hashira Lamp
      finish: PRODUCTS[1].finishes[0],
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[2].id]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Filter & Sort state
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Filter counts
  const counts = useMemo(() => {
    return {
      all: PRODUCTS.length,
      furniture: PRODUCTS.filter((p) => p.category === "furniture").length,
      lighting: PRODUCTS.filter((p) => p.category === "lighting").length,
      objects: PRODUCTS.filter((p) => p.category === "objects").length,
      featured: PRODUCTS.filter((p) => p.featured).length,
    };
  }, []);

  // Filtered & Sorted products
  const displayProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory === "furniture") {
      result = result.filter((p) => p.category === "furniture");
    } else if (activeCategory === "lighting") {
      result = result.filter((p) => p.category === "lighting");
    } else if (activeCategory === "objects") {
      result = result.filter((p) => p.category === "objects");
    } else if (activeCategory === "featured") {
      result = result.filter((p) => p.featured);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product, finish: ProductFinish, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.finish.id === finish.id
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, finish, quantity }];
    });
    showToast(`Added ${product.name} (${finish.name}) to shopping bag`);
  };

  // Handle adding from 3D studio viewer
  const handleAddFrom3D = (name: string, finishName: string, priceUSD: number) => {
    const plinth = PRODUCTS.find((p) => p.id === "plinth-table") || PRODUCTS[2];
    const customFinish: ProductFinish = {
      id: finishName.toLowerCase().replace(/\s+/g, "-"),
      name: finishName,
      colorHex: "#B89269",
    };
    handleAddToCart({ ...plinth, name, priceUSD }, customFinish, 1);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = quantity;
      return copy;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    const item = cartItems[index];
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    if (item) {
      showToast(`Removed ${item.product.name} from bag`);
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed ${product.name} from saved favorites`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to favorites`);
        return [...prev, product.id];
      }
    });
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product, product.finishes[0], 1);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Custom Luxury Pointer */}
      <CustomCursor />

      {/* Navigation Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {/* Editorial Parallax Hero */}
        <Hero />

        {/* 3 Editorial Discipline Banners */}
        <CategoryBanners onSelectCategory={setActiveCategory} />

        {/* Curated Collection Section */}
        <section id="collection" style={{ padding: "6.5rem 0 7rem", backgroundColor: "var(--color-canvas)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 1.5rem" }}>
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
                CURATED DESIGN ARCHIVE
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
                The Permanent <span style={{ fontStyle: "italic" }}>Collection</span>
              </h2>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                Every object is an architectural dialogue between human touch, raw organic materials, and gentle natural illumination. Hover any piece to experience 3D stereoscopic depth.
              </p>
            </div>

            {/* Filter Tabs & Sorting */}
            <CategoryFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              counts={counts}
            />

            {/* 3D Interactive Product Cards Grid */}
            <ProductGrid
              products={displayProducts}
              currency={currency}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={setQuickViewProduct}
              onAddToCart={(p, f) => {
                handleAddToCart(p, f, 1);
                setIsCartOpen(true);
              }}
            />
          </div>
        </section>

        {/* Full-Bleed Architectural Living Banner (Behance Section 3) */}
        <EditorialLivingBanner onQuickView={setQuickViewProduct} />

        {/* Curated Spaces & Room Collections (Behance Section 4) */}
        <CuratedSpaces
          currency={currency}
          onQuickView={setQuickViewProduct}
          onAddToCart={(p, f) => {
            handleAddToCart(p, f, 1);
            setIsCartOpen(true);
          }}
        />

        {/* Bedroom Atmosphere & Restorative Illumination (Behance Section 5) */}
        <BedroomShowcase
          currency={currency}
          onQuickView={setQuickViewProduct}
          onAddToCart={(p, f) => {
            handleAddToCart(p, f, 1);
            setIsCartOpen(true);
          }}
        />

        {/* Dining & Hospitality Dialogue (Behance Section 6) */}
        <DiningShowcase
          currency={currency}
          onQuickView={setQuickViewProduct}
          onAddToCart={(p, f) => {
            handleAddToCart(p, f, 1);
            setIsCartOpen(true);
          }}
        />

        {/* Real-time 3D Studio & Configurator (Three.js WebGL) */}
        <ThreeProductViewer
          currency={currency}
          onAddToCart={handleAddFrom3D}
        />

        {/* Cinematography & Brand Film Showcase */}
        <VideoShowcase />

        {/* Brand Philosophy & Danish Craftsmanship (Behance Section 7) */}
        <CraftsmanshipSection />

        {/* The Audo Journal & Editorial Stories (Behance Section 8) */}
        <JournalSection />

        {/* Sustainable by Design Architectural Banner (Behance Section 9) */}
        <SustainableBanner />

        {/* The Audo House Lookbook Hotspot Section */}
        <LookbookHotspot
          currency={currency}
          onQuickView={setQuickViewProduct}
        />

        {/* Materiality & Tactile Truth Section */}
        <MaterialitySection />

        {/* Architects & Designers Section */}
        <DesignerSpotlight />

        {/* Press Quotes & Collector Reviews */}
        <PressAndReviews />

        {/* Brand Pillars & Concierge Services */}
        <BrandPillars />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Drawers and Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        currency={currency}
        onSelectProduct={setQuickViewProduct}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={currency}
        onSelectProduct={setQuickViewProduct}
      />

      <QuickViewModal
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, f, q) => {
          handleAddToCart(p, f, q);
          setIsCartOpen(true);
        }}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Floating Micro-interaction Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
