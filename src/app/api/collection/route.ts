import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const collections = await Collection.find()
    .populate({ path: "categories", model: "Category" })
    .where({ isDeleted: false });

    return NextResponse.json(collections, { status: 200 });
  } catch (err) {
    console.log("[collections_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    await connectToDB();

    const { name, description, image, categories } = await req.json();

    const existingCollection = await Collection.findOne({ name });

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    if (!name || !image) {
      return new NextResponse("Name and image are required", { status: 400 });
    }

    const newCollection = await Collection.create({
      name,
      image,
      ...(description && { description }),
      ...(categories && { categories }),
    });

    await newCollection.save();

    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    console.log("[collections_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


export const dynamic = "force-dynamic";
