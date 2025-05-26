import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled ? 'bg-company-dark/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="w-full max-w-[2000px] mx-auto px-5 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <a href="/" className="text-white font-bold text-2xl tracking-tight group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Jarvis</span>
              <span className="block h-0.5 max-w-0 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-500 group-hover:max-w-full"></span>
            </a>
          </div>

          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-5 mr-2">
              <a href="/sales" className="text-gray-300 hover:text-white transition-colors relative group">
                Sales
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/marketing" className="text-gray-300 hover:text-white transition-colors relative group">
                Marketing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/engineering" className="text-gray-300 hover:text-white transition-colors relative group">
                Engineering
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/orchestration" className="text-gray-300 hover:text-white transition-colors relative group">
                Orchestration
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-company-dark/50">
                Log In
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300">
                Get Started
              </Button>
            </div>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 w-full"
            >
              <div className="flex flex-col space-y-4 pt-4 pb-6 bg-company-dark/90 backdrop-blur-sm rounded-lg p-4 w-full">
                <a
                  href="/sales"
                  className="text-gray-300 hover:text-white transition-colors py-2 border-l-2 border-transparent hover:border-blue-500 pl-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sales
                </a>
                <a
                  href="/marketing"
                  className="text-gray-300 hover:text-white transition-colors py-2 border-l-2 border-transparent hover:border-blue-500 pl-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Marketing
                </a>
                <a
                  href="/engineering"
                  className="text-gray-300 hover:text-white transition-colors py-2 border-l-2 border-transparent hover:border-blue-500 pl-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Engineering
                </a>
                <a
                  href="/orchestration"
                  className="text-gray-300 hover:text-white transition-colors py-2 border-l-2 border-transparent hover:border-blue-500 pl-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Orchestration
                </a>
                <div className="pt-2 flex flex-col space-y-3">
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-company-dark/50 w-full">
                    Log In
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300 w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
