import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1A1A1A] rounded-sm flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">ST</span>
            </div>
            <span className="text-sm font-bold tracking-widest uppercase">
              SaleTrackr
            </span>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-[#1A1A1A] tracking-wider uppercase transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-xs text-gray-400 hover:text-[#1A1A1A] tracking-wider uppercase transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/add"
              className="text-xs text-gray-400 hover:text-[#1A1A1A] tracking-wider uppercase transition-colors"
            >
              Add Product
            </Link>
          </div>
          <p className="text-[11px] text-gray-300 tracking-wider">
            &copy; 2026 SALETRACKR. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
