"use client";

import { useEffect, useState } from "react";
import BlogPostRenderer from "./BlogPostRenderer";

interface BlogPromptResponse {
  prompt_id: string;
  [key: string]: unknown;
}

interface BlogResultResponse {
  content?: unknown;
  status?: string;
  [key: string]: unknown;
}

export default function AnvilBlogGenerator() {
  const [promptId, setPromptId] = useState<string | null>(null);
  const [blogResult, setBlogResult] = useState<BlogResultResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch blog results using the prompt_id via our API route
  const fetchBlogResult = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(`🚀 Fetching blog results for ID: ${id} via API route`);

      // Use our Next.js API route to avoid CORS issues
      const response = await fetch(`/api/blog-results?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      setBlogResult(result);
      console.log("✅ Blog result fetched successfully:", result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("❌ Error fetching blog result:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Function to handle postMessage events from the Anvil iframe
    const handleMessage = (event: MessageEvent) => {
      // Verify the origin for security (adjust as needed)
      const allowedOrigins = [
        "https://korbosbintemplate.anvil.app",
        "http://localhost:3001",
        "http://192.168.1.244:3001",
        window.location.origin, // Allow current domain for testing
      ];

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("Received message from untrusted origin:", event.origin);
        return;
      }

      // Enhanced logging to capture full message content
      console.log("🔔 Received message from Anvil iframe:");
      console.log("Event origin:", event.origin);
      console.log("Event data type:", typeof event.data);
      console.log("Event data:", event.data);

      // Try to stringify for better visibility
      try {
        console.log("Event data JSON:", JSON.stringify(event.data, null, 2));
      } catch (e) {
        console.log("Could not stringify event data:", e);
      }

      try {
        // Handle different types of messages
        if (event.data && typeof event.data === "object") {
          // If the message contains a prompt_id
          if (event.data.prompt_id) {
            const id = event.data.prompt_id;
            setPromptId(id);

            // Store in localStorage for persistence
            localStorage.setItem("latest_prompt_id", id);

            console.log("🎉 Prompt ID received:", id);

            // Automatically fetch the blog result
            fetchBlogResult(id);
          }

          // Check for prompt_id in nested properties
          if (event.data.data && event.data.data.prompt_id) {
            const id = event.data.data.prompt_id;
            setPromptId(id);
            localStorage.setItem("latest_prompt_id", id);
            console.log("🎉 Prompt ID found in nested data:", id);
            fetchBlogResult(id);
          }

          // Check for Anvil form submission response patterns
          if (event.data.responses && event.data.responses.prompt_id) {
            const id = event.data.responses.prompt_id.toString();
            setPromptId(id);
            localStorage.setItem("latest_prompt_id", id);
            console.log("🎉 Prompt ID from Anvil submission:", id);
            fetchBlogResult(id);
          }

          // Handle other types of messages as needed
          if (event.data.type) {
            console.log("Message type:", event.data.type);
          }
        } else if (typeof event.data === "string") {
          console.log("Processing string message:", event.data);
          // Handle string messages (might be JSON)
          try {
            const parsedData = JSON.parse(event.data);
            console.log("Parsed JSON data:", parsedData);
            if (parsedData.prompt_id) {
              const id = parsedData.prompt_id;
              setPromptId(id);
              localStorage.setItem("latest_prompt_id", id);
              console.log("🎉 Prompt ID from JSON string:", id);
              fetchBlogResult(id);
            }
          } catch (parseError) {
            console.log("Received non-JSON string message:", event.data);
          }
        }
      } catch (err) {
        console.error("Error processing message from iframe:", err);
      }
    };

    // Add the event listener
    window.addEventListener("message", handleMessage);

    // Load any previously stored prompt_id
    const storedPromptId = localStorage.getItem("latest_prompt_id");
    if (storedPromptId) {
      setPromptId(storedPromptId);
    }

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-[#9A4453]/20 text-[#C5768A] border border-[#9A4453]/30">
            🎭 Full End-to-End Demo
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
            AI Blog Generation
          </span>
          <br />
          <span className="text-[#805C6F]">Complete Workflow</span>
        </h2>
        <p className="text-xl text-[#805C6F] max-w-3xl mx-auto leading-relaxed">
          Submit your idea → AI generates content → Beautiful blog post appears
          instantly. Watch the entire process from concept to publication.
        </p>
      </div>

      {/* Iframe Container */}
      <div className="bg-[#5A3D48]/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-[#805C6F]/30 mb-8">
        <div className="bg-gradient-to-r from-[#9A4453] to-[#805C6F] p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-[#C5768A] rounded-full"></div>
            <div className="w-3 h-3 bg-[#D4B5C8] rounded-full"></div>
            <div className="w-3 h-3 bg-[#EAEAEA] rounded-full"></div>
            <span className="ml-4 text-sm font-bold text-[#EAEAEA]">
              Ventriloquist AI Assistant
            </span>
          </div>
        </div>
        <div className="h-[600px]">
          <iframe
            style={{ width: "100%", height: "100%", border: "none" }}
            data-anvil-embed="true"
            src="https://korbosbintemplate.anvil.app"
            className="rounded-b-3xl"
            title="Ventriloquist AI Assistant"
          />
        </div>
      </div>

      {/* Status Display */}
      {promptId && (
        <div className="bg-[#5A3D48]/20 backdrop-blur-lg rounded-2xl p-6 border border-[#805C6F]/30 mb-6">
          <h3 className="text-xl font-bold text-[#EAEAEA] mb-3">
            Blog Generation Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#805C6F]">Prompt ID:</span>
              <span className="text-[#C5768A] font-mono text-sm">
                {promptId}
              </span>
            </div>
            {isLoading && (
              <div className="flex items-center space-x-3">
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
                <span className="text-[#805C6F] text-sm">
                  Fetching blog content...
                </span>
              </div>
            )}
            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                Error: {error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rendered Blog Post */}
      {blogResult && promptId && (
        <BlogPostRenderer blogData={blogResult} promptId={promptId} />
      )}

      {/* Raw JSON Display (Collapsible) */}
      {blogResult && (
        <div className="bg-[#5A3D48]/20 backdrop-blur-lg rounded-2xl p-6 border border-[#805C6F]/30 mt-6">
          <details className="group">
            <summary className="cursor-pointer text-xl font-bold text-[#EAEAEA] mb-3 hover:text-[#C5768A] transition-colors">
              📄 Raw JSON Data (Click to expand)
            </summary>
            <div className="bg-[#2A2A2A]/80 rounded-lg p-4 border border-[#805C6F]/30 mt-3">
              <pre className="text-[#D4B5C8] text-sm whitespace-pre-wrap overflow-auto max-h-96">
                {JSON.stringify(blogResult, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      )}

      {/* Manual Fetch Button */}
      {promptId && !isLoading && (
        <div className="text-center mt-6">
          <button
            onClick={() => fetchBlogResult(promptId)}
            className="px-6 py-3 bg-gradient-to-r from-[#9A4453] to-[#C5768A] hover:from-[#9A4453] hover:to-[#D4B5C8] rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 text-[#EAEAEA]"
          >
            Refresh Blog Content
          </button>
        </div>
      )}

      {/* How It Works */}
      <div className="bg-gradient-to-r from-[#5A3D48]/20 to-[#9A4453]/10 backdrop-blur-lg rounded-2xl p-8 border border-[#805C6F]/30 mt-8">
        <h3 className="text-2xl font-bold text-[#EAEAEA] mb-6 text-center">
          🔄 How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#9A4453] to-[#C5768A] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#EAEAEA] font-bold">1</span>
            </div>
            <h4 className="font-bold text-[#EAEAEA] mb-2">Submit Your Idea</h4>
            <p className="text-[#805C6F] text-sm">
              Type your blog topic in the input field above
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#805C6F] to-[#D4B5C8] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#EAEAEA] font-bold">2</span>
            </div>
            <h4 className="font-bold text-[#EAEAEA] mb-2">AI Processing</h4>
            <p className="text-[#805C6F] text-sm">
              Our AI generates professional content automatically
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#C5768A] to-[#9A4453] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#EAEAEA] font-bold">3</span>
            </div>
            <h4 className="font-bold text-[#EAEAEA] mb-2">Beautiful Blog</h4>
            <p className="text-[#805C6F] text-sm">
              Your finished blog post appears below instantly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
