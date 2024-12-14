import { getDetailsM } from "@/lib/dal";
import Link from "next/link";
import Header from "./components/Header-Layout";
import Image from "next/image";
import { PiExam } from "react-icons/pi";
import { Metadata } from "next";
import SideNav, { MarkdownToHtml } from "./components/Paragraph";

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
            
            <Image
                alt={`Image for ${materi.title}`}  // Descriptive alt text
                className="mx-auto md:w-1/2 md:h-[400px] rounded-xl p-3 object-contain my-5"
                height="1000"
                src={materi.img}
                width="1000"
                role="img"
            />
            
            <SideNav aria-label="Sidebar navigation" />
            
            <div className="w-full md:w-1/2 mx-auto rounded-lg px-5 md:px-0">
                <section id="section-1" className="my-10" aria-labelledby="section-1-heading">
                    <h2 id="section-1-heading" className="sr-only">Understanding</h2>
                    <MarkdownToHtml markdown={materi.understanding} />
                </section>

                <hr className="w-full my-5" />

                <section id="section-2" className="my-10" aria-labelledby="section-2-heading">
                    <h2 id="section-2-heading" className="text-2xl font-bold mb-4">Dalil Naqli</h2>
                    <MarkdownToHtml markdown={materi.arguments} />
                </section>

                <hr className="w-full my-5" />

                <section id="section-3" className="my-10" aria-labelledby="section-3-heading">
                    <h2 id="section-3-heading" className="sr-only">Forms</h2>
                    <MarkdownToHtml markdown={materi.forms} />
                </section>

                <hr className="w-full my-5" />

                <section id="section-4" className="my-10" aria-labelledby="section-4-heading">
                    <h2 id="section-4-heading" className="sr-only">Values</h2>
                    <MarkdownToHtml markdown={materi.values} />
                </section>

                <Link
                    prefetch={false}
                    href={`/dashboard/${materi.title}/${materi.quizId}`}
                    className="flex items-center gap-2 justify-center px-10 py-5 rounded text-center bg-green-400 hover:bg-green-500 text-black font-bold text-lg w-full md:w-fit"
                    aria-label={`Start quiz for ${materi.title}`}
                >
                    <PiExam className="w-6 h-6" aria-hidden="true" />
                    Uji Pemahamanmu!
                </Link>
            </div>
        </main>
    );
}
