# Pixel Forge - Web Development Agency Website

A modern, responsive website for Pixel Forge web development agency built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Next.js 15** with App Router
- 💎 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 📱 **Fully Responsive** design
- 🗄️ **MongoDB Atlas** integration
- 📧 **Contact Form** with API
- ⚡ **Vercel Ready** for deployment

## Pages

- **Homepage** - Hero section, services overview, and company stats
- **Services** - Detailed service offerings with pricing
- **Portfolio** - Project showcase with filtering
- **Contact** - Contact form and business information

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pixel-forge-website
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your MongoDB Atlas connection string:
```
# ⚠️ SECURITY: Never commit actual MongoDB URI to version control
# Get your connection string from MongoDB Atlas Dashboard → Connect → Connect your application
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## MongoDB Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update the `MONGODB_URI` in your `.env.local`

## Deployment on Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NEXT_PUBLIC_SITE_URL`: Your production domain

### Option 2: Deploy with GitHub

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your website URL | Yes |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Footer.tsx
│   └── Navbar.tsx
├── lib/                   # Utility functions
│   ├── models/           # MongoDB models
│   └── mongodb.ts        # Database connection
└── types/                # TypeScript types
    └── index.ts
```

## Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas
- **Icons**: Lucide React
- **Deployment**: Vercel

## Customization

### Colors
Update the color scheme in `src/app/globals.css`:
```css
:root {
  --primary: #3b82f6;
  --primary-dark: #1d4ed8;
  --secondary: #64748b;
  --accent: #f59e0b;
}
```

### Content
- Update company information in components
- Modify services in `src/app/services/page.tsx`
- Add portfolio projects in `src/app/portfolio/page.tsx`
- Update contact information in `src/components/Footer.tsx`

## Support

For support or questions, please contact us at hello@pixelforge.com

## License

This project is proprietary to Pixel Forge.