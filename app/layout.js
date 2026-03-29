import { Inter } from "next/font/google";
import "./globals.css";
import AppLayout from "../components/AppLayout"; // Naya component import kiya

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PrepHub - Salim's Interview Preparation",
  description: "Personal revision dashboard for coding interview topics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0f1117] text-gray-200 antialiased`}>
        {/* Pura app ab is wrapper ke andar chalega */}
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}