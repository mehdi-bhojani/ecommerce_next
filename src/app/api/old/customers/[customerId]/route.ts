import Order from "@/lib/models/old/oldOrder";
import Product from "@/lib/models/old/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { customerId: string } }
) => {
  try {
    await connectToDB();

    const orders = await Order.find({
      customerClerkId: params.customerId,
    }).populate({ path: "products.product", model: Product });

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.log("[customerId_GET", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
