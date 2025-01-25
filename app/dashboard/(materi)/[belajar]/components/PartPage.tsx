"use client";

import { useState } from "react";
import SideNav, { MarkdownToHtml } from "./Paragraph";
import Image from "next/image";

export default function MainPage({ imateri }: { imateri: any }) {
    const [activeSection, setActiveSection] = useState<string>("section-1"); // Default aktif
    const materi = JSON.parse(imateri)
    const handleNavigation = (sectionId: string) => {
      setActiveSection(sectionId);
  
      // Scroll ke bagian tersebut (opsional)
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    return (
      <main className="w-full flex">
        {/* Navigasi di sisi kiri */}
        <SideNav materi={materi} activeSection={activeSection} onNavigate={handleNavigation} />
        {/* Konten hanya untuk bagian aktif */}
        <ClientSideContent activeSection={activeSection} materi={materi} />
      </main>
    );
  }

function ClientSideContent({
  activeSection,
  materi,
}: {
  activeSection: string;
  materi: any;
}) {
  let content = ""; // Initialize an empty content variable

  // Use if-else to determine which content to display
  if (activeSection === "section-1") {
    content = materi.understanding;
  } else if (activeSection === "section-2") {
    content = materi.arguments;
  } else if (activeSection === "section-3") {
    content = materi.forms;
  } else if (activeSection === "section-4") {
    content = materi.values;
  } else {
    content = materi.understanding; // Handle cases where the activeSection doesn't match
  }

  return (
    <div className="w-full md:w-1/2 mx-auto rounded-lg px-5 md:px-0">
        {
            activeSection === "section-1" && (
            <Image
                alt={`Image for ${materi.title}`}  // Descriptive alt text
                className="mx-auto md:h-[400px] rounded-xl p-3 object-contain my-5"
                height="1000"
                src={materi.img}
                width="1000"
                role="img"
            />
            )
        }
      {content ? (
        <section
          id={activeSection}
          className=" bg-gray-100 dark:bg-gray-800 rounded-lg p-5"
        >
          <MarkdownToHtml markdown={content} />
        </section>
      ) : (
        <p className="text-gray-500">Pilih bagian untuk menampilkan konten.</p>
      )}
    </div>
  );
}
