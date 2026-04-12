import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.error("❌ Error: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  const filePath = path.join(process.cwd(), 'src/data/articles.json');
  
  if (!fs.existsSync(filePath)) {
    console.error("❌ Error: src/data/articles.json not found.");
    return;
  }

  const articles = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`🚀 Found ${articles.length} articles to migrate...`);

  for (const article of articles) {
    // Map CamelCase JSON to snake_case Database
    const dbArticle = {
      slug: article.slug,
      title: article.title,
      image: article.image,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content,
      read_time: article.readTime || "5 min",
      date: article.date,
      trending: article.trending || false,
      author: article.author || "monarchraushan"
    };

    console.log(`📦 Uploading: ${dbArticle.title}...`);
    
    const { error } = await supabase
      .from('articles')
      .upsert(dbArticle, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Failed to upload ${dbArticle.slug}:`, error.message);
    } else {
      console.log(`✅ Success: ${dbArticle.slug}`);
    }
  }

  console.log("\n✨ Migration completed!");
}

migrate().catch(err => console.error("💥 Migration crashed:", err));
