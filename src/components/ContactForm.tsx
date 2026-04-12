"use client";

import { useState } from "react";
import styles from "../app/contact/page.module.css";
import { sendContactEmail } from "../app/actions/sendEmail";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    
    // Call server action
    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus("success");
      // Reset form
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.formCard} style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
        <button 
          className="btn-primary"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your full name" required disabled={status === "submitting"} />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required disabled={status === "submitting"} />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="subject">Subject</label>
        <select id="subject" name="subject" required defaultValue="" disabled={status === "submitting"}>
          <option value="" disabled>Select a topic</option>
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
          name="message"
          rows={6}
          placeholder="Tell us your story, your question, or your idea..."
          required
          disabled={status === "submitting"}
        />
      </div>
      
      {status === "error" && (
        <div style={{ color: "#ff4444", marginBottom: "1rem" }}>
          {errorMessage}
        </div>
      )}

      <button type="submit" className="btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
