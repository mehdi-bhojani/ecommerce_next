import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Order from '@/lib/models/Order';
import { generateOrderNumber } from '@/shared/helpers/generateOrderNumber';

// GET all orders (authorized)
export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const orders = await Order.find();
      // Uncomment and adjust the line below if you want to populate related fields
      

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.log('[GET_ORDERS]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
// POST create a new order (authorized)
export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const {
      customerId,
      isGuest,
      customerDetails,
      address,
      totalAmount,
      orderStatus,
      orderItems,
      payment,
      orderDate,
      deliveryDate,
      trackingNumber,
      isActive,
    } = await req.json();

    if (
      !customerId ||
      !customerDetails ||
      !address ||
      !totalAmount ||
      !orderStatus ||
      !orderItems ||
      !payment ||
      !orderDate 
    ) {
      return new NextResponse('All required fields must be provided', { status: 400 });
    }

    const orderNumber = await generateOrderNumber();

    const newOrder = new Order({
      customerId,
      isGuest,
      customerDetails,
      address,
      totalAmount,
      orderStatus,
      orderItems,
      payment,
      orderDate,
      deliveryDate,
      trackingNumber,
      orderNumber,
    });

    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    console.log('[POST_ORDER]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};