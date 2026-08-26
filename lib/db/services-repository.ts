import { sql, ensureInitialized } from "@/lib/db/postgres";
import { Service } from "@/types/service";
import {
  jsonGetAllServices,
  jsonGetPublishedServices,
  jsonGetServiceById,
  jsonSaveService,
  jsonDeleteService,
} from "@/lib/db/json-fallback";

const usePostgres = !!process.env.POSTGRES_URL;

export async function getAllServices(): Promise<Service[]> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT * FROM services ORDER BY sort_order ASC, title ASC
    `;
    return rows.map(rowToService);
  }
  return jsonGetAllServices();
}

export async function getPublishedServices(): Promise<Service[]> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT * FROM services WHERE is_published = true ORDER BY sort_order ASC, title ASC
    `;
    return rows.map(rowToService);
  }
  return jsonGetPublishedServices();
}

export async function getServiceById(id: string): Promise<Service | null> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT * FROM services WHERE id = ${id} LIMIT 1
    `;
    if (rows.length === 0) return null;
    return rowToService(rows[0]);
  }
  return jsonGetServiceById(id);
}

export async function saveService(service: Partial<Service> & { id?: string }): Promise<Service> {
  if (usePostgres) {
    await ensureInitialized();
    if (service.id) {
      const { rows } = await sql`
        UPDATE services SET
          slug = ${service.slug},
          title = ${service.title},
          short_description = ${service.shortDescription},
          full_description = ${service.fullDescription},
          icon = ${service.icon},
          category = ${service.category},
          pricing = ${JSON.stringify(service.pricing || {})},
          delivery_mode = ${service.deliveryMode},
          features = ${JSON.stringify(service.features || [])},
          is_featured = ${service.isFeatured ?? false},
          is_published = ${service.isPublished ?? true},
          is_core_maintenance = ${service.isCoreMaintenance ?? false},
          cta_label = ${service.ctaLabel},
          cta_action = ${service.ctaAction},
          sort_order = ${service.sortOrder || 0}
        WHERE id = ${service.id}
        RETURNING *
      `;
      return rowToService(rows[0]);
    }

    const newId = service.id || `svc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const { rows } = await sql`
      INSERT INTO services (
        id, slug, title, short_description, full_description, icon, category,
        pricing, delivery_mode, features, is_featured, is_published,
        is_core_maintenance, cta_label, cta_action, sort_order
      ) VALUES (
        ${newId}, ${service.slug}, ${service.title}, ${service.shortDescription},
        ${service.fullDescription}, ${service.icon}, ${service.category},
        ${JSON.stringify(service.pricing || {})}, ${service.deliveryMode},
        ${JSON.stringify(service.features || [])}, ${service.isFeatured ?? false},
        ${service.isPublished ?? true}, ${service.isCoreMaintenance ?? false},
        ${service.ctaLabel}, ${service.ctaAction}, ${service.sortOrder || 0}
      )
      RETURNING *
    `;
    return rowToService(rows[0]);
  }

  return jsonSaveService(service);
}

export async function deleteService(id: string): Promise<boolean> {
  if (usePostgres) {
    await ensureInitialized();
    const { rowCount } = await sql`
      DELETE FROM services WHERE id = ${id}
    `;
    return (rowCount ?? 0) > 0;
  }
  return jsonDeleteService(id);
}

function rowToService(row: Record<string, unknown>): Service {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    shortDescription: row.short_description as string,
    fullDescription: row.full_description as string,
    icon: row.icon as string,
    category: row.category as Service["category"],
    pricing: row.pricing as Service["pricing"],
    deliveryMode: row.delivery_mode as Service["deliveryMode"],
    features: Array.isArray(row.features) ? row.features as string[] : [],
    isFeatured: row.is_featured as boolean,
    isPublished: row.is_published as boolean,
    isCoreMaintenance: row.is_core_maintenance as boolean,
    ctaLabel: row.cta_label as string,
    ctaAction: row.cta_action as Service["ctaAction"],
    sortOrder: row.sort_order as number,
  };
}
