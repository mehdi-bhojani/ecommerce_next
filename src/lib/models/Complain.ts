import mongoose, { Document, Schema } from 'mongoose';

// Define Complain Interface
interface IComplain extends Document {
  subject: string;
  description: string;
  status: string;
  customerId: mongoose.Types.ObjectId;
}

// Define Complain Schema
const complainSchema: Schema = new Schema(
  {
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  },
  { timestamps: true }
);

// Export the Complain model
const Complain = mongoose.models.Complain || mongoose.model<IComplain>('Complain', complainSchema);
export default Complain;
