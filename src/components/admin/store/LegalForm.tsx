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
import { CldUploadWidget } from "next-cloudinary";
import { Trash } from "lucide-react";
import { LegalType } from "@/lib/types";

// Define form schema using Zod
const legalSchema = z.object({
  privacyPolicy: z.string().url({
    message: "Invalid Privacy Policy URL",
  }),
  termsAndConditions: z.string().url({
    message: "Invalid Terms and Conditions URL",
  }),
  refundPolicy: z.string().url({
    message: "Invalid Refund Policy URL",
  }),
});

// Infer form types
type LegalValues = z.infer<typeof legalSchema>;

interface myProps {
  initialData: LegalType;
  onProceed: (value: LegalType, storeSettingIdentity: string) => void;
}

// LegalForm Component
export const LegalForm: React.FC<myProps> = ({ initialData, onProceed }) => {
  // Initialize the form with useForm hook and resolver
  const form = useForm<LegalValues>({
    resolver: zodResolver(legalSchema),
    defaultValues: {
      privacyPolicy: initialData?.privacyPolicy || "https://example.com/privacy-policy.pdf",
      termsAndConditions: initialData?.termsAndConditions || "https://example.com/terms-conditions.pdf",
      refundPolicy: initialData?.refundPolicy || "https://example.com/refund-policy.pdf",
    },
  });

  // Handle form submission
  const onSubmit = (values: LegalValues) => {
    onProceed(values, "legal");
  };

  const handleUpload = (result: any, field: "privacyPolicy" | "termsAndConditions" | "refundPolicy") => {
    form.setValue(field, result.info.secure_url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Privacy Policy Field */}
        <FormField
          control={form.control}
          name="privacyPolicy"
          render={({ field }) => (
            <FormItem className="border rounded-lg p-4 shadow-sm bg-white w-full">
              <FormLabel className="text-lg font-semibold text-gray-700">Privacy Policy</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/privacy-policy.pdf"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 mt-1">
                Upload your Privacy Policy document.
              </FormDescription>
              <FormMessage className="text-red-600 mt-1" />
              <CldUploadWidget
                uploadPreset="ecommerce_store"
                onUpload={(result) => handleUpload(result, "privacyPolicy")}
              >
                {({ open }) => (
                  <Button type="button" onClick={() => open()} className="bg-black text-white mt-2">
                    Upload Privacy Policy
                  </Button>
                )}
              </CldUploadWidget>
            </FormItem>
          )}
        />

        {/* Terms and Conditions Field */}
        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem className="border rounded-lg p-4 shadow-sm bg-white w-full">
              <FormLabel className="text-lg font-semibold text-gray-700">Terms and Conditions</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/terms-conditions.pdf"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 mt-1">
                Upload your Terms and Conditions document.
              </FormDescription>
              <FormMessage className="text-red-600 mt-1" />
              <CldUploadWidget
                uploadPreset="ecommerce_store"
                onUpload={(result) => handleUpload(result, "termsAndConditions")}
              >
                {({ open }) => (
                  <Button type="button" onClick={() => open()} className="bg-black text-white mt-2">
                    Upload Terms and Conditions
                  </Button>
                )}
              </CldUploadWidget>
            </FormItem>
          )}
        />

        {/* Refund Policy Field */}
        <FormField
          control={form.control}
          name="refundPolicy"
          render={({ field }) => (
            <FormItem className="border rounded-lg p-4 shadow-sm bg-white w-full">
              <FormLabel className="text-lg font-semibold text-gray-700">Refund Policy</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/refund-policy.pdf"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 mt-1">
                Upload your Refund Policy document.
              </FormDescription>
              <FormMessage className="text-red-600 mt-1" />
              <CldUploadWidget
                uploadPreset="ecommerce_store"
                onUpload={(result) => handleUpload(result, "refundPolicy")}
              >
                {({ open }) => (
                  <Button type="button" onClick={() => open()} className="bg-black text-white mt-2">
                    Upload Refund Policy
                  </Button>
                )}
              </CldUploadWidget>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="text-white bg-black">Save Legal Documents</Button>
      </form>
    </Form>
  );
}
