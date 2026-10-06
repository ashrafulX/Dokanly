# Dokanly Mobile App (React Native + Expo)

A complete cross-platform mobile e-commerce application connected directly to the **Dokanly Django Rest Framework (DRF)** backend (`https://dokanly-server.vercel.app/api/v1/`).

---

## 🚀 Features Included

1. **Authentication & Authorization:**
   - User Registration (First Name, Last Name, Email, Password, Phone Number, Delivery Address).
   - User Sign In with SimpleJWT (`POST /auth/jwt/create/`).
   - Authorization Header using `JWT <access_token>`.
   - Automatic background token refresh interceptor using `POST /auth/jwt/refresh/`.
   - User Profile management (`GET` / `PATCH` `/auth/users/me/`).

2. **Catalog & Search:**
   - Category Browsing (`GET /categories/`).
   - Real-time Product Search by name and description (`GET /products/?search=...`).
   - Category-wise product filtering (`GET /products/?category_id=...`).
   - Price range and sorting filters.
   - Pull-to-refresh on all product feeds.

3. **Product Details & Customer Reviews:**
   - Multi-image Cloudinary gallery carousel.
   - Live In-Stock / Out-of-Stock indicators.
   - Price calculation including tax (`price_with_tax`).
   - Interactive 1 to 5 Star Customer Reviews (`GET` & `POST` `/products/{id}/reviews/`).
   - Option to delete own reviews.

4. **Cart Management:**
   - Synchronized User Cart (`POST /carts/`, `GET /carts/{id}/`).
   - Real-time Add to Cart with quantity modifiers (`POST /carts/{id}/items/`, `PATCH /carts/{id}/items/{item_id}/`).
   - Remove item from cart (`DELETE /carts/{id}/items/{item_id}/`).
   - Bottom Tab badge counter updating in real-time.

5. **Checkout & Order Tracking:**
   - Instant 1-Click Checkout from cart (`POST /orders/`).
   - Order history with live status badges (`Not Paid`, `Ready To Ship`, `Shipped`, `Delivered`, `Canceled`).
   - Order detail view with item-by-item breakdown.
   - Order Cancellation mechanism (`POST /orders/{id}/cancel/`).

---

## 🛠️ How to Run the App

### 1. Start the Metro Bundler
Navigate into the `android` directory and run:
```bash
cd android
npm start
```

### 2. Run on Your Android Device (Easiest & Fastest)
1. Install **Expo Go** from Google Play Store on your Android phone.
2. Ensure your phone and computer are on the same Wi-Fi (or run `npx expo start --tunnel`).
3. Scan the QR code displayed in the terminal with the Expo Go app.

### 3. Run on Android Emulator
```bash
npm run android
```

### 4. Build Standalone Android APK (.apk file)
To generate an installable `.apk` file for testing:
```bash
npx --yes eas-cli build -p android --profile preview
```

---

## 📁 Project Directory Structure
```
android/
├── App.js                   # Root Component wrapping Context Providers & Navigation
├── app.json                 # Expo & Android Manifest configuration
├── package.json             # App dependencies
└── src/
    ├── api/
    │   └── client.js        # Axios instance with JWT interceptor & auto-refresh
    ├── constants/
    │   └── theme.js         # Dokanly UI color palette, typography & shadows
    ├── context/
    │   ├── AuthContext.js   # User session, login, register, profile update
    │   └── CartContext.js   # Cart items, badge count, quantity & checkout
    ├── components/
    │   ├── CustomButton.js  # Modern responsive button
    │   ├── CustomInput.js   # Text/Password input with validation & icons
    │   ├── ProductCard.js   # Grid product card with image & quick cart action
    │   └── LoadingSpinner.js# Loading state indicator
    ├── navigation/
    │   └── AppNavigator.js  # Bottom Tabs & Stack Navigator
    └── screens/
        ├── auth/
        │   ├── LoginScreen.js
        │   └── RegisterScreen.js
        ├── home/
        │   ├── HomeScreen.js
        │   └── CategoryProductsScreen.js
        ├── product/
        │   └── ProductDetailScreen.js
        ├── categories/
        │   └── CategoryListScreen.js
        ├── cart/
        │   └── CartScreen.js
        ├── orders/
        │   ├── OrdersScreen.js
        │   └── OrderDetailScreen.js
        └── profile/
            ├── ProfileScreen.js
            └── EditProfileScreen.js
```

