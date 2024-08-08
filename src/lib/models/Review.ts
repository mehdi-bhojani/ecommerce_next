import mongoose, { Document, Schema } from 'mongoose';
import Customer from './Customer';
import Product from './Product';

// Define Review Interface
interface IReview extends Document {
  customerId: mongoose.Types.ObjectId;
  rating: number;
  reviewText: string;
  productId: mongoose.Types.ObjectId;
  images: string[];
}

// Define Review Schema
const reviewSchema: Schema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: Customer, required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  images: { type: [String], required: true },
}, { timestamps: true });

// Export the Review model
const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);
export default Review;
