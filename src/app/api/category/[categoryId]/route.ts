import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { connectToDB } from '@/lib/mongoDB';
import Category from '@/lib/models/Category';


export const GET = async (req: NextRequest, { params }: { params: { categoryId: string } }) => {
  try {
    await connectToDB();

    const category = await Category.findById(params.categoryId).populate('parentCategory');

    if (!category) {
      return new NextResponse('Category not found', { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log('[GET_CATEGORY]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { categoryId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const { name, description, parentCategory, image } = await req.json();

    if (!name || !image) {
      return new NextResponse('Name and image URL are required', { status: 400 });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      params.categoryId,
      { name, description, parentCategory, image },
      { new: true }
    );

    if (!updatedCategory) {
      return new NextResponse('Category not found', { status: 404 });
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (err) {
    console.log('[PUT_CATEGORY]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};


export const DELETE = async (req: NextRequest, { params }: { params: { categoryId: string } }) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const updatedCategory = await Category.findByIdAndUpdate(
      params.categoryId,
      { isDeleted: true },
      { new: true }
    );

    if (!updatedCategory) {
      return new NextResponse('Category not found', { status: 404 });
    }

    return new NextResponse('Category has been soft deleted', { status: 200 });
  } catch (err) {
    console.log('[DELETE_CATEGORY_BY_ID]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
