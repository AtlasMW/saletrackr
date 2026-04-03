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

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.retailer.toLowerCase().includes(q)
      );
    }

    // Filter
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

      {/* Sale announcement bar removed - replaced with in-grid sale tile */}

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
          <Link
            href="/add"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Product
          </Link>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          {/* Search */}
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
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm tracking-wide focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-gray-300"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-gray-50 p-1">
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
                className={`px-4 py-2 text-[11px] font-semibold tracking-wider uppercase transition-colors ${
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {/* Sale count tile - first position */}
            {onSaleCount > 0 && filter !== "on-sale" && (
              <button
                onClick={() => setFilter("on-sale")}
                className="relative aspect-[3/4] bg-[#1A1A1A] rounded-2xl flex flex-col items-center justify-center p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform">
                  {onSaleCount}
                </div>
                <div className="text-xs font-bold tracking-widest uppercase text-white/70">
                  {onSaleCount === 1 ? "Item" : "Items"} on Sale
                </div>
                <div className="mt-4 bg-white/10 rounded-full px-4 py-1.5">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-white/80">
                    View All →
                  </span>
                </div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              </button>
            )}

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
          <div className="text-center py-24">
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
              className="inline-block bg-[#1A1A1A] text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
