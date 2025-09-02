"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";

export default function BlogsClient({ posts }) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Section Popular
  const mainPost = filteredPosts[0];
  const sidePosts = filteredPosts.slice(1, 4);

  // Section New Release (mulai dari post ke-5 biar ga double)
  const newReleasePosts = filteredPosts.slice(4, 4 + visibleCount);

  return (
    <section className="bg-white py-12 px-4 md:px-28 w-full mx-auto">
      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 py-3 pl-4 pr-10 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-3.5 text-gray-400" size={20} />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
        New Realease 
      </h2>

      <div className="md:grid md:grid-cols-3 gap-6 items-start">
        {/* Main Highlight Post */}
        {mainPost && (
          <Link
            href={mainPost.link}
            target="_blank"
            className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] transition overflow-hidden col-span-2 flex flex-col mb-4"
          >
            {mainPost.image && (
              <img
                src={mainPost.image}
                alt={mainPost.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-4">
              <p className="text-[#EE7D3B] font-medium mb-1">
                {mainPost.category}
              </p>
              <h3 className="font-bold text-xl text-blue-900 mb-2">
                {mainPost.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {mainPost.excerpt?.slice(0, 120)}...
              </p>
            </div>
          </Link>
        )}

        {/* Side Posts */}
        <div className="flex flex-col gap-5">
          {sidePosts.map((post) => (
            <Link
              key={post.id}
              href={post.link}
              target="_blank"
              className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition overflow-hidden"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 sm:w-38 sm:h-28 object-cover"
                />
              )}
              <div className="flex-1 p-2 py-4">
                <p className="text-[#EE7D3B] text-sm font-medium mb-1">
                  {post.category}
                </p>
                <h4 className="font-bold text-sm text-blue-900 leading-snug line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                  {post.excerpt?.slice(0, 80)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* New Release List */}
      <div className="mt-5 grid gap-6 grid-cols-1">
        {newReleasePosts.map((post) => (
          <Link
            key={post.id}
            href={post.link}
            target="_blank"
            className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition overflow-hidden flex flex-col"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-100 object-cover"
              />
            )}
            <div className="p-4">
              <p className="text-[#EE7D3B] text-xs font-medium mb-1">
                {post.category}
              </p>
              <h3 className="font-semibold text-base text-blue-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {post.excerpt?.slice(0, 100)}...
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      {filteredPosts.length > 4 + visibleCount && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
