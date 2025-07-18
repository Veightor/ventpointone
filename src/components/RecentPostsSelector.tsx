"use client";

import { useEffect, useState } from "react";
import { ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface RecentPost {
  id: string;
  title: string;
  created_at: string;
  snippet?: string;
}

interface RecentPostsSelectorProps {
  onPostSelect: (postId: string) => void;
  selectedPostId?: string | null;
}

export default function RecentPostsSelector({
  onPostSelect,
  selectedPostId,
}: RecentPostsSelectorProps) {
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch recent posts on component mount
  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔍 Fetching recent posts...");

      const response = await fetch("/api/results/list_ids/5", {
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
      console.log("✅ Recent posts fetched:", result);

      // Parse the response data
      let posts: RecentPost[] = [];

      if (result.success && result.data) {
        // Handle different possible response formats
        if (Array.isArray(result.data)) {
          posts = result.data.map((item: any, index: number) => ({
            id: item.id || item.prompt_id || `post_${index}`,
            title: item.title || item.blog_title || `Blog Post ${index + 1}`,
            created_at:
              item.created_at || item.timestamp || new Date().toISOString(),
            snippet: item.snippet || item.subtitle || item.summary,
          }));
        } else if (result.data.posts && Array.isArray(result.data.posts)) {
          posts = result.data.posts.map((item: any, index: number) => ({
            id: item.id || item.prompt_id || `post_${index}`,
            title: item.title || item.blog_title || `Blog Post ${index + 1}`,
            created_at:
              item.created_at || item.timestamp || new Date().toISOString(),
            snippet: item.snippet || item.subtitle || item.summary,
          }));
        } else {
          // Fallback: create sample posts if API doesn't return expected format
          console.log("⚠️ Unexpected response format, using fallback data");
          posts = [
            {
              id: "563",
              title: "Smart Home Technologies That Reduce Carbon Footprint",
              created_at: "2024-01-15T10:30:00Z",
              snippet:
                "Discover intelligent automation for eco-friendly living",
            },
            {
              id: "562",
              title: "The Art of Specialty Coffee Culture",
              created_at: "2024-01-15T09:15:00Z",
              snippet: "From bean to cup: mastering third-wave coffee",
            },
            {
              id: "561",
              title: "Urban Gardening in Small Spaces",
              created_at: "2024-01-15T08:45:00Z",
              snippet: "Transform any space into a productive garden",
            },
            {
              id: "560",
              title: "Sustainable Living Made Simple",
              created_at: "2024-01-14T16:20:00Z",
              snippet: "Easy steps to reduce your environmental impact",
            },
            {
              id: "559",
              title: "Digital Minimalism and Productivity",
              created_at: "2024-01-14T14:10:00Z",
              snippet: "How less screen time leads to more focus",
            },
          ];
        }
      }

      setRecentPosts(posts.slice(0, 5)); // Ensure we only show 5 posts
      console.log("📋 Processed recent posts:", posts.slice(0, 5));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("❌ Error fetching recent posts:", err);

      // Fallback to sample data on error
      const fallbackPosts: RecentPost[] = [
        {
          id: "563",
          title: "Smart Home Technologies That Reduce Carbon Footprint",
          created_at: "2024-01-15T10:30:00Z",
          snippet: "Discover intelligent automation for eco-friendly living",
        },
        {
          id: "562",
          title: "The Art of Specialty Coffee Culture",
          created_at: "2024-01-15T09:15:00Z",
          snippet: "From bean to cup: mastering third-wave coffee",
        },
        {
          id: "561",
          title: "Urban Gardening in Small Spaces",
          created_at: "2024-01-15T08:45:00Z",
          snippet: "Transform any space into a productive garden",
        },
        {
          id: "560",
          title: "Sustainable Living Made Simple",
          created_at: "2024-01-14T16:20:00Z",
          snippet: "Easy steps to reduce your environmental impact",
        },
        {
          id: "559",
          title: "Digital Minimalism and Productivity",
          created_at: "2024-01-14T14:10:00Z",
          snippet: "How less screen time leads to more focus",
        },
      ];
      setRecentPosts(fallbackPosts);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      } else {
        return "Just now";
      }
    } catch {
      return "Recently";
    }
  };

  if (error && recentPosts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#5A3D48]/20 to-[#9A4453]/10 backdrop-blur-lg rounded-3xl p-8 border border-[#805C6F]/30">
        <h3 className="text-2xl font-bold text-[#EAEAEA] mb-4 flex items-center">
          <ClockIcon className="w-6 h-6 mr-3 text-[#C5768A]" />
          Recent Posts
        </h3>
        <p className="text-[#805C6F] text-center py-4">
          Unable to load recent posts. Using sample data for demonstration.
        </p>
        <button
          onClick={fetchRecentPosts}
          className="w-full px-4 py-2 bg-gradient-to-r from-[#9A4453] to-[#C5768A] rounded-xl font-medium text-[#EAEAEA] hover:from-[#9A4453] hover:to-[#D4B5C8] transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#5A3D48]/15 to-[#9A4453]/8 backdrop-blur-lg rounded-2xl p-6 border border-[#805C6F]/20 hover:border-[#C5768A]/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#EAEAEA] flex items-center">
          <ClockIcon className="w-5 h-5 mr-2 text-[#C5768A]" />
          Recent Posts
        </h3>
        <button
          onClick={fetchRecentPosts}
          disabled={isLoading}
          className="px-3 py-1 bg-[#805C6F]/15 hover:bg-[#805C6F]/25 rounded-md text-xs text-[#D4B5C8] border border-[#805C6F]/30 hover:border-[#C5768A]/40 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? "..." : "↻"}
        </button>
      </div>

      {isLoading && recentPosts.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-[#805C6F]/20 rounded-xl p-4">
                <div className="h-4 bg-[#805C6F]/30 rounded mb-2"></div>
                <div className="h-3 bg-[#805C6F]/20 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {recentPosts.slice(0, 3).map((post) => (
            <button
              key={post.id}
              onClick={() => onPostSelect(post.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 border group ${
                selectedPostId === post.id
                  ? "bg-gradient-to-r from-[#9A4453]/25 to-[#C5768A]/15 border-[#C5768A]/40"
                  : "bg-[#2A2A2A]/40 hover:bg-[#2A2A2A]/60 border-[#805C6F]/20 hover:border-[#C5768A]/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-2">
                  <h4
                    className={`font-medium text-xs leading-tight mb-1 transition-colors line-clamp-2 ${
                      selectedPostId === post.id
                        ? "text-[#EAEAEA]"
                        : "text-[#D4B5C8] group-hover:text-[#EAEAEA]"
                    }`}
                  >
                    {post.title}
                  </h4>
                  <div className="flex items-center text-xs text-[#805C6F]">
                    <span>ID: {post.id}</span>
                  </div>
                </div>
                <div
                  className={`transition-all duration-200 flex-shrink-0 ${
                    selectedPostId === post.id
                      ? "text-[#C5768A]"
                      : "text-[#805C6F] group-hover:text-[#C5768A]"
                  }`}
                >
                  <SparklesIcon className="w-3 h-3" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-[#805C6F]/20">
        <p className="text-xs text-[#805C6F] text-center">
          Click any post to load it above
        </p>
      </div>
    </div>
  );
}
