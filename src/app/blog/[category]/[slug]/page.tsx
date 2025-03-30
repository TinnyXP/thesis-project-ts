// src/app/blog/[category]/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { ImageModal, SlugBreadcrumb, SlugShareButton } from "@/components";
import { 
  getPostBySlug, 
  urlFor, 
  portableTextComponents, 
  formatThaiDate
} from "@/lib/sanity";

import { Image, Link } from "@heroui/react";
import { PortableText } from "next-sanity";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from 'next/headers';

// กำหนด metadata แบบ dynamic จากข้อมูลบทความ
export async function generateMetadata(
  { params }: { params: { category: string; slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // ดึงข้อมูลบทความ
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "ไม่พบบทความ",
      description: "ไม่พบบทความที่คุณกำลังมองหา",
    };
  }
  
  // สร้าง URL สำหรับ Open Graph
  const headersList = headers();
  const domain = headersList.get('host') || '';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const categorySlug = post.categories?.[0]?.slug || 'uncategorized';
  const ogUrl = `${protocol}://${domain}/blog/${categorySlug}/${post.slug.current}`;
  
  // กำหนด URL รูปภาพสำหรับ Open Graph
  const ogImageUrl = post.mainImage?.asset?.url 
    ? `${post.mainImage.asset.url}?w=1200&h=630&fit=crop&auto=format`
    : null;

  return {
    title: post.title,
    description: post.excerpt || `บทความเรื่อง ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `บทความเรื่อง ${post.title}`,
      url: ogUrl,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  };
}

// Component แสดงข้อความเมื่อไม่พบบทความ
const PostNotFound = () => (
  <div className="container mx-auto max-w-5xl flex-grow px-4 my-10 flex flex-col items-center justify-center gap-6 min-h-[50vh] font-[family-name:var(--font-bai-jamjuree)]">
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">ไม่พบบทความ</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        ขออภัย ไม่พบบทความที่คุณกำลังมองหา
      </p>
      <Link href="/blog" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
        กลับไปยังหน้าบทความ
      </Link>
    </div>
  </div>
);

/**
 * หน้าแสดงบทความเฉพาะ
 */
export default async function PostPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  // ตรวจสอบว่ามีพารามิเตอร์ slug หรือไม่
  if (!params.slug) {
    notFound();
  }

  try {
    // ดึงข้อมูลบทความจาก Sanity
    const post = await getPostBySlug(params.slug, {
      next: { revalidate: 60 }
    });

    // ถ้าไม่พบบทความ
    if (!post) {
      return <PostNotFound />;
    }

    // เตรียมข้อมูลสำหรับแสดงผล
    const headersList = headers();
    const domain = headersList.get('host') || '';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const categorySlug = post.categories?.[0]?.slug || 'uncategorized';
    const fullUrl = `${protocol}://${domain}/blog/${categorySlug}/${post.slug.current}`;
    
    const mainImageUrl = post.mainImage?.asset?.url 
      ? `${post.mainImage.asset.url}?w=1600&auto=format`
      : null;
    const originalMainImageUrl = post.mainImage?.asset?.url || null;

    return (
      <div>
        <section className="container mx-auto max-w-5xl flex-grow px-4 my-5 flex flex-col gap-5 font-[family-name:var(--font-bai-jamjuree)]">
          {/* Breadcrumb */}
          <SlugBreadcrumb
            postTitle={post.title}
            postSlug={post.slug.current}
            category={post.categories?.[0]}
          />

          {/* รูปภาพหลัก */}
          <div className="prose prose-2xl dark:prose-invert prose-zinc">
            {mainImageUrl ? (
              <ImageModal
                src={mainImageUrl}
                originalSrc={originalMainImageUrl || undefined}
                alt={post.title}
                className="rounded-lg shadow-lg w-full my-1"
              />
            ) : (
              <div className="aspect-video bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                <p className="text-gray-500">ไม่มีรูปภาพ</p>
              </div>
            )}
          </div>

          {/* หัวข้อบทความ */}
          <div className="text-center prose prose-2xl dark:prose-invert prose-zinc">
            <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
          </div>

          {/* ข้อมูลเกี่ยวกับบทความและปุ่มแชร์ */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-base">
                  📅 เผยแพร่: {formatThaiDate(post.publishedAt)}
                </p>
                {post.author && (
                  <div className="flex items-center gap-2">
                    {post.author.image && (
                      <Image
                        src={urlFor(post.author.image)?.width(80).auto("format").url()}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <p className="text-base">
                      ✍️ เขียนโดย:{" "}
                      <span className="font-medium">
                        {post.author.name}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* ปุ่มแชร์ */}
            <SlugShareButton
              url={fullUrl}
              title={post.title}
            />
          </div>

          <div className="w-full border-1 border-primary my-4" />
        </section>

        {/* เนื้อหาบทความ */}
        <section className="container mx-auto max-w-4xl flex-grow px-4 my-5 flex flex-col gap-5 font-[family-name:var(--font-bai-jamjuree)]">
          <article className="mt-2 mb-10 prose prose-2xl dark:prose-invert prose-zinc">
            {Array.isArray(post.body) ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-gray-500">ไม่มีเนื้อหา</p>
            )}
          </article>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return <PostNotFound />;
  }
}