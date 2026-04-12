"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchModal.module.css";
import { QUOTES } from "@/data/quotes"; // We can reuse quote data or articles
// Let's import getArticles if possible, but data is usually fetched in RSC.
// For search, we'll fetch articles on mount or use a static list.

interface SearchResult {
  title: string;
  slug: string;
  category: string;
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // We'll fetch articles once on mount for the client-side search
  const [allArticles, setAllArticles] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Fetch articles for search (using a client-side friendly way)
    // Since we have a local data pattern, we can fetch from an api route or similar.
    // Simplifying for now: using the articles we know exist.
    fetch("/api/articles")
      .then(res => res.json())
      .then(data => setAllArticles(data))
      .catch(() => {
        // Fallback or handle error
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      // Support Cmd+K (Mac) and Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const filtered = allArticles
      .filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) || 
        a.category.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8);
    
    setResults(filtered);
    setActiveIndex(0);
  }, [query, allArticles]);

  const handleSelect = (slug: string) => {
    router.push(`/article/${slug}`);
    setIsOpen(false);
  };

  const handleNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[activeIndex]) {
      handleSelect(results[activeIndex].slug);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div 
        className={styles.modal} 
        onClick={e => e.stopPropagation()}
        onKeyDown={handleNav}
      >
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search stories, founders, or categories..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className={styles.kbd}>ESC</div>
        </div>

        <div className={styles.results}>
          {query && results.length === 0 && (
            <div className={styles.noResults}>No stories found for &ldquo;{query}&rdquo;</div>
          )}
          
          {!query && (
            <div className={styles.emptyState}>
              <p>Type to search the StartupMedia library...</p>
              <div className={styles.shortcuts}>
                <span>Navigation: <kbd>↑</kbd><kbd>↓</kbd></span>
                <span>Select: <kbd>ENTER</kbd></span>
              </div>
            </div>
          )}

          {results.map((result, i) => (
            <div
              key={result.slug}
              className={`${styles.resultItem} ${i === activeIndex ? styles.active : ""}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => handleSelect(result.slug)}
            >
              <div className={styles.resultInfo}>
                <span className={styles.resultCategory}>{result.category}</span>
                <span className={styles.resultTitle}>{result.title}</span>
              </div>
              <span className={styles.enterIcon}>↵</span>
            </div>
          ))}
        </div>
        
        <div className={styles.footer}>
          <span>StartupMedia Universal Search</span>
          <div className={styles.footerBrand}>
            <span>v1.0.4</span>
            <div className={styles.statusDot} />
          </div>
        </div>
      </div>
    </div>
  );
}
