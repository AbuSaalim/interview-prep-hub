"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function AppLayout({ children }) {
  // Ye state ab dono (Sidebar aur Main Content) ko control karegi
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex bg-[#0f1117] min-h-screen">
      
      {/* 1. Sidebar ko props pass kar diye */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* 2. Main Content Area - Yaha animation lagaya hai margin pe */}
      <main 
        className={`flex-1 transition-all duration-500 ease-in-out ${
          isOpen ? "md:ml-80" : "md:ml-0"
        } min-h-screen flex flex-col`}
      >
        {/* Desktop Top Header (Yaha tera naya Hamburger aayega) */}
        <header className="hidden md:flex h-16 items-center px-6 sticky top-0 z-40 bg-[#0f1117]/90 backdrop-blur-sm border-b border-gray-800">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer bg-[#1e2330] p-2 rounded-lg border border-gray-700 shadow-sm"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Content Area */}
        <div className="p-6 md:p-10 lg:p-12 mt-16 md:mt-0">
          {children}
        </div>
      </main>

    </div>
  );
}