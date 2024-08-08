import { z } from "zod";

const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Product name is required.",
  }),
  description: z.string().optional(),
  price: z.number().positive({
    message: "Price must be a positive number.",
  }),
  stockQuantity: z.number().int().nonnegative({
    message: "Stock quantity must be a non-negative integer.",
  }),
  categoryId: z.number().int().optional(),
  brandId: z.number().int().optional(),
  sku: z.string().min(1, {
    message: "SKU is required.",
  }),
});

export default productSchema;
