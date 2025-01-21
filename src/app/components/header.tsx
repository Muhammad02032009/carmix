"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, User, Menu, X, Car, Home, Info, Mail, CarIcon, CarFront } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="font-extrabold text-3xl sm:text-4xl tracking-wider flex items-center space-x-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/">
            <span className="flex items-center cursor-pointer">
              <span className="text-red-400"><CarFront/></span>
              <span className="text-white">Carmix</span>
            </span>
          </Link>
        </motion.div>

        {/* Navigation Links - Desktop */}
        <motion.nav
          className="hidden md:flex space-x-8 items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href="/" className="flex items-center space-x-1 text-lg hover:text-red-400 transition duration-300">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link href="/cars" className="flex items-center space-x-1 text-lg hover:text-red-400 transition duration-300">
            <Car size={18} />
            <span>Cars</span>
          </Link>
          <Link href="/about" className="flex items-center space-x-1 text-lg hover:text-red-400 transition duration-300">
            <Info size={18} />
            <span>About</span>
          </Link>
          <Link href="/contact" className="flex items-center space-x-1 text-lg hover:text-red-400 transition duration-300">
            <Mail size={18} />
            <span>Contact</span>
          </Link>
        </motion.nav>

        {/* User Actions - Desktop */}
        <motion.div
          className="hidden md:flex space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center">
            Log In
          </Link>
          <Link href="/signup" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center">
            Sign Up
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-800 mt-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4 p-4">
              <Link href="/" className="flex items-center space-x-2 text-lg hover:text-red-400 transition duration-300">
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link href="/cars" className="flex items-center space-x-2 text-lg hover:text-red-400 transition duration-300">
                <Car size={18} />
                <span>Cars</span>
              </Link>
              <Link href="/about" className="flex items-center space-x-2 text-lg hover:text-red-400 transition duration-300">
                <Info size={18} />
                <span>About</span>
              </Link>
              <Link href="/contact" className="flex items-center space-x-2 text-lg hover:text-red-400 transition duration-300">
                <Mail size={18} />
                <span>Contact</span>
              </Link>
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center">
                Log In
              </Link>
              <Link href="/signup" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center">
                Sign Up
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
