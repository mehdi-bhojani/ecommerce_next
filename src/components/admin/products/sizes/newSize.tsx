"use client";

import { useSearchParams } from "next/navigation";
import SizeForm from "./SizeForm";

const CreateSize = () => {
  const searchParams = useSearchParams();
  const variantId = searchParams.get('variantId');
  
  return <SizeForm variantId={variantId?.toString()} />;
};

export default CreateSize;