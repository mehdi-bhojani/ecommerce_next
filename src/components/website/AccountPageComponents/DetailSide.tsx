"use client"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
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
const formSchema = z.object({
    FirstName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    Address: z.string(),
    LastName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    emailAddress: z.string().email(),
    mobileNo: z.string().regex(/^\+?\d+$/, {
        message: "Mobile number must be a valid number.",
    }),
    ZipCode: z.string(),
    gender: z.enum(['male', 'female'], {
        required_error: "Please select your gender.",
    }),
    theme: z.string().min(2, { message: "Select your Province" }),
    framework: z.string().min(2, { message: "Framework is required" }),
})
const DetailSide = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            FirstName: "",
            LastName: "",
            emailAddress: "",
            theme: '',
            framework: '',
            Address:'',
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }


    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState("")

    const frameworks = [
        {
            value: "next.js",
            label: "Next.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "nuxt.js",
            label: "Nuxt.js",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
        {
            value: "asetro",
            label: "Astero",
        },
        {
            value: "astrao",
            label: "Astros",
        },
        {
            value: "astgro",
            label: "Astrho",
        },
        {
            value: "astrso",
            label: "Astwro",
        },
        {
            value: "asterro",
            label: "Astroer",
        },
    ]



    return (
        <div className="p-6">
            <div className="flex items-center mb-6">

                <h1 className="text-2xl font-semibold">My Details</h1>
            </div>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="mobileNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile Number</FormLabel>
                                <FormControl>
                                    <Input className='border h-14 border-black' type='tel' placeholder="number" {...field} />
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
                                    <Input className='border h-14 border-black ' type='email' placeholder="EmailAddress" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        name="ZipCode"

                        render={({ field }) => (
                            <FormItem >
                                <FormLabel> ZipCode</FormLabel>
                                <FormControl >
                                    <Input className='border h-10 border-black ' type='tel' placeholder="ZipCode" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                    <div
                                        className={`flex-1 flex items-center justify-center p-4 cursor-pointer ${field.value === 'male' ? 'bg-gray-100 text-green-500' : 'text-gray-400'
                                            }`}
                                        onClick={() => field.onChange('male')}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={field.value === 'male'}
                                            onChange={() => field.onChange('male')}
                                            className="hidden"
                                        />
                                        <span className="ml-2 cursor-pointer">Male</span>
                                    </div>

                                    <div
                                        className={`flex-1 flex items-center justify-center p-4 cursor-pointer ${field.value === 'female' ? 'bg-gray-100 text-green-500' : 'text-gray-400'
                                            }`}
                                        onClick={() => field.onChange('female')}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={field.value === 'female'}
                                            onChange={() => field.onChange('female')}
                                            className="hidden"
                                        />
                                        <span className="ml-2 cursor-pointer">Female</span>
                                    </div>
                                </div>
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
                        name="theme"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Theme</FormLabel>
                                <Controller
                                    name="theme"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Province" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Azad Kashmir">Azad Kashmir</SelectItem>
                                                <SelectItem value="Balochistan">Balochistan</SelectItem>
                                                <SelectItem value="Federally Administered tribul Areas">Federally Administered tribul Areas</SelectItem>
                                                <SelectItem value="Gilgit-Baltistan">Gilgit-Baltistan</SelectItem>
                                                <SelectItem value="Sindh">Sindh</SelectItem>
                                                <SelectItem value="Punjab">Punjab</SelectItem>
                                                <SelectItem value="Islamabad">Islamabad</SelectItem>
                                                <SelectItem value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="framework"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Framework</FormLabel><br/>
                                <Controller
                            name="framework"
                            control={form.control}
                            render={({ field }) => (
                                <Popover  open={open} onOpenChange={setOpen}>
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

                    <Button variant={'destructive'}  className='px-12' type='submit'>Save Changes</Button>
                </form>
            </Form>

















        </div>
    );
}

export default DetailSide