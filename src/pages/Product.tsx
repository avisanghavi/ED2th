import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, Lightbulb, Users, LineChart, Target, Settings, Cpu } from 'lucide-react';
import Footer from '../components/Footer';
import SingleRowTestimonials from '../components/SingleRowTestimonials';
import IntegrationsConveyor from '../components/IntegrationsConveyor';

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

// Define the product testimonials data
const productTestimonials = [
  {
    quote: "Caspian has revolutionized our product development cycle. What used to take months now happens in weeks with far better market alignment.",
    author: "Elaine Chen",
    company: "Chief Product Officer, NextGen",
    image: "/testimonial1.jpg"
  },
  {
    quote: "The way Caspian translates user feedback into actionable features is incredible. Our products now truly solve real customer problems.",
    author: "Michael Rogers",
    company: "VP Product, TechSolutions",
    image: "/testimonial2.jpg"
  },
  {
    quote: "Our roadmap prioritization used to cause endless debates. Caspian analyzes impact objectively and has aligned our entire organization.",
    author: "Samantha Lee",
    company: "Product Director, InnovateTech",
    image: "/testimonial3.jpg"
  },
  {
    quote: "Caspian's ability to synthesize market research and identify emerging trends has given us a competitive edge we never had before.",
    author: "David Wilson",
    company: "Head of Product Strategy, FutureTech",
    image: "/images/testimonial4.jpg"
  },
  {
    quote: "The spec documents Caspian generates are the most comprehensive I've seen. Our engineering team finally has everything they need to execute flawlessly.",
    author: "Jennifer Lopez",
    company: "Product Lead, CloudSolutions",
    image: "/images/testimonial5.jpg"
  },
  {
    quote: "We've cut our time-to-market by 60% while improving customer satisfaction. Caspian helps us focus on the features that truly matter.",
    author: "Robert Kim",
    company: "Chief Innovation Officer, TechForward",
    image: "/images/testimonial6.jpg"
  },
  {
    quote: "Caspian has transformed how we do user research. The insights are deeper and more actionable than anything we've seen from traditional methods.",
    author: "Emily Patel",
    company: "UX Research Director, ProductVision",
    image: "/images/testimonial7.jpg"
  }
];

// Product-specific integrations
const productIntegrations = [
  {
    name: 'Jira',
    logo: '/integrations/jira.svg',
    description: 'Project Management'
  },
  {
    name: 'Figma',
    logo: '/integrations/figma.svg',
    description: 'Design Platform'
  },
  {
    name: 'Miro',
    logo: '/integrations/miro.svg',
    description: 'Visual Collaboration'
  },
  {
    name: 'ProductBoard',
    logo: '/integrations/productboard.svg',
    description: 'Product Management'
  },
  {
    name: 'Notion',
    logo: '/integrations/notion.svg',
    description: 'Knowledge Management'
  },
  {
    name: 'Slack',
    logo: '/integrations/slack.svg',
    description: 'Team Communication'
  },
  {
    name: 'UserTesting',
    logo: '/integrations/usertesting.svg',
    description: 'User Research'
  },
  {
    name: 'Mixpanel',
    logo: '/integrations/mixpanel.svg',
    description: 'Product Analytics'
  }
];

const Product = () => {
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
        <FloatingElement top={20} left={15} size={300} color="bg-amber-600/5" delay={0.2} />
        <FloatingElement top={60} left={70} size={350} color="bg-orange-500/5" delay={0.3} />
        <FloatingElement top={80} left={30} size={320} color="bg-amber-800/5" delay={0.1} />
      </div>
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 min-h-screen flex items-center" 
        aria-labelledby="hero-heading"
      >
        {/* ... existing hero section content ... */}
      </section>
      
      {/* Testimonials at the top (after Hero) */}
      <SingleRowTestimonials 
        testimonials={productTestimonials}
        title="What Product Teams Are Saying"
        color="amber"
      />
      
      {/* Stats Section */}
      {/* ... existing Stats section ... */}
      
      {/* Features Section */}
      {/* ... existing Features section ... */}
      
      {/* Demo Chat Section */}
      {/* ... existing Demo Chat section ... */}
      
      {/* Integrations at the bottom (before CTA) */}
      <IntegrationsConveyor
        integrations={productIntegrations}
        title="Product Integrations"
        color="amber"
      />
      
      {/* CTA Section */}
      {/* ... existing CTA section ... */}
      
      <Footer />
    </div>
  );
};

export default Product; 