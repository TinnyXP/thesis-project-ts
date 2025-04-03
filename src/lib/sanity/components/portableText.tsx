// src/lib/sanity/portableText.tsx
import React from 'react';
import { PortableTextReactComponents } from "@portabletext/react";
import { ImageModal } from "@/components";
import { urlFor } from '@/lib/sanity/image';
import { QuoteIcon } from 'lucide-react';

/**
 * Components สำหรับ PortableText เพื่อแสดงเนื้อหาจาก Sanity
 */
export const portableTextComponents: Partial<PortableTextReactComponents> = {
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
          <QuoteIcon className="absolute -top-2 -left-4 h-4 w-4 text-primary-color" />
          <div className="text-lg text-gray-700 dark:text-gray-300 italic py-4">
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
      const originalUrl = value?.asset?._ref ? urlFor(value)?.url() : null;
      return imageUrl ? (
        <ImageModal
          src={imageUrl}
          originalSrc={originalUrl as string}
          alt="Sanity Image"
          className="rounded-lg shadow-lg w-full my-2"
        />
      ) : null;
    },
    code: ({ value }) => {
      return (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
          <code className="text-sm font-mono">{value.code}</code>
        </pre>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};