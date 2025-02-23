'use client';

import React from 'react';
import { Button, Tooltip, addToast } from "@heroui/react";
import { FiCopy, FiShare2 } from 'react-icons/fi';
import { SiLine } from 'react-icons/si';
import { FaFacebook, FaXTwitter } from 'react-icons/fa6';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function SlugShareButton({ url, title }: ShareButtonsProps) {
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href  // ใช้ URL ปัจจุบันจาก client side
    : url;

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error("Fallback copy failed:", err);
          return;
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        // Facebook ใช้ quote สำหรับข้อความ
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
        break;
      case 'twitter':
        // Twitter ใช้ text สำหรับข้อความ
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'line':
        // Line สามารถใช้ทั้ง url และ text
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`;
        break;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-base flex items-center gap-2">
        <FiShare2 className="w-4 h-4" />
        Share:
      </p>
      <div className="flex items-center gap-1">
        <Tooltip content="Copy link" className='bg-default-100 dark:bg-default-100' offset={3} placement='bottom'>
          <Button
            onPress={() => {
              handleCopy();
              if (!isMobile()) {
                addToast({
                  title: "คัดลอกลิงก์ไปยังคลิปบอร์ดเรียบร้อย !",
                  color: "default",
                  radius: "full",
                  timeout: 3000,
                  hideCloseButton: true,
                  shouldShowTimeoutProgess: true,
                  classNames: {
                    base: "font-[family-name:var(--font-line-seed-sans)]",
                    title: "font-bold",
                  }
                });
              }
            }}
            size='sm'
            isIconOnly
            radius='full'
            variant='flat'
            className="text-medium border-2 border-default-200 dark:border-default-100"
          >
            <FiCopy size={15} />
          </Button>
        </Tooltip>

        <Tooltip content='Facebook' className='bg-blue-500 text-white' offset={3} placement='bottom'>
          <button
            onClick={() => handleShare('facebook')}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-500/90 
                    flex items-center justify-center transition-all duration-200 
                    shadow hover:shadow-lgcl border-2 border-blue-400 dark:border-blue-600"
          >
            <FaFacebook size={16} className="text-white" />
          </button>
        </Tooltip>

        <Tooltip content='Twitter (X)' className='bg-zinc-800 text-white' offset={3} placement='bottom'>
          <button
            onClick={() => handleShare('twitter')}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-800/90 
                    flex items-center justify-center transition-all duration-200 
                    shadow hover:shadow-lg border-2 border-zinc-700"
          >
            <FaXTwitter size={18} className="text-white" />
          </button>
        </Tooltip>

        <Tooltip content='Line' className='bg-emerald-500 text-white' offset={3} placement='bottom'>
          <button
            onClick={() => handleShare('line')}
            className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-500/90 
                    flex items-center justify-center transition-all duration-200 
                    shadow hover:shadow-lg border-2 border-emerald-400 dark:border-emerald-600"
          >
            <SiLine size={18} className="text-white" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}