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
import { Textarea } from "@/components/admin/ui/textarea";
import ImageUpload from "@/components/admin/customUi/ImageUpload";
import { StoreSettingsType } from "@/lib/types";

// Define form schema using Zod
const storeSettingsSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  logo: z.string().url("Logo must be a valid URL."),
  mobileLogo: z.string().url("Mobile logo must be a valid URL."),
  // favicon: z.string().url("Favicon must be a valid URL."),
  currency: z.object({
    default: z.string().min(1, {
      message: "Currency is required.",
    }),
  }),
});

// Infer form types
type StoreSettingsValues = z.infer<typeof storeSettingsSchema>;

interface myProps {
  initialData: StoreSettingsType;
  onProceed: (value : StoreSettingsType, storeSettingIdentity : string) => void;
}

// StoreSettings Form Component
export const StoreSettingsForm: React.FC<myProps> = ({initialData, onProceed}) => {
  // Initialize the form with useForm hook and resolver
  const form = useForm<StoreSettingsValues>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: {
      name: initialData.name ||"My E-commerce Store",
      description: initialData.description ||"Best place to buy awesome products",
      logo: initialData.logo ||"/assets/home/logo.png",
      mobileLogo:  initialData.mobileLogo ||"/assets/home/logo.png",
      // favicon: initialData.favicon || "/assets/home/logo.png",
      currency: {
        default:  initialData.currency.default || "USD",
      },
    },
  });

  // Handle form submission
  const onSubmit = (values: StoreSettingsValues) => {
    // console.log(values);
    onProceed(values, "storeSettings");
  };

  return (
    <Form {...form}>
      <h1 className="text-2xl font-semibold my-5">Store Settings</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Store Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="Store Name" {...field} />
              </FormControl>
              <FormDescription>Your stores display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Store Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Store Description" {...field} />
              </FormControl>
              <FormDescription>
                Brief description of your store.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Logo Field */}
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>Upload your stores logo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Mobile Logo Field */}
        <FormField
          control={form.control}
          name="mobileLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Logo</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>Upload your stores mobile logo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Favicon Field */}
        {/* <FormField
          control={form.control}
          name="favicon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favicon</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>Upload your stores favicon.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* Currency Default Field */}
        <FormField
          control={form.control}
          name="currency.default"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Currency</FormLabel>
              <FormControl>
                <Input placeholder="Currency" {...field} />
              </FormControl>
              <FormDescription>
                Default currency for your store.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button type="submit" className="text-white bg-black">Save Settings</Button>
      </form>
    </Form>
  );
}
