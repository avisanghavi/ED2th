
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AIAssistantsSection from '../components/AIAssistantsSection';
import BenefitsSection from '../components/BenefitsSection';
import DemoSection from '../components/DemoSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-company-dark text-white">
      <Navbar />
      <HeroSection />
      <AIAssistantsSection />
      <BenefitsSection />
      <DemoSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
