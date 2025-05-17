
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'AI Assistants for Every Department';
  
  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-company-dark bg-mesh">
      <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-company-dark to-transparent"></div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 px-4 mx-auto text-center"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center px-4 py-2 mb-6 space-x-2 border rounded-full border-company-purple/30 bg-company-purple/10"
        >
          <Sparkles className="w-4 h-4 text-company-accent" />
          <span className="text-sm font-medium text-company-light">Revolutionizing Enterprise AI</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl"
        >
          <span className="relative">
            <span className="relative z-10">Introducing </span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-company-accent/30 -z-10 transform -rotate-1"></span>
          </span>{" "}
          <span className="text-gradient">Autonomous</span>
          <br />
          {typedText}<span className="animate-pulse">|</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-10 text-lg md:text-xl text-gray-300/90"
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
            className="bg-company-purple hover:bg-company-purple/90 text-white"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-company-light/20 text-company-light hover:bg-company-light/5"
          >
            Watch Demo
          </Button>
        </motion.div>
      </motion.div>
      
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-6xl">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.03 }}
          transition={{ delay: 1, duration: 1 }}
          className="grid w-full h-16 grid-cols-7"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-full border-l border-white/10" />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
