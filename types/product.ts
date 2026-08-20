export type PricingType = "fixed" | "contact";

export type ProductStatus = "available" | "limited" | "out_of_stock" | "discontinued";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  specifications?: string[];
  price?: number;
  pricingType: PricingType;
  status: ProductStatus;
  images: string[];
  featured?: boolean;
}

export interface Enquiry {
  id: string;
  productId?: string;
  productName?: string;
  customerName: string;
  customerContact: string;
  message: string;
  channel: "whatsapp" | "email";
  createdAt: Date;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customerName: string;
  customerContact: string;
  status: "pending" | "confirmed" | "processing" | "delivered" | "cancelled";
  total: number;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}
