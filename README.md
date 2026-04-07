# DM Rao Consultancy & Security Service

A professional, high-performance website for **DM Rao Consultancy & Security Service**, a leading provider of industrial security and manpower solutions in Surat and Gujarat.

## 🚀 Key Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewports.
- **Service-Specific Landing Pages**: Dedicated SEO-optimized pages for Security Guard and Manpower services.
- **Dynamic Content**: Interactive testimonial slider, mobile-responsive navigation, and "About" section slideshow.
- **Performance Optimized**: 
    - Lazy loading for images below the fold.
    - Explicit image dimensions to prevent layout shifts (CLS).
    - Render-blocking script optimization for faster initial load.
    - LCP improvements through preloading critical hero images.
- **SEO & Search Visibility**:
    - JSON-LD Structured Data for Local Business, Services, and FAQs.
    - Optimized meta tags and semantic HTML5 structure.
    - Automated `sitemap.xml` and `robots.txt` configuration.
- **Contact Integration**: 
    - Functional contact form integrated with Google Apps Script.
    - Floating WhatsApp and Call buttons for direct client engagement.

## 📁 Project Structure

```text
├── assets/                  # Images, logos, and favicons
├── blog/                    # Industry insights and articles
│   ├── choosing-security... # Blog: How to choose security services
│   ├── contract-labour...   # Blog: Contract labour compliance
│   └── hiring-reliable...   # Blog: Hiring reliable manpower
├── index.html               # Homepage
├── manpower-services...html # Manpower services landing page
├── security-guard-se...html # Security services landing page
├── script.js                # Core frontend logic
├── styles.css               # Main stylesheet (Vanilla CSS)
├── site.webmanifest         # PWA/Browser metadata
├── sitemap.xml              # Search engine index
└── robots.txt               # Crawler instructions
```

## 🛠 Maintenance & Optimization

### Image Optimization
For maximum performance, ensure all new images in the `assets/` folder are:
1. **Resized**: Max width of 1920px for hero images.
2. **Compressed**: Use tools like [Squoosh.app](https://squoosh.app) to keep files under 200KB.
3. **WebP Format**: Preferred over PNG/JPG for better compression.

### Forms
The contact form submits data to a Google Apps Script webhook. To update the destination spreadsheet, modify the `WEBHOOK_URL` in `script.js`.

---
© 2026 D M RAO CONSULTANCY & SECURITY SERVICE. All rights reserved.
