import React from "react";
import { notFound } from "next/navigation";
import { Footer, ImageModal, NavBar, SlugBreadcrumb, SlugShareButton } from "@/components";

import { client } from "@/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { PortableTextReactComponents } from "@portabletext/react";

import { Link, Image } from "@heroui/react";
import { FaQuoteLeft } from "react-icons/fa6";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  body,
  "categories": categories[]->{
    title,
    "slug": coalesce(slug.current, 'uncategorized')
  },
  "author": author->{
    name,
    image,
    slug,
    bio
  },
  mainImage {
    asset-> {
      _ref,
      url
    }
  }
}`;
// const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
//   _id,
//   title,
//   slug,
//   publishedAt,
//   body,
//   "categories": categories[]->{
//     title,
//     "slug": coalesce(slug.current, 'uncategorized')
//   },
//   mainImage {
//     asset-> {
//       _ref,
//       url
//     }
//   }
// }`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-3">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mb-3">{children}</h4>,
    normal: ({ children }) => <p className="text-base leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="relative pl-6 pr-2 my-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary-color rounded-l-lg"></div>
        <div className="relative">
          <FaQuoteLeft className="absolute -top-2 -left-4 h-4 w-4 text-primary-color" fill="currentColor" />
          <div className="text-lg text-gray-700 dark:text-gray-300 italic">
            {children}
          </div>
        </div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "#";
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {children}
        </a>
      );
    },
  } as PortableTextReactComponents["marks"],
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)?.width(1366).auto("format").url();
      const originalUrl = value?.asset?._ref ? urlFor(value)?.url() ?? null : null;
      return imageUrl ? (
        <ImageModal
          src={imageUrl}
          originalSrc={originalUrl as string}
          alt="Sanity Image"
          className="rounded-lg shadow-lg w-full my-2"
        />
      ) : null;
    },
  },
};

// Component for Not Found content
const PostNotFound = () => (
  <div>
    <NavBar />
    <section className="container mx-auto max-w-5xl flex-grow px-4 my-10 flex flex-col items-center justify-center gap-6 min-h-[50vh] font-[family-name:var(--font-bai-jamjuree)]">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">ไม่พบบทความ</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          ขออภัย ไม่พบบทความที่คุณกำลังมองหา
        </p>
        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          กลับไปยังหน้าบทความ
        </Link>
      </div>
    </section>
    <Footer />
  </div>
);

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  // ตรวจสอบว่า params.slug มีค่าหรือไม่
  const resolvedParams = await params;
  if (!resolvedParams.slug) {
    notFound(); // ใช้ Next.js built-in notFound function
  }

  try {
    const post = await client.fetch<SanityDocument>(POST_QUERY, resolvedParams, options);

    // ถ้าไม่พบโพสต์ ให้แสดงหน้า Not Found
    if (!post || !post._id) {
      return <PostNotFound />;
    }

    const mainImageUrl = post.mainImage?.asset?.url && `${post.mainImage.asset.url}?w=1600&auto=format`;
    const originalMainImageUrl = post.mainImage?.asset?.url || null;

    const categorySlug = post.categories?.[0]?.slug || 'uncategorized';
    const fullUrl = `https://thesis.trinpsri.net/${categorySlug}/${post.slug.current}`;

    return (
      <div>
        <NavBar />

        <section className="container mx-auto max-w-5xl flex-grow px-4 my-5 flex flex-col gap-5 font-[family-name:var(--font-bai-jamjuree)]">

          <SlugBreadcrumb
            postTitle={post.title}
            postSlug={post.slug.current}
            category={post.categories?.[0]}
          />

          <div className="prose prose-2xl dark:prose-invert prose-zinc">
            {mainImageUrl ? (
              <ImageModal
                src={mainImageUrl}
                originalSrc={originalMainImageUrl}
                alt={post.title}
                className="rounded-lg shadow-lg w-full my-1"
              />
            ) : (
              <div className="aspect-video bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          <div className="text-center prose prose-2xl dark:prose-invert prose-zinc">
            <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-base">
                  📅 เผยแพร่: {new Date(post.publishedAt).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
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
            <SlugShareButton
              url={fullUrl}
              title={post.title}
            />
          </div>

          <div className="w-full border-1 border-primary my-4" />
        </section>

        <section className="container mx-auto max-w-4xl flex-grow px-4 my-5 flex flex-col gap-5 font-[family-name:var(--font-bai-jamjuree)]">
          <article className="mt-2 mb-10 prose prose-2xl dark:prose-invert prose-zinc">
            {Array.isArray(post.body) ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-gray-500">No content available.</p>
            )}
          </article>
        </section>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return <PostNotFound />;
  }
}