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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-wider uppercase">
              Your Products
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {trackedProducts.length} items tracked
            </p>
          </div>
        </div>

        {/* Sale count banner - full width horizontal rectangle, white bg */}
        {onSaleCount > 0 && filter !== "on-sale" && (
          <button
            onClick={() => setFilter("on-sale")}
            className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all mb-4 p-6 flex items-center justify-between group border border-gray-100"
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center">
                  <span className="text-3xl font-black text-[#1A1A1A]">
                    {onSaleCount}
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-pulse border-2 border-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold tracking-wider uppercase text-[#1A1A1A]">
                  {onSaleCount} {onSaleCount === 1 ? "item" : "items"} on sale right now
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Tap to view your products that are currently discounted
                </p>
              </div>
            </div>
            <div className="bg-[#1A1A1A] text-white px-5 py-2.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase group-hover:bg-gray-800 transition-colors">
              View Sales →
            </div>
          </button>
        )}

        {/* Add New Product bar - blue, below sale banner */}
        <Link
          href="/add"
          className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md mb-8"
        >
          <span className="flex items-center justify-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Product
          </span>
        </Link>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
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
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm tracking-wide focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-gray-300"
            />
          </div>

          <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-100">
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
                className={`px-4 py-2 text-[11px] font-semibold tracking-wider uppercase transition-colors rounded-md ${
                  filter === tab.key
                    ? "bg-[#1A1A1A] text-white"
                    : "text-gray-400 hover:text-[#1A1A1A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-3">
                <ProductCard
                  product={product}
                  showRemove
                  onRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-8 h-8 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-2">
              No Products Tracked Yet
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Paste a URL to start tracking your first product.
            </p>
            <Link
              href="/add"
              className="inline-block bg-[#1A1A1A] text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add Your First Product
            </Link>
          </div>
        )}

        {/* Bottom spacer */}
        <div className="mt-8" />
      </main>

      <Footer />
    </div>
  );
}
