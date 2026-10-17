"use client";

import React from "react";

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 100,
        background: "var(--color-dark)",
        color: "var(--color-canvas)",
        padding: "0.85rem 1.5rem",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        fontSize: "0.8125rem",
        letterSpacing: "0.08em",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <span style={{ color: "var(--color-brass)" }}>✦</span>
      <span>{message}</span>
    </div>
  );
};
