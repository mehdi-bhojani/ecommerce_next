import mongoose, { Document, Schema } from 'mongoose';

// Define Notification Interface
interface INotification extends Document {
  message: string;
  seen: boolean;
}

// Define Notification Schema
const notificationSchema: Schema = new Schema({
  message: { type: String},
  seen: { type: Boolean},
});

export default notificationSchema;
