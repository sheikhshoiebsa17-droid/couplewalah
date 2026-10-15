# CoupleWalah (कपलवाला) 💍🎁
> *"Every Couple Has a Story. Make Yours Special."*

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/sheikhshoiebsa17-droid/couplewalah)

CoupleWalah is a premium, full-stack couple-gifting and e-commerce platform dedicated exclusively to romantic gifts, personalized anniversary presents, matching couple jewelry, 3D custom photo lamps, secret surprise gifting, and curated love bundles.

---

## 🌹 Brand Identity & Aesthetic Design

- **Primary Colors:**
  - **Primary Burgundy:** `#8B1E3F` (Core brand actions, prominent buttons, key accents)
  - **Deep Burgundy:** `#54152A` (Rich luxury headers, gradient anchors)
  - **Blush Pink:** `#F8DDE5` (Soft romantic backgrounds, badges, hover fills)
  - **Warm White:** `#FFF9F7` (Editorial canvas background)
  - **Rose Gold:** `#C58B83` (Subtle premium borders and metallic details)
  - **Gold Accent:** `#C9A15B` (Rating stars, trust seals, sparkles)
  - **Charcoal:** `#242124` (High-contrast typography and night-mode cards)
- **Typography:**
  - Headings: `Playfair Display` (Classic romantic serif)
  - Body & UI: `Inter` (Crisp, modern, readable sans-serif)
- **Brand Mark:** Official CoupleWalah seal featuring the romantic couple illustration, gold rim, heart typography, and signature gift chest.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, React Router v6, TanStack Query, React Hook Form, Zod, Lucide React |
| **Backend** | Node.js, Express.js, TypeScript, Mongoose, MongoDB (with built-in In-Memory fallback for zero-setup local dev) |
| **Security** | Bcrypt password hashing, JWT stateless authentication, Helmet security headers, CORS protection |
| **Payments** | Razorpay SDK server order creation & signature verification + Safe Development Simulator |
| **Testing** | Vitest, Supertest, React Testing Library |

---

## 🚀 Key Features

1. **Personalized Gift Studio (`/gift-studio`):**
   - Live simulated preview of custom partner names, established anniversary dates, and vows directly on artisan keepsakes.
   - Deterministic distinct cart item keys ensuring two differently customized versions of the same product remain separate items in the cart.

2. **Smart Gift Finder (`/gift-finder`):**
   - 4-step romantic matchmaker wizard filtering by recipient, occasion, budget tier, and gift preferences without requiring third-party AI APIs.

3. **Secret Gift Mode (`/cart` & `/checkout`):**
   - Surprise gifting toggle with luxury satin ribbon box packaging (+ ₹149), discreet outer delivery cartons, and automated suppression of price tags on delivery packing slips.
   - Strict separation between billing contact details and gift recipient shipping address.

4. **Love Milestones & Reminders (`/account/reminders`):**
   - Save partner birthdays, relationship anniversaries, and wedding dates with customizable advance notification lead times.

5. **Curated Couple Bundles (`/couple-bundles`):**
   - Hand-selected combos (Mini Love Combo, Personalized Couple Combo, Anniversary Special Box, Premium Couple Hamper) with bundled savings up to 35%.

6. **Admin Operations Dashboard (`/admin`):**
   - Real-time revenue analytics, active orders fulfillment pipeline with status updates (`Pending` ➔ `Payment Confirmed` ➔ `Processing` ➔ `Packed` ➔ `Shipped` ➔ `Delivered`), catalog management, and promotional coupon controls.

---

## ⚙️ Quick Start (Local Setup)

The application runs natively on **Windows (PowerShell)**, macOS, and Linux.

### 1. Prerequisites
- **Node.js** v18+ (tested with v24.15.0)
- **npm** v9+ (tested with v11.12.1)
- *(Optional)* Local MongoDB or MongoDB Atlas URI. **If no MongoDB is installed, the backend will automatically spin up a fast in-memory MongoDB instance with zero configuration required!**

### 2. Install Dependencies
From the repository root:
```powershell
npm install
```

### 3. Build Monorepo Workspaces
```powershell
npm run build
```

### 4. Run Development Servers
To run both backend API (`http://localhost:5000`) and frontend Vite client (`http://localhost:5173`) concurrently:
```powershell
npm run dev
```

Or run them individually in separate terminal tabs:
- **Backend Server:**
  ```powershell
  npm run dev:server
  ```
- **Frontend Client:**
  ```powershell
  npm run dev:client
  ```

---

## 🔑 Test Accounts & Demo Credentials

| Role | Email | Password | Access |
|---|---|---|---|
| **Staff Admin** | `admin@couplewalah.com` | `Sheikh@0927` | Full access to `/admin` dashboard, orders, inventory |
| **Demo Customer** | `sheikhshoiebsa17@gmail.com` | `Shoieb@0927` | Customer dashboard, orders, reminders, wishlist |

*Tip: The Login screen includes one-click "Demo Customer" and "Staff Admin" quick-fill buttons.*

---

## 🧪 Running Automated Tests

Run all unit and integration test suites:
```powershell
# Run backend API integration tests
npm run test --workspace=server

# Run frontend cart and logic tests
npm run test --workspace=client
```

---

## 🌐 API Endpoints Reference

### Public & Auth
- `GET  /api/health` — Service health check
- `POST /api/v1/auth/register` — Register customer account
- `POST /api/v1/auth/login` — Sign in and obtain JWT
- `GET  /api/v1/auth/me` — Get authenticated customer profile
- `POST /api/v1/auth/forgot-password` — Password recovery dispatch

### Catalogue & Orders
- `GET  /api/v1/products` — Filtered, paginated, sorted catalogue
- `GET  /api/v1/products/:slug` — Single product details & specifications
- `POST /api/v1/orders` — Server-recalculated order creation
- `GET  /api/v1/orders/my-orders` — Customer order history
- `GET  /api/v1/orders/:id` — Order status and tracking timeline

### Payments
- `POST /api/v1/payments/create-order` — Razorpay server order initiation
- `POST /api/v1/payments/verify` — HMAC-SHA256 signature verification & dev simulator
- `POST /api/v1/payments/webhook` — Webhook event processor

### Admin (Protected)
- `GET   /api/v1/admin/dashboard` — Store overview & revenue metrics
- `GET   /api/v1/admin/orders` — All orders list
- `PATCH /api/v1/admin/orders/:id/status` — Advance order fulfillment pipeline
- `POST  /api/v1/admin/products` — Create new catalogue item
