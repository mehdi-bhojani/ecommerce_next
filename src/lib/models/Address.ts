import mongoose, { Document, Schema } from 'mongoose';

// Define Address Interface
interface IAddress extends Document {
  isDefault: boolean;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Define Address Schema
const addressSchema: Schema = new Schema({
  isDefault: { type: Boolean},
  street: { type: String},
  city: { type: String},
  state: { type: String},
  postalCode: { type: String},
  country: { type: String},
});

export default addressSchema;
