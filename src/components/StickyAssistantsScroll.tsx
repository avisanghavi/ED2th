import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import './stickyScroll.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define the AI assistants data
const assistants = [
  {
    name: "ALFRED",
    title: "Sales Mastermind",
    color: "from-blue-600 to-blue-400",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    image: "/images/Alfred.png",
    description: "Alfred doesn't just find leads — it builds relationships. Experience how this AI assistant closes deals while you sleep, with human-like conversations.",
    features: [
      "Lead Qualification",
      "Objection Handling",
      "Meeting Automation", 
      "Personalized Outreach"
    ]
  },
  {
    name: "MJ",
    title: "Marketing Virtuoso",
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    image: "/images/MJ.png",
    description: "MJ doesn't just analyze trends — it creates them. This AI assistant delivers data-driven insights and creative content that converts at remarkable rates.",
    features: [
      "Content Creation",
      "Campaign Analysis",
      "ROI Optimization",
      "Trend Prediction"
    ]
  },
  {
    name: "CASPIAN",
    title: "Product Visionary",
    color: "from-amber-400 to-orange-500",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    image: "/images/Holstrom.png",
    description: "Caspian doesn't just collect feedback — it sees the future. Transform your product development with an AI that aligns features with actual user needs.",
    features: [
      "User Research",
      "Feature Prioritization",
      "Spec Creation",
      "Roadmap Planning"
    ]
  },
  {
    name: "EDITH",
    title: "Code Alchemist",
    color: "from-cyan-400 to-blue-500",
    textColor: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    image: "/images/Ed1th.png",
    description: "Edith doesn't just write code — it crafts solutions. Experience beautiful code at impossible speed across multiple languages.",
    features: [
      "Multi-language Coding",
      "System Architecture",
      "Bug Elimination",
      "Integration"
    ]
  },
  {
    name: "JARVIS",
    title: "Team Orchestrator",
    color: "from-green-400 to-emerald-500",
    textColor: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    image: "/images/Jarvis.png",
    description: "Jarvis doesn't just coordinate — it orchestrates success. Connect teams and maximize productivity with this AI assistant.",
    features: [
      "Workflow Management",
      "Cross-team Coordination",
      "Resource Allocation",
      "Progress Tracking"
    ]
  }
];

// Feature item component
const FeatureItem = ({ text, index, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index, duration: 0.5 }}
    className={`flex items-center gap-2 ${color} font-medium`}
  >
    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`}></div>
    {text}
  </motion.div>
);

// Main component
const StickyAssistantsScroll = () => {
  const introWrapperRef = useRef(null);
  const introTextRef = useRef(null);
  const sectionsRefs = useRef([]);
  const videosRefs = useRef([]);
  const sectionContainerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Pin the intro text section
    ScrollTrigger.create({
      trigger: introWrapperRef.current,
      start: "top top",
      end: "bottom top",
      pin: introTextRef.current,
      pinSpacing: false
    });

    // Setup each assistant section
    const windowHeight = window.innerHeight + 550; // +550 to increase the scroll distance before class changes
    
    // Scroll event handler for changing active assistant
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      assistants.forEach((_, index) => {
        const sectionElement = sectionsRefs.current[index];
        const videoElement = videosRefs.current[index];
        
        if (!sectionElement || !videoElement) return;
        
        if (scrollPosition >= (index * windowHeight) && scrollPosition < ((index + 1) * windowHeight)) {
          sectionElement.classList.add('is-active');
          videoElement.classList.add('is-active');
          setActiveSection(index);
        } else {
          // Don't remove is-active from the last section if we're past it
          if (index !== assistants.length - 1 || scrollPosition < (assistants.length - 1) * windowHeight) {
            sectionElement.classList.remove('is-active');
            videoElement.classList.remove('is-active');
          }
        }
      });
      
      // Keep the last section active when scrolling past it
      const lastIndex = assistants.length - 1;
      if (scrollPosition > (lastIndex * windowHeight)) {
        const lastSection = sectionsRefs.current[lastIndex];
        const lastVideo = videosRefs.current[lastIndex];
        
        if (lastSection && lastVideo) {
          lastSection.classList.add('is-active');
          lastVideo.classList.add('is-active');
          setActiveSection(lastIndex);
        }
      }
    };
    
    // Add scroll event listener
    document.addEventListener("scroll", handleScroll);
    
    // Initial call to set initial state
    handleScroll();
    
    return () => {
      // Cleanup
      document.removeEventListener("scroll", handleScroll);
      
      // Kill ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative bg-gray-950">
      <div ref={introWrapperRef} className="intro-wrapper">
        <div className="intro">
          <div ref={introTextRef} className="text-align-center px-4">
            <div className="align-center max-width-small">
              <h2 className="heading-style-h3 text-4xl md:text-5xl font-bold text-white mb-4">
                Your AI <span className="light-green-underline">Team</span>
              </h2>
              <p className="text-size-medium text-gray-400 max-w-2xl mx-auto">
                Meet the AI assistants ready to transform how your business operates. Each specializes in a critical area, working together seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={sectionContainerRef} className="section_tabs padding-section-large tabs_height">
        <div className="tabs_sticky-wrapper">
          <div className="tabs_container">
            <div className="tabs_component">
              {/* Left content (text) */}
              <div className="tabs_left">
                <div className="tabs_left-top">
                  {assistants.map((assistant, index) => (
                    <div 
                      key={assistant.name}
                      ref={el => sectionsRefs.current[index] = el}
                      className={`tabs_let-content ${index === 0 ? 'is-active' : ''}`}
                    >
                      <h3 className={`heading-style-h4 text-3xl font-bold ${assistant.textColor}`}>
                        {assistant.name}
                      </h3>
                      <p className="text-white text-lg mb-4">
                        {assistant.title}
                      </p>
                      <div className={`tabs_line mb-4 ${assistant.textColor} bg-opacity-50`}></div>
                      <p className="text-gray-400 mb-6">
                        {assistant.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-6">
                        {assistant.features.map((feature, idx) => (
                          <FeatureItem 
                            key={idx} 
                            text={feature} 
                            index={idx} 
                            color={assistant.textColor} 
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="tabs_left-bottom mt-6">
                  <Button className="button is-green w-full">
                    <span className="button-text">Explore {assistants[activeSection].name}</span>
                    <div className="button-circle-wrapper ml-2">
                      <div className="button-icon">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div className="button-circlee"></div>
                    </div>
                  </Button>
                </div>
              </div>
              
              {/* Right content (images) */}
              <div className="tabs_right">
                <div className="w-background-video">
                  <div className="video-container">
                    {assistants.map((assistant, index) => (
                      <div 
                        key={assistant.name}
                        ref={el => videosRefs.current[index] = el}
                        className={`tabs_video ${index === 0 ? 'is-active' : ''}`}
                      >
                        <div className={`absolute inset-0 ${assistant.bgColor} blur-3xl transform -translate-y-10`}></div>
                        <img 
                          src={assistant.image} 
                          alt={assistant.name} 
                          className="w-full h-full object-contain z-10 relative"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyAssistantsScroll; 