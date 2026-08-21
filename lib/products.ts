export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: number;
  image?: string;
  available: boolean;
};

export const products: Product[] = [
  {
    id: "laptops-computers",
    name: "Laptops & Computers",
    category: "Computers",
    description:
      "Reliable laptops, desktop computers, and systems for work, school, business, and everyday use.",
    available: true,
  },
  {
    id: "printers-office",
    name: "Printers & Office Equipment",
    category: "Office Equipment",
    description:
      "Practical printing and office technology solutions for homes, businesses, and organisations.",
    available: true,
  },
  {
    id: "computer-accessories",
    name: "Computer Accessories",
    category: "Accessories",
    description:
      "Keyboards, mice, flash drives, chargers, cables, and other essential computer accessories.",
    available: true,
  },
  {
    id: "networking-equipment",
    name: "Networking Equipment",
    category: "Networking",
    description:
      "Routers, switches, network cables, access points, and other connectivity equipment.",
    available: true,
  },
  {
    id: "storage-components",
    name: "Storage & Components",
    category: "Computer Hardware",
    description:
      "Hard drives, SSDs, memory, replacement components, and other computer hardware.",
    available: true,
  },
  {
    id: "pos-equipment",
    name: "POS Equipment",
    category: "Business Equipment",
    description:
      "Point-of-sale equipment and technology solutions for shops and businesses.",
    available: true,
  },
];