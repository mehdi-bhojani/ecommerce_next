import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Order from '@/lib/models/Order';

// GET a single order by id (authorized)
export const GET = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const order = await Order.findById(params.orderId)
    .populate({
      path: 'orderItems.productId',
      select: 'name', // Fields to include from the Product model
    })
    .populate({
      path: 'orderItems.variantId',
      match: { $ne: null }, // Optionally match documents
      select: 'name size', // Fields to include from the Variant model
    });
  

    if (!order) {
      return new NextResponse('Order not found', { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.log('[GET_ORDER_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
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
      isActive
    } = await req.json();

    // if (
    //   !customerId ||
    //   !customerDetails ||
    //   !address ||
    //   !totalAmount ||
    //   !orderStatus ||
    //   !orderItems ||
    //   !payment ||
    //   !orderDate ||
    //   !isActive
    // ) {
    //   return new NextResponse('All required fields must be provided', { status: 400 });
    // }

    const updatedOrder = await Order.findByIdAndUpdate(
      params.orderId,
      {
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
        isActive
      },
      { new: true }
    );

    if (!updatedOrder) {
      return new NextResponse('Order not found', { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (err) {
    console.log('[PUT_ORDER_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    // Find the order by ID
    const order = await Order.findById(params.orderId);

    if (!order) {
      return new NextResponse('Order not found', { status: 404 });
    }

    // Soft delete the order by setting isActive to false
    order.isActive = false;
    await order.save();

    return NextResponse.json({ message: 'Order successfully deleted' }, { status: 200 });
  } catch (err) {
    console.log('[DELETE_ORDER_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};