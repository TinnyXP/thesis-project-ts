'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import '../i18n'; // Import the i18n configuration

// This component ensures i18next is only initialized on the client side
export default function TranslationProvider({ children }: PropsWithChildren) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once component is mounted on the client
    setIsClient(true);
  }, []);

  // During SSR, we simply render the children without i18next initialized
  if (!isClient) {
    return <>{children}</>;
  }

  // On the client, i18next is initialized
  return <>{children}</>;
}