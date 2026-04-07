import { saveArticle } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Simple Security Check for Production-Ready API
    const apiKey = request.headers.get("x-api-key");
    const validApiKey = process.env.STITCH_API_KEY || "startup_media_dev_key";

    if (apiKey !== validApiKey) {
      return NextResponse.json({ success: false, error: "Unauthorized: Invalid or missing API Key" }, { status: 401 });
    }

    const formData = await request.formData();
    const result = await saveArticle(formData);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error("API Route Error (POST /api/articles):", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
