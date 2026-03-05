'use client';

import {usePathname} from 'next/navigation';
import {siteConfig} from '@/config/site.config';

const Title = () => {
  const pathname = usePathname();

  const currentNavItem = siteConfig.navItems.find(
    (item) => item.href === pathname
  );

  const pageTitle = currentNavItem ? currentNavItem.label : siteConfig.title;

  return (
    <div className="flex justify-center m-6">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
};

export default Title;