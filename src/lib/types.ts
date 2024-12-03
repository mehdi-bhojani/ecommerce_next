export interface ProductType {
  _id: string;
  name: string;
  brand?: string;
  description: string;
  price: number;
  mrp?: number;
  offer?: string;
  sku: string;
  img: string[];
  variants: VariantType[];
  reviews?: ReviewType[];
  similarProducts?: ProductType[];
  sizeGuide?: string;
  customization?: {
    fabrics: {
      name: string;
      options: string[];
    }[];
    colors: {
      name: string;
      code: string;
      inStock: boolean;
    }[];
  };
}

export interface VariantType {
  _id?: string;
  name: string;
  size: string;
  img: string[];
  remainingStock: number;
}

export interface ReviewType {
  userId: string;
  rating: number;
  comment: string;
  date: Date;
}