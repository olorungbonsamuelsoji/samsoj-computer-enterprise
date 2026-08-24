import { BusinessConfig } from "@/types/admin";
import { readJsonFile, writeJsonFile, createDataSnapshot } from "./json-db";
import { business as defaultBusiness } from "../config";

const FILE_NAME = "business-config.json";

export async function getBusinessConfig(): Promise<BusinessConfig> {
  const config = await readJsonFile<BusinessConfig>(FILE_NAME, defaultBusiness as unknown as BusinessConfig);
  return config;
}

export async function updateBusinessConfig(data: Partial<BusinessConfig>): Promise<BusinessConfig> {
  await createDataSnapshot("Auto backup before business settings update");
  const current = await getBusinessConfig();
  const updated: BusinessConfig = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeJsonFile(FILE_NAME, updated);
  return updated;
}
