"use server";

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/mongoDB';
import { UserModel } from '@/lib/models/user';

export const GET = async (request: Request) => {
  await connectToDB();
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get('id');

    if (userid) {
      const user = await UserModel.findById(userid);

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user, { status: 200 });
    } else {
      const allUsers = await UserModel.find();
      return NextResponse.json(allUsers, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user', error }, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  await connectToDB();
  try {
    const { username, email, password } = await request.json();
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      {
        message: 'User created successfully',
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error creating user',
        error,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (request: Request) => {
  await connectToDB();
  try {
    const { id, username, email, password } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          message: 'User ID is required',
        },
        { status: 400 }
      );
    }

    const findUser = await UserModel.findById(id);
    if (!findUser) {
      return NextResponse.json({
        message: 'User Not Found',
      },
        { status: 404 });
    }

    let newPassword = findUser.password;

    const isPasswordSame = await bcrypt.compare(password, findUser.password);

    if (!isPasswordSame) {
      newPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username, email, password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          message: 'User not found or update unsuccessful',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'User updated successfully',
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error updating user',
        error,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  await connectToDB();
  try {
    const { id } = await request.json();

    if (id !== undefined && id !== null) {
      const deletedUser = await UserModel.findByIdAndDelete(id);

      return NextResponse.json(
        {
          message: "User deleted successfully",
          data: deletedUser,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User ID is required",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    if (error.kind === 'ObjectId') { // Mongoose error code for record not found
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: 'Error deleting user',
        error,
      },
      { status: 500 }
    );
  }
};
