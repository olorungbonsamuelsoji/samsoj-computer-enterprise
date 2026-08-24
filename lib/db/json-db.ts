import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const BACKUPS_DIR = path.join(DATA_DIR, "backups");

/**
 * Ensures the data and backups directories exist.
 */
async function ensureDirectories() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(BACKUPS_DIR, { recursive: true });
  } catch {
    // Already exists
  }
}

/**
 * Safely reads a JSON file with fallback to a default value.
 */
export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  await ensureDirectories();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      // File doesn't exist yet, create with fallback
      await writeJsonFile(filename, fallback);
      return fallback;
    }
    console.error(`Error reading ${filename}:`, error);
    return fallback;
  }
}

/**
 * Atomically writes data to a JSON file using a temporary file to avoid corruption.
 */
export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDirectories();
  const filePath = path.join(DATA_DIR, filename);
  const tempPath = `${filePath}.${Date.now()}.tmp`;

  const serialized = JSON.stringify(data, null, 2);
  await fs.writeFile(tempPath, serialized, "utf-8");
  await fs.rename(tempPath, filePath);
}

/**
 * Creates a point-in-time snapshot backup of all active data files.
 */
export async function createDataSnapshot(label = "Manual Backup"): Promise<string> {
  await ensureDirectories();
  const snapshotId = `snapshot_${Date.now()}`;
  const targetDir = path.join(BACKUPS_DIR, snapshotId);
  await fs.mkdir(targetDir, { recursive: true });

  const filesToBackup = [
    "services.json",
    "products.json",
    "business-config.json",
    "faqs.json",
  ];

  for (const file of filesToBackup) {
    try {
      const src = path.join(DATA_DIR, file);
      const dest = path.join(targetDir, file);
      await fs.copyFile(src, dest);
    } catch {
      // Skip if file doesn't exist
    }
  }

  // Write manifest
  const manifest = {
    id: snapshotId,
    label,
    createdAt: new Date().toISOString(),
    files: filesToBackup,
  };
  await fs.writeFile(
    path.join(targetDir, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );

  return snapshotId;
}

/**
 * Lists all available backup snapshots.
 */
export async function listDataSnapshots() {
  await ensureDirectories();
  try {
    const entries = await fs.readdir(BACKUPS_DIR, { withFileTypes: true });
    const snapshots = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        try {
          const manifestPath = path.join(BACKUPS_DIR, entry.name, "manifest.json");
          const content = await fs.readFile(manifestPath, "utf-8");
          snapshots.push(JSON.parse(content));
        } catch {
          // Ignore invalid backup directories
        }
      }
    }

    return snapshots.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch {
    return [];
  }
}

/**
 * Restores all data files from a specific snapshot ID.
 */
export async function restoreDataSnapshot(snapshotId: string): Promise<boolean> {
  await ensureDirectories();
  const targetDir = path.join(BACKUPS_DIR, snapshotId);
  try {
    const entries = await fs.readdir(targetDir);
    for (const file of entries) {
      if (file !== "manifest.json") {
        const src = path.join(targetDir, file);
        const dest = path.join(DATA_DIR, file);
        await fs.copyFile(src, dest);
      }
    }
    return true;
  } catch (error) {
    console.error("Failed to restore snapshot:", error);
    return false;
  }
}
