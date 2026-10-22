"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "drag3d" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor for pointer devices with hover capability
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    } else {
      return;
    }

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const dragTarget = target.closest("[data-cursor='drag3d']");
      const slideTarget = target.closest("[data-cursor='drag']");
      const hoverTarget = target.closest("button, a, select, input, [data-cursor='hover']");

      if (dragTarget) {
        setCursorVariant("drag3d");
        setCursorText("DRAG 360°");
      } else if (hoverTarget) {
        setCursorVariant("hover");
        setCursorText("");
      } else if (slideTarget) {
        setCursorVariant("drag");
        setCursorText("DRAG");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveMouse);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
      }}
    >
      {cursorVariant === "drag3d" ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            background: "rgba(22, 21, 20, 0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(182, 146, 105, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontSize: "0.625rem",
            letterSpacing: "0.14em",
            fontWeight: 600,
            textTransform: "uppercase",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
          }}
        >
          {cursorText}
        </motion.div>
      ) : cursorVariant === "drag" ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#333333",
            fontSize: "0.5625rem",
            letterSpacing: "0.14em",
            fontWeight: 600,
            transform: "translate(-50%, -50%)",
          }}
        >
          {cursorText}
        </motion.div>
      ) : cursorVariant === "hover" ? (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.3 }}
          transition={{ duration: 0.15 }}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid var(--color-brass)",
            background: "rgba(182, 146, 105, 0.12)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--color-text-main)",
            transform: "translate(-50%, -50%)",
            opacity: 0.7,
            transition: "opacity 0.2s ease",
          }}
        />
      )}
    </motion.div>
  );
};
