import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import Product from '@/lib/models/Product';
import { getToken } from 'next-auth/jwt';

// GET /api/products/[productId]
export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId)
    .populate('categories')
    .populate('variants');
    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log('[GET_PRODUCT_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

// PUT /api/products/[productId]
export const PUT = async (req: NextRequest, { params }: { params: { productId: string } }) => {
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
      mrp,
      price,
      reviews,
      seo,
      sizeChart,
      categories,
      similarProducts,
      variants,
      isDelete,
      stock,
      remainingStock,
    } = await req.json();

    if (!name || !sku || !price) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      params.productId,
      {
        isActive,
        name,
        description,
        shippingCost,
        offer,
        sku,
        img,
        mrp,
        price,
        reviews,
        seo,
        sizeChart,
        categories,
        similarProducts,
        variants,
        isDelete,
        stock,
        remainingStock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return new NextResponse('Product not found', { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log('[PUT_PRODUCT_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

// DELETE /api/products/[productId]
export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const product = await Product.findByIdAndUpdate(
      params.productId,
      { isDelete: true },
      { new: true }
    );

    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    return NextResponse.json({ message: 'Product soft deleted successfully' }, { status: 200 });
  } catch (err) {
    console.log('[DELETE_PRODUCT_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
