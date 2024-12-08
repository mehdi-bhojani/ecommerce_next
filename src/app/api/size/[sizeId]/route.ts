import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Variant from '@/lib/models/Variant';
import Product from '@/lib/models/Product'; // Adjust the import path as needed
import Size from '@/lib/models/Size';
import mongoose from 'mongoose';

export const GET = async (req: NextRequest, { params }: { params: { sizeId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const size = await Size.findById(params.sizeId);

    if (!size) {
      return new NextResponse('size not found', { status: 404 });
    }

    return NextResponse.json(size, { status: 200 });
  } catch (err) {
    console.log('[GET_VARIANT_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

// export const PUT = async (req: NextRequest, { params }: { params: { sizeId: string } }) => {
//   try {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//     if (!token) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }

//     await connectToDB();

//     const { isActive, name, sku, enableStock, enableUnitPrice, remainingStock, mrp, price, img } = await req.json();

//     if (!name || !sku || enableStock || enableUnitPrice) {
//       return new NextResponse('Missing required fields', { status: 400 });
//     }

//     const updatedSize = await Variant.findByIdAndUpdate(
//       params.sizeId,
//       { isActive, enableStock ,remainingStock, name, sku, enableUnitPrice, mrp, price},
//       { new: true }
//     );
//     console.log(updatedSize)
//     if (!updatedSize) {
//       return new NextResponse('Size not found', { status: 404 });
//     }
//     return NextResponse.json(updatedSize, { status: 200 });

//   } catch (err) {
//     console.log('[PUT_SIZE_BY_ID]', err);
//     return new NextResponse('Internal error', { status: 500 });
//   }
// };

export const PUT = async (req: NextRequest, { params }: { params: { sizeId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const { isActive, name, sku, enableStock, enableUnitPrice, remainingStock, mrp, price } = await req.json();

    // Validate required fields
    if (
      name === undefined || 
      sku === undefined || 
      enableStock === undefined || 
      enableUnitPrice === undefined
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Update the size record
    const updatedSize = await Size.findByIdAndUpdate(
      params.sizeId,
      { isActive, name, sku, enableStock, enableUnitPrice, remainingStock, mrp, price },
      { new: true, runValidators: true } // Ensure schema validation and return the updated document
    );

    if (!updatedSize) {
      return new NextResponse('Size not found', { status: 404 });
    }

    return NextResponse.json(updatedSize, { status: 200 });

  } catch (err) {
    console.error('[PUT_SIZE_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { sizeId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const size = await Size.findById(params.sizeId);
    if (!size) {
      return new NextResponse('Size not found', { status: 404 });
    }

    const variantId = size.variantId;

    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Delete the size
      await Size.findByIdAndDelete(params.sizeId).session(session);

      // Update the variant to remove the size reference
      await Variant.findByIdAndUpdate(
        variantId,
        { $pull: { sizes: params.sizeId } },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();

      return NextResponse.json({ message: 'Size deleted successfully' }, { status: 200 });
    } catch (error) {
      // If an error occurred, abort the transaction
      await session.abortTransaction();
      console.error('[DELETE_SIZE_BY_ID_TRANSACTION]', error);
      throw error;
    } finally {
      // End the session
      session.endSession();
    }
  } catch (err) {
    console.error('[DELETE_SIZE_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
