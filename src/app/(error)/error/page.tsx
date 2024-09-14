"use client";

import ErrorMessage from '@/components/error/ErrorMessage';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function PageContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  
  return (
    <div>
      <ErrorMessage message={message || "An error occurred"} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
