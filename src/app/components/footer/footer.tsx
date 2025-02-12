import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Carmix</h3>
            <p className="mb-4">Experience automotive excellence with Carmix. Discover our range of luxury, performance, and eco-friendly vehicles.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link href="/cars" className="hover:text-red-500 transition-colors">Our Cars</Link></li>
              <li><Link href="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p>123 Carmix Street</p>
            <p>Autoville, AU 12345</p>
            <p>Phone:+992 908-37-55-00</p>
            <p>Email: info@carmix.com</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-500 transition-colors"><Facebook /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Twitter /></a>
              <a href="https://www.instagram.com/arbobzoda.9/?next=%2Fstories%2Ffcbayern%2F" target='_blank' className="hover:text-red-500 transition-colors"><Instagram /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2023 Carmix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

