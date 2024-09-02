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
  Facebook,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { navigations } from "@/constants/data";
import SignUpForm from "@/components/forms/signup-form";
import SignInForm from "@/components/forms/signin-form";
import { signOut, useSession } from "next-auth/react";
import SignOutButton from "@/components/buttons/signout-button";
import { useRouter } from "next/navigation";
import HoverCart from "./details/HoverCart";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function Header() {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [CreateAccount, setCreateAccount] = useState(false);
  const [isSigninSheetOpened, setIsSigninSheetOpened] = useState(false);
  const router = useRouter();
  const { data: sessions } = useSession();
  const showCreateAccount = () => {
    setCreateAccount(true);
  };

  const showResetPassword = () => {
    setIsResetPassword(true);
  };

  const showLogin = () => {
    setIsResetPassword(false);
    setCreateAccount(false);
  };

  const handleLinkClick = (callbackUrl: string) => {
    // console.log("Link clicked");
    if (sessions?.user) {
      router.push(callbackUrl);
      return;
    }
    setIsSigninSheetOpened(true);
  };

  const handleCreateAccount = () => {
    setIsSigninSheetOpened(true);
    setCreateAccount(true);
  };

  React.useEffect(() => {
    // console.log(sessions);
  }, [sessions]);

  return (
    <div>
      <div className=" items-center flex-1 px-2 min-h-[80px] hidden md:flex ">
        {/* testing animations */}

        <div>
          <Link href="/">
            {/* <Image
              src={"/assets/home/logo.png"}
              alt="logo"
              width={150}
              height={50}
              className="cursor-pointer"
            /> */}
            <h1 className="text-2xl font-bold p-3">
              <span className="text-red-600">DFK</span> Collection
            </h1>
          </Link>
        </div>
        <div>
          <ul className="flex font-mono text-sm items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navigations.map((navigation, index) => (
                  <NavigationMenuItem key={index}>
                    <Link href={`/${navigation.type}`}>
                      <NavigationMenuTrigger className="uppercase text-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        {navigation.type}
                      </NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul
                        key={1}
                        className="flex flex-row flex-nowrap w-[1000px] p-7"
                      >
                        {navigation.categories.map((component) => (
                          <div
                            key={component.Category}
                            className="flex flex-col flex-nowrap gap-2"
                          >
                            <ListItem
                              key={component.Category}
                              title={component.Category}
                              href={component.href}
                              className="tracking-widest text-lg font-semibold text-slate-700 uppercase underline underline-offset-[10px] py-5"
                            ></ListItem>

                            {component.subcategories?.map((subcategory) => (
                              <ListItem
                                key={subcategory.name}
                                title={subcategory.name}
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
        </div>
        <div className="flex flex-1 bg-gray-100 mx-2">
          <Input
            className="w-72 h-10   bg-gray-100 outline-none border-none flex-1"
            placeholder="search for items, brands and sinpirat"
          />
          <div>
            <button className="bg-yellow-300 p-2">
              <Search />
            </button>
          </div>
        </div>
        <div>
          <nav>
            <ul className="flex ">
              <li className="px-4">
                <Link href="/help-center">
                  <HeadsetIcon />
                </Link>
              </li>
              <li className="px-4">
                <HoverCard openDelay={100} closeDelay={50}>
                  <HoverCardTrigger asChild>
                    <Bell className="hover:cursor-pointer " />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 HoverCardContent">
                    <div className="flex flex-col ">
                      <span className="p-5 bg-gray-200  text-center">
                        Notifications
                      </span>
                      <span className="px-4  py-10  text-center">
                        No Notifications
                      </span>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </li>
              <li className="px-4">
                <HoverCard openDelay={100} closeDelay={50}>
                  <HoverCardTrigger asChild>
                    <User className="hover:cursor-pointer " />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-60 ">
                    <div className="flex flex-col ">
                      <div className="p-2 font-medium flex text-neutral-600 flex-row bg-gray-200 justify-around">
                        {sessions?.user ? (
                          <span> Hi {sessions?.user?.name}</span>
                        ) : (
                          <>
                            <span
                              className="cursor-pointer"
                              onClick={() => setIsSigninSheetOpened(true)}
                            >
                              Sign In
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={handleCreateAccount}
                            >
                              Join
                            </span>
                          </>
                        )}
                      </div>
                      <div
                        className="p-4 cursor-pointer font-semibold flex gap-2 flex-row justify-start border-b border-gray-400"
                        onClick={() => handleLinkClick("/my/account")}
                      >
                        <User className="hover:cursor-pointer  " />
                        <span>My Account</span>
                      </div>
                      <div
                        className="p-4 cursor-pointer  font-semibold flex gap-2 flex-row  justify-start border-b border-gray-400"
                        onClick={() => handleLinkClick("/my/orders")}
                      >
                        <Package className="hover:cursor-pointer " />
                        <span>My Orders</span>
                      </div>
                      <div
                        className="p-4 font-semibold cursor-pointer flex gap-2 flex-row justify-start border-b border-gray-400"
                        onClick={() => handleLinkClick("/wishlist")}
                      >
                        <Heart className="hover:cursor-pointer " />
                        <span>My WishLists</span>
                      </div>
                      {sessions?.user && (
                        <div
                          className="p-4 font-semibold cursor-pointer flex gap-2 flex-row justify-start border-b border-gray-400"
                          onClick={() =>
                            signOut({ callbackUrl: "/", redirect: true })
                          }
                        >
                          <LogOut className="hover:cursor-pointer " />
                          <span>Signout</span>
                        </div>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </li>
              <li
                className="px-4 cursor-pointer"
                onClick={() => handleLinkClick("/wishlist")}
              >
                <Heart className="cursor-pointer " />
              </li>
              <li className="px-4 cursor-pointer">
                <HoverCart />
              </li>
            </ul>
          </nav>
        </div>
      </div>
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
                <button className="w-full py-2 mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold">
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
