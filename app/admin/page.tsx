'use client'
import { useState } from 'react';

export default function Home() {
  // State to hold the current content
  const [content, setContent] = useState("this is text container which can change based on the title whose user click");

  // Function to handle title click
  const handleTitleClick = (newContent: string) => {
    setContent(newContent);
  };

  return (
    // <div className="min-h-screen flex items-center justify-center">
    // <div className="flex flex-1 h-screen shadow-lg overflow-hidden">
    //   {/* Sidebar */}
    //   <div className="bg-blue-100 p-16 w-1/3 text-2xl font-bold flex flex-col gap-4 text-white">
    //     {[
    //       { title: "KISAH INSPIRATIF: Pemuda Ashabul Kahfi", color: "bg-blue-600 hover:bg-blue-700" },
    //       { title: "Membiasakan Perilaku Berani Membela Kebenaran", color: "bg-blue-600 hover:bg-blue-700" },
    //       { title: "Rangkuman", color: "bg-blue-400 hover:bg-blue-500" },
    //       { title: "KUIS", color: "bg-blue-600 hover:bg-blue-700" },
    //     ].map((item, index) => (
    //       <button
    //         key={index}
    //         onClick={() => handleTitleClick(`Content for ${item.title}`)}
    //         className={`${item.color} rounded p-10 text-left`}
    //       >
    //         {item.title}
    //       </button>
    //     ))}
    //   </div>
  
    //     {/* Content Area */}
    //     <div className="p-4 bg-blue-100 border w-full border-blue-400">
    //       <p className="text-black">{content}</p>
    //     </div>
    //   </div>
    // </div>
    <h1>Hi</h1>
  );
}
