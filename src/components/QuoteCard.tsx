"use client";

import { useState, useEffect } from "react";
import styles from "@/app/page.module.css";
import { QUOTES } from "@/data/quotes";

export default function QuoteCard() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Refresh interval: 60 seconds (1 minute)
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % QUOTES.length);
        setFade(true);
      }, 500); // Wait for fade out
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const quote = QUOTES[index];

  return (
    <div className={styles.coverVisual}>
      <div className={styles.coverCard}>
        <div className={styles.coverCardGlow} />
        <div className={styles.coverCardShimmer} />
        <div className={styles.coverTopBar} />
        
        <div className={styles.coverLive}>
          <span className={styles.liveDot} />
          MINT INSIGHT
        </div>

        <div 
          className={styles.coverStory} 
          style={{ 
            opacity: fade ? 1 : 0, 
            transform: fade ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.5s ease" 
          }}
        >
          <span className={styles.coverLabel}>💡 Startup Wisdom</span>
          <p 
            style={{ 
              fontSize: "1.4rem", 
              fontWeight: "700", 
              fontStyle: "italic",
              lineHeight: "1.4",
              color: "var(--text-primary)",
              marginBottom: "16px",
              letterSpacing: "-0.01em"
            }}
          >
            &ldquo;{quote.text}&rdquo;
          </p>
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ fontSize: "1rem", color: "var(--accent)", marginBottom: "4px" }}>
              {quote.author}
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {quote.role}
            </p>
          </div>
        </div>


      </div>

      {/* Orbiting glow rings (maintained from original) */}
      <div className={styles.orbitRing1} />
      <div className={styles.orbitRing2} />
    </div>
  );
}
