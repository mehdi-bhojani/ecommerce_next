import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import Variant from '@/lib/models/Variant'; // Adjust the import path as needed
import Product from '@/lib/models/Product'; // Adjust the import path as needed
import mongoose from 'mongoose';
import { connectToDB } from '@/lib/mongoDB';

export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const { 
      productId, 
      isActive, 
      sort, 
      name, 
      sku, 
      size, 
      enableStock, 
      stock, 
      remainingStock, 
      enableUnitPrice, 
      mrp, 
      price, 
      img 
    } = await req.json();

    if (!productId || !name || !sku || !size) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create the new variant
      const newVariant = new Variant({
        productId,
        isActive,
        sort,
        name,
        sku,
        size,
        enableStock,
        stock,
        remainingStock,
        enableUnitPrice,
        mrp,
        price,
        img
      });

      // Save the new variant
      await newVariant.save({ session });

      // Update the product to include the new variant's ID
      await Product.findByIdAndUpdate(
        productId,
        { $push: { variants: newVariant._id } },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();

      return NextResponse.json(newVariant, { status: 201 });
    } catch (error) {
      // If an error occurred, abort the transaction
      await session.abortTransaction();
      throw error;
    } finally {
      // End the session
      session.endSession();
    }
  } catch (err) {
    console.log('[POST_VARIANT]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
