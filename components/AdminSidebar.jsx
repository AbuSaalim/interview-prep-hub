"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, PlusCircle, Database, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    // { name: "Add New Topic", href: "/admin/add", icon: <PlusCircle size={18} /> },
    // { name: "Manage Topics", href: "/admin/manage", icon: <Database size={18} /> },
    // { name: "Settings", href: "/admin/settings", icon: <Settings size={18} /> },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-black/80 backdrop-blur-lg border-b border-purple-500/30 text-white p-4 fixed top-0 w-full z-[60]">
        <Link href="/admin" className="font-bold text-xl flex items-center gap-2 text-purple-400">
          Admin Panel
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white transition-all">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Animated Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
        className="fixed top-0 left-0 h-screen w-[80vw] max-w-[320px] md:w-80 bg-[#0a0a0a] text-gray-300 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.8)] border-r border-purple-500/20 flex flex-col pt-20 md:pt-0"
      >
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-purple-500/20 bg-gradient-to-b from-purple-900/10 to-transparent">
          <Link href="/admin" className="cursor-pointer transition-transform hover:scale-105">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-wide">
              Admin Control
            </h1>
          </Link>
        </div>

        <div className="p-5 overflow-y-auto h-full space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Menu</p>
          {adminLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={idx}
                href={link.href}
                onClick={() => { if (window.innerWidth < 768) setIsOpen(false); }}
                className={`relative p-3 rounded-xl text-[15px] flex items-center gap-3 cursor-pointer overflow-hidden group transition-all ${
                  isActive ? "text-purple-400 font-bold bg-purple-500/10 border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.icon}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Back to Website Button */}
        <div className="p-5 border-t border-white/5">
          <Link href="/" className="flex items-center justify-center gap-2 w-full p-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-gray-300 transition-colors">
            ← Back to Website
          </Link>
        </div>
      </motion.div>
    </>
  );
}