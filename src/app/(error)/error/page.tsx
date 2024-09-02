"use client";

import ErrorMessage from '@/components/error/ErrorMessage';
import { useSearchParams } from 'next/navigation';
import React from 'react'

function Page() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
  return (
    <div>
        <ErrorMessage message={message || "An error occurred"} />
    </div>
  )
}

export default Page