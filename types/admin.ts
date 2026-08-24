export interface BusinessAnnouncement {
  enabled: boolean;
  message: string;
  badge?: string;
  linkText?: string;
  linkUrl?: string;
}

export interface BusinessConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsApp: string;
  whatsAppInternational: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  country: string;
  currency: string;
  currencySymbol: string;
  hours: string;
  serviceAvailability: string;
  address?: string;
  remoteSupportAvailable: boolean;
  announcement?: BusinessAnnouncement;
  updatedAt?: string;
}

export interface CustomerEnquiryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  need: string;
  message: string;
  productId?: string;
  productName?: string;
  serviceId?: string;
  serviceName?: string;
  channel: "website_email" | "website_whatsapp" | "direct_call";
  status: "new" | "contacted" | "in_progress" | "resolved" | "archived";
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminSession {
  authenticated: boolean;
  user: string;
  expiresAt: number;
}

export interface BackupSnapshot {
  id: string;
  createdAt: string;
  label: string;
  fileCount: number;
}
