import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Tag, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { storeAtom } from "@/shared/atoms/storeAtom";
import { useAtom } from "jotai";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  street: z.string().nonempty({ message: "Please mention street." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z
    .string()
    .regex(/^\+?\d+$/, {
      message: "Mobile number must be a valid number.",
    })
    .min(10, { message: "Mobile number must be at least 10 digits." }),
  payment: z.enum(["cash_on_delivery", "credit_card", "paypal"], {
    required_error: "Please select your payment option.",
  }),
  city: z.string().min(2, { message: "Select your city." }),
  state: z.string().min(2, { message: "Select your state." }).optional(),
  postalCode: z
    .string()
    .regex(/^\d{4,6}$/, { message: "Postal code must be 4 to 6 digits." })
    .optional(),
  country: z.string().nonempty({ message: "Select your country." }).optional(),
});

interface myprops {
  onProceed: (values: any) => void;
}

const CheckoutDetails: React.FC<myprops> = ({ onProceed }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      payment: "cash_on_delivery", // Setting a default value
    },
  });

  const router = useRouter();
  const [myStoreAtom, setStoreAtom] = useAtom(storeAtom);
  async function onSubmit(values: z.infer<typeof formSchema>) {
      onProceed(values);
  }

  return (
    <div>
      <div>
        <div className="bg-white p-3 ">
          <span className="text-xl font-bold">Delivery Address</span>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <h1 className="text-2xl font-semibold">My Details</h1>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="border h-10 border-black "
                          type="text"
                          placeholder="eg. John"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className="border h-10 border-black "
                          type="text"
                          placeholder="eg. Doe"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          className="border h-10 border-black"
                          type="tel"
                          placeholder="eg. 03001234567"
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          className="border h-10 border-black "
                          type="email"
                          placeholder="eg. abc@gmail.om"
                          {...field}
                        />
                      </FormControl>

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
                          className="border h-10 border-black "
                          type="text"
                          placeholder="eg. abc street near abc shop"
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
                      <Input
                        placeholder="eg. Lahore"
                        {...field} // Spread the field properties to bind them to the input
                        className="border h-10 border-black "
                      />
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
                      <Input
                        placeholder="eg. Punjab"
                        {...field} // Spread the field properties to bind them to the input
                        className="border h-10 border-black "
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code / Zip Code</FormLabel>
                      <Input
                        placeholder="eg. 54000"
                        {...field} // Spread the field properties to bind them to the input
                        className="border h-10 border-black "
                      />
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
                      <Input
                        placeholder="eg. Pakistan"
                        {...field} // Spread the field properties to bind them to the input
                        className="border h-10 border-black "
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        <div className="bg-white p-6">
          <h2 className="font-bold text-xl my-4">Payment Type</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      <div
                        className={`flex items-center justify-between  p-4 cursor-pointer ${field.value === "cash_on_delivery"
                            ? " border border-blue-500"
                            : "bg-white"
                          }`}
                        onClick={() => field.onChange("cash_on_delivery")}
                      >
                        <div className="flex flex-row gap-2 items-center">
                          <Image
                            src="/assets/Checkout/cash.svg" // Replace with your actual icon path
                            alt="Credit/Debit Card"
                            className="w-10 h-10 ml-4"
                            width={10}
                            height={10}
                          />

                          <span className="font-medium text-gray-700 justify-between">
                            Cash On Delivery
                          </span>
                        </div>

                        <input
                          type="radio"
                          name={field.name}
                          value="cash_on_delivery"
                          checked={field.value === "cash_on_delivery"}
                          onChange={() => field.onChange("cash_on_delivery")}
                          className="form-radio text-blue-500"
                        />
                      </div>
                      {
                        myStoreAtom?.paymentMethod.enabled &&

                        (<div
                          className={`flex items-center justify-between  p-4 cursor-pointer ${field.value === "credit_card"
                              ? " border border-blue-500"
                              : "bg-white"
                            }`}
                          onClick={() => field.onChange("credit_card")}
                        >
                          <div className="flex flex-row gap-2 items-center">
                            <Image
                              src="/assets/Checkout/visaGif.gif" // Replace with your actual icon path
                              alt="Credit/Debit Card"
                              className="w-10 h-10 ml-4"
                              width={10}
                              height={10}
                            />

                            <span className="font-medium text-gray-700 justify-between">
                              Credit/Debit Card
                            </span>
                          </div>

                          <input
                            type="radio"
                            name={field.name}
                            value="CreditCard"
                            checked={field.value === "credit_card"}
                            onChange={() => field.onChange("credit_card")}
                            className="form-radio text-blue-500"
                          />
                        </div>
                        )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex flex-row items-center justify-center w-full mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <Button
                variant={"destructive"}
                className="px-12 w-full "
                onSubmit={form.handleSubmit(onSubmit)}
                type="submit"
              >
                Proceed to Pay{" "}
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-5 w-full  px-5 font-semibold text-gray-500 space-x-1">
          <span>
            By placing your order you agree to our Terms & Conditions, privacy
            and returns policies . You also consent to some of your data being
            stored by Clicky, which may be used to make future shopping
            experiences better for you.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
