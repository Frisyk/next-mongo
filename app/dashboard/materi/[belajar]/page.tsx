import { getDetailsM, getMaterialDetails } from "@/lib/dal";
import Link from "next/link";
import Header from "./components/Header-Layout";
import Image from "next/image";
import { PiExam } from "react-icons/pi";
import { Metadata } from "next";
import SideNav, { MarkdownToHtml } from "./components/Paragraph";
import ClientSideContent from "./components/PartPage";
import MainPage from "./components/PartPage";
import MaterialDetail from "./components/MaterialDetail";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Detail Materi'
};

export default async function Page({ params }: { params: any }) {
    try {
        // Coba ambil dari model Material baru
        const material = await getMaterialDetails(params.belajar);
        
        if (material) {
            return (
                <main className="w-full min-h-screen" role="main">
                    <Header link={'dashboard'} title={material.title} />
                    
                    <h1 className="font-bold text-2xl mx-5 md:text-4xl my-4 md:my-10 md:text-center" tabIndex={0}>
                        {material.title}
                    </h1>
                    
                    <MaterialDetail material={JSON.stringify(material)} />
                </main>
            );
        }
        
        // Jika tidak ada di Material baru, coba model lama
        const materi = await getDetailsM(params.belajar);
        
        if (!materi) {
            return redirect('/dashboard');
        }
        
        return (
            <main className="w-full min-h-screen" role="main">
                <Header link={'dashboard'} title={materi.title} />
                
                <h1 className="font-bold text-2xl mx-5 md:text-4xl my-4 md:my-10 md:text-center" tabIndex={0}>
                    {materi.title}
                </h1>
                
                <MainPage imateri={JSON.stringify(materi)} />
            </main>
        );
    } catch (error) {
        console.error("Error loading material:", error);
        return redirect('/dashboard');
    }
}
