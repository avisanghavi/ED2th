import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, Users, BarChart3, MessageSquare, Calendar, Target, CreditCard } from 'lucide-react';
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
    className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 shadow-lg hover:shadow-blue-500/10 transition-all"
  >
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10.668 13.3334H5.33464C5.33464 8.00002 9.0013 4.66669 13.3346 4.66669V8.00002C11.3346 8.00002 9.0013 9.33335 9.0013 13.3334H10.668C11.7726 13.3334 12.668 14.2287 12.668 15.3334V23.3334C12.668 24.438 11.7726 25.3334 10.668 25.3334H4.0013C2.89673 25.3334 2.0013 24.438 2.0013 23.3334V15.3334C2.0013 14.2287 2.89673 13.3334 4.0013 13.3334H10.668ZM26.668 13.3334H21.3346C21.3346 8.00002 25.0013 4.66669 29.3346 4.66669V8.00002C27.3346 8.00002 25.0013 9.33335 25.0013 13.3334H26.668C27.7726 13.3334 28.668 14.2287 28.668 15.3334V23.3334C28.668 24.438 27.7726 25.3334 26.668 25.3334H20.0013C18.8967 25.3334 18.0013 24.438 18.0013 23.3334V15.3334C18.0013 14.2287 18.8967 13.3334 20.0013 13.3334H26.668Z" fill="#3B82F6" fillOpacity="0.6"/>
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
          <p className="text-blue-400">{company}</p>
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
    className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all group"
  >
    <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-4 group-hover:bg-blue-800/70 transition-all">
      <Icon className="w-6 h-6 text-blue-400" aria-hidden="true" />
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
    {Icon && <Icon className="w-8 h-8 text-blue-400 mb-2" aria-hidden="true" />}
    <div className="text-4xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-blue-300 uppercase tracking-wider">{label}</div>
  </motion.div>
);

// Define the sales testimonials data
const salesTestimonials = [
  {
    quote: "Alfred has increased our response rate by 320% and doubled our closing rate. The AI handles all initial conversations, letting our reps focus on high-value deals.",
    author: "James Wilson",
    company: "VP Sales, TechCorp Inc.",
    image: "/testimonial1.jpg"
  },
  {
    quote: "The way Alfred handles objections is remarkable. Prospects actually prefer talking to the AI for initial discussions - it's patient, informative, and never pushy.",
    author: "Sophia Rodriguez",
    company: "Sales Director, Nexus Solutions",
    image: "/testimonial2.jpg"
  },
  {
    quote: "Our sales cycle dropped from 45 days to just 18. Alfred qualifies leads, schedules demos, and follows up automatically - it's like having a perfect SDR working 24/7.",
    author: "Marcus Chen",
    company: "CRO, GrowthForce",
    image: "/testimonial3.jpg"
  },
  {
    quote: "We've seen a 42% increase in qualified meetings since implementing Alfred. It pre-qualifies prospects with precision we never thought possible from an AI.",
    author: "Jessica Lee",
    company: "Enterprise Sales Manager, CloudTech",
    image: "/images/testimonial4.jpg"
  },
  {
    quote: "Alfred's ability to personalize outreach at scale is incredible. We're engaging with 5x more leads while maintaining authenticity in every conversation.",
    author: "Michael Johnson",
    company: "Head of Sales Development, SalesPro",
    image: "/images/testimonial5.jpg"
  },
  {
    quote: "The most impressive part is how Alfred learns from every interaction. It adapts to our industry terminology and gets smarter with each conversation.",
    author: "Rachel Kim",
    company: "Sales Operations Director, GrowthX",
    image: "/images/testimonial6.jpg"
  },
  {
    quote: "Implementing Alfred was the best decision we made this year. Our close rate is up 78% and customer satisfaction scores have never been higher.",
    author: "David Wilson",
    company: "Sales Director, NextGen Solutions",
    image: "/images/testimonial7.jpg"
  }
];

// Sales-specific integrations
const salesIntegrations = [
  {
    name: 'Salesforce',
    logo: '/integrations/salesforce.svg',
    description: 'CRM & Sales Automation'
  },
  {
    name: 'HubSpot',
    logo: '/integrations/hubspot.svg',
    description: 'Marketing & Sales Platform'
  },
  {
    name: 'Outreach',
    logo: '/integrations/outreach.svg',
    description: 'Sales Engagement'
  },
  {
    name: 'Gong',
    logo: '/integrations/gong.svg',
    description: 'Revenue Intelligence'
  },
  {
    name: 'ZoomInfo',
    logo: '/integrations/zoominfo.svg',
    description: 'B2B Database'
  },
  {
    name: 'DocuSign',
    logo: '/integrations/docusign.svg',
    description: 'E-Signature Solution'
  },
  {
    name: 'LinkedIn Sales Navigator',
    logo: '/integrations/linkedin.svg',
    description: 'Lead Generation'
  },
  {
    name: 'Slack',
    logo: '/integrations/slack.svg',
    description: 'Team Communication'
  }
];

const Sales = () => {
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
        <FloatingElement top={20} left={15} size={300} color="bg-blue-600/5" delay={0.2} />
        <FloatingElement top={60} left={70} size={350} color="bg-blue-500/5" delay={0.3} />
        <FloatingElement top={80} left={30} size={320} color="bg-blue-800/5" delay={0.1} />
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Sales AI Assistant
            </div>
            
            <h1 
              id="hero-heading"
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6"
            >
              Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">ALFRED</span>, Your Sales Mastermind
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Transform your sales pipeline with an AI assistant that doesn't just find leads — it builds relationships. Alfred closes deals while you sleep, with human-like conversations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started with Alfred
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white rounded-full px-8 py-6 hover:bg-gray-800/30 backdrop-blur-sm"
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
                src="/images/Alfred.png" 
                alt="Alfred - Sales Mastermind AI Assistant" 
                className="w-full h-full object-contain z-10 relative"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full blur-3xl transform -translate-y-10"></div>
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
            <div className="w-0.5 h-10 bg-gradient-to-b from-blue-500 to-transparent"></div>
          </div>
        </motion.div>
      </section>
      
      {/* Testimonials at the top (after Hero) */}
      <SingleRowTestimonials 
        testimonials={salesTestimonials}
        title="What Sales Teams Are Saying"
        color="blue"
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
              Alfred Performance Statistics
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Stat 
                value="2,547" 
                label="Deals Closed" 
                icon={CreditCard}
                index={0}
              />
              <Stat 
                value="94%" 
                label="Response Rate" 
                icon={MessageSquare}
                index={1}
              />
              <Stat 
                value="4.9★" 
                label="User Rating" 
                icon={Users}
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
                Closing Deals While You Sleep
              </h2>
              <p className="text-xl text-gray-300">
                Alfred redefines sales automation with AI-powered capabilities that create genuine customer connections at scale.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={MessageSquare}
                title="Natural Conversations"
                description="Convert prospects to clients with AI-powered conversations that feel genuinely human and build rapport."
                index={0}
              />
              <FeatureCard 
                icon={Target}
                title="Objection Handling"
                description="Address customer concerns with contextual responses that adapt to different personalities and needs."
                index={1}
              />
              <FeatureCard 
                icon={Calendar}
                title="Automated Scheduling"
                description="Let Alfred handle meeting coordination and follow-ups without double-booking or scheduling conflicts."
                index={2}
              />
              <FeatureCard 
                icon={Users}
                title="Personalized Outreach"
                description="Scale personalized communications across your entire prospect database with authentic engagement."
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
                See Alfred in Action
              </motion.h2>
              
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-xl overflow-hidden border border-blue-500/20 shadow-lg"
              >
                <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="font-medium">Sales Assistant Chat</span>
                </div>
                
                <div className="p-4 space-y-4">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-bold">AL</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p>Hi there! I'm your Sales AI assistant. I've analyzed that Acme Corp has shown interest in our enterprise solution. Would you like me to reach out to their procurement team?</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start justify-end"
                  >
                    <div className="bg-blue-900/50 rounded-lg p-3 max-w-[80%]">
                      <p>Yes, please do. What information do you have on their budget?</p>
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
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-bold">AL</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p>Based on my analysis of their recent technology investments and company size, I estimate they have a budget of $150,000-200,000 for this initiative. Their fiscal year ends in Q4, suggesting they may want to finalize within 2 months. Would you like me to prepare a proposal tailored to their specific needs?</p>
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
        integrations={salesIntegrations}
        title="Sales Integrations"
        color="blue"
      />
      
      {/* CTA Section */}
      <ScrollSection speed={0.1} className="z-10">
        <section className="py-20 bg-gradient-to-r from-blue-900/30 to-blue-700/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Ready to Transform Your Sales Process?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Join thousands of sales teams who are leveraging Alfred's capabilities to close more deals with less effort.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started with Alfred
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

export default Sales; 