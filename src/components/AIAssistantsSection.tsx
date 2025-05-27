import React, { useState, useEffect } from 'react';
import AIAssistantCard from './AIAssistantCard';
import { Cpu, LineChart, MessageSquare, Lightbulb, Search, ArrowRight, Boxes, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const AIColleagueShowcase = () => {
  const [activeAgent, setActiveAgent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const agents = [
    {
      name: "ALFRED",
      title: "Sales Mastermind",
      color: "from-blue-600 to-blue-400",
      textColor: "text-blue-400",
      gradient: "bg-gradient-to-r from-blue-900/20 to-blue-600/40",
      image: "/images/Alfred.png",
      skills: ["Lead Qualification", "Objection Handling", "Meeting Automation", "Personalized Outreach"],
      tagline: "Closing deals while you sleep",
      signature: "I don't just find leads. I build relationships.",
      stats: [
        { label: "Deals Closed", value: "2,547" },
        { label: "Response Rate", value: "94%" },
        { label: "User Rating", value: "4.9★" }
      ],
      features: [
        "Natural conversation that converts prospects to clients",
        "Contextual objection handling that feels human",
        "Automated scheduling that never double-books",
        "Personalized follow-up at massive scale"
      ]
    },
    {
      name: "MJ",
      title: "Marketing Virtuoso",
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-400",
      gradient: "bg-gradient-to-r from-purple-900/20 to-pink-500/40",
      image: "/images/MJ.png",
      skills: ["Content Creation", "Campaign Analysis", "ROI Optimization", "Trend Prediction"],
      tagline: "Turn data into desire",
      signature: "I don't just analyze trends. I create them.",
      stats: [
        { label: "Content Generated", value: "17K+" },
        { label: "Avg. ROI Increase", value: "237%" },
        { label: "Platforms Mastered", value: "56" }
      ],
      features: [
        "Generate platform-perfect content across channels",
        "Real-time campaign performance analysis",
        "Predictive targeting for maximum return",
        "Data-driven strategies that evolve automatically"
      ]
    },
    {
      name: "CASPIAN",
      title: "Product Visionary",
      color: "from-amber-400 to-orange-500",
      textColor: "text-amber-400",
      gradient: "bg-gradient-to-r from-amber-900/20 to-orange-500/40",
      image: "/images/Holstrom.png",
      skills: ["User Research", "Feature Prioritization", "Spec Creation", "Roadmap Planning"],
      tagline: "Building tomorrow, today",
      signature: "I don't just collect feedback. I see the future.",
      stats: [
        { label: "Users Analyzed", value: "1.2M" },
        { label: "Features Shipped", value: "436" },
        { label: "Time Saved", value: "84%" }
      ],
      features: [
        "Transform user sentiment into actionable features",
        "Prioritize development based on impact prediction",
        "Generate detailed specs that developers love",
        "Manage product roadmaps that actually ship on time"
      ]
    },
    {
      name: "EDITH",
      title: "Code Alchemist",
      color: "from-cyan-400 to-blue-500",
      textColor: "text-cyan-400",
      gradient: "bg-gradient-to-r from-cyan-900/20 to-blue-500/40",
      image: "/images/Ed1th.png",
      skills: ["Multi-language Coding", "System Architecture", "Bug Elimination", "Integration"],
      tagline: "Beautiful code, impossible speed",
      signature: "I don't just write code. I craft solutions.",
      stats: [
        { label: "Languages", value: "14+" },
        { label: "Bugs Squashed", value: "27K" },
        { label: "System Uptime", value: "99.99%" }
      ],
      features: [
        "Write and review code in multiple languages",
        "Debug complex issues with intelligent analysis",
        "Design scalable system architectures",
        "Integrate with existing development workflows"
      ]
    },
    {
      name: "JARVIS",
      title: "Team Orchestrator",
      color: "from-green-400 to-emerald-500",
      textColor: "text-green-400",
      gradient: "bg-gradient-to-r from-green-900/20 to-emerald-500/40",
      image: "/images/Jarvis.png",
      skills: ["Workflow Management", "Cross-team Coordination", "Resource Allocation", "Progress Tracking"],
      tagline: "Bringing it all together",
      signature: "I don't just coordinate. I orchestrate success.",
      stats: [
        { label: "Projects Managed", value: "1,349" },
        { label: "Teams Connected", value: "78" },
        { label: "Efficiency Gain", value: "312%" }
      ],
      features: [
        "Coordinate complex workflows across departments",
        "Centralize insights and information automatically",
        "Manage project timelines and dependencies",
        "Facilitate cross-functional communication"
      ]
    }
  ].slice().reverse();
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setActiveAgent((prev) => (prev + 1) % agents.length);
          setIsAnimating(false);
        }, 500);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isAnimating, agents.length]);
  
  const agent = agents[activeAgent];
  
  const handleAgentClick = (index) => {
    if (index !== activeAgent && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveAgent(index);
        setIsAnimating(false);
      }, 500);
    }
  };
  
  // Navigation handlers
  const goToPrevAgent = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveAgent((prev) => (prev - 1 + agents.length) % agents.length);
        setIsAnimating(false);
      }, 500);
    }
  };
  const goToNextAgent = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveAgent((prev) => (prev + 1) % agents.length);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <section id="assistants" className="w-full min-h-screen bg-gray-950 text-white overflow-hidden flex flex-col relative">
      {/* Side Arrows - Transparent */}
      <button
        className="absolute top-[45%] left-6 z-50 -translate-y-1/2 hover:scale-110 p-2 transition-all"
        onClick={goToPrevAgent}
        aria-label="Previous Agent"
      >
        <ChevronLeft className="h-10 w-10 text-white/80 hover:text-white" />
      </button>
      <button
        className="absolute top-[45%] right-6 z-50 -translate-y-1/2 hover:scale-110 p-2 transition-all"
        onClick={goToNextAgent}
        aria-label="Next Agent"
      >
        <ChevronRight className="h-10 w-10 text-white/80 hover:text-white" />
      </button>
      
      {/* Main Showcase */}
      <div className="flex-1 relative">
        {/* Background Pattern - Increased brightness */}
        <div 
          className="absolute inset-0 opacity-42"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.15" fill-rule="evenodd"/%3E%3C/svg%3E")',
          }}
        ></div>
        
        {/* Gradient Background Effect - Increased brightness */}
        <div className={`absolute inset-0 transition-all duration-700 opacity-82 ${agent.gradient}`}></div>
        
        {/* Agent Image */}
        <div 
          className={`absolute inset-0 transition-all duration-700 ${
            isAnimating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        >
          <div className="w-full h-full relative overflow-hidden">
            {/* Background Agent Image - Increased brightness */}
            <div 
              className="w-full h-full absolute top-0 left-0 bg-cover bg-top opacity-92"
              style={{
                backgroundImage: `url(${agent.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center'
              }}
            ></div>
            {/* Gradient overlay - Reduced darkness for more brightness */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-950 via-gray-950/50 to-gray-950/30"></div>
          </div>
        </div>
        
        {/* Repositioned Name - Top Left - Larger size */}
        <div 
          className={`absolute top-20 left-12 transition-all duration-700 ${
            isAnimating ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="mb-2">
            <span className="block text-xs font-semibold tracking-widest text-white/80 uppercase mb-2">MEET THE TEAM</span>
            <h1 
              className={`text-6xl font-black tracking-tighter leading-none ${agent.textColor}`}
              style={{
                textShadow: '0 0 30px rgba(0,0,0,0.5)',
                WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                opacity: 0.95,
                transform: 'perspective(500px) rotateX(10deg)'
              }}
            >
              {agent.name}
            </h1>
            <div className={`h-1 w-40 mt-2 bg-gradient-to-r ${agent.color}`}></div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="absolute bottom-0 left-0 w-full p-12">
          <div 
            className={`transition-all duration-700 ${
              isAnimating ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Title and Tagline */}
            <div className="mb-6">
              <h2 className={`text-2xl font-bold ${agent.textColor}`}>{agent.title}</h2>
              <p className="text-xl text-white/80">{agent.tagline}</p>
            </div>
            
            {/* Stats Bar */}
            <div className="flex gap-12 mb-8">
              {agent.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-3xl font-bold ${agent.textColor}`}>{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Main Information */}
            <div className="grid grid-cols-2 gap-12">
              {/* Features */}
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Capabilities</h3>
                <ul className="space-y-3">
                  {agent.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`h-1.5 w-1.5 rounded-full ${agent.textColor} mt-2 mr-3`}></div>
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Skills and Signature */}
              <div className="flex items-end">
                <div className="mt-6 pt-6 border-t border-white/10 w-full">
                  <p className="text-lg italic text-white/80">"{agent.signature}"</p>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-12">
              <button 
                className={`px-8 py-4 rounded-lg bg-gradient-to-r ${agent.color} text-white font-bold text-lg shadow-lg shadow-${agent.color.split(' ')[1]}/30 hover:shadow-xl hover:shadow-${agent.color.split(' ')[1]}/40 transition-all`}
              >
                Connect with {agent.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIColleagueShowcase;
