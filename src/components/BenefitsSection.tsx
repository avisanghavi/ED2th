import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Shield, Zap, Users, Layers } from 'lucide-react';

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex space-x-4"
  >
    <div className="flex-shrink-0">
      <div className="p-3 rounded-lg bg-company-purple/20 border border-company-purple/30">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </motion.div>
);

const BenefitsSection = () => {
  const benefits = [
    // Benefits have been removed as requested
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-blue-800 to-blue-600 z-0"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Mesh pattern overlay */}
        <div className="absolute inset-0 bg-mesh opacity-10"></div>
        
        {/* Animated glass-like shapes */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:50px_50px]"></div>
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/2 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        {/* Content area - Header and subtext removed as requested */}
        <div className="py-8">
          {/* Empty space where the heading was */}
          <div className="h-8"></div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <BenefitItem 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={benefit.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
