import { sql } from "@vercel/postgres";

export async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      brand TEXT,
      model_number TEXT,
      sku TEXT,
      category TEXT NOT NULL,
      category_id TEXT NOT NULL,
      description TEXT NOT NULL,
      specifications JSONB NOT NULL DEFAULT '[]',
      price INTEGER NOT NULL,
      pricing_type TEXT NOT NULL DEFAULT 'fixed',
      status TEXT NOT NULL DEFAULT 'available',
      image TEXT,
      featured BOOLEAN NOT NULL DEFAULT false,
      badge TEXT,
      source_info JSONB,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      icon TEXT NOT NULL,
      category TEXT NOT NULL,
      pricing JSONB NOT NULL,
      delivery_mode TEXT NOT NULL,
      features JSONB NOT NULL DEFAULT '[]',
      is_featured BOOLEAN NOT NULL DEFAULT false,
      is_published BOOLEAN NOT NULL DEFAULT true,
      is_core_maintenance BOOLEAN NOT NULL DEFAULT false,
      cta_label TEXT NOT NULL,
      cta_action TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT NOT NULL,
      is_published BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS business_config (
      id TEXT PRIMARY KEY DEFAULT 'default',
      config JSONB NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      need TEXT NOT NULL,
      message TEXT NOT NULL,
      product_id TEXT,
      product_name TEXT,
      service_id TEXT,
      service_name TEXT,
      channel TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS snapshots (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      files JSONB NOT NULL DEFAULT '[]'
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_services_published ON services(is_published);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(is_published);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at);
  `;
}
