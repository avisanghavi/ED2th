import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, Network, Users, Workflow, BarChart3, ArrowUpDown, Calendar, Gauge } from 'lucide-react';
import Footer from '../components/Footer';

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
    className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-green-500/20 shadow-lg hover:shadow-green-500/10 transition-all"
  >
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10.668 13.3334H5.33464C5.33464 8.00002 9.0013 4.66669 13.3346 4.66669V8.00002C11.3346 8.00002 9.0013 9.33335 9.0013 13.3334H10.668C11.7726 13.3334 12.668 14.2287 12.668 15.3334V23.3334C12.668 24.438 11.7726 25.3334 10.668 25.3334H4.0013C2.89673 25.3334 2.0013 24.438 2.0013 23.3334V15.3334C2.0013 14.2287 2.89673 13.3334 4.0013 13.3334H10.668ZM26.668 13.3334H21.3346C21.3346 8.00002 25.0013 4.66669 29.3346 4.66669V8.00002C27.3346 8.00002 25.0013 9.33335 25.0013 13.3334H26.668C27.7726 13.3334 28.668 14.2287 28.668 15.3334V23.3334C28.668 24.438 27.7726 25.3334 26.668 25.3334H20.0013C18.8967 25.3334 18.0013 24.438 18.0013 23.3334V15.3334C18.0013 14.2287 18.8967 13.3334 20.0013 13.3334H26.668Z" fill="#10B981" fillOpacity="0.6"/>
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
          <p className="text-green-400">{company}</p>
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
    className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-green-500/10 hover:border-green-500/30 transition-all group"
  >
    <div className="w-12 h-12 rounded-full bg-green-900/50 flex items-center justify-center mb-4 group-hover:bg-green-800/70 transition-all">
      <Icon className="w-6 h-6 text-green-400" aria-hidden="true" />
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
    {Icon && <Icon className="w-8 h-8 text-green-400 mb-2" aria-hidden="true" />}
    <div className="text-4xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-green-300 uppercase tracking-wider">{label}</div>
  </motion.div>
);

const Orchestration = () => {
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
        <FloatingElement top={20} left={15} size={300} color="bg-green-600/5" delay={0.2} />
        <FloatingElement top={60} left={70} size={350} color="bg-emerald-500/5" delay={0.3} />
        <FloatingElement top={80} left={30} size={320} color="bg-green-800/5" delay={0.1} />
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Orchestration AI Assistant
            </div>
            
            <h1 
              id="hero-heading"
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6"
            >
              Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">JARVIS</span>, Your Team Orchestrator
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Transform your workflow with an AI assistant that doesn't just coordinate — it orchestrates success. Jarvis brings it all together, connecting teams and maximizing productivity.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started with Jarvis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-700 hover:border-green-500 text-gray-300 hover:text-white rounded-full px-8 py-6 hover:bg-gray-800/30 backdrop-blur-sm"
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
                src="/images/Jarvis.png" 
                alt="Jarvis - Team Orchestrator AI Assistant" 
                className="w-full h-full object-contain z-10 relative"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-full blur-3xl transform -translate-y-10"></div>
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
            <div className="w-0.5 h-10 bg-gradient-to-b from-green-500 to-transparent"></div>
          </div>
        </motion.div>
      </section>
      
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
              Jarvis Performance Statistics
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Stat 
                value="1,349" 
                label="Projects Managed" 
                icon={Workflow}
                index={0}
              />
              <Stat 
                value="78" 
                label="Teams Connected" 
                icon={Network}
                index={1}
              />
              <Stat 
                value="312%" 
                label="Efficiency Gain" 
                icon={Gauge}
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
                Bringing It All Together
              </h2>
              <p className="text-xl text-gray-300">
                Jarvis redefines team collaboration with AI-powered capabilities that coordinate complex workflows across your entire organization.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={Workflow}
                title="Workflow Management"
                description="Coordinate complex workflows across departments with intelligent task allocation and dependency management."
                index={0}
              />
              <FeatureCard 
                icon={Network}
                title="Cross-team Coordination"
                description="Facilitate seamless communication and collaboration between different teams and departments."
                index={1}
              />
              <FeatureCard 
                icon={BarChart3}
                title="Progress Tracking"
                description="Monitor project timelines with real-time visibility into milestones, blockers, and resource allocation."
                index={2}
              />
              <FeatureCard 
                icon={ArrowUpDown}
                title="Resource Allocation"
                description="Optimize team resources across projects with AI-powered analysis that maximizes efficiency."
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
                See Jarvis in Action
              </motion.h2>
              
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-xl overflow-hidden border border-green-500/20 shadow-lg"
              >
                <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="font-medium">Orchestration Assistant Chat</span>
                </div>
                
                <div className="p-4 space-y-4">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-bold">JV</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p>Welcome back! I've been orchestrating your AI team's activities across departments. Here's a quick summary of key initiatives.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start justify-end"
                  >
                    <div className="bg-green-900/50 rounded-lg p-3 max-w-[80%]">
                      <p>Thanks Jarvis. What's the status of our Q4 product launch?</p>
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
                    <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-bold">JV</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p>The Q4 launch is on track. I've coordinated with Caspian (Product) to finalize feature specs, Edith (Engineering) reports 87% code completion with all critical paths tested, and MJ (Marketing) has prepared the go-to-market strategy with 12 content pieces ready. Alfred (Sales) has identified 37 high-potential leads for early access. Would you like me to pull the detailed progress report from any specific team?</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollSection>
      
      {/* Testimonials Section */}
      <ScrollSection speed={-0.15} className="z-10">
        <section 
          className="py-20" 
          aria-labelledby="testimonials-heading"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              id="testimonials-heading"
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
            >
              What Leaders Are Saying
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Testimonial 
                quote="Jarvis has transformed how our departments collaborate. Information flows seamlessly, everyone stays aligned, and our execution speed has more than doubled."
                author="Jennifer Torres"
                company="COO, FutureScale"
                image="/testimonial1.jpg"
                index={0}
              />
              <Testimonial 
                quote="The way Jarvis coordinates our AI assistants is revolutionary. It's like having an executive team that works 24/7, keeping everything on track and everyone informed."
                author="Robert Chang"
                company="CEO, NexGen Solutions"
                image="/testimonial2.jpg"
                index={1}
              />
              <Testimonial 
                quote="Our cross-functional initiatives used to get stuck in silos. With Jarvis orchestrating the workflow, we've eliminated bottlenecks and seen a 300% improvement in delivery times."
                author="Elena Rodriguez"
                company="Chief Strategy Officer, Innovate Inc."
                image="/testimonial3.jpg"
                index={2}
              />
              <Testimonial 
                quote="Jarvis revolutionized how our teams collaborate. It's like having a brilliant project manager who never sleeps and coordinates everything flawlessly."
                author="David Wilson"
                company="CTO, InnovateCorp"
                image="/images/testimonial4.jpg"
                index={0}
              />
              <Testimonial 
                quote="The dependency mapping alone saved us countless hours. Jarvis predicts bottlenecks before they happen and keeps everything on track."
                author="Elena Rodriguez"
                company="Head of Operations, Nexus Systems"
                image="/images/testimonial5.jpg"
                index={1}
              />
              <Testimonial 
                quote="Our cross-functional teams are now seamlessly integrated. Information flows exactly where it's needed, when it's needed. Game changer."
                author="Raj Patel"
                company="VP of Product, FutureTech"
                image="/images/testimonial6.jpg"
                index={2}
              />
            </div>
          </div>
        </section>
      </ScrollSection>
      
      {/* CTA Section */}
      <ScrollSection speed={0.1} className="z-10">
        <section className="py-20 bg-gradient-to-r from-green-900/30 to-emerald-700/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Ready to Unify Your Team?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Join thousands of organizations who are leveraging Jarvis's capabilities to coordinate teams and drive unprecedented results.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started with Jarvis
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

export default Orchestration; 