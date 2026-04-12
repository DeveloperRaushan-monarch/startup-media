import Link from "next/link";
import AestheticLink from "@/components/AestheticLink";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Startup<span>Media</span>
          </Link>
          <p className={styles.tagline}>
            Stories that inspire the next generation of builders.
          </p>
        </div>
        <nav className={styles.links}>
          <div className={styles.col}>
            <h4>Navigate</h4>
            <AestheticLink href="/">Home</AestheticLink>
            <AestheticLink href="/#stories">Stories</AestheticLink>
            <AestheticLink href="/#categories">Categories</AestheticLink>
          </div>
          <div className={styles.col}>
            <h4>Company</h4>
            <AestheticLink href="/about">About</AestheticLink>
            <AestheticLink href="/contact">Contact</AestheticLink>
            <AestheticLink href="/contact">Get Featured</AestheticLink>
          </div>
          <div className={styles.col}>
            <h4>Categories</h4>
            <AestheticLink href="/#categories">Tech</AestheticLink>
            <AestheticLink href="/#categories">Student</AestheticLink>
            <AestheticLink href="/#categories">Small Business</AestheticLink>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          &copy; {new Date().getFullYear()} StartupMedia. All rights reserved. <br/>
          Built with 🧡 by <a href="/admin" className={styles.founder}>Ritik Raj Singh</a>.
        </p>
      </div>
    </footer>
  );
}
