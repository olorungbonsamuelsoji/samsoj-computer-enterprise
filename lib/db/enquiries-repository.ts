import { sql, ensureInitialized } from "@/lib/db/postgres";
import { CustomerEnquiryRecord } from "@/types/admin";
import {
  jsonGetAllEnquiries,
  jsonLogEnquiry,
  jsonUpdateEnquiryStatus,
  jsonDeleteEnquiry,
} from "@/lib/db/json-fallback";

const usePostgres = !!process.env.POSTGRES_URL;

export async function getAllEnquiries(): Promise<CustomerEnquiryRecord[]> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT * FROM enquiries ORDER BY created_at DESC
    `;
    return rows.map(rowToEnquiry);
  }
  return jsonGetAllEnquiries();
}

export async function logEnquiry(enquiry: Omit<CustomerEnquiryRecord, "id" | "createdAt" | "status">): Promise<CustomerEnquiryRecord> {
  if (usePostgres) {
    await ensureInitialized();
    const id = `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const { rows } = await sql`
      INSERT INTO enquiries (
        id, name, phone, email, need, message, product_id, product_name,
        service_id, service_name, channel, status, created_at
      ) VALUES (
        ${id}, ${enquiry.name}, ${enquiry.phone}, ${enquiry.email || null},
        ${enquiry.need}, ${enquiry.message}, ${enquiry.productId || null},
        ${enquiry.productName || null}, ${enquiry.serviceId || null},
        ${enquiry.serviceName || null}, ${enquiry.channel}, 'new', ${now}
      )
      RETURNING *
    `;
    return rowToEnquiry(rows[0]);
  }

  return jsonLogEnquiry(enquiry);
}

export async function updateEnquiryStatus(id: string, status: CustomerEnquiryRecord["status"], notes?: string): Promise<boolean> {
  if (usePostgres) {
    await ensureInitialized();
    const now = new Date().toISOString();
    const { rowCount } = await sql`
      UPDATE enquiries SET
        status = ${status},
        notes = ${notes || null},
        updated_at = ${now}
      WHERE id = ${id}
    `;
    return (rowCount ?? 0) > 0;
  }
  return jsonUpdateEnquiryStatus(id, status, notes);
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (usePostgres) {
    await ensureInitialized();
    const { rowCount } = await sql`
      DELETE FROM enquiries WHERE id = ${id}
    `;
    return (rowCount ?? 0) > 0;
  }
  return jsonDeleteEnquiry(id);
}

function rowToEnquiry(row: Record<string, unknown>): CustomerEnquiryRecord {
  return {
    id: row.id as string,
    name: row.name as string,
    phone: row.phone as string,
    email: row.email as string,
    need: row.need as string,
    message: row.message as string,
    productId: row.product_id as string,
    productName: row.product_name as string,
    serviceId: row.service_id as string,
    serviceName: row.service_name as string,
    channel: row.channel as CustomerEnquiryRecord["channel"],
    status: row.status as CustomerEnquiryRecord["status"],
    notes: row.notes as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
