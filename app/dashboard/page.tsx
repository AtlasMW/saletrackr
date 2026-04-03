"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products, getOnSaleCount } from "../data/products";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

type Filter = "all" | "on-sale" | "price-dropped";

export default function DashboardPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [trackedProducts, setTrackedProducts] = useState(products);

  const onSaleCount = getOnSaleCount();

  const filteredProducts = useMemo(() => {
    let filtered = trackedProducts;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.retailer.toLowerCase().includes(q)
      );
    }

    switch (filter) {
      case "on-sale":
        filtered = filtered.filter((p) => p.onSale);
        break;
      case "price-dropped":
        filtered = filtered.filter(
          (p) => p.currentPrice < p.originalPrice
        );
        break;
    }

    return filtered;
  }, [trackedProducts, filter, searchQuery]);

  const handleRemove = (id: string) => {
    setTrackedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Sale announcement bar */}
      {onSaleCount > 0 && filter !== "on-sale" && (
        <button
          onClick={() => setFilter("on-sale")}
          className="w-full bg-[#1A1A1A] py-2.5 text-center"
        >
          <span className="text-white text-[11px] font-semibold tracking-widest uppercase">
            {onSaleCount} {onSaleCount === 1 ? "item" : "items"} on sale — View now →
          </span>
        </button>
      )}

      {/* Add product bar - blue */}
      <Link href="/add" className="block w-full bg-blue-600 py-2.5 text-center hover:bg-blue-700 transition-colors">
        <span className="text-white text-[11px] font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Product
        </span>
      </Link>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-sm font-bold tracking-widest uppercase">
            Your Products
          </h1>
          <span className="text-[11px] text-gray-400">
            {trackedProducts.length} items
          </span>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-3 mb-5">
          {/* Search */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-b border-gray-200 text-sm tracking-wide focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-gray-300 bg-transparent"
            />
          </div>

          {/* Filter tabs - horizontal scroll on mobile */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {(
              [
                { key: "all", label: "All" },
                { key: "on-sale", label: "On Sale" },
                { key: "price-dropped", label: "Price Dropped" },
              ] as { key: Filter; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap transition-colors ${
                  filter === tab.key
                    ? "border-b-2 border-[#1A1A1A] text-[#1A1A1A]"
                    : "text-gray-300 hover:text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - 2 columns always, matching Muscle Republic mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showRemove
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">
              No Products Found
            </h3>
            <p className="text-[11px] text-gray-300 mb-6">
              {filter !== "all" ? "Try a different filter." : "Paste a URL to start tracking."}
            </p>
            <Link
              href="/add"
              className="inline-block bg-[#1A1A1A] text-white px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Add Product
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
