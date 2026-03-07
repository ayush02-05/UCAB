import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-2xl font-bold mb-4">
            U<span className="text-blue-500">Cab</span>
          </h3>
          <p className="text-sm leading-relaxed mb-4">
            The simplest way to book a ride. Whether it's a daily commute or an airport drop, we've got you covered with our fleet of reliable cabs.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>123 Mobility Ave, Tech City</span>
          </div>
        </div>

        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Ride</Link></li>
            <li><Link to="/driver-register" className="hover:text-white transition-colors">Drive</Link></li>
            <li><Link to="/deliveries" className="hover:text-white transition-colors">Deliveries</Link></li>
            <li><Link to="/business" className="hover:text-white transition-colors">Business</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <div className="mt-6">
            <p className="text-sm">&copy; {new Date().getFullYear()} UCab Inc.</p>
            <p className="text-xs text-gray-500 mt-1">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
