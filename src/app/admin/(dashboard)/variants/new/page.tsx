"use client";

import VariantForm from "@/components/admin/products/variants/VariantForm";
import { useSearchParams } from "next/navigation";

const CreateVariant = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  
  return <VariantForm productId={productId?.toString()} />;
};

export default CreateVariant;
