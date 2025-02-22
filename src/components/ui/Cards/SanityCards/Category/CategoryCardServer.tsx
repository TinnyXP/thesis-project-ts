import { client } from "@/sanity/client";
import { CategoryCardClient } from "@/components";
import { notFound } from "next/navigation";

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

// เพิ่ม query เช็ค category
const CATEGORY_QUERY = `*[_type == "category" && $slug in [slug.current, "uncategorized"]][0]`;

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

export default async function CategoryCardServer({ category }: { category: string }) {
  try {
    // เช็คก่อนว่า category มีอยู่จริงไหม
    const categoryExists = await client.fetch(CATEGORY_QUERY, { slug: category }, options);
    
    if (!categoryExists && category !== 'uncategorized') {
      notFound();
    }

    const posts = await client.fetch<Post[]>(CATEGORY_POSTS_QUERY, { category }, options);
    
    if (!posts || posts.length === 0) {
      // อาจจะ return component ที่แสดงว่าไม่มีโพสต์ในหมวดหมู่นี้แทน
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">ไม่พบบทความในหมวดหมู่นี้</h2>
          <p className="text-gray-600 dark:text-gray-400">
            ขออภัย ยังไม่มีบทความในหมวดหมู่ {categoryExists?.title || category}
          </p>
        </div>
      );
    }

    return <CategoryCardClient posts={posts} category={category} />;
  } catch (error) {
    console.error('Error fetching category posts:', error);
    notFound();
  }
}