"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Search, Loader } from "lucide-react";
import Fuse from "fuse.js";
import type { RootState } from "@/shared/store/store";
import { setCartArray } from "@/shared/store/slices/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  type: string;
  price: number;
  image: string;
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);
  const { cartArray } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get(`http://localhost:7000/cars`);
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      dispatch(setCartArray(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCars(cars);
      return;
    }

    const fuse = new Fuse(cars, {
      keys: ["brand", "model", "type", "year"],
      threshold: 0.4,
    });

    setFilteredCars(fuse.search(searchTerm).map(({ item }) => item));
  }, [searchTerm, cars]);

  const handleAddToCart = (car: Car) => {
    const existingCarIndex = cartArray.findIndex((item) => item.id === car.id);
    let updatedCart;

    if (existingCarIndex !== -1) {
      updatedCart = cartArray.map((item, index) =>
        index === existingCarIndex
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...cartArray, { ...car, quantity: 1 }];
    }

    dispatch(setCartArray(updatedCart));
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };



  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8 dark:text-white">
          Discover Our Premium Cars
        </h1>
        <div className="mb-8 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" />
        </div>

        {/* Show loading indicator when navigating */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : filteredCars.length > 0 ? (
          <AnimatePresence>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden relative group dark:bg-gray-800"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={() => setHoveredCar(car.id)}
                  onMouseLeave={() => setHoveredCar(null)}
                >
                  <div className="relative w-full h-56">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.model}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    {hoveredCar === car.id && (
                      <motion.button
                        className="absolute inset-x-0 bottom-4 mx-auto bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-bold opacity-90 hover:bg-blue-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={() => handleAddToCart(car)}
                      >
                        Add to Cart
                      </motion.button>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {car.brand} {car.model} ({car.year})
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {car.type}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-2xl font-bold text-blue-600">
                        ${car.price}
                      </p>
                      <Link
                        href={`/cars/${car.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                      >
                        More information
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.p
            className="text-center text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No cars found.
          </motion.p>
        )}
      </div>
    </div>
  );
}
