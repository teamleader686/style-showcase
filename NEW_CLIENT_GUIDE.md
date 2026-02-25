# Static Website Business Template - Client Deployment Guide

This document outlines the step-by-step process to deploy a new website for your local business clients using this template. The goal is to maximize your recurring monthly revenue by minimizing the time it takes to set up and manage each client.

## Strategy: One Repository vs Multiple Repositories

For your business model, the simplest and most scalable approach is **"Multiple Repositories"**.
Whenever you get a new client, duplicate this base repository. This ensures that:
1. Each client has their own distinct, isolated GitHub repository.
2. If client A wants a specific color change or custom component, it won't break client B.
3. Hosting platforms (like Vercel, Netlify, or Firebase) can link directly to exactly one repository.

---

## 🚀 Step-by-Step Deployment Guide

### Step 1: Clone the Template
1. Create a new folder for your client (e.g., `client-xyz-shop`).
2. Copy all files from this template into the new folder (excluding the `.git`, `node_modules`, and `.lovable` folders).
3. Open the new folder in your code editor (like VS Code).
4. Run `npm install` to install dependencies.

### Step 2: Configure Store Settings
All business and contact information is managed in one place.
1. Open `src/data/mock.ts`.
2. Scroll to the `export const settings: StoreSettings = { ... }` section.
3. Update the fields:
   * `siteName`: The name of the client's business.
   * `tagline`: A short punchy banner text (e.g., "City's Best Mobile Repairs").
   * `description`: A small paragraph for the "About Us" section on the Home page.
   * `phone` & `whatsapp`: Crucial! Ensure the WhatsApp number has the country code (e.g., `919876543210`).
   * `address`, `mapUrl`, and `mapEmbed`: The Google Maps info.
   * `socialLinks`: Provide Instagram, Facebook links (remove the lines if the client doesn't use social media).

### Step 3: Update Brand Assets
Replace the dummy images inside the `public/images/` folder with the client's actual images.
* **Hero Banners**: Add new banners and update the `banners` array in `mock.ts`. Keep them high quality with an aspect ratio of roughly '2.4:1' for desktop / '1:1' for mobile.
* **Gallery**: Add images of the store and update `galleryImages` array.
* **Logo**: Add `logo.png` to `/public/images/` and uncomment the `logoUrl: "/images/logo.png"` line in `settings`.

### Step 4: Add Products and Offers
1. Open `src/data/mock.ts`.
2. Update the `products` array with the client's inventory. Make sure to define `images`, `price`, and `originalPrice`.
3. If they have special deals, update the `hotDeals` array to feature them on the homepage.
4. Update definitions in `categories` to match their inventory type.

### Step 5: Update SEO Meta Tags
Since this is a static site without a backend, good SEO is important!
1. Open `index.html`.
2. Change the `<title>` from `StoreName - Tech & Accessories` to `[Client Name] - [Short description]`.
3. Update the `og:title`, `og:description`, and `description` meta tags.
4. (Optional) Replace `favicon.ico` in the `public` directory.

### Step 6: Test Locally
Run the development server to verify everything looks correct:
```bash
npm run dev
```
1. Click the floating WhatsApp button to ensure it maps to the correct number.
2. Test the map on the Contact page.
3. View the website on Chrome DevTools "Mobile View" to ensure images aren't cropped weirdly.

### Step 7: Deploy for the Client!
1. Create a new GitHub repository for the client (e.g., `github.com/YourUsername/client-xyz`).
2. Push the code:
   ```bash
   git init
   git add .
   git commit -m "Initial launch"
   git remote add origin https://github.com/YourUsername/client-xyz.git
   git push -u origin main
   ```
3. Go to Vercel (or Netlify/Firebase), "Add New Project", select the repo, and hit Deploy. (Vercel is highly recommended for React/Vite static apps).
4. Share the Vercel link (or custom domain) with the client and collect your monthly maintenance fee! 💰

---

## 🛠 Maintenance (Monthly Updates)
When the client asks for an update (e.g., "Add these 3 new products"):
1. Open their specific project repository on your computer.
2. Drop their new product images into `public/images/`.
3. Add 3 new objects to the `products` array in `src/data/mock.ts`.
4. Commit and push to GitHub (`git commit -am "Update products" && git push`).
5. Vercel will automatically deploy the changes in ~30 seconds!
