# QR Menu – Digital Menu App Feature Checklist

## 📋 User Roles

- [ ] Admin Role (You or system owner)
- [ ] Shop Owner Role
- [ ] Customer (Viewer - no login)

---

## 👨‍💼 Shop Owner Features

- [✅] Register / Login (JWT + Cookies)
- [ ] Create & manage shop profile (name, logo, address)
- [ ] CRUD menu items (name, desc, price, image, availability, category)
- [✅] Auto-generate QR Code linking to public menu
- [ ] Preview public menu as customer
- [ ] Shop dashboard with basic analytics (visits, scans) – _Optional_

---

## 👥 Customer Features

- [✅] Scan QR code → Open digital menu
- [ ] View categories and menu items
- [✅] No login required

---

## 🌟 Optional/Additional Features

### 🛍️ For Shop Owners

- [ ] Item variations (size, add-ons)
- [ ] Discounts / Today's special
- [ ] Reorder items via drag and drop
- [ ] Dark/light mode
- [ ] Export menu as PDF

### 📊 Dashboard

- [ ] Show number of scans
- [ ] Show number of items
- [ ] Views per day

### 🧾 Orders (Basic Flow)

- [ ] Customer can place a basic order (no payment)
- [ ] Orders visible on separate dashboard page

---

## 🚀 Future-Ready & Monetizable Features

### 💸 Subscription Plans

- [ ] Free plan (1 shop, limited items)
- [ ] Paid plan (multiple shops, advanced analytics)
- [ ] Razorpay/Stripe billing integration

### 🌐 Multi-language Menus

- [ ] Support English + Other languages

### 📦 Inventory Management

- [ ] Track item stock
- [ ] Auto-update availability

### 🤖 AI Features

- [ ] Auto-generate item descriptions
- [ ] Suggest pricing based on item/category

### 🛡️ Security & Compliance

- [ ] Input validations, rate limiting
- [ ] Privacy Policy and Terms of Use

### 📱 PWA Support

- [ ] Make app installable on phones

---

## ✅ Planning Checklist

- [ ] Roles & Auth (JWT + Cookie Auth)
- [ ] Shop Creation & Menu Management
- [ ] QR Code Generation (Public link)
- [ ] UI Design (Mobile-first, clean)
- [ ] Deployment (Vercel + Render + MongoDB Atlas)
- [ ] Future Planning Document

---

## 🧱 Required Feature Implementation Flow

### 📦 Phase 1: Project Setup

- [ ] MERN boilerplate setup
- [ ] Tailwind CSS config
- [ ] Express + MongoDB connected

### 🔐 Phase 2: Authentication

- [ ] Cafe registration + login
- [ ] Auth middleware (JWT + cookies)

### 🍽️ Phase 3: Menu Management

- [ ] Add/update/delete items
- [ ] Auto-slug from shop name
- [ ] Store slug in DB

### 🔗 Phase 4: QR Code

- [ ] Generate QR code (`/menu/:slug`)
- [ ] Download QR (SVG/PNG)

### 📱 Phase 5: Public Menu Page

- [ ] Full menu visible via QR
- [ ] Responsive mobile layout

---

## 🔧 Pages to Build

- [ ] `/signup` – Shop Sign Up
- [ ] `/login` – Shop Login
- [ ] `/dashboard` – Shop Dashboard
- [ ] `/dashboard/menu` – Menu CRUD
- [ ] `/dashboard/qr` – QR Preview/Download
- [ ] `/menu/:slug` – Public Menu Page

---

## 🔌 API Endpoints

- [ ] `POST /api/auth/signup` – Register cafe
- [ ] `POST /api/auth/login` – Login
- [ ] `GET /api/menu/:slug` – Get menu by slug
- [ ] `POST /api/menu` – Add menu item (auth req)
- [ ] `GET /api/qr/:slug` – Generate QR code

---

## 🎯 Recommended Immediate Features

### 👨‍🍳 Shop Panel

- [ ] CRUD Menu Items
- [ ] Categorized Menus (Breakfast, Lunch, etc.)
- [ ] Image Upload for Dishes
- [ ] Item Availability Toggle
- [ ] Live Preview of Menu

### 🧾 Customer View

- [ ] Filter/Search Menu Items
- [ ] Language Toggle (future)
- [ ] Dietary Tags (🌶️ 🥦 🌿 🚫🌾)
- [ ] Dark/Light Mode Toggle

---

## 🧠 Bonus & Advanced Features

### 📊 Analytics

- [ ] Most viewed items
- [ ] Daily/weekly views
- [ ] Export analytics to CSV

### 🎨 Customization

- [ ] Shop Branding (logo, color)
- [ ] Custom QR code styles

### 📱 PWA & Utility

- [ ] Export to PDF
- [ ] Print view
- [ ] Offline fallback (PWA cache)
- [ ] Social sharing

### 🤝 Customer Engagement

- [ ] Ratings/reviews
- [ ] Favorites or “Chef’s Picks”

---

## 🔧 Advanced Admin Tools

- [ ] Multi-branch shop support
- [ ] Menu scheduling (time-based)
- [ ] Staff roles (limited access)
- [ ] Discounts and daily offers
- [ ] Real-time sync (WebSocket or Firebase)

### 📱 Enhanced Customer Experience

- [ ] Item Detail Modal
- [ ] Sticky Cart (optional)
- [ ] Allergy labels & tags
- [ ] Dynamic search & filters
- [ ] Accessibility enhancements

---

## 🔗 Branding & Sharing

- [ ] Expirable QR codes
- [ ] Subdomain routing (`shop.qrmenu.app`)
- [ ] Social post generator (menu + QR)
- [ ] Emoji feedback after viewing

---

✅ Core Requirements

    User Roles: Clearly defined (Admin, Shop Owner, Customer).

    Main Features: CRUD for menu, QR code generation, public menu view, and secure auth.

    Tech Stack: MERN with Tailwind, QR package, deployment (Vercel + Render + Atlas).

    Functional & Non-Functional Requirements: Performance, scalability, and security are covered.

🌟 Optional & Future Features

    UX enhancements like dark mode, reorder items, drag & drop, export PDF.

    Dashboard stats, item analytics, and basic order queue.

    Monetization (subscriptions, payments).

    PWA, multi-language, branding, inventory tracking, social sharing, and even AI.

    Custom QR designs, restaurant theming, and admin features like multi-branch and scheduling.

🧩 What's Included That Makes It Production-Ready

    Phase-wise breakdown

    API routes defined

    Pages outlined

    Scalable ER concept (Users → Shops → Menus → Items)

    Future-ready with modular growth (admin tools, shop limits, etc.)

🔍 Only Minor Suggestions (Not Missing, but Optional):

    Database Schema Design or Models: You mention an ER diagram is "coming" — adding that will complete the tech documentation.

    Wireframes or UI Mockups: Optional, but helps developers/designers align.

    Email notifications or confirmations: Optional feature (e.g., after signup or menu view).

    Testing Strategy: Jest/Cypress or Postman tests could be mentioned if going full production.

    DevOps or CI/CD: Optional, but great for automatic deployment workflows.
