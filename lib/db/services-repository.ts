import { Service } from "@/types/service";
import { readJsonFile, writeJsonFile, createDataSnapshot } from "./json-db";

const FILE_NAME = "services.json";

export async function getAllServices(includeUnpublished = false): Promise<Service[]> {
  const services = await readJsonFile<Service[]>(FILE_NAME, []);
  const list = includeUnpublished ? services : services.filter((s) => s.isPublished);
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServiceById(id: string): Promise<Service | null> {
  const services = await getAllServices(true);
  return services.find((s) => s.id === id) || null;
}

export async function saveService(serviceData: Partial<Service> & { title: string }): Promise<Service> {
  await createDataSnapshot("Auto backup before service save");
  const services = await getAllServices(true);

  const id = serviceData.id || serviceData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const slug = serviceData.slug || id;

  const existingIndex = services.findIndex((s) => s.id === id);

  const updatedService: Service = {
    id,
    slug,
    title: serviceData.title,
    shortDescription: serviceData.shortDescription || "",
    fullDescription: serviceData.fullDescription || serviceData.shortDescription || "",
    icon: serviceData.icon || "🛠️",
    category: serviceData.category || "maintenance",
    pricing: serviceData.pricing || {
      type: "diagnostic_variable",
      priceLabel: "Price varies based on specification & issue",
      priceSubtitle: "Quoted after diagnosis",
    },
    deliveryMode: serviceData.deliveryMode || "physical_and_remote",
    features: serviceData.features || [],
    isFeatured: serviceData.isFeatured ?? true,
    isPublished: serviceData.isPublished ?? true,
    isCoreMaintenance: serviceData.isCoreMaintenance ?? false,
    ctaLabel: serviceData.ctaLabel || "Request Service",
    ctaAction: serviceData.ctaAction || "whatsapp_maintenance",
    sortOrder: serviceData.sortOrder ?? (services.length + 1),
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    services[existingIndex] = updatedService;
  } else {
    services.push(updatedService);
  }

  await writeJsonFile(FILE_NAME, services);
  return updatedService;
}

export async function deleteService(id: string): Promise<boolean> {
  await createDataSnapshot("Auto backup before service delete");
  const services = await getAllServices(true);
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === services.length) return false;
  await writeJsonFile(FILE_NAME, filtered);
  return true;
}
