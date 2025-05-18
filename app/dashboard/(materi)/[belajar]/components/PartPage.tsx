"use client";

import { useState } from "react";
import SideNav from "./Paragraph";
import ClientSideContent from "./ClientSideContent";

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
      <main className="w-full md:flex">
        {/* Navigasi di sisi kiri */}
        <SideNav materi={materi} activeSection={activeSection} onNavigate={handleNavigation} />
        {/* Konten dengan navigasi arrow */}
        <ClientSideContent 
          activeSection={activeSection} 
          materi={materi}
          onNavigate={handleNavigation}
          quiz={materi}
        />
      </main>
    );
  }
