import { NextResponse } from "next/server";
import { createDataSnapshot, listDataSnapshots, restoreDataSnapshot } from "@/lib/db/json-db";
import { checkAdminSession } from "@/lib/auth/admin-auth";

export async function GET() {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const snapshots = await listDataSnapshots();
  return NextResponse.json({ success: true, snapshots });
}

export async function POST(request: Request) {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, snapshotId, label } = body;

    if (action === "create") {
      const id = await createDataSnapshot(label || "Manual snapshot from Admin Panel");
      return NextResponse.json({ success: true, snapshotId: id, message: "Backup snapshot created successfully." });
    }

    if (action === "restore") {
      if (!snapshotId) {
        return NextResponse.json({ success: false, message: "Snapshot ID required for restore." }, { status: 400 });
      }
      const restored = await restoreDataSnapshot(snapshotId);
      if (!restored) {
        return NextResponse.json({ success: false, message: "Failed to restore snapshot." }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: "Data snapshot restored successfully!" });
    }

    return NextResponse.json({ success: false, message: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.error("Backup action error:", error);
    return NextResponse.json({ success: false, message: "Backup operation failed." }, { status: 500 });
  }
}
