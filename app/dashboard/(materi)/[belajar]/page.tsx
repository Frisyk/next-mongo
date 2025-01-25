import { getDetailsM } from "@/lib/dal";
import Link from "next/link";
import Header from "./components/Header-Layout";
import Image from "next/image";
import { PiExam } from "react-icons/pi";
import { Metadata } from "next";
import SideNav, { MarkdownToHtml } from "./components/Paragraph";
import ClientSideContent from "./components/PartPage";
import MainPage from "./components/PartPage";

export const metadata: Metadata = {
    title: 'Learning'
};

export default async function Page({ params }: { params: any }) {
    const materi = await getDetailsM(params.belajar);
    return (
        <main className="w-full min-h-screen" role="main">
            <Header link={'/dashboard'} title={materi.title} />
            
            <h1 className="font-bold text-2xl mx-5 md:text-4xl my-4 md:my-10 md:text-center" tabIndex={0}>
                {materi.title}
            </h1>                        
            <MainPage imateri={JSON.stringify(materi)}/>
        </main>
    );
}
