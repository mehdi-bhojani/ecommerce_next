import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import { getToken } from 'next-auth/jwt';
import Store from '@/lib/models/Store';

// GET /api/store
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const store = await Store.findOne({});
    if (!store) {
      return new NextResponse('Store not found', { status: 404 });
    }
    return NextResponse.json(store, { status: 200 });
  } catch (err) {
    console.log('[GET_STORE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

// PUT /api/store
export const PUT = async (req: NextRequest) => {
  try {
    // Retrieve token for authorization
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check if the user is authenticated
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if the user has admin role
    // if (token.role !== 'admin') {
    //   return new NextResponse('Forbidden', { status: 403 });
    // }

    await connectToDB();

    const { storeSettings, paymentMethod, socialMediaLinks, legal } = await req.json();

    const updatedStore = await Store.findOneAndUpdate(
      {},
      { storeSettings, paymentMethod, socialMediaLinks, legal },
      { new: true, upsert: true } // `upsert: true` will create the document if it does not exist
    );

    return NextResponse.json(updatedStore, { status: 200 });
  } catch (err) {
    console.log('[PUT_STORE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
