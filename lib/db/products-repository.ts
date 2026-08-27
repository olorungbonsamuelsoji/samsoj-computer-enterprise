import { sql, ensureInitialized } from "@/lib/db/postgres";
import { Product } from "@/types/product";
import {
  jsonGetAllProducts,
  jsonGetProductById,
  jsonSaveProduct,
  jsonDeleteProduct,
} from "@/lib/db/json-fallback";

const usePostgres = !!process.env.POSTGRES_URL;

export async function getAllProducts(): Promise<Product[]> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT * FROM products ORDER BY featured DESC, name ASC
    `;
    return rows.map(rowToProduct);
  }
  return jsonGetAllProducts();
}

export async function getProductById(id: string): Promise<Product | null> {
  if (usePostgres) {
    await ensureInitialized();
    const { rows } = await sql`
      SELECT * FROM products WHERE id = ${id} LIMIT 1
    `;
    if (rows.length === 0) return null;
    return rowToProduct(rows[0]);
  }
  return jsonGetProductById(id);
}

export async function saveProduct(product: Partial<Product> & { id?: string }): Promise<Product> {
  if (usePostgres) {
    await ensureInitialized();
    if (product.id) {
      const { rows } = await sql`
        UPDATE products SET
          name = ${product.name},
          slug = ${product.slug},
          brand = ${product.brand || null},
          model_number = ${product.modelNumber || null},
          sku = ${product.sku || null},
          category = ${product.category},
          category_id = ${product.categoryId},
          description = ${product.description},
          specifications = ${JSON.stringify(product.specifications || [])},
          price = ${product.price || 0},
          pricing_type = ${product.pricingType || "fixed"},
          status = ${product.status || "available"},
          image = ${product.image || null},
          featured = ${product.featured ?? false},
          badge = ${product.badge || null},
          source_info = ${product.sourceInfo ? JSON.stringify(product.sourceInfo) : null},
          updated_at = NOW()
        WHERE id = ${product.id}
        RETURNING *
      `;
      if (rows.length > 0) return rowToProduct(rows[0]);
    }

    const newId = product.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const { rows } = await sql`
      INSERT INTO products (
        id, name, slug, brand, model_number, sku, category, category_id,
        description, specifications, price, pricing_type, status, image,
        featured, badge, source_info, updated_at
      ) VALUES (
        ${newId}, ${product.name}, ${product.slug}, ${product.brand || null},
        ${product.modelNumber || null}, ${product.sku || null}, ${product.category},
        ${product.categoryId}, ${product.description},
        ${JSON.stringify(product.specifications || [])}, ${product.price || 0},
        ${product.pricingType || "fixed"}, ${product.status || "available"},
        ${product.image || null}, ${product.featured ?? false},
        ${product.badge || null}, ${product.sourceInfo ? JSON.stringify(product.sourceInfo) : null},
        NOW()
      )
      RETURNING *
    `;
    return rowToProduct(rows[0]);
  }

  return jsonSaveProduct(product);
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (usePostgres) {
    await ensureInitialized();
    const { rowCount } = await sql`
      DELETE FROM products WHERE id = ${id}
    `;
    return (rowCount ?? 0) > 0;
  }
  return jsonDeleteProduct(id);
}

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    brand: row.brand as string,
    modelNumber: row.model_number as string,
    sku: row.sku as string,
    category: row.category as string,
    categoryId: row.category_id as string,
    description: row.description as string,
    specifications: Array.isArray(row.specifications) ? row.specifications as string[] : [],
    price: row.price as number,
    pricingType: row.pricing_type as Product["pricingType"],
    status: row.status as Product["status"],
    image: row.image as string,
    featured: row.featured as boolean,
    badge: row.badge as string,
    sourceInfo: row.source_info as Product["sourceInfo"],
    updatedAt: row.updated_at as string,
  };
}
