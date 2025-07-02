# Steadfast Courier Ltd - Frontend Test Task

## 💼 Applicant: Toriqul Islam Rupai

This project is submitted as part of the evaluation process for the Front-End Developer role at **Steadfast Courier Ltd**.

---

### 🔗 Live Demo

[https://golden-halva-8b9fce.netlify.app](https://golden-halva-8b9fce.netlify.app)

---

### 💻 Tech Stack

- React.js (Vite)
- Tailwind CSS
- Context API for State Management
- React Router DOM
- Axios for API Calls
- Netlify Dev (for local development)
- Responsive Design (Mobile + Desktop)

---

## 📄 Pages & Features

### ✅ Product Details Page
- Image Gallery (Main + Thumbnails)
- Quantity Selector
- Variation-based Add to Cart
- Description & Specification ("Show More" toggle)
- Category from API
- Related Items section

### ✅ Cart Page
- Cart Items with all details (Name, Image, Color, Size, Qty, Price)
- Quantity Update and Remove Item
- Order Summary (Subtotal, Total)
- Terms & Conditions Checkbox
- Proceed to Checkout Button
- Data persisted in **LocalStorage**

---

## 🔌 APIs Used

- `GET` Categories: `http://157.230.240.97:9999/api/v1/categories`
- `GET` Products: `http://157.230.240.97:9999/api/v1/shop/products`
- `GET` Single Product: `http://157.230.240.97:9999/api/v1/product/iphone-15-plus`

---

## 🛠️ Run Locally

### 📦 Using Vite:

```bash
git clone https://github.com/toriqulislamrupai/flacon-design-task.git
cd flacon-design-task
npm install
npm run dev

```Using Netlify Dev (Optional):
Make sure you have the Netlify CLI installed:
npm install -g netlify-cli
Then run locally with:
netlify dev
