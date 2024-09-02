import mongoose, { Document, Schema } from 'mongoose';

// Define CurrentCart Interface
interface ICurrentCart extends Document {
  productId: mongoose.Types.ObjectId;
  variantId: mongoose.Types.ObjectId;
  quantity: number;
  unitPrice: number;
}

// Define Current Cart Schema
const currentCartSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  variantId: { type: Schema.Types.ObjectId, ref: 'Variant', required: false },
  quantity: { type: Number , default: 1 },
  unitPrice: { type: Number , required: true },
});

export default currentCartSchema;
