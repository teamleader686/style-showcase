export interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  category: string;
  description: string;
  specs: string[];
  images: string[];
  isOffer: boolean;
  discount: number;
}

export interface Banner {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface StoreSettings {
  siteName: string;
  tagline?: string;
  description?: string;
  logoUrl?: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapUrl: string;
  mapEmbed: string;
  hours: string;
  email: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
  };
  footerText?: string;
}

export interface HotDeal {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  discount: string;
}

export interface OfferItem {
  id: string;
  title: string;
  description: string;
  discount: string;
  validity: string;
  image: string;
  images?: string[];
  terms?: string[];
  expiryDate?: string;
  backgroundColor?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  phone: string;
  rating: number;
  review: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
}
