import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, Code, Bug, Layers, GitBranch, Database, Server, Workflow, Cpu } from 'lucide-react';
import Footer from '../components/Footer';
import SingleRowTestimonials from '../components/SingleRowTestimonials';
import IntegrationsConveyor from '../components/IntegrationsConveyor';

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

// Testimonial component with accessibility features
const Testimonial = ({ quote, author, company, image, index = 0 }) => (
  <motion.div 
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    viewport={{ once: true, margin: "-100px" }}
    className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/10 transition-all"
  >
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10.668 13.3334H5.33464C5.33464 8.00002 9.0013 4.66669 13.3346 4.66669V8.00002C11.3346 8.00002 9.0013 9.33335 9.0013 13.3334H10.668C11.7726 13.3334 12.668 14.2287 12.668 15.3334V23.3334C12.668 24.438 11.7726 25.3334 10.668 25.3334H4.0013C2.89673 25.3334 2.0013 24.438 2.0013 23.3334V15.3334C2.0013 14.2287 2.89673 13.3334 4.0013 13.3334H10.668ZM26.668 13.3334H21.3346C21.3346 8.00002 25.0013 4.66669 29.3346 4.66669V8.00002C27.3346 8.00002 25.0013 9.33335 25.0013 13.3334H26.668C27.7726 13.3334 28.668 14.2287 28.668 15.3334V23.3334C28.668 24.438 27.7726 25.3334 26.668 25.3334H20.0013C18.8967 25.3334 18.0013 24.438 18.0013 23.3334V15.3334C18.0013 14.2287 18.8967 13.3334 20.0013 13.3334H26.668Z" fill="#06B6D4" fillOpacity="0.6"/>
        </svg>
      </div>
      <p className="text-white/80 font-medium text-lg mb-6 flex-grow">{quote}</p>
      <div className="flex items-center mt-auto">
        {image && (
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img src={image} alt={author} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <p className="font-bold text-white">{author}</p>
          <p className="text-cyan-400">{company}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Feature card with icon
const FeatureCard = ({ icon: Icon, title, description, index = 0 }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/10 hover:border-cyan-500/30 transition-all group"
  >
    <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex items-center justify-center mb-4 group-hover:bg-cyan-800/70 transition-all">
      <Icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

// Stat component
const Stat = ({ value, label, icon: Icon, index = 0 }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.15 * index }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center p-4"
  >
    {Icon && <Icon className="w-8 h-8 text-cyan-400 mb-2" aria-hidden="true" />}
    <div className="text-4xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-cyan-300 uppercase tracking-wider">{label}</div>
  </motion.div>
);

// Define the engineering testimonials data
const engineeringTestimonials = [
  {
    quote: "Edith has reduced our development time by 60%. The code she writes is clean, well-documented, and follows our best practices better than most human engineers.",
    author: "Alex Rivera",
    company: "CTO, CloudCore",
    image: "/testimonial1.jpg"
  },
  {
    quote: "The debugging capabilities are mind-blowing. Edith found a race condition that had been eluding our team for weeks, then fixed it with a elegant solution in minutes.",
    author: "Priya Sharma",
    company: "Lead Developer, Nextech",
    image: "/testimonial2.jpg"
  },
  {
    quote: "Our team was skeptical at first, but Edith has become our secret weapon. She handles our routine tasks while we focus on innovation. Our velocity has tripled.",
    author: "David Kim",
    company: "VP Engineering, FutureSoft",
    image: "/testimonial3.jpg"
  },
  {
    quote: "Edith optimized our codebase and reduced infrastructure costs by 42%. She identified bottlenecks we didn't even know existed.",
    author: "Raj Patel",
    company: "Lead Architect, InnovateSystems",
    image: "/images/testimonial4.jpg"
  },
  {
    quote: "The speed at which Edith can refactor complex systems is extraordinary. She modernized our legacy codebase in days instead of months.",
    author: "Michelle Chen",
    company: "Tech Lead, QuantumTech",
    image: "/images/testimonial5.jpg"
  },
  {
    quote: "Integrating Edith with our CI/CD pipeline has been transformative. She catches issues early and suggests optimizations that humans might miss.",
    author: "Carlos Rodriguez",
    company: "DevOps Manager, CloudSphere",
    image: "/images/testimonial6.jpg"
  },
  {
    quote: "Edith's ability to understand and adapt to our complex architecture was impressive. She now maintains systems that previously required multiple specialists.",
    author: "Sarah Johnson",
    company: "Engineering Director, TechForward",
    image: "/images/testimonial7.jpg"
  }
];

// Engineering-specific integrations
const engineeringIntegrations = [
  {
    name: 'GitHub',
    logo: '/integrations/github.svg',
    description: 'Code Collaboration'
  },
  {
    name: 'GitLab',
    logo: '/integrations/gitlab.svg',
    description: 'DevOps Platform'
  },
  {
    name: 'Jira',
    logo: '/integrations/jira.svg',
    description: 'Project Management'
  },
  {
    name: 'Jenkins',
    logo: '/integrations/jenkins.svg',
    description: 'CI/CD Pipeline'
  },
  {
    name: 'Docker',
    logo: '/integrations/docker.svg',
    description: 'Containerization'
  },
  {
    name: 'Kubernetes',
    logo: '/integrations/kubernetes.svg',
    description: 'Container Orchestration'
  },
  {
    name: 'VS Code',
    logo: '/integrations/vscode.svg',
    description: 'Code Editor'
  },
  {
    name: 'AWS',
    logo: '/integrations/aws.svg',
    description: 'Cloud Infrastructure'
  }
];

const Engineering = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parallax scroll effect for hero image
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200, 300, 500], [1, 0.8, 0.6, 0.4]);

  return (
    <div className="min-h-screen bg-company-dark text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <FloatingElement top={20} left={15} size={300} color="bg-cyan-600/5" delay={0.2} />
        <FloatingElement top={60} left={70} size={350} color="bg-blue-500/5" delay={0.3} />
        <FloatingElement top={80} left={30} size={320} color="bg-cyan-800/5" delay={0.1} />
      </div>
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 min-h-screen flex items-center" 
        aria-labelledby="hero-heading"
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 lg:pr-10 mt-10 lg:mt-0"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
              Engineering AI Assistant
            </div>
            
            <h1 
              id="hero-heading"
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6"
            >
              Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">EDITH</span>, Your Code Alchemist
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Transform your development process with an AI assistant that doesn't just write code — it crafts solutions. Edith delivers beautiful code at impossible speed across multiple languages.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started with Edith
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-white rounded-full px-8 py-6 hover:bg-gray-800/30 backdrop-blur-sm"
              >
                View Demo
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            style={{ y: heroImgY, opacity }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <img 
                src="/images/Ed1th.png" 
                alt="Ed1th - Engineering Genius AI Assistant" 
                className="w-full h-full object-contain z-10 relative"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-full blur-3xl transform -translate-y-10"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
            <div className="w-0.5 h-10 bg-gradient-to-b from-cyan-500 to-transparent"></div>
          </div>
        </motion.div>
      </section>
      
      {/* Testimonials at the top (after Hero) */}
      <SingleRowTestimonials 
        testimonials={engineeringTestimonials}
        title="What Engineers Are Saying"
        color="cyan"
      />
      
      {/* Stats Section */}
      <ScrollSection speed={0.1} className="z-10">
        <section 
          className="py-20 bg-gray-950/50" 
          aria-labelledby="stats-heading"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              id="stats-heading" 
              className="text-3xl md:text-4xl font-bold mb-12 text-center sr-only"
            >
              Edith Performance Statistics
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Stat 
                value="14+" 
                label="Languages Mastered" 
                icon={Code}
                index={0}
              />
              <Stat 
                value="27K" 
                label="Bugs Squashed" 
                icon={Bug}
                index={1}
              />
              <Stat 
                value="99.99%" 
                label="System Uptime" 
                icon={Server}
                index={2}
              />
            </div>
          </div>
        </section>
      </ScrollSection>
      
      {/* Features Section */}
      <ScrollSection speed={-0.1} className="z-10">
        <section 
          className="py-20" 
          aria-labelledby="features-heading"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 
                id="features-heading"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Beautiful Code, Impossible Speed
              </h2>
              <p className="text-xl text-gray-300">
                Edith redefines development with AI-powered capabilities that craft elegant solutions to the most complex challenges.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={Code}
                title="Multi-language Coding"
                description="Write, review, and optimize code across 14+ programming languages with context-aware intelligence."
                index={0}
              />
              <FeatureCard 
                icon={Bug}
                title="Intelligent Debugging"
                description="Identify and fix complex bugs with advanced analysis that understands your entire codebase."
                index={1}
              />
              <FeatureCard 
                icon={Layers}
                title="System Architecture"
                description="Design scalable, robust architectures that align with modern best practices and your specific needs."
                index={2}
              />
              <FeatureCard 
                icon={GitBranch}
                title="Seamless Integration"
                description="Integrate effortlessly with your existing development workflow, tools, and version control systems."
                index={3}
              />
            </div>
          </div>
        </section>
      </ScrollSection>
      
      {/* Demo Chat Section */}
      <ScrollSection speed={0.2} className="z-10">
        <section 
          className="py-20 bg-gray-950/50" 
          aria-labelledby="demo-heading"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                id="demo-heading"
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
              >
                See Edith in Action
              </motion.h2>
              
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-xl overflow-hidden border border-cyan-500/20 shadow-lg"
              >
                <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                  <span className="font-medium">Engineering Assistant Chat</span>
                </div>
                
                <div className="p-4 space-y-4">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-700 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-bold">ED</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p>I've analyzed your API response times and noticed a bottleneck in the user authentication flow. The database query is running in O(n²) time. Would you like me to optimize it?</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start justify-end"
                  >
                    <div className="bg-cyan-900/50 rounded-lg p-3 max-w-[80%]">
                      <p>Yes, please optimize it. What approach would you recommend?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ml-3 flex-shrink-0">
                      <span className="text-xs font-bold">You</span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-700 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-bold">ED</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p>I recommend implementing a indexed lookup with a hash map to reduce complexity to O(1). I can refactor the authentication middleware to use Redis for session caching, which would reduce database load by approximately 70%. Would you like me to implement these changes and create a PR with performance benchmarks?</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollSection>
      
      {/* Integrations at the bottom (before CTA) */}
      <IntegrationsConveyor
        integrations={engineeringIntegrations}
        title="Engineering Integrations"
        color="cyan"
      />
      
      {/* CTA Section */}
      <ScrollSection speed={0.1} className="z-10">
        <section className="py-20 bg-gradient-to-r from-cyan-900/30 to-blue-700/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Ready to Revolutionize Your Development?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Join thousands of engineering teams who are leveraging Edith's capabilities to build better software, faster.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started with Edith
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-200 hover:border-white text-white hover:text-white rounded-full px-8 py-6 hover:bg-white/10 backdrop-blur-sm"
                >
                  Schedule a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </ScrollSection>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Engineering; 