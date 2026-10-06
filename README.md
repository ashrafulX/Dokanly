<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,11,19,25&height=180&section=header&text=DOKANLY&fontSize=52&fontAlignY=38&fontColor=ffffff&desc=Modern%20Full-Stack%20E-Commerce%20Ecosystem&descSize=16&descAlignY=62&descColor=e0e7ff" width="100%" alt="Dokanly Banner" />
</p>

<p align="center">
  <a href="https://dokanly.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Store-dokanly.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Store" />
  </a>
  <a href="https://dokanly-server.vercel.app/swagger/">
    <img src="https://img.shields.io/badge/Backend%20API-Swagger%20Docs-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Swagger Docs" />
  </a>
  <a href="https://github.com/ashrafulX/Dokanly/releases">
    <img src="https://img.shields.io/badge/Android%20App-Download%20APK-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Download APK" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white" alt="Django" />
  <img src="https://img.shields.io/badge/Django_REST_Framework-A30000?style=flat-square&logo=django&logoColor=white" alt="DRF" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white" alt="Postgres" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/JWT_Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

---

### 🌟 About Dokanly

**Dokanly** is a complete, multi-platform e-commerce solution built with a **Django REST Framework** backend, a **React (Vite)** web frontend, and a **React Native (Expo)** Android mobile app. It provides secure JWT authentication, real-time product filtering and search, Cloudinary media hosting, synchronized shopping carts, and a streamlined order checkout lifecycle.

---

## 🌐 Live Deployments

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