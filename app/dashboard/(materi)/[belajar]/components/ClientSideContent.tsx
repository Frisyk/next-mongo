"use client";

import { useState, useEffect } from "react";
import { MarkdownToHtml } from "./Paragraph";
import Image from "next/image";
import { MdArrowBack, MdArrowForward, MdClose, MdMenu } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function ClientSideContent({
  activeSection,
  materi,
  onNavigate,
  quiz
}: {
  activeSection: string;
  materi: any;
  onNavigate: (sectionId: string) => void;
  quiz: any;
}) {
  const [showNavigation, setShowNavigation] = useState(true);
  let content = "";
  const router = useRouter();

  // Inisialisasi submateri
  const sections = {
    "section-1": { id: "section-1", title: "Pengertian", content: materi.understanding },
    "section-2": { id: "section-2", title: "Dalil Naqli", content: materi.arguments },
    "section-3": { id: "section-3", title: "Bentuk-Bentuk", content: materi.forms },
    "section-4": { id: "section-4", title: "Keutamaan", content: materi.values }
  };

  type SectionKey = keyof typeof sections;

  // Menentukan konten yang ditampilkan berdasarkan section yang aktif
  content = sections[activeSection as SectionKey]?.content || materi.understanding;

  // Mendapatkan indeks section aktif
  const currentSectionNumber = parseInt(activeSection.split("-")[1]);
  
  // Fungsi untuk mendapatkan section key dari nomor section
  const getSectionKey = (num: number): SectionKey => {
    return `section-${num}` as SectionKey;
  };
  
  // Navigasi ke section sebelumnya
  const navigateToPrevious = () => {
    if (currentSectionNumber > 1) {
      onNavigate(`section-${currentSectionNumber - 1}`);
    }
  };
  
  // Navigasi ke section selanjutnya
  const navigateToNext = () => {
    if (currentSectionNumber < Object.keys(sections).length) {
      onNavigate(`section-${currentSectionNumber + 1}`);
    }
    if (currentSectionNumber >= Object.keys(sections).length) {
      router.push(`/dashboard/${quiz.title}/${quiz.quizId}`);
    }
  };

  // Toggle tampilan navigasi
  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  // Mendapatkan title dari section sebelumnya jika ada
  const getPreviousSectionTitle = (): string => {
    if (currentSectionNumber <= 1) return '';
    return sections[getSectionKey(currentSectionNumber - 1)]?.title || '';
  };

  // Mendapatkan title dari section selanjutnya jika ada
  const getNextSectionTitle = (): string => {
    if (currentSectionNumber >= Object.keys(sections).length) return '';
    return sections[getSectionKey(currentSectionNumber + 1)]?.title || '';
  };

  return (
    <div className="w-full md:w-1/2 mx-auto rounded-lg px-5 md:px-0 relative">
      

      
      {/* Konten materi */}
      {content ? (
        <section
          id={activeSection}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 mb-10"
        >
          <Image
            alt={`Gambar untuk ${materi.title}`}
            className="mx-auto md:h-[400px] rounded-xl p-3 object-contain my-5"
            height="1000"
            src={materi.img}
            width="1000"
            role="img"
          />
          {/* <h2 className="text-2xl font-bold mb-4 text-green-500">
            {sections[activeSection as SectionKey]?.title}
          </h2> */}
          <MarkdownToHtml markdown={content} />
        </section>
      ) : (
        <p className="text-gray-500">Pilih bagian untuk menampilkan konten.</p>
      )}

      {/* Navigasi bawah untuk mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 py-3 px-4 flex justify-between items-center md:hidden z-20 border-t dark:border-gray-800">
        <button
          onClick={navigateToPrevious}
          disabled={currentSectionNumber <= 1}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            currentSectionNumber <= 1 
            ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400" 
            : "bg-green-500 text-white"
          }`}
        >
          <MdArrowBack />
          <span>Sebelumnya</span>
        </button>
        
        <div className="font-bold text-sm">
          {currentSectionNumber}/{Object.keys(sections).length}
        </div>
        
        <button
          onClick={navigateToNext}
        //   disabled={currentSectionNumber >= Object.keys(sections).length}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            currentSectionNumber >= Object.keys(sections).length 
            ? "bg-blue-500 text-white" 
            : "bg-green-500 text-white"
          }`}
        >
          <span>{currentSectionNumber >= Object.keys(sections).length ? "✨Uji Pemahaman" : "Selanjutnya"}</span>
          <MdArrowForward />
        </button>
      </div>
    </div>
  );
} 