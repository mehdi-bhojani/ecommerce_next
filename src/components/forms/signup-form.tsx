"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import { useState } from "react";
import { signUpWithCredentials } from "@/lib/actions/auth.actions";
import {toast } from "react-hot-toast";
import { set } from "mongoose";

interface SignUpFormProps {
  setCreateAccount: (value: boolean) => void;
}

const userSignUpValidation = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(50, "Username must be less than 50 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be 8+ characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = ({
  //   signUpWithCredentials
  setCreateAccount,
}: SignUpFormProps) => {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof userSignUpValidation>>({
    resolver: zodResolver(userSignUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSignUpValidation>) {
    console.log(values);
    setPending(true);
    const res = await signUpWithCredentials(values)

    if (res?.success) {
        // router.push(callbackUrl)
        toast.success("User signed up successfully");
        setCreateAccount(false);
    }
    setPending(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="border"
                    placeholder="your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input
                    className="border"
                    type="password"
                    placeholder="confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full py-2 my-4 bg-primary-gradient text-white font-semibold"
          type="submit"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Sign Up"}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account?&nbsp;
        <span
          className="font-bold cursor-pointer"
          onClick={() => setCreateAccount(false)}
        >
          Sign In
        </span>
      </p>
    </Form>
  );
};

export default SignUpForm;
