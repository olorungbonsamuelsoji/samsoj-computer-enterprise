import { Product } from "@/types/product";
import { readJsonFile, writeJsonFile, createDataSnapshot } from "./json-db";

const FILE_NAME = "products.json";

export async function getAllProducts(): Promise<Product[]> {
  return await readJsonFile<Product[]>(FILE_NAME, []);
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.id === id) || null;
}

export async function saveProduct(productData: Product): Promise<Product> {
  await createDataSnapshot("Auto backup before product save");
  const products = await getAllProducts();
  const existingIndex = products.findIndex((p) => p.id === productData.id);

  if (existingIndex >= 0) {
    products[existingIndex] = productData;
  } else {
    products.push(productData);
  }

  await writeJsonFile(FILE_NAME, products);
  return productData;
}

export async function deleteProduct(id: string): Promise<boolean> {
  await createDataSnapshot("Auto backup before product delete");
  const products = await getAllProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  await writeJsonFile(FILE_NAME, filtered);
  return true;
}
