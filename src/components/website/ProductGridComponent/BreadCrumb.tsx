import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { createSlug, formatSlug } from "@/shared/helpers/help";

interface BreadCrumbProps {
  CategName: string;
  id: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ CategName, id }) => {

  return (
    <Breadcrumb className="font-semibold text-black">
      <BreadcrumbList>
        <Link href={`/`}>
          <BreadcrumbItem>Home</BreadcrumbItem>
        </Link>
        <BreadcrumbSeparator />
        <Link href={`/search?q=${CategName}`}>
          <BreadcrumbItem className="capitalize">{formatSlug(CategName)}</BreadcrumbItem>
        </Link>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
