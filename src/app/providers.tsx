'use client';

import {HeroUIProvider} from '@heroui/system';
import Header from '@/components/UI/header';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}