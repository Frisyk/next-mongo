import Image from "next/image";
import Link from "next/link";
import hero from "../public/assets/hero.png";
import { HomeIcon } from "@/components/ui/icons";
import { LogIn } from "lucide-react";
import HomeNav from "@/components/HomeNav";

export default function Home() {
  return <HomeComponent />;
}

function HomeComponent() {
  return (
    <main className="relative w-full min-h-screen flex flex-col md:gap-20 bg-gradient-to-bl from-slate-900 via-slate-950 to-slate-900">
      <section className="flex justify-between mr-5">
        <h1 className="text-2xl p-5 font-bold text-white">Batik.</h1>
        <Link href="/login" className="flex gap-2 mt-4 px-6 py-3 max-w-xs text-center text-xl font-semibold text-white bg-slate-900 rounded-xl ring-1 shadow-lg hover:bg-slate-800 transition-colors">
          <LogIn/> Login
        </Link>
      </section>
      <section className="relative z-20 mx-auto flex flex-col w-4/5 items-center text-center p-8 md:p-12 gap-5 rounded-3xl">
        <h1 className="text-2xl md:text-6xl uppercase font-bold text-white leading-snug md:leading-relaxed">
          Belajar Akhlak📑 <br /> dengan Asik dan Menyenangkan🎯
        </h1>
        <h1 className="text-lg text-slate-400">&quot;Tidak sesuatu yang lebih berat dalam timbangan seorang mukmin kelak pada hari kiamat daripada akhlak yang baik. <br /> Sesungguhnya Allah amatlah murka terhadap seorang yang keji lagi jahat.&quot;<br /> HR. Tirmidzi</h1>
        <div className="flex flex-col md:flex-row gap-5 w-full items-center justify-center">
        <Link href="/dashboard" className="flex gap-2 mt-4 px-6 py-3 max-w-xs text-center text-xl font-semibold text-slate-900 bg-slate-50 border border-slate-900 rounded-xl shadow-lg hover:bg-slate-900 hover:text-white hover:ring-1 transition-colors items-center justify-between">
          <HomeIcon /> Halaman Utama
        </Link>
        <Link href="/login" className="flex gap-2 mt-4 px-6 py-3 max-w-xs text-center text-xl font-semibold text-white bg-slate-900 rounded-xl ring-1 shadow-lg hover:bg-slate-800 transition-colors">
          <LogIn/> Login
        </Link>

        </div>
      </section>
    </main>
  );
}
