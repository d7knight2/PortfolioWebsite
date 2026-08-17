# Portfolio Website

Personal portfolio website for David Knight, showcasing professional bio and project portfolio.

## 🚀 Live Demo

Visit the live site: [https://portfolio-website-alpha-bice.vercel.app](https://portfolio-website-alpha-bice.vercel.app)

## 📋 Features

- **Professional Bio**: Comprehensive introduction with background in Android development
- **Project Showcase**: Highlighting key projects including:
  - AlgoStrategySandbox (QuantConnect integration)
  - PrepWise-AI (AI-powered interview prep)
  - AnrWatchdog (Android performance library)
- **Modern Design**: Dark theme with gradient accents and responsive layout
- **Fast Performance**: Static site generation with Next.js
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.0
- **Language**: TypeScript 5.0.0
- **Styling**: Inline React styles
- **Deployment**: Vercel

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/d7knight2/PortfolioWebsite.git
cd PortfolioWebsite
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 🚢 Deployment

This project is configured for automatic deployment on Vercel:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy

GitHub Actions also validates the Vercel build on pull requests. To enable CLI deploys from Actions, add these repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Optional: `VERCEL_AUTOMATION_BYPASS_SECRET` lets UI tests reach Deployment Protection–gated preview URLs.

## ✅ GitHub Actions

- **CI**: lint, Next.js build, and Playwright tests
- **Vercel**: validates `vercel.json`, runs a production build, and deploys preview/production when Vercel secrets are configured
- **UI Tests**: Playwright UI tests across desktop and mobile browsers, plus tests against live Vercel preview URLs when a deployment succeeds

## 📁 Project Structure

```
PortfolioWebsite/
├── src/
│   ├── pages/
│   │   ├── _app.tsx       # App wrapper
│   │   ├── index.tsx      # Home page with bio
│   │   └── projects.tsx   # Projects showcase
│   └── styles/
│       └── globals.css    # Global styles
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**David Knight**
- GitHub: [@d7knight2](https://github.com/d7knight2)
- LinkedIn: [d7knight](https://www.linkedin.com/in/d7knight)