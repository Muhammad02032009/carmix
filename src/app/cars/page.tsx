"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Search, Loader } from "lucide-react";
import Fuse from "fuse.js";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  type: string;
  price: number;
  enginePower: number;
  fuelEfficiency: number;
  image: string;
  maxSpeed: number;
  acceleration: number;
  weight: number;
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cars");
        if (response.data && Array.isArray(response.data)) {
          setCars(response.data);
          setFilteredCars(response.data);
        } else {
          console.error("Invalid data format from API:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCars(cars);
      return;
    }

    // Fuse.js configuration for fuzzy search
    const fuse = new Fuse(cars, {
      keys: ["brand", "model", "type", "year"],
      threshold: 1, 
    });

    const results = fuse.search(searchTerm.trim()).map(({ item }) => item);
    setFilteredCars(results);
  }, [searchTerm, cars]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8 dark:text-gray-50">
          Discover Our Premium Cars
        </h1>
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cars by brand, model, type, or year..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : filteredCars.length > 0 ? (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 dark:bg-gray-900"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-48">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.model}
                      width={500}
                      height={200}
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 dark:text-gray-50">
                      {car.brand} {car.model} ({car.year})
                    </h2>
                    <p className="text-gray-600 mb-4 dark:text-gray-50">{car.type}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-blue-600">
                        ${car.price}
                      </p>
                      <Link
                        href={`/cars/${car.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        View Details
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
            No cars found matching your search criteria.
          </motion.p>
        )}
      </div>
    </div>
  );
}
