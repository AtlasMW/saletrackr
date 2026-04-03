export type SaleType = "storewide" | "coupon" | "none";

export interface Product {
  id: string;
  title: string;
  brand: string;
  retailer: string;
  retailerLogo?: string;
  url: string;
  image: string;
  originalPrice: number;
  currentPrice: number;
  onSale: boolean;
  saleType: SaleType;
  saleName?: string;
  discountCode?: string;
  discountPercent?: number;
  saving?: number;
  category: string;
  dateAdded: string;
  priceHistory: { date: string; price: number }[];
}

export const products: Product[] = [
  {
    id: "1",
    title: "Relaxed Linen Blend Shirt",
    brand: "Country Road",
    retailer: "Country Road",
    url: "https://www.countryroad.com.au/relaxed-linen-shirt",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=560&fit=crop",
    originalPrice: 139.00,
    currentPrice: 89.00,
    onSale: true,
    saleType: "storewide" as SaleType,
    saleName: "Easter Weekend Sale",
    discountPercent: 36,
    saving: 50.00,
    category: "Tops",
    dateAdded: "2026-03-15",
    priceHistory: [
      { date: "2026-03-15", price: 139.00 },
      { date: "2026-03-22", price: 139.00 },
      { date: "2026-03-29", price: 89.00 },
    ],
  },
  {
    id: "2",
    title: "Wide Leg Tailored Trousers",
    brand: "ZARA",
    retailer: "Zara",
    url: "https://www.zara.com/au/wide-leg-trousers",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=560&fit=crop",
    originalPrice: 89.95,
    currentPrice: 89.95,
    onSale: false,
    saleType: "none" as SaleType,
    category: "Bottoms",
    dateAdded: "2026-03-18",
    priceHistory: [
      { date: "2026-03-18", price: 89.95 },
      { date: "2026-03-25", price: 89.95 },
    ],
  },
  {
    id: "3",
    title: "Oversized Graphic Tee",
    brand: "ASOS",
    retailer: "ASOS",
    url: "https://www.asos.com/au/oversized-graphic-tee",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=560&fit=crop",
    originalPrice: 45.00,
    currentPrice: 27.00,
    onSale: true,
    saleType: "coupon" as SaleType,
    saleName: "Easter Promo Code",
    discountCode: "EASTER30",
    discountPercent: 40,
    saving: 18.00,
    category: "Tops",
    dateAdded: "2026-03-10",
    priceHistory: [
      { date: "2026-03-10", price: 45.00 },
      { date: "2026-03-20", price: 45.00 },
      { date: "2026-03-28", price: 27.00 },
    ],
  },
  {
    id: "4",
    title: "Wool Blend Overcoat",
    brand: "The Iconic",
    retailer: "The Iconic",
    url: "https://www.theiconic.com.au/wool-blend-overcoat",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=560&fit=crop",
    originalPrice: 299.00,
    currentPrice: 299.00,
    onSale: false,
    saleType: "none" as SaleType,
    category: "Outerwear",
    dateAdded: "2026-03-20",
    priceHistory: [
      { date: "2026-03-20", price: 299.00 },
      { date: "2026-03-27", price: 299.00 },
    ],
  },
  {
    id: "5",
    title: "Leather Chelsea Boots",
    brand: "R.M. Williams",
    retailer: "The Iconic",
    url: "https://www.theiconic.com.au/leather-chelsea-boots",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=560&fit=crop",
    originalPrice: 595.00,
    currentPrice: 416.50,
    onSale: true,
    saleType: "storewide" as SaleType,
    saleName: "Autumn Clearance",
    discountPercent: 30,
    saving: 178.50,
    category: "Shoes",
    dateAdded: "2026-03-05",
    priceHistory: [
      { date: "2026-03-05", price: 595.00 },
      { date: "2026-03-15", price: 595.00 },
      { date: "2026-03-25", price: 476.00 },
      { date: "2026-04-01", price: 416.50 },
    ],
  },
  {
    id: "6",
    title: "Slim Fit Stretch Chinos",
    brand: "Cotton On",
    retailer: "Cotton On",
    url: "https://www.cottonon.com/au/slim-fit-chinos",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=560&fit=crop",
    originalPrice: 49.99,
    currentPrice: 29.99,
    onSale: true,
    saleType: "coupon" as SaleType,
    saleName: "Autumn Promo",
    discountCode: "AUTUMN40",
    discountPercent: 40,
    saving: 20.00,
    category: "Bottoms",
    dateAdded: "2026-03-12",
    priceHistory: [
      { date: "2026-03-12", price: 49.99 },
      { date: "2026-03-19", price: 49.99 },
      { date: "2026-03-30", price: 29.99 },
    ],
  },
  {
    id: "7",
    title: "Cashmere Crew Neck Sweater",
    brand: "Uniqlo",
    retailer: "Uniqlo",
    url: "https://www.uniqlo.com/au/cashmere-crew-sweater",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=560&fit=crop",
    originalPrice: 149.90,
    currentPrice: 149.90,
    onSale: false,
    saleType: "none" as SaleType,
    category: "Knitwear",
    dateAdded: "2026-03-22",
    priceHistory: [
      { date: "2026-03-22", price: 149.90 },
      { date: "2026-03-29", price: 149.90 },
    ],
  },
  {
    id: "8",
    title: "Structured Blazer",
    brand: "Witchery",
    retailer: "The Iconic",
    url: "https://www.theiconic.com.au/structured-blazer",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=560&fit=crop",
    originalPrice: 249.95,
    currentPrice: 174.97,
    onSale: true,
    saleType: "storewide" as SaleType,
    saleName: "Mid-Season Sale",
    discountPercent: 30,
    saving: 74.98,
    category: "Outerwear",
    dateAdded: "2026-03-08",
    priceHistory: [
      { date: "2026-03-08", price: 249.95 },
      { date: "2026-03-18", price: 249.95 },
      { date: "2026-03-28", price: 199.96 },
      { date: "2026-04-02", price: 174.97 },
    ],
  },
  {
    id: "9",
    title: "High Waist Straight Jeans",
    brand: "Levi's",
    retailer: "ASOS",
    url: "https://www.asos.com/au/levis-high-waist-jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=560&fit=crop",
    originalPrice: 129.95,
    currentPrice: 129.95,
    onSale: false,
    saleType: "none" as SaleType,
    category: "Bottoms",
    dateAdded: "2026-03-25",
    priceHistory: [
      { date: "2026-03-25", price: 129.95 },
      { date: "2026-04-01", price: 129.95 },
    ],
  },
  {
    id: "10",
    title: "Minimal Leather Sneakers",
    brand: "Common Projects",
    retailer: "The Iconic",
    url: "https://www.theiconic.com.au/minimal-leather-sneakers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=560&fit=crop",
    originalPrice: 649.00,
    currentPrice: 649.00,
    onSale: false,
    saleType: "none" as SaleType,
    category: "Shoes",
    dateAdded: "2026-03-28",
    priceHistory: [
      { date: "2026-03-28", price: 649.00 },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getOnSaleProducts(): Product[] {
  return products.filter((p) => p.onSale);
}

export function getOnSaleCount(): number {
  return products.filter((p) => p.onSale).length;
}
