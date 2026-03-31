"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, FileText, Folder } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  // Sidebar by default kisi folder ko open nahi rakhega
  const [openCategory, setOpenCategory] = useState(null); 
  const [menuItems, setMenuItems] = useState({ files: [], folders: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Database se topics lana aur sort karna
  useEffect(() => {
    const fetchSidebarLinks = async () => {
      try {
        const res = await fetch("/api/topics");
        const json = await res.json();
        
        if (json.success) {
          const rootItems = [];
          const folderItems = [];

          json.data.forEach((topic) => {
            const linkObj = { name: topic.title, href: `/topics/${topic.slug}` };

            // Agar category field khali hai, toh ye Direct File hai
            if (!topic.category || topic.category.trim() === "") {
              rootItems.push(linkObj);
            } else {
              // Agar category hai, toh usko Folder me daalo
              const existingFolderIndex = folderItems.findIndex(f => f.title === topic.category);
              if (existingFolderIndex > -1) {
                folderItems[existingFolderIndex].links.push(linkObj);
              } else {
                folderItems.push({ title: topic.category, links: [linkObj] });
              }
            }
          });

          setMenuItems({ files: rootItems, folders: folderItems });
        }
      } catch (error) {
        console.error("Sidebar fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSidebarLinks();
  }, []);

  const toggleCategory = (categoryTitle) => setOpenCategory(openCategory === categoryTitle ? null : categoryTitle);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-black/50 backdrop-blur-lg border-b border-white/10 text-white p-4 fixed top-0 w-full z-[60]">
        <Link href="/" className="font-bold text-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" onClick={() => setIsOpen(false)}>
          PrepHub
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white transition-all active:scale-90">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      {/* Desktop & Animated Sidebar */}
      <motion.div initial={false} animate={{ x: isOpen ? 0 : -320 }} transition={{ type: "spring", stiffness: 250, damping: 30 }} className="fixed top-0 left-0 h-screen w-[80vw] max-w-[320px] md:w-80 bg-[#050505] text-gray-300 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.8)] border-r border-white/5 flex flex-col pt-20 md:pt-0">
        
        {/* Header */}
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <Link href="/" className="cursor-pointer transition-transform hover:scale-105 hover:brightness-125">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-wide">
              PrepHub
            </h1>
          </Link>
        </div>

        {/* Dynamic Links List */}
        <div className="p-5 overflow-y-auto h-full pb-24 space-y-3 custom-scrollbar">
          {isLoading ? (
             <div className="text-center text-gray-500 text-sm mt-10 animate-pulse">Loading Topics...</div>
          ) : (menuItems.files.length === 0 && menuItems.folders.length === 0) ? (
             <div className="text-center text-gray-500 text-sm mt-10">No topics found. Add from Admin!</div>
          ) : (
            <>
              {/* 1. DIRECT FILES (Root Level) */}
              {menuItems.files.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={`file-${idx}`}
                    href={link.href}
                    onClick={() => { if (window.innerWidth < 768) setIsOpen(false); }}
                    className={`relative p-3 rounded-xl text-[14px] font-bold flex items-center cursor-pointer overflow-hidden group transition-all ${isActive ? "text-blue-400 bg-blue-500/10 border border-blue-500/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <FileText size={18} className={isActive ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400 transition-colors"} />
                      {link.name}
                    </span>
                  </Link>
                );
              })}

              {/* Separator Line (Agar Files aur Folders dono present hain toh line dikhegi) */}
              {menuItems.files.length > 0 && menuItems.folders.length > 0 && (
                <div className="border-t border-white/5 my-4"></div>
              )}

              {/* 2. FOLDERS WITH DROPDOWNS */}
              {menuItems.folders.map((category, idx) => (
                <div key={`folder-${idx}`} className="mb-2">
                  <button onClick={() => toggleCategory(category.title)} className="flex items-center justify-between w-full p-3 text-sm font-bold text-gray-300 hover:text-white rounded-xl transition-colors cursor-pointer group bg-white/[0.02] border border-transparent hover:border-white/10 hover:bg-white/5">
                    <span className="flex items-center gap-3 transition-all">
                      <Folder size={18} className={openCategory === category.title ? "text-blue-500" : "text-gray-500 group-hover:text-blue-400"} />
                      {category.title}
                    </span>
                    <motion.div animate={{ rotate: openCategory === category.title ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={18} className={openCategory === category.title ? "text-blue-500" : "text-gray-500"} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openCategory === category.title && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="flex flex-col space-y-1 pl-5 pr-2 mt-2 border-l border-white/10 ml-5">
                          {category.links.map((link, linkIdx) => {
                            const isActive = pathname === link.href;
                            return (
                              <Link key={linkIdx} href={link.href} onClick={() => { if (window.innerWidth < 768) setIsOpen(false); }} className={`relative p-2.5 rounded-lg text-[14px] flex items-center cursor-pointer overflow-hidden transition-all ${isActive ? "text-blue-400 font-semibold" : "text-gray-400 hover:text-gray-200"}`}>
                                {isActive && <motion.div layoutId="activeTabSidebar" className="absolute inset-0 bg-blue-500/10 border-l-2 border-blue-500" initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                                <span className="relative z-10 pl-2">{link.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}