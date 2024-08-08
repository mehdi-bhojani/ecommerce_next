import mongoose, { Document, Schema } from 'mongoose';
import addressSchema from './Address';
import notificationSchema from './Notification';
import currentCartSchema from './CurrentCart';
import { UserModel } from './user';

// Define Customer Interface
interface ICustomer extends Document {
  userId: mongoose.Types.ObjectId;
  isActive: boolean;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  addresses: typeof addressSchema[];
  gender: string;
  orderHistory: mongoose.Types.ObjectId[];
  notifications: typeof notificationSchema[];
  currentCart: typeof currentCartSchema[];
  wishlist: mongoose.Types.ObjectId[];
  preferences: {
    receiveNewsletters: boolean;
    preferredCategoryIds: mongoose.Types.ObjectId[];
  };
}

// Define Customer Schema
const customerSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: UserModel },
  isActive: { type: Boolean },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  phone: { type: String },
  addresses: [addressSchema],
  gender: { type: String },
  orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  notifications: [notificationSchema],
  currentCart: [currentCartSchema],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  preferences: {
    receiveNewsletters: { type: Boolean },
    preferredCategoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  },
}, { timestamps: true });

const Customer = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', customerSchema);
export default Customer;
