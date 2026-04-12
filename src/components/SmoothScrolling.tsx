"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Ultra-smooth deceleration length
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Classic Apple-style elastic curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    let rafId: number;

    // Tick the scroll algorithm synced exactly with framerate
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    
    rafId = requestAnimationFrame(raf);

    // Cleanup physics instance on unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
