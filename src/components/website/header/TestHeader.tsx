"use client";
import { Button } from "@/components/ui/button";
import {
    HeadsetIcon,
    Bell,
    User,
    Heart,
    ShoppingCart,
    Search,
    Package,
    LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import * as React from "react";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HoverCart from "./details/HoverCart";
import useNavigation from "@/shared/hooks/useNavigation";
import ClientLoading from "@/components/myUi/ClientLoading";
import SearchCard from "../homepageComponents/SearchCard";
//import { navigationType } from "@/lib/types";
import SignUpForm from "@/components/forms/signup-form";
import SignInForm from "@/components/forms/signin-form";
import UseMyStore from "@/shared/hooks/useStore";
import { cn } from "@/lib/utils";

function Header() {
    const [isOpen, setIsOpen] = useState(false); // For mobile search
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [CreateAccount, setCreateAccount] = useState(false);
    const [isSigninSheetOpened, setIsSigninSheetOpened] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { data: sessions } = useSession();
    const { navigation: navigations, loading } = useNavigation();
    const { myStore, loading: storeLoading } = UseMyStore();

    useEffect(() => { }, [sessions]);

    const toggleSearchCard = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (callbackUrl: string) => {
        if (sessions?.user) {
            router.push(callbackUrl);
            return;
        }
        setIsSigninSheetOpened(true);
    };

    const showLogin = () => {
        setIsResetPassword(false);
        setCreateAccount(false);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search) {
            router.push(`/search?q=${search}`);
        }
    };

    const handleCreateAccount = () => {
        setIsSigninSheetOpened(true);
        setCreateAccount(true);
    };

    if (loading || storeLoading) return <div><ClientLoading /></div>;

    return (
        <div>
            {/* Desktop Header */}
            <div className="items-center flex-1 px-2 min-h-[80px] hidden md:flex object-cover">
                <Link href="/">
                    <Image
                        src={myStore?.storeSettings.logo || ""}
                        alt="logo"
                        width={150}
                        height={50}
                        className="cursor-pointer"
                    />
                </Link>
                <ul className="flex font-mono text-sm items-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {Array.isArray(navigations) &&
                                navigations.map((navigation, index) => (
                                    <NavigationMenuItem key={index}>
                                        <Link href={`${navigation.href}`}>
                                            <NavigationMenuTrigger className="uppercase text-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                {navigation.value}
                                            </NavigationMenuTrigger>
                                        </Link>
                                        <NavigationMenuContent>
                                            <ul className="flex flex-row flex-nowrap w-[1000px] p-7">
                                                {navigation.children.map((component: any, i: number) => (
                                                    <div key={i} className="flex flex-col gap-2">
                                                        <ListItem
                                                            title={component.value}
                                                            href={component.href}
                                                            className="tracking-widest text-lg font-semibold text-slate-700 uppercase underline underline-offset-[10px] py-5"
                                                        />
                                                        {component.children.map((subcategory: any, j: number) => (
                                                            <ListItem
                                                                key={j}
                                                                title={subcategory.value}
                                                                href={subcategory.href}
                                                            />
                                                        ))}
                                                    </div>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </ul>
                <form className="flex flex-1 bg-gray-100 mx-2" onSubmit={handleSearch}>
                    <Input
                        className="w-72 h-10 bg-gray-100 outline-none border-none flex-grow"
                        placeholder="search for items, brands and inspiration"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="bg-yellow-300 p-2">
                        <Search />
                    </button>
                </form>
                <nav>
                    <ul className="flex">
                        <li className="px-4">
                            <Link href="/help-center">
                                <HeadsetIcon />
                            </Link>
                        </li>
                        <li className="px-4">
                            <HoverCard openDelay={100} closeDelay={50}>
                                <HoverCardTrigger asChild>
                                    <Bell className="hover:cursor-pointer" />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <span className="p-5 bg-gray-200 text-center">No Notifications</span>
                                </HoverCardContent>
                            </HoverCard>
                        </li>
                        <li className="px-4">
                            <HoverCard openDelay={100} closeDelay={50}>
                                <HoverCardTrigger asChild>
                                    <User className="hover:cursor-pointer" />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-60">
                                    {sessions?.user ? (
                                        <span>Hi {sessions?.user?.name}</span>
                                    ) : (
                                        <>
                                            <span onClick={() => setIsSigninSheetOpened(true)}>
                                                Sign In
                                            </span>
                                            <span onClick={handleCreateAccount}>Join</span>
                                        </>
                                    )}
                                    {sessions?.user && (
                                        <div
                                            onClick={() => signOut({ callbackUrl: "/" })}
                                            className="cursor-pointer"
                                        >
                                            <LogOut />
                                            <span>Signout</span>
                                        </div>
                                    )}
                                </HoverCardContent>
                            </HoverCard>
                        </li>
                        <li className="px-4" onClick={() => handleLinkClick("/wishlist")}>
                            <Heart className="cursor-pointer" />
                        </li>
                        <li className="px-4 cursor-pointer">
                            <HoverCart />
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Mobile Header */}
            <div className="flex fixed top-0 z-30 bg-white items-center flex-1 px-2 w-full justify-between md:hidden">
                <Link href="/">
                    <Image
                        src={myStore?.storeSettings.mobileLogo || "/assets/home/logo.png"}
                        alt="the logo"
                        width={80}
                        height={50}
                        className="w-12 h-12 object-cover"
                    />
                </Link>
                <button onClick={toggleSearchCard} className="p-2">
                    <Search size={20} />
                </button>
                <ul className="flex">
                    <li className="px-2">
                        <Link href="/help-center">
                            <HeadsetIcon size={20} />
                        </Link>
                    </li>
                    <li className="px-2">
                        <Bell size={20} className="hover:cursor-pointer" />
                    </li>
                    <li className="px-2">
                        <Link href="/wishlist">
                            <Heart size={20} />
                        </Link>
                    </li>
                    <li className="px-2">
                        <Link href="/checkout">
                            <ShoppingCart size={20} />
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Search Card for Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 w-full h-full bg-white z-50"
                    >
                        <SearchCard toggle={toggleSearchCard} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sign-In Sheet */}
            <Sheet open={isSigninSheetOpened} onOpenChange={setIsSigninSheetOpened}>
                <SheetContent className="p-5 w-[350px] sm:w-[600px]">
                    <SheetHeader>
                        <SheetTitle>Login or Signup</SheetTitle>
                    </SheetHeader>
                    <div className="mt-16">
                        {/* <div className="text-center w-full">
              <span>Get access to your Wishlist</span>
            </div> */}
                        {!isResetPassword && !CreateAccount ? (
                            <div>
                                <SignInForm setCreateAccount={setCreateAccount} />
                            </div>
                        ) : CreateAccount ? (
                            <div className="py-5">
                                <SignUpForm setCreateAccount={setCreateAccount} />
                            </div>
                        ) : isResetPassword ? (
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 my-8 border border-black"
                                />
                                <button className="w-full py-2 mb-4 bg-primary-gradient text-white font-semibold">
                                    RESET PASSWORD
                                </button>
                                <a
                                    href="#"
                                    className="text-gray-600 block text-center"
                                    onClick={showLogin}
                                >
                                    Back to Login
                                </a>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md px-3 leading-none no-underline outline-none transition-colors",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

export default Header;

