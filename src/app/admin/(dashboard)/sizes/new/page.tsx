
// In the page file, e.g., src/app/admin/(dashboard)/variants/new/page.tsx

import CreateSize from '@/components/admin/products/sizes/newSize';
import React, { Suspense } from 'react';

const CreateVariantPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateSize />
  </Suspense>
);

export default CreateVariantPage;
