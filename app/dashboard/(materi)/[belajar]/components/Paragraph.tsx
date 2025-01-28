"use client"
import { marked } from 'marked';
import Link from 'next/link';
import { useState } from 'react';
import { MdClose, MdMenuOpen } from 'react-icons/md';
import { PiExam } from 'react-icons/pi';

export const MarkdownToHtml = ({ markdown }: { markdown: string }) => {
  const htmlContent = marked(markdown);

  return (
    <div
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      role="document"  // Ensures the content is identified as a document
      aria-live="polite"  // Helps screen readers announce updates to the content
    />
  );
};

export default function SideNav({
  activeSection,
  onNavigate,
  materi
}: {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  materi: any;
}) {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the menu visibility

  const content = {
    1: "Pengertian",
    2: "Dalil Naqli",
    3: "Bentuk-Bentuk",
    4: "Keutamaan",
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the visibility of the sidebar
  };

  return (
    <>
     <button
        onClick={toggleMenu}
        className={`fixed bottom-4 left-4 z-50 flex items-center gap-3 p-3 text-white rounded-lg shadow-lg transition-all md:hidden ${
          isOpen ? "bg-red-500" : "bg-green-500"
        }`}
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        aria-expanded={isOpen}
      >
        <h2 id="side-nav-heading" className="text-3xl font-bold">
          {isOpen ? <MdClose className="size-10" /> : <MdMenuOpen className="size-10" />}
        </h2>
    </button>
    <aside
      className={`md:m-10 p-5 fixed w-full h-screen top-14 z-30 bg-white dark:bg-slate-900 md:block md:w-[300px] transition-all ${!isOpen? 'hidden' : 'block'}`}
      aria-labelledby="side-nav-heading"
    >      

      <h2 id="side-nav-heading" className="text-2xl font-bold mb-6">{materi.title}</h2>
      <nav aria-label="Side navigation links">
        <ul className='ml-6'>
          {Object.entries(content).map(([key, value]) => {
            const sectionId = `section-${key}`;
            return (
              <li key={key} className="mb-4">
                <button
                  className={`text-lg ${
                    activeSection === sectionId ? "text-green-500 font-bold" : "hover:text-green-500"
                  }`}
                  aria-label={`Go to section: ${value}`}
                  onClick={() => {
                    setIsOpen(false)
                    onNavigate(sectionId)
                  }
                  }
                >
                  {value}
                </button>
              </li>
            );
          })}
        </ul>
        <Link
          prefetch={false}
          href={`/dashboard/${materi.slug}/${materi.quizId}`}
          className="flex items-center gap-2 mt-3 justify-center p-3 rounded text-center bg-green-400 hover:bg-green-500 text-black font-bold text-lg w-full md:w-fit"
          aria-label={`Start quiz for ${materi.title}`}
        >
          <PiExam className="w-6 h-6" aria-hidden="true" />
          Uji Pemahamanmu!
        </Link>
      </nav>
    </aside>

    {/* desktop */}
    <aside className="md:m-10 p-5 md:fixed md:top-10 hidden md:block" aria-labelledby="side-nav-heading">
      <h2 id="side-nav-heading" className="text-2xl font-bold mb-6">Navigasi</h2>
      <nav aria-label="Side navigation links">
        <ul>
          {Object.entries(content).map(([key, value]) => {
            const sectionId = `section-${key}`;
            return (
              <li key={key} className="mb-4">
                <button
                  className={`text-lg ${
                    activeSection === sectionId ? "text-green-500 font-bold" : "hover:text-green-500"
                  }`}
                  aria-label={`Go to section: ${value}`}
                  onClick={() => onNavigate(sectionId)}
                >
                  {value}
                </button>
              </li>
            );
          })}
        </ul>
        <Link
          prefetch={false}
          href={`/dashboard/${materi.title}/${materi.quizId}`}
          className="flex items-center gap-2 justify-center p-3 rounded text-center bg-green-400 hover:bg-green-500 text-black font-bold text-lg w-full md:w-fit"
          aria-label={`Start quiz for ${materi.title}`}
        >
          <PiExam className="w-6 h-6" aria-hidden="true" />
          Uji Pemahamanmu!
        </Link>
      </nav>
    </aside>
    </>
  );
}

