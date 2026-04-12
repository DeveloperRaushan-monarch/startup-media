import { getArticles } from "@/data/getArticles";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await getArticles();
    // Only return necessary fields for search to keep payload small
    const searchData = articles.map(a => ({
      title: a.title,
      slug: a.slug,
      category: a.category
    }));
    return NextResponse.json(searchData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
