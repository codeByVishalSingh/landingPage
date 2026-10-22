"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FilterCategory } from "./CategoryFilter";

interface CategoryBannersProps {
  onSelectCategory: (cat: FilterCategory) => void;
}

interface BannerItem {
  id: string;
  category: FilterCategory;
  number: string;
  title: string;
  tag: string;
  image: string;
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// First item is the large feature tile; the other four fill the 2x2 grid beside it.
const banners: BannerItem[] = [
  { id: "sofas", category: "sofas", number: "01", title: "Curved & Modular Sofas", tag: "24 Designs", image: "/images/mf-curved-modular-sofa.jpg" },
  { id: "dining", category: "dining", number: "02", title: "Italian Marble & Teak Dining", tag: "18 Suites", image: "/images/mf-marble-dual-living.jpg" },
  { id: "beds", category: "beds", number: "03", title: "Heirloom Teakwood Suites", tag: "28 Designs", image: "/images/796767853_18093958568640692_8492671734547745348_n.webp" },
  { id: "recliners", category: "recliners", number: "04", title: "Motorized Recliners", tag: "16 Models", image: "/images/catalogue-recliner-featured.jpg" },
  { id: "curtains", category: "curtains", number: "05", title: "Curtains & Blinds", tag: "12 Styles", image: "/images/banner-living.jpg" },
];

// One tile: the photo is uncovered from the bottom up as it scrolls in and
// drifts gently while in view; the label button rises in underneath.
const CategoryCard: React.FC<{
  item: BannerItem;
  index: number;
  feature?: boolean;
  onClick: (cat: FilterCategory) => void;
}> = ({ item, index, feature, onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  // The outer button is never clipped, so it can be observed; the inner layer is revealed.
  const shown = useInView(ref, { once: true, amount: 0.25 });
  const delay = index * 0.1;

  return (
    <button
      ref={ref}
      type="button"
      className={`cat-tile${feature ? " is-feature" : ""}`}
      onClick={() => onClick(item.category)}
    >
      <span className="cat-card">
        <motion.span
          className="cat-card__reveal"
          initial={false}
          animate={{ clipPath: shown ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          transition={{ duration: 1.1, delay, ease: EASE }}
        >
          <motion.span className="cat-card__img" style={{ y: imageY }}>
            <motion.span
              style={{ position: "absolute", inset: 0 }}
              initial={false}
              animate={{ scale: shown ? 1 : 1.18 }}
              transition={{ duration: 1.6, delay, ease: EASE }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes={feature ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 50vw, 25vw"}
                style={{ objectFit: "cover" }}
              />
            </motion.span>
          </motion.span>
        </motion.span>
        <span className="cat-card__count">
          {item.tag}
        </span>
      </span>

      <motion.span
        className="cat-label"
        initial={false}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.8, delay: 0.4 + delay, ease: EASE }}
      >
        {item.title} <span aria-hidden="true">→</span>
      </motion.span>
    </button>
  );
};

export const CategoryBanners: React.FC<CategoryBannersProps> = ({ onSelectCategory }) => {
  const handleClick = (cat: FilterCategory) => {
    onSelectCategory(cat);
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="disciplines" className="cat-section">
      <motion.div
        className="cat-head"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div>
          <h2 className="cat-heading">Shop by Category</h2>
          <p className="cat-sub">Explore our collections for every room in your home.</p>
        </div>
        <a href="#collection" className="cat-all">
          Explore Collection <span aria-hidden="true">→</span>
        </a>
      </motion.div>

      <div className="cat-grid">
        {banners.map((b, i) => (
          <CategoryCard key={b.id} item={b} index={i} feature={i === 0} onClick={handleClick} />
        ))}
      </div>
    </section>
  );
};
