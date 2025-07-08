"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const router = useRouter();

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setPaid(true);
      clearCart();

      setTimeout(() => {
        router.push("/menu");
      }, 3000);
    }, 2000);
  };

  if (cartItems.length === 0 && !paid) {
    return (
      <div className="min-h-screen  text-white font-poppins flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Nothing to checkout.</h2>
          <p className="opacity-80">Return to the menu and add some items.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white font-poppins flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full space-y-10">
        <h1 className="text-5xl font-bold text-center drop-shadow-lg">
          Checkout
        </h1>

        {paid ? (
          <div className="bg-green-600/20 border border-green-500/50 backdrop-blur-md p-8 rounded-3xl shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-2 text-green-400">
              ✅ Payment Successful!
            </h2>
            <p className="opacity-90">Redirecting to the menu...</p>
          </div>
        ) : (
          <>
            <div className="bg-[#ffffff10] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-lg space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-white/30 pb-4 last:border-none hover:bg-white/5 rounded-xl transition"
                >
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{item.name}</h3>
                    <p className="text-sm text-white/70">
                      RM {item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-xl">
                    RM {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xl">
                <span>Total Items:</span>
                <span className="font-bold">{totalItems}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold">
                <span>Total Price:</span>
                <span>RM {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={handlePayment}
                disabled={isPaying}
                className={`px-8 py-3 rounded-full text-lg font-semibold transition 
  duration-300 ease-in-out transform shadow 
  ${
    isPaying
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-white text-[#0A192F] hover:bg-[#00D1B2] hover:text-[#0A192F] hover:scale-105 hover:shadow-2xl"
  }`}
              >
                {isPaying ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
