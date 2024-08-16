export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
        <main className="w-full bg-gradient-to-br dark:from-[#0c0a27] dark:to-purple-950">{children}</main>
  );
}
