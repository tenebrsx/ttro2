# Cucinanostrard - Artisanal Desserts Website

A beautiful, modern website for Cucinanostrard, showcasing artisanal homemade desserts for individual clients and special events. Built with React, TypeScript, and Tailwind CSS.

## 🍰 Live Demo

- **Development**: Currently running locally
- **Repository**: [https://github.com/tenebrsx/ttro](https://github.com/tenebrsx/ttro)

## ✨ Features

### 🎯 Core Functionality
- **Multi-language**: Complete Spanish interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Instagram Integration**: Gallery connected to @cucinanostrard
- **WhatsApp Contact**: Sticky button with pre-filled messages
- **Contact Form**: Homepage inquiry form with EmailJS integration
- **Form Validation**: Comprehensive client-side validation
- **Smooth Navigation**: Scroll management and React Router
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and accessibility

### 🎨 Design & UX
- **Brand Identity**: Custom logo integration throughout
- **Color Palette**: Sage green (#B4C3BC), Mocha (#3A4D40), Cream (#F6F4F1)
- **Typography**: Cormorant Garamond + Karla font pairing
- **Animations**: Smooth transitions and hover effects
- **Visual Hierarchy**: Clear information architecture

### 🛠 Technical Features
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** icons
- **Error Boundaries** for reliability
- **Custom Hooks** for reusable logic
- **Netlify Ready** deployment configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tenebrsx/ttro.git
   cd ttro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Visit `http://localhost:3000` (or next available port)
   - Network access: `http://[your-ip]:3000`

### Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.tsx        # Homepage hero section
│   ├── Navigation.tsx  # Main navigation
│   ├── Footer.tsx      # Site footer
│   ├── Gallery.tsx     # Instagram gallery
│   ├── WhatsAppButton.tsx  # Contact button
│   ├── Logo.tsx        # Brand logo component
│   └── ...
├── pages/              # Route components
│   ├── Home.tsx        # Homepage
│   ├── About.tsx       # About page
│   ├── Menu.tsx        # Menu/offerings
│   ├── Gallery.tsx     # Photo gallery
│   └── Contact.tsx     # Contact page
├── hooks/              # Custom React hooks
│   └── useScrollToTop.ts
└── App.tsx             # Main app component
```

## 🎯 Business Focus

### Target Audience
- **Individual Clients**: Personal celebrations and treats
- **Event Organizers**: Special occasions and parties
- **Local Market**: Santo Domingo, Dominican Republic

### Services Offered
- Custom artisanal desserts
- Seasonal ingredient focus
- Personal consultation
- Event catering
- Individual orders

### Brand Values
- Quality craftsmanship
- Personal attention
- Seasonal ingredients
- Artistic presentation
- Customer experience

## 📱 Components Overview

### Core Components
- **Hero**: Eye-catching homepage intro with call-to-action
- **Navigation**: Responsive menu with logo integration
- **FeaturedDesserts**: Showcase of signature creations
- **Gallery**: Instagram-integrated photo gallery
- **Contact Forms**: Homepage and dedicated contact pages
- **WhatsApp Integration**: Direct messaging capability

### Utility Components
- **ScrollManager**: Handles navigation scroll behavior
- **ErrorBoundary**: Graceful error handling
- **Logo**: SVG-based brand identity
- **LoadingSpinner**: User feedback for async operations

## 🌐 Deployment

### Netlify (Recommended)

1. **Connect Repository**
   - Connect your GitHub repo to Netlify
   - Auto-deploy on push to main branch

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 (configured in `netlify.toml`)

3. **Environment Variables**
   - No environment variables required for basic setup
   - Update WhatsApp number in `WhatsAppButton.tsx`

### Other Platforms
- **Vercel**: Works out of the box
- **GitHub Pages**: Configure for SPA routing
- **Traditional Hosting**: Upload `dist` folder contents

## 🔧 Configuration

### WhatsApp Integration
Update the phone number in `src/components/WhatsAppButton.tsx`:
```typescript
const phoneNumber = "18095551234"; // Replace with actual number
```

### Email Service (EmailJS)
Follow the instructions in `EMAIL_SETUP.md` to configure EmailJS for the contact form. You'll need to:
1. Create an EmailJS account
2. Set up an email service
3. Create an email template
4. Update the configuration in `src/services/emailService.ts`

### Instagram Integration
Update Instagram links in:
- `src/components/Gallery.tsx`
- `src/components/Footer.tsx`
- `src/pages/Gallery.tsx`

Replace placeholder images in `/public/images/instagram/` with actual content.

### Contact Information
Update business details in:
- `src/components/Footer.tsx`
- `src/pages/Contact.tsx`
- `src/components/Contact.tsx`

## 📊 Performance & SEO

### Optimization Features
- **Lazy Loading**: Images load on demand with OptimizedImage component
- **Code Splitting**: Automatic chunk optimization
- **Minification**: CSS and JS compression
- **Tree Shaking**: Unused code elimination
- **Image Fallbacks**: Error handling for failed image loads

### SEO Features
- **Meta Tags**: Comprehensive HTML head optimization
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Canonical URLs**: Proper URL structure
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: All images have descriptive text
- **Schema Markup**: Ready for structured data

## 🛠 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Adding New Pages

1. Create component in `src/pages/`
2. Add route to `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`

### Customizing Styles

- **Colors**: Update `tailwind.config.js`
- **Fonts**: Modify `src/index.css`
- **Components**: Use Tailwind utilities

## 📞 Support

### Documentation
- `DEPLOYMENT.md` - Deployment guide
- `SCROLL_MANAGEMENT.md` - Navigation behavior
- Component JSDoc comments

### Issues & Features
- Open GitHub issues for bugs
- Submit pull requests for features
- Follow existing code patterns

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern artisanal business websites
- **Photography**: Pexels.com for placeholder images
- **Icons**: Lucide React icon library
- **Typography**: Google Fonts (Cormorant Garamond + Karla)

---

Built with ❤️ for Cucinanostrard's artisanal dessert business.
