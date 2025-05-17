
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const demoConversations = {
  sales: [
    { role: "assistant", content: "Hi there! I'm your Sales AI assistant. I've analyzed that Acme Corp has shown interest in our enterprise solution. Would you like me to reach out to their procurement team?" },
    { role: "user", content: "Yes, please do. What information do you have on their budget?" },
    { role: "assistant", content: "Based on my analysis of their recent technology investments and company size, I estimate they have a budget of $150,000-200,000 for this initiative. Their fiscal year ends in Q4, suggesting they may want to finalize within 2 months. Would you like me to prepare a proposal tailored to their specific needs?" },
    { role: "user", content: "That sounds good. Make sure to highlight our integration capabilities." },
    { role: "assistant", content: "Perfect! I'll create a proposal emphasizing our integration capabilities, particularly with their existing Salesforce and Microsoft systems. I'll also include case studies from similar companies in their industry. The proposal will be ready for your review in 30 minutes. Should I schedule a follow-up call with their team for next Tuesday?" }
  ],
  marketing: [
    { role: "assistant", content: "Good morning! I've analyzed last month's campaign performance. Our LinkedIn ads are outperforming Facebook by 37% for lead generation. Should I reallocate 20% of the Facebook budget to LinkedIn?" },
    { role: "user", content: "That makes sense. What content is performing best?" },
    { role: "assistant", content: "The 'Future of AI in Finance' whitepaper is generating the highest quality leads with a 28% download-to-demo conversion rate. Based on engagement patterns, I've drafted three new content pieces targeting similar pain points. Would you like to review the outlines? I can also create variants for A/B testing." },
    { role: "user", content: "Yes, please send them over. Also, we need to prepare for the upcoming product launch." },
    { role: "assistant", content: "I've placed the content outlines in your shared folder. For the product launch, I've already started developing a multi-channel strategy. Based on previous launch analytics, I recommend focusing on LinkedIn, industry podcasts, and targeted webinars. I've drafted a 6-week campaign timeline with budget allocations if you'd like to review it." }
  ],
  product: [
    { role: "assistant", content: "Hi there! I've aggregated user feedback from the past month. There's a clear pattern suggesting users find the onboarding process too complex. 68% of new users aren't completing setup within the first session." },
    { role: "user", content: "That's concerning. What do you suggest we do about it?" },
    { role: "assistant", content: "I recommend a three-step approach: 1) Simplify the initial form from 12 fields to the 5 most essential ones, 2) Add interactive tooltips for complex features, and 3) Create a skip option for non-critical setup steps. Based on A/B tests I've simulated, these changes could improve completion rates by approximately 42%. Would you like me to draft detailed specifications for the development team?" },
    { role: "user", content: "Yes, please do. Also, what's the status on the new analytics dashboard feature?" },
    { role: "assistant", content: "I'll prepare those specifications today. Regarding the analytics dashboard, I've prioritized it as high impact based on user requests and competitor analysis. The UX team delivered wireframes yesterday, which I've reviewed against our success metrics. There are two areas that need refinement to better meet enterprise user needs. I can schedule a review meeting with the design team for tomorrow if you're available." }
  ],
  engineering: [
    { role: "assistant", content: "Good morning! I've completed the code review for the payment processing module. There are 3 critical issues related to transaction handling and 7 minor code quality concerns. I've created automated fixes for 5 of them already." },
    { role: "user", content: "Thanks. What about the API performance bottleneck we discussed yesterday?" },
    { role: "assistant", content: "I've identified the root cause in the database query structure. The current approach is making N+1 queries, causing significant latency. I've implemented a solution using eager loading and query optimization that reduces response time by 78% under full load. The PR is ready for your review. I've also added comprehensive tests that verify performance under various load conditions." },
    { role: "user", content: "Great! Can you implement similar optimizations for the user management service?" },
    { role: "assistant", content: "Absolutely. I'll analyze the user management service code today. Based on similar patterns I've observed, I anticipate we can achieve a 40-60% performance improvement through caching strategies and query optimization. I'll also implement connection pooling to better handle concurrent requests. You'll have a PR with full documentation by end of day. Would you like me to prioritize any specific user flows for optimization?" }
  ]
};

const DemoSection = () => {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <section className="py-24 bg-gradient-to-b from-company-blue/90 to-company-dark">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">See AI Assistants in Action</h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Experience how our AI assistants communicate naturally to solve real business challenges
          </p>
        </motion.div>
        
        <Tabs defaultValue="sales" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
          </TabsList>
          
          {Object.keys(demoConversations).map((key) => (
            <TabsContent key={key} value={key} className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {demoConversations[key as keyof typeof demoConversations].map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-4 ${
                              message.role === "assistant" 
                                ? "bg-company-dark border border-gray-800 text-gray-200" 
                                : "bg-company-purple/20 border border-company-purple/30 text-white"
                            }`}
                          >
                            {message.content}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default DemoSection;
