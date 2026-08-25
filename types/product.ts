export type PricingType = "fixed" | "starting_from" | "contact" | "price_on_request";

export type ProductStatus =
  | "available"
  | "limited"
  | "available_on_request"
  | "out_of_stock"
  | "enquire_for_availability"
  | "contact_for_price";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
}

export interface SourceInfo {
  manufacturerUrl?: string;
  retailerSource?: string;
  lastChecked?: string;
  checkedBy?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  brand?: string;
  modelNumber?: string;
  sku?: string;
  description: string;
  specifications: string[];
  price?: number;
  pricingType: PricingType;
  status: ProductStatus;
  image: string;
  imageUrl?: string;
  additionalImages?: string[];
  updatedAt?: string;
  featured?: boolean;
  badge?: string;
  sourceInfo?: SourceInfo;
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
