"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: "", category: "React Hooks", definition: "", whyWeUse: "", codeExample: ""
  });

  if (loading) return <div className="p-10 text-white">Loading Auth...</div>;
  if (!user?.isAdmin) return <div className="p-10 text-red-500">Bhai tu Admin nahi hai! Nikal yaha se.</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Saving to MongoDB...", formData);
    // Yaha hum api call karenge
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">Admin Panel: Add New Hook</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" placeholder="Title (e.g. useState)" 
            className="bg-black border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <select 
            className="bg-black border border-white/10 p-3 rounded-xl outline-none"
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option>React Hooks</option>
            <option>Core Concepts</option>
            <option>Advanced</option>
          </select>
        </div>
        
        <textarea 
          placeholder="Definition" 
          className="w-full bg-black border border-white/10 p-3 rounded-xl h-32 outline-none focus:border-blue-500"
          onChange={(e) => setFormData({...formData, definition: e.target.value})}
        ></textarea>

        <textarea 
          placeholder="Code Example" 
          className="w-full bg-black border border-white/10 p-3 rounded-xl h-48 font-mono outline-none focus:border-blue-500"
          onChange={(e) => setFormData({...formData, codeExample: e.target.value})}
        ></textarea>

        <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
          Save to MongoDB 🚀
        </button>
      </form>
    </motion.div>
  );
}