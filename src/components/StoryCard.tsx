import Link from "next/link";
import styles from "./StoryCard.module.css";

interface StoryCardProps {
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  readTime?: string;
  trending?: boolean;
}

export default function StoryCard({
  slug,
  image,
  category,
  title,
  excerpt,
  readTime,
  trending,
}: StoryCardProps) {
  return (
    <Link href={`/article/${slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} />
        {trending && <span className={styles.trendingBadge}>🔥 Trending</span>}
      </div>
      <div className={styles.body}>
        <span className="category-pill">{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        {readTime && <span className={styles.meta}>{readTime} read</span>}
        <span className={styles.readMore}>Read More →</span>
      </div>
    </Link>
  );
}
