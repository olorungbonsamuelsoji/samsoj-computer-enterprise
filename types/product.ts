export type PricingType = "fixed" | "contact";

export type ProductStatus =
  | "available"
  | "limited"
  | "out_of_stock"
  | "contact_for_price";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  description: string;
  specifications: string[];
  price?: number;
  pricingType: PricingType;
  status: ProductStatus;
  image: string;
  additionalImages?: string[];
  featured?: boolean;
  badge?: string;
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  need: string;
  message: string;
  productId?: string;
  productName?: string;
  botField?: string;
}
