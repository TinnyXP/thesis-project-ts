'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

// Available languages
const languages = [
  { code: 'th', name: 'ไทย' },      // Thai
  { code: 'en', name: 'English' },  // English
  { code: 'zh', name: '中文' }       // Chinese
];

export default function LanguageSelector() {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Get current language code
  const currentLangCode = i18n.language || 'th';
  
  // Find current language name
  const currentLanguage = languages.find(lang => lang.code === currentLangCode) || languages[0];

  const handleLanguageChange = (code: string) => {
    // Change language directly using i18n instance
    i18n.changeLanguage(code);
    
    // Save preference
    try {
      localStorage.setItem('userLanguage', code);
    } catch (e) {
      console.error('Failed to save language preference');
    }
    
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div 
        className="border border-gray-300 rounded px-3 py-2 bg-white flex items-center cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="mr-2">{t('language')}: {currentLanguage.name}</span>
        <span className="text-gray-500">▼</span>
      </div>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                currentLangCode === language.code ? 'bg-gray-100 font-medium' : ''
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