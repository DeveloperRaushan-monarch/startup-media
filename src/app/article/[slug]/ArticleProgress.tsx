"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function ArticleProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ height: `${scrollProgress}%` }} />
    </div>
  );
}
