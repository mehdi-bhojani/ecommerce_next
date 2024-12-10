"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import signinFormSchema from "@/schemas/authentication/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/components/buttons/google-signin-button";
import Image from "next/image";
import { useStore } from "jotai";
import UseMyStore from "@/shared/hooks/useStore";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const formMethods = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(signInData?.error);
    if (signInData?.error) {
      toast.error("Invalid Username or Password");
    } else {
      router.push("/");
    }
  };
  if (session?.user._id) {
    router.push("/my/account");
  }
  const store = UseMyStore();
  return (
    <div>
      <div>
        <Image src={store.myStore?.storeSettings.logo || "/assets/logo.png"} alt="logo" width={350} height={350} className="mx-auto w-44" />
      </div>
      <Form {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={formMethods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="youremail@domain.com"
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button type="submit" className="text-white font-bold bg-primary-gradient uppercase">Login With Email</Button>
          </div>
        </form>
      </Form>
      <div>
        <div className="flex items-center justify-center my-4">
          <div className="border-b border-gray-400 w-full"></div>
          <span className="px-2 text-gray-400">or</span>
          <div className="border-b border-gray-400 w-full"></div>
        </div>
        <GoogleSignInButton callbackUrl="/" >
          Sign in with Google
        </GoogleSignInButton>
        <span className="my-8">
          Didn&apos;t have an account?{" "}
          <Link className="font-semibold" href={"/signup"}>
            Signup
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default SignIn;
