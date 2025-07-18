import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export to enable API routes
  // output: "export", // Commented out for full functionality

  // Remove GitHub Pages specific paths for Vercel deployment
  // basePath: process.env.NODE_ENV === "production" ? "/ventpointone" : "",
  // assetPrefix: process.env.NODE_ENV === "production" ? "/ventpointone/" : "",

  // Enable trailing slash for better compatibility
  trailingSlash: true,

  // Ensure proper TypeScript compilation
  typescript: {
    // Don't fail build on TypeScript errors during development
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Don't fail build on ESLint errors during development
    ignoreDuringBuilds: false,
  },

  // Future compatibility settings
  images: {
    // Disable image optimization for static export
    unoptimized: true,
    // Enable modern image formats
    formats: ["image/webp", "image/avif"],
    // Allow external images from Pexels and Unsplash
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
