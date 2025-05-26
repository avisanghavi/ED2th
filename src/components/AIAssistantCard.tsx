import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';

interface AIAssistantCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  outcomes: string;
  testimonial: {
    quote: string;
    author: string;
  };
  integrations: string[];
  delay: number;
}

const AIAssistantCard: React.FC<AIAssistantCardProps> = ({ 
  title, 
  subtitle,
  description, 
  icon, 
  color, 
  features,
  outcomes,
  testimonial,
  integrations,
  delay 
}) => {
  const [showDetails, setShowDetails] = React.useState(false);
  
  // Extract color names for effects
  const colorClass = color.split(' ')[1].replace('-', '');

  return (
    <>
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
        <div className="h-full relative group">
          {/* Hover effect glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"></div>
          
          <Card className="h-full bg-gray-900/50 backdrop-blur-md border-gray-800/50 group-hover:border-gray-700/50 transition-all duration-300 shadow-md group-hover:shadow-xl overflow-hidden relative z-10">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 w-full h-1.5 overflow-hidden">
              <div className={`w-full h-full bg-gradient-to-r ${color}`}></div>
            </div>
            
            {/* Card header with avatar and title */}
            <CardHeader className="relative pb-2 pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${color} shadow-lg transform transition-transform group-hover:scale-105 duration-300`}>
                  {React.cloneElement(icon as React.ReactElement, { 
                    className: "h-7 w-7 text-white"
                  })}
                </div>
                <div>
                  <CardTitle className="text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                    {title}
                  </CardTitle>
                  <Badge variant="outline" className="mt-1 font-normal text-xs">
                    {subtitle}
                  </Badge>
                </div>
          </div>
          <CardDescription className="text-gray-400">{description}</CardDescription>
        </CardHeader>
            
            <CardContent className="pt-0 pb-2">
              <ul className="space-y-3">
            {features.map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.1 * i }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                    <CheckCircle className={`mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-${colorClass}`} />
                    <span className="text-gray-300 text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
            
            <CardFooter className="pt-3 pb-4">
              <Button 
                variant="ghost" 
                className={`text-${colorClass} hover:text-${colorClass}/80 hover:bg-${colorClass}/10 w-full justify-between group rounded-lg text-sm`}
                onClick={() => setShowDetails(true)}
              >
                <span>View Results</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
            
            {/* Subtle corner accent */}
            <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
              <div className={`absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-${colorClass} to-transparent rounded-tl-3xl`}></div>
            </div>
      </Card>
        </div>
    </motion.div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-lg bg-gray-900 border-gray-800">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${color}`}>
                {React.cloneElement(icon as React.ReactElement, { 
                  className: "h-5 w-5 text-white"
                })}
              </div>
              <div>
                <DialogTitle className="text-xl text-white">{title}</DialogTitle>
                <Badge variant="outline" className="mt-1 font-normal">
                  {subtitle}
                </Badge>
              </div>
            </div>
            <DialogDescription className="text-gray-400">
              {description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-2">
            <div>
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-medium">Business Impact</h4>
              <p className="text-gray-300">{outcomes}</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3 font-medium">Testimonial</h4>
              <blockquote className={`border-l-2 border-${colorClass} pl-3 italic text-gray-300`}>
                "{testimonial.quote}"
                <footer className="text-sm text-gray-500 mt-2 not-italic">
                  — {testimonial.author}
                </footer>
              </blockquote>
            </div>
            
            <div>
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-medium flex items-center">
                Integrations
                <ExternalLink className="ml-1 h-3 w-3" />
              </h4>
              <div className="flex flex-wrap gap-2">
                {integrations.map((tool, i) => (
                  <span key={i} className={`inline-block px-2.5 py-1 text-xs bg-gray-800/70 rounded-full text-gray-300 hover:bg-${colorClass}/20 transition-colors cursor-pointer`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistantCard;
