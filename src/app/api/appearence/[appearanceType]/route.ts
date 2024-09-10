import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import Appearance from '@/lib/models/Appearence';


// GET /api/appearance/[appearanceType]
export const GET = async (req: NextRequest, { params }: { params: { appearanceType: string } }) => {
  const { appearanceType } = params;

  try {
    // Validate the appearanceType parameter
    if (appearanceType !== 'header') {
      return new NextResponse('Invalid appearance type', { status: 400 });
    }

    // Connect to the MongoDB database
    await connectToDB();

    // Find the document containing the header field in the Appearance collection
    const appearance = await Appearance.findOne({}, 'header').lean(); // `.lean()` is optional for faster reads

    // If no header data is found, respond with a 404 error
    if (!appearance) {
      return new NextResponse('Header data not found', { status: 404 });
    }

    // Respond with the header data as JSON
    return NextResponse.json(appearance, { status: 200 });
  } catch (err) {
    console.error('[GET_APPEARANCE_HEADER]', err); // Log the error for debugging purposes
    return new NextResponse('Internal server error', { status: 500 });
  }
};
// POST /api/appearance/[appearanceType]
export const POST = async (req: NextRequest, { params }: { params: { appearanceType: string } }) => {
  const { appearanceType } = params;

  try {
    // Check if the requested appearance type is "header"
    if (appearanceType !== 'header') {
      return new NextResponse('Invalid appearance type', { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Parse request body to get new header data
    const { header } = await req.json();

    // Validate the new header data
    // const validatedHeader = validateHeader(header);

    // Update or create header data in the Appearance document
    const updatedAppearance = await Appearance.findOneAndUpdate(
      {},
      { header },
      { new: true, upsert: true } // `upsert: true` will create the document if it does not exist
    );

    // Respond with the updated header data
    return NextResponse.json(updatedAppearance.header, { status: 200 });
  } catch (err) {
    console.error('[POST_APPEARANCE_HEADER]', err);
    if (err instanceof Error && err.message.includes('Each header node must have a value and href')) {
      return new NextResponse(err.message, { status: 400 });
    }
    return new NextResponse('Internal server error', { status: 500 });
  }
};
