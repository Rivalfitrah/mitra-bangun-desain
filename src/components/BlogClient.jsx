"use client";

import Link from "next/link";

export default function BlogsClient({ posts }) {
  return (
    <section className="bg-white py-16 px-6 md:px-30">
      <h2 className="text-center text-3xl font-bold">
        <span className="text-red-500">Read Our</span>{" "}
        <span className="text-blue-900">Latest News</span>
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 w-full mx-auto">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.id} href={post.link} target="_blank">
              <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col cursor-pointer">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded-xl mb-4 h-48 w-full object-cover"
                  />
                )}
                <p className="text-red-500 font-medium">{post.category}</p>
                <h3 className="font-bold text-lg text-blue-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {post.excerpt?.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>
    </section>
  );
}
