// pages/customerDetails.js

import React, { useState } from 'react';

import { CustomerType } from '@/lib/types';
import CustomerDialog from './CustomerDialog';
import { Button } from '@/components/ui/button';
import { EyeIcon } from 'lucide-react';

interface props{
    customer: CustomerType;
}

const CustomerDetails:React.FC<props> = ({customer}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Button variant="default" onClick={() => handleOpenDialog()}><EyeIcon/> </Button>
      <CustomerDialog open={isDialogOpen} onClose={handleCloseDialog} customer={customer} />
    </div>
  );
};

export default CustomerDetails;
