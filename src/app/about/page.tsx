import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "StartupMedia is where startup journeys, failures, and breakthroughs come to life.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <span className="section-label">About Us</span>
          <h1 className={styles.heroTitle}>
            We Tell the Stories <span>That Matter</span>
          </h1>
          <p className={styles.heroSub}>
            StartupMedia is where startup journeys, failures, and breakthroughs
            come to life. No hype. No fluff. Just real stories from real
            builders.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className={`section ${styles.missionSection}`}>
        <div className={`container ${styles.missionGrid}`}>
          <blockquote className={styles.missionQuote}>
            <p>
              &ldquo;Every unicorn you admire was once a struggling idea in a
              cramped room with bad WiFi.&rdquo;
            </p>
          </blockquote>
          <div className={styles.missionText}>
            <p>
              StartupMedia was born out of a simple frustration: the startup
              stories that actually matter never get told. The media celebrates
              the billion-dollar exits. We celebrate the Sunday night coding
              sessions.
            </p>
            <p>
              We believe the best startup advice doesn&apos;t come from keynotes
              and masterclasses. It comes from raw, honest stories of founders
              who have been in the trenches — and lived to tell the tale.
            </p>
            <p>
              Our mission is to build the largest collection of real startup
              stories on the internet. Not press releases. Not funded-by
              announcements. Real stories. Real lessons. Real people.
            </p>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className={`section ${styles.coverSection}`}>
        <div className="container">
          <span className="section-label">What We Cover</span>
          <h2 className="section-title">Three Worlds. One Platform.</h2>
          <div className={styles.coverGrid}>
            <div className={styles.coverCard}>
              <div className={styles.coverIcon}>🚀</div>
              <h3>Startup Journeys</h3>
              <p>
                From first commit to first customer. The real playbooks behind
                the companies shaping tomorrow.
              </p>
            </div>
            <div className={styles.coverCard}>
              <div className={styles.coverIcon}>🎓</div>
              <h3>Student Hustles</h3>
              <p>
                Dorm-room ideas that became real companies. The youngest
                generation of builders proving age is irrelevant.
              </p>
            </div>
            <div className={styles.coverCard}>
              <div className={styles.coverIcon}>🏪</div>
              <h3>Small Business Wins</h3>
              <p>
                Local businesses going global. Everyday entrepreneurs rewriting
                the rules of commerce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editor */}
      <section className={`section ${styles.editorSection}`}>
        <div className={`container ${styles.editorInner}`}>
          <div className={styles.editorAvatar}>
            <span>SM</span>
          </div>
          <div className={styles.editorInfo}>
            <span className="section-label">The Editor</span>
            <h3>The StartupMedia Team</h3>
            <p>
              We&apos;re a small team of writers, builders, and startup
              enthusiasts obsessed with uncovering the human stories behind
              every product, pivot, and pitch deck. We don&apos;t chase clicks.
              We chase truth.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className={styles.valuesGrid}>
            <div className={styles.valueItem}>
              <div className={styles.valueLine} />
              <h3>We don&apos;t chase clicks. We chase truth.</h3>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueLine} />
              <h3>Every failure is a lesson worth publishing.</h3>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueLine} />
              <h3>The best stories come from the hardest days.</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
