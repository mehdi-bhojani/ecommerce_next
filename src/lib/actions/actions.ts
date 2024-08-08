"use server"

import mongoose from "mongoose";
import Customer from "../models/Customer";
import Order from "../models/old/oldOrder";
import Product from "../models/Product";
import { connectToDB } from "../mongoDB"

export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find()
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)
  return { totalOrders, totalRevenue }
}

export const getTotalCustomers = async () => {
  await connectToDB();
  const customers = await Customer.find()
  const totalCustomers = customers.length
  return totalCustomers
}

export const getSalesPerMonth = async () => {
  await connectToDB()
  const orders = await Order.find()

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    // For June
    // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
    return acc
  }, {})

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    // if i === 5 => month = "Jun"
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}


export const getProductsFiltered = async (limit: number, offset: number, categoryId?: string[]) => {
  await connectToDB();

  let products;

  if (categoryId && categoryId.length > 0) {
    // Filter out invalid ObjectId values
    const validCategoryIds = categoryId.filter(id => mongoose.Types.ObjectId.isValid(id));
    
    products = await Product.find({ categories: { $in: validCategoryIds } })
      .skip(offset)
      .limit(limit);
  } else {
    products = await Product.find()
      .skip(offset)
      .limit(limit);
  }

  console.log(products, "is the products");

  const totalProducts = await Product.countDocuments(categoryId && categoryId.length > 0 ? { categories: { $in: categoryId } } : {});
  const hasMoreProducts = (offset + limit) < totalProducts;

  return {
    products: JSON.parse(JSON.stringify(products)),
    hasMoreProducts,
  };
};