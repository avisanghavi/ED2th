import React from 'react';
import { motion } from 'framer-motion';

// Testimonial card component
const TestimonialCard = ({ 
  quote, 
  author, 
  company, 
  image, 
  color
}) => {
  // Define specific classes based on color prop
  const getBorderClass = () => {
    switch(color) {
      case 'blue': return 'border-blue-500/20';
      case 'purple': return 'border-purple-500/20';
      case 'cyan': return 'border-cyan-500/20';
      case 'amber': return 'border-amber-500/20';
      case 'green': return 'border-green-500/20';
      default: return 'border-blue-500/20';
    }
  };

  const getTextClass = () => {
    switch(color) {
      case 'blue': return 'text-blue-400';
      case 'purple': return 'text-purple-400';
      case 'cyan': return 'text-cyan-400';
      case 'amber': return 'text-amber-400';
      case 'green': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div
      className={`flex-shrink-0 w-80 bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border ${getBorderClass()} shadow-lg mx-3`}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.668 13.3334H5.33464C5.33464 8.00002 9.0013 4.66669 13.3346 4.66669V8.00002C11.3346 8.00002 9.0013 9.33335 9.0013 13.3334H10.668C11.7726 13.3334 12.668 14.2287 12.668 15.3334V23.3334C12.668 24.438 11.7726 25.3334 10.668 25.3334H4.0013C2.89673 25.3334 2.0013 24.438 2.0013 23.3334V15.3334C2.0013 14.2287 2.89673 13.3334 4.0013 13.3334H10.668ZM26.668 13.3334H21.3346C21.3346 8.00002 25.0013 4.66669 29.3346 4.66669V8.00002C27.3346 8.00002 25.0013 9.33335 25.0013 13.3334H26.668C27.7726 13.3334 28.668 14.2287 28.668 15.3334V23.3334C28.668 24.438 27.7726 25.3334 26.668 25.3334H20.0013C18.8967 25.3334 18.0013 24.438 18.0013 23.3334V15.3334C18.0013 14.2287 18.8967 13.3334 20.0013 13.3334H26.668Z" fill="currentColor" className={getTextClass()} fillOpacity="0.6"/>
          </svg>
        </div>
        <p className="text-white/80 font-medium text-base mb-4 line-clamp-3">{quote}</p>
        <div className="flex items-center mt-auto">
          {image && (
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-800">
              <img src={image} alt={author} className="w-full h-full object-cover" onError={(e) => {
                e.currentTarget.src = '/avatar-placeholder.png';
              }} />
            </div>
          )}
          <div>
            <p className="font-bold text-white">{author}</p>
            <p className={getTextClass()}>{company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const SingleRowTestimonials = ({ 
  testimonials,
  title,
  color = "blue"
}) => {
  // Double the testimonials array to ensure continuous scrolling
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 bg-gray-950/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          {title || "What People Are Saying"}
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  duration: 40,
                  ease: "linear",
                  repeat: Infinity,
                }
              }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  company={testimonial.company}
                  image={testimonial.image}
                  color={color}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleRowTestimonials; 