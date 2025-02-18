"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Car,
  Home,
  Info,
  Mail,
  CarFront,
  Menu,
  X,
  ShoppingCart,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import type { RootState } from "@/shared/store/store";
// import { useHotkeys } from "react-hotkeys-manager";
import Loading from "../loader/Loader";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();
  const cartItems = useSelector((state: RootState) => state.cart.cartArray);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // useHotkeys([
  //   {
  //     combo: "ctrl+b",
  //     description: "Go to cart",
  //     callback: () => {
  //       router.push("/cart");
  //       console.log("Navigating to cart");
  //     },
  //   },
  // ]);

  if (!mounted) {
    return <Loading />;
  }

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
              <span className="text-red-400">
                <CarFront />
              </span>
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
          <Link
            href="/"
            className="flex items-center space-x-1 text-lg hover:text-red-400 transition duration-300"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link
            href="/cars"
            className="flex items-center space-x-1 text-lg hover:text-red-400 transition duration-300"
          >
            <Car size={18} />
            <span>Cars</span>
          </Link>
          <Link
            href="/about"
            className="flex items-center space-x-1 text-lg hover:text-red-400 transition duration-300"
          >
            <Info size={18} />
            <span>About</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center space-x-1 text-lg hover:text-red-400 transition duration-300"
          >
            <Mail size={18} />
            <span>Contact</span>
          </Link>
        </motion.nav>

        <motion.div
          className="hidden md:flex space-x-4 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center"
          >
            Log In
          </Link>
          <Link
            href="/sign-up"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center"
          >
            Sign Up
          </Link>
          {/* <Link
            href="/profile"
            className="flex items-center space-x-1 text-lg hover:text-red-400 transition duration-300 border-[1px] p-[10px] rounded-[5px]"
          >
            <User size={18} />
          </Link> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] text-black rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-red-400 transition duration-300 relative border-[1px] p-[10px] rounded-[5px]"
              >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
              <Link
                href="/"
                className="flex items-center space-x-2 text-lg hover:text-red-400 transition duration-300"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                href="/cars"
                className="flex items-center space-x-2 text-lg hover:text-red-400 transition duration-300"
              >
                <Car size={18} />
                <span>Cars</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-2 text-lg hover:text-red-400 transition duration-300"
              >
                <Info size={18} />
                <span>About</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-2 text-lg hover:text-red-400 transition duration-300"
              >
                <Mail size={18} />
                <span>Contact</span>
              </Link>
              <Link
                href="/cart"
                className="flex items-center space-x-2 text-lg hover:text-red-400 transition duration-300 relative"
              >
                <ShoppingCart size={18} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
                <span>Cart</span>
              </Link>
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center"
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center"
              >
                Sign Up
              </Link>
              
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
