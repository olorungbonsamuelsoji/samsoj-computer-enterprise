import { NextResponse } from "next/server";
import { getAllProducts, saveProduct, deleteProduct } from "@/lib/db/products-repository";
import { checkAdminSession } from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load products." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name?.trim() || !body.category?.trim()) {
      return NextResponse.json({ success: false, message: "Product name and category are required." }, { status: 400 });
    }

    const saved = await saveProduct(body);
    return NextResponse.json({ success: true, product: saved, message: "Product saved successfully." });
  } catch (error) {
    console.error("Save product error:", error);
    return NextResponse.json({ success: false, message: "Failed to save product." }, { status: 500 });
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
    return NextResponse.json({ success: false, message: "Product ID is required." }, { status: 400 });
  }

  const deleted = await deleteProduct(id);
  if (!deleted) {
    return NextResponse.json({ success: false, message: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Product deleted successfully." });
}
