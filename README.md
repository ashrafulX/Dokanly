# Dokanly — Full-Stack E-Commerce System

<p>
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
  <img src="https://img.shields.io/badge/DRF-A30000?style=for-the-badge&logo=django&logoColor=white" alt="DRF" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

<p>
  <a href="https://dokanly.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🟢_Live_Store-16a34a?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Store" />
  </a>
  <a href="https://dokanly-server.vercel.app/swagger/" target="_blank">
    <img src="https://img.shields.io/badge/Backend_API-0284c7?style=for-the-badge&logo=django&logoColor=white" alt="Backend API" />
  </a>
  <a href="https://github.com/ashrafulX/Dokanly/releases" target="_blank">
    <img src="https://img.shields.io/badge/Android_App-2563eb?style=for-the-badge&logo=android&logoColor=white" alt="Android App" />
  </a>
</p>

Dokanly is a full-stack e-commerce system built with a **Django REST Framework** backend, a **React (Vite)** web store, and a **React Native (Expo)** Android mobile app. It includes secure JWT authentication, real-time product search & filtering, Cloudinary image management, synchronized shopping carts, and a complete order checkout lifecycle.

---

## 🌐 Live Services

* 🌐 **Web Store:** [https://dokanly.vercel.app](https://dokanly.vercel.app)
* ⚡ **Backend API & Swagger:** [https://dokanly-server.vercel.app/swagger/](https://dokanly-server.vercel.app/swagger/)
* 📱 **Android Mobile App:** Pre-built `.apk` file is available in the root repository / releases for direct testing.

---

## 🏗️ Architecture & Stack

| Platform | Directory | Core Technologies |
| :--- | :--- | :--- |
| **Backend** | [`/backend`](./backend) | **Django**, **DRF**, **SimpleJWT**, **Djoser**, **PostgreSQL**, **Cloudinary** |
| **Web Frontend** | [`/frontend`](./frontend) | **React 19**, **Vite**, **Tailwind CSS / CSS**, **Axios** |
| **Mobile App** | [`/android`](./android) | **React Native**, **Expo SDK**, **React Navigation**, **AsyncStorage** |

---

## 🚀 Core Features

* **🔐 Authentication:** SimpleJWT with auto-refreshing token interceptors and custom user profiles (`Authorization: JWT <token>`).
* **📦 Product Catalog:** Multi-category filtering, instant search query params, and Cloudinary media handling.
* **⭐ Reviews & Ratings:** 1 to 5 star rating system with user permissions.
* **🛒 Cart & Checkout:** Persistent user shopping carts with real-time total calculation.
* **🛍️ Order Lifecycle:** Order placement and live status tracking (`Not Paid`, `Ready To Ship`, `Shipped`, `Delivered`, `Canceled`).

---

## 🛠️ How to Run Locally

```bash
git clone https://github.com/ashrafulX/Dokanly.git
cd Dokanly
```

### 1. ⚙️ Backend (Django REST Framework)
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
*API live at `http://127.0.0.1:8000/` | Swagger at `/swagger/`*

---

### 2. 💻 Web Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*Web store live at `http://localhost:5173/`*

---

### 3. 📱 Mobile App (React Native + Expo)
```bash
cd android
npm install
npm start
```
*Scan the terminal QR code with **Expo Go** on your Android phone, or install the `.apk` directly.*

---

## 📂 Project Structure

```
Dokanly/
├── backend/            # Django REST API (Auth, Products, Cart, Orders)
├── frontend/           # React + Vite Web Client
├── android/            # React Native (Expo) Android App & APK Config
└── README.md           # Master Documentation
```

---

## 👨‍💻 Author & Maintainer

* **Ashraful Islam** — [@ashrafulX](https://github.com/ashrafulX)
* **Email:** [ashrafulwho@gmail.com](mailto:ashrafulwho@gmail.com)