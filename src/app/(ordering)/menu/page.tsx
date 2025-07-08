"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

const menuItems = [
  {
    id: "1",
    name: "Nasi Lemak",
    price: 8.5,
    image: "https://placehold.co/400x300.png?text=Nasi+Lemak",
    category: "Main",
  },
  {
    id: "2",
    name: "Ayam Goreng",
    price: 6.0,
    image: "https://placehold.co/400x300.png?text=Ayam+Goreng",
    category: "Main",
  },
  {
    id: "3",
    name: "Teh Tarik",
    price: 2.0,
    image: "https://placehold.co/400x300.png?text=Teh+Tarik",
    category: "Drinks",
  },
  {
    id: "4",
    name: "Cendol",
    price: 4.5,
    image: "https://placehold.co/400x300.png?text=Cendol",
    category: "Desserts",
  },
];

const categories = ["All", "Main", "Drinks", "Desserts"];

export default function MenuPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      {/* Header Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Our Menu</h1>
        <p className="text-xl max-w-xl mx-auto opacity-90">
          Delicious Malaysian favorites made with love, served fresh daily.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 py-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full border border-white/30 backdrop-blur-lg shadow-md 
  transition duration-300 ease-in-out hover:shadow-xl
  ${
    selectedCategory === cat
      ? "bg-[#00D1B2] text-white scale-105"
      : "text-white hover:bg-[#00D1B2]/20 hover:border-[#00D1B2] hover:scale-105"
  }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#ffffff0d] backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition duration-300"
          >
            <div className="relative w-full h-56 overflow-hidden group">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-1">{item.name}</h2>
              <p className="text-white/80 mb-4 text-lg">
                RM {item.price.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="w-full bg-white text-[#0A192F] py-2 rounded-full 
    transition duration-300 ease-in-out shadow 
    hover:bg-[#00D1B2] hover:text-white hover:scale-105 hover:shadow-2xl"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
