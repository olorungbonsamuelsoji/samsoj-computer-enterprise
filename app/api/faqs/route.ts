import { NextResponse } from "next/server";
import { getAllFaqs, saveFaq, deleteFaq } from "@/lib/db/faqs-repository";
import { checkAdminSession } from "@/lib/auth/admin-auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeUnpublished = searchParams.get("all") === "true";

  const isAuthenticated = await checkAdminSession();
  let faqs = await getAllFaqs();
  if (!isAuthenticated || !includeUnpublished) {
    faqs = faqs.filter((f) => f.isPublished);
  }
  return NextResponse.json({ success: true, faqs });
}

export async function POST(request: Request) {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.question?.trim() || !body.answer?.trim()) {
      return NextResponse.json({ success: false, message: "Question and Answer are required." }, { status: 400 });
    }

    const saved = await saveFaq(body);
    return NextResponse.json({ success: true, faq: saved, message: "FAQ saved successfully." });
  } catch (error) {
    console.error("Save FAQ error:", error);
    return NextResponse.json({ success: false, message: "Failed to save FAQ." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, message: "FAQ ID is required." }, { status: 400 });
  }

  const deleted = await deleteFaq(id);
  if (!deleted) {
    return NextResponse.json({ success: false, message: "FAQ not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "FAQ deleted successfully." });
}
