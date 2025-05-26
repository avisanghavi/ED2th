import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AIColleagueShowcase from '../components/AIAssistantsSection';
import DemoSection from '../components/DemoSection';
// import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import { motion, useScroll, useTransform } from 'framer-motion';

// ScrollSection component with enhanced parallax effect
const ScrollSection = ({ children, speed = 0.2, className = "" }) => {
  const sectionRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Enhanced parallax calculation with more pronounced effect
      const distanceFromTop = rect.top + scrollY;
      const scrollPercentage = (scrollY - distanceFromTop + windowHeight) / (rect.height + windowHeight);
      const translateY = (scrollPercentage - 0.5) * speed * 100; // Amplified effect
      
      setScrollPosition(translateY);
    };
    
    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);
    // Initialize position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return (
    <div 
      ref={sectionRef} 
      className={`relative ${className}`}
      style={{ 
        transform: `translateY(${scrollPosition}px)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform', // Performance optimization
      }}
    >
      {children}
    </div>
  );
};

// Floating background elements
const FloatingElement = ({ top, left, size, color, delay = 0 }) => {
  const elementRef = useRef(null);
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffset(scrollY * 0.05);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      ref={elementRef}
      className="absolute pointer-events-none"
      style={{ 
        top: `${top}%`, 
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translateY(${-offset * (1 + delay)}px)`,
        transition: 'transform 0.2s ease-out'
      }}
    >
      <div 
        className={`w-full h-full rounded-full ${color} blur-3xl`}
        style={{ opacity: 0.5 }}
      ></div>
    </div>
  );
};

// Animated section that fades in and slides up when scrolled into view
const AnimatedSection = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: delay }}
    viewport={{ once: true, margin: "-100px" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Subtle particle animation for the background
const ParticleBackground = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    speed: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 10 / particle.speed,
            repeat: Infinity,
            ease: "linear",
            delay: particle.id * 0.2,
          }}
        />
      ))}
    </div>
  );
};

// Decorative divider component
const ScrollDivider = () => (
  <div className="relative z-10 py-6 overflow-hidden">
    <div className="flex justify-center">
      <div className="w-full max-w-5xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>
    </div>
  </div>
);

// Scroll indicator
const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 1000], [0.8, 0.2]);
  
  return (
    <div className="min-h-screen bg-company-dark text-white">
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          {/* Scroll progress indicator */}
          <ScrollIndicator />
          
          {/* Fixed elements that don't scroll with parallax */}
          <Navbar />
          
          {/* Subtle particle animation */}
          <ParticleBackground />
          
          {/* Background elements that float as you scroll with enhanced parallax */}
          <motion.div 
            className="fixed inset-0 pointer-events-none overflow-hidden z-0"
            style={{ opacity: bgOpacity }}
          >
            <FloatingElement top={20} left={15} size={300} color="bg-blue-600/5" delay={0.2} />
            <FloatingElement top={60} left={70} size={350} color="bg-purple-600/5" delay={0.3} />
            <FloatingElement top={80} left={30} size={320} color="bg-cyan-600/5" delay={0.1} />
            <FloatingElement top={40} left={80} size={280} color="bg-indigo-600/5" delay={0.4} />
            <FloatingElement top={75} left={10} size={250} color="bg-pink-600/5" delay={0.25} />
            <FloatingElement top={30} left={50} size={400} color="bg-blue-800/5" delay={0.15} />
          </motion.div>
          
          {/* Hero Section */}
          <div className="relative z-10">
            <HeroSection />
          </div>
          
          {/* Decorative divider */}
          <ScrollDivider />
          
          {/* AI Showcase Section */}
          <AnimatedSection delay={0.1} className="relative z-10">
            <ScrollSection speed={-0.25} className="relative z-10">
              <AIColleagueShowcase />
            </ScrollSection>
          </AnimatedSection>
          
          {/* Decorative divider */}
          <ScrollDivider />
          
          {/* Demo Section */}
          <AnimatedSection delay={0.2} className="relative z-10">
            <ScrollSection speed={-0.35} className="relative z-10">
              <DemoSection />
            </ScrollSection>
          </AnimatedSection>
          
          {/* Footer */}
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Footer />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Index;
