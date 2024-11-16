import { GameResources } from "@/lib/data";
import GamesCard from "../Games/CardMatch";

export const generateMetadata = async ({params}: {params: MateriParams}) => {
  const title = GameResources.find(gr => gr.level == params.level.replace(/%20/g, " "))
  return {
    title: `Card Match Level: ${title?.level}`,
    description: title?.cards
  }
}

type MateriParams = {
  level: string;
};

async function MateriPage({ params }: { params: MateriParams }) {
  const game = GameResources.find(gr => gr.level == params.level.replace(/%20/g, " "))  

  return (
    <main>
      <GamesCard level={game?.level} back="/dashboard/games/cardmatch"/>
    </main>
  );
}

export default MateriPage