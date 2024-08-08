"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
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
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../customUi/Delete";
import MultiSelect from "./MultiSelect";
import Loader from "../customUi/Loader";
import ImageUpload from "../customUi/ImageUpload";
import { CategoryType, CollectionType } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().trim(),
  image: z.string().nonempty({ message: "Image is required" }),
  categories: z.array(z.string()),
});

interface CollectionFormProps {
  initialData?: CollectionType | null; // Ensure CollectionType is imported
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [mycategories, setMyCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/category", {
        method: "GET",
      });
      const data = await res.json();
      setMyCategories(data);
      setLoading(false);
    } catch (err) {
      console.log("[categories_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  
  useEffect(() => {
    getCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          categories: initialData.categories.map((category) => category._id),
        }
      : {
          name: "",
          description: "",
          image: "",
          categories: [],
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/collection/${initialData._id}`
        : "/api/collection";
      const res = await fetch(url, {
        method: initialData ? "PUT":"POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Collection ${initialData ? "updated" : "created"}`);
        window.location.href = "/admin/collections";
        router.push("/admin/collections");
      }
    } catch (err) {
      console.log("[collections_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <h1 className="text-heading2-bold">Edit Collection</h1>
          <Delete id={initialData._id} item="collection" />
        </div>
      ) : (
        <h1 className="text-heading2-bold">Create Collection</h1>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                    className="bg-gray-100 border border-gray-300 p-2 m-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                    className="bg-gray-100 border border-gray-300 p-2 m-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {mycategories.length > 0 && (
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Categories"
                      categories={mycategories}
                      value={field.value || []}
                      onChange={(id) => {
                        const newValue = Array.isArray(field.value)
                          ? [...field.value, id]
                          : [id];
                        field.onChange(newValue);
                      }}
                      onRemove={(idToRemove) => {
                        const newValue = Array.isArray(field.value)
                          ? field.value.filter(
                              (categoryId) => categoryId !== idToRemove
                            )
                          : [];
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          )}
          <div className="flex gap-5">
            <Button type="submit" className="bg-slate-600 text-white w-[200px] ">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/admin/collections")}
              className="bg-transparent border border-slate-600 text-slate-600  hover:bg-slate-600 hover:text-white w-[200px]"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
