import Navbar from '@/components/Navbar'
import PageHeader from "@/components/PageHeader";
import Footer from '@/components/Footer'
import BlogsClient from "./BlogsClient";
import { getPosts2  } from "@/lib/getPosts2";

export default async function Page() {
  const posts = await getPosts2 (); 

  return (
    <>
      <Navbar />
      <PageHeader title="Blogs" breadcrumb="Blogs" />
      <BlogsClient posts={posts} /> 
      <Footer />
    </>
  );
}
