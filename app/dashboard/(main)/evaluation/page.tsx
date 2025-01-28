import { ListItem } from "./Card";
import pretest from '@/public/icons/exam.png'
import posttest from '@/public/icons/test.png'
import testing from '@/public/icons/ab-testing.png'

export default function ListExample() {
  const items = [
    {
      name: "Kuisoner Evaluasi Aplikasi",
      iconUrl: testing,
      description: "Kasih rating mu untuk aplikasi ni yaa!.",
      link: "",
      isDisable: false
    },
    {
      name: "Pre-Test",
      iconUrl: pretest,
      description: "Ayo liat seberapa jago kamu sebelum belajar.",
      link: "",
      isDisable: true
    },
    {
      name: "Post-Test",
      iconUrl: posttest,
      description: "Uji pemahaman-mu lagi yuk setelah belajar.",
      link: "",
      isDisable: true
    },
  ];

  return (
    <div className="flex w-full flex-wrap gap-6 items-center justify-center">
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
  );
}
