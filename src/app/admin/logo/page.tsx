"use client";

import React, { useState, useRef } from "react";
import { saveTransparentLogo } from "./actions";
import { useRouter } from "next/navigation";
import styles from "../editor/editor.module.css"; // Reuse editor styling

export default function LogoUploader() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalImage(url);
      processImage(url);
    }
  };

  const processImage = (imageUrl: string) => {
    setIsProcessing(true);
    const img = new Image();
    
    img.onload = () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Make white pixels transparent (R > 230, G > 230, B > 230)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          if (r > 230 && g > 230 && b > 230) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        setProcessedImage(dataUrl);
        setIsProcessing(false);
      } catch (err) {
        alert("Error processing image. The browser might be blocking it.");
        setIsProcessing(false);
      }
    };
    img.onerror = () => {
      alert("Error loading the image file.");
      setIsProcessing(false);
    };
    img.src = imageUrl;
  };

  const saveLogo = async () => {
    if (!processedImage) return;
    setIsSaving(true);
    try {
      const res = await saveTransparentLogo(processedImage);
      if (res.success) {
        alert("Magic Complete! Logo updated!");
        router.refresh();
        router.push("/"); // Go to homepage to see it
      } else {
        alert("Failed to save logo: " + res.error);
      }
    } catch (e) {
      alert("Error saving logo.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: "800px" }}>
      <h1 className="section-title">Magic Logo Setup ✨</h1>
      <p style={{ color: "var(--color-text-dim)", marginBottom: "2rem" }}>
        Upload or paste your logo image here. I will instantly remove the white background using your browser!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div className={styles.imageUploadContainer}>
          <input 
            type="file" 
            accept="image/*" 
            className={styles.hiddenFileInput} 
            onChange={handleFileUpload}
          />
          <div className={styles.uploadPlaceholder}>
            <span className={styles.uploadIcon}>🚀</span>
            <span>Click to upload your logo</span>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {processedImage && (
          <div style={{ background: "var(--color-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
            <h3 style={{ marginBottom: "1rem", color: "var(--color-text)" }}>Preview on Dark Theme:</h3>
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              background: "var(--color-bg)", 
              padding: "3rem", 
              borderRadius: "8px",
              border: "1px solid var(--color-border-subtle)" 
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={processedImage} alt="Transparent Logo" style={{ maxWidth: "300px", height: "auto" }} />
            </div>
            
            <button 
              className="btn-primary" 
              onClick={saveLogo} 
              disabled={isSaving}
              style={{ width: "100%", marginTop: "2rem", padding: "1rem" }}
            >
              {isSaving ? "Applying to website..." : "Apply to Website Now!"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
