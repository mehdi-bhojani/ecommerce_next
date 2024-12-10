"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "../../customUi/Loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "../../customUi/ImageUpload";
import { Plus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import addVariantToProduct from "@/lib/actions/addVariantInProduct";
import { CategoryType, VariantType } from "@/lib/types";
import Link from "next/link";
import { DataTable } from "../../customUi/DataTable";
import { columns } from "../sizes/sizeColumns";

const formSchema = z.object({
  isActive: z.boolean().default(true),
  sort: z.number().min(0),
  name: z.string().min(1),
  sku: z.string().min(1),
  enableStock: z.boolean().optional(),
  remainingStock: z.number().optional(),
  enableUnitPrice: z.boolean().optional(),
  mrp: z.number().min(0).optional().default(0),
  price: z.number().min(0).optional(),
  img: z.array(z.string()).optional(),
}
).refine(
  (data) => data.enableUnitPrice && data.mrp >= (data.price ?? 0),
  {
    message: "Maximum price (MRP) cannot be less than the original price.",
    path: ["mrp"], // Point to `mrp` field in the error
  }
)

interface VariantFormProps {
  initialData?: VariantType | null;
  productId?: string;
}

const VariantForm: React.FC<VariantFormProps> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const productId = props?.productId || props?.initialData?.productId;

  const getCategories = async () => {
    try {
      const res = await fetch("/api/category", {
        method: "GET",
      });
      const data = await res.json();
      setCategories(data);
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
    defaultValues: props.initialData
      ? {
        ...props.initialData,
      }
      : {
        isActive: true,
        sort: 0,
        name: "",
        sku: "",
        enableStock: false,
        remainingStock: 0,
        enableUnitPrice: false,
        mrp: 0,
        price: 0,
        img: [],
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
    const newValues = {
      ...values,
      productId: props.productId,
    };
    try {
      setLoading(true);
      const url = props.initialData
        ? `/api/variant/${props.initialData._id}`
        : "/api/variant";
      const res = await fetch(url, {
        method: props.initialData ? "PUT" : "POST",
        body: JSON.stringify(newValues),
      });
      setLoading(false);
      toast.success(`Variant ${props.initialData ? "updated" : "created"}`);
      // router.push(`/admin/products/${productId}`);
    } catch (err) {
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full p-10 ">
      {
        props.initialData ? (
          <h1 className="font-bold text-5xl">Edit Product Variant</h1>
        ) : (
          <h1 className="font-bold text-5xl">Create Product Variant</h1>
        )
      }
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
                    type="text"
                    placeholder="eg. Black T-shirt"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input
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
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()} // Ensure the value is a string
                      onValueChange={(value) => field.onChange(value === "true")}
                    >
                      <SelectTrigger>
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
          </div>

          <div className="md:grid md:grid-cols-2 gap-5">
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
              form.watch("enableStock") &&
              <FormField
                control={form.control}
                name={`remainingStock`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remaining Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
            name="enableUnitPrice"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Enable Unit Price ?</FormLabel>
                  <FormDescription>
                    Check this if you want individual Price for this product.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {
            form.watch("enableUnitPrice") &&
            <div className="md:grid md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name={`mrp`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
                name={`price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
          }

          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value || []} // Provide a default value of an empty array
                    onChange={
                      (url) => field.onChange([...(field.value || []), url]) // Use the default value when field.value is undefined
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...(field.value || []).filter((image) => image !== url), // Use the default value when field.value is undefined
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push(`/admin/products/${productId}`)}
              className="text-black bg-transparent border-2 border-black hover:text-white hover:bg-black"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
      {props.initialData?._id && (
        <>
          <Separator className="my-5" />
          <div>
            <h1>Manage Variants</h1>
            <Link href={`/admin/sizes/new?variantId=${props.initialData._id}`}>
              <Button className="my-2 bg-black text-white">
                <Plus /> Add New Size
              </Button>
            </Link>
            <div>
              <Separator className="bg-grey-1 my-4" />
              <DataTable
                columns={columns}
                data={props.initialData.sizes}
                searchKey="title"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VariantForm;
