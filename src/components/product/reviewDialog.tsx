import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { ProductType } from "@/lib/types";
import { FaStar } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../admin/ui/textarea";
import ImageUpload from "../myUi/imageUploadClient";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
interface myProps {
  // define props here
  tempProduct: ProductType;
  SelectSize: string;
}
const formSchema = z.object({
  rating: z.number(),
  reviewText: z.string().min(2, {
    message: "Review must be at least 2 characters.",
  }),
  images: z.string(),
});

const ReviewDialog: React.FC<myProps> = ({ tempProduct, SelectSize }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number>(0);
  const [imgrc, setimgrc] = useState(null);
  const [comment, setComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const {data: session} = useSession();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      reviewText: "",
      images: "",
    },
  });
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // setimgrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const reviewData = {
      userId: session?.user?._id,
      rating: values.rating,
      reviewText: values.reviewText,
      images: [values.images],
      productId: tempProduct?._id,
    };
    console.log(reviewData);
    const response = await fetch('/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    
    form.reset();
    setIsDialogOpen(false);
    toast.success('Review Submitted Successfully');
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="my-4 text-center flex justify-center w-full ">
            <button className="flex items-center font-semibold  justify-center text-center  border-2 border-black w-1/2 p-4 hover:bg-gray-100 transition w-full">
              <SquarePen className="mr-2" />
              WRITE A REVIEW
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="w-2/4">
          <div className="max-w-2xl p-6">
            <div className="flex items-center gap-4">
              <Image
                src={tempProduct?.img[0]}
                alt="Product Image"
                width={40}
                height={40}
                className="border  border-1 border-black p-1 object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">ThriveTempo Hoodie</h2>
                <p className="text-gray-600">Size: {SelectSize}</p>
              </div>
            </div>
            <hr className="my-2" />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <h3 className="text-lg font-semibold">
                        Rate the Product
                      </h3>
                      <FormControl>
                        <>
                          <Input type="hidden" {...field} />

                          <div className="flex mt-1">
                            {[...Array(5)].map((_, index) => (
                              <FaStar
                                key={index}
                                className={`cursor-pointer text-3xl ${
                                  index < (hover || field.value)
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                                onClick={() => {
                                  field.onChange(index + 1);
                                  setRating(index + 1);
                                }}
                                onMouseEnter={() => setHover(index + 1)}
                                onMouseLeave={() => setHover(0)}
                              />
                            ))}
                          </div>
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="reviewText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Write your Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="images"
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
                <button className="w-full py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-3xl hover:from-pink-500 hover:to-red-500">
                  Submit
                </button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewDialog;
