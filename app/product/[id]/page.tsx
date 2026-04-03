"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "../../data/products";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const maxPrice = Math.max(...product.priceHistory.map((p) => p.price));
  const minPrice = Math.min(...product.priceHistory.map((p) => p.price));
  const priceRange = maxPrice - minPrice || 1;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-gray-400 tracking-wider uppercase mb-8">
          <Link href="/dashboard" className="hover:text-[#1A1A1A] transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.onSale && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 via-orange-400 to-pink-500 px-4 py-2 rounded-sm">
                <span className="text-xs font-bold tracking-widest uppercase text-white">
                  Sale
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wider uppercase mb-1">
                {product.retailer}
              </p>
              <h1 className="text-2xl font-bold tracking-wider uppercase">
                {product.title}
              </h1>
              <p className="text-sm text-gray-400 mt-1">{product.brand}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              {product.onSale ? (
                <>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold">
                      ${product.currentPrice.toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded-sm">
                      -{product.discountPercent}% OFF
                    </span>
                    {product.saving && (
                      <span className="text-sm text-green-600 font-medium">
                        You save ${product.saving.toFixed(2)}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-3xl font-bold">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Discount Code */}
            {product.discountCode && (
              <div className="bg-gray-50 p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-gray-400 tracking-wider uppercase mb-1">
                    Discount Code
                  </p>
                  <p className="text-lg font-bold tracking-widest">
                    {product.discountCode}
                  </p>
                </div>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(product.discountCode || "")
                  }
                  className="text-xs font-semibold tracking-wider uppercase text-gray-400 hover:text-[#1A1A1A] transition-colors"
                >
                  Copy
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#1A1A1A] text-white text-center py-4 text-sm font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors"
              >
                Buy Now
              </a>
              <button className="px-6 py-4 text-sm font-semibold tracking-widest uppercase border border-gray-200 text-red-500 hover:border-red-500 transition-colors">
                Remove
              </button>
            </div>

            {/* Price History */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold tracking-wider uppercase mb-6">
                Price History
              </h3>

              {/* Simple chart */}
              <div className="relative h-48 flex items-end gap-1">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-[10px] text-gray-400 font-medium">
                  <span>${maxPrice.toFixed(0)}</span>
                  <span>${((maxPrice + minPrice) / 2).toFixed(0)}</span>
                  <span>${minPrice.toFixed(0)}</span>
                </div>

                {/* Bars */}
                <div className="ml-18 flex-1 flex items-end gap-2">
                  {product.priceHistory.map((point, i) => {
                    const height =
                      ((point.price - minPrice) / priceRange) * 100;
                    const isLatest = i === product.priceHistory.length - 1;
                    const isLowest = point.price === minPrice;

                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <span className="text-[10px] font-bold text-gray-500">
                          ${point.price.toFixed(0)}
                        </span>
                        <div
                          className={`w-full rounded-t-sm transition-all ${
                            isLowest
                              ? "bg-gradient-to-t from-green-400 to-green-300"
                              : isLatest
                              ? "bg-[#1A1A1A]"
                              : "bg-gray-200"
                          }`}
                          style={{
                            height: `${Math.max(height, 10)}%`,
                          }}
                        ></div>
                        <span className="text-[9px] text-gray-400">
                          {new Date(point.date).toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Added</span>
                <span className="font-medium">
                  {new Date(product.dateAdded).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Retailer</span>
                <span className="font-medium">{product.retailer}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
