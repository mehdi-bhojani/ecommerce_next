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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import signupFormSchema from "@/schemas/authentication/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import UseMyStore from "@/shared/hooks/useStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const formMethods = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  });
  const router = useRouter();
  // Handle form submission
  const onSubmit = async (data: any) => {
    const signup = {
      email: data.email,
      username: data.username,
      password: data.password,
    };
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        toast.error(data.message || "An error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                  <Input className="border border-black"
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="border border-black" placeholder="Muhammad" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                  <Input className="border border-black" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button className="text-white font-bold bg-primary-gradient uppercase" type="submit">Signup To DFK Collection</Button>
            <span className="my-4">
              Already had an account?{" "}
              <Link className="font-semibold" href={"/signin"}>
                Signin
              </Link>{" "}
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
