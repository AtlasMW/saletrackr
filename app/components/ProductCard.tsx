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
  return (
    <div className="group relative">
      {/* Image container */}
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

          {/* Sale badge - top right */}
          {product.onSale && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 via-orange-400 to-pink-500 px-3 py-1 rounded-sm">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white">
                Sale
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product info */}
      <div className="space-y-1.5">
        <p className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">
          {product.brand}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xs font-semibold tracking-wider uppercase leading-tight hover:text-gray-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          {product.onSale ? (
            <>
              <span className="text-sm font-bold">
                ${product.currentPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-sm">
                -{product.discountPercent}%
              </span>
            </>
          ) : (
            <span className="text-sm font-medium">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Saving */}
        {product.onSale && product.saving && (
          <p className="text-[11px] text-green-600 font-medium">
            You save ${product.saving.toFixed(2)}
          </p>
        )}

        {/* Discount code */}
        {product.discountCode && (
          <div className="inline-block bg-gray-100 px-2 py-1 rounded-sm">
            <span className="text-[10px] font-bold tracking-wider text-gray-600">
              CODE: {product.discountCode}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
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
