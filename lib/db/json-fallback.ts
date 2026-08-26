import fs from "fs/promises";
import path from "path";
import { Product, Service, FAQItem, BusinessConfig, CustomerEnquiryRecord } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    let data = await fs.readFile(path.join(DATA_DIR, filename), "utf-8");
    if (data.charCodeAt(0) === 0xFEFF) {
      data = data.slice(1);
    }
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const filePath = path.join(DATA_DIR, filename);
  const tempPath = `${filePath}.${Date.now()}.tmp`;
  const serialized = JSON.stringify(data, null, 2);
  await fs.writeFile(tempPath, serialized, "utf-8");
  await fs.rename(tempPath, filePath);
}

export async function jsonGetAllProducts(): Promise<Product[]> {
  const products = await readJsonFile<Product[]>("products.json", []);
  return products.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });
}

export async function jsonGetProductById(id: string): Promise<Product | null> {
  const products = await jsonGetAllProducts();
  return products.find((p) => p.id === id) || null;
}

export async function jsonSaveProduct(product: Partial<Product> & { id?: string }): Promise<Product> {
  const products = await readJsonFile<Product[]>("products.json", []);
  if (product.id) {
    const index = products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      products[index] = { ...products[index], ...product, id: product.id } as Product;
      await writeJsonFile("products.json", products);
      return products[index];
    }
  }
  const newProduct = {
    ...product,
    id: product.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
  } as Product;
  products.push(newProduct);
  await writeJsonFile("products.json", products);
  return newProduct;
}

export async function jsonDeleteProduct(id: string): Promise<boolean> {
  const products = await readJsonFile<Product[]>("products.json", []);
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  await writeJsonFile("products.json", filtered);
  return true;
}

export async function jsonGetAllServices(): Promise<Service[]> {
  const services = await readJsonFile<Service[]>("services.json", []);
  return services.sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
}

export async function jsonGetPublishedServices(): Promise<Service[]> {
  const services = await jsonGetAllServices();
  return services.filter((s) => s.isPublished);
}

export async function jsonGetServiceById(id: string): Promise<Service | null> {
  const services = await jsonGetAllServices();
  return services.find((s) => s.id === id) || null;
}

export async function jsonSaveService(service: Partial<Service> & { id?: string }): Promise<Service> {
  const services = await readJsonFile<Service[]>("services.json", []);
  if (service.id) {
    const index = services.findIndex((s) => s.id === service.id);
    if (index >= 0) {
      services[index] = { ...services[index], ...service, id: service.id } as Service;
      await writeJsonFile("services.json", services);
      return services[index];
    }
  }
  const newService = {
    ...service,
    id: service.id || `svc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
  } as Service;
  services.push(newService);
  await writeJsonFile("services.json", services);
  return newService;
}

export async function jsonDeleteService(id: string): Promise<boolean> {
  const services = await readJsonFile<Service[]>("services.json", []);
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === services.length) return false;
  await writeJsonFile("services.json", filtered);
  return true;
}

export async function jsonGetAllFaqs(): Promise<FAQItem[]> {
  const faqs = await readJsonFile<FAQItem[]>("faqs.json", []);
  return faqs.sort((a, b) => a.sortOrder - b.sortOrder || a.question.localeCompare(b.question));
}

export async function jsonGetPublishedFaqs(): Promise<FAQItem[]> {
  const faqs = await jsonGetAllFaqs();
  return faqs.filter((f) => f.isPublished);
}

export async function jsonSaveFaq(faq: Partial<FAQItem> & { id?: string }): Promise<FAQItem> {
  const faqs = await readJsonFile<FAQItem[]>("faqs.json", []);
  if (faq.id) {
    const index = faqs.findIndex((f) => f.id === faq.id);
    if (index >= 0) {
      faqs[index] = { ...faqs[index], ...faq, id: faq.id } as FAQItem;
      await writeJsonFile("faqs.json", faqs);
      return faqs[index];
    }
  }
  const newFaq = {
    ...faq,
    id: faq.id || `faq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
  } as FAQItem;
  faqs.push(newFaq);
  await writeJsonFile("faqs.json", faqs);
  return newFaq;
}

export async function jsonDeleteFaq(id: string): Promise<boolean> {
  const faqs = await readJsonFile<FAQItem[]>("faqs.json", []);
  const filtered = faqs.filter((f) => f.id !== id);
  if (filtered.length === faqs.length) return false;
  await writeJsonFile("faqs.json", filtered);
  return true;
}

export async function jsonGetBusinessConfig(): Promise<BusinessConfig> {
  const config = await readJsonFile<BusinessConfig>("business-config.json", {
    name: "SAMSOJ COMPUTER ENTERPRISE",
    shortName: "SAMSOJ",
    tagline: "Technology Solutions You Can Rely On",
    description: "",
    whatsApp: "08079570725",
    whatsAppInternational: "2348079570725",
    phone: "08079570725",
    phoneDisplay: "+234 807 957 0725",
    email: "samsojcomputerenterprise@gmail.com",
    country: "Nigeria",
    currency: "NGN",
    currencySymbol: "₦",
    hours: "Monday - Saturday: 8:00 AM - 6:00 PM",
    serviceAvailability: "24/7 WhatsApp Online & Remote Support Access",
    remoteSupportAvailable: true,
  } as BusinessConfig);
  return config;
}

export async function jsonUpdateBusinessConfig(data: Partial<BusinessConfig>): Promise<BusinessConfig> {
  const current = await jsonGetBusinessConfig();
  const updated: BusinessConfig = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeJsonFile("business-config.json", updated);
  return updated;
}

export async function jsonGetAllEnquiries(): Promise<CustomerEnquiryRecord[]> {
  const enquiries = await readJsonFile<CustomerEnquiryRecord[]>("enquiries.json", []);
  return enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function jsonLogEnquiry(enquiry: Omit<CustomerEnquiryRecord, "id" | "createdAt" | "status">): Promise<CustomerEnquiryRecord> {
  const enquiries = await jsonGetAllEnquiries();
  const newRecord: CustomerEnquiryRecord = {
    ...enquiry,
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  enquiries.unshift(newRecord);
  await writeJsonFile("enquiries.json", enquiries.slice(0, 500));
  return newRecord;
}

export async function jsonUpdateEnquiryStatus(id: string, status: CustomerEnquiryRecord["status"], notes?: string): Promise<boolean> {
  const enquiries = await readJsonFile<CustomerEnquiryRecord[]>("enquiries.json", []);
  const index = enquiries.findIndex((e) => e.id === id);
  if (index < 0) return false;
  enquiries[index].status = status;
  if (notes !== undefined) enquiries[index].notes = notes;
  enquiries[index].updatedAt = new Date().toISOString();
  await writeJsonFile("enquiries.json", enquiries);
  return true;
}

export async function jsonDeleteEnquiry(id: string): Promise<boolean> {
  const enquiries = await readJsonFile<CustomerEnquiryRecord[]>("enquiries.json", []);
  const filtered = enquiries.filter((e) => e.id !== id);
  if (filtered.length === enquiries.length) return false;
  await writeJsonFile("enquiries.json", filtered);
  return true;
}

export async function jsonCreateSnapshot(label: string): Promise<string> {
  const snapshotId = `snapshot_${Date.now()}`;
  const snapshotDir = path.join(DATA_DIR, "backups", snapshotId);
  await fs.mkdir(snapshotDir, { recursive: true });

  const filesToBackup = ["products.json", "services.json", "faqs.json", "business-config.json", "enquiries.json"];
  for (const file of filesToBackup) {
    try {
      const src = path.join(DATA_DIR, file);
      const dest = path.join(snapshotDir, file);
      await fs.copyFile(src, dest);
    } catch {
      // Skip if file doesn't exist
    }
  }

  const manifest = {
    id: snapshotId,
    label,
    createdAt: new Date().toISOString(),
    files: filesToBackup,
  };
  await fs.writeFile(path.join(snapshotDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf-8");
  return snapshotId;
}

export async function jsonListSnapshots(): Promise<{ id: string; label: string; createdAt: string; files: string[] }[]> {
  const backupsDir = path.join(DATA_DIR, "backups");
  try {
    const entries = await fs.readdir(backupsDir, { withFileTypes: true });
    const snapshots: { id: string; label: string; createdAt: string; files: string[] }[] = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        try {
          const manifestPath = path.join(backupsDir, entry.name, "manifest.json");
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

export async function jsonRestoreSnapshot(snapshotId: string): Promise<boolean> {
  const snapshotDir = path.join(DATA_DIR, "backups", snapshotId);
  try {
    const entries = await fs.readdir(snapshotDir);
    for (const file of entries) {
      if (file !== "manifest.json") {
        const src = path.join(snapshotDir, file);
        const dest = path.join(DATA_DIR, file);
        await fs.copyFile(src, dest);
      }
    }
    return true;
  } catch {
    return false;
  }
}
