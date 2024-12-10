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
        <main className="w-full min-h-screen">
            <Header link={'/dashboard'} title={materi.title} />
            <h1 className="font-bold text-2xl mx-5 md:text-4xl my-4 md:my-10 md:text-center">
                {materi.title}
            </h1>
            <Image
                alt="Image"
                className="mx-auto md:w-1/2 md:h-[400px] rounded-xl p-3 object-contain my-5"
                height="1000"
                src={materi.img}
                width="1000"
            />
            <SideNav />
            <div className="w-full md:w-1/2 mx-auto rounded-lg px-5 md:px-0">
                <section id="section-1" className="my-10">
                    <MarkdownToHtml markdown={materi.understanding} />
                </section>
                <hr className="w-full my-5" />
                <section id="section-2" className="my-10">
                    <h2 className="text-2xl font-bold mb-4">Dalil Naqli</h2>
                    <MarkdownToHtml markdown={materi.arguments} />
                </section>
                <hr className="w-full my-5" />
                <section id="section-3" className="my-10">
                    <MarkdownToHtml markdown={materi.forms} />
                </section>
                <hr className="w-full my-5" />
                <section id="section-4" className="my-10">
                    <MarkdownToHtml markdown={materi.values} />
                </section>
                <Link
                    prefetch={false}
                    href={`/dashboard/${materi.title}/${materi.quizId}`}
                    className="flex items-center gap-2 justify-center px-10 py-5 rounded text-center bg-green-400 hover:bg-green-500 text-black font-bold text-lg w-full md:w-fit"
                >
                    <PiExam className="w-6 h-6" />
                    Uji Pemahamanmu!
                </Link>
            </div>
        </main>
    );
}
