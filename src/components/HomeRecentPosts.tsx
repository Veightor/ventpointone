"use client";

import RecentPostsSelector from "./RecentPostsSelector";

export default function HomeRecentPosts() {
  const handlePostSelect = (postId: string) => {
    // Redirect to demo page with the selected post
    window.location.href = `/demo?loadPost=${postId}`;
  };

  return (
    <div className="max-w-7xl mx-auto mt-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">
          <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
            Browse Recent Creations
          </span>
        </h3>
        <p className="text-[#805C6F] text-sm max-w-2xl mx-auto">
          Explore recently generated blog posts and click any title to view the
          full content
        </p>
      </div>
      <RecentPostsSelector
        onPostSelect={handlePostSelect}
        selectedPostId={null}
      />
    </div>
  );
}
