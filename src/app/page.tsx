"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CartItem, CurrencyCode, Product, ProductFinish } from "@/types";
import { PRODUCTS } from "@/data/products";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AudoProductStage } from "@/components/AudoProductStage";
import { AtmosphereShowcase } from "@/components/AtmosphereShowcase";
import { LookbookHotspot } from "@/components/LookbookHotspot";
import { CategoryFilter, FilterCategory, SortOption } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { StoryCards } from "@/components/StoryCards";
import { PopularCategories } from "@/components/PopularCategories";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SearchModal } from "@/components/SearchModal";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { Toast } from "@/components/Toast";
import { CategoryBanners } from "@/components/CategoryBanners";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/ScrollProgress").then((mod) => mod.ScrollProgress),
  { ssr: false }
);




export default function Home() {
  // Currency state - default to INR for Kurnool
  const [currency, setCurrency] = useState<CurrencyCode>("INR");

  // Shortlist / Bag state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      finish: PRODUCTS[0].finishes[0],
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id]);
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

  // Curated 9 products for the 3x3 homepage catalogue grid (removing the incomplete 4th row)
  const HOMEPAGE_PRODUCTS = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.id !== "serenity-tufted-king-bed" && p.id !== "elysian-grand-living-suite"
    );
  }, []);

  // Filter counts
  const counts = useMemo(() => {
    return {
      all: HOMEPAGE_PRODUCTS.length,
      sofas: HOMEPAGE_PRODUCTS.filter((p) => p.category === "sofas").length,
      recliners: HOMEPAGE_PRODUCTS.filter((p) => p.category === "recliners").length,
      beds: HOMEPAGE_PRODUCTS.filter((p) => p.category === "beds").length,
      dining: HOMEPAGE_PRODUCTS.filter((p) => p.category === "dining").length,
      curtains: HOMEPAGE_PRODUCTS.filter((p) => p.category === "curtains").length,
      featured: HOMEPAGE_PRODUCTS.filter((p) => p.featured).length,
    };
  }, [HOMEPAGE_PRODUCTS]);

  // Filtered & Sorted products
  const displayProducts = useMemo(() => {
    let result = [...HOMEPAGE_PRODUCTS];

    if (activeCategory === "sofas") {
      result = result.filter((p) => p.category === "sofas");
    } else if (activeCategory === "recliners") {
      result = result.filter((p) => p.category === "recliners");
    } else if (activeCategory === "beds") {
      result = result.filter((p) => p.category === "beds");
    } else if (activeCategory === "dining") {
      result = result.filter((p) => p.category === "dining");
    } else if (activeCategory === "curtains") {
      result = result.filter((p) => p.category === "curtains");
    } else if (activeCategory === "featured") {
      result = result.filter((p) => p.featured);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => (a.priceINR || a.priceUSD * 83.5) - (b.priceINR || b.priceUSD * 83.5));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (b.priceINR || b.priceUSD * 83.5) - (a.priceINR || a.priceUSD * 83.5));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [HOMEPAGE_PRODUCTS, activeCategory, sortBy]);

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
    showToast(`Added ${product.name} to enquiry list`);
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
      showToast(`Removed ${item.product.name} from list`);
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
        showToast(`Removed ${product.name} from shortlisted favourites`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Shortlisted ${product.name} to favourites`);
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

      {/* Luxury Custom Pointer */}
      <CustomCursor />

      {/* 1. Navigation Header (Solid Navy #102B46 + Gold Badge & Wordmark) */}
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
        {/* 1. Hero with Cinematic Preserved Video & 3D Scroll-Linked Scaling */}
        <Hero />

        {/* Popular Categories (circles) */}
        <PopularCategories />

        {/* 2. Signature 3-Column AUDO Product Stage */}
        <AudoProductStage
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
          onAddToCart={(p, f) => {
            handleAddToCart(p, f, 1);
            setIsCartOpen(true);
          }}
        />

        {/* 4. Full-Bleed Atmosphere Showcases (01 Living, 02 Bedroom, 03 Dining with Floating 3D Cards) */}
        <AtmosphereShowcase
          currency={currency}
          onQuickView={setQuickViewProduct}
          onAddToCart={(p, f) => {
            handleAddToCart(p, f, 1);
            setIsCartOpen(true);
          }}
        >
          {/* 5. Inspiration drag carousel sits between the two banner pairs */}
          <LookbookHotspot
            currency={currency}
            onQuickView={setQuickViewProduct}
          />
        </AtmosphereShowcase>


        {/* 7. Shop by Category / 3 Editorial Discipline Banners */}
        <CategoryBanners onSelectCategory={setActiveCategory} />

        {/* 8. Catalogue with filters */}
        <section id="collection" className="catalogue-section">
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              className="catalogue-head"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>Complete Catalogue</h2>
              <p>
                Designed for Comfort. Chosen for Your Home. Discover selected designs, colours and finishes for different spaces and lifestyles.
              </p>
            </motion.div>

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

        <StoryCards />
      </main>

      {/* Luxury Footer with Contact, Showroom Timings & Local Kurnool SEO */}
      <Footer />

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsApp />

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

      {/* Product Detail Page / Quick View Modal */}
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
