import { NextResponse } from "next/server";
import { verifyAdminPasskey, setAdminSessionCookie, clearAdminSessionCookie, checkAdminSession } from "@/lib/auth/admin-auth";

export async function GET() {
  const authenticated = await checkAdminSession();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passkey } = body;

    if (!verifyAdminPasskey(passkey)) {
      return NextResponse.json(
        { success: false, message: "Invalid administrator passkey. Access denied." },
        { status: 401 }
      );
    }

    await setAdminSessionCookie();
    return NextResponse.json({ success: true, message: "Administrator authentication successful." });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ success: false, message: "Login processing failed." }, { status: 500 });
  }
}

export async function DELETE() {
  await clearAdminSessionCookie();
  return NextResponse.json({ success: true, message: "Logged out successfully." });
}
