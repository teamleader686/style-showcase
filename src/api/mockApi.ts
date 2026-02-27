import { products, banners, galleryImages, settings, categories, hotDeals, offers, testimonials, faqs, stats } from "../data/mock";
import { Product, Banner, StoreSettings, Category, HotDeal, OfferItem, Testimonial, FAQItem, StatItem } from "../data/types";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async (): Promise<Product[]> => {
    await delay(500);
    return products;
};

export const getBanners = async (): Promise<Banner[]> => {
    await delay(300);
    return banners;
};

export const getCategories = async (): Promise<Category[]> => {
    await delay(200);
    return categories;
};

export const getGallery = async (): Promise<string[]> => {
    await delay(400);
    return galleryImages;
};

export const getSettings = async (): Promise<StoreSettings> => {
    await delay(200);
    return settings;
};

export const getHotDeals = async (): Promise<HotDeal[]> => {
    await delay(300);
    return hotDeals;
};

export const getOffers = async (): Promise<OfferItem[]> => {
    await delay(250);
    return offers;
};

export const getOfferById = async (id: string): Promise<OfferItem | undefined> => {
    await delay(300);
    return offers.find((offer) => offer.id === id);
};
