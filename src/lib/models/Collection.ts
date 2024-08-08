import mongoose, { Document, model, models, Schema } from 'mongoose';
import Category from './Category';

interface ICollection extends Document {
    name: string;
    description: string;
    image: string;
    categories: mongoose.Types.ObjectId[];
}

const CollectionSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: '' },
        image: { type: String, required: true },
        categories: [{ type: Schema.Types.ObjectId, ref: Category }],
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Collection = models.Collection || model('Collection', CollectionSchema);
export default Collection;
