"use client"

import { useEffect, useState } from "react"

import Loader from "@/components/admin/customUi/Loader"
import CollectionForm from "@/components/admin/collections/CollectionForm"

const CollectionDetails = ({ params }: { params: { collectionId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

  const getCollectionDetails = async () => {
    try { 
      const res = await fetch(`/api/collection/${params.collectionId}`, {
        method: "GET"
      })
      const data = await res.json()
      setCollectionDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[collectionId_GET]", err)
    }
  }

  useEffect(() => {
    getCollectionDetails()
  }, [])

  return loading ? <Loader /> : (
    <CollectionForm initialData={collectionDetails}/>
  )
}

export default CollectionDetails