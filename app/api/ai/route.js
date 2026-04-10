import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt, type } = await req.json();

    // API Key validation
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { success: false, message: "Gemini API key is missing in .env.local" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 👇 BAS YAHAN MODEL KA NAAM CHANGE KIYA HAI 👇
   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let refinedPrompt = "";

    // Agar Code Generate karna hai
    if (type === "codeExample") {
      refinedPrompt = `You are an expert React developer. Write a clean, well-commented React code example for: "${prompt}". 
      IMPORTANT: Only provide the pure React code. Do not include markdown formatting like \`\`\`javascript or any explanation text. Just the code.`;
    } 
    // Agar Definition Generate karni hai
    else {
      refinedPrompt = `You are a technical mentor preparing a student for a MERN stack interview. Explain the topic: "${prompt}".
      Format the answer in exactly 4 to 6 numbered points. Keep each point concise, clear, and easy to understand. Do not use markdown like **bold**, just raw text with numbers (e.g., 1. ... 2. ...).`;
    }

    const result = await model.generateContent(refinedPrompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({ success: true, text: text });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return Response.json(
      { success: false, message: "Bhai AI thak gaya hai, baad me try kar!" },
      { status: 500 }
    );
  }
}