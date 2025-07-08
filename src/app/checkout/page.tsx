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
      <div className="p-8 max-w-2xl mx-auto text-center text-gray-600">
        <h2 className="text-xl font-semibold mb-4">Nothing to checkout.</h2>
        <p>Return to the menu and add some items.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout Receipt</h1>

      {paid ? (
        <div className="text-center text-green-600">
          <h2 className="text-2xl font-bold mb-2">✅ Payment Successful!</h2>
          <p>Redirecting to the menu...</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 border p-4 rounded-lg shadow-sm mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-2 last:border-none"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  RM {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Price:</span>
              <span>RM {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handlePayment}
              disabled={isPaying}
              className={`px-6 py-3 rounded-md text-white text-lg transition ${
                isPaying
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isPaying ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
