"use server" // 開頭統一加上"use server"即可

import { getServerSession } from "next-auth/next"
import { Account, Profile } from "next-auth"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { connectToDB } from "../mongoDB"
import authOptions from "../auth"
import { UserModel as User } from "../models/user"
import mongoose from "mongoose"
import Customer from "../models/Customer"
export async function getUserSession() {
  const session = await getServerSession(authOptions)
  return ({ session })
}

interface ExtendedProfile extends Profile {
  picture?: string
}

interface SignInWithOauthParams {
  account: Account,
  profile: ExtendedProfile
}

export async function signInWithOauth({
  account,
  profile
}: SignInWithOauthParams) {
  await connectToDB();

  const user = await User.findOne({ email: profile.email });
  if (user) return true;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = new User({
      username: profile.name,
      email: profile.email,
      image: profile.picture,
      provider: account.provider
    });

    const res = await newUser.save({ session });  // Include session
    const data = res.toJSON();
    const userId = data._id.toString();

    const newCustomer = new Customer({
      userId,
      email: profile.email,
      username: profile.name,
    });

    const res2 = await newCustomer.save({ session });  // Include session
    const data2 = res2.toJSON();
    console.log({ data2 });

    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();  // Abort transaction on error
    console.error("Transaction failed:", error);
    return false;  // Indicate failure
  } finally {
    session.endSession();
  }
}


interface GetUserByEmailParams {
  email: string
}

export async function getUserByEmail({
  email
}: GetUserByEmailParams) {
  connectToDB()

  const user = await User.findOne({ email }).select("-password")

  if (!user) {
    throw new Error("User does not exist!")
  }

  // console.log({user})
  return { ...user._doc, _id: user._id.toString() }
}

export interface UpdateUserProfileParams {
  name: string
}

export async function updateUserProfile({
  name
}: UpdateUserProfileParams) {
  const session = await getServerSession(authOptions)
  // console.log(session)

  connectToDB()

  try {
    if (!session) {
      throw new Error("Unauthorization!")
    }

    const user = await User.findByIdAndUpdate(session?.user?._id, {
      name
    }, { new: true }).select("-password")

    if (!user) {
      throw new Error("User does not exist!")
    }

    return { success: true }
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`)
  }
}

export interface SignUpWithCredentialsParams {
  username: string,
  email: string,
  password: string
}

export async function signUpWithCredentials({
  username,
  email,
  password
}: SignUpWithCredentialsParams) {
  await connectToDB();  // Ensure DB connection is established

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);  // Include session

    if (user) {
      throw new Error("User already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      provider: "credentials",
    });

    const res = await newUser.save({ session });  // Include session
    const data = res.toJSON();
    // console.log({ data });

    const userId = res._id.toString();  // Access _id directly

    const newCustomer = new Customer({
      userId,
      email,
      username,
    });

    const res2 = await newCustomer.save({ session });  // Include session
    const data2 = res2.toJSON();
    // console.log({ data2 });

    await session.commitTransaction();
    return { success: true };
  } catch (error) {
    await session.abortTransaction();  // Ensure transaction is aborted on error
    // console.error("Transaction failed:", error);
    redirect(`/error?error=${(error as Error).message}`);
    return { success: false, error: (error as Error).message };
  } finally {
    session.endSession();
  }
}


interface SignInWithCredentialsParams {
  email: string,
  password: string
}

export async function signInWithCredentials({
  email,
  password
}: SignInWithCredentialsParams) {
  connectToDB()

  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("Invalid email or password!")
  }

  const passwordIsValid = await bcrypt.compare(
    password,
    user.password
  )

  if (!passwordIsValid) {
    throw new Error("Invalid email or password")
  }

  return { ...user._doc, _id: user._id.toString() }
}

export interface ChangeUserPasswordParams {
  oldPassword: string,
  newPassword: string
}

export async function changeUserPassword({
  oldPassword,
  newPassword
}: ChangeUserPasswordParams) {
  const session = await getServerSession(authOptions)
  // console.log(session)

  connectToDB()

  try {
    if (!session) {
      throw new Error("Unauthorization!")
    }

    if (session?.user?.provider !== "credentials") {
      throw new Error(`Signed in via ${session?.user?.provider}. Changes not allowed with this method.`)
    }

    const user = await User.findById(session?.user?._id)

    if (!user) {
      throw new Error("User does not exist!")
    }

    const passwordIsValid = await bcrypt.compare(
      oldPassword,
      user.password
    )

    if (!passwordIsValid) {
      throw new Error("Incorrect old password.")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword
    })

    return { success: true }
  } catch (error) {
    redirect(`/error?message=${(error as Error).message}`)
  }
}

export interface GetCustomerIdParams {
  userId: string,
}

export async function getCustomerId({
  userId
}: GetCustomerIdParams) {
  await connectToDB();
  try {
    const customer = await Customer.findOne({ userId });
    const customerId = await customer?._id.toString();
    return customerId;
  } catch (error) {
    console.error("Error getting customer ID:", error);
  }
}

