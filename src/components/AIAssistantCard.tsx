
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

interface AIAssistantCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  delay: number;
}

const AIAssistantCard: React.FC<AIAssistantCardProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  features,
  delay 
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full card-glow bg-company-dark border-gray-800">
        <CardHeader className={`bg-${color}/10`}>
          <div className={`p-3 rounded-lg inline-flex items-center justify-center bg-${color}/20 mb-3`}>
            {icon}
          </div>
          <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
          <CardDescription className="text-gray-400">{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.1 * i }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <span className={`mr-2 mt-1 text-${color} text-lg`}>•</span>
                <span className="text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIAssistantCard;
