import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { query: string } }) => {
  try {
    await connectToDB();

    // Step 1: Find categories that match the search query
    const matchingCategories = await Category.find({
      name: { $regex: params.query, $options: "i" }
    });

    // Extract the IDs of matching categories
    const categoryIds = matchingCategories.map((category) => category._id);

    // Step 2: Search for products with matching categories, names, or descriptions
    const searchedProducts = await Product.find({
      $or: [
        { name: { $regex: params.query, $options: "i" } },
        { description: { $regex: params.query, $options: "i" } },
        { categories: { $in: categoryIds } }
      ]
    }, {
      // Projection to include only specified fields
      img: 1,
      mrp: 1,
      name: 1,
      offer: 1,
      price: 1,
      _id: 1,
      createdAt: 1
    });

    return NextResponse.json(searchedProducts, { status: 200 });
  } catch (err) {
    console.log("[search_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
