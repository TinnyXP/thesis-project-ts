'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'th', // Thai as fallback language
    lng: 'th',         // Thai as default language
    supportedLngs: ['th', 'en', 'zh'],
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // Translation resources for all languages
    resources: {
      th: {
        translation: {
          // Thai translations
          welcome: "ยินดีต้อนรับสู่เว็บไซต์ของเรา",
          about: "เกี่ยวกับเรา",
          services: "บริการของเรา",
          contact: "ติดต่อเรา",
          language: "ภาษา",
          home: "หน้าแรก",
          products: "สินค้า",
          blog: "บล็อก",
          history: "ประวัติความเป็นมา",
          place: "สถานที่ท่องเที่ยว",
          news: "ข่าวสาร",
          static: "สถิติ",
          login: "เข้าสู่ระบบ",
          topic1: "หัวข้อไฟล์ที่ 1",
          topic2: "หัวข้อไฟล์ที่ 2",
          topic3: "หัวข้อไฟล์ที่ 3",
          download: "ดาวน์โหลด",
          loadcenter: "ดาวน์โหลดข้อมูล",
          loaddes: "ดาวน์โหลดไฟล์ได้ที่นี่"
        }
      },
      en: {
        translation: {
          // English translations
          welcome: "Welcome to our website",
          about: "About Us",
          services: "Our Services",
          contact: "Contact Us",
          language: "Language",
          home: "Home",
          products: "Products",
          blog: "Blog",
          history: "History",
          place: "Places",
          news: "News",
          static: "Static",
          login: "Login",
          topic1: "Topic 1",
          topic2: "Topic 2",
          topic3: "Topic 3",
          download: "Download",
          loadcenter: "Download Center",
          loaddes: "Download all the files you need here"
        }
      },
      zh: {
        translation: {
          // Chinese translations (Simplified)
          welcome: "欢迎访问我们的网站",
          about: "关于我们",
          services: "我们的服务",
          contact: "联系我们",
          language: "语言",
          home: "首页",
          products: "产品",
          blog: "博客",
          history: "歷史",
          place: "旅遊景點",
          news: "資訊",
          static: "靜止的",
          login: "登入",
          topic1: "托皮 1",
          topic2: "托皮 2",
          topic3: "托皮 3",
          download: "下載",
          loadcenter: "下載中心",
          loaddes: "在這裡下載您需要的所有文件"
        }
      }
    }
  });

// Helper function to change the language
export const changeLanguage = (lng: string) => {
  return i18n.changeLanguage(lng);
};

// Export the i18n instance
export default i18n;