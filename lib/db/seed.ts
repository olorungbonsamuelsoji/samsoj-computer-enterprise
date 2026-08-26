import { readFileSync } from "fs";
import { join } from "path";
import { ensureInitialized } from "@/lib/db/postgres";
import { saveProduct } from "@/lib/db/products-repository";
import { saveService } from "@/lib/db/services-repository";
import { saveFaq } from "@/lib/db/faqs-repository";
import { updateBusinessConfig } from "@/lib/db/settings-repository";

export async function seedDatabase() {
  if (!process.env.POSTGRES_URL) return;

  await ensureInitialized();

  const dataDir = join(process.cwd(), "data");

  try {
    const productsRaw = readFileSync(join(dataDir, "products.json"), "utf-8");
    const products = JSON.parse(productsRaw);
    for (const product of products) {
      await saveProduct(product);
    }
  } catch {
    console.warn("No products.json found or failed to parse");
  }

  try {
    const servicesRaw = readFileSync(join(dataDir, "services.json"), "utf-8");
    const services = JSON.parse(servicesRaw);
    for (const service of services) {
      await saveService(service);
    }
  } catch {
    console.warn("No services.json found or failed to parse");
  }

  try {
    const faqsRaw = readFileSync(join(dataDir, "faqs.json"), "utf-8");
    const faqs = JSON.parse(faqsRaw);
    for (const faq of faqs) {
      await saveFaq(faq);
    }
  } catch {
    console.warn("No faqs.json found or failed to parse");
  }

  try {
    const configRaw = readFileSync(join(dataDir, "business-config.json"), "utf-8");
    const config = JSON.parse(configRaw);
    await updateBusinessConfig(config);
  } catch {
    console.warn("No business-config.json found or failed to parse");
  }

  console.log("Database seed completed");
}
