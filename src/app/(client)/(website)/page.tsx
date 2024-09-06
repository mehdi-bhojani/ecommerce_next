import React from "react";
import DealZone from "@/components/website/homepageComponents/DealZone";
import Exclusive from "@/components/website/homepageComponents/Exclusive";
import Carosal from "@/components/website/homepageComponents/Carosal";
import Trendbanner from "@/components/website/homepageComponents/Trendbanner";
import TopCategories from "@/components/website/homepageComponents/TopCategories";
import TabCategories from "@/components/website/homepageComponents/TabCategories";
function Page() {
  return (
    <div className="mb-12">
      <Carosal />
      <div className="w-full mx-auto">
        <TopCategories />
        <Exclusive />
        <DealZone />
      </div>
      <Trendbanner />
      <div className="w-full mx-auto">
        <TabCategories />
      </div>
    </div>
  );
}

export default Page;
