import { sql } from "@vercel/postgres";

export { sql };

let initialized = false;
let configLogged = false;

export function isDatabaseConfigured(): boolean {
  return !!process.env.POSTGRES_URL;
}

function logConfigurationOnce() {
  if (configLogged) return;
  configLogged = true;
  console.log("[db] POSTGRES_URL configured:", isDatabaseConfigured());
}

export async function ensureInitialized() {
  logConfigurationOnce();

  if (initialized) return;
  if (!isDatabaseConfigured()) return;

  try {
    const { initDatabase } = await import("./schema");
    await initDatabase();
    await seedIfEmpty();
    initialized = true;
    console.log("[db] database initialized");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[db] initialization failed:", message);
    throw error;
  }
}

export async function seedIfEmpty() {
  if (!isDatabaseConfigured()) return;

  const { rows: productCount } = await sql`SELECT COUNT(*) as count FROM products`;
  if (Number(productCount[0]?.count || 0) > 0) return;

  const { rows: serviceCount } = await sql`SELECT COUNT(*) as count FROM services`;
  if (Number(serviceCount[0]?.count || 0) > 0) return;

  const { seedDatabase } = await import("./seed");
  await seedDatabase();
}
