# CoupleWalah — Render Deployment Guide 🚀

This document provides step-by-step instructions to deploy the **CoupleWalah** e-commerce platform to [Render](https://render.com).

---

## 🏗️ Architecture Overview

The CoupleWalah application is optimized as a **unified production build**:
- **Frontend:** React + Vite + Tailwind CSS (compiled into static assets in `client/dist`).
- **Backend:** Node.js + Express + TypeScript API (compiled into `server/dist`).
- **Routing:** In production, Express directly serves the client assets and Single-Page Application (SPA) fallback, while handling all `/api/v1/*` requests.
- **Benefit:** Runs entirely within **1 Render Free Web Service** with **zero CORS issues** and a single public domain.

---

## 📋 Prerequisites

1. A [GitHub](https://github.com) or [GitLab](https://gitlab.com) account.
2. A free [Render.com](https://render.com) account.
3. A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (recommended for persistent database across Render server restarts).

---

## 🛠️ Step 1: Push Code to Your GitHub Repository

If you haven't pushed this project to your GitHub account yet, run these commands in your VS Code terminal:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "feat: complete CoupleWalah platform ready for Render deployment"

# 4. Create a new repository on GitHub (e.g. named couplewalah)
# Then link it and push (replace YOUR_USERNAME and YOUR_REPO):
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## 🚀 Step 2: Deploy to Render

You have two convenient options on Render:

### Option A: Automatic Blueprint Deployment (Recommended)
Because this repository contains a `render.yaml` blueprint:
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** in the top right corner and choose **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically read `render.yaml` and configure the **couplewalah** web service with all build and start commands.
5. In the environment variables prompt, enter your `MONGODB_URI` (see Step 3 below).
6. Click **Apply**. Render will build and deploy your app!

---

### Option B: Manual Web Service Setup
If you prefer creating a Web Service manually:
1. In the Render Dashboard, click **New +** → **Web Service**.
2. Select **Build and deploy from a Git repository** and connect your repository.
3. Fill in the service configuration:
   - **Name:** `couplewalah` (or your preferred name)
   - **Region:** Choose the region closest to your customers (e.g., Singapore, Frankfurt, or Oregon)
   - **Branch:** `main`
   - **Root Directory:** *(leave blank / default)*
   - **Runtime:** `Node`
   - **Build Command:**
     ```bash
     npm install && npm run build
     ```
   - **Start Command:**
     ```bash
     npm start
     ```
   - **Instance Type:** `Free`

4. Click **Advanced** and add the **Environment Variables** listed below.
5. Click **Create Web Service**.

---

## 🔐 Step 3: Configure Environment Variables

Add these variables in the **Environment** tab of your Render service:

| Variable Key | Required | Value / Description | Example |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | **Yes** | Set to `production` | `production` |
| `PORT` | Auto | Render sets this automatically (usually `10000`). | *(Render managed)* |
| `JWT_SECRET` | **Yes** | Any long random secret key for authentication | `cw_prod_jwt_super_secret_key_2026!` |
| `MONGODB_URI` | **Recommended** | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster0.mongodb.net/couplewalah?retryWrites=true&w=majority` |
| `CLIENT_URL` | Optional | Your Render URL (or custom domain) | `https://couplewalah.onrender.com` |
| `RAZORPAY_KEY_ID` | Optional | Razorpay Key ID for payments (simulator runs if blank) | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Optional | Razorpay Secret Key | `...` |
| `EMAIL_FROM` | Optional | Sender address for order notifications | `support@couplewalah.com` |

> 💡 **MongoDB Atlas Quick Setup:**
> 1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free Shared Cluster (M0).
> 2. Under **Database Access**, create a user with a secure password.
> 3. Under **Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere (`0.0.0.0/0`)** so Render can connect.
> 4. Click **Connect** → **Drivers** → Copy the connection string and paste it into Render's `MONGODB_URI`.

---

## 🔑 Pre-Seeded Default Accounts

The database seeds automatically on first launch with mock products and pre-configured accounts:

### 👑 Administrator Account
- **URL:** `https://your-app.onrender.com/login` (or `/admin`)
- **Email:** `admin@couplewalah.com`
- **Password:** `Sheikh@0927`
- **Features:** Full analytics dashboard, inventory manager, order tracking, coupon generator, customer list.

### 🛍️ Demo Customer Account
- **Email:** `sheikhshoiebsa17@gmail.com`
- **Password:** `Shoieb@0927`
- **Features:** Saved couple anniversaries, cart items, order history, gift notes.

---

## 🔍 Verifying the Deployment

1. Once Render finishes building, your service status will turn **Live** (green).
2. Visit `https://your-app.onrender.com/api/health` to confirm the backend is running:
   ```json
   { "status": "ok", "service": "CoupleWalah API", "time": "..." }
   ```
3. Visit `https://your-app.onrender.com` in your browser. You should see the full CoupleWalah storefront with:
   - Clean, un-overlapped navigation bar
   - Curated gifts & categories
   - Interactive gift customizer
   - Cart & checkout with simulated or live Razorpay
   - Anniversary reminder system
   - Admin and customer account portals

---

## 🔄 Automatic Continuous Deployment

Whenever you push new changes to your `main` branch on GitHub:
```bash
git add .
git commit -m "update: improvement"
git push origin main
```
Render will automatically detect the push, rebuild, and redeploy without downtime!
