"use client"

import Loader from '@/components/admin/customUi/Loader'
import { LegalForm } from '@/components/admin/store/LegalForm'
import { PaymentMethodsForm } from '@/components/admin/store/PaymentMethodsForm'
import { SocialMediaLinksForm } from '@/components/admin/store/SocialMediaLinksForm'
import { StoreSettingsForm } from '@/components/admin/store/StoreSettingsForm'
import { Separator } from '@/components/admin/ui/separator'
import { StoreType } from '@/lib/types'
import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function Page() {

  const [myStore, setMyStore] = useState<StoreType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStoreSetting = async () => {
      try {
        const res = await fetch('/api/store');
        const data = await res.json();
        setMyStore(data);
      } catch (error) {
        console.error('Error fetching store settings:', error);
      } finally {
        setLoading(false);
      }
    }
    getStoreSetting();
  }, [])

  const onProceed = async (values: any, storeSettingIdentity: string) => {
    // Clone the current store settings
    let newValues = {
      ...myStore,
    };
  
    // Update the specific store setting identity with the new values
    newValues = {
      ...newValues,
      [storeSettingIdentity]: values, // Correct syntax for updating a specific field
    };
  
    try {
      const res = await fetch('/api/store', { // Added '/' before 'api'
        method: 'PUT',
        body: JSON.stringify(newValues),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to update store settings: ${res.statusText}`);
      }
  
      const data = await res.json();
      toast.success(`${storeSettingIdentity} updated successfully in Store`);
    } catch (error) {
      console.error('Error updating store settings:', error);
    }
  };
  
  if (loading) {
    return <div><Loader /></div>
  }

  return (
    <div className='p-10'>
      <StoreSettingsForm onProceed={onProceed} initialData={myStore?.storeSettings!} />
      <Separator className='my-10  border border-black' />
      <PaymentMethodsForm onProceed={onProceed} initialData={myStore?.paymentMethod!} />
      <Separator className='my-10  border border-black' />
      <SocialMediaLinksForm onProceed={onProceed} initialData={myStore?.socialMediaLinks!} />
      <Separator  className='my-10  border border-black' />
      <LegalForm onProceed={onProceed} initialData={myStore?.legal!} />
    </div>
  )
}

export default Page