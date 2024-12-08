import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Review from '@/lib/models/Review';
import { getCustomerId } from '@/lib/actions/auth.actions';
import mongoose from 'mongoose';
import Product from '@/lib/models/Product';
import Customer from '@/lib/models/Customer';

// GET all reviews (authorized)
export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const reviews = await Review.find()
      // .populate('customerId').populate('productId');
      .populate('customerId');

    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    console.log('[GET_REVIEWS]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

// POST a review (authorized)
export const POST = async (req: NextRequest) => {
  const session = await mongoose.startSession();
  session.startTransaction(); // Start transaction here
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB(); // Ensure database connection

    const { userId, rating, reviewText, productId, images } = await req.json();

    // const customerId = await getCustomerId(userId);
    const customerId = await Customer.findOne({ userId: userId }).select('customerId');
    // console.log("Customer Id is: "+customerId);
    if (!customerId || !rating || !reviewText || !productId ) {
      return new NextResponse('All fields are required', { status: 400 });
    }

    const newReview = await new Review({
      customerId,
      rating,
      reviewText,
      productId,
      images,
    });

    await newReview.save({ session }); // Save review within the transaction

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: newReview._id },
    }, { session }); // Update product within the transaction

    await session.commitTransaction(); // Commit transaction
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    await session.abortTransaction(); // Abort transaction on error
    console.error('Transaction failed:', error);
    return new NextResponse('Transaction failed', { status: 500 });
  } finally {
    session.endSession(); // End session
  }
};
