import mongoose, { Document, Schema } from 'mongoose';

// Define Category Interface
interface ICategory extends Document {
  isActive: boolean;
  name: string;
  description: string;
  parentCategory: mongoose.Types.ObjectId | null;
  image: string;
  isDeleted: boolean;
}

// Define Category Schema
const CategorySchema: Schema = new Schema(
  {
    isActive: { type: Boolean, default: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    parentCategory: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    image: { type: String},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Export the Category model
const Category =  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
