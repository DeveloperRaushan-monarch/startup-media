"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for glassmorphism
      setScrolled(currentScrollY > 20);

      // Focus mode logic (Hide on scroll down, Show on scroll up)
      if (currentScrollY < 100) {
        if (!visibleRef.current) {
          setVisible(true);
          visibleRef.current = true;
        }
      } else if (currentScrollY > lastScrollY.current + 10) {
        if (visibleRef.current) {
          setVisible(false);
          visibleRef.current = false;
          setMenuOpen(false);
        }
      } else if (currentScrollY < lastScrollY.current - 10) {
        if (!visibleRef.current) {
          setVisible(true);
          visibleRef.current = true;
        }
      }
      
      lastScrollY.current = currentScrollY;

      // Global Scroll Progress
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (currentScrollY / docH) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${pct}%`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${!visible ? styles.hidden : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo-transparent.png" 
            alt="StartupMedia Logo" 
            className={styles.rocketLogo}
          />
          <span className={styles.logoText}>Startup<span>Media</span></span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/#stories" onClick={() => setMenuOpen(false)}>Stories</Link>
          <Link href="/#categories" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>

        <button
          className={`${styles.burger} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
