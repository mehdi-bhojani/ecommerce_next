import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { connectToDB } from "@/lib/mongoDB";
import Category from "@/lib/models/Category";
import { getToken } from "next-auth/jwt";

// GET request to fetch all categories
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const categories = await Category.find()
      .populate({ path: "parentCategory", model: "Category" })
      .where({isDeleted: false});
      ;

    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.log("[categories_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// POST request to create a new category
export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    const { name, description, parentCategory, image } = await req.json(); 

    if (!name ) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const newCategory = new Category({
      name,
      description,
      parentCategory,
      image,
    });

    await newCategory.save();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (err) {
    console.log('[POST_CATEGORY]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};