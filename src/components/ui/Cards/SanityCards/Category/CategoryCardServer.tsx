import { client } from "@/sanity/client";
import { CategoryCardClient } from "@/components";
import { Link } from "@heroui/react";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: { asset: { url: string } };
  categories: Array<{
    title: string;
    slug: string;
  }>;
}

const CATEGORY_POSTS_QUERY = `*[
  _type == "post" && 
  defined(slug.current) &&
  $category in categories[]->slug.current
] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  "categories": categories[]->{
    title,
    "slug": coalesce(slug.current, 'uncategorized')
  },
  mainImage {
    asset-> {
      _ref,
      url
    }
  }
}`;

const options = { next: { revalidate: 30 } };

const EmptyCategory = ({ category }: { category: string }) => (
  <div className="container mx-auto max-w-5xl flex-grow px-4 my-10 flex flex-col items-center justify-center gap-6 min-h-[40vh]">
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">ไม่มีบทความในหมวดหมู่นี้</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        ขออภัย ยังไม่มีบทความในหมวดหมู่ {category}
      </p>
      <Link href="/blog" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
        กลับไปยังหน้าบทความ
      </Link>
    </div>
  </div>
);

export default async function CategoryCardServer({ category }: { category: string }) {
  try {
    const posts = await client.fetch<Post[]>(CATEGORY_POSTS_QUERY, { category }, options);
    
    // ถ้าไม่มีโพสต์ในหมวดหมู่
    if (!posts || posts.length === 0) {
      return <EmptyCategory category={category} />;
    }

    return <CategoryCardClient posts={posts} category={category} />;
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return <EmptyCategory category={category} />;
  }
}