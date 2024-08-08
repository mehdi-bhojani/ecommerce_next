
// In the page file, e.g., src/app/admin/(dashboard)/variants/new/page.tsx

import CreateVariant from '@/components/admin/products/variants/newVariant';
import React, { Suspense } from 'react';

const CreateVariantPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateVariant />
  </Suspense>
);

export default CreateVariantPage;
