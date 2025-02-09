"use client"
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ListItemProps {
  name: string;
  link: string;
  iconUrl: StaticImageData;
  description: string;
  isDisable: boolean;
}

export function ListItem({ name, link, iconUrl, description, isDisable }: ListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={!isDisable ? { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" } : {}}
      className="w-full lg:w-fit"
    >
      <Link
        href={isDisable ? '#' : link}
        className={`flex items-center p-10 gap-5 bg-white dark:bg-slate-800 rounded-lg shadow-md transition-all ${
          isDisable ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
        }`}
      >
        <div>
          <Image src={iconUrl} alt={name} width={60} height={60} className="rounded" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">{name}</h3>
          <p className="text-slate-700 dark:text-slate-400 text-sm mt-1">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
