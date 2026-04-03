"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products, getOnSaleCount } from "../data/products";
import ProductCard from "../components/ProductCard";

type Filter = "all" | "on-sale";

export default function DashboardPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [trackedProducts, setTrackedProducts] = useState(products);
  const onSaleCount = getOnSaleCount();

  const filteredProducts = useMemo(() => {
    if (filter === "on-sale") return trackedProducts.filter((p) => p.onSale);
    return trackedProducts;
  }, [trackedProducts, filter]);

  const handleRemove = (id: string) => {
    setTrackedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-[13px] font-bold tracking-widest uppercase text-black">
            SaleTrackr
          </span>
          <Link href="/add" className="text-[11px] font-medium tracking-wider uppercase text-gray-500">
            + Add
          </Link>
        </div>
      </div>

      {/* Announcement bar */}
      {onSaleCount > 0 && (
        <div className="bg-black py-2 text-center">
          <span className="text-white text-[10px] font-medium tracking-widest uppercase">
            {onSaleCount} {onSaleCount === 1 ? "item" : "items"} on sale right now
          </span>
        </div>
      )}

      {/* Page title + filter */}
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-center text-[15px] font-bold tracking-widest uppercase text-black mb-4">
          Your Products
        </h1>
        <div className="flex items-center justify-center gap-6 border-b border-gray-200">
          {(
            [
              { key: "all", label: `All (${trackedProducts.length})` },
              { key: "on-sale", label: `On Sale (${onSaleCount})` },
            ] as { key: Filter; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`pb-2.5 text-[10px] font-bold tracking-widest uppercase transition-colors ${
                filter === tab.key
                  ? "text-black border-b-2 border-black -mb-px"
                  : "text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="px-3 pb-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-2 gap-y-5 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[11px] text-gray-400 tracking-wider uppercase">
              No items to show
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
