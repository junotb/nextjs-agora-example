import Link from "next/link";
import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <article className="flex flex-col gap-2 border border-gray-400 p-4 bg-white rounded-xl shadow">
      <h3 className="text-base font-bold">{title}</h3>
      <p>{description}</p>
      <Link href={href} className="border border-gray-400 px-4 py-2 bg-white hover:bg-gray-200 hover:text-gray-700 rounded">Go to example</Link>
    </article>
  );
}