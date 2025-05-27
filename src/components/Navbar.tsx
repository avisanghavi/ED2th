import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, ChevronDown, Sparkles, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated glow component
const AnimatedGlow = ({ className }: { className?: string }) => (
  <div className={`absolute inset-0 opacity-70 overflow-hidden ${className}`}>
    <div className="absolute -inset-[10px] opacity-40">
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            'conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)',
          transform: 'rotate(-60deg)',
          animation: 'pulse 8s infinite linear',
        }}
      />
    </div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('/');

  // Detect current section based on URL
  useEffect(() => {
    setActiveSection(window.location.pathname);
  }, []);

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

  // Close dropdown on mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) setIsDropdownOpen(false);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        isScrolled
          ? 'bg-gradient-to-r from-black/95 via-company-dark/95 to-black/95 backdrop-blur-xl py-3 border-b border-white/5'
          : 'bg-transparent py-6'
      }`}
    >
      {/* Top radial gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      {/* Glassmorphism effect for scrolled state */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-indigo-950/10 to-purple-950/10 backdrop-blur-xl"></div>
      )}
      
      <nav className="w-full max-w-[2000px] mx-auto px-5 sm:px-8 lg:px-16 relative">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <motion.a 
              href="/" 
              className="relative text-white font-bold text-2xl md:text-3xl tracking-tight group z-10 px-2 py-1"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <AnimatedGlow className="rounded-lg opacity-30" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500 animate-gradient relative">
                Jarvis
                <motion.span 
                  className="absolute -top-1 -right-2 text-blue-300"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 15, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles size={14} />
                </motion.span>
              </span>
              <span className="block h-0.5 max-w-0 bg-gradient-to-r from-blue-400 via-purple-600 to-blue-500 transition-all duration-500 group-hover:max-w-full absolute bottom-0 left-0"></span>
            </motion.a>
          </div>

          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8 mr-8">
              {/* See the Proof link */}
              <motion.a 
                href="/proof" 
                className={`relative text-gray-200 hover:text-white transition-colors group px-3 py-2 overflow-hidden ${
                  activeSection === '/proof' ? 'text-white font-medium' : ''
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {activeSection === '/proof' && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">See the Proof</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
              
              {/* Meet The Team Dropdown */}
              <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                <motion.button
                  className={`flex items-center text-gray-200 hover:text-white transition-colors relative group focus:outline-none px-3 py-2 ${
                    (activeSection === '/sales' || activeSection === '/marketing' || 
                     activeSection === '/engineering' || activeSection === '/orchestration') 
                      ? 'text-white font-medium' : ''
                  }`}
                  onClick={() => setIsDropdownOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen ? 'true' : 'false'}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {(activeSection === '/sales' || activeSection === '/marketing' || 
                     activeSection === '/engineering' || activeSection === '/orchestration') && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">Meet The Team</span>
                  <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200" 
                    style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                      className="absolute left-0 mt-2 w-72 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 z-50"
                      style={{
                        background: "linear-gradient(145deg, rgba(13,14,25,0.95), rgba(14,15,35,0.98))",
                        boxShadow: "0 15px 40px -5px rgba(0, 0, 0, 0.5), 0 8px 15px -6px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 25px rgba(120, 120, 255, 0.2)"
                      }}
                    >
                      <div className="py-2">
                        {[
                          { href: "/sales", label: "Sales", color: "from-blue-500 to-blue-600", activeColor: "bg-blue-900/30" },
                          { href: "/marketing", label: "Marketing", color: "from-purple-500 to-purple-600", activeColor: "bg-purple-900/30" },
                          { href: "/engineering", label: "Engineering", color: "from-cyan-500 to-cyan-600", activeColor: "bg-cyan-900/30" },
                          { href: "/orchestration", label: "Orchestration", color: "from-green-500 to-green-600", activeColor: "bg-green-900/30" }
                        ].map((item, index) => (
                          <motion.a
                            key={item.href}
                            href={item.href}
                            className={`block px-5 py-3.5 text-gray-200 hover:text-white transition-all group relative ${
                              activeSection === item.href ? 'text-white ' + item.activeColor : ''
                            }`}
                            whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                          >
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} mr-3 
                                shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_12px_rgba(59,130,246,0.8)]
                                transition-all duration-300
                              `}></div>
                              <span className="font-medium">{item.label}</span>
                            </div>
                            <span className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500 to-transparent transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white hover:bg-white/5 rounded-lg px-5 py-2 transition-all duration-300 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log In</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse animation-delay-2000"></div>
                <Button className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 text-white border-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 rounded-lg px-6 py-2 font-medium">
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>

          <motion.button
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden mt-4 w-full"
            >
              <div 
                className="flex flex-col space-y-4 pt-4 pb-6 rounded-xl p-4 w-full backdrop-blur-xl border border-white/10"
                style={{
                  background: "linear-gradient(145deg, rgba(13,14,25,0.95), rgba(14,15,35,0.98))",
                  boxShadow: "0 15px 40px -5px rgba(0, 0, 0, 0.5), 0 8px 15px -6px rgba(0, 0, 0, 0.3), 0 0 25px rgba(120, 120, 255, 0.2)"
                }}
              >
                {/* See the Proof link */}
                <motion.a
                  href="/proof"
                  className={`text-gray-200 hover:text-white transition-colors py-3 border-l-2 ${
                    activeSection === '/proof' ? 'border-blue-500 bg-blue-900/20 text-white' : 'border-transparent'
                  } hover:border-blue-500 pl-3 rounded-r-lg hover:bg-white/5`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  See the Proof
                </motion.a>
                
                {/* Meet The Team Dropdown for mobile */}
                <div className="">
                  <motion.button
                    className={`flex items-center w-full text-gray-200 hover:text-white transition-colors py-3 border-l-2 ${
                      (activeSection === '/sales' || activeSection === '/marketing' || 
                       activeSection === '/engineering' || activeSection === '/orchestration') 
                        ? 'border-blue-500 bg-blue-900/20 text-white' : 'border-transparent'
                    } hover:border-blue-500 pl-3 rounded-r-lg hover:bg-white/5 focus:outline-none`}
                    onClick={() => setIsDropdownOpen((open) => !open)}
                    whileHover={{ x: 5 }}
                  >
                    Meet The Team
                    <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200" 
                      style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                    />
                  </motion.button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-5 mt-2 border-l border-blue-500/30 pl-4"
                      >
                        {[
                          { href: "/sales", label: "Sales", color: "bg-blue-500", activeColor: "bg-blue-900/30" },
                          { href: "/marketing", label: "Marketing", color: "bg-purple-500", activeColor: "bg-purple-900/30" },
                          { href: "/engineering", label: "Engineering", color: "bg-cyan-500", activeColor: "bg-cyan-900/30" },
                          { href: "/orchestration", label: "Orchestration", color: "bg-green-500", activeColor: "bg-green-900/30" }
                        ].map((item, index) => (
                          <motion.a 
                            key={item.href}
                            href={item.href} 
                            className={`flex items-center py-3.5 text-gray-200 hover:text-white transition-colors rounded-lg hover:bg-white/5 pl-2 ${
                              activeSection === item.href ? 'text-white ' + item.activeColor : ''
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 5 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className={`w-3 h-3 rounded-full ${item.color} mr-3 shadow-[0_0_8px_rgba(59,130,246,0.5)]`}></div>
                            <span className="font-medium">{item.label}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="pt-4 flex flex-col space-y-3 border-t border-white/10 mt-2">
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 w-full justify-start">
                    <LogIn className="w-4 h-4 mr-2" />
                    Log In
                  </Button>
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse animation-delay-2000"></div>
                    <Button className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 text-white border-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 w-full font-medium">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </header>
  );
};

export default Navbar;
