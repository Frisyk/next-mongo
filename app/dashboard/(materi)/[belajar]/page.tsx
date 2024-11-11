import { getDetailsM } from "@/lib/dal";
import Link from "next/link";
import Header from "./components/Header-Layout";
import Image from "next/image";
import { PiExam } from "react-icons/pi";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Learning'
  };

export default async function Page({ params }: { params: any }) {
    const materi = await getDetailsM(params.belajar)
    
    return (
        <div className="w-full min-h-screen">
            <Header link={'/dashboard'} title={materi.title} />
            <Image
                alt="Image"
                className="mx-auto md:w-1/2 md:h-[400px] rounded-xl object-contain my-5"
                height="1000"
                src={materi.img}
                width="1000"
            />
            <div className="w-full md:w-1/2  mx-auto rounded-lg px-10 md:px-0 ">
                <h1 className="font-bold text-2xl md:text-4xl my-4 md:my-10 md:text-center">{materi.title}</h1>
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: materi.desc }} />
                 <hr className="w-full my-5" />
                <h1 className="text-2xl font-bold mb-4">Rangkuman</h1>
                <p className="mb-6 px-5 text-justify leading-relaxed ">{materi.summary}</p>
                <button  className="px-10 py-5 rounded text-center bg-green-400 hover:bg-green-500 text-black font-bold text-lg w-full md:w-fit">
                    <Link prefetch={false} href={`/dashboard/${materi.title}/${materi.quizId}`} className="flex items-center gap-2 justify-center"
                    >
                        <PiExam className="w-6 h-6" />
                        Uji Pemahamanmu!
                    </Link>
                </button>
            </div>
        </div>
    );
}
