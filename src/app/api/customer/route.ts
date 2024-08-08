import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Customer from '@/lib/models/Customer';

export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // if (!token || !token.isAdmin) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }
    if (!token) {
        return new NextResponse('Unauthorized', { status: 401 });
      }

    await connectToDB();
    const customers = await Customer.find();
    return NextResponse.json(customers, { status: 200 });
  } catch (err) {
    console.log('[GET_CUSTOMERS]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};


export const POST = async (req: NextRequest) => {
    try {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
    if (!token) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
  
      await connectToDB();
  
      const {userId, isActive, firstName, lastName, email, username, phone, addresses, gender, orderHistory, notifications, currentCart, wishlist, preferences } = await req.json();
  
      if (!email ) {
        return new NextResponse('Email is required', { status: 400 });
      }
  
      const newCustomer = new Customer({
        userId,
        isActive,
        firstName,
        lastName,
        email,
        username,
        phone,
        addresses,
        gender,
        orderHistory,
        notifications,
        currentCart,
        wishlist,
        preferences
      });
  
      await newCustomer.save();
      return NextResponse.json(newCustomer, { status: 201 });
    } catch (err) {
      console.log('[POST_CUSTOMER]', err);
      return new NextResponse('Internal error', { status: 500 });
    }
  };
  