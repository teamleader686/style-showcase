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
