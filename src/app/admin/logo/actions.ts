"use server";

import fs from "fs";
import path from "path";

export async function saveTransparentLogo(base64Data: string) {
  try {
    // Remove the data:image/png;base64, part
    const base64Image = base64Data.split(';base64,').pop();
    if (!base64Image) throw new Error("Invalid base64 data");

    const imageBuffer = Buffer.from(base64Image, 'base64');
    
    // Save to public directory
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const filePath = path.join(publicDir, "logo-transparent.png");
    fs.writeFileSync(filePath, imageBuffer);
    
    return { success: true };
  } catch (err: any) {
    console.error("Failed to save logo:", err);
    return { success: false, error: err.message };
  }
}
