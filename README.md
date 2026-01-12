# Dr. Lusine Barseghyan - Dermatology Website

A professional, multilingual website for Dr. Lusine Barseghyan's dermatology and cosmetology practice in Yerevan, Armenia.

## Features

- **Multilingual Support**: English, Armenian (hy), and Russian translations
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Modern UI**: Clean, professional medical website design
- **Accessibility**: WCAG-compliant with skip links, proper ARIA labels, and keyboard navigation
- **Performance**: Lightweight CSS and vanilla JavaScript, no heavy frameworks

## Pages

- `index.html` - Main homepage with hero, about, services, blog preview, appointment form, and contact sections
- `services.html` - Detailed services page
- `blog.html` - Blog listing page
- `blog-article.html` - Individual blog article template
- `thank-you.html` - Appointment confirmation page

## Project Structure

```
├── index.html          # Main homepage
├── services.html       # Services page
├── blog.html           # Blog listing
├── blog-article.html   # Blog article template
├── thank-you.html      # Thank you/confirmation page
├── styles.css          # Main stylesheet with responsive design
├── script.js           # JavaScript for interactivity
├── translations.js     # Multilingual translations (EN, HY, RU)
├── favicon.ico         # Browser tab icon
└── README.md           # This file
```

## Technologies

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid, Media Queries)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, Noto Sans Armenian)

## Responsive Breakpoints

- **Extra small**: < 480px (phones)
- **Small**: 480px - 767px (large phones, small tablets)
- **Medium**: 768px - 1023px (tablets)
- **Large**: 1024px+ (desktops)

## Translations

The website supports three languages:
- **English (en)** - Complete
- **Russian (ru)** - Complete
- **Armenian (hy)** - Structure in place, needs native speaker translation

To add Armenian translations, edit `translations.js` and replace placeholder text in the `hy` section (lines 259-511) with actual Armenian text.

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:idamanukyan/dermatology-website.git
   ```

2. Open `index.html` in a web browser, or serve with a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

3. Visit `http://localhost:8000`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Contact Information

**Clinic Address:**
Erebuni Plaza, Office 26
4 Vazgen Sargsyan Street
Yerevan, Armenia

**Phone:** +374 10 510451

## License

All rights reserved. This website is proprietary to Dr. Lusine Barseghyan's practice.
