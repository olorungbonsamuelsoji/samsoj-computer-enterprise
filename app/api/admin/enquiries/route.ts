import { NextResponse } from "next/server";
import { getAllEnquiries, updateEnquiryStatus, deleteEnquiry } from "@/lib/db/enquiries-repository";
import { checkAdminSession } from "@/lib/auth/admin-auth";

export async function GET() {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const enquiries = await getAllEnquiries();
  return NextResponse.json({ success: true, enquiries });
}

export async function PATCH(request: Request) {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: "Enquiry ID and status are required." }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Enquiry status updated." });
  } catch (error) {
    console.error("Enquiry status update error:", error);
    return NextResponse.json({ success: false, message: "Failed to update enquiry status." }, { status: 500 });
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
    return NextResponse.json({ success: false, message: "Enquiry ID required." }, { status: 400 });
  }

  const deleted = await deleteEnquiry(id);
  if (!deleted) {
    return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Enquiry deleted." });
}
