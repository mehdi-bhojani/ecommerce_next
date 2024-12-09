import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Variant from '@/lib/models/Variant';
import Product from '@/lib/models/Product'; // Adjust the import path as needed

export const GET = async (req: NextRequest, { params }: { params: { variantId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      // return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const variant = await Variant.findById(params.variantId)
      .populate('sizes')

    if (!variant) {
      return new NextResponse('Variant not found', { status: 404 });
    }

    return NextResponse.json(variant, { status: 200 });

  } catch (err) {
    console.log('[GET_VARIANT_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { variantId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const { isActive, sort,enableStock, name, sku, remainingStock ,sizes, enableUnitPrice, mrp, price, img } = await req.json();

    if (!name || !sku || !enableStock || !enableUnitPrice || !img) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const updatedVariant = await Variant.findByIdAndUpdate(
      params.variantId,
      { isActive, sort, name, sku, sizes, remainingStock,enableStock, enableUnitPrice, mrp, price, img },
      { new: true }
    );
    console.log(updatedVariant)
    if (!updatedVariant) {
      return new NextResponse('Variant not found', { status: 404 });
    }

    return NextResponse.json(updatedVariant, { status: 200 });
  } catch (err) {
    console.log('[PUT_VARIANT_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { variantId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const variant = await Variant.findById(params.variantId);

    if (!variant) {
      return new NextResponse('Variant not found', { status: 404 });
    }

    const productId = variant.productId;

    // Start a session for the transaction
    const session = await Variant.startSession();
    session.startTransaction();

    try {
      // Delete the variant
      await Variant.findByIdAndDelete(params.variantId).session(session);

      // Update the product to remove the variant reference
      await Product.findByIdAndUpdate(
        productId,
        { $pull: { variants: params.variantId } },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();
    } catch (error) {
      // If an error occurred, abort the transaction
      await session.abortTransaction();
      throw error;
    } finally {
      // End the session
      session.endSession();
    }

    return NextResponse.json({ message: 'Variant deleted successfully' }, { status: 200 });
  } catch (err) {
    console.log('[DELETE_VARIANT_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};