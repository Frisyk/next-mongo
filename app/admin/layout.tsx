import { getUser } from "@/lib/dal";
import { Navigation } from "./components/Navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  const user = await getUser();

  return (
        <main className="w-full bg-gradient-to-br flex ">
          <Navigation userI={JSON.stringify(user)}/>
          {children}
        </main>
  );
}
