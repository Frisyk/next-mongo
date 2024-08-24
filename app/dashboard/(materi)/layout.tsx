export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
        <main className="w-full pb-20">{children}</main>
  );
}
