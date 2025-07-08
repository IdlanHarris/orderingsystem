"use client";

import { useCart } from "@/app/(ordering)/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const router = useRouter();

  return (
    <div className="min-h-screen  text-white font-poppins px-6 py-12">
      <h1 className="text-5xl font-bold mb-10 text-center drop-shadow-lg">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl mb-6 opacity-90">Your cart is empty</p>
          <Link
            href="/menu"
            className="px-6 py-2 rounded-full border border-white hover:bg-white hover:text-[#0A192F] transition shadow"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-[#ffffff10] backdrop-blur-md border border-white/20 rounded-3xl shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex items-center space-x-6">
                  {item.image && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">{item.name}</h3>
                    <p className="text-white/80">RM {item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex border rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-4 py-2 hover:bg-white hover:text-[#0A192F] transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-4 py-2 hover:bg-white hover:text-[#0A192F] transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#ffffff10] backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-6 space-y-6">
            <div className="flex justify-between items-center text-xl">
              <span>Total Items:</span>
              <span className="font-bold">{totalItems}</span>
            </div>
            <div className="flex justify-between items-center text-2xl">
              <span>Total Price:</span>
              <span className="font-bold">RM {totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <div className="flex gap-4">
                <Link
                  href="/menu"
                  className="px-6 py-2 rounded-full border border-white text-white 
    transition duration-300 ease-in-out shadow 
    hover:bg-[#00D1B2] hover:border-[#00D1B2] hover:text-white 
    hover:scale-105 hover:shadow-2xl"
                >
                  Continue Ordering
                </Link>

                <button
                  onClick={clearCart}
                  className="px-6 py-2 rounded-full border border-red-400 text-red-400 
    transition duration-300 ease-in-out shadow 
    hover:bg-red-400 hover:text-[#0A192F] 
    hover:scale-105 hover:shadow-2xl"
                >
                  Clear Cart
                </button>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="px-6 py-2 rounded-full bg-white text-[#0A192F] transition 
    duration-300 ease-in-out shadow hover:bg-[#00D1B2] hover:text-white 
    hover:scale-105 hover:shadow-2xl"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
