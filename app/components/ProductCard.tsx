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
    <div className="group relative flex flex-col h-full">
      {/* Image container - fixed aspect ratio */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-3">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Retailer badge - top left */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-sm">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-600">
              {product.retailer}
            </span>
          </div>

          {/* Sale badge - top right: distinct styles for storewide vs coupon */}
          {isStorewide && (
            <div className="absolute top-3 right-3 bg-[#1A1A1A] px-3 py-1.5 rounded-lg shadow-md">
              <span className="text-[9px] font-bold tracking-widest uppercase text-white">
                Storewide Sale
              </span>
            </div>
          )}
          {isCoupon && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 rounded-lg shadow-md">
              <span className="text-[9px] font-bold tracking-widest uppercase text-white">
                Coupon Available
              </span>
            </div>
          )}

          {/* Discount percentage tile - bottom right corner */}
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
      <div className="flex flex-col flex-grow">
        {/* Brand */}
        <p className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">
          {product.brand}
        </p>

        {/* Title - fixed height for alignment */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xs font-semibold tracking-wider uppercase leading-tight hover:text-gray-600 transition-colors mt-1 min-h-[32px] line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Sale name label */}
        {isOnSale && product.saleName && (
          <p className="text-[10px] font-medium text-gray-400 mt-1.5 tracking-wide">
            {product.saleName}
          </p>
        )}

        {/* Pricing block - fixed position */}
        <div className="mt-2">
          {isOnSale ? (
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[#1A1A1A]">
                ${product.currentPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-300 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-sm font-medium text-[#1A1A1A]">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}

          {/* Saving amount */}
          {isOnSale && product.saving && (
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              You save ${product.saving.toFixed(2)}
            </p>
          )}
        </div>

        {/* Coupon code or storewide indicator */}
        <div className="mt-2 min-h-[28px]">
          {isCoupon && product.discountCode && (
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-amber-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              <span className="text-[10px] font-bold tracking-wider text-amber-700">
                {product.discountCode}
              </span>
              <span className="text-[9px] text-amber-500 font-medium">
                Apply at checkout
              </span>
            </div>
          )}
          {isStorewide && (
            <div className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="text-[10px] font-bold tracking-wider text-gray-600">
                No code needed
              </span>
            </div>
          )}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow" />

        {/* Actions - always at bottom */}
        <div className="flex items-center gap-2 mt-3">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#1A1A1A] text-white text-[11px] font-semibold tracking-wider uppercase text-center py-2.5 hover:bg-gray-800 transition-colors"
          >
            Buy Now
          </a>
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
