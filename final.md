# 🍽️ QRMenu - QR Code Based Digital Menu for Restaurants

**QRMenu** is a modern full-stack web application designed for restaurants and cafes to digitize their menu. Restaurant owners can manage their food items and generate a QR code that customers can scan to access the entire menu from their phone — all without downloading any app!

---

## 🚀 Features

### 👨‍🍳 Restaurant Owner (Admin)

- 🔐 Secure Signup/Login using JWT (stored in HTTP-only cookies)
- 🏪 Create & manage restaurant profile (name, logo, address, contact info)
- 🍕 Add/Edit/Delete food items (name, description, price, image, category)
- 🏷️ Add tags like "Spicy 🌶️", "Popular ⭐", "New 🆕"
- 📇 Organize items by category (e.g., Starters, Main Course, Drinks)
- 🧾 Set item availability status (Available / Out of Stock)
- 📤 Upload item images (via Cloudinary or local storage)
- 📎 Toggle GST-inclusive or exclusive pricing
- 🧾 View all items in list or grid view
- 📸 Auto-generate QR code linked to public restaurant menu
- 📱 Preview menu as customer (mobile responsive)
- 🖥️ Real-time menu preview with mobile responsive view
- 🔍 Search and filter items in the admin dashboard
- 📈 Basic analytics (total items, profile visits)
- 🧾 Export menu as PDF for offline/print use

---

### 🍽️ Customers

- 📷 Scan QR code to instantly access restaurant menu
- 🔎 Filter menu by category or search by name
- 🖼️ View item name, description, price, and image
- ⚡ Super-fast and responsive — works directly in browser
- 🌓 Auto light/dark theme support (optional)
- 🌐 Browser language auto-detection (multi-language support)

---

## 🔮 Future Features

- Coupon facility for restaurant owner to give discount to customers
- Spin based wheel to give discount to customers
- ♻️ Real-time updates using Socket.IO (live menu changes)
- 🛒 Cart system with table number input for dine-in orders
- 🧾 Place order directly from customer view (with sound notification to admin)
- 💸 Online payment integration (Razorpay / UPI / Paytm)
- 📬 Order status updates: Confirmed, Preparing, Ready, Delivered
- 📊 Admin dashboard with analytics:
  - Most ordered items
  - Daily/weekly reports
  - Live visitors
- 📱 Progressive Web App (PWA) support for offline access
- 🗃️ Role-based access (e.g., limited waiter access for taking orders)
- 🌍 Multi-language support (e.g., English, Hindi, Marathi)
- ⭐ Item ratings & customer feedback form
- 🧠 AI-based menu suggestions (e.g., combo recommendations)
- 🧾 Invoice download (PDF) for each order
- 📦 Manage inventory (optional: set stock count per item)
- 📅 Timed availability (e.g., Breakfast menu from 7 AM–11 AM)
- 🔔 Push notifications (order alerts for admin)
- 👥 Multi-restaurant support for single owner (e.g., chain restaurants)
- 🧑‍🍳 Kitchen Panel (simplified order view for kitchen staff)
- 📜 Terms & policies editor for each restaurant
- 👤 Customer order history (if user login is later added)
- One-click menu sharing via WhatsApp

---

## 🔐 Production-Level Security

- HTTPS enforced
- Environment-based config
- Input validation (`Joi` or `express-validator`)
- CORS restrictions
- Helmet + Rate Limiting
- Tokens stored in HTTP-only cookies

📜 License
MIT License — Free to use and modify for commercial/non-commercial use.

🙋‍♂️ Author
Developed with ❤️ by Shivam Agrawal
🔗 GitHub
