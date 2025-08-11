# Jacket Shop

Jacket Shop is a full-stack e-commerce web application for browsing, managing, and purchasing jackets. It features user authentication, product management, wishlist and shopping bag functionality, secure checkout and an admin dashboard for owners.

---

## Features

- **User Authentication**: Register, login, logout, and session management.
- **Product Browsing**: View all jackets with details, images, sizes, colors, and discounts.
- **Wishlist**: Add/remove products to a personal wishlist (only for logged-in users).
- **Shopping Bag**: Add/remove products to a shopping bag (only for logged-in users).
- **Flash Messages**: Real-time feedback for user actions (success/error).
- **Admin Dashboard**: Owners can manage products and view orders.
- **Order History**: Users can view their past orders.
- **Responsive UI**: Modern, mobile-friendly design using TailwindCSS.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates (not Handlebars)
- **Database**: MongoDB (via Mongoose)
- **Environment Variables**: dotenv
- **Authentication**: Sessions, JWT (for some flows)
- **File Uploads**: Multer (for product images)
- **Styling**: TailwindCSS, Remixicon, Google Fonts

---

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/jacket-shop.git
   cd jacket-shop
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/jacketshop
   SESSION_SECRET=your_session_secret
   JWT_KEY=your_jwt_secret
   PORT=3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running locally:
   ```sh
   mongod
   ```

5. **Start the server**
   ```sh
   npm start
   ```

6. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
JacketShop-1/
├── app.js                   # Main application entry point
├── .env                     # Environment variables
├── config/                  # Configuration files (DB, multer, keys)
├── controllers/             # Route controllers (auth, etc.)
├── middlewares/             # Custom middleware (isLoggedIn)
├── models/                  # Mongoose models (User, Product, Order, Owner)
├── public/                  # Static assets (images, CSS, JS)
├── routes/                  # Express route files
├── utils/                   # Utility functions (JWT, etc.)
├── views/                   # EJS templates (shop, admin, auth, etc.)
│   └── admin/               # Admin dashboard views
├── package.json             # Project metadata and dependencies
├── README.md                # Project documentation
```

---

## Key Routes

### Public
- `/` : Home page
- `/shop` : Browse all products

### Authentication
- `/users/register` : Register a new user
- `/users/login` : Login
- `/users/logout` : Logout

### Wishlist
- `/wishlist` : View wishlist (logged-in users only)
- `/wishlist/:product_id` : Add product to wishlist
- `/wishlist/:product_id/remove` : Remove product from wishlist

### Shopping Bag
- `/bag` : View shopping bag (logged-in users only)
- `/bag/:product_id` : Add product to bag
- `/bag/:product_id/remove` : Remove product from bag

### Checkout & Orders
- `/checkout` : Checkout page
- `/productConfirmed` : Order confirmation
- `/users/orders` : User order history

### Admin Dashboard (Owners)
- `/owners/products-page` : Manage products
- `/owners/products-page/product` : Add product
- `/owners/products-page/edit/:id` : Edit product
- `/owners/products-page/delete/:id` : Delete product
- `/owners/orders-page` : View all orders

---

## How It Works

### User Flows

- **Browsing**: Anyone can view products on `/shop`. Only logged-in users can add to wishlist or bag.
- **Wishlist/Bag**: If not logged in, users are redirected to login/register when trying to add items.
- **Checkout**: Only logged-in users can checkout and pay.
- **Order History**: Users can view their past orders.
- **Admin**: Owners can add/edit/delete products and view all orders.

### Admin Dashboard

- **Products Page**: Table view of all products with image, name, category, material, sizes, colors, price, discount, and actions (edit/delete).
- **Orders Page**: Table view of all orders, showing order ID, products, total, date, status, and actions.

### Error Handling

- Flash messages for feedback (success/error).
- Server-side validation and error logging.

---

## UI/UX

- **Modern design**: TailwindCSS, Remixicon, Google Fonts.
- **Consistent admin and user themes**.
- **Mobile-friendly**: Responsive layouts.

---

## Development Notes

- **EJS** is used for templating, not Handlebars.
- **Product images** are stored in `/public/images/`.
- **Session-based authentication** for users.
- **Multer** is used for image uploads.
- **Order listing** is reversed (newest first) in admin dashboard.

---

## Future Enhancements

- Product search and filtering.
- Owner registration and management.
- Advanced analytics for admin.
- Email notifications for orders.
- UI improvements with React or Vue.js.

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- [MongoDB](https://www.mongodb.com/) for database.
- [TailwindCSS](https://tailwindcss.com/) for styling.
- [Remixicon](https://remixicon.com/) for icons.

---

## Quick Start

```sh
git clone https://github.com/your-username/jacket-shop.git
cd jacket-shop
npm install
# Set up .env as described above
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the application.

