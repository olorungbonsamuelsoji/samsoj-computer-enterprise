import { sql, ensureInitialized } from "@/lib/db/postgres";
import {
  jsonCreateSnapshot,
  jsonListSnapshots,
  jsonRestoreSnapshot,
} from "@/lib/db/json-fallback";

export interface SnapshotRecord {
  id: string;
  label: string;
  createdAt: string;
  files: string[];
}

const usePostgres = !!process.env.POSTGRES_URL;

export async function createSnapshot(label: string): Promise<string> {
  if (usePostgres) {
    await ensureInitialized();
    const snapshotId = `snapshot_${Date.now()}`;
    const now = new Date().toISOString();

    await sql`SELECT * FROM products`;
    await sql`SELECT * FROM services`;
    await sql`SELECT * FROM faqs`;
    await sql`SELECT config FROM business_config WHERE id = 'default'`;
    await sql`SELECT * FROM enquiries`;

    await sql`
      INSERT INTO snapshots (id, label, created_at, files)
      VALUES (${snapshotId}, ${label}, ${now}, ${JSON.stringify(["products", "services", "faqs", "business-config", "enquiries"])})
    `;

    return snapshotId;
  }

  return jsonCreateSnapshot(label);
}

export async function listSnapshots(): Promise<SnapshotRecord[]> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT id, label, created_at, files FROM snapshots ORDER BY created_at DESC
    `;
    return rows.map(rowToSnapshot);
  }
  const snapshots = await jsonListSnapshots();
  return snapshots.map(rowToSnapshot);
}

export async function getSnapshot(snapshotId: string): Promise<SnapshotRecord | null> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT id, label, created_at, files FROM snapshots WHERE id = ${snapshotId} LIMIT 1
    `;
    if (rows.length === 0) return null;
    return rowToSnapshot(rows[0]);
  }
  const snapshots = await jsonListSnapshots();
  return snapshots.find((s) => s.id === snapshotId) || null;
}

export async function restoreSnapshot(snapshotId: string): Promise<boolean> {
  if (usePostgres) {
    await ensureInitialized();
    const snapshot = await getSnapshot(snapshotId);
    if (!snapshot) return false;

    await sql`DELETE FROM products`;
    await sql`DELETE FROM services`;
    await sql`DELETE FROM faqs`;
    await sql`DELETE FROM enquiries`;
    await sql`DELETE FROM business_config`;

    return true;
  }

  return jsonRestoreSnapshot(snapshotId);
}

function rowToSnapshot(row: Record<string, unknown>): SnapshotRecord {
  return {
    id: row.id as string,
    label: row.label as string,
    createdAt: row.created_at as string,
    files: Array.isArray(row.files) ? row.files as string[] : [],
  };
}
