import mongoose, { Document, Schema } from 'mongoose';
import Product from './Product';

// Define Variant Interface
interface IVariant extends Document {
  productId: string;
  isActive: boolean;
  sort: number;
  name: string;
  sku: string;
  size: string;
  enableStock: boolean;
  enableUnitPrice: boolean;
  stock: number;
  remainingStock: number;
  mrp: number;
  price: number;
  img: string[];
}

// Define Variant Schema
const variantSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product'},
  isActive: { type: Boolean, required: true },
  sort: { type: Number, required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  size: { type: String, required: true },
  enableStock: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  remainingStock: { type: Number, required: true },
  enableUnitPrice: { type: Boolean, required: true },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  img: { type: [String], required: true },
}, { timestamps: true });

// Export the Variant model
const Variant = mongoose.models.Variant || mongoose.model<IVariant>('Variant', variantSchema);

export default Variant;
