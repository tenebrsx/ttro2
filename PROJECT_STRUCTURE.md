# Project Structure Documentation

## Overview
This document outlines the directory structure and key components of the Cucinanostrard bakery website built with React + TypeScript + Vite.

## Root Directory Structure

```
ttro-main/
├── public/                          # Static assets
│   ├── images/                      # Image assets
│   │   ├── instagram/              # Instagram carousel images
│   │   └── placeholder-dessert.jpg  # Fallback product image
│   └── favicon.ico                  # Site favicon
├── src/                             # Source code
│   ├── components/                  # Reusable React components
│   │   ├── animations/             # Animation components
│   │   ├── business/               # Business logic components
│   │   ├── ui/                     # UI-specific components
│   │   └── *.tsx                   # Individual components
│   ├── contexts/                    # React contexts
│   ├── data/                        # Data files and constants
│   │   └── products.ts             # Product database
│   ├── hooks/                       # Custom React hooks
│   ├── pages/                       # Page components
│   ├── services/                    # API services
│   ├── utils/                       # Utility functions
│   ├── App.tsx                      # Main app component
│   ├── index.css                    # Global styles
│   └── main.tsx                     # App entry point
├── dist/                            # Build output
├── node_modules/                    # Dependencies
├── package.json                     # Project dependencies
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.ts                   # Vite configuration
└── tsconfig.json                    # TypeScript configuration
```

## Key Component Categories

### Page Components (`src/pages/`)
- `Home.tsx` - Homepage with featured products
- `Menu.tsx` - Product catalog/menu page
- `Product.tsx` - Individual product detail page
- `About.tsx` - About page
- `Contact.tsx` - Contact page
- `Admin.tsx` - Admin dashboard
- `Cart.tsx` - Shopping cart page
- `Gallery.tsx` - Image gallery

### Core Components (`src/components/`)

#### Navigation & Layout
- `Navigation.tsx` - Main navigation bar
- `Footer.tsx` - Site footer
- `Logo.tsx` - Site logo component

#### Product Display
- `FeaturedDesserts.tsx` - Homepage product showcase
- `Menu.tsx` - Product grid component
- `EnhancedDessertCard.tsx` - Individual product card

#### Business Features
- `DessertCustomizer.tsx` - Product customization
- `ContactForm.tsx` - Contact form
- `OrderingProcess.tsx` - Order process explanation
- `WhatsAppButton.tsx` - WhatsApp integration

#### UI Components
- `Button.tsx` - Enhanced button component
- `LoadingSpinner.tsx` - Loading states
- `OptimizedImage.tsx` - Image optimization
- `PageTransition.tsx` - Page transitions

#### Content Sections
- `Hero.tsx` - Homepage hero section
- `AboutPreview.tsx` - About section preview
- `TestimonialsPreview.tsx` - Testimonials section
- `InstagramCarousel.tsx` - Instagram feed
- `FAQ.tsx` - Frequently asked questions

### Data Layer (`src/data/`)
- `products.ts` - Central product database with TypeScript interfaces

### Utilities (`src/utils/`)
- `currency.ts` - Currency formatting functions
- Other utility functions

## Technology Stack

### Frontend Framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations
- **Custom CSS** - Additional styling

### Routing
- **React Router** - Client-side routing

### SEO & Meta
- **React Helmet Async** - Dynamic meta tags

## Design System

### Color Palette
- Primary: `dusty-rose` variants
- Secondary: `cream` and `warm-blush` tones
- Accent: `mocha` for text

### Typography
- **Playfair Display** - Headings and elegant text
- **Karla** - Buttons and UI elements
- **Source Serif** - Body text

### Components Architecture
- Functional components with hooks
- TypeScript interfaces for props
- Consistent animation patterns
- Responsive design patterns

## Key Features

### Business Integration
- WhatsApp ordering system
- Instagram social integration
- Product customization options
- Admin dashboard for product management

### User Experience
- Smooth page transitions
- Loading states
- Error boundaries
- SEO optimization
- Mobile-responsive design

### Product Management
- Centralized product data
- Featured product system
- Category-based organization
- Availability tracking
- Pricing and currency formatting

## Development Workflow

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build

### Configuration Files
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS setup
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## Important Notes

### Data Flow
- Product data flows from `src/data/products.ts`
- Components consume data through imports
- No external API dependencies for products

### Styling Approach
- Tailwind CSS for utility classes
- Custom CSS classes for complex animations
- Consistent spacing and color usage

### State Management
- React hooks for local state
- Context API for global state
- No external state management library

### Performance
- Code splitting with React.lazy
- Optimized images
- Efficient re-renders with proper dependencies

This structure provides a solid foundation for a bakery website with room for future enhancements and scaling.