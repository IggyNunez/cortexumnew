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
import TeamSection from "@/components/TeamSection";
import ContentFunnelSection from "@/components/ContentFunnelSection";

import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import MobileChatbot from "@/components/MobileChatbot";
import { MessageSquare } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";
import SectionDivider from "@/components/SectionDivider";
import ParallaxSection from "@/components/ParallaxSection";
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
      
      {/* Add gradient divider with parallax effect */}
      <SectionDivider gradient="light" height="80px" parallaxSpeed={0.15} />
      
      {/* Apply parallax effect to each section */}
      <ParallaxSection speed={0.1} className="fade-section">
        <ClientLogos />
      </ParallaxSection>
      
      <SectionDivider gradient="blue" height="80px" parallaxSpeed={0.2} />
      
      <ParallaxSection speed={0.15} reverse={true} className="fade-section">
        <ServicesSection />
      </ParallaxSection>
      
      <SectionDivider gradient="purple" height="80px" parallaxSpeed={0.15} />
      
      <ParallaxSection speed={0.1} className="fade-section">
        <BenefitsSection />
      </ParallaxSection>
      
      <SectionDivider gradient="light" height="80px" parallaxSpeed={0.2} />
      
      <ParallaxSection speed={0.15} reverse={true} className="fade-section">
        <TestimonialsSection />
      </ParallaxSection>
      
      <SectionDivider gradient="blue" height="80px" parallaxSpeed={0.15} />
      
      <ParallaxSection speed={0.1} className="fade-section">
        <WhyHireUsSection />
      </ParallaxSection>
      
      <SectionDivider gradient="purple" height="80px" parallaxSpeed={0.2} />
      
      <ParallaxSection speed={0.15} reverse={true} className="fade-section">
        <TeamSection />
      </ParallaxSection>
      
      <SectionDivider gradient="blue" height="80px" parallaxSpeed={0.15} />
      
      <ParallaxSection speed={0.1} className="fade-section">
        <ContentFunnelSection />
      </ParallaxSection>
      
      <SectionDivider gradient="purple" height="80px" parallaxSpeed={0.2} />
      
      <ParallaxSection speed={0.15} reverse={true} className="fade-section">
        <FutureInsights />
      </ParallaxSection>
      
      <SectionDivider gradient="light" height="80px" parallaxSpeed={0.15} />
      
      <ParallaxSection speed={0.1} className="fade-section">
        <ContactSection />
      </ParallaxSection>
      
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
