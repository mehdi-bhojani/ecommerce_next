"use client"

import Loader from '@/components/admin/customUi/Loader'
import ProductForm from '@/components/admin/products/ProductForm'
import VariantForm from '@/components/admin/products/variants/VariantForm'
import { VariantType } from '@/lib/types'
import { useEffect, useState } from 'react'

const VariantDetails = ({ params }: { params: { variantId: string }}) => {
  const [loading, setLoading] = useState(true);
  const [variantDetails, setVariantDetails] = useState<VariantType | null>(null);

  const getVariantDetails = async () => {
    try { 
      const res = await fetch(`/api/variant/${params.variantId}`, {
        method: "GET"
      })
      const data = await res.json()
      setVariantDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[variantId_GET]", err)
    }
  }

  useEffect(() => {
    getVariantDetails()
  }, [])

  return loading ? <Loader /> : (
    <VariantForm initialData={variantDetails} />
  )
}

export default VariantDetails;