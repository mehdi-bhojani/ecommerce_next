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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

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
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-center">Sign In</h1>
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button type="submit">Submit</Button>
            <span>
              Did&apos;nt have an account?{" "}
              <Link className="font-semibold" href={"/signup"}>
                Signup
              </Link>{" "}
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
