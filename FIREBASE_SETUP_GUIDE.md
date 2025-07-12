# Firebase Setup Guide - Titirosa Dessert Catering

## Overview
This guide will help you deploy your dessert catering website using Firebase hosting and Firestore database. The setup includes:
- Firebase Hosting for the website
- Firestore for dynamic product management
- Real-time admin panel functionality
- SEO optimization for Dominican Republic market

## Prerequisites

Before starting, ensure you have:
- Node.js (v16 or higher)
- Firebase CLI installed globally: `npm install -g firebase-tools`
- A Google account
- Your project built and ready

## Step 1: Firebase Project Setup

### 1.1 Verify Firebase Configuration
Your Firebase project is already configured in `src/config/firebase.ts`:
```javascript
Project ID: titirosa-a3873
Region: nam5 (North America)
```

### 1.2 Login to Firebase
```bash
firebase login
```

### 1.3 Verify Project Connection
```bash
firebase projects:list
firebase use titirosa-a3873
```

## Step 2: Database Setup

### 2.1 Initialize Firestore
Your Firestore rules are already configured in `firestore.rules`. To deploy them:
```bash
npm run firebase:deploy:rules
```

### 2.2 Create Database Indexes (Optional)
```bash
firebase deploy --only firestore:indexes
```

### 2.3 Migrate Local Data to Firestore
1. Open your website and go to `/admin`
2. Enter admin password: `titirosa2024`
3. Click "Migrar Datos" in the Firebase status section
4. Confirm the migration - this will move all local products to Firestore

## Step 3: Build and Deploy

### 3.1 Build the Project
```bash
npm run build
```

### 3.2 Test Locally with Firebase
```bash
npm run firebase:serve
```
Visit `http://localhost:5000` to test the built version

### 3.3 Deploy to Firebase Hosting
```bash
# Deploy everything (hosting + database rules)
npm run firebase:deploy

# Or deploy only hosting
npm run firebase:deploy:hosting
```

### 3.4 Custom Domain Setup (Optional)
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the DNS setup instructions

## Step 4: Admin Panel Usage

### 4.1 Access Admin Panel
- URL: `https://your-domain.com/admin` or `https://titirosa-a3873.web.app/admin`
- Password: `titirosa2024`

### 4.2 Admin Features
- **Product Management**: Add, edit, delete products in real-time
- **Firebase Status**: Monitor connection and sync status
- **Data Migration**: One-time migration from local to Firestore
- **Real-time Updates**: Changes reflect immediately on the website

### 4.3 Adding New Products
1. Click "Agregar Postre"
2. Fill in all required fields:
   - Name, description, price
   - Category, images, preparation time
   - SEO information for Dominican market
3. Click "Guardar" - product will be saved to Firestore

## Step 5: SEO Optimization

### 5.1 Google Search Console Setup
1. Add property: `https://your-domain.com`
2. Verify ownership using HTML tag method
3. Submit sitemap: `https://your-domain.com/sitemap.xml`

### 5.2 Google Analytics 4
Analytics is automatically initialized in production. To verify:
1. Check Firebase Console > Analytics
2. Verify events are being tracked
3. Set up conversion goals for Dominican market

### 5.3 Local SEO for Dominican Republic
- **Google My Business**: Verify and optimize for Santo Domingo
- **Local Keywords**: All products include Dominican-specific terms
- **Schema Markup**: LocalBusiness schema is implemented

## Step 6: Environment Configuration

### 6.1 Production vs Development
- **Development**: Uses local fallback data if Firestore unavailable
- **Production**: Fully relies on Firestore with analytics

### 6.2 Environment Variables
For additional security, consider moving API keys to environment variables:
```bash
# .env.production
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_PROJECT_ID=titirosa-a3873
```

## Step 7: Security Best Practices

### 7.1 Firestore Security Rules
Current rules allow:
- Public read access for products
- Write access for admin operations
- Validation for data structure

### 7.2 Admin Security
- Change default admin password in production
- Consider implementing Firebase Authentication for admin
- Monitor admin access in Firebase Console

### 7.3 API Key Security
- Current setup is safe for client-side use
- Firebase automatically restricts based on domain
- Monitor usage in Firebase Console

## Step 8: Performance Optimization

### 8.1 Image Optimization
- Use WebP format for better compression
- Implement lazy loading (already included)
- Consider Firebase Storage for large image assets

### 8.2 Caching Strategy
Firebase hosting automatically:
- Caches static assets (JS, CSS, images)
- Serves from global CDN
- Enables gzip compression

### 8.3 Database Performance
- Products are indexed by category and featured status
- Real-time listeners are optimized for admin panel only
- Public pages use cached data when possible

## Step 9: Monitoring and Analytics

### 9.1 Firebase Console Monitoring
- **Hosting**: Monitor bandwidth and requests
- **Firestore**: Track reads/writes and performance
- **Analytics**: Dominican Republic user behavior

### 9.2 Performance Monitoring
Enable Firebase Performance Monitoring:
```bash
firebase init performance
```

### 9.3 Error Tracking
Monitor JavaScript errors in Firebase Console > Crashlytics

## Step 10: Backup and Maintenance

### 10.1 Database Backup
- Firestore automatically backs up data
- Export data manually: Firebase Console > Firestore > Import/Export

### 10.2 Regular Updates
```bash
# Update dependencies
npm update

# Redeploy
npm run firebase:deploy
```

### 10.3 Content Management
- Use admin panel for product updates
- Monitor Firebase usage quotas
- Regular SEO performance review

## Troubleshooting

### Common Issues

**1. "Permission denied" errors**
- Check Firestore security rules
- Verify project configuration
- Ensure proper authentication

**2. Admin panel not loading products**
- Check browser console for errors
- Verify Firebase connection status
- Try refreshing products manually

**3. Deployment fails**
- Verify Firebase CLI is updated: `npm install -g firebase-tools@latest`
- Check build output: `npm run build`
- Ensure correct project selection: `firebase use titirosa-a3873`

**4. SEO not working**
- Verify meta tags in production
- Check Google Search Console for errors
- Ensure proper canonical URLs

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm run firebase:serve

# Deploy to Firebase
npm run firebase:deploy

# Start Firebase emulators (for testing)
npm run firebase:emulators
```

### Support

For additional help:
1. Check Firebase Console for errors
2. Review browser console for JavaScript errors
3. Monitor network requests in developer tools
4. Check Firebase Status page for service issues

## Success Metrics

After deployment, monitor:
- **Website Speed**: <3 seconds load time
- **SEO Rankings**: Track Dominican Republic keywords
- **Admin Usage**: Successful product management
- **User Engagement**: Analytics data for local market
- **Conversion Rate**: WhatsApp inquiries and orders

## Dominican Republic Market Focus

Your website is optimized for:
- Spanish language content
- Local business schema
- Dominican Peso pricing
- WhatsApp integration for local communication
- Santo Domingo local SEO
- Caribbean dessert preferences

---

**Firebase Project**: titirosa-a3873
**Primary Domain**: titirosa-a3873.web.app
**Admin URL**: /admin
**Target Market**: Dominican Republic dessert catering

Remember to update this guide as you make changes to your Firebase configuration or add new features!