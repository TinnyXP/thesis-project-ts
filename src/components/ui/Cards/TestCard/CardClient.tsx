"use client";

import React from "react";
import { Card, CardBody, CardFooter, Image, Pagination } from "@heroui/react";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: { asset: { url: string } };
}

export default function NewsCardClient({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [cardsPerPage, setCardsPerPage] = React.useState(6);

  const totalCards = posts.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  React.useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerPage(6);
      } else if (window.innerWidth >= 768) {
        setCardsPerPage(4);
      } else {
        setCardsPerPage(3);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post._id}
            isPressable isBlurred
            onPress={() => window.location.href = `/${post.slug.current}`}
            className="border-none bg-background/60 dark:bg-default-100/50"
          >
            <CardBody className="overflow-visible p-1.5">
              {post.mainImage?.asset?.url ? (
                <Image
                  alt={post.title}
                  className="object-cover rounded-xl w-full h-auto"
                  src={`${post.mainImage.asset.url}?w=768&auto=format`}
                  width={330}
                  height={180}
                />
              ) : (
                <div className="w-[330px] h-[180px] bg-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500 text-sm">No image available</p>
                </div>
              )}
            </CardBody>
            <CardFooter className="flex justify-between items-center">
              <div className="flex flex-col text-left">
                <p className="w-full max-w-[320px] truncate text-sm uppercase font-bold">{post.title}</p>
                <small className="text-default-500">Create at {new Date(post.publishedAt).toLocaleDateString()}</small>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination variant="light" initialPage={1} total={totalPages} page={currentPage} onChange={setCurrentPage} classNames={{ item: "box-border" }} />
    </div>

  );
}
