import Image from "next/image";
import AutomatedBlogShowcase from "../components/AutomatedBlogShowcase";
import HomeRecentPosts from "../components/HomeRecentPosts";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#2A2A2A] text-[#EAEAEA] overflow-x-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A2A2A] via-[#5A3D48] to-[#2A2A2A]"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#9A4453]/20 to-[#C5768A]/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-[#805C6F]/30 to-[#D4B5C8]/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-[#C5768A]/20 to-[#9A4453]/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full gap-4 p-4">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-[#D4B5C8]/20 rounded-sm"
              ></div>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center z-10">
          {/* Status Badge with Clean Design */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:text-white">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              A KorBon.AI Product — Phase 0.5 Beta
            </span>
          </div>

          {/* Main Title with Clean Design */}
          <div className="mb-12 relative">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                KorBIN
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-light text-gray-400 mt-2">
                view
              </span>
            </h1>

            {/* Clean Subtitle */}
            <div className="text-lg md:text-xl text-gray-300 font-normal mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your interests into professional blogs using advanced AI
              that writes, designs, and publishes automatically
            </div>
          </div>

          {/* Apple TV Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto">
            {/* Try Ventriloquist - Cosmic Blue */}
            <a href="/demo" className="group relative block">
              <div className="relative overflow-hidden bg-gradient-to-br from-cyan-400/20 via-blue-500/30 to-indigo-600/40 backdrop-blur-2xl rounded-2xl border border-cyan-300/20 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-cyan-500/25 hover:border-cyan-400/40 w-full h-48">
                {/* Animated Background Orbs */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-500/20 rounded-full blur-lg transition-all duration-700 group-hover:scale-150 group-hover:rotate-45"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-indigo-500/20 to-cyan-400/30 rounded-full blur-md transition-all duration-500 group-hover:scale-125"></div>

                {/* Content */}
                <div className="relative p-6 z-10 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl drop-shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      🎭
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                      <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent leading-tight">
                      Try Ventriloquist
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                    <p className="text-xs text-cyan-100/80 leading-relaxed font-medium">
                      AI-powered blog generation in seconds
                    </p>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </a>

            {/* Experimental Prompt Lab - Electric Green */}
            <a href="/prompt-lab" className="group relative block">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400/20 via-green-500/30 to-teal-600/40 backdrop-blur-2xl rounded-2xl border border-emerald-300/20 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-emerald-500/25 hover:border-emerald-400/40 w-full h-48">
                {/* Geometric Background Elements */}
                <div className="absolute top-3 right-3 w-10 h-10 border-2 border-emerald-400/30 rotate-45 transition-all duration-700 group-hover:rotate-[225deg] group-hover:scale-150"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-green-400/40 to-teal-500/20 transform rotate-12 transition-all duration-500 group-hover:rotate-45 group-hover:scale-125"></div>
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-emerald-400/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 group-hover:scale-200 blur-sm"></div>

                {/* Content */}
                <div className="relative p-6 z-10 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl drop-shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
                      🧪
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg rotate-45 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white -rotate-45"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-white via-emerald-100 to-green-200 bg-clip-text text-transparent leading-tight">
                      Experimental Lab
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
                    <p className="text-xs text-emerald-100/80 leading-relaxed font-medium">
                      Wild AI input interfaces & experiments
                    </p>
                  </div>
                </div>

                {/* Electric Border Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-green-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </a>

            {/* Emotion Alchemy Lab - Mystic Purple */}
            <a href="/emotion-alchemy" className="group relative block">
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-400/20 via-indigo-500/30 to-pink-600/40 backdrop-blur-2xl rounded-2xl border border-purple-300/20 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/25 hover:border-purple-400/40 w-full h-48">
                {/* Magical Particle Effects */}
                <div className="absolute top-4 left-6 w-2 h-2 bg-purple-400 rounded-full opacity-60 transition-all duration-1000 group-hover:animate-bounce"></div>
                <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40 transition-all duration-700 group-hover:animate-ping"></div>
                <div className="absolute bottom-6 right-6 w-2.5 h-2.5 bg-indigo-400 rounded-full opacity-50 transition-all duration-500 group-hover:animate-pulse"></div>

                {/* Mystical Orb */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-indigo-500/30 rounded-full blur-lg transition-all duration-700 group-hover:scale-150 group-hover:rotate-180"></div>

                {/* Content */}
                <div className="relative p-6 z-10 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl drop-shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      ⚗️
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-ping opacity-30"></div>
                        <svg
                          className="w-3 h-3 text-white relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent leading-tight">
                      Emotion Alchemy
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
                    <p className="text-xs text-purple-100/80 leading-relaxed font-medium">
                      Transmute emotions into content magic
                    </p>
                  </div>
                </div>

                {/* Mystical Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/5 to-pink-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </a>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {[
              "🤖 AI-Powered Generation",
              "⚡ 47s Average Speed",
              "📊 94% SEO Score",
              "🎯 12+ Content Types",
              "🔒 Enterprise Ready",
            ].map((feature, index) => (
              <div key={index} className="group">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Border Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/50 to-transparent"></div>

      {/* Ventriloquist in Action - MOVED UP */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5A3D48]/5 to-[#2A2A2A]/10"></div>
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-[#9A4453]/20 text-[#C5768A] border border-[#9A4453]/30">
                ✨ Live Demo
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
                Watch Ventriloquist
              </span>
              <br />
              <span className="text-[#805C6F]">Work Its Magic</span>
            </h2>
            <p className="text-xl text-[#805C6F] max-w-3xl mx-auto leading-relaxed">
              See how your interests transform into professional blog content.
              From spark to story, witness the AI orchestrate your voice across
              the web.
            </p>
          </div>

          {/* Interest to Blog Transformation */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Input Side */}
            <div className="space-y-8">
              <div className="bg-[#5A3D48]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#805C6F]/30 hover:border-[#C5768A]/50 transition-all duration-500">
                <h3 className="text-2xl font-bold text-[#EAEAEA] mb-6 flex items-center">
                  <span className="w-10 h-10 bg-gradient-to-r from-[#9A4453] to-[#C5768A] rounded-full flex items-center justify-center text-sm font-bold mr-4 text-[#EAEAEA]">
                    1
                  </span>
                  Your Interests
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-[#9A4453]/20 to-[#C5768A]/20 border border-[#C5768A]/40 rounded-full text-[#EAEAEA] text-sm font-medium">
                      🌱 Sustainable Technology
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#805C6F]/20 to-[#D4B5C8]/20 border border-[#D4B5C8]/40 rounded-full text-[#EAEAEA] text-sm font-medium">
                      🏡 Urban Gardening
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#C5768A]/20 to-[#9A4453]/20 border border-[#9A4453]/40 rounded-full text-[#EAEAEA] text-sm font-medium">
                      ☕ Coffee Culture
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#9A4453]/5 to-[#C5768A]/5 rounded-xl"></div>
                    <textarea
                      className="relative w-full h-36 bg-[#2A2A2A]/80 border-2 border-[#805C6F]/40 rounded-xl p-4 text-[#EAEAEA] placeholder-[#805C6F] resize-none focus:border-[#C5768A]/60 transition-colors"
                      placeholder="I'm passionate about sustainable living and how technology can help us create eco-friendly solutions that actually make a difference in our daily lives..."
                      readOnly
                      value="I'm passionate about sustainable living and how technology can help us create eco-friendly solutions that actually make a difference in our daily lives..."
                    />
                  </div>
                </div>
              </div>

              {/* Processing Animation */}
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-3 bg-[#2A2A2A]/60 backdrop-blur-sm rounded-full px-6 py-3 border border-[#805C6F]/30">
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
                    AI Processing...
                  </span>
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#5A3D48]/30 to-[#9A4453]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#C5768A]/30 hover:border-[#D4B5C8]/50 transition-all duration-500">
                <h3 className="text-2xl font-bold text-[#EAEAEA] mb-6 flex items-center">
                  <span className="w-10 h-10 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-full flex items-center justify-center text-sm font-bold mr-4 text-[#2A2A2A]">
                    2
                  </span>
                  Generated Blog
                </h3>
                <div className="space-y-6">
                  <div className="bg-[#2A2A2A]/80 rounded-xl p-6 border border-[#805C6F]/30">
                    <h4 className="text-xl font-bold text-[#EAEAEA] mb-3 leading-tight">
                      5 Smart Home Technologies That Actually Reduce Your Carbon
                      Footprint
                    </h4>
                    <p className="text-[#805C6F] leading-relaxed mb-4">
                      Discover how intelligent automation, energy monitoring
                      systems, and sustainable tech can transform your home into
                      an eco-friendly powerhouse while saving money. From smart
                      thermostats to solar integration...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <span className="px-3 py-1 bg-[#9A4453]/30 rounded-full text-xs text-[#C5768A] font-medium">
                          #Sustainability
                        </span>
                        <span className="px-3 py-1 bg-[#805C6F]/30 rounded-full text-xs text-[#D4B5C8] font-medium">
                          #SmartHome
                        </span>
                      </div>
                      <span className="text-sm text-[#805C6F] font-medium">
                        8 min read
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-[#9A4453]/20 rounded-lg p-3 border border-[#9A4453]/30">
                      <div className="text-xl font-bold text-[#C5768A]">
                        94/100
                      </div>
                      <div className="text-xs text-[#805C6F] font-medium">
                        SEO Score
                      </div>
                    </div>
                    <div className="bg-[#805C6F]/20 rounded-lg p-3 border border-[#805C6F]/30">
                      <div className="text-xl font-bold text-[#D4B5C8]">
                        47s
                      </div>
                      <div className="text-xs text-[#805C6F] font-medium">
                        Generated
                      </div>
                    </div>
                    <div className="bg-[#C5768A]/20 rounded-lg p-3 border border-[#C5768A]/30">
                      <div className="text-xl font-bold text-[#EAEAEA]">
                        99.2%
                      </div>
                      <div className="text-xs text-[#805C6F] font-medium">
                        Original
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Gallery with Real Images */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-[#D4B5C8] to-[#C5768A] bg-clip-text text-transparent">
                Diverse Content, One Platform
              </span>
            </h3>
            <p className="text-center text-[#805C6F] mb-12 max-w-2xl mx-auto">
              From tech deep-dives to lifestyle tips, see the variety of
              professional content Ventriloquist creates
            </p>

            {/* Enhanced Bento Grid with Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
              {/* Featured Tech Blog with Image */}
              <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-gradient-to-br from-[#5A3D48]/30 to-[#9A4453]/20 backdrop-blur-lg rounded-3xl border border-[#805C6F]/30 hover:border-[#C5768A]/60 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
                    alt="Sustainable Computing"
                    fill
                    className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/90 via-[#2A2A2A]/50 to-transparent"></div>
                <div className="relative h-full p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-4 py-2 bg-[#9A4453]/40 border border-[#C5768A]/40 rounded-full text-xs text-[#EAEAEA] font-bold mb-4 backdrop-blur-sm">
                      🔬 TECHNOLOGY
                    </span>
                    <h4 className="text-2xl font-bold text-[#EAEAEA] mb-3 leading-tight">
                      The Future of Sustainable Computing: How Green AI is
                      Reshaping Technology
                    </h4>
                    <p className="text-[#D4B5C8] leading-relaxed">
                      Exploring how artificial intelligence is becoming more
                      environmentally conscious, from energy-efficient
                      algorithms to carbon-neutral data centers...
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-full"></div>
                      <span className="text-sm text-[#D4B5C8] font-medium">
                        AI Generated
                      </span>
                    </div>
                    <span className="text-sm text-[#805C6F] font-medium">
                      12 min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Coffee Culture Blog with Image */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-[#805C6F]/20 to-[#D4B5C8]/20 backdrop-blur-lg rounded-3xl border border-[#805C6F]/30 hover:border-[#C5768A]/60 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
                    alt="Coffee Culture"
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 to-transparent"></div>
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#805C6F]/40 rounded-full text-xs text-[#EAEAEA] font-bold mb-3 backdrop-blur-sm">
                      ☕ LIFESTYLE
                    </span>
                    <h4 className="text-lg font-bold text-[#EAEAEA] mb-2 leading-tight">
                      Third Wave Coffee Culture
                    </h4>
                  </div>
                  <div className="text-sm text-[#D4B5C8] font-medium">
                    6 min read
                  </div>
                </div>
              </div>

              {/* Urban Gardening with Image */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-[#9A4453]/20 to-[#C5768A]/20 backdrop-blur-lg rounded-3xl border border-[#9A4453]/30 hover:border-[#C5768A]/60 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.pexels.com/photos/1454794/pexels-photo-1454794.jpeg"
                    alt="Urban Gardening"
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 to-transparent"></div>
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#9A4453]/40 rounded-full text-xs text-[#EAEAEA] font-bold mb-3 backdrop-blur-sm">
                      🌱 GARDENING
                    </span>
                    <h4 className="text-lg font-bold text-[#EAEAEA] mb-2 leading-tight">
                      Urban Rooftop Gardens
                    </h4>
                  </div>
                  <div className="text-sm text-[#D4B5C8] font-medium">
                    4 min read
                  </div>
                </div>
              </div>

              {/* How-to Guide with Image */}
              <div className="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-[#C5768A]/20 to-[#D4B5C8]/20 backdrop-blur-lg rounded-3xl border border-[#C5768A]/30 hover:border-[#D4B5C8]/60 transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
                    alt="Smart Home Guide"
                    fill
                    className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A]/80 to-[#2A2A2A]/60"></div>
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-4 py-2 bg-[#C5768A]/40 border border-[#D4B5C8]/40 rounded-full text-xs text-[#EAEAEA] font-bold mb-4 backdrop-blur-sm">
                      📚 HOW-TO GUIDE
                    </span>
                    <h4 className="text-xl font-bold text-[#EAEAEA] mb-3 leading-tight">
                      Building Your First Smart Home Ecosystem on a Budget
                    </h4>
                    <p className="text-[#D4B5C8] text-sm leading-relaxed">
                      A step-by-step guide to creating an intelligent, connected
                      home without breaking the bank...
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-[#9A4453]/30 rounded-full text-xs text-[#C5768A] font-medium">
                        #DIY
                      </span>
                      <span className="px-3 py-1 bg-[#805C6F]/30 rounded-full text-xs text-[#D4B5C8] font-medium">
                        #SmartHome
                      </span>
                    </div>
                    <span className="text-sm text-[#D4B5C8] font-medium">
                      15 min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Tips with Image */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-[#5A3D48]/30 to-[#805C6F]/20 backdrop-blur-lg rounded-3xl border border-[#5A3D48]/30 hover:border-[#805C6F]/60 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                    alt="Eco Tips"
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 to-transparent"></div>
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#5A3D48]/40 rounded-full text-xs text-[#EAEAEA] font-bold mb-3 backdrop-blur-sm">
                      ⚡ QUICK TIPS
                    </span>
                    <h4 className="text-lg font-bold text-[#EAEAEA] mb-2 leading-tight">
                      5 Eco-Friendly Swaps
                    </h4>
                  </div>
                  <div className="text-sm text-[#D4B5C8] font-medium">
                    2 min read
                  </div>
                </div>
              </div>

              {/* Recipe/Tutorial with Image */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-[#D4B5C8]/20 to-[#C5768A]/20 backdrop-blur-lg rounded-3xl border border-[#D4B5C8]/30 hover:border-[#C5768A]/60 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg"
                    alt="Cold Brew Recipe"
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 to-transparent"></div>
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#D4B5C8]/40 rounded-full text-xs text-[#2A2A2A] font-bold mb-3 backdrop-blur-sm">
                      🥤 RECIPE
                    </span>
                    <h4 className="text-lg font-bold text-[#EAEAEA] mb-2 leading-tight">
                      Organic Cold Brew
                    </h4>
                  </div>
                  <div className="text-sm text-[#D4B5C8] font-medium">
                    3 min read
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Stats - Enhanced */}
          <div className="bg-gradient-to-r from-[#5A3D48]/20 to-[#9A4453]/20 backdrop-blur-lg rounded-3xl p-10 border border-[#805C6F]/30">
            <h3 className="text-3xl font-bold text-center text-[#EAEAEA] mb-12">
              Real Performance, Real Results
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] bg-clip-text text-transparent mb-2">
                  94%
                </div>
                <div className="text-sm text-[#805C6F] font-medium">
                  Average SEO Score
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-[#D4B5C8] to-[#9A4453] bg-clip-text text-transparent mb-2">
                  47s
                </div>
                <div className="text-sm text-[#805C6F] font-medium">
                  Generation Time
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-[#9A4453] to-[#C5768A] bg-clip-text text-transparent mb-2">
                  12+
                </div>
                <div className="text-sm text-[#805C6F] font-medium">
                  Content Types
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-[#C5768A] to-[#805C6F] bg-clip-text text-transparent mb-2">
                  99.2%
                </div>
                <div className="text-sm text-[#805C6F] font-medium">
                  Originality Score
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Border Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/50 to-transparent"></div>

      {/* AI Blogging Assistant Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <AutomatedBlogShowcase />

        {/* Recent Posts Showcase */}
        <HomeRecentPosts />
      </section>

      {/* Border Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/50 to-transparent"></div>

      {/* Core Features - Enhanced */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
                Core Platform Features
              </span>
            </h2>
            <p className="text-xl text-[#805C6F] max-w-2xl mx-auto">
              Discover the powerful features that make KorBIN-view the ultimate
              AI blogging platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-gradient-to-br from-[#5A3D48]/20 to-[#9A4453]/10 backdrop-blur-lg p-8 rounded-3xl border border-[#9A4453]/30 hover:border-[#C5768A]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-[#9A4453] to-[#C5768A] rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#EAEAEA]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#EAEAEA] group-hover:text-[#D4B5C8] transition-colors">
                AI-Powered Auto-Blogging
              </h3>
              <p className="text-[#805C6F] leading-relaxed">
                Ventriloquist transforms your interests into live, shareable
                blogs in minutes. Simply tell the AI what you&apos;re passionate
                about—it writes, designs, and publishes the site for you.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-[#805C6F]/15 to-[#D4B5C8]/10 backdrop-blur-lg p-8 rounded-3xl border border-[#805C6F]/30 hover:border-[#D4B5C8]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-[#805C6F] to-[#D4B5C8] rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#EAEAEA]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#EAEAEA] group-hover:text-[#D4B5C8] transition-colors">
                Advanced RAG System
              </h3>
              <p className="text-[#805C6F] leading-relaxed">
                Our Retrieval-Augmented Generation system intelligently pulls
                from public and internal data sources to create rich, informed,
                and uniquely tailored content for your blogs.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-[#C5768A]/15 to-[#5A3D48]/15 backdrop-blur-lg p-8 rounded-3xl border border-[#C5768A]/30 hover:border-[#D4B5C8]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#2A2A2A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#EAEAEA] group-hover:text-[#D4B5C8] transition-colors">
                Simple User Control
              </h3>
              <p className="text-[#805C6F] leading-relaxed">
                An intuitive dashboard puts you in complete control. Manage your
                blogs, interests, author details, and SEO settings effortlessly
                without any technical hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Border Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/50 to-transparent"></div>

      {/* Feature Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
                  Comprehensive Platform Features
                </span>
              </h2>
              <p className="text-xl text-[#805C6F] mb-8">
                KorBIN-view isn&apos;t just a blogging tool—it&apos;s a complete
                ecosystem for AI-powered content creation and management.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Chat Interface with n8n Pipeline",
                    description:
                      "Seamless integration with n8n workflows for advanced automation and data processing.",
                    color: "from-[#9A4453] to-[#C5768A]",
                  },
                  {
                    title: "GitHub & Google Authentication",
                    description:
                      "Secure login with popular OAuth providers for seamless user experience.",
                    color: "from-[#805C6F] to-[#D4B5C8]",
                  },
                  {
                    title: "Role-Based Access Control (RBAC)",
                    description:
                      "Fine-grained permissions and user roles for enterprise-grade security and collaboration.",
                    color: "from-[#C5768A] to-[#9A4453]",
                  },
                  {
                    title: "CI/CD Pipeline",
                    description:
                      "Automated testing and deployment pipeline ensuring reliable, continuous delivery.",
                    color: "from-[#D4B5C8] to-[#805C6F]",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 mt-1`}
                    >
                      <svg
                        className="w-5 h-5 text-[#EAEAEA]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#EAEAEA] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[#805C6F] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9A4453]/20 to-[#C5768A]/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-[#5A3D48]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#805C6F]/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#9A4453]/30 to-[#C5768A]/20 p-6 rounded-2xl border border-[#9A4453]/40">
                    <div className="text-3xl font-black text-[#C5768A] mb-2">
                      Phase 0.1
                    </div>
                    <div className="text-[#EAEAEA] font-bold">Prototype</div>
                    <div className="text-sm text-[#805C6F] mt-2">
                      Core functionality focus
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#805C6F]/30 to-[#D4B5C8]/20 p-6 rounded-2xl border border-[#805C6F]/40">
                    <div className="text-3xl font-black text-[#D4B5C8] mb-2">
                      Phase 0.5
                    </div>
                    <div className="text-[#EAEAEA] font-bold">Dogfood Beta</div>
                    <div className="text-sm text-[#805C6F] mt-2">
                      Enhanced UX & features
                    </div>
                  </div>
                  <div className="col-span-2 bg-gradient-to-br from-[#5A3D48]/30 to-[#2A2A2A]/30 p-6 rounded-2xl border border-[#5A3D48]/40">
                    <div className="text-lg font-bold text-[#EAEAEAEA] mb-4">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Next.js",
                        "TypeScript",
                        "Tailwind CSS",
                        "NextAuth.js",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#805C6F]/30 border border-[#805C6F]/40 rounded-full text-xs text-[#EAEAEA] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Border Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/50 to-transparent"></div>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                value: "99.9%",
                label: "Uptime",
                color: "from-[#D4B5C8] to-[#C5768A]",
              },
              {
                value: "<2min",
                label: "Blog Generation",
                color: "from-[#C5768A] to-[#9A4453]",
              },
              {
                value: "24/7",
                label: "AI Availability",
                color: "from-[#9A4453] to-[#805C6F]",
              },
              {
                value: "100+",
                label: "Data Sources",
                color: "from-[#805C6F] to-[#D4B5C8]",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.value}
                </div>
                <div className="text-[#805C6F] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Border Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/50 to-transparent"></div>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5A3D48]/30 to-[#9A4453]/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-r from-[#5A3D48]/20 to-[#9A4453]/15 backdrop-blur-lg rounded-3xl p-12 border border-[#805C6F]/30">
              <h2 className="text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
                  Ready to Transform Your Content?
                </span>
              </h2>
              <p className="text-xl text-[#805C6F] mb-8 max-w-2xl mx-auto leading-relaxed">
                Join the future of AI-powered blogging. Start creating
                professional, engaging content that resonates with your
                audience.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#9A4453] via-[#C5768A] to-[#D4B5C8] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <a href="/demo" className="relative block">
                    <button className="relative px-10 py-4 bg-gradient-to-r from-[#9A4453] to-[#C5768A] hover:from-[#9A4453] hover:to-[#D4B5C8] rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl text-[#EAEAEA]">
                      Start Creating Now
                      <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </a>
                </div>
                <a href="/demo" className="block">
                  <button className="w-full px-10 py-4 border-2 border-[#805C6F] hover:border-[#C5768A] rounded-xl font-bold text-lg transition-all duration-300 hover:bg-[#805C6F]/10 text-[#805C6F] hover:text-[#C5768A]">
                    Try Live Demo
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Border Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/50 to-transparent"></div>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#D4B5C8] to-[#C5768A] bg-clip-text text-transparent">
                KorBIN-view
              </h3>
              <p className="text-[#805C6F] leading-relaxed">
                AI-powered blogging platform that transforms ideas into
                professional content.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: ["Ventriloquist", "RAG System", "Dashboard", "API"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Support", "Community", "Blog"],
              },
              {
                title: "Company",
                links: ["About", "Privacy", "Terms", "Contact"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-bold mb-4 text-[#D4B5C8]">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[#805C6F] hover:text-[#C5768A] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#805C6F]/30">
            <p className="text-[#805C6F]">
              &copy; {new Date().getFullYear()} KorBon.AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[#805C6F] hover:text-[#C5768A] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
