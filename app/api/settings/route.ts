import { NextResponse } from "next/server";
import { getBusinessConfig, updateBusinessConfig } from "@/lib/db/settings-repository";
import { checkAdminSession } from "@/lib/auth/admin-auth";

export async function GET() {
  const settings = await getBusinessConfig();
  return NextResponse.json({ success: true, settings });
}

export async function POST(request: Request) {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await updateBusinessConfig(body);
    return NextResponse.json({ success: true, settings: updated, message: "Settings updated successfully." });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ success: false, message: "Failed to update settings." }, { status: 500 });
  }
}
