import { NextResponse } from "next/server";
import { getAllServices, saveService, deleteService } from "@/lib/db/services-repository";
import { checkAdminSession } from "@/lib/auth/admin-auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeUnpublished = searchParams.get("all") === "true";
  
  const isAuthenticated = await checkAdminSession();
  const services = await getAllServices(isAuthenticated && includeUnpublished);
  return NextResponse.json({ success: true, services });
}

export async function POST(request: Request) {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title?.trim()) {
      return NextResponse.json({ success: false, message: "Service title is required." }, { status: 400 });
    }

    const saved = await saveService(body);
    return NextResponse.json({ success: true, service: saved, message: "Service saved successfully." });
  } catch (error) {
    console.error("Save service error:", error);
    return NextResponse.json({ success: false, message: "Failed to save service." }, { status: 500 });
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
    return NextResponse.json({ success: false, message: "Service ID is required." }, { status: 400 });
  }

  const deleted = await deleteService(id);
  if (!deleted) {
    return NextResponse.json({ success: false, message: "Service not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Service deleted successfully." });
}
