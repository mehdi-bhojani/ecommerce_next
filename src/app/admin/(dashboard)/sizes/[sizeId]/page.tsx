"use client";

import Loader from '@/components/admin/customUi/Loader';
import SizeForm from '@/components/admin/products/sizes/SizeForm';
import { SizeType } from '@/lib/types'; // Adjust import for SizeType
import { useEffect, useState } from 'react';

const SizeDetails = ({ params }: { params: { sizeId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [sizeDetails, setSizeDetails] = useState<SizeType | null>(null);

  const getSizeDetails = async () => {
    try {
      const res = await fetch(`/api/size/${params.sizeId}`, {
        method: "GET",
      });
      const data = await res.json();
      setSizeDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[sizeId_GET]", err);
    }
  };

  useEffect(() => {
    getSizeDetails();
  }, []);

  return loading ? <Loader /> : <SizeForm initialData={sizeDetails} />;
};

export default SizeDetails;
