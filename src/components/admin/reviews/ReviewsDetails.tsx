// pages/reviewDetails.js

import React, { useState } from 'react';

import { ReviewType} from '@/lib/types';
import { Button } from '@/components/ui/button';
import { EyeIcon } from 'lucide-react';
import ReviewDialog from './ReviewsDialog';

interface props{
    review: ReviewType;
}

const ReviewDetails:React.FC<props> = ({review}) => {
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
      <ReviewDialog open={isDialogOpen} onClose={handleCloseDialog} review={review} />
    </div>
  );
};

export default ReviewDetails;
