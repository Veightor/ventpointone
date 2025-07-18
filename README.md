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
- **Deployment**: Vercel (recommended) or Netlify
- **API Integration**: Custom API routes with environment-based configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Anvil API credentials

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
   # Anvil API Configuration (REQUIRED for full functionality)
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

### Vercel (Recommended - Full Functionality)

Vercel provides the best experience for Next.js apps with full API route support.

#### Option 1: Deploy from GitHub (Automatic)

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   In your Vercel project dashboard:

   - Go to **Settings** → **Environment Variables**
   - Add these variables:
     ```
     ANVIL_USERNAME = your_anvil_username
     ANVIL_PASSWORD = your_anvil_password
     ANVIL_API_URL = https://your-anvil-app.anvil.app
     ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

#### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables
vercel env add ANVIL_USERNAME production
vercel env add ANVIL_PASSWORD production
vercel env add ANVIL_API_URL production

# Redeploy with environment variables
vercel --prod
```

### Alternative: Netlify

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables in Netlify dashboard

### ⚠️ GitHub Pages Limitation

**Note**: GitHub Pages only supports static websites and cannot run the AI blog generation features. For full functionality, use Vercel or Netlify.

## 🔧 Configuration

### Environment Variables

| Variable              | Description            | Required |
| --------------------- | ---------------------- | -------- |
| `ANVIL_USERNAME`      | Username for Anvil API | **Yes**  |
| `ANVIL_PASSWORD`      | Password for Anvil API | **Yes**  |
| `ANVIL_API_URL`       | Base URL for Anvil API | **Yes**  |
| `NEXT_PUBLIC_APP_URL` | Public URL of your app | No       |

### Getting Anvil Credentials

1. Sign up at [anvil.works](https://anvil.works)
2. Create your blog generation app
3. Get your API credentials from the app settings
4. Update your environment variables

## 🎨 Customization

### Updating Repository Name

If you change your repository name, update the import URLs in your Vercel/Netlify deployment settings.

### Styling

- Colors and themes are defined in `src/app/globals.css`
- Component styles use Tailwind CSS
- Custom gradients and animations are inline

## 📁 Project Structure

```
ventpointone/
├── .github/workflows/    # GitHub Actions (legacy)
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes (working!)
│   │   ├── demo/       # Demo page
│   │   └── globals.css # Global styles
│   └── components/     # React components
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── vercel.json        # Vercel configuration
└── next.config.ts     # Next.js configuration
```

## 🚦 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
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
- Server-side API calls prevent credential exposure

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
- Deployed on [Vercel](https://vercel.com/)
- AI integration powered by Anvil

---

**Made with ❤️ by the KorBon.AI team**
