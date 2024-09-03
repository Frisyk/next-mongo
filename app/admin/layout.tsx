import { Navigation } from "./components/Navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
        <main className="w-full bg-gradient-to-br flex dark:from-[#0c0a27] dark:to-slate-950">
        <Navigation />
          {children}
        </main>
  );
}
