'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'buttons';
  className?: string;
}

/**
 * LanguageSelector component
 * 
 * Provides a UI for selecting the application language
 * Can be displayed as a dropdown or as buttons based on variant prop
 */
export default function LanguageSelectorButton({ 
  variant = 'dropdown',
  className = '' 
}: LanguageSelectorProps) {
  const { t } = useTranslation();
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);

  // Get current language code
  const currentLangCode = currentLanguage.code;

  // Handle language change
  const handleLanguageChange = (code: string) => {
    changeLanguage(code);
    setShowDropdown(false);
  };

  // Button variant (horizontal list of language options)
  if (variant === 'buttons') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            className={`px-3 py-1 rounded ${
              currentLangCode === language.code
                ? 'bg-primary-color text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => handleLanguageChange(language.code)}
          >
            {language.name}
          </button>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <div 
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 flex items-center cursor-pointer shadow-sm"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="mr-2">{t('language')}: {currentLanguage.name}</span>
        <span className="text-gray-500">▼</span>
      </div>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                currentLangCode === language.code ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              {language.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}