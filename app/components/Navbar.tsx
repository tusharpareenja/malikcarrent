import React, { useState, useEffect } from 'react';
import { Car, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Malik Car Rent
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Home
          </a>
          <a href="#cars" className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Cars
          </a>
          <a href="#testimonials" className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
         
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-800 dark:text-white"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-5">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <Car className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Malik Car Rent
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-800 dark:text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Home
              </a>
              <a href="#cars" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Cars
              </a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Testimonials
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
