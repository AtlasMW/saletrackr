"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Mock scrape result
const mockScrapedProduct = {
  title: "Relaxed Fit Cotton T-Shirt",
  brand: "H&M",
  retailer: "H&M Australia",
  price: 24.99,
  image:
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=560&fit=crop",
  url: "",
};

type Step = "input" | "loading" | "preview" | "added";

function AddProductContent() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");
  const [step, setStep] = useState<Step>("input");

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setUrl(urlParam);
    }
  }, [searchParams]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setStep("loading");
    // Simulate scraping delay
    setTimeout(() => {
      setStep("preview");
    }, 2000);
  };

  const handleAddToDashboard = () => {
    setStep("added");
  };

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold tracking-wider uppercase">
          Add Product
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Paste a product URL and we&apos;ll start tracking it for sales.
        </p>
      </div>

      {/* URL Input */}
      <form onSubmit={handleTrack} className="mb-12">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (step !== "input") setStep("input");
            }}
            placeholder="https://www.theiconic.com.au/product..."
            className="flex-1 px-5 py-4 border border-gray-200 text-sm tracking-wide focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-gray-300"
            required
          />
          <button
            type="submit"
            disabled={step === "loading"}
            className="bg-[#1A1A1A] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {step === "loading" ? "Scanning..." : "Track This Product"}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {step === "loading" && (
        <div className="text-center py-16">
          <div className="inline-block w-10 h-10 border-2 border-gray-200 border-t-[#1A1A1A] rounded-full animate-spin mb-6"></div>
          <p className="text-sm font-semibold tracking-wider uppercase">
            Scanning Product
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Fetching product details from the retailer...
          </p>
        </div>
      )}

      {/* Preview Card */}
      {step === "preview" && (
        <div className="border border-gray-100 p-6">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-6">
            Product Found
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative w-full sm:w-48 aspect-[3/4] bg-gray-50 shrink-0">
              <Image
                src={mockScrapedProduct.image}
                alt={mockScrapedProduct.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">
                {mockScrapedProduct.retailer}
              </p>
              <h3 className="text-sm font-bold tracking-wider uppercase">
                {mockScrapedProduct.title}
              </h3>
              <p className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">
                {mockScrapedProduct.brand}
              </p>
              <p className="text-lg font-bold">
                ${mockScrapedProduct.price.toFixed(2)}
              </p>
              <p className="text-[11px] text-gray-400 truncate">{url}</p>

              <button
                onClick={handleAddToDashboard}
                className="mt-4 w-full bg-[#1A1A1A] text-white px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors"
              >
                Add to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {step === "added" && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h3 className="text-sm font-bold tracking-wider uppercase mb-2">
            Product Added
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            We&apos;re now tracking this product. You&apos;ll be notified when the price
            drops.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-[#1A1A1A] text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              View Dashboard
            </Link>
            <button
              onClick={() => {
                setUrl("");
                setStep("input");
              }}
              className="px-8 py-3 text-xs font-semibold tracking-widest uppercase border border-gray-200 hover:border-[#1A1A1A] transition-colors"
            >
              Add Another
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="inline-block w-8 h-8 border-2 border-gray-200 border-t-[#1A1A1A] rounded-full animate-spin"></div>
          </div>
        }
      >
        <AddProductContent />
      </Suspense>
      <Footer />
    </div>
  );
}
