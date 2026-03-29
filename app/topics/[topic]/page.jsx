import { mockData } from "../../../data/mockData";
// Purana SyntaxHighlighter hata ke apna naya component import kar liya
import LiveEditor from "../../../components/LiveEditor";

export default async function TopicPage({ params }) {
  const { topic } = await params;
  const data = mockData[topic];

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-2xl text-gray-500 font-semibold">
          Bhai, ye topic abhi add nahi kiya hai!
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* 1. Breadcrumb */}
      <div className="text-xs font-bold text-blue-400 mb-4 tracking-widest uppercase opacity-80">
        {data.breadcrumb}
      </div>

      {/* 2. Topic Title / Definition */}
      <h1 className="text-3xl font-extrabold text-white mb-6 tracking-tight">{data.title}</h1>
      <div className="bg-[#1e2330] p-6 rounded-xl shadow-md border border-gray-800 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
          <span className="text-blue-400">⚡</span> Definition
        </h3>
        <p className="text-gray-300 leading-relaxed text-[15px]">{data.definition}</p>
      </div>

      {/* 3. Why We Use */}
      <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-xl rounded-l-sm mb-8">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">Why We Use?</h3>
        <p className="text-blue-100/80 text-[15px] leading-relaxed">{data.whyWeUse}</p>
      </div>

      {/* 4. Key Points */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-5">Key Points</h3>
        <ul className="space-y-4">
          {data.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start bg-[#161b22] p-4 rounded-lg border border-gray-800/50">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold mr-4 mt-0.5">
                ✓
              </span>
              <span className="text-gray-300 text-[15px] leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Live Interactive Coding Example */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Live Code Editor & Output</h3>
        <p className="text-gray-400 text-sm mb-4">
          Niche diye gaye code ko edit kar aur right side me live changes dekh:
        </p>
        
        {/* Yaha apna naya Live Editor call ho raha hai */}
        <LiveEditor code={data.codeExample} />
      </div>

    </div>
  );
}