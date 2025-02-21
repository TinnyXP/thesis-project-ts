'use client';

import React from 'react';

import {
  LineShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";


import { Button, Tooltip, addToast } from "@heroui/react";
import { FiCopy, FiShare2 } from 'react-icons/fi';
import { SiLine } from 'react-icons/si';
import { FaFacebook, FaXTwitter } from 'react-icons/fa6';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function SlugShareButton({ url }: ShareButtonsProps) {
  const link = typeof window !== "undefined" ? window.location.href : "";

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  };

  const handleCopy = async () => {
    try {
      // ตรวจสอบว่าใช้ navigator.clipboard ได้หรือไม่ (สำหรับ PC และมือถือบางรุ่น)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        // Fallback สำหรับมือถือรุ่นเก่าหรือบริบทที่ไม่รองรับ clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = link;
        // ทำให้มองไม่เห็น
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
              // ใช้ addToast เฉพาะเมื่อเป็นมือถือ
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
          <FacebookShareButton url={url}>
            <div className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-500/90 
                    flex items-center justify-center transition-all duration-200 
                    shadow hover:shadow-lgcl border-2 border-blue-400 dark:border-blue-600">
              <FaFacebook size={16} className="text-white" />
            </div>
          </FacebookShareButton>
        </Tooltip>

        <Tooltip content='Twitter (X)' className='bg-zinc-800 text-white' offset={3} placement='bottom'>
          <TwitterShareButton url={url}>
            <div className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-800/90 
                    flex items-center justify-center transition-all duration-200 
                    shadow hover:shadow-lg border-2 border-zinc-700">
              <FaXTwitter size={18} className="text-white" />
            </div>
          </TwitterShareButton>
        </Tooltip>

        <Tooltip content='Line' className='bg-emerald-500 text-white' offset={3} placement='bottom'>
          <LineShareButton url={url}>
            <div className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-500/90 
                    flex items-center justify-center transition-all duration-200 
                    shadow hover:shadow-lg border-2 border-emerald-400 dark:border-emerald-600">
              <SiLine size={18} className="text-white" />
            </div>
          </LineShareButton>
        </Tooltip>
      </div>
    </div>
  );
}