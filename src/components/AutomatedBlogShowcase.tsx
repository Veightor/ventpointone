"use client";

import { useEffect, useState } from "react";
import { ChevronRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface BlogParagraph {
  id: number;
  content: string;
  image_prompt: string;
}

interface BlogPost {
  title: string;
  subtitle: string;
  paragraphs: BlogParagraph[];
  title_image_prompt: string;
  interests: string[];
  stats: {
    seoScore: number;
    generationTime: string;
    originalityScore: number;
    readTime: string;
  };
}

// Pre-generated blog examples that cycle automatically
const SAMPLE_BLOGS: BlogPost[] = [
  {
    title:
      "5 Smart Home Technologies That Actually Reduce Your Carbon Footprint",
    subtitle:
      "Discover how intelligent automation, energy monitoring systems, and sustainable tech can transform your home into an eco-friendly powerhouse while saving money.",
    interests: ["🌱 Sustainable Technology", "🏡 Smart Home", "💚 Eco Living"],
    stats: {
      seoScore: 94,
      generationTime: "47s",
      originalityScore: 99.2,
      readTime: "8 min",
    },
    paragraphs: [
      {
        id: 1,
        content:
          "Smart home technology isn't just about convenience anymore—it's becoming a powerful tool for environmental sustainability. The latest generation of intelligent devices can dramatically reduce your home's energy consumption while providing real-time insights into your environmental impact. From learning thermostats that optimize heating patterns to smart water systems that prevent waste, these technologies are revolutionizing how we think about sustainable living.",
        image_prompt:
          "Modern smart home interface displaying energy savings and environmental metrics on a tablet",
      },
      {
        id: 2,
        content:
          "Smart thermostats like the Nest Learning Thermostat and Ecobee can reduce heating and cooling costs by up to 23% annually. These devices learn your schedule, adjust temperatures automatically, and provide detailed energy reports. Combined with smart blinds and window sensors, they create an ecosystem that minimizes energy waste while maintaining optimal comfort levels throughout your home.",
        image_prompt:
          "Sleek smart thermostat on wall showing energy savings dashboard with green metrics",
      },
      {
        id: 3,
        content:
          "Water conservation gets a high-tech upgrade with smart irrigation systems and leak detection sensors. These systems can reduce outdoor water usage by 30-50% by monitoring soil moisture, weather forecasts, and plant needs. Smart leak detectors prevent catastrophic water waste and can save thousands in potential damage while protecting this precious resource.",
        image_prompt:
          "Smart irrigation system in a modern garden with sensors monitoring soil and plants",
      },
    ],
    title_image_prompt:
      "Modern eco-friendly smart home exterior with solar panels, smart devices, and green technology integration",
  },
  {
    title: "The Art of Specialty Coffee: From Bean to Perfect Cup",
    subtitle:
      "Explore the fascinating world of third-wave coffee culture, from single-origin beans to precision brewing methods that transform your daily ritual into a craft experience.",
    interests: [
      "☕ Specialty Coffee",
      "🎨 Artisan Crafts",
      "🌍 Global Culture",
    ],
    stats: {
      seoScore: 91,
      generationTime: "52s",
      originalityScore: 98.7,
      readTime: "6 min",
    },
    paragraphs: [
      {
        id: 1,
        content:
          "The third wave of coffee culture has transformed our relationship with this beloved beverage from a simple caffeine delivery system to an artisanal experience worthy of wine-like appreciation. Specialty coffee roasters are now treating beans like precious gems, carefully sourcing from specific farms, altitudes, and processing methods to create unique flavor profiles that tell stories of their origin.",
        image_prompt:
          "Artisan coffee roaster carefully examining freshly roasted single-origin beans in a modern roastery",
      },
      {
        id: 2,
        content:
          "Understanding brewing variables—grind size, water temperature, extraction time, and ratios—can elevate your home coffee experience dramatically. The pour-over method, whether using a V60, Chemex, or Aeropress, allows for precise control over these variables. Each method produces distinct flavor profiles, from the clean clarity of a Chemex to the rich body of a French press.",
        image_prompt:
          "Minimalist coffee brewing setup with pour-over equipment, precise scale, and freshly ground beans",
      },
      {
        id: 3,
        content:
          "The journey from farm to cup involves passionate farmers, skilled roasters, and knowledgeable baristas working together to create something extraordinary. Supporting direct-trade relationships ensures farmers receive fair compensation while giving you access to the most exceptional beans. This connection between producer and consumer creates a sustainable ecosystem that benefits everyone involved.",
        image_prompt:
          "Coffee farmer in mountainous region carefully tending to coffee plants with ripe red cherries",
      },
    ],
    title_image_prompt:
      "Elegant coffee brewing scene with various pour-over methods, specialty beans, and artisan tools on marble countertop",
  },
  {
    title: "Urban Gardening Revolution: Growing Food in Small Spaces",
    subtitle:
      "Transform any urban space into a productive garden with innovative techniques, vertical growing systems, and space-efficient methods that bring fresh food to your doorstep.",
    interests: ["🌱 Urban Gardening", "🍅 Food Production", "🏙️ City Living"],
    stats: {
      seoScore: 96,
      generationTime: "44s",
      originalityScore: 99.5,
      readTime: "7 min",
    },
    paragraphs: [
      {
        id: 1,
        content:
          "Urban gardening is experiencing a renaissance as city dwellers discover the joy and practicality of growing their own food. Even the smallest balcony, rooftop, or indoor space can become a productive garden using innovative techniques like vertical growing, container gardening, and hydroponic systems. This movement isn't just about fresh produce—it's about reconnecting with our food sources and creating sustainable urban ecosystems.",
        image_prompt:
          "Lush vertical garden on an urban balcony with various vegetables and herbs growing in creative containers",
      },
      {
        id: 2,
        content:
          "Vertical gardening maximizes space efficiency by growing upward rather than outward. Wall-mounted planters, trellis systems, and tower gardens can transform bare walls into productive green spaces. These systems are perfect for vining crops like tomatoes, cucumbers, and beans, while herbs and leafy greens thrive in smaller containers at different levels.",
        image_prompt:
          "Modern vertical garden wall system in an apartment with multiple levels of thriving vegetables and herbs",
      },
      {
        id: 3,
        content:
          "Container gardening opens endless possibilities for urban food production. From repurposed buckets and wooden boxes to sophisticated self-watering systems, containers allow for precise soil control and easy maintenance. Succession planting in containers ensures continuous harvests throughout the growing season, while mobile containers can follow optimal sunlight conditions.",
        image_prompt:
          "Diverse collection of container gardens on a rooftop with vegetables, herbs, and fruit plants thriving",
      },
    ],
    title_image_prompt:
      "Vibrant urban rooftop garden with raised beds, vertical growing systems, and city skyline backdrop",
  },
];

export default function AutomatedBlogShowcase() {
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [generationPhase, setGenerationPhase] = useState<
    "analyzing" | "generating" | "complete"
  >("analyzing");

  const currentBlog = SAMPLE_BLOGS[currentBlogIndex];

  // Auto-cycle through blogs every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentBlogIndex((prev) => (prev + 1) % SAMPLE_BLOGS.length);
        setGenerationPhase("analyzing");
        setIsVisible(true);
      }, 500);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Simulate generation phases
  useEffect(() => {
    if (generationPhase === "analyzing") {
      const timer = setTimeout(() => setGenerationPhase("generating"), 2000);
      return () => clearTimeout(timer);
    } else if (generationPhase === "generating") {
      const timer = setTimeout(() => setGenerationPhase("complete"), 3000);
      return () => clearTimeout(timer);
    }
  }, [generationPhase, currentBlogIndex]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#9A4453]/20 to-[#C5768A]/20 text-[#C5768A] border border-[#9A4453]/30 backdrop-blur-sm">
            <SparklesIcon className="w-4 h-4 mr-2" />✨ Live AI Generation
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
            Watch AI Create
          </span>
          <br />
          <span className="text-[#805C6F]">Professional Content</span>
        </h2>
        <p className="text-xl text-[#805C6F] max-w-3xl mx-auto leading-relaxed">
          Experience the power of AI-driven content creation. See how interests
          transform into SEO-optimized, engaging blog posts in real-time.
        </p>
      </div>

      {/* Automated Generation Demo */}
      <div
        className={`transition-all duration-500 ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-4"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Side - Shows current interests */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#5A3D48]/30 to-[#9A4453]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#805C6F]/30 hover:border-[#C5768A]/50 transition-all duration-500">
              <h3 className="text-2xl font-bold text-[#EAEAEA] mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-[#9A4453] to-[#C5768A] rounded-full flex items-center justify-center text-sm font-bold mr-4 text-[#EAEAEA]">
                  📝
                </span>
                AI Analyzing Interests
              </h3>

              {/* Interest Tags */}
              <div className="space-y-4 mb-6">
                <div className="flex flex-wrap gap-3">
                  {currentBlog.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-[#9A4453]/20 to-[#C5768A]/20 border border-[#C5768A]/40 rounded-full text-[#EAEAEA] text-sm font-medium animate-pulse"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Generation Status */}
              <div className="bg-[#2A2A2A]/60 rounded-xl p-4 border border-[#805C6F]/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#C5768A] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#D4B5C8] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#9A4453] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-[#805C6F] font-medium">
                    {generationPhase === "analyzing" &&
                      "Analyzing interests..."}
                    {generationPhase === "generating" &&
                      "Generating content..."}
                    {generationPhase === "complete" && "Content ready!"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#5A3D48]/30 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#9A4453] to-[#C5768A] h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width:
                        generationPhase === "analyzing"
                          ? "30%"
                          : generationPhase === "generating"
                          ? "70%"
                          : "100%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Output Side - Shows generated content */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#5A3D48]/30 to-[#9A4453]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#C5768A]/30 hover:border-[#D4B5C8]/50 transition-all duration-500">
              <h3 className="text-2xl font-bold text-[#EAEAEA] mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-full flex items-center justify-center text-sm font-bold mr-4 text-[#2A2A2A]">
                  ✨
                </span>
                Generated Blog Post
              </h3>

              {/* Blog Content Preview */}
              <div className="space-y-6">
                <div className="bg-[#2A2A2A]/80 rounded-xl p-6 border border-[#805C6F]/30">
                  <h4 className="text-xl font-bold text-[#EAEAEA] mb-3 leading-tight">
                    {currentBlog.title}
                  </h4>
                  <p className="text-[#805C6F] leading-relaxed mb-4 text-sm">
                    {currentBlog.subtitle}
                  </p>

                  {/* Sample paragraph */}
                  <div className="mb-4">
                    <p className="text-[#D4B5C8] text-sm leading-relaxed">
                      {currentBlog.paragraphs[0].content.substring(0, 200)}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {currentBlog.interests
                        .slice(0, 2)
                        .map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#9A4453]/30 rounded-full text-xs text-[#C5768A] font-medium"
                          >
                            {interest.split(" ")[1]}
                          </span>
                        ))}
                    </div>
                    <span className="text-sm text-[#805C6F] font-medium">
                      {currentBlog.stats.readTime} read
                    </span>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-[#9A4453]/20 rounded-lg p-3 border border-[#9A4453]/30">
                    <div className="text-xl font-bold text-[#C5768A]">
                      {currentBlog.stats.seoScore}/100
                    </div>
                    <div className="text-xs text-[#805C6F] font-medium">
                      SEO Score
                    </div>
                  </div>
                  <div className="bg-[#805C6F]/20 rounded-lg p-3 border border-[#805C6F]/30">
                    <div className="text-xl font-bold text-[#D4B5C8]">
                      {currentBlog.stats.generationTime}
                    </div>
                    <div className="text-xs text-[#805C6F] font-medium">
                      Generated
                    </div>
                  </div>
                  <div className="bg-[#C5768A]/20 rounded-lg p-3 border border-[#C5768A]/30">
                    <div className="text-xl font-bold text-[#EAEAEA]">
                      {currentBlog.stats.originalityScore}%
                    </div>
                    <div className="text-xs text-[#805C6F] font-medium">
                      Original
                    </div>
                  </div>
                </div>

                {/* View Full Article Button */}
                <div className="text-center">
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#9A4453] to-[#C5768A] hover:from-[#9A4453] hover:to-[#D4B5C8] rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 text-[#EAEAEA] group">
                    View Full Article
                    <ChevronRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showcase Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {SAMPLE_BLOGS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentBlogIndex(index);
                setGenerationPhase("analyzing");
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBlogIndex
                  ? "bg-gradient-to-r from-[#C5768A] to-[#D4B5C8]"
                  : "bg-[#805C6F]/30 hover:bg-[#805C6F]/50"
              }`}
            />
          ))}
        </div>

        {/* Auto-rotation Notice */}
        <div className="text-center mt-8">
          <p className="text-sm text-[#805C6F] flex items-center justify-center">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Content automatically cycles every 15 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
