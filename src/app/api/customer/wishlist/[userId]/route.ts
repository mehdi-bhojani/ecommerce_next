import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Customer from '@/lib/models/Customer';
import Product from '@/lib/models/Product';

export const PUT = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const wishLists = await req.json();

    const updatedWishList = await Customer.findOneAndUpdate(
      { userId: params.userId }, // Corrected query
      { wishlist: wishLists },
      { new: true } // Returns the modified document
    );

    if (!updatedWishList) {
      return new NextResponse('Error saving wishlist', { status: 404 });
    }

    return NextResponse.json(updatedWishList, { status: 200 });
  } catch (err) {
    console.log('[PUT_CUSTOMER]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    // Fetch the wishlist IDs from the customer document
    const customer = await Customer.findOne({ userId: params.userId }, { wishlist: 1 });

    if (!customer || !customer.wishlist || customer.wishlist.length === 0) {
      return new NextResponse(null, { status: 200 });
    }

    // Fetch products using wishlist IDs with specific fields
    const products = await Product.find(
      { _id: { $in: customer.wishlist } },
      { _id: 1, img: { $slice: 1 }, name: 1, price: 1, mrp: 1, offer: 1 }
    );

    // Map products to ensure they have the correct structure
    const formattedProducts = products.map(product => ({
      _id: product._id,
      imgSrc: product.img[0],
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      offer: product.offer || 0
    }));

    return NextResponse.json(formattedProducts, { status: 200 });

  } catch (err) {
      console.log('[GET_wishList_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

