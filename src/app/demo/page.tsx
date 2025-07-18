"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import RecentPostsSelector from "../../components/RecentPostsSelector";

// 100 diverse interests for the demo
const INTERESTS = [
  "🌱 Sustainable Living",
  "🎵 Indie Music Discovery",
  "🧘 Mindfulness Meditation",
  "🍕 Artisan Pizza Making",
  "📚 Science Fiction Novels",
  "🎮 Retro Gaming",
  "🌸 Urban Gardening",
  "☕ Specialty Coffee",
  "🎨 Digital Art Creation",
  "🚲 Cycling Adventures",
  "🧬 Biohacking",
  "🎭 Improv Comedy",
  "🌍 Travel Photography",
  "🍜 Ramen Culture",
  "💡 Tech Startups",
  "🏃 Marathon Training",
  "📱 App Development",
  "🎪 Circus Arts",
  "🌊 Ocean Conservation",
  "🍷 Wine Tasting",
  "🎯 Archery",
  "🧩 Puzzle Solving",
  "🌙 Astronomy",
  "🍫 Chocolate Making",
  "🎸 Acoustic Guitar",
  "📝 Creative Writing",
  "🧱 LEGO Building",
  "🌿 Herb Gardening",
  "🎬 Film Analysis",
  "🏔️ Rock Climbing",
  "🍱 Japanese Cuisine",
  "💎 Gemstone Collecting",
  "🎨 Watercolor Painting",
  "🚁 Drone Photography",
  "🧪 Home Chemistry",
  "🎺 Jazz Music",
  "🌋 Geology",
  "🍯 Beekeeping",
  "🎪 Magic Tricks",
  "🏕️ Wild Camping",
  "📷 Street Photography",
  "🧵 Embroidery",
  "🌺 Orchid Growing",
  "🎲 Board Games",
  "🍜 Sourdough Baking",
  "🎹 Piano Composition",
  "🦋 Butterfly Watching",
  "🧗 Bouldering",
  "🌮 Taco Exploration",
  "📡 Amateur Radio",
  "🎨 Graffiti Art",
  "🌊 Surfing",
  "🍓 Berry Picking",
  "🎪 Juggling",
  "🏺 Pottery Making",
  "📚 Poetry Writing",
  "🌙 Night Photography",
  "🍄 Mushroom Foraging",
  "🎻 Violin Playing",
  "🧩 Crossword Puzzles",
  "🌵 Cactus Collection",
  "🎬 Documentary Making",
  "🏃 Parkour",
  "🍕 Food Truck Hunting",
  "📱 Mobile Gaming",
  "🌸 Bonsai Cultivation",
  "🎪 Fire Dancing",
  "🧘 Yoga Practice",
  "🌊 Paddleboarding",
  "🍰 Cake Decorating",
  "🎨 Spray Painting",
  "🏔️ Mountaineering",
  "📚 Audiobook Listening",
  "🌿 Essential Oils",
  "🎮 Speedrunning",
  "🍜 Instant Ramen Reviews",
  "🎭 Theater Arts",
  "🌋 Volcano Tourism",
  "🍦 Ice Cream Making",
  "🎨 Anime Drawing",
  "🏊 Cold Water Swimming",
  "📷 Macro Photography",
  "🌙 Tarot Reading",
  "🍄 Fermentation",
  "🎪 Unicycling",
  "🧩 Escape Rooms",
  "🌺 Flower Arranging",
  "🎬 Stop Motion Animation",
  "🏃 Trail Running",
  "🍕 International Street Food",
  "📚 Graphic Novels",
  "🌿 Permaculture",
  "🎨 Calligraphy",
  "🌊 Freediving",
  "🍰 Pastry Arts",
  "🎮 Esports",
  "🏔️ Alpine Skiing",
  "📱 Tech Reviews",
  "🌸 Cherry Blossom Hunting",
  "🎪 Slack Lining",
  "🧘 Sound Healing",
  "🌊 Kayaking",
  "�� Craft Beer Brewing",
];

// Function to get 3 random interests
const getRandomInterests = () => {
  const shuffled = [...INTERESTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

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
}

interface BlogResultResponse {
  content?: unknown;
  status?: string;
  [key: string]: unknown;
}

export default function DemoPage() {
  const [promptId, setPromptId] = useState<string | null>(null);
  const [blogResult, setBlogResult] = useState<BlogResultResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [randomInterests, setRandomInterests] =
    useState<string[]>(getRandomInterests);

  // Function to copy text to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Function to refresh random interests
  const refreshInterests = () => {
    setRandomInterests(getRandomInterests());
  };

  // Check URL parameters for auto-loading a post
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loadPostId = urlParams.get("loadPost");
    if (loadPostId) {
      console.log(`🎯 Auto-loading post from URL: ${loadPostId}`);
      setPromptId(loadPostId);
      fetchBlogResult(loadPostId);
      // Clean up URL
      window.history.replaceState({}, "", "/demo");
    }
  }, []);

  // Function to handle post selection from recent posts
  const handleRecentPostSelect = useCallback((postId: string) => {
    console.log(`🎯 Selected recent post ID: ${postId}`);
    setPromptId(postId);
    fetchBlogResult(postId);
  }, []);

  const fetchBlogResult = useCallback(
    async (id: string, isPolling = false) => {
      console.log("🚀 Fetching blog result for ID:", id);

      if (!isPolling) {
        console.log("🔄 Setting loading state and resetting data...");
        setIsLoading(true);
        setError(null);
        setBlogPost(null);
      }

      try {
        // Use query parameter to avoid URL encoding issues with special characters
        const apiUrl = `/api/blog-results?id=${encodeURIComponent(id)}`;
        console.log(`🌐 Making API call to: ${apiUrl}`);
        console.log(
          "🔑 Using credentials: anvil_korbos_bin_template:87q234awrtghshfv789u3q4tar89g"
        );

        // Use our Next.js API route to avoid CORS issues
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("📡 Response received:", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          url: response.url,
          type: response.type,
        });

        // Get the response text first for debugging
        const responseText = await response.text();
        console.log("📝 Raw response text:", responseText);

        let result;
        try {
          result = JSON.parse(responseText);
          console.log("✅ Parsed JSON successfully:", result);
        } catch (parseError) {
          console.log("❌ JSON parse error:", parseError);
          console.log("📝 Response was not valid JSON:", responseText);
          throw new Error(
            `Invalid JSON response: ${responseText.substring(0, 200)}...`
          );
        }

        if (!response.ok) {
          console.log("❌ API Error response:", result);
          throw new Error(
            result.error ||
              `HTTP error! status: ${response.status} - ${responseText}`
          );
        }

        console.log("✅ API Response JSON:", result);
        setBlogResult(result);

        console.log("🔍 Parsing blog data...");

        // Handle the nested response structure: {success: true, promptId: "513", data: {data: [...]}}
        let blogDataArray = null;

        if (result && result.success && result.data && result.data.data) {
          blogDataArray = result.data.data;
          console.log("✅ Found blog data with", blogDataArray.length, "items");
        } else if (result && Array.isArray(result)) {
          blogDataArray = result;
          console.log(
            "✅ Found blog data array with",
            blogDataArray.length,
            "items"
          );
        }

        if (
          blogDataArray &&
          Array.isArray(blogDataArray) &&
          blogDataArray.length > 0
        ) {
          console.log("✅ Blog data array with length:", blogDataArray.length);
          const firstItem = blogDataArray[0];
          console.log("🔍 First blog item:", firstItem);

          if (firstItem.title && firstItem.paragraphs) {
            console.log(
              "🎉 Complete blog post found! Setting blog post state..."
            );
            setBlogPost(firstItem);
            setIsLoading(false);

            // Stop polling immediately - check if polling interval exists
            console.log(
              "🔍 Current polling interval (state):",
              pollingInterval
            );
            console.log(
              "🔍 Current polling interval (ref):",
              pollingIntervalRef.current
            );

            // Clear using both state and ref to be sure
            if (pollingInterval) {
              console.log("🛑 Stopping polling via state - content received");
              clearInterval(pollingInterval);
              setPollingInterval(null);
            }
            if (pollingIntervalRef.current) {
              console.log("🛑 Stopping polling via ref - content received");
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
            }

            if (!pollingInterval && !pollingIntervalRef.current) {
              console.log("⚠️ No polling interval found to stop");
            }

            // Immediately return to prevent any further polling logic
            console.log("🚪 Exiting fetchBlogResult - content found");
            return;
          } else {
            console.log("⚠️ First item missing title or paragraphs");
            console.log("- Has title:", !!firstItem.title);
            console.log("- Has paragraphs:", !!firstItem.paragraphs);
            console.log("- First item keys:", Object.keys(firstItem));
          }
        } else {
          console.log("⚠️ Blog data not found in expected format:");
          console.log("- result.success:", result?.success);
          console.log("- result.data exists:", !!result?.data);
          console.log("- result.data.data exists:", !!result?.data?.data);
          console.log(
            "- result.data.data is array:",
            Array.isArray(result?.data?.data)
          );
          console.log("- result.data.data length:", result?.data?.data?.length);
          console.log("- result is direct array:", Array.isArray(result));
        }

        // If we don't have complete content yet and this is not a polling request, start polling
        if (
          !isPolling &&
          !blogPost &&
          !pollingInterval &&
          !pollingIntervalRef.current
        ) {
          console.log(
            "⏳ Content not ready, starting polling every 5 seconds..."
          );
          const interval = setInterval(() => {
            console.log("🔁 Polling attempt...");
            fetchBlogResult(id, true);
          }, 5000); // Poll every 5 seconds
          setPollingInterval(interval);
          pollingIntervalRef.current = interval;
          console.log("✅ Polling started with interval ID:", interval);
        } else if (isPolling && !blogPost) {
          console.log("⏳ Polling check - content still not ready");
        } else if (blogPost) {
          console.log("✅ Content already loaded, skipping polling");
          // Make sure polling is stopped if content exists
          if (pollingInterval) {
            console.log("🛑 Stopping existing polling - content exists");
            clearInterval(pollingInterval);
            setPollingInterval(null);
          }
          if (pollingIntervalRef.current) {
            console.log(
              "🛑 Stopping existing polling via ref - content exists"
            );
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
        }
      } catch (err) {
        console.log("❌ ========== FETCH ERROR ==========");
        console.error("❌ Error details:", err);

        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";

        console.log("🔄 Setting error state:", errorMessage);
        setError(errorMessage);
        setIsLoading(false);

        // Stop polling on error
        if (pollingInterval) {
          console.log("🛑 Stopping polling due to error");
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }

        console.log("❌ ========== FETCH ERROR HANDLING COMPLETE ==========");
      }
    },
    [pollingInterval]
  );

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  useEffect(() => {
    // Method 1: Listen for postMessage from Anvil iframe
    function handleMessage(event: MessageEvent) {
      // Debug: Log ALL postMessage events
      console.log("📨 PostMessage received:", {
        origin: event.origin,
        data: event.data,
        source: event.source,
      });

      if (
        event.data &&
        typeof event.data === "object" &&
        "prompt_id" in event.data
      ) {
        const promptId = event.data.prompt_id;
        if (typeof promptId === "string" || typeof promptId === "number") {
          const idStr = promptId.toString();
          console.log(
            "🎯 Received prompt_id from Anvil iframe via postMessage:",
            idStr
          );
          setPromptId(idStr);
          localStorage.setItem("latest_prompt_id", idStr);
          fetchBlogResult(idStr);
        }
      }
    }

    // Method 2: Connect to SSE endpoint for server-side notifications
    const eventSource = new EventSource("/api/anvil-callback");

    eventSource.onmessage = function (event) {
      try {
        const data = JSON.parse(event.data);
        if (data.prompt_id) {
          const idStr = data.prompt_id.toString();
          console.log("🎯 Received prompt_id from SSE endpoint:", idStr);
          setPromptId(idStr);
          localStorage.setItem("latest_prompt_id", idStr);
          fetchBlogResult(idStr);
        } else if (data.type === "connected") {
          console.log("📡 Connected to SSE endpoint");
        }
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    eventSource.onerror = function (error) {
      console.error("SSE connection error:", error);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      eventSource.close();
    };
  }, [fetchBlogResult]);

  // Helper function to get base64 image data
  const getImageData = (itemId: number, isTitle = false): string | null => {
    if (
      !blogResult ||
      typeof blogResult !== "object" ||
      !("data" in blogResult)
    )
      return null;

    const data = (blogResult as { data?: unknown }).data;
    if (!data || typeof data !== "object") return null;

    const dataObj = data as { data?: unknown[] };
    if (!Array.isArray(dataObj.data)) return null;

    if (isTitle) {
      // Title/hero image is at index 1 with title_image key
      if (dataObj.data.length > 1) {
        const titleImageItem = dataObj.data[1] as {
          data?: string;
          title_image?: boolean;
        };
        if (
          typeof titleImageItem.data === "string" &&
          titleImageItem.data.startsWith("UklGR")
        ) {
          return titleImageItem.data;
        }
      }
    } else {
      // Paragraph images are at indices 2-4, find by matching ID
      for (let i = 2; i < dataObj.data.length; i++) {
        const imageItem = dataObj.data[i] as { data?: string; id?: number };
        if (
          imageItem.id === itemId &&
          typeof imageItem.data === "string" &&
          imageItem.data.startsWith("UklGR")
        ) {
          return imageItem.data;
        }
      }
    }

    return null; // No matching image found
  };

  return (
    <main className="min-h-screen bg-[#2A2A2A] text-[#EAEAEA] overflow-x-hidden">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-[#9A4453]/20 text-[#C5768A] border border-[#9A4453]/30">
              🎭 Live Demo
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
              Ventriloquist
            </span>
            <br />
            <span className="text-[#805C6F]">Live Demo</span>
          </h1>
          <p className="text-xl text-[#805C6F] max-w-3xl mx-auto leading-relaxed mb-8">
            Submit your idea through the AI assistant below and watch as your
            blog post is generated in real-time.
          </p>
        </div>
      </section>

      {/* Border Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/50 to-transparent"></div>

      {/* Main Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Recent Posts Section */}
          <div className="mb-16">
            <RecentPostsSelector
              onPostSelect={handleRecentPostSelect}
              selectedPostId={promptId}
            />
          </div>
          {/* Interest to Blog Transformation */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Input Side */}
            <div className="space-y-6">
              <div className="bg-[#5A3D48]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#805C6F]/30 hover:border-[#C5768A]/50 transition-all duration-500">
                <h3 className="text-2xl font-bold text-[#EAEAEA] mb-6 flex items-center">
                  <span className="w-10 h-10 bg-gradient-to-r from-[#9A4453] to-[#C5768A] rounded-full flex items-center justify-center text-sm font-bold mr-4 text-[#EAEAEA]">
                    1
                  </span>
                  Your Interests
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {randomInterests.map((interest, index) => (
                      <div
                        key={`${interest}-${index}`}
                        className="relative group"
                      >
                        <span className="px-4 py-2 bg-gradient-to-r from-[#9A4453]/20 to-[#C5768A]/20 border border-[#C5768A]/40 rounded-full text-[#EAEAEA] text-sm font-medium flex items-center gap-2">
                          {interest}
                          <button
                            onClick={() => copyToClipboard(interest)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#C5768A] hover:text-[#D4B5C8] text-xs"
                            title="Copy to clipboard"
                          >
                            📋
                          </button>
                        </span>
                      </div>
                    ))}
                    <button
                      onClick={refreshInterests}
                      className="px-3 py-2 bg-[#805C6F]/20 border border-[#805C6F]/40 rounded-full text-[#D4B5C8] text-sm font-medium hover:bg-[#805C6F]/30 transition-colors duration-200 flex items-center gap-1"
                      title="Get new interests"
                    >
                      🎲 Refresh
                    </button>
                  </div>

                  {/* Anvil Iframe */}
                  <div className="relative">
                    <div className="bg-[#2A2A2A]/80 border border-[#805C6F]/40 rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-[#9A4453]/20 to-[#805C6F]/20 p-3 border-b border-[#805C6F]/30">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#C5768A] rounded-full"></div>
                          <div className="w-2 h-2 bg-[#D4B5C8] rounded-full"></div>
                          <div className="w-2 h-2 bg-[#EAEAEA] rounded-full"></div>
                          <span className="ml-3 text-xs font-bold text-[#EAEAEA]">
                            🎭 AI Assistant
                          </span>
                        </div>
                      </div>
                      <div className="h-32">
                        <iframe
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                          }}
                          data-anvil-embed="true"
                          src="https://korbosbintemplate.anvil.app"
                          title="Ventriloquist AI Assistant"
                          allow="clipboard-write; microphone; camera"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Display */}
                  {/* Status Display - Clean Version */}
                  {promptId && (
                    <div className="bg-[#2A2A2A]/60 rounded-lg p-3 border border-[#805C6F]/30 mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#805C6F]">Processing:</span>
                        <span className="text-[#C5768A] font-mono">
                          ID: {promptId}
                        </span>
                      </div>
                      {isLoading && (
                        <div className="mt-2 text-xs text-[#D4B5C8]">
                          {pollingInterval
                            ? "⏳ AI is generating your blog post..."
                            : "🔄 Processing your idea..."}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Processing Animation */}
              {isLoading && (
                <div className="flex items-center justify-center mt-4">
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
                      {pollingInterval
                        ? "Waiting for AI to finish..."
                        : "AI Processing..."}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Output Side */}
            <div className="space-y-8">
              {/* Generated Blog Summary */}
              {blogPost && (
                <div className="bg-gradient-to-br from-[#5A3D48]/30 to-[#9A4453]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#C5768A]/30 hover:border-[#D4B5C8]/50 transition-all duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-[#EAEAEA] flex items-center">
                      <span className="w-10 h-10 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-full flex items-center justify-center text-sm font-bold mr-4 text-[#2A2A2A]">
                        2
                      </span>
                      Generated Blog Summary
                    </h3>

                    {/* Load Last Successful Button - Integrated */}
                    <button
                      onClick={() => {
                        const lastSuccessfulId =
                          localStorage.getItem("latest_prompt_id");
                        if (lastSuccessfulId) {
                          console.log(
                            "🔄 Loading last successful blog:",
                            lastSuccessfulId
                          );
                          setPromptId(lastSuccessfulId);
                          fetchBlogResult(lastSuccessfulId);
                        } else {
                          alert(
                            "No previous successful blog found. Try generating a new one!"
                          );
                        }
                      }}
                      className="bg-gradient-to-r from-[#805C6F] to-[#9A4453] hover:from-[#9A4453] to-[#C5768A] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2 text-sm"
                    >
                      <span>📚</span>
                      <span>Load Last</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    {/* Hero Image Preview */}
                    {blogPost.title_image_prompt && (
                      <div className="relative h-32 w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#9A4453]/20 to-[#C5768A]/20 border border-[#805C6F]/30">
                        {getImageData(0, true) ? (
                          <Image
                            src={`data:image/webp;base64,${getImageData(
                              0,
                              true
                            )}`}
                            alt={blogPost.title_image_prompt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `data:image/svg+xml,${encodeURIComponent(
                                '<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#9A4453"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="20">Hero Image</text></svg>'
                              )}`;
                            }}
                          />
                        ) : (
                          <Image
                            src={`data:image/svg+xml,${encodeURIComponent(
                              '<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#9A4453"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="20">Hero Image</text></svg>'
                            )}`}
                            alt={blogPost.title_image_prompt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 to-transparent flex items-end p-4">
                          <div className="text-white text-sm font-medium">
                            Blog Preview
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Blog Title & Subtitle */}
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-[#EAEAEA] leading-tight line-clamp-2">
                        {blogPost.title}
                      </h4>
                      <p className="text-[#C5768A] leading-relaxed line-clamp-2">
                        {blogPost.subtitle}
                      </p>
                    </div>

                    {/* Blog Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-[#2A2A2A]/60 rounded-lg p-3 text-center border border-[#805C6F]/20">
                        <div className="text-2xl font-bold text-[#C5768A]">
                          {blogPost.paragraphs?.length || 0}
                        </div>
                        <div className="text-xs text-[#805C6F] font-medium">
                          Sections
                        </div>
                      </div>
                      <div className="bg-[#2A2A2A]/60 rounded-lg p-3 text-center border border-[#805C6F]/20">
                        <div className="text-2xl font-bold text-[#D4B5C8]">
                          {Math.round(
                            (blogPost.paragraphs?.reduce(
                              (acc, p) => acc + p.content.split(" ").length,
                              0
                            ) || 0) / 200
                          ) || 1}
                        </div>
                        <div className="text-xs text-[#805C6F] font-medium">
                          Min Read
                        </div>
                      </div>
                      <div className="bg-[#2A2A2A]/60 rounded-lg p-3 text-center border border-[#805C6F]/20">
                        <div className="text-2xl font-bold text-[#9A4453]">
                          {blogPost.paragraphs?.reduce(
                            (acc, p) => acc + p.content.split(" ").length,
                            0
                          ) || 0}
                        </div>
                        <div className="text-xs text-[#805C6F] font-medium">
                          Words
                        </div>
                      </div>
                      <div className="bg-[#2A2A2A]/60 rounded-lg p-3 text-center border border-[#805C6F]/20">
                        <div className="text-2xl font-bold text-[#805C6F]">
                          {(blogPost.paragraphs?.filter((p) =>
                            getImageData(p.id)
                          ).length || 0) + (getImageData(0, true) ? 1 : 0)}
                        </div>
                        <div className="text-xs text-[#805C6F] font-medium">
                          Images
                        </div>
                      </div>
                    </div>

                    {/* Quick Preview of First Paragraph */}
                    <div className="bg-[#2A2A2A]/40 rounded-lg p-4 border border-[#805C6F]/20">
                      <div className="text-sm text-[#805C6F] font-medium mb-2">
                        Preview:
                      </div>
                      <p className="text-[#EAEAEA] text-sm leading-relaxed line-clamp-3">
                        {blogPost.paragraphs?.[0]?.content ||
                          "No content available"}
                      </p>
                      <div className="text-xs text-[#C5768A] mt-2">
                        Scroll down to read the complete blog post...
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder when no blog */}
              {!blogPost && !isLoading && (
                <div className="bg-gradient-to-br from-[#5A3D48]/30 to-[#9A4453]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#C5768A]/30 opacity-50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-[#EAEAEA] flex items-center">
                      <span className="w-10 h-10 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-full flex items-center justify-center text-sm font-bold mr-4 text-[#2A2A2A]">
                        2
                      </span>
                      Generated Blog
                    </h3>

                    {/* Load Last Successful Button - Placeholder */}
                    <button
                      onClick={() => {
                        const lastSuccessfulId =
                          localStorage.getItem("latest_prompt_id");
                        if (lastSuccessfulId) {
                          console.log(
                            "🔄 Loading last successful blog:",
                            lastSuccessfulId
                          );
                          setPromptId(lastSuccessfulId);
                          fetchBlogResult(lastSuccessfulId);
                        } else {
                          alert(
                            "No previous successful blog found. Try generating a new one!"
                          );
                        }
                      }}
                      className="bg-gradient-to-r from-[#805C6F] to-[#9A4453] hover:from-[#9A4453] to-[#C5768A] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2 text-sm"
                    >
                      <span>📚</span>
                      <span>Load Last</span>
                    </button>
                  </div>
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🎭</div>
                    <p className="text-[#805C6F] mb-4">
                      Submit your idea through the AI assistant above to see
                      live blog generation
                    </p>
                    <p className="text-[#C5768A] text-sm">
                      Or click &ldquo;Load Last&rdquo; above to view your
                      previous blog
                    </p>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400 text-sm">Error: {error}</p>
                  {promptId && (
                    <button
                      onClick={() => fetchBlogResult(promptId)}
                      className="mt-3 px-4 py-2 bg-[#805C6F] hover:bg-[#C5768A] rounded-lg text-sm font-medium text-[#EAEAEA] transition-colors"
                    >
                      Retry
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Full Blog Post Display - Responsive to content */}
          {blogPost && (
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#EAEAEA] mb-4">
                  <span className="bg-gradient-to-r from-[#D4B5C8] to-[#C5768A] bg-clip-text text-transparent">
                    Complete Blog Post
                  </span>
                </h2>
                <p className="text-[#805C6F]">
                  Your AI-generated content, ready for publication
                </p>
              </div>

              <div className="bg-[#5A3D48]/20 backdrop-blur-lg rounded-3xl overflow-hidden border border-[#805C6F]/30">
                <div className="bg-gradient-to-r from-[#9A4453] to-[#805C6F] p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#C5768A] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#D4B5C8] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#EAEAEA] rounded-full"></div>
                    <span className="ml-4 text-sm font-bold text-[#EAEAEA]">
                      Generated Blog Post • ID: {promptId}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <article className="max-w-4xl mx-auto">
                    {/* Hero Section with Base64 Image Support */}
                    {blogPost.title_image_prompt && (
                      <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-[#9A4453]/20 to-[#C5768A]/20">
                        {getImageData(0, true) ? (
                          <Image
                            src={`data:image/webp;base64,${getImageData(
                              0,
                              true
                            )}`}
                            alt={blogPost.title_image_prompt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `data:image/svg+xml,${encodeURIComponent(
                                '<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#9A4453"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="20">Hero Image</text></svg>'
                              )}`;
                            }}
                          />
                        ) : (
                          <Image
                            src={`data:image/svg+xml,${encodeURIComponent(
                              '<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#9A4453"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="20">Hero Image</text></svg>'
                            )}`}
                            alt={blogPost.title_image_prompt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <span className="inline-block px-4 py-2 bg-[#9A4453]/80 border border-[#C5768A]/60 rounded-full text-sm text-[#EAEAEA] font-bold backdrop-blur-sm">
                            🎭 AI Generated Content
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Title */}
                    <header className="text-center mb-12">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
                          {blogPost.title}
                        </span>
                      </h1>
                      <p className="text-xl text-[#805C6F] mb-8 max-w-3xl mx-auto leading-relaxed">
                        {blogPost.subtitle}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#805C6F]">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-full"></div>
                          <span className="font-medium">AI Generated</span>
                        </div>
                        <span>•</span>
                        <span>{new Date().toLocaleDateString()}</span>
                        <span>•</span>
                        <span>
                          {Math.ceil((blogPost.paragraphs?.length || 0) * 2)}{" "}
                          min read
                        </span>
                      </div>
                    </header>

                    {/* Blog Article Content */}
                    <article className="max-w-4xl mx-auto">
                      {blogPost.paragraphs?.map((paragraph, index) => {
                        const sectionImageData = getImageData(paragraph.id);
                        const isEven = index % 2 === 0;

                        return (
                          <section key={paragraph.id} className="mb-20">
                            {/* Alternating Layout: Text-Image or Image-Text */}
                            <div
                              className={`grid lg:grid-cols-5 gap-12 items-center ${
                                !isEven ? "lg:grid-flow-col-dense" : ""
                              }`}
                            >
                              {/* Content Column */}
                              <div
                                className={`lg:col-span-3 ${
                                  !isEven ? "lg:col-start-3" : ""
                                }`}
                              >
                                <div className="prose prose-lg prose-invert max-w-none">
                                  {/* Optional section number */}
                                  <div className="flex items-center mb-6">
                                    <div className="w-8 h-8 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-full flex items-center justify-center text-sm font-bold text-[#2A2A2A] mr-4">
                                      {index + 1}
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-[#C5768A] to-transparent flex-1"></div>
                                  </div>

                                  {/* Enhanced paragraph text */}
                                  <div className="text-[#EAEAEA] text-lg leading-relaxed font-light">
                                    {/* First letter styling for first paragraph */}
                                    {index === 0 ? (
                                      <p className="mb-8">
                                        <span className="float-left text-6xl font-bold bg-gradient-to-br from-[#D4B5C8] to-[#C5768A] bg-clip-text text-transparent mr-2 mt-2 leading-none">
                                          {paragraph.content.charAt(0)}
                                        </span>
                                        <span className="text-xl">
                                          {paragraph.content.slice(1)}
                                        </span>
                                      </p>
                                    ) : (
                                      <p className="mb-8 text-xl leading-relaxed">
                                        {paragraph.content}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Image Column */}
                              <div
                                className={`lg:col-span-2 ${
                                  !isEven ? "lg:col-start-1" : ""
                                }`}
                              >
                                <div className="relative group">
                                  <div className="relative h-80 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#805C6F]/20 to-[#D4B5C8]/20 border border-[#805C6F]/30 shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                                    {sectionImageData ? (
                                      <Image
                                        src={`data:image/webp;base64,${sectionImageData}`}
                                        alt={
                                          paragraph.image_prompt ||
                                          `Section ${index + 1} image`
                                        }
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                        onError={(e) => {
                                          const target =
                                            e.target as HTMLImageElement;
                                          target.src = `data:image/svg+xml,${encodeURIComponent(
                                            '<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#C5768A"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18">Section Image</text></svg>'
                                          )}`;
                                        }}
                                      />
                                    ) : (
                                      <Image
                                        src={`data:image/svg+xml,${encodeURIComponent(
                                          '<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#C5768A"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="18">Section Image</text></svg>'
                                        )}`}
                                        alt={
                                          paragraph.image_prompt ||
                                          `Section ${index + 1} image`
                                        }
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                      />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/40 to-transparent opacity-60"></div>
                                  </div>

                                  {/* Image Caption */}
                                  {paragraph.image_prompt && (
                                    <div className="mt-4 p-3 bg-[#2A2A2A]/60 rounded-lg border border-[#805C6F]/20 backdrop-blur-sm">
                                      <p className="text-sm text-[#C5768A] italic text-center leading-relaxed">
                                        {paragraph.image_prompt}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Section Divider */}
                            {index < (blogPost.paragraphs?.length || 0) - 1 && (
                              <div className="h-px bg-gradient-to-r from-transparent via-[#805C6F]/30 to-transparent my-12"></div>
                            )}
                          </section>
                        );
                      })}
                    </article>

                    {/* Blog Footer */}
                    <footer className="mt-16 pt-8 border-t border-[#805C6F]/30">
                      <div className="bg-gradient-to-r from-[#5A3D48]/30 to-[#9A4453]/20 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-[#EAEAEA] mb-4">
                          🎭 Generated by Ventriloquist AI
                        </h3>
                        <p className="text-[#805C6F] mb-6 max-w-2xl mx-auto">
                          This content was automatically generated using
                          advanced AI technology. From idea to publication in
                          under 60 seconds.
                        </p>
                        <div className="flex justify-center space-x-4">
                          <div className="bg-[#9A4453]/30 rounded-lg p-3 border border-[#9A4453]/40">
                            <div className="text-lg font-bold text-[#C5768A]">
                              ID: {promptId}
                            </div>
                            <div className="text-xs text-[#805C6F]">
                              Prompt ID
                            </div>
                          </div>
                          <div className="bg-[#805C6F]/30 rounded-lg p-3 border border-[#805C6F]/40">
                            <div className="text-lg font-bold text-[#D4B5C8]">
                              {blogPost.paragraphs?.length || 0}
                            </div>
                            <div className="text-xs text-[#805C6F]">
                              Sections
                            </div>
                          </div>
                          <div className="bg-[#C5768A]/30 rounded-lg p-3 border border-[#C5768A]/40">
                            <div className="text-lg font-bold text-[#EAEAEA]">
                              AI
                            </div>
                            <div className="text-xs text-[#805C6F]">
                              Generated
                            </div>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </article>
                </div>
              </div>
            </div>
          )}

          {/* Recent Posts Section - Moved Below Demo */}
          <div className="mt-16">
            <RecentPostsSelector
              onPostSelect={handleRecentPostSelect}
              selectedPostId={promptId}
            />
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-[#5A3D48]/20 to-[#9A4453]/10 backdrop-blur-lg rounded-2xl p-8 border border-[#805C6F]/30 mt-16">
            <h3 className="text-2xl font-bold text-[#EAEAEA] mb-6 text-center">
              🔄 How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#9A4453] to-[#C5768A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#EAEAEA] font-bold">1</span>
                </div>
                <h4 className="font-bold text-[#EAEAEA] mb-2">
                  Submit Your Idea
                </h4>
                <p className="text-[#805C6F] text-sm">
                  Use the AI assistant above to describe your blog topic or
                  interest
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#805C6F] to-[#D4B5C8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#EAEAEA] font-bold">2</span>
                </div>
                <h4 className="font-bold text-[#EAEAEA] mb-2">AI Processing</h4>
                <p className="text-[#805C6F] text-sm">
                  Our AI generates professional content with images
                  automatically
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#C5768A] to-[#9A4453] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#EAEAEA] font-bold">3</span>
                </div>
                <h4 className="font-bold text-[#EAEAEA] mb-2">
                  Beautiful Blog
                </h4>
                <p className="text-[#805C6F] text-sm">
                  Your finished blog post appears below, ready to publish
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
