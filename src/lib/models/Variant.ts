import mongoose, { Document, Schema } from 'mongoose';
import Size from './Size';

// Define Variant Interface
interface IVariant extends Document {
  productId: string;
  isActive: boolean;
  sort: number;
  name: string;
  sku: string;
  sizes: string[];
  enableStock: boolean;
  enableUnitPrice: boolean;
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
  sizes: [{ type: Schema.Types.ObjectId, ref: Size }],
  enableStock: { type: Boolean, required: true },
  remainingStock: { type: Number, required: true },
  enableUnitPrice: { type: Boolean, required: true },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  img: { type: [String], required: true },
}, { timestamps: true });

// Export the Variant model
const Variant = mongoose.models.Variant || mongoose.model<IVariant>('Variant', variantSchema);

export default Variant;
