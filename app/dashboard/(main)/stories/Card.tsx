import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export function Card({ title, description, date, imageUrl }: CardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 md:w-1/2 rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          className="object-cover w-full h-48"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-sm p-2">
          {date}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-700 dark:text-slate-400 mt-2">{description}</p>
      </div>
    </div>
  );
}
