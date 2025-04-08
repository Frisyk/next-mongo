import Navigation from "./(components)/Navigation";
import { getUser } from "@/lib/dal";

export default async function Layout({children}: {children: React.ReactNode}) {
    const user = await getUser();

    return(
        <div className="flex h-screen max-h-screen overflow-hidden bg-gray-100 dark:bg-slate-900">
            <Navigation userI={JSON.stringify(user)} />
            {/* Main area harus mengisi sisa ruang dan *tidak* scroll sendiri */}
            {/* Scrolling akan dihandle oleh MasterDetailLayout atau konten di dalamnya */}
            <main className="flex-1 overflow-hidden">
                {/* Children (page.tsx) harus mengisi tinggi parent (main) */}
                <div className="h-full">
                   {children}
                </div>
            </main>
        </div>
    )
} 