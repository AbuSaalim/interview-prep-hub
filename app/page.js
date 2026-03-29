"use client";
import { motion } from "framer-motion";
import { TerminalSquare, Rocket, Code2, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  // Framer Motion Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden w-full">
      
      {/* 1. Unnecessary but Cool Background Animations (Floating Neon Orbs) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10"
      />

      {/* 2. Main Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-center z-10 max-w-3xl px-4"
      >
        {/* Floating Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Zap size={16} className="text-yellow-400" />
            <span>Interview Preparation Vault</span>
          </div>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600 mb-6 tracking-tight">
          Master React.js <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            Like a Pro.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          Mera personal knowledge base. Yaha maine React ke saare core concepts, hooks, aur state management ke topics ko clear kiya hai. Live code edit kar, revise kar, aur interview phod de.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/topics/use-state">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors cursor-pointer"
            >
              <Rocket size={20} />
              Start Exploring
            </motion.button>
          </Link>
          
          <Link href="https://github.com" target="_blank">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors cursor-pointer"
            >
              <Code2 size={20} />
              View Source
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* 3. Floating Feature Cards (Unnecessary but Premium) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 z-10 max-w-4xl px-4 w-full"
      >
        {[
          { title: "Live Code Editor", desc: "Browser me direct code edit aur test kar.", icon: <TerminalSquare className="text-blue-400 mb-3" size={28} /> },
          { title: "Dark & Sleek", desc: "Aankhon ko aaram dene wala VS Code jaisa UI.", icon: <Zap className="text-purple-400 mb-3" size={28} /> },
          { title: "Structured Notes", desc: "To-the-point definitions aur exact output.", icon: <Code2 className="text-green-400 mb-3" size={28} /> }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -10, border: "1px solid rgba(59, 130, 246, 0.4)" }}
            className="bg-[#0f1117]/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center cursor-default transition-colors"
          >
            {feature.icon}
            <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}