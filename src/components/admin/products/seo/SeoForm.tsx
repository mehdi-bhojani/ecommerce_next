"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
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
import { Loader } from "lucide-react";
import { ProductType } from "@/lib/types";
import { Textarea } from "../../ui/textarea";

interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      seo: {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        specialPrice: undefined,
      },
    },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      setLoading(true);
      const url = initialData
        ? `/api/product/${initialData._id}`
        : "/api/product";
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        window.location.href = "/admin/product";
        router.push("/admin/product");
      }
    } catch (err) {
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          {/* Add Delete component if needed */}
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* SEO section */}
          <Separator className="my-4" />

          <FormField
            control={form.control}
            name="seo.metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Meta Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="SEO Meta Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seo.metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Meta Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="SEO Meta Description"
                    {...field}
                    rows={3}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seo.metaKeywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Meta Keywords</FormLabel>
                <FormControl>
                  <Input
                    placeholder="SEO Meta Keywords"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/products")}
              className="bg-blue-1 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
