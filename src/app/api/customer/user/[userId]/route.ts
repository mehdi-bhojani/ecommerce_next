import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectToDB } from "@/lib/mongoDB";
import Customer from "@/lib/models/Customer";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      userId,
      isActive,
      firstName,
      lastName,
      email,
      username,
      phone,
      addresses,
      gender,
      password,
      orderHistory,
      notifications,
      currentCart,
      wishlist,
      preferences,
    } = await req.json();

    const updatedCustomer = await Customer.findOneAndUpdate(
      { userId: params.userId },
      {
        userId,
        isActive,
        firstName,
        lastName,
        email,
        username,
        phone,
        addresses,
        gender,
        password,
        orderHistory,
        notifications,
        currentCart,
        wishlist,
        preferences,
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return new NextResponse("Customer not found", { status: 404 });
    }

    return NextResponse.json(updatedCustomer, { status: 200 });
  } catch (err) {
    console.log("[PUT_CUSTOMER]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // if (!token || !token.isAdmin) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const customer = await Customer.findOne({ userId: params.userId })
    .populate("orderHistory");

    if (!customer) {
      return new NextResponse("Customer not found", { status: 404 });
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (err) {
    console.log("[GET_CUSTOMER_BY_ID]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
