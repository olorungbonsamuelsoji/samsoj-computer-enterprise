import { sql, ensureInitialized } from "@/lib/db/postgres";
import { FAQItem } from "@/types/faq";
import {
  jsonGetAllFaqs,
  jsonGetPublishedFaqs,
  jsonSaveFaq,
  jsonDeleteFaq,
} from "@/lib/db/json-fallback";

const usePostgres = !!process.env.POSTGRES_URL;

export async function getAllFaqs(): Promise<FAQItem[]> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT * FROM faqs ORDER BY sort_order ASC, question ASC
    `;
    return rows.map(rowToFaq);
  }
  return jsonGetAllFaqs();
}

export async function getPublishedFaqs(): Promise<FAQItem[]> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT * FROM faqs WHERE is_published = true ORDER BY sort_order ASC, question ASC
    `;
    return rows.map(rowToFaq);
  }
  return jsonGetPublishedFaqs();
}

export async function saveFaq(faq: Partial<FAQItem> & { id?: string }): Promise<FAQItem> {
  if (usePostgres) {
    await ensureInitialized();
    if (faq.id) {
      const { rows } = await sql`
        UPDATE faqs SET
          question = ${faq.question},
          answer = ${faq.answer},
          category = ${faq.category},
          is_published = ${faq.isPublished ?? true},
          sort_order = ${faq.sortOrder || 0}
        WHERE id = ${faq.id}
        RETURNING *
      `;
      if (rows.length > 0) return rowToFaq(rows[0]);
    }

    const newId = faq.id || `faq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const { rows } = await sql`
      INSERT INTO faqs (id, question, answer, category, is_published, sort_order)
      VALUES (${newId}, ${faq.question}, ${faq.answer}, ${faq.category},
              ${faq.isPublished ?? true}, ${faq.sortOrder || 0})
      RETURNING *
    `;
    return rowToFaq(rows[0]);
  }

  return jsonSaveFaq(faq);
}

export async function deleteFaq(id: string): Promise<boolean> {
  if (usePostgres) {
    await ensureInitialized();
    const { rowCount } = await sql`
      DELETE FROM faqs WHERE id = ${id}
    `;
    return (rowCount ?? 0) > 0;
  }
  return jsonDeleteFaq(id);
}

function rowToFaq(row: Record<string, unknown>): FAQItem {
  return {
    id: row.id as string,
    question: row.question as string,
    answer: row.answer as string,
    category: row.category as FAQItem["category"],
    isPublished: row.is_published as boolean,
    sortOrder: row.sort_order as number,
  };
}
