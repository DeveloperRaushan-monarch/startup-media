import { redirect } from "next/navigation";

export default async function StoriesSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Simple redirect to ensure URL compatibility with external testing tools
  // that might expect /stories/ instead of /article/
  redirect(`/article/${slug}`);
}
