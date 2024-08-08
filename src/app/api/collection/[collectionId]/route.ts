import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import { getToken } from "next-auth/jwt";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionId)
      .populate({ path: "categories", model: "Category" })

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    let collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse('Collection not found', { status: 404 });
    }

    const { name, description, image, categories } = await req.json();

    if (!name || !image) {
      return new NextResponse('Name and image are required', { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { name, description, image, categories },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log('[collectionId_PUT]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    await Collection.findByIdAndUpdate(params.collectionId, { isDeleted: true });

    // await Product.updateMany(
    //   { collections: params.collectionId },
    //   { $pull: { collections: params.collectionId } }
    // );

    return new NextResponse('Collection is deleted', { status: 200 });
  } catch (err) {
    console.log('[collectionId_DELETE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const dynamic = "force-dynamic";
