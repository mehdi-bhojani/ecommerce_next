"use server"

import Product from "../models/Product";

interface RemoveVariantFromProductParams {
  productId: string;
  variantIdToRemove: string;
}

const removeVariantFromProduct = async ({ productId, variantIdToRemove }: RemoveVariantFromProductParams) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.variants.includes(variantIdToRemove)) {
      throw new Error("Variant not found in this product");
    }

    product.variants = product.variants.filter(variantId => variantId !== variantIdToRemove);

    const updatedProduct = await product.save();

    // return updatedProduct;
  } catch (error) {
    console.error("Error removing variant from product:", error);
    throw error;
  }
};

export default removeVariantFromProduct;