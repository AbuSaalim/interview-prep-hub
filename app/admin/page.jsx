"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext"; // Path check kar lena
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus, List } from "lucide-react";
// 1. TOAST IMPORT KIYA
import toast from "react-hot-toast";

export default function AdminPage() {
  const { user, loading } = useAuth();
  
  const [activeTab, setActiveTab] = useState("manage"); 
  const [topics, setTopics] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null); 
  const [existingFolders, setExistingFolders] = useState([]); 

  const initialForm = { title: "", category: "", definition: "", whyWeUse: "", codeExample: "" };
  const [formData, setFormData] = useState(initialForm);

  const fetchTopics = async () => {
    const res = await fetch("/api/topics");
    const json = await res.json();
    if (json.success) {
      setTopics(json.data);
      const uniqueFolders = [...new Set(json.data.map(t => t.category).filter(c => c && c.trim() !== ""))];
      setExistingFolders(uniqueFolders);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  if (loading) return <div className="p-10 text-white">Loading Auth...</div>;
  if (!user?.isAdmin) return <div className="p-10 text-red-500 font-bold text-xl">Bhai tu Admin nahi hai! Nikal yaha se.</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Naya toast loading state ke liye
    const toastId = toast.loading("Processing...");
    
    try {
      const url = editId ? `/api/topics/${editId}` : "/api/topics";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const response = await res.json();

      if (response.success) {
        // ALERT KI JAGAH TOAST SUCCESS
        toast.success(editId ? "Topic mast Update ho gaya! 🔥" : "Naya Topic Save ho gaya! 🚀", { id: toastId });
        setFormData(initialForm);
        setEditId(null);
        setActiveTab("manage");
        fetchTopics(); 
      } else {
        // ALERT KI JAGAH TOAST ERROR
        toast.error(response.message, { id: toastId });
      }
    } catch (error) {
      toast.error("API call fail ho gayi bhai!", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler with Custom Toast
  const handleDelete = (id) => {
    // Custom Toast jisme UI (JSX) pass kar rahe hain
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-gray-200">
            ⚠️ Bhai sach me delete karna hai? Ye wapas nahi aayega!
          </span>
          <div className="flex justify-end gap-2 mt-2">
            {/* Cancel Button */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-xs font-bold transition-all"
            >
              Cancel
            </button>
            {/* Confirm Delete Button */}
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Pehle is warning wale toast ko band karo
                const loadingToast = toast.loading("Deleting..."); // Loading state dikhao
                
                try {
                  await fetch(`/api/topics/${id}`, { method: "DELETE" });
                  fetchTopics(); // Table refresh karo
                  toast.success("Topic khatam! 🗑️", { id: loadingToast });
                } catch (error) {
                  toast.error("Delete fail ho gaya bhai!", { id: loadingToast });
                }
              }}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(220,38,38,0.5)]"
            >
              Haan, Utha Le!
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Jab tak user click na kare, warning band nahi hogi
        position: "top-center", // Upar center me mast dikhega
        style: {
          background: '#1e2330',
          border: '1px solid rgba(239, 68, 68, 0.3)', // Reddish border for warning
        }
      }
    );
  };
  const handleEditClick = (topic) => {
    setFormData(topic);
    setEditId(topic._id);
    setActiveTab("form");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto p-6 text-white">
      
      {/* Top Header & Tabs */}
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Admin Dashboard
        </h1>
        <div className="flex gap-2 bg-[#111] p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => { setActiveTab("manage"); setEditId(null); setFormData(initialForm); }} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "manage" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
          >
            <List size={16} /> Manage Topics
          </button>
          <button 
            onClick={() => { setActiveTab("form"); setEditId(null); setFormData(initialForm); }} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "form" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
          >
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      {/* ================= MANAGE TOPICS (TABLE) ================= */}
      {activeTab === "manage" && (
        <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Category (Folder)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topics.length === 0 ? (
                <tr><td colSpan="3" className="p-6 text-center text-gray-500">Koi topic nahi mila. Naya add kar bhai!</td></tr>
              ) : (
                topics.map((topic) => (
                  <tr key={topic._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-blue-400">{topic.title}</td>
                    <td className="p-4">
                      {topic.category ? (
                        <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30">
                          {topic.category}
                        </span>
                      ) : (
                        <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-xs border border-gray-500/30">
                          📄 Direct File
                        </span>
                      )}
                    </td>
                    <td className="p-4 flex justify-end gap-3">
                      <button onClick={() => handleEditClick(topic)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-all">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(topic._id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ADD / EDIT FORM ================= */}
      {activeTab === "form" && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-8 rounded-2xl border border-white/10 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 text-gray-300">
            {editId ? "✏️ Edit Topic" : "✨ Create New Topic"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Topic Title</label>
              <input 
                type="text" required placeholder="e.g., useState" 
                className="w-full bg-black border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 transition-colors text-white"
                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Folder / Category</label>
              <input 
                type="text" 
                placeholder="Folder name (Khali chhod de for direct file)" 
                list="folder-suggestions"
                className="w-full bg-black border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 transition-colors text-white"
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
              <datalist id="folder-suggestions">
                {existingFolders.map((folder, idx) => (
                  <option key={idx} value={folder} />
                ))}
              </datalist>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Definition</label>
            <textarea 
              required placeholder="Ye concept kya hai?" 
              className="w-full bg-black border border-white/10 p-3 rounded-xl h-24 outline-none focus:border-blue-500 text-white"
              value={formData.definition} onChange={(e) => setFormData({...formData, definition: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Live Code Example</label>
            <textarea 
              placeholder="Paste your React code here..." 
              className="w-full bg-black border border-white/10 p-3 rounded-xl h-48 font-mono text-sm outline-none focus:border-purple-500 text-emerald-400"
              value={formData.codeExample} onChange={(e) => setFormData({...formData, codeExample: e.target.value})}
            ></textarea>
          </div>

          <button disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50">
            {isSubmitting ? "Processing..." : (editId ? "Update Topic 💾" : "Save to Database 🚀")}
          </button>
        </form>
      )}

    </motion.div>
  );
}