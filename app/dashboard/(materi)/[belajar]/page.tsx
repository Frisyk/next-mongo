import { getDetailsM } from "@/lib/dal";
import Link from "next/link";
import Header from "./components/Header-Layout";

export default async function Page({ params }: { params: any }) {
    const materi = await getDetailsM(params.belajar)
    
    return (
        <div className="w-full min-h-screen">
            <Header link={'/dashboard'} title={materi.title} />
            <div className="p-6 w-full md:w-1/2 mx-auto rounded-lg">
                <h1 className="font-bold text-lg mb-4">{materi.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: materi.desc }} />
                 <br />
                <Link prefetch={false} href={`/dashboard/${materi.title}/${materi.quizId}`}
                    className="mt-4 inline-block text-blue-500 hover:underline"> Waktu nya Quiz!
                </Link>
            </div>
        </div>
    );
}
