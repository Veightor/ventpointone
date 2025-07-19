import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ArtOrchestrator from "../components/ArtOrchestrator";
import InteractiveArtLayer from "../components/InteractiveArtLayer";
import ArtExplainer from "../components/ArtExplainer";
import PerformanceMonitor from "../components/PerformanceMonitor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KorBIN-view | AI-Powered Blog Generation Platform",
  description:
    "Transform your interests into professional blogs using advanced AI that writes, designs, and publishes automatically. KorBIN-view by KorBon.AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ArtOrchestrator />
        <InteractiveArtLayer />
        {children}
        <ArtExplainer />
        <PerformanceMonitor />
      </body>
    </html>
  );
}
