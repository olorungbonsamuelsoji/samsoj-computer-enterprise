import { FAQItem } from "@/types/faq";
import { readJsonFile, writeJsonFile, createDataSnapshot } from "./json-db";

const FILE_NAME = "faqs.json";

export async function getAllFAQs(includeUnpublished = false): Promise<FAQItem[]> {
  const faqs = await readJsonFile<FAQItem[]>(FILE_NAME, []);
  const list = includeUnpublished ? faqs : faqs.filter((f) => f.isPublished);
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveFAQ(faqData: Partial<FAQItem> & { question: string; answer: string }): Promise<FAQItem> {
  await createDataSnapshot("Auto backup before FAQ save");
  const faqs = await getAllFAQs(true);
  const id = faqData.id || `faq-${Date.now()}`;

  const updated: FAQItem = {
    id,
    question: faqData.question,
    answer: faqData.answer,
    category: faqData.category || "general",
    isPublished: faqData.isPublished ?? true,
    sortOrder: faqData.sortOrder ?? (faqs.length + 1),
  };

  const existingIndex = faqs.findIndex((f) => f.id === id);
  if (existingIndex >= 0) {
    faqs[existingIndex] = updated;
  } else {
    faqs.push(updated);
  }

  await writeJsonFile(FILE_NAME, faqs);
  return updated;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  await createDataSnapshot("Auto backup before FAQ delete");
  const faqs = await getAllFAQs(true);
  const filtered = faqs.filter((f) => f.id !== id);
  if (filtered.length === faqs.length) return false;
  await writeJsonFile(FILE_NAME, filtered);
  return true;
}
