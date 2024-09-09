import mongoose, { Document, Schema } from 'mongoose';
// Currency Schema
const CurrencySchema = new Schema({
    default: {
        type: String,
        default: "USD",
    },
});

// Store Settings Schema
const StoreSettingsSchema = new Schema({
    name: {
        type: String,
        default: "E-commerce Store",
    },
    description: {
        type: String,
        default: "E-commerce Store Description",
    },
    logo: {
        type: String,
    },
    mobileLogo: {
        type: String,
    },
    favicon: {
        type: String,
    },
    currency: CurrencySchema,
});

// Payment Methods Schema
const PaymentMethodSchema = new Schema({
    name: {
        type: String,
        default: "Stripe",
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    publicKey: {
        type: String,
        default: "",
    },
    secretKey: {
        type: String,
        default: "",
    },
});

// Social Media Links Schema
const SocialMediaLinksSchema = new Schema({
    facebook: {
        type: String,
        default: "",
    },
    instagram: {
        type: String,
        default: "",
    },
    twitter: {
        type: String,
        default: "",
    },
});

// Legal Documents Schema
const LegalSchema = new Schema({
    privacyPolicy: {
        type: String,
        default: "",
    },
    termsAndConditions: {
        type: String,
        default: "",
    },
    refundPolicy: {
        type: String,
        default: "",
    },
});

// Main E-commerce Settings Schema
const StoreSetting = new Schema({
    storeSettings: StoreSettingsSchema,
    paymentMethod: PaymentMethodSchema, // Assuming only one payment method (Stripe)
    socialMediaLinks: SocialMediaLinksSchema,
    legal: LegalSchema,
});

const Store = mongoose.models.Store || mongoose.model("Store", StoreSetting);
export default Store;