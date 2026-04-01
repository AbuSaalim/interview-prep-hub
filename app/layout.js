import { Inter } from "next/font/google";
import "./globals.css";
import AppLayout from "../components/AppLayout"; 
// 1. AuthProvider ko import kiya
import { AuthProvider } from "./context/AuthContext"; 
// 2. Toaster ko import kiya (Naya add hua hai)
import { Toaster } from "react-hot-toast"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PrepHub - Salim's Interview Preparation",
  description: "Personal revision dashboard for coding interview topics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0f1117] text-gray-200 antialiased`}>
        {/* Sabse upar AuthProvider lagaya taaki auth state har jagah mile */}
        <AuthProvider>
          {/* Phir AppLayout (Sidebar + Header) */}
          <AppLayout>
            {children}
          </AppLayout>
        </AuthProvider>

        {/* 3. TOASTER YAHAN ADD KIYA HAI */}
        {/* Ye pure app ke upar float karega aur tere dark theme se match karega */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e2330',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)'
            },
          }} 
        />
      </body>
    </html>
  );
}