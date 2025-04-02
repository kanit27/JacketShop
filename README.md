# Jacket Store

Jacket Store is a full-stack e-commerce web application for purchasing jackets. It provides features like user authentication, product browsing, wishlist management, shopping bag functionality, and a secure checkout process using Stripe for payments.

## Features

- **User Authentication**: Secure login and session management for users.
- **Product Browsing**: View a list of available jackets in the shop.
- **Wishlist Management**: Add or remove products from your wishlist.
- **Shopping Bag**: Add or remove products from your shopping bag.
- **Checkout and Payment**: Secure payment integration using Stripe.
- **Flash Messages**: Real-time feedback for user actions (e.g., success or error messages).

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Handlebars.js (for rendering views)
- **Database**: MongoDB (via Mongoose)
- **Payment Gateway**: Stripe
- **Environment Variables**: dotenv for managing sensitive keys
- **Middleware**: Custom middleware for user authentication

## Installation

To set up and run the Jacket Store application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jacket-store.git
   cd jacket-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Folder Structure

```
Jacket Store/
├── models/               # Mongoose models for User and Product
├── routes/               # Express routes (e.g., indexRouter.js)
├── views/                # Handlebars templates for rendering pages
├── public/               # Static assets (CSS, JS, images)
├── .env                  # Environment variables
├── app.js                # Main application entry point
├── package.json          # Project metadata and dependencies
```

## Key Routes

### Public Routes
- `/`: Home page
- `/shop`: Browse products

### Wishlist
- `/wishlist`: View wishlist
- `/wishlist/:product_id`: Add product to wishlist
- `/wishlist/:product_id/remove`: Remove product from wishlist

### Shopping Bag
- `/bag`: View shopping bag
- `/bag/:product_id`: Add product to bag
- `/bag/:product_id/remove`: Remove product from bag

### Checkout
- `/checkout`: View checkout page
- `/pay`: Create a payment intent using Stripe

## How It Works

### Wishlist Management
- Users can add products to their wishlist by clicking on the "Add to Wishlist" button.
- Products already in the wishlist cannot be added again.
- Users can remove products from their wishlist.

### Shopping Bag
- Similar to the wishlist, users can add products to their shopping bag.
- Products already in the bag cannot be added again.
- Users can remove products from their bag.

### Checkout and Payment
- Users can proceed to the checkout page to review their shopping bag.
- Payments are processed securely using Stripe's API.

## Error Handling
- Flash messages are used to provide feedback for user actions (e.g., "Product added to wishlist").
- Errors are logged to the console for debugging purposes.

## Future Enhancements
- Add user registration functionality.
- Implement product search and filtering.
- Add order history for users.
- Improve UI/UX with modern frameworks like React or Vue.js.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Stripe](https://stripe.com/) for payment processing.
- [Handlebars.js](https://handlebarsjs.com/) for templating.
- [MongoDB](https://www.mongodb.com/) for database management.

