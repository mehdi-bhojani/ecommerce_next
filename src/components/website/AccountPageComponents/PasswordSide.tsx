import React, {useState} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changeUserPassword } from "@/lib/actions/auth.actions";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    OldPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(50, "Password must be at most 50 characters long."),
    NewPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(50, "Password must be at most 50 characters long."),
    ConfirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(50, "Password must be at most 50 characters long."),
  })
  .refine((data) => data.NewPassword === data.ConfirmPassword, {
    message: "Passwords must match.",
    path: ["ConfirmPassword"],
  });

const PasswordSide = () => {
const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      OldPassword: "",
      NewPassword: "",
      ConfirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log("Submitted Values:", values);
    const newValues = {
        oldPassword: values.OldPassword,
        newPassword: values.ConfirmPassword,
    };
    const res = await changeUserPassword(newValues);
    if (res.success) {
        toast.success("Password changed successfully");
        console.log("Password changed successfully");
    }
    form.reset();
    setLoading(false);
}

return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold">Change Password</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="OldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    className="border h-10 border-black"
                    type="password"
                    placeholder="Old Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="NewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    className="border h-10 border-black"
                    type="password"
                    placeholder="New Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ConfirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="border h-10 border-black"
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant={"destructive"} className="px-12 uppercase" type="submit" disabled={loading}>
            {loading? "Processing":"UPDATE"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PasswordSide;
