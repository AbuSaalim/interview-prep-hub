"use client";

import { Sandpack } from "@codesandbox/sandpack-react";

export default function LiveEditor({ code }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800 mt-4">
      <Sandpack
        template="react" // React environment setup kar dega automatically
        theme="dark"     // Ekdum mast dark theme
        files={{
          // Apun apna mock data ka code seedha App.js me pass kar rahe hai
          "/App.js": code,
        }}
        options={{
          showLineNumbers: true,
          showInlineErrors: true, // Agar tu code me galti karega toh wahi red line dikhayega
          wrapContent: true,
          editorHeight: 700, // Editor ki height
          
          // 👇 BAS YE DO LINES ADD KI HAIN CONSOLE KE LIYE 👇
          showConsole: true,         // Console panel ko default open rakhega
          showConsoleButton: true,   // Niche ek button dega jisse user console hide/show kar sake
        }}
      />
    </div>
  );
}