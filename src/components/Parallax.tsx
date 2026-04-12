"use client";

import React, { useEffect, useRef, useState } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // 0.1 to 1.0 recommended
  className?: string;
}

export default function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        // Move at a fraction of the scroll speed
        const newOffset = window.scrollY * speed;
        setOffset(newOffset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
        transition: "transform 0.1s linear", // keep it tight with the scroll
      }}
    >
      {children}
    </div>
  );
}
