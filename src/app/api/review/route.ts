import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Review from '@/lib/models/Review';

// GET all reviews (authorized)
export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const reviews = await Review.find()
    .populate('customerId').populate('productId');

    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    console.log('[GET_REVIEWS]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

// POST create a new review (authorized)
export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const { customerId, rating, reviewText, productId, images } = await req.json();

    if (!customerId || !rating || !reviewText || !productId || !images) {
      return new NextResponse('All fields are required', { status: 400 });
    }

    const newReview = new Review({
      customerId,
      rating,
      reviewText,
      productId,
      images,
    });

    await newReview.save();

    return NextResponse.json(newReview, { status: 201 });
  } catch (err) {
    console.log('[POST_REVIEW]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
