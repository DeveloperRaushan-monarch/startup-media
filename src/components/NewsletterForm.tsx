"use client";

import { useState } from "react";
import styles from "./NewsletterForm.module.css";
import { sendNewsletterEmail } from "../app/actions/sendEmail";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "launching" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus("launching");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await sendNewsletterEmail(formData);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Failed to subscribe");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successContainer}>
        <div className={styles.rocketLaunch}>
          <div className={styles.successRocket}>🚀</div>
          <div className={styles.smoke}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <h3 className={styles.successTitle}>Launch Successful!</h3>
        <p className={styles.successMsg}>
          You&apos;re now a founding subscriber. Get ready for the next breakthrough story in your inbox.
        </p>
        <button 
          className={styles.resetBtn}
          onClick={() => { setStatus("idle"); setEmail(""); }}
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input 
          type="email" 
          name="email"
          placeholder="Enter your email address..." 
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "launching"}
        />
        <div className={styles.inputGlow} />
      </div>
      <button 
        type="submit" 
        className={`${styles.button} ${status === "launching" ? styles.launchingBtn : ""}`}
        disabled={status === "launching"}
      >
        {status === "launching" ? (
          <span className={styles.launchText}>Ignition...</span>
        ) : (
          <>
            Subscribe <span className={styles.arrow}>→</span>
          </>
        )}
      </button>
    </form>
  );
}
