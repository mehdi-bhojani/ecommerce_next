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

const formSchema = z.object({
  FirstName: z.string().min(2, "First name must be at least 2 characters."),
  LastName: z.string().min(2, "Last name must be at least 2 characters."),
  emailAddress: z.string().email("Invalid email address."),
  mobileNo: z
    .string()
    .regex(/^\+?\d+$/, "Mobile number must be a valid number."),
  postalCode: z.string(),
  gender: z.string().min(1, "Select your gender"),
  street: z.string().min(2, "Street is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
});

interface MyProps {
  customerData: CustomerType;
  saveCustomer: (values: CustomerType) => void;
}

const DetailSide: React.FC<MyProps> = ({ customerData, saveCustomer }) => {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: customerData?.firstName || "",
      LastName: customerData?.lastName || "",
      emailAddress: session?.user?.email!,
      mobileNo: customerData?.phone || "",
      postalCode: customerData?.addresses[0]?.postalCode || "",
      gender: customerData?.gender || "NA",
      street: customerData?.addresses[0]?.street || "",
      city: customerData?.addresses[0]?.city || "",
      state: customerData?.addresses[0]?.state || "",
      country: customerData?.addresses[0]?.country || "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const newValues = {
      ...customerData,
      firstName: values.FirstName,
      lastName: values.LastName,
      phone: values.mobileNo,
      gender: values.gender,
      addresses: [
        {
          street: values.street,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country,
        },
      ],
    };
    await saveCustomer(newValues);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold">My Details</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="mobileNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    className="border h-14 border-black"
                    type="tel"
                    placeholder="Mobile Number"
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
                    disabled
                    className="border h-14 border-black"
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
            name="FirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    className="border h-10 border-black"
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
                    className="border h-10 border-black"
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
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    className="border h-10 border-black"
                    type="text"
                    placeholder="Postal Code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <div
                    className={`flex-1 flex items-center justify-center p-4 cursor-pointer ${
                      field.value === "male"
                        ? "bg-gray-100 text-green-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => field.onChange("male")}
                  >
                    <input
                      type="radio"
                      checked={field.value === "male"}
                      onChange={() => field.onChange("male")}
                      className="hidden"
                    />
                    <span className="ml-2">Male</span>
                  </div>
                  <div
                    className={`flex-1 flex items-center justify-center p-4 cursor-pointer ${
                      field.value === "female"
                        ? "bg-gray-100 text-green-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => field.onChange("female")}
                  >
                    <input
                      type="radio"
                      checked={field.value === "female"}
                      onChange={() => field.onChange("female")}
                      className="hidden"
                    />
                    <span className="ml-2">Female</span>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    className="border h-10 border-black"
                    type="text"
                    placeholder="Street"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    className="border h-10 border-black"
                    type="text"
                    placeholder="City"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    className="border h-10 border-black"
                    type="text"
                    placeholder="State"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    className="border h-10 border-black"
                    type="text"
                    placeholder="Country"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={"destructive"}
            className="px-12"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DetailSide;
