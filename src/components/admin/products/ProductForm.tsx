"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
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
import { Textarea } from "../ui/textarea";
import ImageUpload from "../customUi/ImageUpload";
import Delete from "../customUi/Delete";
import Loader from "../customUi/Loader";
import MultiSelect from "./MultiSelect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VariantForm from "./variants/VariantForm";
import { DataTable } from "../customUi/DataTable";
import { columns } from "./variants/variantColumns";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CategoryType, ProductType } from "@/lib/types";
// import ReactQuill from "react-quill";
import { Checkbox } from '@/components/ui/checkbox';
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";

function extractTextFromHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    // description: z.string().min(2).max(500).optional(),
    description: z.string().refine(
      (value) => {
        return extractTextFromHTML(value).trim().length >= 5;
      }, {
      message: "The text must be at least 5 characters long after trimming",
    }
    ),
    shippingCost: z.number().min(0).default(0),
    offer: z.string().optional(),
    sku: z.string().min(1),
    img: z.array(z.string()),
    mrp: z.number().optional(),
    price: z.number().min(0),
    enableStock: z.boolean().default(false),
    remainingStock: z.number().optional(),
    brand: z.string().optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      metaKeywords: z.string().optional(),
      specialPrice: z.number().optional(),
    }),
    sizeChart: z
      .array(
        z.object({
          size: z.string(),
          measurements: z.record(z.number()),
        })
      )
      .optional(),
    categories: z.array(z.string()),
    similarProducts: z.array(z.string()).optional(),
    variants: z.array(z.string()).optional(),
    isActive: z.boolean().default(true),
    isDelete: z.boolean().default(false),
  })
  .refine(
    (data) => data.mrp === undefined || data.mrp >= data.price,
    {
      message: "Maximum price (MRP) cannot be less than the original price.",
      path: ["mrp"], // Point to `mrp` field in the error
    }
  )
  .transform((data) => {
    if (data.mrp === undefined) {
      // Default behavior: Set `mrp` to `price` if not provided
      data.mrp = data.price;
    }
    if (data.offer === "0" || data.offer === undefined) {
      // Calculate offer if it's 0 or not provided
      if (data.mrp > 0) {
        data.offer = ((data.price / data.mrp) * 100).toFixed(0); // Calculate offer percentage
      } else {
        data.offer = "0"; // Default to 0 if there's an issue with the price
      }
    }
    return data;
  });
interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/category");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
        ...initialData,
        categories: initialData.categories.map((category) => category._id),
        similarProducts: initialData.similarProducts?.map((product) =>
          typeof product === "string" ? product : product._id
        ),
        variants: initialData.variants.map((variant) => variant._id),
      }
      : {
        name: "",
        description: "",
        shippingCost: 0,
        offer: "",
        sku: "",
        img: [],
        mrp: undefined,
        price: 0,
        // reviews: [],
        seo: {
          metaTitle: "",
          metaDescription: "",
          metaKeywords: "",
          specialPrice: undefined,
        },
        sizeChart: [],
        categories: [],
        remainingStock: 0,
        similarProducts: [],
        enableStock: false,
        variants: [],
        brand: '',
        isActive: true,
        isDelete: false,
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

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   // console.log(values);
  //   try {
  //     setLoading(true);
  //     const url = initialData
  //       ? `/api/product/${initialData._id}`
  //       : "/api/product";
  //     const res = await fetch(url, {
  //       method: initialData ? "PUT" : "POST",
  //       body: JSON.stringify(values),
  //     });
  //     if (res.ok) {
  //       setLoading(false);
  //       toast.success(`Product ${initialData ? "updated" : "created"}`);
  //       // router.push("/admin/products");
  //     }
  //   } catch (err) {
  //     console.log("[products_POST]", err);
  //     toast.error("Something went wrong! Please try again.");
  //   }
  // };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const endpoint = initialData ? `/api/product/${initialData._id}` : "/api/product";
      const method = initialData ? "PUT" : "POST";
      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed to save product");
      toast.success(`Product ${initialData ? "updated" : "created"} successfully.`);
      router.push("/admin/products");
    } catch (error) {
      toast.error("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData?._id ? (
        <div className="flex items-center justify-between">
          <p className="text-5xl font-bold">Edit Product</p>
          <Delete id={initialData._id} item="product" />
        </div>
      ) : (
        <p className="text-5xl font-bold">Create Product</p>
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
                    className="border border-gray-300"
                    placeholder="Name"
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
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    placeholder="Brand"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          {/* QuillEditor Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={(value: string) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()} // Ensure the value is a string
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                    >
                      <SelectTrigger className=" rounded-none">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="true">Active</SelectItem>
                          <SelectItem value="false">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer <small>(Automatically calculated if left empty)</small></FormLabel>
                  <FormControl>
                    <Input
                      className=" "
                      type="number"
                      placeholder="Offer"
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
              name="mrp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      type="number"
                      placeholder="MRP"
                      {...field}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      type="number"
                      placeholder="Price"
                      {...field}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Cost ($)</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      type="number"
                      placeholder="Shipping Cost"
                      {...field}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="SKU"
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
              name="enableStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Enable Stock?</FormLabel>
                    <FormDescription>
                      Check this if you want to enable stock management for this
                      product.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {
              form.watch('enableStock') &&
              <FormField
                control={form.control}
                name="remainingStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remaining Stock</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="number"
                        placeholder="Remaining Stock"
                        {...field}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />
            }

          </div>

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder="Categories"
                    categories={categories}
                    value={field.value || []}
                    onChange={(_id) => {
                      const newValue = Array.isArray(field.value)
                        ? field.value
                        : [];
                      if (!newValue.includes(_id)) {
                        field.onChange([...newValue, _id]);
                      }
                    }}
                    onRemove={(idToRemove) => {
                      const newValue = Array.isArray(field.value)
                        ? field.value
                        : [];
                      field.onChange(
                        newValue.filter(
                          (categoryId) => categoryId !== idToRemove
                        )
                      );
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="flex gap-1">
            <Button type="submit" variant={"default"} className="bg-black text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="text-black bg-transparent border-2 border-black hover:text-white hover:bg-black"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form >
      {initialData?._id && (
        <>
          <Separator className="my-5" />
          <div>
            <h1>Manage Variants</h1>
            <Link href={`/admin/variants/new?productId=${initialData._id}`}>
              <Button className="my-2 bg-black text-white">
                <Plus /> Add New Variant
              </Button>
            </Link>
            <div>
              <Separator className="bg-grey-1 my-4" />
              <DataTable
                columns={columns}
                data={initialData?.variants}
                searchKey="title"
              />
            </div>
          </div>
        </>
      )}
    </div >
  );
};

export default ProductForm;
