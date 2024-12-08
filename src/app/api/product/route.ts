import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import Product from '@/lib/models/Product';
import { getToken } from 'next-auth/jwt';

// GET /api/products
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const products = await Product.find({ isDelete: false, isActive: true })
    .populate('categories');
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log('[GET_PRODUCTS]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};


// POST /api/products
export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const {
      isActive,
      name,
      description,
      shippingCost,
      offer,
      sku,
      img,
      enableStock,
      remainingStock,
      mrp,
      price,
      reviews,
      seo,
      sizeChart,
      brand,
      categories,
      similarProducts,
      variants,
    } = await req.json();

    if (!name || !sku || !price) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const newProduct = new Product({
      isActive,
      name,
      description,
      shippingCost,
      offer,
      sku,
      img,
      enableStock,
      remainingStock,
      mrp,
      price,
      reviews,
      seo,
      sizeChart,
      brand,
      categories,
      similarProducts,
      variants,
    });

    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.log('[POST_PRODUCT]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
