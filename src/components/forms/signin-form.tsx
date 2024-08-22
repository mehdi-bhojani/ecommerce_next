"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleSignInButton from "../buttons/google-signin-button";
import { useState } from "react";

interface SignInFormProps {
  setCreateAccount: (value: boolean) => void;
}

const userSignInValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be 8+ characters"),
});

const SignInForm = ({ setCreateAccount }: SignInFormProps) => {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof userSignInValidation>>({
    resolver: zodResolver(userSignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const callbackUrl = "/";
  async function onSubmit(values: z.infer<typeof userSignInValidation>) {
    console.log(values);
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border"
                    placeholder="mail@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="border"
                    type="password"
                    placeholder="your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full py-2 my-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold"
          type="submit"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Sign In With Email"}
        </Button>
      </form>
      <div className="flex items-center justify-center my-4">
        <div className="border-b border-gray-400 w-full"></div>
        <span className="px-2 text-gray-400">or</span>
        <div className="border-b border-gray-400 w-full"></div>
      </div>
      <GoogleSignInButton callbackUrl={callbackUrl}>
        Sign in with Google
      </GoogleSignInButton>
      <p className="text-center text-sm text-gray-600 mt-2 cursor-pointer">
        Don&apos;t have an account?&nbsp;
        <span onClick={() => setCreateAccount(true)} className="font-bold">
          Sign Up
        </span>
      </p>
    </Form>
  );
};

export default SignInForm;
