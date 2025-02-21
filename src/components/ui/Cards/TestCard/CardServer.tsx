import { client } from "@/sanity/client";
import { CardClient } from "@/components";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: { asset: { url: string } };
}

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] 
| order(publishedAt desc)[0...12] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage {
    asset->{
      url,
      metadata { lqip, dimensions }
    }
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function NewsCardServer() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);
  return <CardClient posts={posts} />;
}