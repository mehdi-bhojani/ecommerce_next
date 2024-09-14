"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomerType } from "@/lib/types";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/admin/ui/textarea";

const Page = () => {
  const formSchema = z.object({
    FirstName: z.string().min(2, "First name must be at least 2 characters."),
    LastName: z.string().min(2, "Last name must be at least 2 characters."),
    emailAddress: z.string().email("Invalid email address."),
    Message: z.string().min(20, "Last name must be at least 2 characters."),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      emailAddress: "",
      Message: ""
    },
  });
  const [loading, setLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const newValues = {
      firstName: values.FirstName,
      lastName: values.LastName,
      Email: values.emailAddress,
      Message: values.Message
    }
    console.log(newValues);
    setLoading(false);
  }
  const { data: session } = useSession();
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
      >
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-500">Please fill this form </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-full">
            <FormField
              control={form.control}
              name="FirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border h-10 border-black w-full"
                      type="text"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="LastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border h-10 border-black w-full"
                      type="text"
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      className="border h-14 border-black w-full"
                      type="email"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border h-32 border-black w-full"
                      placeholder="Message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"destructive"}
              className="px-12 text-center "
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
export default Page