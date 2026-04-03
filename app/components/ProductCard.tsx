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
    <div className="group relative">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Sale banner across top */}
          {isOnSale && (
            <div className={`absolute top-0 left-0 right-0 py-1.5 px-2 flex items-center justify-between ${
              isStorewide ? "bg-[#1A1A1A]" : "bg-amber-500"
            }`}>
              <span className="text-[9px] font-bold tracking-widest uppercase text-white">
                {isStorewide ? "Sale" : "Code Required"}
              </span>
              {product.discountPercent && (
                <span className="text-[9px] font-black text-white">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Remove button - top right outside image */}
      {showRemove && onRemove && (
        <button
          onClick={() => onRemove(product.id)}
          className="absolute top-2 right-2 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="Remove"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Product info */}
      <div className="mt-2.5 space-y-1">
        {/* Coupon code */}
        {isCoupon && product.discountCode && (
          <div className="inline-block bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
            <span className="text-[9px] font-bold tracking-wider text-amber-700">
              CODE: {product.discountCode}
            </span>
          </div>
        )}

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-[11px] font-medium tracking-wide uppercase leading-tight text-[#1A1A1A] line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-center gap-1.5">
          {isOnSale ? (
            <>
              <span className="text-[13px] font-bold text-[#1A1A1A]">
                ${product.currentPrice.toFixed(2)}
              </span>
              <span className="text-[11px] text-gray-300 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-[13px] font-medium text-[#1A1A1A]">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Saving */}
        {isOnSale && product.saving && (
          <p className="text-[10px] text-emerald-600 font-semibold">
            Save ${product.saving.toFixed(2)}
          </p>
        )}

        {/* CTA */}
        <div className="pt-1.5">
          {isOnSale ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-emerald-600 text-white text-[10px] font-bold tracking-widest uppercase text-center py-2.5 hover:bg-emerald-700 transition-colors"
            >
              Buy Now
            </a>
          ) : (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-[#1A1A1A] text-[#1A1A1A] text-[10px] font-bold tracking-widest uppercase text-center py-2 hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              Buy Anyway
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
