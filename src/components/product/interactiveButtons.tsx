interface Props {
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  isWishlisted: boolean;
}

export default function InteractiveButtons({ 
  onAddToCart, 
  onAddToWishlist, 
  isWishlisted 
}: Props) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onAddToCart}
        className="w-1/2 bg-primary-gradient text-white py-3 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600"
      >
        ADD TO BAG
      </button>
      <button
        onClick={onAddToWishlist}
        className="w-1/2 py-3 flex flex-row border-2 justify-center items-center gap-3"
      >
        <div className={`text-gray-500 ${isWishlisted ? "text-red-500" : ""}`}>
          ♥
        </div>
        <span>WISHLIST</span>
      </button>
    </div>
  );
}
  