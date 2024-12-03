import { ProductType, VariantType } from "@/lib/types";
import { PriceIntoCurrency } from "@/shared/helpers/help";
import Image from "next/image";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface Props {
  product: ProductType;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  SelectSize: string;
  SetSelectSize: (size: string) => void;
  colors: VariantType[];
  sizes: VariantType[];
  currency: string;
  selectedFabric: string;
  setSelectedFabric: (fabric: string) => void;
}

export default function ProductDetails({
  product,
  selectedColor,
  setSelectedColor,
  SelectSize,
  SetSelectSize,
  colors,
  sizes,
  currency,
  selectedFabric,
  setSelectedFabric
}: Props) {
  // Helper function to get stock status
  const getStockStatus = (size: VariantType) => {
    if (size.remainingStock <= 0) return "Out of Stock";
    if (size.remainingStock <= 5) return `Only ${size.remainingStock} left`;
    return "";
  };

  // Helper function to calculate discount percentage
  const calculateDiscount = (mrp: number, price: number) => {
    return Math.round(((mrp - price) / mrp) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Brand and Title */}
      <div>
        <h1 className="text-2xl font-bold">{product?.brand}</h1>
        <p className="text-lg text-gray-600">{product?.name}</p>
        <p className="text-sm text-gray-500">SKU: {product?.sku}</p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">
          {currency}{product.price.toFixed(2)} - ${(product.price + 295).toFixed(2)}
        </span>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Colors</h2>
          <span className="text-sm text-gray-500">
            {selectedColor ? `Selected: ${selectedColor}` : "Select a color"}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {colors.map((color, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                      ${color.name === selectedColor 
                        ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                        : 'border-gray-200 hover:border-primary/50'
                      }`}
                  >
                    <Image
                      src={color.img[0]}
                      alt={color.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{color.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Size</h2>
          <span className="text-sm text-gray-500">
            {SelectSize ? `Selected: ${SelectSize}` : "Select a size"}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size, index) => {
            const stockStatus = getStockStatus(size);
            const isOutOfStock = size.remainingStock <= 0;
            
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => !isOutOfStock && SetSelectSize(size.size)}
                      disabled={isOutOfStock}
                      className={`
                        py-3 px-4 rounded-md text-sm font-medium transition-all
                        ${SelectSize === size.size 
                          ? 'bg-primary text-white' 
                          : isOutOfStock 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white border border-gray-200 hover:border-primary'
                        }
                      `}
                    >
                      {size.size}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stockStatus || `In Stock: ${size.remainingStock}`}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>

      {/* Size Guide */}
      {product?.sizeGuide && (
        <button 
          className="text-sm text-primary underline hover:text-primary/80"
          onClick={() => window.open(product.sizeGuide, '_blank')}
        >
          Size Guide
        </button>
      )}

      {/* Stock Status */}
      {SelectSize && sizes.find(s => s.size === SelectSize) && (
        <div className="text-sm">
          <span className="font-medium">Availability: </span>
          <span className={`${
            sizes.find(s => s.size === SelectSize)?.remainingStock! <= 5 
              ? 'text-orange-500' 
              : 'text-green-600'
          }`}>
            {getStockStatus(sizes.find(s => s.size === SelectSize)!) || 'In Stock'}
          </span>
        </div>
      )}

      {/* Fabric Selection */}
      {product?.customization?.fabrics && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Select Fabric</h2>
            <span className="text-sm text-gray-500">
              {selectedFabric ? `Selected: ${selectedFabric}` : "Select a fabric"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.customization.fabrics.map((fabric, index) => (
              <button
                key={index}
                onClick={() => setSelectedFabric(fabric.name)}
                className={`px-4 py-2 border rounded-md text-sm
                  ${selectedFabric === fabric.name 
                    ? 'border-primary bg-primary/10' 
                    : 'border-gray-200 hover:border-primary/50'
                  }`}
              >
                {fabric.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
