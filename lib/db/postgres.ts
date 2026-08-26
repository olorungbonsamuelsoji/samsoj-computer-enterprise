import { sql } from "@vercel/postgres";

export { sql };

let initialized = false;
let postgresUnavailable = false;

export async function ensureInitialized() {
  if (initialized) return;
  if (postgresUnavailable) return;

  if (!process.env.POSTGRES_URL) {
    postgresUnavailable = true;
    return;
  }

  try {
    const { initDatabase } = await import("./schema");
    await initDatabase();
    initialized = true;
  } catch {
    postgresUnavailable = true;
  }
}

export async function seedIfEmpty() {
  if (!process.env.POSTGRES_URL) return;

  await ensureInitialized();

  const { rows: productCount } = await sql`SELECT COUNT(*) as count FROM products`;
  if (Number(productCount[0]?.count || 0) > 0) return;

  const { rows: serviceCount } = await sql`SELECT COUNT(*) as count FROM services`;
  if (Number(serviceCount[0]?.count || 0) > 0) return;

  const { seedDatabase } = await import("./seed");
  await seedDatabase();
}
