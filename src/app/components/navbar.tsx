"use client";

import Link from "next/link";
import { useCart } from "../(ordering)/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-[#0A192F] text-white font-poppins px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-white/80 transition"
        >
          MyRestaurant
        </Link>
        <div className="flex items-center gap-6 text-lg">
          <Link href="/menu" className="hover:text-white/80 transition">
            Menu
          </Link>

          <Link
            href="/cart"
            className="relative hover:text-white/80 transition"
          >
            <ShoppingCart className="inline-block w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
