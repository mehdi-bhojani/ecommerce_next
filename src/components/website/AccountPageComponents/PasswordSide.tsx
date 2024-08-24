import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const formSchema = z.object({
  NewPassword: z.string().min(2, {
      message: "Username must be at least 2 characters.",
  }),
  ConfirmPassword: z.string().min(2, {
      message: "Username must be at least 2 characters.",
  }),
 
})
const PasswordSide = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NewPassword: "",
      ConfirmPassword: "",
       
    },
})
function onSubmit(values: z.infer<typeof formSchema>) {

  console.log(values)
}


const [open, setOpen] = useState(false);
const [value, setValue] = React.useState("")





return (
  <div className="p-6">
      <div className="flex items-center mb-6">

          <h1 className="text-2xl font-semibold">Change Password</h1>
      </div>


      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           
            
              <FormField
                  control={form.control}
                  name="NewPassword"

                  render={({ field }) => (
                      <FormItem >
                          <FormLabel>NewPassword</FormLabel>
                          <FormControl>
                              <Input className='border h-10 border-black ' type='text' placeholder="NewPassword" {...field} />
                          </FormControl>

                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="ConfirmPassword"

                  render={({ field }) => (
                      <FormItem >
                          <FormLabel> ConfirmPassword</FormLabel>
                          <FormControl >
                              <Input className='border h-10 border-black ' type='text' placeholder="ConfirmPassword" {...field} />
                          </FormControl>

                          <FormMessage />
                      </FormItem>
                  )}
              />
             
                       
                 
            

              <Button variant={'destructive'}  className='px-12' type='submit'>UPDATE</Button>
          </form>
      </Form>

















  </div>
);
}

export default PasswordSide