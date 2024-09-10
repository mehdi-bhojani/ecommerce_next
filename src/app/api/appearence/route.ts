import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import Appearance from '@/lib/models/Appearence';


// GET /api/appearance
export const GET = async (req: NextRequest) => {
  try {
    // Connect to the database
    await connectToDB();

    // Retrieve the appearance settings
    const appearance = await Appearance.findOne({});
    
    // Check if appearance settings exist
    if (!appearance) {
      return new NextResponse('Appearance settings not found', { status: 404 });
    }

    // Respond with the appearance settings
    return NextResponse.json(appearance, { status: 200 });
  } catch (err) {
    console.error('[GET_APPEARANCE]', err);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
