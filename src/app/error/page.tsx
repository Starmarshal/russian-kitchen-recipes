'use client';

import {useSearchParams} from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'Неизвестная ошибка';
  return (
    <div className="flex  items-center justify-center">
      <p className="text-red-500 text-xl">{message}</p>
    </div>
  );
};

export default Page;