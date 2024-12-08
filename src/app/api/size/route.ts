import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import Size from '@/lib/models/Size'; // Adjust the import path as needed
import Product from '@/lib/models/Product'; // Adjust the import path as needed
import mongoose from 'mongoose';
import { connectToDB } from '@/lib/mongoDB';
import Variant from '@/lib/models/Variant';

export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const { 
      variantId, 
      isActive,
      name, 
      sku, 
      enableStock, 
      remainingStock, 
      enableUnitPrice, 
      mrp, 
      price 
    } = await req.json();

    // Validate required fields
    if (!variantId || !name || !sku) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create the new size
      const newSize = new Size({
        variantId,
        isActive,
        name,
        sku,
        enableStock,
        remainingStock,
        enableUnitPrice,
        mrp,
        price,
      });

      // Save the new size
      await newSize.save({ session });

      // Update the associated variant or product to include the new size's ID
      await Variant.findByIdAndUpdate(
        variantId, // Assuming variantId maps to a field in the Product model
        { $push: { sizes: newSize._id } }, // Adjust the path based on your schema
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();

      return NextResponse.json(newSize, { status: 201 });
      
    } catch (error) {
      // If an error occurred, abort the transaction
      await session.abortTransaction();
      throw error;
    } finally {
      // End the session
      session.endSession();
    }
  } catch (err) {
    console.error('[POST_SIZE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
