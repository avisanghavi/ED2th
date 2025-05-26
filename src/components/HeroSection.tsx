import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const baseText = 'AI Co-workers for every ';
  const cyclingWords = ['Department', 'Team', 'Organization', 'Individual'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let currentWord = cyclingWords[currentWordIndex];
    
    const typingInterval = setInterval(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex <= currentWord.length) {
          setTypedText(baseText + currentWord.substring(0, currentIndex));
          currentIndex++;
        } else {
          // Pause at the end of typing
          setTimeout(() => {
            isDeleting = true;
          }, 1000); // Pause for 1 second before deleting
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          currentIndex--;
          setTypedText(baseText + currentWord.substring(0, currentIndex));
        } else {
          isDeleting = false;
          // Move to next word
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
          currentWord = cyclingWords[(currentWordIndex + 1) % cyclingWords.length];
        }
      }
    }, isDeleting ? 50 : 100); // Faster deletion, slower typing
    
    return () => clearInterval(typingInterval);
  }, [currentWordIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-950 pb-20">
      {/* Video background with increased opacity */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        src="/growth.mp4"
      />
      
      {/* Lighter gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/70 to-gray-950/90 z-10 pointer-events-none" />
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {/* Animated gradient effect */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-r from-blue-900/20 via-purple-900/10 to-cyan-900/20 opacity-30"></div>
        
        {/* Soft glowing circles */}
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] opacity-20"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container relative z-20 px-4 mx-auto text-center"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center px-4 py-2 mb-8 space-x-2 border rounded-full border-blue-500/30 bg-blue-500/5 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">Revolutionizing Enterprise AI</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl text-white"
        >
          <span className="inline-block">Introducing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Jarvis</span></span>
          <br />
          <span className="text-gray-300">{typedText}<span className="animate-pulse text-blue-400">|</span></span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-10 text-lg md:text-xl text-gray-400 leading-relaxed backdrop-blur-sm bg-gray-900/30 rounded-lg p-4"
        >
          A suite of fully autonomous AI assistants that interact in natural language
          to handle your Sales, Marketing, Product, and Engineering needs.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white rounded-full px-8 py-6 hover:bg-gray-800/30 backdrop-blur-sm"
          >
            Watch Demo
          </Button>
        </motion.div>
        
        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
            <div className="w-0.5 h-10 bg-gradient-to-b from-gray-500 to-transparent"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;