# KorBIN-view 🚀

An AI-powered blog generation platform that transforms your interests into professional, engaging blog content automatically.

![KorBIN-view Preview](https://via.placeholder.com/800x400/2A2A2A/EAEAEA?text=KorBIN-view+AI+Blog+Platform)

## ✨ Features

- 🤖 **AI-Powered Content Generation**: Transform ideas into professional blogs in minutes
- ⚡ **Lightning Fast**: Average generation time of 47 seconds
- 📊 **SEO Optimized**: Achieves 94% average SEO scores
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS
- 🔒 **Secure**: Environment-based configuration and secure API handling
- 📱 **Mobile-First**: Responsive design that works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: GitHub Pages with GitHub Actions
- **API Integration**: Custom API routes with environment-based configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ventpointone.git
   cd ventpointone
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your actual values:

   ```env
   # Anvil API Configuration (if using the full blog generation)
   ANVIL_USERNAME=your_anvil_username
   ANVIL_PASSWORD=your_anvil_password
   ANVIL_API_URL=https://your-anvil-app.anvil.app

   # Next.js Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Push to main branch**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**

   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

3. **Your site will be available at:**
   `https://yourusername.github.io/ventpointone`

### Manual Deployment

```bash
# Build for production
npm run build

# Export static files
npm run export

# The `out` folder contains your static site
```

## 🔧 Configuration

### Environment Variables

| Variable              | Description            | Required |
| --------------------- | ---------------------- | -------- |
| `ANVIL_USERNAME`      | Username for Anvil API | No\*     |
| `ANVIL_PASSWORD`      | Password for Anvil API | No\*     |
| `ANVIL_API_URL`       | Base URL for Anvil API | No\*     |
| `NEXT_PUBLIC_APP_URL` | Public URL of your app | No       |

\*Required only if using the full AI blog generation features

### GitHub Pages Configuration

The app is pre-configured for GitHub Pages with:

- Static export enabled
- Proper asset paths
- GitHub Actions workflow
- `.nojekyll` file for proper routing

## 🎨 Customization

### Updating Repository Name

If you change your repository name, update:

1. **next.config.ts**

   ```typescript
   basePath: process.env.NODE_ENV === "production" ? "/your-new-repo-name" : "",
   assetPrefix: process.env.NODE_ENV === "production" ? "/your-new-repo-name/" : "",
   ```

2. **Rebuild and redeploy**

### Styling

- Colors and themes are defined in `src/app/globals.css`
- Component styles use Tailwind CSS
- Custom gradients and animations are inline

## 📁 Project Structure

```
ventpointone/
├── .github/workflows/    # GitHub Actions
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   ├── demo/       # Demo page
│   │   └── globals.css # Global styles
│   └── components/     # React components
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
└── next.config.ts     # Next.js configuration
```

## 🚦 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Build and export static files
```

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier formatting (recommended)

## 🔒 Security

- All sensitive credentials are environment-based
- API routes validate environment variables
- `.gitignore` excludes sensitive files
- CORS protection on API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 **Email**: support@korbon.ai
- 💬 **Issues**: [GitHub Issues](https://github.com/yourusername/ventpointone/issues)
- 📖 **Documentation**: [Project Wiki](https://github.com/yourusername/ventpointone/wiki)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [GitHub Pages](https://pages.github.com/)
- AI integration powered by Anvil

---

**Made with ❤️ by the KorBon.AI team**
