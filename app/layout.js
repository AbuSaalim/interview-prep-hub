import { Inter } from "next/font/google";
import "./globals.css";
import AppLayout from "../components/AppLayout"; 
// 1. AuthProvider ko import kiya
import { AuthProvider } from "./context/AuthContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PrepHub - Salim's Interview Preparation",
  description: "Personal revision dashboard for coding interview topics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0f1117] text-gray-200 antialiased`}>
        {/* 2. Sabse upar AuthProvider lagaya taaki auth state har jagah mile */}
        <AuthProvider>
          {/* 3. Phir AppLayout (Sidebar + Header) */}
          <AppLayout>
            {children}
          </AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}