"use server"

import Product from "../models/Product";

interface AddVariantToProductParams {
  productId: string;
  newVariantId: string;
}

const addVariantToProduct = async ({ productId, newVariantId }: AddVariantToProductParams) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.variants.includes(newVariantId)) {
      throw new Error("Variant already added to this product");
    }

    product.variants.push(newVariantId);

    const updatedProduct = await product.save();

    // return updatedProduct;
  } catch (error) {
    console.error("Error adding variant to product:", error);
    throw error;
  }
};

export default addVariantToProduct;
