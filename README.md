Foodie E-Commerce Platform

A modern food ordering platform built with Next.js, MongoDB, and ASP.NET Core Web API, featuring a beautiful landing page, smooth ordering flow, and admin dashboard for menu management.

This project is designed to be portfolio-worthy, showcasing full-stack skills, responsive design, and real-world e-commerce features.

Features
User-Facing

Attractive landing page with hero sections, featured dishes, and promotions.

Browse menu and customize orders.

Add items to cart and complete checkout.

Track order status in real time.

Rate and review menu items.

Loyalty/rewards points system.

Responsive design (desktop, tablet, mobile).

Optional dark mode toggle.

Admin Dashboard

Add, edit, and remove menu items.

Manage incoming orders.

View basic analytics (total sales, popular items).

Activate promotions or discount codes.

Technical Highlights

Frontend: Next.js, Tailwind CSS, React hooks, framer-motion for subtle animations.

Backend: ASP.NET Core Web API with REST endpoints.

Database: MongoDB for scalable document-based storage.

Authentication: JWT-based authentication with role management (admin/customer).

Portfolio-Ready Features: Ratings/reviews, promotions, loyalty points, responsive layout, and smooth interactions.

Database Schema

The application uses MongoDB collections:

users – Stores customers and admin users with role-based access.

menu_items – List of dishes with name, description, price, availability.

orders – Customer orders with order status and total amount.

order_items – Items in each order with quantity and price.

reviews – Customer ratings and comments for dishes.

promotions – Discount codes and special offers.

loyalty_points – Tracks points earned by customers.

(See ER diagram in /docs folder for visual reference)

Installation & Setup
Prerequisites

Node.js >= 18

.NET 10 SDK

MongoDB (local or Atlas)