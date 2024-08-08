// import { Decimal } from "@prisma/client/runtime/library";

export interface productType {
  id: number;
  name: string;
  description: string | null;
  // price: Decimal;
  stockQuantity: number;
  categoryId: number | null;
  brandId: number | null;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}
