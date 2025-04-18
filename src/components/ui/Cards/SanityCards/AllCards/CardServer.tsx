import { client } from "@/sanity/client";
import { CardClient } from "@/components";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: { asset: { url: string } };
  categories: Array<{
    title: string;
    slug: string;  // เป็น string ตรงๆ เพราะใช้ coalesce ใน query
  }>;
}

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...12] {
  _id,
  title,
  slug,
  publishedAt,
  "categories": categories[]->{
    title,
    "slug": coalesce(slug.current, 'uncategorized')
  },
  mainImage {
    asset->{
      url,
      metadata { 
        lqip, 
        dimensions 
      }
    }
  }
}`;

const options = { 
  next: { 
    revalidate: 1,
  } 
};

export default async function NewsCardServer() {
  try {
    const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);
    
    if (!posts || posts.length === 0) {
      return null;
    }

    return <CardClient posts={posts} />;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}