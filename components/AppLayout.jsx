"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import AdminSidebar from "./AdminSidebar"; // Naya component import kiya
import { Menu, LogIn, LogOut, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext"; 
import Link from "next/link";

export default function AppLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const { user, login, logout } = useAuth();
  
  const pathname = usePathname();
  // Check kar rahe hain ki kya route /admin se start hota hai
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="flex bg-[#000000] min-h-screen text-gray-200 font-sans selection:bg-blue-500/30">
      
      {/* Smart Sidebar Rendering */}
      {isAdminRoute ? (
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      <motion.main 
        layout
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
        className={`flex-1 min-h-screen flex flex-col ${isOpen ? "md:ml-80" : "md:ml-0"}`}
      >
        <header className="h-16 flex items-center justify-between px-6 sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex text-gray-400 hover:text-white bg-white/5 p-2 rounded-xl border border-white/10 cursor-pointer"
          >
            <Menu size={22} />
          </motion.button>

          <div className="flex items-center gap-4 ml-auto">
            
            {/* AGAR USER ADMIN HAI AUR WEBSITE PE HAI, TOH YE BUTTON DIKHEGA */}
            {user?.isAdmin && !isAdminRoute && (
              <Link href="/admin">
                <button className="hidden sm:flex items-center gap-2 bg-purple-600/20 border border-purple-500/50 hover:bg-purple-600/40 text-purple-400 px-4 py-1.5 rounded-lg text-sm font-bold transition-all cursor-pointer">
                  <ShieldAlert size={16} />
                  Admin Panel
                </button>
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xs font-bold text-white">{user.displayName}</span>
                  <span className="text-[10px] text-purple-400">{user.isAdmin ? "Admin" : "User"}</span>
                </div>
                <img src={user.photoURL} alt="profile" className="w-8 h-8 rounded-full border border-purple-500/50" />
                <button onClick={logout} className="p-2 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button onClick={login} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <LogIn size={18} />
                Login
              </button>
            )}
          </div>
        </header>

        <div className="p-6 md:p-10 lg:p-12 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </motion.main>
    </div>
  );
}