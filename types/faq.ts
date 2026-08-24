export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "maintenance" | "remote_support" | "pricing" | "hardware" | "general";
  isPublished: boolean;
  sortOrder: number;
}
