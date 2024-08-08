import { productType } from "@/types/types";

type CollectionType = {
  _id: string;
  name: string;
  description: string;
  image: string;
  categories: mongoose.Types.ObjectId[] | CategoryType[];
  updatedAt: Date;
  createdAt: Date;
}

interface CategoryType {
  _id: string;
  isActive: boolean;
  name: string;
  description: string;
  parentCategory: mongoose.Types.ObjectId | null;
  image: string;
  updatedAt: Date;
  createdAt: Date;
}
type SizeChartEntryType = {
  size: string;
  measurements: Record<string, number>;
};

type SeoType = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  specialPrice?: number;
};

type ProductType = {
  _id: string;
  isActive: boolean;
  name: string;
  description?: string;
  shippingCost: number;
  offer?: string;
  sku: string;
  img: string[];
  mrp?: number;
  price: number;
  reviews: string[];
  seo: SeoType;
  sizeChart: SizeChartEntryType[];
  categories: CategoryType[];
  similarProducts?: ProductType[] | string[];
  variants: VariantType[];
  stock: number;
  remainingStock: number;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
};


type VariantType = {
  productId: string;
  _id: string;
  isActive: boolean;
  sort: number;
  name: string;
  sku: string;
  size: string;
  enableStock: boolean;
  enableUnitPrice: boolean;
  stock: number;
  remainingStock: number;
  mrp: number;
  price: number;
  img: string[];
  createdAt: Date;
  updatedAt: Date;
}


type OrderType = {
  orderNumber: string;
  _id: string;
  customerId?: string;
  isGuest: boolean;
  customerDetails: {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  totalAmount: number;
  orderStatus: string;
  orderItems: OrderItemType[];
  payment: {
    method: string;
    status: string;
    transactionId?: string;
  };
  orderDate: string;
  deliveryDate?: string;
  trackingNumber?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

type OrderItemType = {
  productId: ProductType;
  variantId?: VariantType;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}


type AddressTypeType = {
  isDefault: boolean;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type NotificationType = {
  message: string;
  seen: boolean;
};

type CurrentCartItemType = {
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
};

type CustomerType = {
  userId: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  addresses: AddressType[];
  gender: string;
  orderHistory: string[];
  notifications: NotificationType[];
  currentCart: CurrentCartItemType[];
  wishlist: string[];
  preferences: {
    receiveNewsletters: boolean;
    preferredCategoryIds: string[];
  };
};

type ReviewType = {
  _id: Types.ObjectId;
  customerId: CustomerType;
  rating: number;
  reviewText: string;
  productId: ProductType;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};