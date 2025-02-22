import React from "react";
import { Footer, NavBar, CategoryCardServer } from "@/components";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";

const CATEGORY_QUERY = `*[_type == "category" && slug.current == $category][0]`;

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (!params.category) {
    notFound();
  }

  try {
    // ตรวจสอบว่า category มีอยู่จริง
    const category = await client.fetch(CATEGORY_QUERY, { 
      category: params.category 
    }, { next: { revalidate: 30 } });

    // เพิ่ม console.log เพื่อ debug
    // console.log('Category data:', category);
    // console.log('Params:', params);

    if (!category && params.category !== 'uncategorized') {
      return notFound();
    }

    return (
      <div className="font-[family-name:var(--font-line-seed-sans)]">
        <NavBar />
        
        <section className="container mx-auto px-4 flex flex-col items-center gap-14 mt-5 mb-7">
          <CategoryCardServer category={params.category} />
        </section>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching category:', error);
    return notFound();
  }
}