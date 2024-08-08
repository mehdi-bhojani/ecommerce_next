import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Review from '@/lib/models/Review';

// GET a single review by id (authorized)
export const GET = async (req: NextRequest, { params }: { params: { reviewId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const review = await Review.findById(params.reviewId)
    // .populate('customerId').populate('productId');

    if (!review) {
      return new NextResponse('Review not found', { status: 404 });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (err) {
    console.log('[GET_REVIEW_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

// PUT update a review by id (authorized)
export const PUT = async (req: NextRequest, { params }: { params: { reviewId: string } }) => {
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

    const updatedReview = await Review.findByIdAndUpdate(
      params.reviewId,
      {
        customerId,
        rating,
        reviewText,
        productId,
        images,
      },
      { new: true }
    );

    if (!updatedReview) {
      return new NextResponse('Review not found', { status: 404 });
    }

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (err) {
    console.log('[PUT_REVIEW_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { reviewId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const deletedReview = await Review.findByIdAndDelete(params.reviewId);

    if (!deletedReview) {
      return new NextResponse('Review not found', { status: 404 });
    }

    return NextResponse.json({ message: 'Review deleted successfully' }, { status: 200 });
  } catch (err) {
    console.log('[DELETE_REVIEW_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
