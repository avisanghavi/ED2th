
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
    {
      icon: <Clock className="h-6 w-6 text-company-cyan" />,
      title: "Save Time",
      description: "Automate repetitive tasks and focus on strategic initiatives that require human creativity.",
      delay: 0.1
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-company-cyan" />,
      title: "Increase Productivity",
      description: "Execute complex workflows 24/7 with consistent quality and without human limitations.",
      delay: 0.2
    },
    {
      icon: <Shield className="h-6 w-6 text-company-cyan" />,
      title: "Reduce Risk",
      description: "Eliminate human error with AI that follows best practices consistently across all tasks.",
      delay: 0.3
    },
    {
      icon: <Zap className="h-6 w-6 text-company-cyan" />,
      title: "Scale Operations",
      description: "Add AI capacity instantly when demand increases without recruiting or training delays.",
      delay: 0.4
    },
    {
      icon: <Users className="h-6 w-6 text-company-cyan" />,
      title: "Enhance Collaboration",
      description: "Connect teams with AI assistants that share information seamlessly across departments.",
      delay: 0.5
    },
    {
      icon: <Layers className="h-6 w-6 text-company-cyan" />,
      title: "Data-Driven Decisions",
      description: "Make strategic choices with AI that analyzes vast datasets for actionable insights.",
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-company-dark to-company-blue/90">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">Why Choose Autonomous AI Assistants</h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Powerful benefits that transform how your business operates across every department
          </p>
        </motion.div>
        
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
