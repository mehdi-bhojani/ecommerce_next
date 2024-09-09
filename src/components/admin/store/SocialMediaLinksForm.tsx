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
import { Input } from "@/components/ui/input";
import { SocialMediaLinksType } from "@/lib/types";

// Define form schema using Zod
const socialMediaSchema = z.object({
  facebook: z.string().url({
    message: "Invalid Facebook URL",
  }),
  instagram: z.string().url({
    message: "Invalid Instagram URL",
  }),
  twitter: z.string().url({
    message: "Invalid Twitter URL",
  }),
});

// Infer form types
type SocialMediaLinksValues = z.infer<typeof socialMediaSchema>;

interface myProps {
  initialData: SocialMediaLinksType;
  onProceed: (value: SocialMediaLinksType, storeSettingIdentity: string) => void;
}

// SocialMediaLinks Form Component
export const SocialMediaLinksForm: React.FC<myProps> = ({ initialData, onProceed }) => {
  // Initialize the form with useForm hook and resolver
  const form = useForm<SocialMediaLinksValues>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      facebook: initialData?.facebook || "https://facebook.com/mystore",
      instagram: initialData?.instagram || "https://instagram.com/mystore",
      twitter: initialData?.twitter || "https://twitter.com/mystore",
    },
  });

  // Handle form submission
  const onSubmit = (values: SocialMediaLinksValues) => {
    // console.log(values);
    onProceed(values as SocialMediaLinksType, "socialMediaLinks");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Facebook Link Field */}
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem className=" bg-white w-full">
              <FormLabel className="text-lg font-semibold text-gray-700">
                Facebook Link
              </FormLabel>
              <FormControl>
                <Input className="border" placeholder="https://facebook.com/mystore"  {...field} />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 mt-1">
                Enter the URL to your Facebook page.
              </FormDescription>
              <FormMessage className="text-red-600 mt-1" />
            </FormItem>
          )}
        />

        {/* Instagram Link Field */}
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem className=" bg-white w-full">
              <FormLabel className="text-lg font-semibold text-gray-700">
                Instagram Link
              </FormLabel>
              <FormControl>
                <Input className="border" placeholder="https://instagram.com/mystore" {...field} />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 mt-1">
                Enter the URL to your Instagram profile.
              </FormDescription>
              <FormMessage className="text-red-600 mt-1" />
            </FormItem>
          )}
        />

        {/* Twitter Link Field */}
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem className=" bg-white w-full">
              <FormLabel className="text-lg font-semibold text-gray-700">
                Twitter Link
              </FormLabel>
              <FormControl>
                <Input className="border" placeholder="https://twitter.com/mystore" {...field} />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 mt-1">
                Enter the URL to your Twitter profile.
              </FormDescription>
              <FormMessage className="text-red-600 mt-1" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Save Social Media Links</Button>
      </form>
    </Form>
  );
}
