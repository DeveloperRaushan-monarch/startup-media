import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with StartupMedia. Got a story? Get Featured.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <span className="section-label">Contact</span>
          <h1 className={styles.heroTitle}>
            Let&apos;s Build Something <span>Together</span>
          </h1>
          <p className={styles.heroSub}>
            Got a story? A question? A collaboration idea? We want to hear it.
          </p>
        </div>
      </section>

      {/* Get Featured CTA */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div className={styles.featuredCard}>
            <div className={styles.featuredGlow} />
            <span className={styles.featuredEmoji}>🚀</span>
            <h2 className={styles.featuredTitle}>
              Is Your Startup Story Worth Telling?
            </h2>
            <p className={styles.featuredSub}>
              We&apos;re always looking for the next story that will inspire a
              generation of builders. If that story is yours, let&apos;s talk.
            </p>
            <a href="#contact-form" className="btn-primary">
              Submit Your Story →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className={`section ${styles.formSection}`}>
        <div className="container">
          <div className={styles.formCard}>
            <span className="section-label">Send a Message</span>
            <h2 className={styles.formTitle}>We&apos;d Love to Hear From You</h2>
            <form
              className={styles.form}
              action="#"
            >
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Your full name" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="subject">Subject</label>
                <select id="subject" required defaultValue="">
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option>General Inquiry</option>
                  <option>Get Featured</option>
                  <option>Collaboration</option>
                  <option>Press</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us your story, your question, or your idea..."
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className={`section ${styles.infoSection}`}>
        <div className={`container ${styles.infoGrid}`}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>✉️</div>
            <h3>Email Us</h3>
            <p>hello@startupmedia.co</p>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📱</div>
            <h3>Follow Us</h3>
            <p>@startupmedia on Instagram & X</p>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📍</div>
            <h3>Based In</h3>
            <p>The Internet — We&apos;re Everywhere</p>
          </div>
        </div>
      </section>
    </>
  );
}
