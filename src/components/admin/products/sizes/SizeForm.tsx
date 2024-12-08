"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
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
import Loader from "../../customUi/Loader";
import { SizeType } from "@/lib/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Updated schema to match the new Size model
const formSchema = z.object({
  isActive: z.boolean().default(true),
  name: z.string().min(1, "Size name is required"),
  sku: z.string().min(1, "SKU is required"),
  enableStock: z.boolean().default(false),
  remainingStock: z.number().min(0, "Remaining stock must be a non-negative number").optional(),
  enableUnitPrice: z.boolean().default(false),
  mrp: z.number().min(0, "MRP must be a non-negative number").optional(),
  price: z.number().min(0, "Price must be a non-negative number").optional(),
  variantId: z.string().min(1, "Variant ID is required"), // Required field for variantId
});

interface SizeFormProps {
  initialData?: SizeType | null;
  variantId?: string;
}

const SizeForm: React.FC<SizeFormProps> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.initialData ?? {
      isActive: true,
      name: "",
      sku: "",
      enableStock: false,
      remainingStock: 0,
      enableUnitPrice: false,
      mrp: 0,
      price: 0,
      variantId: props.variantId || "", // Ensure variantId is set
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("[SizeForm] Form values:", values);
    const newValues = { ...values };
    try {
      setLoading(true);
      const url = props.initialData
        ? `/api/size/${props.initialData._id}`
        : "/api/size";
      const response = await fetch(url, {
        method: props.initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValues),
      });

      if (!response.ok) {
        throw new Error("Failed to submit size data.");
      }

      setLoading(false);
      toast.success(`Size ${props.initialData ? "updated" : "created"} successfully`);
      router.back();
    } catch (err) {
      console.error("[SizeForm] Error:", err);
      toast.error("Something went wrong! Please try again.");
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full p-10">
      <h1 className="text-heading2-bold">
        {props.initialData ? `Edit Size - ${props.initialData.name}` : "Create Size"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size Name</FormLabel>
                <FormControl>
                  <Input className="border border-black rounded-none" placeholder="e.g., Medium, Large" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input className="border border-black rounded-none" placeholder="e.g., SKU12345" {...field} />
                  </FormControl>
                  <FormMessage />
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
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                    >
                      <SelectTrigger className="border border-black rounded-none">
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

          <FormField
            control={form.control}
            name="enableStock"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-black rounded-none p-4">
                <FormLabel>Enable Stock</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("enableStock") && (
            <FormField
              control={form.control}
              name="remainingStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remaining Stock</FormLabel>
                  <FormControl>
                    <Input className="border border-black rounded-none" type="number" placeholder="e.g., 50" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="enableUnitPrice"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 border p-4 border-black rounded-none">
                <FormLabel>Enable Unit Price</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("enableUnitPrice") && (
            <div className="md:grid md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="mrp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Price</FormLabel>
                    <FormControl>
                      <Input className="border border-black rounded-none" type="number" placeholder="e.g., 1000" {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input className="border border-black rounded-none" type="number" placeholder="e.g., 900" {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}


          <div className="flex gap-4">
            <Button className="bg-black text-white" type="submit">Submit</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SizeForm;
