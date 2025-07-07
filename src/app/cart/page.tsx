"use client";

import { useCart } from "@/app/context/CartContext";
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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link href="/menu" className="text-blue-600 hover:underline">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">RM {item.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-t border-b">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold">Total Price:</span>
              <span className="font-bold">RM {totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between space-x-4">
              <div className="flex space-x-4">
                <Link
                  href="/menu"
                  className="px-4 py-2 border rounded-md text-green-600 hover:bg-green-600 hover:text-black transition-colors"
                >
                  Continue Ordering
                </Link>
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border rounded-md text-red-600 hover:bg-red-600 hover:text-black transition-colors"
                >
                  Clear Cart
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}