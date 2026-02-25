import { Product, Banner, Category, StoreSettings, HotDeal } from "./types";

export const hotDeals: HotDeal[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 134900,
    originalPrice: 159900,
    image: "/images/hot-deal-1.jpg",
    discount: "16% OFF"
  },
  {
    id: 5,
    name: "Premium Silicone Case",
    price: 999,
    originalPrice: 1999,
    image: "/images/hot-deal-2.jpg",
    discount: "50% OFF"
  },
  {
    id: 7,
    name: "65W GaN Charger",
    price: 1499,
    originalPrice: 2499,
    image: "/images/hot-deal-3.jpg",
    discount: "40% OFF"
  },
  {
    id: 9,
    name: "Sony WH-1000XM5",
    price: 26990,
    originalPrice: 34990,
    image: "/images/hot-deal-4.jpg",
    discount: "23% OFF"
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    subtitle: "256GB - Natural Titanium",
    price: 134900,
    originalPrice: 159900,
    category: "mobiles",
    description: "The most powerful iPhone ever with A17 Pro chip, titanium design, and advanced camera system with 5x optical zoom.",
    specs: ["A17 Pro Chip", "48MP Camera", "6.7\" Super Retina XDR", "Titanium Body", "USB-C"],
    images: [
      "/images/p1-1.jpg",
      "/images/p1-2.jpg",
    ],
    isOffer: true,
    discount: 16,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    subtitle: "512GB - Titanium Gray",
    price: 129999,
    originalPrice: 144999,
    category: "mobiles",
    description: "Galaxy AI is here. The most powerful Galaxy experience yet with built-in AI features.",
    specs: ["Snapdragon 8 Gen 3", "200MP Camera", "6.8\" QHD+ AMOLED", "S Pen Built-in", "5000mAh"],
    images: [
      "/images/p2-1.jpg",
      "/images/p2-2.jpg",
    ],
    isOffer: true,
    discount: 10,
  },
  {
    id: 3,
    name: "OnePlus 12",
    subtitle: "256GB - Flowy Emerald",
    price: 64999,
    originalPrice: 69999,
    category: "mobiles",
    description: "Flagship killer with Snapdragon 8 Gen 3 and Hasselblad camera system.",
    specs: ["Snapdragon 8 Gen 3", "50MP Hasselblad", "6.82\" 2K LTPO", "5400mAh", "100W SUPERVOOC"],
    images: [
      "/images/p3-1.jpg",
      "/images/p3-2.jpg",
    ],
    isOffer: false,
    discount: 7,
  },
  {
    id: 4,
    name: "Google Pixel 8 Pro",
    subtitle: "128GB - Obsidian",
    price: 83999,
    originalPrice: 106999,
    category: "mobiles",
    description: "The best of Google with the most advanced Pixel camera yet and Google AI.",
    specs: ["Tensor G3", "50MP Camera", "6.7\" LTPO OLED", "AI Magic Eraser", "7 Years Updates"],
    images: [
      "/images/p4-1.jpg",
      "/images/p4-2.jpg",
    ],
    isOffer: true,
    discount: 21,
  },
  {
    id: 5,
    name: "Premium Silicone Case",
    subtitle: "For iPhone 15 Series",
    price: 999,
    originalPrice: 1999,
    category: "cases",
    description: "Ultra-thin premium silicone case with microfiber lining for scratch protection.",
    specs: ["Silicone Material", "Microfiber Lining", "Precise Cutouts", "Wireless Charging Compatible"],
    images: [
      "/images/c1-1.jpg",
      "/images/c1-2.jpg",
    ],
    isOffer: true,
    discount: 50,
  },
  {
    id: 6,
    name: "Clear Armor Case",
    subtitle: "Universal Anti-Shock",
    price: 599,
    originalPrice: 1299,
    category: "cases",
    description: "Military-grade drop protection with crystal clear transparency.",
    specs: ["Polycarbonate Back", "TPU Bumper", "Air Cushion Corners", "Anti-Yellowing"],
    images: [
      "/images/c2-2.jpg",
      "/images/c2-2.jpg",
    ],
    isOffer: false,
    discount: 54,
  },
  {
    id: 7,
    name: "65W GaN Charger",
    subtitle: "USB-C Fast Charging",
    price: 1499,
    originalPrice: 2499,
    category: "chargers",
    description: "Ultra-compact GaN charger with 65W fast charging for phones, tablets, and laptops.",
    specs: ["65W Output", "GaN Technology", "USB-C PD 3.0", "Compact Design", "Universal Voltage"],
    images: [
      "/images/ch1-1.jpg",
      "/images/ch1-2.jpg",
    ],
    isOffer: true,
    discount: 40,
  },
  {
    id: 8,
    name: "20W Car Charger",
    subtitle: "Dual Port Fast Charge",
    price: 799,
    originalPrice: 1499,
    category: "chargers",
    description: "Dual-port car charger with 20W USB-C and 18W USB-A fast charging.",
    specs: ["20W USB-C", "18W USB-A", "LED Indicator", "Overheat Protection"],
    images: [
      "/images/ch2-1.jpg",
      "/images/ch2-2.jpg",
    ],
    isOffer: false,
    discount: 47,
  },
  {
    id: 9,
    name: "Sony WH-1000XM5",
    subtitle: "Wireless ANC Headphones",
    price: 26990,
    originalPrice: 34990,
    category: "earphones",
    description: "Industry-leading noise canceling with Auto NC Optimizer and crystal clear hands-free calling.",
    specs: ["30mm Driver", "30hr Battery", "ANC", "LDAC Codec", "Multipoint Connection"],
    images: [
      "/images/e1-1.jpg",
      "/images/e1-2.jpg",
    ],
    isOffer: true,
    discount: 23,
  },
  {
    id: 10,
    name: "AirPods Pro 2",
    subtitle: "USB-C with MagSafe",
    price: 20900,
    originalPrice: 24900,
    category: "earphones",
    description: "Rebuilt from the sound up with Apple H2 chip. Adaptive Audio, personalized spatial audio.",
    specs: ["Apple H2 Chip", "ANC + Transparency", "6hr Battery", "MagSafe Case", "IP54 Rated"],
    images: [
      "/images/e2-1.jpg",
      "/images/e2-2.jpg",
    ],
    isOffer: false,
    discount: 16,
  },
  {
    id: 11,
    name: "Realme Narzo 70x",
    subtitle: "128GB - Ice Blue",
    price: 11999,
    originalPrice: 14999,
    category: "mobiles",
    description: "Best budget 5G phone with 120Hz display and 50MP AI camera.",
    specs: ["Dimensity 6100+", "50MP AI Camera", "6.72\" 120Hz", "5000mAh", "33W Charging"],
    images: [
      "/images/p5-1.jpg",
      "/images/p5-2.jpg",
    ],
    isOffer: true,
    discount: 20,
  },
  {
    id: 12,
    name: "USB-C to Lightning Cable",
    subtitle: "1.5m Braided Nylon",
    price: 399,
    originalPrice: 899,
    category: "chargers",
    description: "Premium braided nylon cable with fast data transfer and durability.",
    specs: ["1.5m Length", "Braided Nylon", "480Mbps Transfer", "10000+ Bend Tested"],
    images: [
      "/images/ch3-2.jpg",
      "/images/ch3-2.jpg",
    ],
    isOffer: false,
    discount: 56,
  },
];

export const banners: Banner[] = [
  {
    id: 1,
    image: "/images/banner-1.jpg",
    title: "Summer Mega Sale",
    subtitle: "Up to 50% off on all accessories",
  },
  {
    id: 2,
    image: "/images/banner-2.jpg",
    title: "New Arrivals",
    subtitle: "Latest smartphones now in stock",
  },
  {
    id: 3,
    image: "/images/banner-3.jpg",
    title: "Premium Earphones",
    subtitle: "Experience studio-quality sound",
  },
];

export const categories: Category[] = [
  { id: "mobiles", name: "Mobiles", image: "/images/p1-1.jpg" },
  { id: "cases", name: "Accessories & Cases", image: "/images/c1-1.jpg" },
  { id: "chargers", name: "Chargers", image: "/images/ch1-1.jpg" },
  { id: "earphones", name: "Earphones", image: "/images/e1-1.jpg" },
];

export const galleryImages: string[] = [
  "/images/gal-1.jpg",
  "/images/gal-2.jpg",
  "/images/gal-4.jpg",
  "/images/gal-5.jpg",
  "/images/gal-6.jpg",
  "/images/gal-7.jpg",
  "/images/gal-8.jpg",
];

export const settings: StoreSettings = {
  siteName: "MobiMart",
  tagline: "Your Premium Tech Destination",
  description: "We provide the best mobile phones, accessories, and gadgets at unbeatable prices. Visit our store or order online for fast delivery.",
  // logoUrl: "/images/logo.png", // Optional: Add a logo image
  phone: "9876543210",
  whatsapp: "919876543210",
  address: "123, Tech Street, Electronic City, Bangalore - 560100",
  mapUrl: "https://www.google.com/maps?q=Electronic+City+Bangalore",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.052745753186!2d77.6688!3d12.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzQ0LjIiTiA3N8KwNDAnMDcuNyJF!5e0!3m2!1sen!2sin!4v1",
  hours: "Mon - Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 7:00 PM",
  email: "hello@mobimart.in",
  socialLinks: {
    instagram: "https://instagram.com/mobimart",
    facebook: "https://facebook.com/mobimart",
  },
  footerText: "Your trusted local electronics store.",
};

export function formatPrice(price: number): string {
  return "₹" + price.toLocaleString("en-IN");
}
