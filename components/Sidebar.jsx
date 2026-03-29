"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState("React Hooks");

  const menuItems = [
    {
      title: "React Hooks",
      links: [
        { name: "useState", href: "/topics/use-state" },
        { name: "useEffect", href: "/topics/use-effect" },
        { name: "useContext", href: "/topics/use-context" },
      ],
    },
    {
      title: "Core Concepts",
      links: [
        { name: "Props", href: "/topics/props" },
        { name: "State vs Props", href: "/topics/state-vs-props" },
      ],
    },
  ];

  const toggleCategory = (categoryTitle) => setOpenCategory(openCategory === categoryTitle ? null : categoryTitle);

  return (
    <>
      {/* Mobile Top Bar - Isko z-[60] diya hai taaki ye sidebar ke hamesha upar rahe */}
      <div className="md:hidden flex items-center justify-between bg-black/50 backdrop-blur-lg border-b border-white/10 text-white p-4 fixed top-0 w-full z-[60]">
        <Link href="/" className="font-bold text-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" onClick={() => setIsOpen(false)}>
          React Js
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Animated Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
        // Yaha responsive width w-[80vw] aur mobile pe pt-20 add kiya hai
        className="fixed top-0 left-0 h-screen w-[80vw] max-w-[320px] md:w-80 bg-[#050505] text-gray-300 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.8)] border-r border-white/5 flex flex-col pt-20 md:pt-0"
      >
        {/* Sidebar Header (Desktop Only) */}
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <Link href="/" className="cursor-pointer transition-transform hover:scale-105 hover:brightness-125">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide">
              React Js
            </h1>
          </Link>
        </div>

        {/* Links */}
        <div className="p-5 overflow-y-auto h-full pb-24 space-y-3 custom-scrollbar">
          {menuItems.map((category, idx) => (
            <div key={idx} className="mb-2">
              <button
                onClick={() => toggleCategory(category.title)}
                className="flex items-center justify-between w-full p-3 text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-white rounded-lg transition-colors cursor-pointer group"
              >
                <span className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">{category.title}</span>
                <motion.div animate={{ rotate: openCategory === category.title ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={18} className={openCategory === category.title ? "text-blue-500" : ""} />
                </motion.div>
              </button>

              {/* Framer Motion Dropdown Magic */}
              <AnimatePresence>
                {openCategory === category.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col space-y-1 pl-3 pr-2 mt-2">
                      {category.links.map((link, linkIdx) => {
                        const isActive = pathname === link.href;
                        return (
                          <Link
                            key={linkIdx}
                            href={link.href}
                            onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                            className={`relative p-2.5 rounded-lg text-[15px] flex items-center cursor-pointer overflow-hidden group transition-colors ${
                              isActive ? "text-blue-400 font-semibold" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            {isActive && (
                              <motion.div 
                                layoutId="activeTab" 
                                className="absolute inset-0 bg-blue-500/10 border-l-2 border-blue-500" 
                                initial={false} 
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10 flex items-center">
                              <span className={`w-1.5 h-1.5 rounded-full mr-3 ${isActive ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" : "bg-gray-600 group-hover:bg-gray-400"}`}></span>
                              {link.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}