import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/lib/mongoDB';
import Complain from '@/lib/models/Complain';


export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const complains = await Complain.find()
    // .populate('customerId');

    return NextResponse.json(complains, { status: 200 });
  } catch (err) {
    console.log('[GET_COMPLAINS]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
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

    const newComplain = new Complain({
      subject,
      description,
      status,
      customerId,
    });

    await newComplain.save();

    return NextResponse.json(newComplain, { status: 201 });
  } catch (err) {
    console.log('[POST_COMPLAIN]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
