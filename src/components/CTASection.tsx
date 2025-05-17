
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-feature-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-10"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="mb-4 text-3xl md:text-5xl font-bold text-white">
            Transform Your Business with Autonomous AI Today
          </h2>
          <p className="mb-8 text-xl text-gray-200">
            Join forward-thinking companies using our AI assistants to outperform competitors
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-company-purple hover:bg-gray-100"
            >
              Schedule a Demo
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              View Pricing
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-12 pt-10 border-t border-white/10">
            <p className="text-gray-300 mb-6">Trusted by innovative teams worldwide</p>
            <div className="flex justify-center items-center flex-wrap gap-8 opacity-70">
              <div className="h-8 w-24 bg-white/90 rounded"></div>
              <div className="h-8 w-32 bg-white/90 rounded"></div>
              <div className="h-8 w-28 bg-white/90 rounded"></div>
              <div className="h-8 w-20 bg-white/90 rounded"></div>
              <div className="h-8 w-24 bg-white/90 rounded"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
