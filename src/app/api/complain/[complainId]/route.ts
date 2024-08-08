import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Complain from '@/lib/models/Complain';

export const GET = async (
  req: NextRequest,
  { params }: { params: { complainId: string } }
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const complain = await Complain.findById(params.complainId).populate('customerId');

    if (!complain) {
      return new NextResponse('Complain not found', { status: 404 });
    }

    return NextResponse.json(complain, { status: 200 });
  } catch (err) {
    console.log('[GET_COMPLAIN_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { complainId: string } }
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const { subject, description, status, customerId } = await req.json();

    if (!subject || !description || !status || !customerId) {
      return new NextResponse('All fields are required', { status: 400 });
    }

    const updatedComplain = await Complain.findByIdAndUpdate(
      params.complainId,
      { subject, description, status, customerId },
      { new: true }
    );

    if (!updatedComplain) {
      return new NextResponse('Complain not found', { status: 404 });
    }

    return NextResponse.json(updatedComplain, { status: 200 });
  } catch (err) {
    console.log('[PUT_COMPLAIN_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
