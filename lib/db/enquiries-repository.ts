import { CustomerEnquiryRecord } from "@/types/admin";
import { readJsonFile, writeJsonFile } from "./json-db";

const FILE_NAME = "enquiries.json";

export async function getAllEnquiries(): Promise<CustomerEnquiryRecord[]> {
  const list = await readJsonFile<CustomerEnquiryRecord[]>(FILE_NAME, []);
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function logEnquiry(enquiry: Omit<CustomerEnquiryRecord, "id" | "createdAt" | "status">): Promise<CustomerEnquiryRecord> {
  const enquiries = await getAllEnquiries();
  const newRecord: CustomerEnquiryRecord = {
    ...enquiry,
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  enquiries.unshift(newRecord);
  // Keep up to 500 recent enquiries
  await writeJsonFile(FILE_NAME, enquiries.slice(0, 500));
  return newRecord;
}

export async function updateEnquiryStatus(id: string, status: CustomerEnquiryRecord["status"], notes?: string): Promise<boolean> {
  const enquiries = await getAllEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);
  if (index < 0) return false;

  enquiries[index].status = status;
  if (notes !== undefined) enquiries[index].notes = notes;
  enquiries[index].updatedAt = new Date().toISOString();

  await writeJsonFile(FILE_NAME, enquiries);
  return true;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const enquiries = await getAllEnquiries();
  const filtered = enquiries.filter((e) => e.id !== id);
  if (filtered.length === enquiries.length) return false;
  await writeJsonFile(FILE_NAME, filtered);
  return true;
}
