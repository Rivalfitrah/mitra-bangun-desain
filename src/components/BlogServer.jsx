import { getPosts } from "@/lib/getPosts";
import BlogsClient from "./BlogClient";

export default async function BlogsServer() {
  const posts = await getPosts();
  return <BlogsClient posts={posts} />;
}
