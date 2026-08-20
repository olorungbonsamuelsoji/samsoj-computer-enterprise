export const requiredEnv = [
  "NEXT_PUBLIC_SITE_URL",
] as const;

export const optionalEnv = [
  "WHATSAPP_API_TOKEN",
  "WHATSAPP_PHONE_NUMBER_ID",
  "EMAIL_API_KEY",
  "EMAIL_FROM_ADDRESS",
  "AI_API_KEY",
  "AI_MODEL",
  "DATABASE_URL",
  "PAYMENT_API_KEY",
  "PAYMENT_WEBHOOK_SECRET",
  "ADMIN_API_KEY",
] as const;

export type RequiredEnv = (typeof requiredEnv)[number];
export type OptionalEnv = (typeof optionalEnv)[number];

export function validateEnv() {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
