import React from "react";
import ReactLoading from "react-loading";

function ProductLoading() {
  return (
    <div className="w-full flex justify-center">
        <ReactLoading type={"bars"} color="black" />
      </div>
  );
}

export default ProductLoading;
