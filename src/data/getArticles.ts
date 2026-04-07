import fs from 'fs';
import path from 'path';

export interface Article {
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  trending?: boolean;
}

export function getArticles(): Article[] {
  const filePath = path.join(process.cwd(), 'src/data/articles.json');
  try {
    if (!fs.existsSync(filePath)) return [];
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to read articles database:", error);
    return [];
  }
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getArticles();
  return articles.find(article => article.slug === slug);
}
