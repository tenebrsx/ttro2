# Deployment Guide for Cucinanostrard Website

## For Netlify Deployment

### Option 1: Drag & Drop Deployment
1. Run `npm run build` in your project directory
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `dist` folder onto the Netlify dashboard
4. Your site will be live in minutes!

### Option 2: Git Integration (Recommended)
1. Push your project to GitHub
2. Connect your GitHub repository to Netlify
3. Netlify will automatically build and deploy when you push changes

### Build Settings for Netlify
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 (configured in netlify.toml)

### Pre-Deployment Checklist
1. Configure EmailJS service (see `EMAIL_SETUP.md`)
2. Replace placeholder images in `/public/images/instagram/`
3. Update WhatsApp phone number in `src/components/WhatsAppButton.tsx`
4. Verify all links and contact information
5. Test the contact form submission

## Files Added for Deployment
- `netlify.toml` - Netlify configuration with redirects for SPA routing
- `public/_redirects` - Backup redirect configuration
- `ErrorBoundary.tsx` - Error handling component
- Updated `vite.config.ts` - Optimized for deployment
- Enhanced SEO meta tags in `index.html`
- Email service integration with EmailJS
- Improved image handling with fallbacks

## Network Access Fix
The blank page issue was caused by:
1. **Network binding**: Updated Vite config to bind to `0.0.0.0` instead of `localhost`
2. **SPA routing**: Added proper redirects for React Router
3. **Error boundaries**: Added error handling to catch rendering issues

## Current Development URLs
- **Development**: http://localhost:3003/ (or next available port)
- **Preview**: http://localhost:3004/ (or next available port)
- **Network**: http://192.168.7.46:3003/ (accessible from other devices)

## Troubleshooting
- If you get a blank page, check the browser console for errors
- Ensure all image URLs are accessible
- Verify the build process completes successfully
- Check that all components are properly imported

## Logo
The logo is saved as an SVG file at `/public/logo.svg` and will work on any deployment platform.
