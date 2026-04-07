"use client";

import { saveArticle } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./editor.module.css";
import React, { useState } from "react";

export default function AdminEditor() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Tech");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };
  
  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPublishing(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const res = await saveArticle(formData);
      
      if (res.success) {
        alert("Article Published Successfully!");
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to publish article", error);
      alert("Error: Could not publish article.");
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <div className={styles.editorContainer}>
      <form onSubmit={handlePublish} className={styles.form}>
        
        <div className={styles.header}>
          <Link href="/admin/dashboard" className={styles.backBtn}>
            ← Back to Dashboard
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)', cursor: 'pointer' }}>
              Save Draft
            </button>
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }} disabled={isPublishing}>
              {isPublishing ? "Publishing..." : "Publish Now"}
            </button>
          </div>
        </div>

        <input 
          type="text" 
          name="title"
          className={styles.titleInput} 
          placeholder="Story Title..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className={styles.imageUploadContainer}>
          <input 
            type="file" 
            name="coverImage"
            accept="image/*" 
            className={styles.hiddenFileInput} 
            onChange={handleImageUpload}
          />
          {coverImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImage} alt="Cover Preview" className={styles.imagePreview} />
              <div className={styles.changeImageBtn}>Change Cover Image</div>
            </>
          ) : (
            <div className={styles.uploadPlaceholder}>
              <span className={styles.uploadIcon}>📸</span>
              <span>Click or drag to upload a high-res cover image</span>
            </div>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="slug">URL Slug</label>
            <input 
              type="text" 
              id="slug" 
              name="slug"
              className={styles.input} 
              placeholder="e.g. 21-year-old-built-1m-app"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              name="category"
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Tech">Tech</option>
              <option value="Startup">Startup</option>
              <option value="Small Business">Small Business</option>
              <option value="Student">Student</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="excerpt">Excerpt (Short Summary)</label>
          <textarea 
            id="excerpt" 
            name="excerpt"
            className={styles.input} 
            placeholder="A gripping one-liner to reel them in..." 
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Story Content (Markdown)</label>
          <textarea 
            id="content" 
            name="content"
            className={styles.textarea} 
            placeholder="Write your story here... Use markdown for formatting (**bold**, # headings, etc.)" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
}
