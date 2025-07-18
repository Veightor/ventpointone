"use client";

import Image from "next/image";

interface BlogSection {
  content: string;
  image_prompt: string;
  subtitle?: string;
  isSelected?: boolean;
  originalIndex?: number;
  id?: number;
}

interface BlogData {
  title?: string;
  subtitle?: string;
  data?: {
    [key: string]: BlogSection;
  };
  [key: string]: unknown;
}

interface BlogPostRendererProps {
  blogData: BlogData | null;
  promptId: string;
}

export default function BlogPostRenderer({
  blogData,
  promptId,
}: BlogPostRendererProps) {
  if (!blogData?.data) {
    return null;
  }

  // Extract sections and sort them by key (1, 2, 3, etc.)
  const sections = Object.entries(blogData.data)
    .filter(([key, section]) => section && typeof section === "object")
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([key, section]) => ({ ...section, id: parseInt(key) }));

  // Get title from the first section or fallback
  const mainTitle =
    sections[0]?.subtitle || blogData.title || "Generated Blog Post";

  // Extract base64 image data from the API response if available
  const getImageDataUrl = (base64Data?: string) => {
    if (base64Data && base64Data.trim()) {
      // Check if it's already a data URL
      if (base64Data.startsWith("data:")) {
        return base64Data;
      }
      // Assume it's WebP format and add the data URL prefix
      return `data:image/webp;base64,${base64Data}`;
    }
    // Fallback to a placeholder
    return `https://images.unsplash.com/800x400?q=80&w=800&auto=format&fit=crop`;
  };

  // Try to extract the base64 image from the blog data
  // The base64 image data is in the response as blogData.data (the large base64 string)
  const heroImageUrl = getImageDataUrl(
    typeof blogData.data === "string" ? blogData.data : undefined
  );

  return (
    <div className="bg-[#5A3D48]/20 backdrop-blur-lg rounded-3xl overflow-hidden border border-[#805C6F]/30 mt-8">
      {/* Blog Header */}
      <div className="bg-gradient-to-r from-[#9A4453] to-[#805C6F] p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-[#C5768A] rounded-full"></div>
          <div className="w-3 h-3 bg-[#D4B5C8] rounded-full"></div>
          <div className="w-3 h-3 bg-[#EAEAEA] rounded-full"></div>
          <span className="ml-4 text-sm font-bold text-[#EAEAEA]">
            Generated Blog Post • ID: {promptId}
          </span>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-8">
        {/* Hero Section */}
        <article className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-[#9A4453]/20 to-[#C5768A]/20">
            <Image
              src={heroImageUrl}
              alt={mainTitle}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-4 py-2 bg-[#9A4453]/80 border border-[#C5768A]/60 rounded-full text-sm text-[#EAEAEA] font-bold mb-4 backdrop-blur-sm">
                🎭 AI Generated Content
              </span>
            </div>
          </div>

          {/* Title */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
                {mainTitle}
              </span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#805C6F]">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-full"></div>
                <span className="font-medium">AI Generated</span>
              </div>
              <span>•</span>
              <span>{new Date().toLocaleDateString()}</span>
              <span>•</span>
              <span>{Math.ceil(sections.length * 2)} min read</span>
            </div>
          </header>

          {/* Blog Sections */}
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => {
              // For now, use fallback for section images since individual sections
              // may not have separate image data in the current API response format
              const sectionImageUrl = getImageDataUrl(undefined);

              return (
                <section key={section.id || index} className="mb-16">
                  {/* Section Title */}
                  {section.subtitle && section.subtitle !== mainTitle && (
                    <h2 className="text-3xl font-bold text-[#EAEAEA] mb-6 leading-tight">
                      {section.subtitle}
                    </h2>
                  )}

                  {/* Content and Image Layout */}
                  <div
                    className={`grid ${
                      index % 2 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-3"
                    } gap-8 items-start mb-8`}
                  >
                    {/* Content */}
                    <div
                      className={`${
                        index % 2 === 0
                          ? "lg:col-span-2"
                          : "lg:col-span-2 lg:order-2"
                      }`}
                    >
                      <div className="text-[#D4B5C8] text-lg leading-relaxed">
                        {section.content &&
                        typeof section.content === "string" ? (
                          section.content
                            .split("\n")
                            .filter((p) => p.trim())
                            .map((paragraph, pIndex) => (
                              <p key={pIndex} className="mb-6">
                                {paragraph.trim()}
                              </p>
                            ))
                        ) : (
                          <p className="mb-6 text-[#805C6F] italic">
                            Content not available for this section
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Section Image */}
                    <div
                      className={`${
                        index % 2 === 0 ? "" : "lg:order-1"
                      } relative`}
                    >
                      <div className="relative h-64 w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#805C6F]/20 to-[#D4B5C8]/20 border border-[#805C6F]/30">
                        <Image
                          src={sectionImageUrl}
                          alt={
                            section.image_prompt ||
                            `Section ${section.id} illustration`
                          }
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/30 to-transparent"></div>
                      </div>
                      {/* Image Caption */}
                      <p className="text-sm text-[#805C6F] mt-3 italic text-center">
                        {section.image_prompt}
                      </p>
                    </div>
                  </div>

                  {/* Section Divider */}
                  {index < sections.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/30 to-transparent my-12"></div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Blog Footer */}
          <footer className="mt-16 pt-8 border-t border-[#805C6F]/30">
            <div className="bg-gradient-to-r from-[#5A3D48]/30 to-[#9A4453]/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-[#EAEAEA] mb-4">
                🎭 Generated by Ventriloquist AI
              </h3>
              <p className="text-[#805C6F] mb-6 max-w-2xl mx-auto">
                This content was automatically generated using advanced AI
                technology. From idea to publication in under 60 seconds.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-[#9A4453]/30 rounded-lg p-3 border border-[#9A4453]/40">
                  <div className="text-lg font-bold text-[#C5768A]">
                    ID: {promptId}
                  </div>
                  <div className="text-xs text-[#805C6F]">Prompt ID</div>
                </div>
                <div className="bg-[#805C6F]/30 rounded-lg p-3 border border-[#805C6F]/40">
                  <div className="text-lg font-bold text-[#D4B5C8]">
                    {sections.length}
                  </div>
                  <div className="text-xs text-[#805C6F]">Sections</div>
                </div>
                <div className="bg-[#C5768A]/30 rounded-lg p-3 border border-[#C5768A]/40">
                  <div className="text-lg font-bold text-[#EAEAEA]">AI</div>
                  <div className="text-xs text-[#805C6F]">Generated</div>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
