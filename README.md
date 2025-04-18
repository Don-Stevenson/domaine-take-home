# Domaine Take Home Assessment

#### Don Stevenson - March 16, 2025

## Overview

This is a Shopify storefront built with Hydrogen. It is a simple storefront that allows users to view products (t-shirts) and add them to their cart.

### Main Features Implemented

##### note: You must click on the "Current Catalog" or "Our latest products" to see the completed component that has been made to the Figma designs as requested.

### User Stories Fulfilled

- **Sale Indicators**: I implemented visual cues for on-sale products through:

  - A "On Sale" badge that appears on discounted items
  - Clear markdown pricing that shows both original and sale prices

- **Color Variant Selection**: I built an interactive variant swatch system that:

  - Allows customers to click through different color options
  - Updates the product imagery to match the selected variant
  - Maintains a clear visual indication of the currently selected variant

- **Hover Image Functionality**: I created a smooth image swap effect that:

  - Reveals a secondary product image to the right side when customers hover over the product card
  - Ensures the secondary image corresponds to the currently selected variant
  - Transitions seamlessly between primary and secondary images

- **Product Information Display**: I structured the product information to clearly show:
  - Product title with appropriate typography
  - Brand name with proper styling according to the design
  - Pricing information that adapts to show regular or sale prices

## Technical Implementation

- Built within a **Shopify environment** (specifically using [Hydrogen/Oxygen or Shopify theme])
- Used **TailwindCSS** for styling, ensuring responsive design across all screen sizes
- Implemented all interactions using modern JavaScript techniques

## Repository Structure

The main component files I worked on can be found in:

- `app/components/ProductCard.jsx` - The main product card component
- other components I created are in the `app/components` folder are:
  - `OnSaleBadge.jsx` - A component that displays a badge for on sale products
  - `ProductDetails.jsx` - A component that displays the details of a product
  - `HoverImage.jsx` - A component that displays a secondary hover image when hovering over the product card
  - `Contact.jsx` - A component that displays my contact information
  - `Catalog.jsx` - A component that displays a list of products
  - `Landing.jsx` - A component that displays a landing page with products
  - `CustomColorSwatch.jsx` - A component that displays a color swatch for a product
  - `MobileCarousel.jsx` - A component that is optimised for mobile
  - `CarouselDots.jsx` - A component that renders dots based on the number of images

## Development Process

During development, I focused on:

1. Following the Figma designs precisely
2. Creating several reusable components (product card, on sale badge, product details, hover image, color variant swatch, etc.) that could be easily integrated into a larger store
3. Ensuring smooth transitions and interactions
4. Writing unit tests for the components
5. Optimizing for performance
6. Ensuring accessibility standards were met for the elements I created
7. Wrote simple contact, catalog, and landing page components
8. Endsured that you can add multiple items to the cart from the ProductCard.jsx component
9. Improved error handling for app/routes/(\$locale).products.$handle.jsx.
10. Improved the aside menu to be more responsive and mobile friendly.

## Future Improvements

I would like to have enhanced the implementation with:

- More extensive browser compatibility testing and fixing any issues.
- Adding tests to the deployment pipeline
- Further refactoring the code to be more reusable and modular.
- Remove the different css libraries and use only TailwindCSS.
- fix navbar css squashing issues on very small screens (e.g. the onsale badge moves slightly on to the main image at 320px wide).
- fix the double 'home' link on the navbar on mobile screens only (I tried to fix this with out much success).
- improve the overall styling to make the site more eyecatching

## Links

- [GitHub Repository](https://github.com/Don-Stevenson/domaine-take-home)
- [Live Deployment](https://domaine-take-home-4dd08a30936658578835.o2.myshopify.dev)

## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher
- Shopify CLI

**Clone the repository:**

```bash
git clone <repository-url>
```

**Install dependencies:**

```bash
npm install
```

### ENV Variables

This project requires several environment variables to run. Create a `.env` file in the root directory with the following variables:

```env
PUBLIC_STOREFRONT_ID=
PUBLIC_STOREFRONT_API_TOKEN=
PUBLIC_STORE_DOMAIN=
PRIVATE_STOREFRONT_API_TOKEN=
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=
PUBLIC_CUSTOMER_ACCOUNT_API_URL=
SHOP_ID=
```

For security reasons, the actual values are not included in this repository. To obtain the necessary credentials:

- Email: dsteven1@gmail.com

Please reach out and I'll provide you with the required credentials securely.

### Building for production

```bash
h2 build
```

## Local development

```bash
h2 dev
```

## Tests

```bash
npm test
```

#### Running tests with coverage

```bash
npm test:coverage
```

#### Running tests in watch mode

```bash
npm test:watch
```
