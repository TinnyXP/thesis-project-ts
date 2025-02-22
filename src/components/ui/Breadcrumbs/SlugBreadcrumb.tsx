'use client';

import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

interface BreadcrumbsProps {
  postTitle: string;
  postSlug: string;
  category?: {
    title: string;
    slug: string;
  };
}

export default function PostBreadcrumbs({
  postTitle,
  postSlug,
  category
}: BreadcrumbsProps) {

  const categorySlug = category?.slug || 'uncategorized';
  const categoryTitle = category?.title || 'Uncategorized';

  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href={`/blog/${categorySlug}`}>
        {categoryTitle}
      </BreadcrumbItem>
      <BreadcrumbItem
        href={`/blog/${categorySlug}/${postSlug}`}
        isCurrent
      >
        {/* ใช้วิธีเดียวกับตัวอย่างของคุณ */}
        <div className="flex items-center">
          <p className="w-full max-w-[220px] md:max-w-[860px] truncate">
            {postTitle}
          </p>
        </div>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}