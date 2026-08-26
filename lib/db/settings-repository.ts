import { sql, ensureInitialized } from "@/lib/db/postgres";
import { BusinessConfig } from "@/types/admin";
import { business as defaultBusiness } from "@/lib/config";
import { jsonGetBusinessConfig, jsonUpdateBusinessConfig } from "@/lib/db/json-fallback";

const usePostgres = !!process.env.POSTGRES_URL;

export async function getBusinessConfig(): Promise<BusinessConfig> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT config FROM business_config WHERE id = 'default' LIMIT 1
    `;
    if (rows.length > 0 && rows[0].config) {
      return rows[0].config as BusinessConfig;
    }
    return defaultBusiness as unknown as BusinessConfig;
  }
  return jsonGetBusinessConfig();
}

export async function updateBusinessConfig(data: Partial<BusinessConfig>): Promise<BusinessConfig> {
  if (usePostgres) {
    await ensureInitialized();
    const current = await getBusinessConfig();
    const updated: BusinessConfig = {
      ...current,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await sql`
      INSERT INTO business_config (id, config, updated_at)
      VALUES ('default', ${JSON.stringify(updated)}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        config = EXCLUDED.config,
        updated_at = EXCLUDED.updated_at
    `;

    return updated;
  }

  return jsonUpdateBusinessConfig(data);
}
