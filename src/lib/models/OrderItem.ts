import mongoose, { Document, Schema } from 'mongoose';
import Product from './Product';
import Variant from './Variant';

// Define OrderItem Interface
interface IOrderItem extends Document {
  productId: mongoose.Types.ObjectId;
  variantId?: mongoose.Types.ObjectId;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Define OrderItem Schema
const orderItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: Product, required: true },
  variantId: { type: Schema.Types.ObjectId, ref: Variant},
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

export default orderItemSchema;
