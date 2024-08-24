import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Tag, Trash2 } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useRouter } from 'next/navigation'
const formSchema = z.object({
    FirstName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    Address: z.string().nonempty({message:"Please mention addressd"}),
    LastName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    emailAddress: z.string().email(),
    mobileNo: z.string().regex(/^\+?\d+$/, {
      message: "Mobile number must be a valid number.",
    }),
    Payment: z.enum(['COD', 'CreditCard'], {
      required_error: "Please select your Payment Option.",
    }),
    City: z.string().min(2, { message: "Select your City" }),
  })
  
  const CheckoutDetails: React.FC<{ className?: string }> = ({ className }) => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          FirstName: "",
          LastName: "",
          emailAddress: "",
          City: '',
          Address: '',
        },
      })

      const router = useRouter();
    
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        if(values.Payment==="COD"){
            router.push('/Order-Success');
        }
      }
    
  const frameworks = [
    {
      value: "New York",
      label: "New York",
    },
    {
      value: "Los Angeles",
      label: "Los Angeles",
    },
    {
      value: "Chicago",
      label: "Chicago",
    },
    {
      value: "Houston",
      label: "Houston",
    },
    {
      value: "Phoenix",
      label: "Phoenix",
    },
    {
      value: "Philadelphia",
      label: "Philadelphia",
    },
    {
      value: "San Antonio",
      label: "San Antonio",
    },
    {
      value: "San Diego",
      label: "San Diego",
    },
    {
      value: "Dallas",
      label: "Dallas",
    },
    {
      value: "San Jose",
      label: "San Jose",
    },
    {
      value: "Austin",
      label: "Austin",
    },
    {
      value: "Jacksonville",
      label: "Jacksonville",
    },
    {
      value: "Fort Worth",
      label: "Fort Worth",
    },
    {
      value: "Columbus",
      label: "Columbus",
    },
    {
      value: "Charlotte",
      label: "Charlotte",
    },
    {
      value: "San Francisco",
      label: "San Francisco",
    },
    {
      value: "Indianapolis",
      label: "Indianapolis",
    },
    {
      value: "Seattle",
      label: "Seattle",
    },
    {
      value: "Denver",
      label: "Denver",
    },
    {
      value: "Washington",
      label: "Washington",
    },
    {
      value: "Boston",
      label: "Boston",
    },
    {
      value: "El Paso",
      label: "El Paso",
    },
    {
      value: "Nashville",
      label: "Nashville",
    },
    {
      value: "Detroit",
      label: "Detroit",
    },
    {
      value: "Oklahoma City",
      label: "Oklahoma City",
    },
    {
      value: "Portland",
      label: "Portland",
    },
    {
      value: "Las Vegas",
      label: "Las Vegas",
    },
    {
      value: "Memphis",
      label: "Memphis",
    },
    {
      value: "Louisville",
      label: "Louisville",
    },
    {
      value: "Baltimore",
      label: "Baltimore",
    },
    {
      value: "Milwaukee",
      label: "Milwaukee",
    },
    {
      value: "Albuquerque",
      label: "Albuquerque",
    },
    {
      value: "Tucson",
      label: "Tucson",
    },
    {
      value: "Fresno",
      label: "Fresno",
    },
    {
      value: "Sacramento",
      label: "Sacramento",
    },
    {
      value: "Mesa",
      label: "Mesa",
    },
    {
      value: "Kansas City",
      label: "Kansas City",
    },
    {
      value: "Atlanta",
      label: "Atlanta",
    },
    {
      value: "Long Beach",
      label: "Long Beach",
    },
    {
      value: "Colorado Springs",
      label: "Colorado Springs",
    },
    {
      value: "Raleigh",
      label: "Raleigh",
    },
    {
      value: "Miami",
      label: "Miami",
    },
    {
      value: "Virginia Beach",
      label: "Virginia Beach",
    },
    {
      value: "Omaha",
      label: "Omaha",
    },
    {
      value: "Oakland",
      label: "Oakland",
    },
    {
      value: "Minneapolis",
      label: "Minneapolis",
    },
    {
      value: "Tulsa",
      label: "Tulsa",
    },
    {
      value: "Arlington",
      label: "Arlington",
    },
    {
      value: "Tampa",
      label: "Tampa",
    },
    {
      value: "New Orleans",
      label: "New Orleans",
    },
    {
      value: "Wichita",
      label: "Wichita",
    },


  ]
  return (
    <div className={className}>
         <div className='bg-white p-3 '>
          <span className='text-xl font-bold'>DELIVERY ADDRESS</span>
          <div className="p-6">
            <div className="flex items-center mb-6">

              <h1 className="text-2xl font-semibold">My Details</h1>
            </div>


            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                <FormField
                  control={form.control}
                  name="FirstName"

                  render={({ field }) => (
                    <FormItem >
                      <FormLabel>FirstName</FormLabel>
                      <FormControl>
                        <Input className='border h-10 border-black ' type='text' placeholder="FirstName" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="LastName"

                  render={({ field }) => (
                    <FormItem >
                      <FormLabel> Lastname</FormLabel>
                      <FormControl >
                        <Input className='border h-10 border-black ' type='text' placeholder="LastName" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input className='border h-10 border-black' type='tel' placeholder="number" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailAddress"

                  render={({ field }) => (
                    <FormItem >
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input className='border h-10 border-black ' type='email' placeholder="EmailAddress" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Address"

                  render={({ field }) => (
                    <FormItem >
                      <FormLabel> Address</FormLabel>
                      <FormControl >
                        <Input className='border h-10 border-black ' type='text' placeholder="Enter your Address" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="City"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> City</FormLabel><br />
                      <Controller
                        name="City"
                        control={form.control}
                        render={({ field }) => (
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                              >
                                {field.value
                                  ? frameworks.find((framework) => framework.value === field.value)?.label
                                  : "Select framework..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command className='w-full'>
                                <CommandInput placeholder="Search framework..." />
                                <CommandList className='w-full'>
                                  <CommandEmpty>No framework found.</CommandEmpty>
                                  <CommandGroup className='w-full'>
                                    {frameworks.map((framework) => (
                                      <CommandItem className='w-full'
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={() => {
                                          field.onChange(framework.value);
                                          setOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === framework.value ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {framework.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />


              </form>
            </Form>

















          </div>
        </div>

        <div className='bg-white p-3'>
          <span className='font-bold text-xl'>Payment Type</span>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="Payment"
                render={({ field }) => (
                  <FormItem>

                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      <div
                        className={`flex items-center justify-between  p-4 cursor-pointer ${field.value === "COD" ? " border border-blue-500" : "bg-white"
                          }`}
                        onClick={() => field.onChange("COD")}
                      >
                        <div className='flex flex-row gap-2 items-center'>
                          <Image
                            src="/assets/Checkout/cash.svg" // Replace with your actual icon path
                            alt="Credit/Debit Card"
                            className="w-10 h-10 ml-4"
                            width={10}
                            height={10}
                          />


                          <span className="font-medium text-gray-700 justify-between">Cash On Delivery</span>
                        </div>

                        <input
                          type="radio"
                          name={field.name}
                          value="COD"
                          checked={field.value === "COD"}
                          onChange={() => field.onChange("COD")}
                          className="form-radio text-blue-500"
                        />
                      </div>

                      <div
                        className={`flex items-center justify-between  p-4 cursor-pointer ${field.value === "CreditCard" ? " border border-blue-500" : "bg-white"
                          }`}
                        onClick={() => field.onChange("CreditCard")}
                      >
                        <div className='flex flex-row gap-2 items-center'>
                          <Image

                            src="/assets/Checkout/visaGif.gif"  // Replace with your actual icon path
                            alt="Credit/Debit Card"
                            className="w-10 h-10 ml-4"
                            width={10}
                            height={10}
                          />


                          <span className="font-medium text-gray-700 justify-between">Credit/Debit Card</span>
                        </div>

                        <input
                          type="radio"
                          name={field.name}
                          value="CreditCard"
                          checked={field.value === "CreditCard"}
                          onChange={() => field.onChange("CreditCard")}
                          className="form-radio text-blue-500"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className='flex flex-row items-center justify-center w-full mt-5'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
              <Button variant={'destructive'} className='px-12 w-full ' onSubmit={form.handleSubmit(onSubmit)}  type='submit'>Proceed to Pay </Button>
            </form>
          </Form>
        </div>
        <div className='mt-5 w-full  px-5 font-semibold text-gray-500 space-x-1'>
          <span>By placing your order you agree to our Terms & Conditions, privacy and returns policies . You also consent to some of your data being stored by Clicky, which may be used to make future shopping experiences better for you.</span>
        </div>

    </div>
  )
}

export default CheckoutDetails