'use client';

import React from 'react';
import { Button, Tooltip, addToast } from "@heroui/react";
import { Copy, Share2 } from "lucide-react";

interface ShareButtonProps {
  url: string;
  title: string;
}

/**
 * คอมโพเนนต์ปุ่มแชร์สำหรับหน้าบทความ
 * @param url - URL ที่ต้องการแชร์
 * @param title - ชื่อเรื่องที่ต้องการแชร์
 */
export default function SlugShareButton({ url, title }: ShareButtonProps) {
  const currentUrl = typeof window !== 'undefined'
    ? window.location.href  // ใช้ URL ปัจจุบันจาก client side
    : url;

  // SVG สำหรับไอคอน Line
  const LineIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="none"
    >
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.494.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771h.001zm-5.74-1.594c.348 0 .629.285.629.63 0 .344-.282.629-.63.629H6.39c-.345 0-.626-.285-.626-.629V8.108c0-.345.281-.63.626-.63.35 0 .63.285.63.63v3.146H9.77v.031zM4.5 8.107c0 .345-.279.63-.631.63-.345 0-.627-.285-.627-.63s.282-.63.63-.63c.349 0 .628.285.628.63z" />
    </svg>
  );

  // SVG สำหรับไอคอน Facebook
  const FacebookIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 320 512" 
      fill="currentColor" 
      stroke="none"
    >
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  );

  // SVG สำหรับไอคอน Twitter (X)
  const TwitterIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 512 512" 
      fill="currentColor" 
      stroke="none"
    >
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  );

  /**
   * ตรวจสอบว่าเป็นอุปกรณ์มือถือหรือไม่
   */
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  };

  /**
   * ฟังก์ชันคัดลอก URL ไปยังคลิปบอร์ด
   */
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
      
      // แสดง toast เมื่อคัดลอกสำเร็จ (เฉพาะบนเดสก์ท็อป)
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
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  /**
   * ฟังก์ชันแชร์ไปยังแพลตฟอร์มต่างๆ
   */
  const handleShare = (platform: string) => {
    // ใช้ window.location.href เพื่อให้ได้ URL เต็มรูปแบบ
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'line':
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`;
        break;
    }

    if (shareUrl) {
      // เพิ่มขนาด popup ให้ใหญ่ขึ้น
      window.open(shareUrl, '_blank', 'width=500,height=500');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-base flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        แชร์:
      </p>
      <div className="flex items-center gap-1">
        <Tooltip content="คัดลอกลิงก์" className='bg-default-100 dark:bg-default-100' offset={3} placement='bottom'>
          <Button
            onPress={handleCopy}
            size='sm'
            isIconOnly
            radius='full'
            variant='flat'
            className="text-medium border-2 border-default-200 dark:border-default-100"
            aria-label="คัดลอกลิงก์"
          >
            <Copy size={15} />
          </Button>
        </Tooltip>

        <Tooltip content='Facebook' className='bg-blue-500 text-white' offset={3} placement='bottom'>
          <button
            onClick={() => handleShare('facebook')}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-500/90 
                    flex items-center justify-center transition-all duration-200 
                    shadow hover:shadow-lg border-2 border-blue-400 dark:border-blue-600"
            aria-label="แชร์ไป Facebook"
          >
            <FacebookIcon />
          </button>
        </Tooltip>

        <Tooltip content='Twitter (X)' className='bg-zinc-800 text-white' offset={3} placement='bottom'>
          <button
            onClick={() => handleShare('twitter')}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-800/90 
                    flex items-center justify-center transition-all duration-200 
                    shadow hover:shadow-lg border-2 border-zinc-700"
            aria-label="แชร์ไป Twitter (X)"
          >
            <TwitterIcon />
          </button>
        </Tooltip>

        <Tooltip content='Line' className='bg-emerald-500 text-white' offset={3} placement='bottom'>
          <button
            onClick={() => handleShare('line')}
            className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-500/90 
                    flex items-center justify-center transition-all duration-200 
                    shadow hover:shadow-lg border-2 border-emerald-400 dark:border-emerald-600"
            aria-label="แชร์ไป Line"
          >
            <LineIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}