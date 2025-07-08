import Navbar from "../components/navbar";
import type { ReactNode } from "react";

export default function OrderingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-[#0A192F] via-[#112B4F] to-[#0A192F] text-white font-poppins min-h-screen">
      <Navbar />
      <div className="px-6 py-8">{children}</div>
    </div>
  );
}
