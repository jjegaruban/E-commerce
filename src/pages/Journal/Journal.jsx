import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Journal = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  
  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  const posts = [
    {
      id: 1,
      title: "Five minutes with Jegaruban",
      date: "March 15, 2025",
      excerpt: "We sit down with the founder to discuss the journey, inspiration, and what's next for the brand.",
      author: "Sarah Chen",
      readTime: "4 min read",
      category: "Interview"
    },
    {
      id: 2,
      title: "The stories behind our bestsellers",
      date: "March 12, 2025",
      excerpt: "Every product has a story. Here's how our most popular items came to be.",
      author: "Marcus Wright",
      readTime: "6 min read",
      category: "Products"
    },
    {
      id: 3,
      title: "A guide to thoughtful gifting",
      date: "March 10, 2025",
      excerpt: "Simple ideas for choosing presents that feel personal and meaningful.",
      author: "Elena Rodriguez",
      readTime: "5 min read",
      category: "Lifestyle"
    },
    {
      id: 4,
      title: "Craftsmanship in focus",
      date: "March 8, 2025",
      excerpt: "A closer look at the materials and techniques that go into making our products.",
      author: "David Kim",
      readTime: "7 min read",
      category: "Behind the scenes"
    },
    {
      id: 5,
      title: "What we're reading this month",
      date: "March 5, 2025",
      excerpt: "Books, articles, and newsletters that have inspired the team recently.",
      author: "The Team",
      readTime: "3 min read",
      category: "Culture"
    },
    {
      id: 6,
      title: "Caring for your purchases",
      date: "March 3, 2025",
      excerpt: "Simple maintenance tips to help your items last longer and look better.",
      author: "James Park",
      readTime: "4 min read",
      category: "Care guide"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs title="Journal" prevLocation={prevLocation} />
      
      {/* Header */}
      <div className="mb-12">
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Thoughts, stories, and ideas from the team.
        </p>
      </div>

      {/* Posts grid */}
      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-gray-200 pb-12 last:border-0">
            {/* Meta info */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.category}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            
            {/* Title */}
            <h2 className="text-2xl font-light mb-3 tracking-tight">
              {post.title}
            </h2>
            
            {/* Excerpt */}
            <p className="text-gray-600 mb-4 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Author and link */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                By {post.author}
              </span>
              <Link 
                to={`/journal/${post.id}`}
                className="text-sm border-b border-gray-300 pb-0.5 hover:border-gray-900 transition-colors"
              >
                Read full story
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Older posts link */}
      <div className="mt-12 text-center">
        <button className="text-sm border border-gray-300 px-6 py-3 hover:bg-gray-50 transition-colors">
          Load more posts
        </button>
      </div>

      {/* Newsletter signup */}
      <div className="mt-16 bg-gray-50 p-8">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-medium mb-2">Subscribe to the journal</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get new posts delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-gray-500"
            />
            <button className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;