'use client';

import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  description: string;
  href: string;
}

const ArticleCard = ({ title, description, href }: ArticleCardProps) => {
  return (
    <article className="flex flex-col gap-2 border border-gray-400 p-4 w-80 rounded-xl shadow-md">
      <h3 className="text-base font-bold">{title}</h3>
      <p>{description}</p>
      <Link href={href} className="border border-gray-400 px-4 py-2 hover:bg-gray-200 rounded">Go to example</Link>
    </article>
  );
};

export default ArticleCard;
