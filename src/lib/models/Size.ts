import mongoose, { Document, Schema } from 'mongoose';

// Define Size Interface
interface ISize extends Document {
  variantId: string;
  isActive: boolean;
  name: string;
  sku: string;
  enableStock: boolean;
  remainingStock?: number;
  enableUnitPrice: boolean;
  mrp?: number;
  price?: number;
}

// Define Size Schema
const sizeSchema: Schema = new Schema(
  {
    variantId: { type: Schema.Types.ObjectId, ref: 'Variant', required: true }, // Ensure Variant exists
    isActive: { type: Boolean, required: true },
    name: { type: String, required: true },
    sku: { type: String, required: true },
    enableStock: { type: Boolean, required: true },
    remainingStock: { type: Number, default: 0 }, // Optional field with default value
    enableUnitPrice: { type: Boolean, required: true },
    mrp: { type: Number, default: 0 }, // Optional field with default value
    price: { type: Number, default: 0 }, // Optional field with default value
  },
  { timestamps: true }
);

// Export the Size model
const Size = mongoose.models.Size || mongoose.model<ISize>('Size', sizeSchema);

export default Size;
