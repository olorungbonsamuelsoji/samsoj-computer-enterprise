import { cookies } from "next/headers";

const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || "samsoj2026!";
const SESSION_COOKIE_NAME = "samsoj_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function verifyAdminPasskey(passkey: string): boolean {
  if (!passkey) return false;
  return passkey.trim() === ADMIN_PASSKEY.trim();
}

export async function setAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const token = Buffer.from(`admin_${Date.now()}_authenticated`).toString("base64");
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function checkAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return false;
    const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
    return decoded.startsWith("admin_") && decoded.endsWith("_authenticated");
  } catch {
    return false;
  }
}
