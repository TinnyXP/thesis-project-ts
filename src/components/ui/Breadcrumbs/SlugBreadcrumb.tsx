'use client';

import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { FaHome } from 'react-icons/fa';

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
    <div className="w-full overflow-hidden">
      <Breadcrumbs className="flex flex-nowrap items-center min-w-0">
        <BreadcrumbItem href="/" className="flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-primary-color flex items-center justify-center transition-all duration-200 shadow hover:shadow-lg">
            <FaHome size={16} className="text-background" />
          </div>
        </BreadcrumbItem>
        <BreadcrumbItem href={`/blog/${categorySlug}`} className="flex-shrink min-w-0">
          <div className="max-w-[100px] md:max-w-[200px]">
            <p className="truncate">
              {categoryTitle}
            </p>
          </div>
        </BreadcrumbItem>
        <BreadcrumbItem
          href={`/blog/${categorySlug}/${postSlug}`}
          isCurrent
          className="flex-1 min-w-0"
        >
          <div className="w-full">
            <p className="truncate">
              {postTitle}
            </p>
          </div>
        </BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
}

