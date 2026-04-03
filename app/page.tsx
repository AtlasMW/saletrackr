"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "./data/products";
import Footer from "./components/Footer";

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const featuredProducts = products.slice(0, 8);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/add${url ? `?url=${encodeURIComponent(url)}` : ""}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal top bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1A1A1A] rounded-sm flex items-center justify-center">
            <span className="text-white text-sm font-bold">ST</span>
          </div>
          <span className="text-lg font-bold tracking-widest uppercase">
            SaleTrackr
          </span>
        </div>
        <Link
          href="/dashboard"
          className="text-sm font-medium tracking-wider uppercase text-gray-400 hover:text-[#1A1A1A] transition-colors"
        >
          Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-tight">
          Track it.
          <br />
          Wait for the sale.
          <br />
          <span className="bg-gradient-to-r from-purple-500 via-orange-400 to-pink-500 bg-clip-text text-transparent">
            Save.
          </span>
        </h1>
        <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto">
          Paste any product URL from your favourite clothing stores. We monitor
          it and notify you the moment it goes on sale.
        </p>

        {/* URL Input */}
        <form
          onSubmit={handleTrack}
          className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste any product URL..."
            className="flex-1 px-5 py-4 border border-gray-200 text-sm tracking-wide focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-gray-300"
          />
          <button
            type="submit"
            className="bg-[#1A1A1A] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors shrink-0"
          >
            Track This
          </button>
        </form>
      </section>

      {/* Featured tracked products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">
            Currently Tracking
          </p>
          <h2 className="text-2xl font-bold tracking-wider uppercase">
            Popular Products
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-3">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {product.onSale && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 via-orange-400 to-pink-500 px-3 py-1 rounded-sm">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white">
                      Sale
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">
                {product.brand}
              </p>
              <h3 className="text-xs font-semibold tracking-wider uppercase mt-1">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                {product.onSale ? (
                  <>
                    <span className="text-sm font-bold">
                      ${product.currentPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-medium">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">
              Simple as
            </p>
            <h2 className="text-2xl font-bold tracking-wider uppercase">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-lg font-bold">1</span>
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-3">
                Paste URL
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Copy the product link from any clothing website. Paste it into
                SaleTrackr. Done.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-lg font-bold">2</span>
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-3">
                We Monitor
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We check the retailer daily for sales, promotions, and price
                drops on your tracked products.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-lg font-bold">3</span>
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-3">
                Get Notified
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                When the price drops or a sale starts, you get notified
                instantly. Never miss a deal again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-wider uppercase mb-4">
          Stop Paying Full Price
        </h2>
        <p className="text-gray-400 mb-8">
          Join thousands of smart shoppers who never miss a sale.
        </p>
        <Link
          href="/add"
          className="inline-block bg-[#1A1A1A] text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          Start Tracking
        </Link>
      </section>

      <Footer />
    </div>
  );
}
