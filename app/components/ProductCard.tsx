"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  onRemove?: (id: string) => void;
}

export default function ProductCard({ product, onRemove }: ProductCardProps) {
  return (
    <div className="relative">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
          {/* Sale badge - small, bottom left */}
          {product.onSale && (
            <div className="absolute bottom-0 left-0 bg-black px-2 py-1">
              <span className="text-[9px] font-bold tracking-widest uppercase text-white">
                Sale
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="mt-2 px-0.5">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-[11px] font-medium uppercase tracking-wide text-black leading-tight line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-1">
          {product.onSale ? (
            <>
              <span className="text-[12px] font-bold text-black">
                ${product.currentPrice.toFixed(2)}
              </span>
              <span className="text-[11px] text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-[12px] font-medium text-black">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
