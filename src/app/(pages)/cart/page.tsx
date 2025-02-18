"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/shared/store/store";
import { CarQ, setCartArray } from "@/shared/store/slices/cartSlice";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loading from "@/app/components/loader/Loader";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartArray);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      dispatch(setCartArray(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  const updateQuantity = (car: CarQ, change: number) => {
    setLoading(true); // Start loading
    const updatedCart = cartItems
      .map((item: CarQ) =>
        item.id === car.id
          ? { ...item, quantity: Math.max((item.quantity || 1) + change, 1) }
          : item
      )
      .filter((item: CarQ) => item.quantity > 0);
    dispatch(setCartArray(updatedCart));
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setLoading(false); // End loading
  };

  const removeFromCart = (car: CarQ) => {
    setLoading(true); // Start loading
    const updatedCart = cartItems.filter((item: CarQ) => item.id !== car.id);
    dispatch(setCartArray(updatedCart));
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setLoading(false); // End loading
  };

  const totalPrice = cartItems.reduce(
    (total: number, item: CarQ) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8 dark:text-white">
          Your Cart
        </h1>
        {loading ? (
          <Loading/>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            {cartItems.map((car: CarQ) => (
              <motion.div
                key={car.id}
                className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {car.brand} {car.model}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {car.year} - {car.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(car, -1)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      disabled={loading}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {car.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(car, 1)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      disabled={loading}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    ${car.price * car.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(car)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    disabled={loading}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
            <div className="p-6 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Total
                </h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  ${totalPrice}
                </p>
              </div>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
