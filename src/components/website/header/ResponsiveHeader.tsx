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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import Image from "next/image";
import { useState } from "react";
import React from "react";

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
import SearchCard from "../homepageComponents/SearchCard";
import { useStore } from "jotai";
import UseMyStore from "@/shared/hooks/useStore";
import useNavigation from "@/shared/hooks/useNavigation";
import ClientLoading from "@/components/myUi/ClientLoading";

const ResponsiveHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearchCard = () => {
    setIsOpen(!isOpen);
  };


  const { myStore, loading: storeLoading } = UseMyStore();

  if (storeLoading) return <div><ClientLoading /></div>;

  return (
    <div>
      <div className="flex fixed top-0 z-30  bg-white items-center flex-1 px-2 w-full justify-between md:hidden">
        <Link href={"/"}>
          <Image
            className="w-12 h-12 object-cover"
            width={80}
            height={120}
            src={myStore?.storeSettings.mobileLogo || "/assets/home/logo.png"}
            alt="the logo"
          />
        </Link>
        <div className="flex flex-row justify-center items-center ">
          <div className="">
            <button className="bg-yellow-300 p-2 hidden md:block ">
              <Search />
            </button>
            <button
              onClick={toggleSearchCard}
              className="md:bg-yellow-300 p-2 md:hidden "
            >
              <Search size={20} />
            </button>
          </div>

          <nav>
            <ul className="flex ">
              <li className="px-2">
                <Link href="/help-center">
                  <div className=" hidden md:block">
                    <HeadsetIcon />
                  </div>
                  <div className="md:hidden">
                    <HeadsetIcon size={20} />
                  </div>
                </Link>
              </li>
              <li className="px-2">
                <Link href="/Notifications">
                  <div>
                    <Bell className="hover:cursor-pointer hidden md:block " />
                  </div>
                  <div>
                    <Bell
                      size={20}
                      className="hover:cursor-pointer md:hidden"
                    />
                  </div>
                </Link>
              </li>

              <li className="px-2">
                <Link href="/wishlist">
                  <div>
                    <Heart className="hover:cursor-pointer hidden md:block" />
                  </div>

                  <div>
                    <Heart
                      size={20}
                      className="hover:cursor-pointer md:hidden "
                    />
                  </div>
                </Link>
              </li>
              <li className="px-2">
                <Link href="/checkout">
                  <div>
                    <ShoppingCart className="hover:cursor-pointer hidden md:block" />
                  </div>
                  <div>
                    <ShoppingCart
                      size={20}
                      className="hover:cursor-pointer md:hidden"
                    />
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }} // Initial state (hidden)
            animate={{ opacity: 1, y: 0 }} // Animation when appearing
            exit={{ opacity: 0, y: -100 }} // Animation when exiting
            transition={{ duration: 0.3 }} // Duration of the transition
            className="z-50 fixed top-0 left-0 w-full h-full bg-white"
          >
            <SearchCard toggle={toggleSearchCard} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResponsiveHeader;
