

# 💡 LightSpace App

> A modern e-commerce application specializing in lighting products, built with React and TypeScript.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC.svg)](https://tailwindcss.com/)

## 🚀 Overview

LightSpace is a modern, mobile-first e-commerce application that specializes in selling lighting products. Built with React 18 and TypeScript, it provides a seamless shopping experience with features like product search, cart management, wishlist functionality, and a complete checkout process.

## ✨ Features

### 🛍️ Core Shopping Features
- **Product Catalog**: Browse through 6 different lighting categories
- **Smart Search**: Real-time product search functionality
- **Category Filtering**: Filter products by 7 categories (All, Pendant, Floor, Table, Wall, Chandelier, LED)
- **Product Details**: Comprehensive product information with images, pricing, reviews, and specifications

### 🛒 Shopping Cart System
- **Cart Management**: Add/remove products, adjust quantities
- **Real-time Updates**: Live cart count and total price calculation
- **Quick Checkout**: "Buy Now" functionality for instant purchases

### ❤️ Wishlist Functionality
- **Save Products**: Add/remove products to/from wishlist
- **Visual Feedback**: Heart icon with hover states

### 📦 Order Management
- **Checkout Process**: Complete order information collection
- **Order Confirmation**: Order number, delivery information, receipt download
- **Order Tracking**: Track order status and delivery updates

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Notification System**: Toast messages for user feedback
- **Error Handling**: Comprehensive error boundaries for safe error handling
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### ⚡ Performance Optimizations
- **Memoization**: Strategic use of `useMemo` and `useCallback`
- **Component Architecture**: Reusable, modular component structure
- **Image Optimization**: Optimized image loading and display

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - Main UI framework
- **TypeScript** - Static type checking
- **Vite 6.3.5** - Fast development server and build tool

### UI Libraries
- **Radix UI** - Accessible headless UI components (48 packages)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### State Management
- **React Hooks** - Built-in state management with useState, useCallback, useMemo
- **Custom Hooks** - useCart, useWishlist, useNotification

### Additional Libraries
- **@supabase/supabase-js** - Backend services (currently unused)
- **react-hook-form** - Form management
- **embla-carousel-react** - Carousel component
- **sonner** - Toast notifications

## 📁 Project Structure

```
src/
├── main.tsx              # React app entry point
├── App.tsx               # Main app component (routing & state management)
├── index.css             # Global styles
├── components/           # UI components
│   ├── common/           # Common components (ErrorBoundary, Notification)
│   ├── figma/            # Figma-generated components
│   ├── product/          # Product-related components (ProductCard, FeaturedCard)
│   ├── screens/          # Screen components (HomeScreen, CartScreen, etc.)
│   └── ui/               # Reusable UI components based on Radix UI
├── data/                 # Static data (products.ts, categories.ts)
├── hooks/                # Custom React hooks (useCart, useWishlist, etc.)
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── styles/               # CSS style files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lightspace.git
   cd lightspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The build files will be generated in the `build/` directory.

## 📱 App Screens

### Home Screen
- Product search and category filtering
- Featured products carousel
- Product grid with filtering options

### Product Screen
- Detailed product information
- Image gallery
- Add to cart and wishlist functionality

### Cart Screen
- Shopping cart management
- Quantity adjustments
- Checkout process initiation

### Checkout Screen
- Order information collection
- Payment method selection
- Order confirmation

### Order Complete Screen
- Order confirmation details
- Order tracking information
- Receipt download option

## 🎯 Key Features in Detail

### Product Management
- **6 Product Categories**: Pendant, Floor, Table, Wall, Chandelier, LED
- **Product Attributes**: Price, ratings, reviews, specifications, stock status
- **Product States**: New, Bestseller, Premium, Smart, Discount indicators

### Shopping Experience
- **Mobile-First Design**: Optimized for mobile devices with responsive breakpoints
- **Intuitive Navigation**: Screen-based navigation system
- **Real-time Updates**: Live cart and wishlist updates
- **Search & Filter**: Advanced product discovery

### Performance
- **Optimized Rendering**: Memoized components and callbacks
- **Efficient State Management**: Custom hooks for state logic
- **Image Optimization**: Lazy loading and optimized image delivery

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Unsplash](https://unsplash.com/) for product images
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue or contact us at [your-email@example.com](mailto:your-email@example.com).

---

**Made with ❤️ by the LightSpace Team**