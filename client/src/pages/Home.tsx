import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyHireUsSection from "@/components/WhyHireUsSection";
import FutureInsights from "@/components/FutureInsights";
import ContactSection from "@/components/ContactSection";

import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import MobileChatbot from "@/components/MobileChatbot";
import { MessageSquare } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";
import SectionDivider from "@/components/SectionDivider";
import CortexuumLogo from "@/components/CortexuumLogo";

const Home = () => {
  const [isMobileChatbotOpen, setIsMobileChatbotOpen] = useState(false);
  
  // Use our scroll fade hook
  useScrollFade();
  
  const toggleMobileChatbot = () => {
    setIsMobileChatbotOpen(!isMobileChatbotOpen);
  };

  return (
    <div className="relative">
      {/* Meta information */}
      <title>Cortexuum | Psychology Based Marketing & Media Expertise</title>
      <meta name="description" content="Boost your online impact with expert media & funnels. Data-driven, psychology-based marketing solutions that deliver real results. Transform your digital presence with Cortexuum." />
      
      <Navbar />
      <Hero />
      
      {/* Add gradient divider with wave animation */}
      <SectionDivider gradient="light" showWave={true} />
      
      {/* Apply fade-section class to each section */}
      <div className="fade-section">
        <ClientLogos />
      </div>
      
      <SectionDivider gradient="blue" showWave={true} waveColor="rgba(53, 123, 216, 0.4)" />
      
      <div className="fade-section">
        <ServicesSection />
      </div>
      
      <SectionDivider gradient="purple" showWave={true} />
      
      <div className="fade-section">
        <BenefitsSection />
      </div>
      
      <SectionDivider gradient="light" showWave={true} waveColor="rgba(230, 62, 139, 0.3)" />
      
      <div className="fade-section">
        <TestimonialsSection />
      </div>
      
      <SectionDivider gradient="blue" showWave={true} />
      
      <div className="fade-section">
        <WhyHireUsSection />
      </div>
      
      <SectionDivider gradient="purple" showWave={true} />
      
      <div className="fade-section">
        <FutureInsights />
      </div>
      
      <SectionDivider gradient="light" showWave={true} />
      
      <div className="fade-section">
        <ContactSection />
      </div>
      
      <Footer />
      
      {/* Desktop Chatbot */}
      <Chatbot />
      
      {/* Mobile Chatbot Toggle Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleMobileChatbot}
          className="bg-primary h-14 w-14 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition duration-300"
          aria-label="Open chat assistant"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Chatbot (fullscreen) */}
      <MobileChatbot 
        isOpen={isMobileChatbotOpen} 
        onClose={() => setIsMobileChatbotOpen(false)} 
      />
    </div>
  );
};

export default Home;
