import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Network, ArrowUpDown, BarChart3, CodeSquare, MessageCircle, ZapIcon } from 'lucide-react';

// Define message interface
interface Message {
  role: "assistant" | "user";
  content: string;
  tab: string;
}

// Custom hook for typewriter effect
const useTypewriter = (text: string, speed: number = 30, shouldStart: boolean = false) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (!shouldStart) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed, shouldStart]);

  return { displayedText, isComplete };
};

// Conversation that animates in sequence
const AnimatedConversation = ({ messages, isActive }: { messages: Message[], isActive: boolean }) => {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  
  // Reset to first message when tab becomes active
  useEffect(() => {
    if (isActive) {
      setActiveMessageIndex(0);
    }
  }, [isActive]);
  
  // Move to next message when current one completes
  const handleMessageComplete = (index: number) => {
    if (index === activeMessageIndex && index < messages.length - 1) {
      setActiveMessageIndex(index + 1);
    }
  };
  
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        // Only render messages up to the current active index
        index <= activeMessageIndex && (
          <AnimatedMessage
            key={index}
            message={message}
            index={index}
            isActive={isActive}
            isCurrentlyAnimating={index === activeMessageIndex}
            onComplete={() => handleMessageComplete(index)}
          />
        )
      ))}
    </div>
  );
};

// Message component with typing effect
const AnimatedMessage = ({ 
  message, 
  index, 
  isActive,
  isCurrentlyAnimating,
  onComplete
}: { 
  message: Message, 
  index: number, 
  isActive: boolean,
  isCurrentlyAnimating: boolean,
  onComplete: () => void
}) => {
  const typeSpeed = message.role === "assistant" ? 10 : 5; // User messages type faster
  const { displayedText, isComplete } = useTypewriter(message.content, typeSpeed, isCurrentlyAnimating && isActive);
  
  // Call the completion handler when animation is done
  useEffect(() => {
    if (isComplete) {
      // Add a small delay before showing the next message
      const timeout = setTimeout(() => {
        onComplete();
      }, 500); // 500ms delay between messages
      
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onComplete]);
  
  // For completed animations
  if (!isCurrentlyAnimating || isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
      >
        <div 
          className={`max-w-[80%] rounded-lg p-4 ${
            message.role === "assistant" 
              ? (message.tab === "orchestrator" 
                ? "bg-green-900/40 border border-green-800/70 text-gray-200" 
                : "bg-gray-950/90 border border-gray-800/70 text-gray-200")
              : "bg-blue-900/70 backdrop-blur-sm border border-blue-800/30 text-white"
          }`}
        >
          {message.content}
        </div>
      </motion.div>
    );
  }
  
  // For messages that are currently being animated
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
    >
      <div 
        className={`max-w-[80%] rounded-lg p-4 ${
          message.role === "assistant" 
            ? (message.tab === "orchestrator" 
              ? "bg-green-900/40 border border-green-800/70 text-gray-200" 
              : "bg-gray-950/90 border border-gray-800/70 text-gray-200")
            : "bg-blue-900/70 backdrop-blur-sm border border-blue-800/30 text-white"
        }`}
      >
        {displayedText}
        <span className="inline-block w-1 h-4 ml-0.5 align-text-bottom bg-blue-400 animate-pulse"></span>
      </div>
    </motion.div>
  );
};

const demoConversations: Record<string, Message[]> = {
  orchestrator: [
    { role: "assistant", content: "Welcome back! I've been orchestrating your AI team's activities across departments. Here's a quick summary of key initiatives:", tab: "orchestrator" },
    { role: "user", content: "Thanks Jarvis. What's the status of our Q4 product launch?", tab: "orchestrator" },
    { role: "assistant", content: "The Q4 launch is on track. I've coordinated with Caspian (Product) to finalize feature specs, Edith (Engineering) reports 87% code completion with all critical paths tested, and MJ (Marketing) has prepared the go-to-market strategy with 12 content pieces ready. Alfred (Sales) has identified 37 high-potential leads for early access. Would you like me to pull the detailed progress report from any specific team?", tab: "orchestrator" },
    { role: "user", content: "No need for details now. What about the customer churn issue we discussed last week?", tab: "orchestrator" },
    { role: "assistant", content: "I've assembled a cross-functional solution. Based on Alfred's customer feedback analysis, Caspian identified three critical UX improvements needed. Edith has already implemented two of them, with the third scheduled for deployment next Tuesday. Meanwhile, MJ has created a targeted retention campaign for at-risk accounts, which has already improved our predicted retention rate by 14%. All of this is documented in the shared workspace I've created for tracking this initiative.", tab: "orchestrator" }
  ],
  sales: [
    { role: "assistant", content: "Hi there! I'm your Sales AI assistant. I've analyzed that Acme Corp has shown interest in our enterprise solution. Would you like me to reach out to their procurement team?", tab: "sales" },
    { role: "user", content: "Yes, please do. What information do you have on their budget?", tab: "sales" },
    { role: "assistant", content: "Based on my analysis of their recent technology investments and company size, I estimate they have a budget of $150,000-200,000 for this initiative. Their fiscal year ends in Q4, suggesting they may want to finalize within 2 months. Would you like me to prepare a proposal tailored to their specific needs?", tab: "sales" },
    { role: "user", content: "That sounds good. Make sure to highlight our integration capabilities.", tab: "sales" },
    { role: "assistant", content: "Perfect! I'll create a proposal emphasizing our integration capabilities, particularly with their existing Salesforce and Microsoft systems. I'll also include case studies from similar companies in their industry. The proposal will be ready for your review in 30 minutes. Should I schedule a follow-up call with their team for next Tuesday?", tab: "sales" }
  ],
  marketing: [
    { role: "assistant", content: "Good morning! I've analyzed last month's campaign performance. Our LinkedIn ads are outperforming Facebook by 37% for lead generation. Should I reallocate 20% of the Facebook budget to LinkedIn?", tab: "marketing" },
    { role: "user", content: "That makes sense. What content is performing best?", tab: "marketing" },
    { role: "assistant", content: "The 'Future of AI in Finance' whitepaper is generating the highest quality leads with a 28% download-to-demo conversion rate. Based on engagement patterns, I've drafted three new content pieces targeting similar pain points. Would you like to review the outlines? I can also create variants for A/B testing.", tab: "marketing" },
    { role: "user", content: "Yes, please send them over. Also, we need to prepare for the upcoming product launch.", tab: "marketing" },
    { role: "assistant", content: "I've placed the content outlines in your shared folder. For the product launch, I've already started developing a multi-channel strategy. Based on previous launch analytics, I recommend focusing on LinkedIn, industry podcasts, and targeted webinars. I've drafted a 6-week campaign timeline with budget allocations if you'd like to review it.", tab: "marketing" }
  ],
  product: [
    { role: "assistant", content: "Hi there! I've aggregated user feedback from the past month. There's a clear pattern suggesting users find the onboarding process too complex. 68% of new users aren't completing setup within the first session.", tab: "product" },
    { role: "user", content: "That's concerning. What do you suggest we do about it?", tab: "product" },
    { role: "assistant", content: "I recommend a three-step approach: 1) Simplify the initial form from 12 fields to the 5 most essential ones, 2) Add interactive tooltips for complex features, and 3) Create a skip option for non-critical setup steps. Based on A/B tests I've simulated, these changes could improve completion rates by approximately 42%. Would you like me to draft detailed specifications for the development team?", tab: "product" },
    { role: "user", content: "Yes, please do. Also, what's the status on the new analytics dashboard feature?", tab: "product" },
    { role: "assistant", content: "I'll prepare those specifications today. Regarding the analytics dashboard, I've prioritized it as high impact based on user requests and competitor analysis. The UX team delivered wireframes yesterday, which I've reviewed against our success metrics. There are two areas that need refinement to better meet enterprise user needs. I can schedule a review meeting with the design team for tomorrow if you're available.", tab: "product" }
  ],
  engineering: [
    { role: "assistant", content: "Morning! I just finished reviewing the website's loading performance. The homepage is taking over 4 seconds to load on mobile connections. I found three main issues: uncompressed images, render-blocking JavaScript, and unused CSS that's slowing things down.", tab: "engineering" },
    { role: "user", content: "That's definitely too slow. Can you fix it? And what about the checkout page bug we talked about yesterday?", tab: "engineering" },
    { role: "assistant", content: "I'll optimize the website speed today. I'll compress and convert images to WebP format, implement lazy loading for below-the-fold content, and set up proper caching headers. Based on my tests, this should improve load times by at least 60%. For the checkout bug, I identified the problem - a race condition when validating payment details. I've created a fix that adds proper state management and error handling. The PR is ready for review with a full testing suite that verifies different payment scenarios.", tab: "engineering" },
    { role: "user", content: "Great! Can you also update our React components to use the latest version?", tab: "engineering" },
    { role: "assistant", content: "Absolutely. I'll update all React components from v17 to v18, including implementing the new concurrent features for a more responsive UI. I'll handle any deprecated API changes and update our custom hooks to follow the new patterns. I've already set up a staging environment to test the changes in isolation before deployment, and created a detailed migration checklist. Since this touches lots of components, would you like me to do this incrementally by feature, or update everything at once?", tab: "engineering" }
  ]
};

const DemoSection = () => {
  const [activeTab, setActiveTab] = useState("orchestrator");
  const [resetAnimation, setResetAnimation] = useState(false);
  
  // Reset animation when tab changes
  const handleTabChange = (tab: string) => {
    setResetAnimation(true);
    setActiveTab(tab);
    // Small delay to ensure animation resets
    setTimeout(() => setResetAnimation(false), 50);
  };

  return (
    <section className="py-24 relative overflow-hidden min-h-[800px] h-screen">
      {/* TEAM.png background - Fixed size */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("/TEAM.png")',
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-blue-950/30"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10 h-full flex flex-col">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">See AI Assistants in Action</h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Experience how our AI assistants communicate naturally to solve real business challenges
          </p>
        </motion.div>
        
        {/* Fixed height content container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto">
            <Tabs defaultValue="orchestrator" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-black/30 backdrop-blur-sm">
                <TabsTrigger value="orchestrator" className="data-[state=active]:bg-green-700 data-[state=active]:text-white flex items-center gap-1.5">
                  <Network className="w-4 h-4" />
                  <span>Orchestrator</span>
                </TabsTrigger>
                <TabsTrigger value="sales" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">Sales</TabsTrigger>
                <TabsTrigger value="marketing" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">Marketing</TabsTrigger>
                <TabsTrigger value="product" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">Product</TabsTrigger>
                <TabsTrigger value="engineering" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">Engineering</TabsTrigger>
          </TabsList>
              
              {activeTab === "orchestrator" && (
                <div className="mt-2 mb-3">
                  <div className="w-full p-2 rounded bg-gray-950/40 backdrop-blur-sm border border-green-900/30 flex justify-center">
                    <div className="flex gap-3 text-gray-400 text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                        <span>Jarvis</span>
                      </div>
                      <ArrowUpDown className="w-3 h-3 text-gray-600" />
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                        <span>Alfred</span>
                      </div>
                      <ArrowUpDown className="w-3 h-3 text-gray-600" />
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                        <span>MJ</span>
                      </div>
                      <ArrowUpDown className="w-3 h-3 text-gray-600" />
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                        <span>Caspian</span>
                      </div>
                      <ArrowUpDown className="w-3 h-3 text-gray-600" />
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mr-1"></div>
                        <span>Edith</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          
          {Object.keys(demoConversations).map((key) => (
                <TabsContent key={key} value={key} className="mt-4">
              <motion.div
                    key={resetAnimation ? "reset" : "normal"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                    className="h-[400px] overflow-auto"
              >
                    <Card className="bg-black/60 backdrop-blur-sm border-gray-800/50 shadow-xl h-full">
                      <CardContent className="p-6 h-full">
                        {!resetAnimation && (
                          <AnimatedConversation 
                            messages={demoConversations[key as keyof typeof demoConversations]} 
                            isActive={activeTab === key}
                          />
                        )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
