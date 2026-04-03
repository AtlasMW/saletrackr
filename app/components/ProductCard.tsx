"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  showRemove?: boolean;
  onRemove?: (id: string) => void;
}

export default function ProductCard({
  product,
  showRemove = false,
  onRemove,
}: ProductCardProps) {
  const isStorewide = product.saleType === "storewide";
  const isCoupon = product.saleType === "coupon";
  const isOnSale = product.onSale;

  return (
    <div className="group relative flex flex-col h-full p-1">
      {/* Image container - fixed aspect ratio */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4 rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Retailer badge - top left, only on non-sale items */}
          {!isOnSale && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-sm">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-600">
                {product.retailer}
              </span>
            </div>
          )}

          {/* Sale banner across top of image */}
          {isOnSale && (
            <div className="absolute top-0 left-0 right-0 bg-emerald-600 py-2 px-3 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white">
                {isStorewide ? "Storewide Sale" : "Coupon Available"}
              </span>
              {product.discountPercent && (
                <span className="text-[10px] font-black text-white">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>
          )}

          {/* Discount percentage tile - bottom right corner (only on sale) */}
          {isOnSale && product.discountPercent && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm w-14 h-14 rounded-xl shadow-lg flex flex-col items-center justify-center">
              <span className="text-base font-black text-[#1A1A1A] leading-none">
                {product.discountPercent}%
              </span>
              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">
                Off
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product info - flex-grow to push button to bottom */}
      <div className="flex flex-col flex-grow px-1">
        {/* Brand */}
        <p className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">
          {product.brand}
        </p>

        {/* Title - fixed height for alignment */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-[13px] font-semibold tracking-wide uppercase leading-snug hover:text-gray-600 transition-colors mt-1.5 min-h-[36px] line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Sale name label */}
        {isOnSale && product.saleName && (
          <p className="text-[10px] font-medium text-gray-400 mt-1 tracking-wide">
            {product.saleName}
          </p>
        )}

        {/* Pricing block */}
        <div className="mt-3">
          {isOnSale ? (
            <div className="flex items-baseline gap-2.5">
              <span className="text-base font-bold text-[#1A1A1A]">
                ${product.currentPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-300 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-base font-medium text-[#1A1A1A]">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}

          {/* Saving amount */}
          {isOnSale && product.saving && (
            <p className="text-[11px] text-emerald-600 font-semibold mt-1.5">
              You save ${product.saving.toFixed(2)}
            </p>
          )}
        </div>

        {/* Coupon code or storewide indicator */}
        <div className="mt-3 min-h-[32px]">
          {isCoupon && product.discountCode && (
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-amber-600 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              <span className="text-[10px] font-bold tracking-wider text-amber-700">
                {product.discountCode}
              </span>
              <span className="text-[9px] text-amber-500 font-medium">
                at checkout
              </span>
            </div>
          )}
          {isStorewide && (
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[10px] font-bold tracking-wider text-emerald-700">
                No code needed
              </span>
            </div>
          )}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow min-h-[12px]" />

        {/* Actions - always at bottom */}
        <div className="flex items-center gap-2 mt-4 pb-1">
          {isOnSale ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 text-white text-[11px] font-bold tracking-wider uppercase text-center py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Buy Now
            </a>
          ) : (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-transparent border-2 border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-bold tracking-wider uppercase text-center py-2.5 rounded-lg hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              Buy Anyway
            </a>
          )}
          {showRemove && onRemove && (
            <button
              onClick={() => onRemove(product.id)}
              className="p-2.5 text-gray-300 hover:text-red-500 transition-colors"
              title="Remove from tracking"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
