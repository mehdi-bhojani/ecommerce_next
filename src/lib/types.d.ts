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
  reviews: ReviewType[];
  seo: SeoType;
  sizeChart: SizeChartEntryType[];
  categories: CategoryType[];
  similarProducts?: ProductType[];
  variants: VariantType[];
  enableStock: boolean;
  remainingStock: number;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
  //to be add
  brand: string;
};


type VariantType = {
  productId: string;
  _id: string;
  isActive: boolean;
  sort: number;
  name: string;
  sku: string;
  sizes: SizeType[];
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

type SizeType = {
  _id: string;
  variantId: string;
  isActive: boolean;
  name: string;
  sku: string;
  enableStock: boolean;
  remainingStock?: number;
  enableUnitPrice: boolean;
  mrp?: number;
  price?: number;
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
  productId: ProductType;
  variantId: VariantType;
  quantity: number;
  unitPrice: number;
};

type CustomerType = {
  _id: string;
  userId: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  addresses: AddressType[];
  gender: string;
  orderHistory:  OrderType[];
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

interface CartItemType {
  _id?:string;
  imgSrc: string,
  name: string,
  price: number,
  mrp: number,
  SelectSize: string,
  slug: string,
  productId: string,
  variantId: string,
  variantName: string,
  size: string,
  sizeId: string,
  quantity: number,

  // imgSrc: string,
  // name: string,
  // price: number,
  // mrp: number,
  // offer?: string,
  // SelectSize?: string,
  // allSizes?: any[],
  // slug?: string,
  // productId: string,
  // variantId?: string,
  // quantity?: number,
}
interface WishItemType {
  _id:string;
  imgSrc: string,
  name: string,
  price: number,
  mrp: number,
  offer: string,
}

// Currency Type
interface CurrencyType {
  default: string; // Default currency, e.g., "USD"
};

// Store Settings Type
interface StoreSettingsType {
  name: string; // Store name
  description: string; // Store description
  logo?: string; // URL to the store logo
  mobileLogo?: string; // URL to the mobile version of the logo
  favicon?: string; // URL to the favicon
  currency: Currency; // Currency settings
};

// Payment Method Type
interface PaymentMethodType {
  name: string; // Name of the payment method, e.g., "Stripe"
  enabled: boolean; // Whether the payment method is enabled
  publicKey?: string; // Public key for the payment gateway (if applicable)
  secretKey?: string; // Secret key for the payment gateway (if applicable)
};

// Social Media Links Type
interface SocialMediaLinksType {
  facebook?: string; // URL to Facebook page
  instagram?: string; // URL to Instagram page
  twitter?: string; // URL to Twitter page
};

// Legal Documents Type
interface LegalType {
  privacyPolicy?: string; // URL to privacy policy document
  termsAndConditions?: string; // URL to terms and conditions document
  refundPolicy?: string; // URL to refund policy document
};

// Main E-commerce Store Settings Type
interface StoreType {
  storeSettings: StoreSettingsType; // General store settings
  paymentMethod: PaymentMethodType; // Payment method settings
  socialMediaLinks: SocialMediaLinksType; // Social media links
  legal: LegalType; // Legal documents
};


interface navigationType {
  id: number;
  value: string;
  href: string;
  children: navigationType[];
  _id: string;
}
