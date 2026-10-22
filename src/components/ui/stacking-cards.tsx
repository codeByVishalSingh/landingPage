"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, MotionValue } from "framer-motion";

interface StackingCardsContextValue {
  scrollYProgress: MotionValue<number>;
  activeCardIndex: number;
  totalCards: number;
  scrollToCard: (index: number) => void;
}

const StackingCardsContext = createContext<StackingCardsContextValue | null>(null);

export interface StackingCardsProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  totalCards?: number;
  roomNames?: string[];
  showPills?: boolean;
}

export interface StackingCardItemProps {
  index: number;
  total?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  topOffset?: number;
  stackSpacing?: number;
  distance?: string;
}

export const StackingCards: React.FC<StackingCardsProps> = ({
  children,
  className = "",
  style,
  totalCards = 3,
  roomNames = ["01 Living", "02 Bedroom", "03 Dining"],
  showPills = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = totalCards || React.Children.count(children) || 3;
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // Track overall scroll through the entire stacking sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Strict Sequential Stacking Sequence:
  // Card 0 (Base Living): 0.00 -> 0.28
  // Card 1 (Bedroom): enters at 0.28, settled and stacked on Card 0 during [0.28, 0.62]
  // Card 2 (Dining - 3rd image): ONLY enters at 0.62 AFTER Cards 0 & 1 have stacked properly!
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.28) {
      if (activeCardIndex !== 0) setActiveCardIndex(0);
    } else if (latest < 0.62) {
      if (activeCardIndex !== 1) setActiveCardIndex(1);
    } else {
      if (activeCardIndex !== 2) setActiveCardIndex(2);
    }
  });

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = index === 0 ? 0.04 : index === 1 ? 0.45 : 0.82;
    window.scrollTo({
      top: scrollTop + scrollHeight * targetProgress,
      behavior: "smooth",
    });
  };

  return (
    <StackingCardsContext.Provider
      value={{
        scrollYProgress,
        activeCardIndex,
        totalCards: count,
        scrollToCard,
      }}
    >
      <div
        ref={containerRef}
        className={`stacking-cards-container ${className}`}
        style={{
          position: "relative",
          width: "100%",
          // Generous scroll track: gives each card ample, unhurried distance to stack sequentially
          height: `${count * 105}vh`,
          ...style,
        }}
      >
        <div
          className="stacking-cards-sticky-viewport"
          style={{
            position: "sticky",
            top: "92px",
            height: "calc(100vh - 105px)",
            minHeight: "560px",
            maxHeight: "740px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            zIndex: 10,
          }}
        >
          <div
            className="stacking-cards-stage"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1040px",
              height: "580px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </StackingCardsContext.Provider>
  );
};

export const StackingCardItem: React.FC<StackingCardItemProps> = ({
  index,
  total,
  children,
  className = "",
  style,
}) => {
  const ctx = useContext(StackingCardsContext);
  const activeIndex = ctx?.activeCardIndex ?? 0;

  const isFirst = index === 0;

  // Strict Sequential Stacking:
  // Card 0: Base card, always in place
  // Card 1: Enters when activeIndex >= 1
  // Card 2: STRICTLY held offscreen below until activeIndex reaches 2 (after Cards 0 & 1 have stacked!)
  const isEntered = isFirst || activeIndex >= index;
  const depth = Math.max(0, activeIndex - index);

  // Depth scale & dimming for cards underneath
  // depth 0: top active card (scale 1.0, brightness 1.0, depthY 0px)
  // depth 1: one card above it (scale 0.95, brightness 0.88, depthY -12px)
  // depth 2: two cards above it (scale 0.91, brightness 0.78, depthY -22px)
  const targetScale = depth === 0 ? 1 : depth === 1 ? 0.95 : 0.91;
  const targetBrightness = depth === 0 ? 1 : depth === 1 ? 0.88 : 0.78;
  const targetDepthY = depth === 0 ? 0 : depth === 1 ? -12 : -22;

  return (
    <motion.div
      className={`stacking-card-item ${className}`}
      initial={false}
      animate={{
        y: isEntered ? `${targetDepthY}px` : "105%",
        opacity: isEntered ? 1 : 0,
        scale: targetScale,
        filter: `brightness(${targetBrightness})`,
      }}
      transition={{
        y: {
          type: "spring",
          stiffness: 130,
          damping: 22,
          mass: 0.85,
        },
        opacity: { duration: 0.35, ease: "easeOut" },
        scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.4, ease: "easeOut" },
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        borderRadius: "28px",
        overflow: "visible",
        zIndex: (index + 1) * 10,
        pointerEvents: isEntered ? "auto" : "none",
        boxShadow:
          "0 -12px 36px rgba(0, 0, 0, 0.25), 0 32px 85px rgba(16, 43, 70, 0.3), 0 0 0 1px rgba(197, 164, 93, 0.35)",
        transformOrigin: "top center",
        willChange: "transform, opacity, filter",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};

