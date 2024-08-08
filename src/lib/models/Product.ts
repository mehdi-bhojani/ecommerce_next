import { Schema, model, models } from 'mongoose';
import Variant from './Variant';
import Category from './Category';
import Review from './Review';

const sizeChartEntrySchema = new Schema({
  size: { type: String, required: true },
  measurements: { type: Map, of: Number, required: true }
});

const productSchema = new Schema({
  isActive: { type: Boolean, default: true },
  name: { type: String, required: true },
  description: { type: String },
  shippingCost: { type: Number, default: 0 },
  offer: { type: String, default: '' },
  sku: { type: String, required: true },
  img: { type: [String] },
  mrp: { type: Number },
  price: { type: Number, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: Review }],
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    specialPrice: { type: Number },
  },
  sizeChart: [sizeChartEntrySchema],
  categories: [{ type: Schema.Types.ObjectId, ref: Category }],
  similarProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  variants: [{ type: Schema.Types.ObjectId, ref: Variant }],
  isDelete: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  remainingStock: { type: Number, default: 0 },
}, { timestamps: true });

const Product = models.Product || model('Product', productSchema);
export default Product;
