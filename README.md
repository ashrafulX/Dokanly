# 🛍️ Dokanly - Full-Stack E-Commerce Ecosystem

[![Live Frontend](https://img.shields.io/badge/Frontend-Live%20Demo-brightgreen?style=for-the-badge&logo=vercel)](https://dokanly.vercel.app)
[![API Swagger Docs](https://img.shields.io/badge/Backend-Swagger%20API-blue?style=for-the-badge&logo=swagger)](https://dokanly-server.vercel.app/swagger/)
[![Mobile App](https://img.shields.io/badge/Mobile-Android%20App-orange?style=for-the-badge&logo=android)](https://github.com/ashrafulX/Dokanly/releases)

**Dokanly** is an end-to-end, multi-platform e-commerce solution comprising a robust REST API backend, a modern high-performance web frontend, and a fully functional cross-platform React Native Android mobile app.

---

## 🌐 Live Deployments & Links

* 🌐 **Web Frontend:** [https://dokanly.vercel.app](https://dokanly.vercel.app)
* ⚡ **Live Backend & API Root:** [https://dokanly-server.vercel.app/api/v1/](https://dokanly-server.vercel.app/api/v1/)
* 📖 **Interactive Swagger Documentation:** [https://dokanly-server.vercel.app/swagger/](https://dokanly-server.vercel.app/swagger/)
* 📱 **Download Android APK:** Pre-built `.apk` file is available in the root repository / releases for direct testing.

---

## 🏗️ Architecture & Tech Stack

| Platform | Directory | Stack / Technologies |
| :--- | :--- | :--- |
| **Backend** | [`/backend`](./backend) | **Django**, **Django REST Framework (DRF)**, **SimpleJWT**, **Djoser**, **PostgreSQL**, **Cloudinary** |
| **Web Frontend** | [`/frontend`](./frontend) | **React.js**, **Vite**, **Tailwind CSS / CSS**, **Axios** |
| **Mobile App** | [`/android`](./android) | **React Native**, **Expo SDK**, **React Navigation**, **AsyncStorage**, **Axios** |

---

## 🚀 Key Features

* **🔐 Authentication & User Roles:**
  * JWT-based authentication (`Authorization: JWT <token>`) with automatic token refreshing.
  * Custom user model with address, phone number, and profile management.
* **📦 Catalog, Categories & Search:**
  * Categorized product hierarchy with real-time search and multi-criteria filtering (price, category, keyword).
  * Cloudinary media storage for high-resolution product imagery.
* **⭐ Reviews & Ratings:**
  * Verified 1 to 5 star rating system with author permissions.
* **🛒 Persistent Shopping Cart:**
  * User-bound persistent shopping cart with live quantity recalculations.
* **🛍️ Order Management & Checkout:**
  * Instant checkout pipeline (`POST /orders/` with `cart_id`).
  * Real-time order status lifecycle tracking (`Not Paid` ➔ `Ready To Ship` ➔ `Shipped` ➔ `Delivered` / `Canceled`).

---

## 🛠️ Local Development & Setup Guide

Clone the repository to get started:
```bash
git clone https://github.com/ashrafulX/Dokanly.git
cd Dokanly
```

---

### 1. ⚙️ Running the Backend (Django REST Framework)

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\activate

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure your `.env` file (Database, Secret Key, Cloudinary credentials).
5. Apply database migrations & run development server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
   * *Backend will be live at `http://127.0.0.1:8000/api/v1`*
   * *Swagger UI at `http://127.0.0.1:8000/swagger/`*

---

### 2. 💻 Running the Web Frontend (React + Vite)

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   * *Frontend will run at `http://localhost:5173/`*

---

### 3. 📱 Running & Testing the Mobile App (React Native + Expo)

1. Navigate to the `android` folder:
   ```bash
   cd android
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Metro bundler:
   ```bash
   npm start
   ```
4. **Testing on Real Device:**
   * Install **Expo Go** from Google Play Store.
   * Scan the QR code displayed in your terminal.
5. **Testing Standalone APK:**
   * A ready-to-install `.apk` build is provided in the repository releases or can be generated via:
   ```bash
   npx eas-cli build -p android --profile preview
   ```

---

## 📂 Repository Structure

```
Dokanly/
├── backend/            # Django REST Framework backend API
│   ├── Dokanly/        # Project settings & URL routing
│   ├── api/            # API endpoints & permissions
│   ├── product/        # Product, Category & Review models
│   ├── order/          # Cart, CartItem & Order logic
│   └── users/          # Custom User model & auth serializers
├── frontend/           # React + Vite Web Client
│   ├── src/            # Components, pages & state
│   └── package.json
├── android/            # React Native (Expo) Mobile App
│   ├── src/
│   │   ├── api/        # Axios client with JWT auto-refresh interceptors
│   │   ├── context/    # AuthContext & CartContext
│   │   ├── screens/    # Auth, Home, Detail, Cart, Orders & Profile
│   │   └── navigation/ # Tab & Stack navigators
│   ├── app.json
│   └── eas.json        # Standalone APK build configuration
├── .gitignore
└── README.md           # Master Documentation
```

---

## 👨‍💻 Author & Maintainer

* **Ashraful Islam** - [@ashrafulX](https://github.com/ashrafulX)
* Email: [ashrafulwho@gmail.com](mailto:ashrafulwho@gmail.com)
* Project Repository: [https://github.com/ashrafulX/Dokanly](https://github.com/ashrafulX/Dokanly)