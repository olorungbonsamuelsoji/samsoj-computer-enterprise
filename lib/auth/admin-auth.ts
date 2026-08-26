import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY;
const SESSION_COOKIE_NAME = "samsoj_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured on the server.");
  }
  return secret;
}

export function verifyAdminPasskey(passkey: string): boolean {
  if (!ADMIN_PASSKEY) return false;
  if (!passkey) return false;
  return passkey.trim() === ADMIN_PASSKEY.trim();
}

function signSessionToken(): string {
  const secret = getSessionSecret();
  const payload = `${Date.now()}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  const token = `${payload}.${signature}`;
  return Buffer.from(token).toString("base64");
}

function verifySessionToken(token: string): boolean {
  try {
    const secret = getSessionSecret();
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [payload, signature] = decoded.split(".");
    if (!payload || !signature) return false;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload);
    const expectedSignature = hmac.digest("hex");

    if (signature !== expectedSignature) return false;

    const timestamp = Number(payload);
    if (!Number.isFinite(timestamp)) return false;
    const age = Date.now() - timestamp;
    return age < SESSION_MAX_AGE * 1000;
  } catch {
    return false;
  }
}

export async function setAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const token = signSessionToken();
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
    return verifySessionToken(sessionCookie.value);
  } catch {
    return false;
  }
}
