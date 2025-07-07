// app/components/Layout.tsx
"use client";

import CartIcon from "./CartIcon";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Ordering System
        </Link>
        <CartIcon />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}