'use client';

import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

interface BreadcrumbsProps {
  postTitle: string;
  postSlug: string;
}

export default function PostBreadcrumbs({
  postTitle,
  postSlug
}: BreadcrumbsProps) {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
      <BreadcrumbItem
        href={`/blog/${postSlug}`}
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