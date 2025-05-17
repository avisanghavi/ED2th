
import React from 'react';
import AIAssistantCard from './AIAssistantCard';
import { Cpu, LineChart, MessageSquare, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const AIAssistantsSection = () => {
  const assistants = [
    {
      title: "Sales AI",
      description: "Your autonomous sales team member",
      icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
      color: "blue-500",
      features: [
        "Qualifies leads through natural conversation",
        "Handles objections with contextual responses",
        "Schedules meetings and follows up automatically",
        "Personalizes outreach at scale"
      ],
      delay: 0.1
    },
    {
      title: "Marketing AI",
      description: "Your creative marketing strategist",
      icon: <LineChart className="h-6 w-6 text-purple-400" />,
      color: "purple-500",
      features: [
        "Generates content for multiple platforms",
        "Analyzes campaign performance in real-time",
        "Optimizes targeting for maximum ROI",
        "Creates data-driven marketing strategies"
      ],
      delay: 0.3
    },
    {
      title: "Product AI",
      description: "Your innovative product manager",
      icon: <Lightbulb className="h-6 w-6 text-amber-400" />,
      color: "amber-500",
      features: [
        "Collects and analyzes user feedback",
        "Prioritizes features based on impact",
        "Creates detailed product specifications",
        "Manages product roadmap development"
      ],
      delay: 0.5
    },
    {
      title: "Engineering AI",
      description: "Your technical development partner",
      icon: <Cpu className="h-6 w-6 text-cyan-400" />,
      color: "cyan-500",
      features: [
        "Writes and reviews code in multiple languages",
        "Debugs issues with intelligent solutions",
        "Architects scalable system designs",
        "Integrates with existing development workflows"
      ],
      delay: 0.7
    }
  ];

  return (
    <section id="assistants" className="py-24 bg-company-dark">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-gradient">Meet Your AI Team</h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Our autonomous AI assistants communicate naturally to handle specialized tasks across departments
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {assistants.map((assistant, index) => (
            <AIAssistantCard 
              key={index}
              title={assistant.title}
              description={assistant.description}
              icon={assistant.icon}
              color={assistant.color}
              features={assistant.features}
              delay={assistant.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAssistantsSection;
