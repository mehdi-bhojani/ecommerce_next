import mongoose, { Document, Schema } from 'mongoose';
import orderItemSchema from './OrderItem';
import { isValidElement } from 'react';
import Customer from './Customer';

// Define Order Interface
interface IOrder extends Document {
  customerId?: mongoose.Types.ObjectId;
  isGuest: boolean;
  customerDetails?: {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
  };
  address?: {
    street: string;
    city: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  totalAmount: number;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderItems: typeof orderItemSchema[];
  payment: {
    method: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    transactionId?: string;
  };
  orderDate: Date;
  deliveryDate?: Date;
  trackingNumber?: string;
  orderNumber: string;
  isActive: boolean;
  isDeleted: boolean;
}

// Define Order Schema
const orderSchema: Schema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: Customer },
  isGuest: { type: Boolean, required: true },
  customerDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], required: true },
  orderItems: [orderItemSchema],
  payment: {
    method: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'], required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], required: true },
    transactionId: { type: String },
  },
  orderDate: { type: Date, required: true, default: Date.now },
  deliveryDate: { type: Date },
  trackingNumber: { type: String },
  orderNumber: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  isDeleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
export default Order;
