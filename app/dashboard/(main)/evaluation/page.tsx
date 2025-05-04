import { ListItem } from "./Card";
import pretest from '@/public/icons/exam.png'
import posttest from '@/public/icons/test.png'
import testing from '@/public/icons/ab-testing.png'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Evaluasi',
};

export default function ListExample() {
  const items = [
    {
      name: "Evaluasi Media Pembelajaran",
      iconUrl: testing,
      description: "Bagikan pendapatmu tentang aplikasi ini!",
      link: "/dashboard/evaluation/evaluation-media",
      isDisable: false
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Pusat Evaluasi</h1> */}
      <div className="flex w-full flex-wrap gap-6 ">
        {items.map((item, index) => (
          <ListItem
            key={index}
            name={item.name}
            iconUrl={item.iconUrl}
            description={item.description}
            link={item.link}
            isDisable={item.isDisable}
          />
        ))}
      </div>
    </div>
  );
}
