"use client";

import { useEffect, useState } from "react";
import styles from "./WelcomeSplash.module.css";

export default function WelcomeSplash() {
  const [visible, setVisible] = useState(false); // false on server = no SSR mismatch

  useEffect(() => {
    // Only runs client-side — sets visible after hydration completes
    setVisible(true);

    // Unmount after animation finishes (3.8s animation + small buffer)
    const timer = setTimeout(() => setVisible(false), 3900);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.splash} aria-hidden="true">
      {/* Pulsing ambient rings */}
      <div className={styles.ring} />
      <div className={`${styles.ring} ${styles.ring2}`} />

      {/* Main welcome text */}
      <h1 className={styles.welcome}>Welcome</h1>

      {/* Subtle tagline */}
      <p className={styles.tagline}>Stories that inspire builders</p>

      {/* Accent line */}
      <div className={styles.line} />
    </div>
  );
}
