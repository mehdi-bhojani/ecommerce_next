"use client"

// import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();
 
 
  return (
    <div className="min-h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-white shadow-xl max-lg:hidden text-white z-20">
      <Image src="/logoDesign.svg" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-5">
  {navLinks.map((link) => {
    return (
      <Link
        href={link.url}
        key={link.label}
        className={`flex gap-4 text-body-medium p-3 rounded-lg transition-all duration-500 
          ${pathname.replace(/\/$/, "") === link.url.replace(/\/$/, "")  ? "bg-slate-900 text-white" : "text-black hover:bg-slate-100"} 
           border-2  `}
      >
        {link.icon} <p>{link.label}</p>
      </Link>
    );
  })}
</div>

    </div>
  );
};

export default LeftSideBar;
