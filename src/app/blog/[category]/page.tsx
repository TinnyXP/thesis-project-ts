// app/blog/[category]/page.tsx
import React from "react";
import { Footer, NavBar, CategoryCardServer } from "@/components";
import { client } from "@/lib/sanity/client";
import { Link } from "@heroui/react";

const CategoryNotFound = () => (
  <div>
    <NavBar />
    <section className="container mx-auto max-w-5xl flex-grow px-4 my-10 flex flex-col items-center justify-center gap-6 min-h-[50vh] font-[family-name:var(--font-bai-jamjuree)]">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">ไม่พบหมวดหมู่</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          ขออภัย ไม่พบหมวดหมู่ที่คุณกำลังมองหา
        </p>
        <Link href="/blog" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          กลับไปยังหน้าบทความ
        </Link>
      </div>
    </section>
    <Footer />
  </div>
);

const CATEGORY_QUERY = `*[_type == "category" && slug.current == $category][0]`;

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (!params.category) {
    return <CategoryNotFound />;
  }

  try {
    const category = await client.fetch(CATEGORY_QUERY, {
      category: params.category
    }, { next: { revalidate: 30 } });

    if (!category && params.category !== 'uncategorized') {
      return <CategoryNotFound />;
    }

    return (
      <div className="font-[family-name:var(--font-line-seed-sans)]">
        <NavBar />

        <section className="flex flex-col items-center gap-14 mt-5 mb-7">
          <h1 className="text-3xl font-bold">
            บทความในหมวดหมู่ {category?.title || 'Uncategorized'}
          </h1>
          <CategoryCardServer category={params.category} />
        </section>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching category:', error);
    return <CategoryNotFound />;
  }
}