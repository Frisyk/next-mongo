import { getDetailsM } from "@/lib/dal";
import Link from "next/link";
import Header from "./components/Header-Layout";
import Image from "next/image";
import { PiExam } from "react-icons/pi";

export default async function Page({ params }: { params: any }) {
    const materi = await getDetailsM(params.belajar)
    
    return (
        <div className="w-full min-h-screen">
            <Header link={'/dashboard'} title={materi.title} />
            <Image
                alt="Image"
                className="mx-auto rounded-xl object-cover my-5"
                height="400"
                src={materi.img}
                width="400"
            />
            <div className="w-full md:w-1/2 mx-auto rounded-lg px-10">
                <h1 className="font-bold text-2xl mb-4">{materi.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: materi.desc }} />
                 <hr className="w-full my-5" />
                <h1 className="text-2xl font-bold mb-4">Rangkuman</h1>
                <p className="mb-6">{materi.summary}</p>
                <button  className="px-10 py-5 rounded text-center bg-green-400 hover:bg-green-500 text-black font-bold text-2xl w-full md:w-fit">
                    <Link prefetch={false} href={`/dashboard/${materi.title}/${materi.quizId}`} className="flex items-center gap-2 justify-center"
                    >
                        <PiExam className="w-8 h-8" />
                        Uji Pemahamanmu!
                    </Link>
                </button>
            </div>
        </div>
    );
}
