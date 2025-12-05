# RPM-AVS Website - Glassmorphic Redesign

A modern, glassmorphic redesign of the RPM Audio Visual Services website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ **Glassmorphic Design**: Beautiful glassmorphic UI with backdrop blur effects
- 🎨 **Brand Colors**: Uses RPM's primary brand colors (#2075bf blue, grey, white)
- 📱 **Responsive**: Fully responsive design that works on all devices
- 🧭 **Floating Navigation**: Pill-shaped navigation bar that stays with the user as they scroll
- ⚡ **Modern Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4
- 🎭 **Smooth Animations**: Framer Motion animations for smooth interactions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd rpm-avs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3010](http://localhost:3010) in your browser.

## Project Structure

```
rpm-avs/
├── app/
│   ├── components/
│   │   ├── Navigation.tsx      # Floating pill-shaped navigation
│   │   ├── Footer.tsx          # Footer component
│   │   └── ui/
│   │       ├── GlassCard.tsx   # Glassmorphic card component
│   │       └── GlassButton.tsx # Glassmorphic button component
│   ├── about/                  # About page
│   ├── services/               # Services page
│   ├── brands/                 # Brands page
│   ├── case-studies/           # Case Studies page
│   ├── careers/                # Careers page
│   ├── contact/                # Contact page
│   ├── globals.css             # Global styles with glassmorphic utilities
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── package.json
├── next.config.ts
└── tsconfig.json
```

## Pages

- **Home** (`/`) - Hero section with stats and key information
- **About** (`/about`) - About RPM-AVS
- **Services** (`/services`) - List of services offered
- **Brands** (`/brands`) - Partner brands
- **Case Studies** (`/case-studies`) - Project portfolio
- **Careers** (`/careers`) - Career opportunities
- **Contact** (`/contact`) - Contact form

## Brand Colors

- **Primary Blue**: `#2075bf`
- **Primary Blue Dark**: `#1a5d99`
- **Primary Blue Light**: `#2d8dd4`
- **Grey Light**: `#e5e5e5`
- **Grey Medium**: `#999999`
- **Grey Dark**: `#666666`
- **White**: `#ffffff`
- **Black**: `#000000`

## Glassmorphic Components

The design uses glassmorphic effects throughout:

- **Glass Cards**: Semi-transparent cards with backdrop blur
- **Glass Navigation**: Floating navigation bar with glass effect
- **Glass Buttons**: Buttons with glassmorphic styling
- **Backdrop Blur**: 20-30px blur effects for depth

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **PostCSS** - CSS processing

## Notes

- The navigation bar is fixed at the top and stays visible while scrolling
- All images are loaded from the original RPM-AVS website
- The design maintains the same content structure as the original site
- Mobile-first responsive design approach

## License

Private project for RPM Audio Visual Services.
