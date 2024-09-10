import { CartItemType } from "@/lib/types";
import { Children } from "react";
import KeyValuePair from "../hooks/useKeyValuePair";


export const PriceIntoCurrency = (price: number, currency:string) => {
    const Price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
      return Price;
}

export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export const formatOrderItems = (cartItems: CartItemType[]) => {
  return cartItems.map((item) => {
    return {
      productId: item.productId,
      variantId: item?.variantId || null, // Correctly handle optional variantId
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price*item.quantity,
    };
  });
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 10000);
  return `ORD-${timestamp}-${randomNumber}`;
};

export const createSlug = (name: string): string => {
  return name.toLowerCase().replace(/ /g, "-");
}

export const formatSlug = (slug: string): string => {
  return slug.replace(/-/g, " ");
}

export const convertToNavigation = (items: any, keyValue: Map<string,string>) => {
  const navigation = items.map((item) => {
    return {
      id: item.id,
      value:item.value,
      href: keyValue.get(item.value),
      children: item.children ? convertToNavigation(item.children, keyValue) : [],
    };
  });
  return navigation;
}

export const extractMapFromNavigation = (items: any) => {
  const { addKeyValuePair } = KeyValuePair();
  items.map((item: any) => {
    addKeyValuePair(item.value, item.href);
    if(item.children.length>1){
      extractMapFromNavigation(item.children);
    }
  });
}