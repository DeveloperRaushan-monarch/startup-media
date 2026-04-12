import type { Metadata } from "next";
import styles from "./page.module.css";
import ContactForm from "../../components/ContactForm";

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
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className={`section ${styles.infoSection}`}>
        <div className={`container ${styles.infoGrid}`}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>✉️</div>
            <h3>Email Us</h3>
            <p>sikarwar19oct@gmail.com</p>
          </div>
          <a
            href="https://www.instagram.com/startup___media?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoItem}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.infoIcon}>
              <svg viewBox="0 0 24 24" width="38" height="38" fill="none">
                <defs>
                  <radialGradient id="ig-grad-info" cx="30%" cy="107%" r="150%">
                    <stop offset="0%"  stopColor="#fdf497"/>
                    <stop offset="5%"  stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <path fill="url(#ig-grad-info)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>
            <h3>Instagram</h3>
            <p>@startup___media</p>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/posts/student-shala_startupmedia-startupstories-failurestory-activity-7446969612103008256-OquI?utm_source=share&utm_medium=member_android&rcm=ACoAADENRVEBh2jbsYiOeWM_drwOH9b3-ws8Mrk"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoItem}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.infoIcon}>
              <svg viewBox="0 0 24 24" width="38" height="38" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <h3>LinkedIn</h3>
            <p>View our featured post</p>
          </a>

          {/* Facebook Card */}
          <a
            href="https://www.facebook.com/people/Startup-Media/61578510337667/?rdid=phGeqQdEp4pv0gyk&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18GiX9w9sF%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoItem}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.infoIcon}>
              <svg viewBox="0 0 24 24" width="38" height="38" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <h3>Facebook</h3>
            <p>Startup Media Community</p>
          </a>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📍</div>
            <h3>Based In</h3>
            <p>The Internet — We&apos;re Everywhere</p>
          </div>
        </div>
      </section>
      {/* Social Links */}
      <section className={`section ${styles.socialSection}`}>
        <div className="container">
          <div className={styles.socialHeader}>
            <span className="section-label">Find Us Online</span>
            <h2 className={styles.socialTitle}>Follow Our Journey</h2>
            <p className={styles.socialSub}>
              Stay connected with real-time startup stories, founder insights, and community updates.
            </p>
          </div>

          <div className={styles.socialGrid}>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/posts/student-shala_startupmedia-startupstories-failurestory-activity-7446969612103008256-OquI?utm_source=share&utm_medium=member_android&rcm=ACoAADENRVEBh2jbsYiOeWM_drwOH9b3-ws8Mrk"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialCard} ${styles.socialLinkedIn}`}
            >
              <div className={styles.socialGlow} />
              <div className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className={styles.socialInfo}>
                <h3>LinkedIn</h3>
                <p>Read our featured post on LinkedIn</p>
              </div>
              <div className={styles.socialArrow}>→</div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/startup___media?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialCard} ${styles.socialInstagram}`}
            >
              <div className={styles.socialGlow} />
              <div className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none">
                  <defs>
                    <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                      <stop offset="0%"   stopColor="#fdf497"/>
                      <stop offset="5%"   stopColor="#fdf497"/>
                      <stop offset="45%"  stopColor="#fd5949"/>
                      <stop offset="60%"  stopColor="#d6249f"/>
                      <stop offset="90%"  stopColor="#285AEB"/>
                    </radialGradient>
                  </defs>
                  <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <div className={styles.socialInfo}>
                <h3>Instagram</h3>
                <p>@startup___media · Follow Us</p>
              </div>
              <div className={styles.socialArrow}>→</div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Startup-Media/61578510337667/?rdid=phGeqQdEp4pv0gyk&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18GiX9w9sF%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialCard} ${styles.socialFacebook}`}
            >
              <div className={styles.socialGlow} />
              <div className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className={styles.socialInfo}>
                <h3>Facebook</h3>
                <p>Startup Media Community Page</p>
              </div>
              <div className={styles.socialArrow}>→</div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
