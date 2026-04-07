"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export async function saveArticle(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("coverImage");

    if (!title || !slug) {
        return { success: false, error: "Title and Slug are required." };
    }

    let imageUrl = "";

    // Safely check if imageFile is a File and has data
    if (imageFile instanceof Blob && imageFile.size > 0 && typeof (imageFile as any).arrayBuffer === 'function') {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filename = `${Date.now()}-${(imageFile as any).name?.replaceAll(" ", "_") || 'upload'}`;
      const filepath = path.join(uploadDir, filename);
      
      fs.writeFileSync(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    } else {
       imageUrl = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80";
    }

    const newArticle = {
      slug,
      image: imageUrl,
      category: category || "Uncategorized",
      title,
      excerpt: excerpt || "",
      content: content || "",
      readTime: "5 min",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      trending: false
    };

    const dbPath = path.join(process.cwd(), "src/data/articles.json");
    let articles = [];
    try {
      if (fs.existsSync(dbPath)) {
        const fileData = fs.readFileSync(dbPath, "utf8");
        articles = JSON.parse(fileData);
      }
    } catch (error) {
      console.error("Could not parse articles.json, starting with empty list", error);
    }
    
    articles.unshift(newArticle);
    fs.writeFileSync(dbPath, JSON.stringify(articles, null, 2));

    revalidatePath("/");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (err) {
    console.error("Critical error in saveArticle:", err);
    return { success: false, error: "Internal Server Error" };
  }
}
