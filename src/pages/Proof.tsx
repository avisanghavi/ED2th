import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ChevronRight, BarChart2, Users, Clock, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Metric card component
const MetricCard = ({ icon, value, label, color }: { icon: React.ReactNode, value: string, label: string, color: string }) => (
  <motion.div 
    className={`bg-company-dark/50 backdrop-blur-sm border border-${color}/20 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:shadow-${color}/5 transition-all duration-300`}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  >
    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${color}/20 to-${color}/10 flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className={`text-2xl md:text-3xl font-bold text-${color} mb-2`}>{value}</h3>
    <p className="text-gray-400">{label}</p>
  </motion.div>
);

// Case study component
const CaseStudy = ({ 
  company, 
  logo, 
  description, 
  results, 
  agents,
  index
}: { 
  company: string, 
  logo: string, 
  description: string, 
  results: string, 
  agents: string[],
  index: number
}) => (
  <motion.div 
    className="border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    custom={index}
    variants={fadeIn}
  >
    <div className="bg-gradient-to-r from-company-dark/80 to-company-dark/90 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-4">
            <img src={logo} alt={company} className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">{company}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {agents.map((agent, i) => {
            const colors = ["blue", "purple", "cyan", "green", "amber"];
            return (
              <span 
                key={i} 
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${colors[i % colors.length]}-500/20 text-${colors[i % colors.length]}-400 border border-${colors[i % colors.length]}-500/30`}
              >
                {agent}
              </span>
            );
          })}
        </div>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-green-300">{results}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Proof = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Case study data
  const caseStudies = [
    {
      company: 'DXFactor.com',
      logo: '/proof/dxfactor-logo.svg',
      description: 'ALEX (Legal Shield) and FELIX (Finance Force) automated their entire client onboarding process.',
      results: 'What used to take 3 days of manual work now happens same-day with 94% accuracy. Contract processing is 5x faster, and their team can focus on growth instead of paperwork.',
      agents: ['ALEX', 'FELIX']
    },
    {
      company: 'CIPIO.ai',
      logo: '/proof/cipio-logo.svg',
      description: 'MJ (Market Mind) identified three untapped customer segments while SENTRY (Sales Guardian) automated personalized outreach campaigns.',
      results: '300% increase in qualified leads and $200K+ pipeline generated in just 30 days.',
      agents: ['MJ', 'SENTRY']
    },
    {
      company: 'BlueGenAI.com',
      logo: '/proof/bluegen-logo.svg',
      description: 'EDITH (Engineering Excellence) collaborated with MJ to validate product-market fit before a single line of code was written.',
      results: 'They launched their MVP 8 weeks ahead of schedule with 70% reduction in development time and immediate market traction.',
      agents: ['EDITH', 'MJ']
    },
    {
      company: 'Videofusion.io',
      logo: '/proof/videofusion-logo.svg',
      description: 'Full agent coordination in action: FELIX optimized their pricing strategy, SENTRY closed deals with automated proposals, and ALEX handled all contract negotiations.',
      results: 'They hit their 6-month revenue goals in just 2 months, accelerating $150K in revenue.',
      agents: ['FELIX', 'SENTRY', 'ALEX']
    }
  ];

  // Performance metrics
  const metrics = [
    { 
      icon: <BarChart2 className="w-6 h-6 text-blue-400" />, 
      value: "98%", 
      label: "Finance accuracy with FELIX", 
      color: "blue" 
    },
    { 
      icon: <Users className="w-6 h-6 text-purple-400" />, 
      value: "85%", 
      label: "Market prediction with MJ", 
      color: "purple" 
    },
    { 
      icon: <Clock className="w-6 h-6 text-cyan-400" />, 
      value: "70%", 
      label: "Faster development with EDITH", 
      color: "cyan" 
    },
    { 
      icon: <BarChart2 className="w-6 h-6 text-green-400" />, 
      value: "300%", 
      label: "Lead conversion with SENTRY", 
      color: "green" 
    },
    { 
      icon: <CheckCircle className="w-6 h-6 text-amber-400" />, 
      value: "100%", 
      label: "Compliance rate with ALEX", 
      color: "amber" 
    }
  ];
  
  // Graph data for dependency visualization
  const dependencyData = [
    { day: 'Mon', value: 85 },
    { day: 'Tue', value: 92 },
    { day: 'Wed', value: 88 },
    { day: 'Thu', value: 95 },
    { day: 'Fri', value: 90 },
    { day: 'Sat', value: 72 },
    { day: 'Sun', value: 68 }
  ];

  return (
    <div className="min-h-screen bg-company-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 relative overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute top-1/3 left-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  The Proof:
                </span>
                <br />
                <span className="text-white">Real AI Agents Delivering Real Results</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Our AI agents aren't theoretical - they're working right now with real companies, 
                delivering measurable business outcomes through coordinated intelligence. Here's the evidence:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-lg text-lg"
                  onClick={() => {
                    const caseStudiesSection = document.getElementById('case-studies');
                    caseStudiesSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See Case Studies <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-gray-800 px-8 py-6 rounded-lg text-lg"
                >
                  Meet Our Agents
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Metrics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20"
          >
            {metrics.map((metric, index) => (
              <MetricCard 
                key={index}
                icon={metric.icon}
                value={metric.value}
                label={metric.label}
                color={metric.color}
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Live Validation Results</h2>
            <p className="text-gray-300 text-lg">
              See how real companies are achieving transformative results with our AI agents. 
              These aren't hypothetical case studies - they're ongoing success stories happening right now.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 mb-20">
            {caseStudies.map((study, index) => (
              <CaseStudy 
                key={index}
                company={study.company}
                logo={study.logo}
                description={study.description}
                results={study.results}
                agents={study.agents}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Agent Dependency Section */}
      <section className="py-20 bg-gradient-to-b from-company-dark to-black relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Agent Dependency Proof</h2>
              <p className="text-gray-300 text-lg mb-6">
                The strongest validation? These companies can't work effectively without our agents anymore. 
                90% daily engagement across all functions means entrepreneurs have become dependent on their 
                AI co-workers - not because they have to, but because the agents make them dramatically more effective.
              </p>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Daily Engagement Rate</h3>
                <div className="flex items-end h-32 space-x-2">
                  {dependencyData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <motion.div 
                        className="w-8 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-md"
                        style={{ height: `${item.value * 0.3}%` }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${item.value * 0.3}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      ></motion.div>
                      <span className="text-xs text-gray-400 mt-2">{item.day}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">Average 90% daily engagement across all client companies</p>
              </div>
              
              <div className="flex items-center text-blue-400">
                <div className="mr-4 p-3 bg-blue-500/10 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Validated Dependency</h4>
                  <p className="text-sm text-gray-400">Companies integrate our agents into their daily workflows</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-bold mb-6">Coordination Intelligence</h3>
              <p className="text-gray-300 mb-8">
                Unlike disconnected SaaS tools that require expensive integration, our agents communicate natively. 
                They work together seamlessly to solve complex business challenges.
              </p>
              
              <div className="relative mb-12">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                {[
                  { agent: "SENTRY", action: "Identifies a hot lead", icon: <Users className="h-5 w-5 text-blue-400" /> },
                  { agent: "ALEX", action: "Prepares contract templates", icon: <CheckCircle className="h-5 w-5 text-purple-400" /> },
                  { agent: "FELIX", action: "Updates revenue forecasts", icon: <BarChart2 className="h-5 w-5 text-cyan-400" /> },
                  { agent: "MJ", action: "Optimizes marketing campaigns", icon: <ArrowRight className="h-5 w-5 text-green-400" /> }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    className="flex mb-8 last:mb-0 items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-company-dark border-2 border-blue-500 flex items-center justify-center z-10 mr-4">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{step.agent}</h4>
                      <p className="text-gray-400">{step.action}</p>
                    </div>
                  </motion.div>
                ))}
                <p className="ml-12 text-green-400 font-semibold">All without human intervention</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* AIMF Advantage Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The AIMF Advantage</h2>
              <p className="text-gray-300 text-lg">
                We didn't build 500 agents and hope they'd work. We started with 15-25 core agents, validated what 
                entrepreneurs actually need through real usage, then scaled intelligently. This AI Market Fit (AIMF) 
                approach means every agent has proven value before expansion.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-16"
            >
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Bottom Line</h3>
              <p className="text-gray-200 text-lg">
                Our agents aren't demo software - they're production-ready AI co-workers generating millions in value for real 
                companies right now. The proof isn't in presentations; it's in the daily dependency of successful entrepreneurs 
                who can't imagine working without ALEX, FELIX, MJ, EDITH, and SENTRY.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-lg text-lg">
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 px-8 py-6 rounded-lg text-lg">
                Schedule a Demo <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Proof; 