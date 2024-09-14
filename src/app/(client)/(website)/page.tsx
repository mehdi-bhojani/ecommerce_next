import React from "react";
import DealZone from "@/components/website/homepageComponents/DealZone";
import Exclusive from "@/components/website/homepageComponents/Exclusive";
import Carosal from "@/components/website/homepageComponents/Carosal";
import Trendbanner from "@/components/website/homepageComponents/Trendbanner";
import TopCategories from "@/components/website/homepageComponents/TopCategories";
import TabCategories from "@/components/website/homepageComponents/TabCategories";
import Metadata from "@/components/metadata/metadata";
import useMyStore from "@/shared/hooks/useStore";
import ClientLoading from "@/components/myUi/ClientLoading";
function Page() {
  return (
    <>
      <div className="mb-12">
        <Carosal />
        <div className="w-full mx-auto">

          <div className="w-11/12 mx-auto ">
            <TopCategories />
          </div>

          <div className="w-11/12 mx-auto ">
            <Exclusive />
          </div>

          <DealZone />
        </div>
        <Trendbanner />
        <div className="w-full mx-auto">
          <TabCategories />
        </div>
      </div>
    </>
  );
}

export default Page;
