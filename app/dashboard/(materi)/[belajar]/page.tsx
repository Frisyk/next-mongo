import Link from "next/link";

const text = `
<h2 class="font-bold text-lg mb-4">3 Kata Ajaib: Terima Kasih, Maaf, dan Tolong</h2>

<p class="mb-4">Dalam kehidupan sehari-hari, ada tiga kata sederhana namun penuh makna yang bisa membawa perubahan besar dalam interaksi sosial kita. Kata-kata tersebut adalah "Terima Kasih," "Maaf," dan "Tolong." Meskipun terdengar sederhana, penggunaan kata-kata ini bisa mencerminkan kepribadian, kepedulian, dan rasa hormat kita terhadap orang lain.</p>

<h3 class="font-semibold mt-4 mb-2">1. Terima Kasih</h3>
<p class="mb-4">Mengucapkan "Terima Kasih" adalah bentuk penghargaan atas apa yang telah orang lain lakukan untuk kita. Kata ini menunjukkan bahwa kita menghargai usaha, bantuan, atau kebaikan yang diberikan. Mengucapkan terima kasih bukan hanya sekadar sopan santun, tetapi juga bisa memperkuat hubungan sosial, menumbuhkan rasa saling menghargai, dan menciptakan lingkungan yang positif.</p>

<h3 class="font-semibold mt-4 mb-2">2. Maaf</h3>
<p class="mb-4">Kata "Maaf" adalah ungkapan penyesalan ketika kita melakukan kesalahan atau melukai perasaan orang lain, baik secara sengaja maupun tidak. Mengakui kesalahan dan meminta maaf memerlukan keberanian dan kerendahan hati, tetapi ini adalah langkah penting untuk memperbaiki hubungan. Dengan mengucapkan maaf, kita menunjukkan rasa tanggung jawab atas tindakan kita dan menghormati perasaan orang lain.</p>

<h3 class="font-semibold mt-4 mb-2">3. Tolong</h3>
<p class="mb-4">"Tolong" adalah kata yang mengandung permintaan dengan penuh hormat. Ketika kita meminta bantuan kepada orang lain, menambahkan kata "Tolong" menunjukkan bahwa kita menghargai bantuan yang akan diberikan. Ini juga mencerminkan sikap rendah hati dan kesadaran bahwa kita tidak bisa melakukan segalanya sendiri.</p>

<p class="mt-6">Ketiga kata ini—"Terima Kasih," "Maaf," dan "Tolong"—adalah kata-kata ajaib yang bisa membuka hati dan mempererat hubungan kita dengan orang lain.</p>
`;

export default function Page({ params }: { params: any }) {
    return (
        <div className="p-6 dark:dark w-full md:w-1/2 mx-auto rounded-lg shadow-lg ">
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <Link href={'/dashboard'}
                 className="mt-4 inline-block text-blue-500 hover:underline"> Back
            </Link> <br />
            <Link href={`/dashboard/${params.belajar}/tes`}
                 className="mt-4 inline-block text-blue-500 hover:underline"> Waktu nya Quiz!
            </Link>
        </div>
    );
}
