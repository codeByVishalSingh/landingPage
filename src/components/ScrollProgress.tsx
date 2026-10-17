"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      id="scroll-progress-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2.5px",
        background: "linear-gradient(90deg, var(--color-brass) 0%, #D6AF76 50%, var(--color-brass) 100%)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 100,
        boxShadow: "0 0 10px rgba(182, 146, 105, 0.6)",
      }}
    />
  );
};
