"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/admin/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PaymentMethodType } from "@/lib/types";

// Define form schema using Zod for Stripe settings
const stripeSchema = z.object({
  name: z.literal("Stripe"), // Fixed name for Stripe
  enabled: z.boolean(),
  "publicKey": z.string().min(1, {
    message: "Public Key is required.",
  }),
  "secretKey": z.string().min(1, {
    message: "Secret Key is required.",
  }),
});

// Infer form types
type StripeSettings = z.infer<typeof stripeSchema>;

interface myProps {
  initialData: PaymentMethodType;
  onProceed: (value: PaymentMethodType, storeSettingIdentity: string) => void;
}


// PaymentMethods Form Component for Stripe
export const PaymentMethodsForm: React.FC<myProps> = ({ initialData, onProceed }) => {
  // Initialize the form with useForm hook and resolver
  const form = useForm<StripeSettings>({
    resolver: zodResolver(stripeSchema),
    defaultValues: {
      name: "Stripe", // Fixed value
      enabled: initialData.enabled,
      "publicKey": initialData.publicKey || "",
      "secretKey": initialData.secretKey || "",
    },
  });

  // Handle form submission
  const onSubmit = (values: StripeSettings) => {
    // console.log(values);
    onProceed(values, 'paymentMethod');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Payment Method Name Field (Read Only) */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method Name</FormLabel>
              <FormControl>
                <Input readOnly placeholder="Stripe" {...field} />
              </FormControl>
              <FormDescription>This field is fixed to Stripe.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Enabled Checkbox Field */}
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="border rounded-lg p-4 shadow-sm bg-white w-full">
              <div className=" flex justify-between">
                <FormLabel className="text-lg font-semibold text-gray-700">
                  Enabled
                </FormLabel>
                <FormControl className="flex items-center mt-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                    className="h-5 w-5"
                  />
                </FormControl>
              </div>
              <FormDescription className="text-sm text-gray-500 mt-1">
                Enable or disable Stripe as a payment method.
              </FormDescription>
              <FormMessage className="text-red-600 mt-1" />
            </FormItem>
          )}
        />

        {/* Public Key Field */}
        <FormField
          control={form.control}
          name="publicKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public Key</FormLabel>
              <FormControl>
                <Input placeholder="Public Key" {...field} />
              </FormControl>
              <FormDescription>Enter your Stripe public key.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Secret Key Field */}
        <FormField
          control={form.control}
          name="secretKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret Key</FormLabel>
              <FormControl>
                <Input placeholder="Secret Key" {...field} />
              </FormControl>
              <FormDescription>Enter your Stripe secret key.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="text-white bg-black">Save Stripe Settings</Button>
      </form>
    </Form>
  );
}
