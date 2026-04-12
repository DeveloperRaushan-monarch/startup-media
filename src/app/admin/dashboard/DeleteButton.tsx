"use client";

import { deleteArticle } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./dashboard.module.css";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this article?");
    if (!isConfirmed) return;

    setIsDeleting(true);
    try {
      const res = await deleteArticle(slug);
      if (res.success) {
        router.refresh();
      } else {
        alert("Error: " + (res.error || "Could not delete article."));
      }
    } catch (error: any) {
      console.error("Failed to delete article", error);
      alert(`Technical Error: ${error?.message || String(error)}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      className={styles.actionBtn} 
      onClick={handleDelete}
      disabled={isDeleting}
      style={{ color: "var(--color-accent-blue)", opacity: isDeleting ? 0.5 : 1 }}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
