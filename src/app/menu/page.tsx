"use client";
import { useCart } from "../context/CartContext";
import Image from "next/image";

const menuItems = [
  { id: "1", name: "Nasi Lemak", price: 8.5, image: "/images/nasi-lemak.jpg" },
  { id: "2", name: "Ayam Goreng", price: 6.0, image: "/images/ayam.jpg" },
  { id: "3", name: "Teh Tarik", price: 2.0, image: "/images/teh.jpg" },
];

export default function MenuPage() {
  const { addToCart } = useCart();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={200}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">RM {item.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart({ ...item, quantity: 1 })}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
