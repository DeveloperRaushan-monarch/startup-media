"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);
  
  const [isInteractive, setIsInteractive] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  
  const mouse = useRef({ x: 0, y: 0 });
  const trailing = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Determine if device has a fine pointer (excludes touch devices)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;
    setHasFinePointer(true);

    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // The main dot moves instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const updateTrailing = () => {
      // Lerp (linear interpolation) for smooth trailing
      trailing.current.x += (mouse.current.x - trailing.current.x) * 0.15;
      trailing.current.y += (mouse.current.y - trailing.current.y) * 0.15;

      if (trailingRef.current) {
        trailingRef.current.style.transform = `translate3d(${trailing.current.x}px, ${trailing.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateTrailing);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over interactive elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsInteractive(true);
      } else {
        setIsInteractive(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    animationFrameId = requestAnimationFrame(updateTrailing);

    // Hide original cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!hasFinePointer) return null;

  return (
    <>
      {/* The trailing glowing ring (now translucent glass) */}
      <div 
        ref={trailingRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "36px", height: "36px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)", // for Safari
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          marginLeft: "-18px", marginTop: "-18px",
          transition: "width 0.25s, height 0.25s, margin 0.25s, background-color 0.25s, border-color 0.25s, backdrop-filter 0.25s",
          willChange: "transform",
          ...(isInteractive ? {
            width: "56px",
            height: "56px",
            marginLeft: "-28px",
            marginTop: "-28px",
            backgroundColor: "rgba(255, 107, 0, 0.15)",
            borderColor: "rgba(255, 107, 0, 0.4)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)"
          } : {})
        }}
      />
      {/* The solid dot (now a very subtle soft dot) */}
      <div 
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "6px", height: "6px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          marginLeft: "-3px", marginTop: "-3px",
          willChange: "transform",
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
          ...(isInteractive ? { opacity: 0 } : { opacity: 1, transition: "opacity 0.2s" })
        }}
      />
      {/* Add global CSS to hide default cursor completely on links too */}
      <style>{`
        a, button, input, textarea, [role="button"] { cursor: none !important; }
      `}</style>
    </>
  );
}
