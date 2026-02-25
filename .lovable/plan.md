

# Mobile & Accessories Store — Implementation Plan

## Overview
A modern, static eCommerce-style website for mobile phones and accessories, using mock data only. Inspired by the clean, card-based mobile shopping app layout from the reference images.

---

## Pages & Features

### 1. Home Page
- **Search bar** at the top with search icon
- **Hero banner slider** — auto-rotating promotional banners (e.g., "Summer Sale", "New Arrivals")
- **Category circles** — horizontal scrollable row with circular icons (Mobiles, Cases, Chargers, Earphones, etc.)
- **Top Products section** — 2-column grid of product cards with image, name, price, discount badge, and wishlist heart icon
- **Offer section** — highlighted deals with percentage-off badges

### 2. Category Page
- **Filter chips** at the top (All, Mobiles, Cases, Earphones, Chargers, etc.)
- **Sort by** dropdown
- **Product grid** — filtered by selected category
- Product cards showing image, name, subtitle, original price, sale price, and discount percentage

### 3. Product Detail Page
- **Image gallery** with multiple product images (swipeable)
- Product name, price, description, and specs
- **WhatsApp button** — "Order via WhatsApp" linking to wa.me
- **Share button** — Web Share API with copy-link fallback
- Deep linking support via URL query params (`?id=1`)

### 4. Gallery Page
- Grid of shop/product images
- **Lightbox preview** — click to view full-size image in overlay

### 5. Contact Page
- Store name, phone number, WhatsApp link
- Address with **Google Map embed**
- **Call Now** button
- Business hours

---

## Navigation
- **Top navbar** on desktop — logo, search, nav links
- **Bottom tab bar** on mobile — Home, Categories, Gallery, Contact icons with active highlight
- Active page visually highlighted

---

## UI/UX Design (Matching Reference Style)
- Clean white background with soft shadows
- Rounded product cards with heart/wishlist icons
- Discount badges (red/pink) on product cards
- Bold pricing with strikethrough original price
- Circular category icons
- Smooth hover effects and transitions
- Shimmer/skeleton loading placeholders
- Lazy-loaded images

---

## Responsive Grid
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns

---

## Mock Data
- ~12 products (phones, cases, earphones, chargers) with names, prices, categories, discount info, and placeholder images
- Banner slides
- Gallery images
- Store settings (name, phone, address, map link)

---

## Technical Approach
- React + Vite (already set up)
- React Router for multi-page navigation
- Tailwind CSS for styling
- All data from static JS/TS objects — no backend
- Reusable components: ProductCard, CategoryChip, Banner, BottomNav, Navbar, Skeleton
- Performance: lazy loading, clean code, optimized structure

