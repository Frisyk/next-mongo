import Link from "next/link";
import { ListProps } from "./type";


const LevelList: React.FC<ListProps> = ({ levels}) => {
  return (
    <div className="flex flex-col items-center justify-center">      
        {levels.map((level, index) => (
          <Link href={`/dashboard/games/cardmatch/${level}`} className="px-5 py-5 w-full md:w-2/3 text-2xl outline mb-5 rounded-xl" key={index}>{level}</Link>
        ))}
      
    </div>
  );
};

export default LevelList;
