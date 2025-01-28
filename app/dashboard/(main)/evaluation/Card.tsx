import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface ListItemProps {
  name: string;
  link: string;
  iconUrl: StaticImageData;
  description: string;
  isDisable: boolean;
}

export function ListItem({
  name,
  link,
  iconUrl,
  description,
  isDisable,
}: ListItemProps) {
  return (
    <div className="w-full lg:w-fit">
      <Link
        href={link}
        className={`flex items-center p-10 gap-5 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isDisable ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div>
          <Image
            src={iconUrl}
            alt={name}
            width={60}
            height={60}
            className="rounded"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">{name}</h3>
          <p className="text-slate-700 dark:text-slate-400 text-sm mt-1">{description}</p>
        </div>
      </Link>
    </div>
  );
}
