import connectDB from "../../../lib/mongodb";
import Topic from "../../../models/Topic";
import LiveEditor from "../../../components/LiveEditor";

export default async function TopicPage({ params }) {
  const { topic } = await params;

  // Database se connection aur data fetch
  await connectDB();
  const dbData = await Topic.findOne({ slug: topic }).lean(); 

  // Agar topic DB me nahi mila
  if (!dbData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        <span className="text-6xl drop-shadow-lg">🫥</span>
        <h2 className="text-2xl text-gray-500 font-semibold">Bhai, ye topic abhi DB me nahi hai!</h2>
        <p className="text-gray-600 text-sm">Admin panel me jaake isko fatak se add kar de.</p>
      </div>
    );
  }

  return (
    // Container width ko max-w-4xl se badhakar max-w-7xl (ekdum wide) kar diya
    <div className="max-w-7xl mx-auto pb-12 px-2 sm:px-6">
      
      {/* Top Header Section */}
      <div className="mb-10 border-b border-white/5 pb-8 mt-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold tracking-widest uppercase mb-5 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          {dbData.category || "General Concept"}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight drop-shadow-sm">
          {dbData.title}
        </h1>
      </div>
      
      {/* Info Cards Grid (Side-by-side on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
       
    {/* Definition Card */}
<div className="bg-[#0f1117] p-8 rounded-2xl shadow-xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-300 md:col-span-2">
  <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/10"></div>
  
  <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-3">
    <span className="text-purple-400 bg-purple-500/10 p-2 rounded-xl">⚡</span> Definition
  </h3>
  
{/* 👇 BRAHMASTRA: dangerouslySetInnerHTML 👇 */}
  <div 
    className="text-gray-300 leading-[1.8] text-[16px]" 
    dangerouslySetInnerHTML={{ 
      __html: dbData.definition
        ? dbData.definition
            /* Yahan 2 <br/> ki jagah sirf 1 <br/> kar diya, spacing ekdum perfect aayegi */
            .replace(/(\d+\.)/g, '<br/><span class="text-purple-400 font-bold text-[18px]">$1</span>') 
            /* Start me agar extra gap aa jaye toh usko hata degi */
            .replace(/^(<br\/>)+/, '') 
        : "Definition not available."
    }} 
  />
</div>
        {/* Why We Use Card */}
        {dbData.whyWeUse && (
          <div className="bg-gradient-to-br from-blue-900/10 to-[#0f1117] p-8 rounded-2xl shadow-xl border border-blue-500/20 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-blue-500/20"></div>
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-3 relative z-10">
              <span className="text-blue-400 bg-blue-500/10 p-2 rounded-xl">💡</span> Why We Use?
            </h3>
            <p className="text-blue-200/70 text-[16px] leading-relaxed relative z-10">{dbData.whyWeUse}</p>
          </div>
        )}
      </div>

      {/* Huge Live Coding Section */}
      {dbData.codeExample && (
        <div className="w-full">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl text-sm border border-emerald-500/20">{'</>'}</span> 
              Interactive Playground
            </h3>
            <span className="text-xs font-bold px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 hidden sm:block tracking-wide">
              Live Editor & Console
            </span>
          </div>
          
          {/* Wrapper for Sandpack with a premium glowing border effect */}
          <div className="rounded-2xl p-[1.5px] bg-gradient-to-b from-white/10 via-white/5 to-transparent shadow-[0_0_60px_rgba(0,0,0,0.4)] hover:shadow-[0_0_80px_rgba(59,130,246,0.15)] transition-shadow duration-500">
            <div className="rounded-xl overflow-hidden bg-[#0f1117]">
              <LiveEditor code={dbData.codeExample} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}