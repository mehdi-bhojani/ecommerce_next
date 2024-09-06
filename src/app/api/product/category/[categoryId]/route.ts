import Product from '@/lib/models/Product';
import { connectToDB } from '@/lib/mongoDB';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/products/[categoryId]

export const GET = async (
    req: NextRequest,
    { params }: { params: { categoryId: string } }
) => {
    try {
        await connectToDB();

        const products = await Product.find({
            categories: params.categoryId,
            isActive: true,
            isDelete: false
        },
            {
                price: 1,
                mrp: 1,
                name: 1,
                _id: 1,
                img: { $slice: 1 },  // This gets only the first element of the img array
                offer: 1,
                createdAt: 1
            }
        ).lean();

        if (!products || products.length === 0) {
            return new NextResponse('No products found for this category', { status: 404 });
        }

        return NextResponse.json(products, { status: 200 });
    } catch (err) {
        console.error('[GET_PRODUCTS_BY_CATEGORY]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};