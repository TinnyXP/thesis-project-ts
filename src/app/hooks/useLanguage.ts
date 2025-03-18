'use client';

import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import i18n from '../i18n';

// Available languages
export const languages = [
  { code: 'th', name: 'ไทย' },      // Thai
  { code: 'en', name: 'English' },  // English
  { code: 'zh', name: '中文' }       // Chinese
];

export function useLanguage() {
  // Get the current language from i18n
  const currentLang = i18n.language || 'th';
  
  // Get current language info
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];
  
  // Change language and store preference in localStorage
  const changeLanguage = useCallback((languageCode: string) => {
    // Directly using the i18n instance instead of from useTranslation
    i18n.changeLanguage(languageCode);
    
    // Store selected language in localStorage for persistence
    try {
      localStorage.setItem('userLanguage', languageCode);
    } catch (e) {
      console.error('Failed to save language preference:', e);
    }
  }, []);
  
  // Load saved language preference on mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('userLanguage');
      if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
        i18n.changeLanguage(savedLanguage);
      }
    } catch (e) {
      console.error('Failed to load language preference:', e);
    }
  }, []);
  
  return {
    currentLanguage,
    languages,
    changeLanguage
  };
}