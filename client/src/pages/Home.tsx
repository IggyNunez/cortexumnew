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
      
      {/* Add gradient divider with parallax effect - updated with brain-inspired gradients */}
      <SectionDivider gradient="brain-blue" height="120px" parallaxSpeed={0.15} />
      
      {/* Apply sticky parallax effect to the first client logos section */}
      <ParallaxSection 
        speed={0.08} 
        className="fade-section" 
        sticky={true} 
        stickyThreshold={0.25}
        minHeight="100vh"
        zIndex={1}
      >
        <ClientLogos />
      </ParallaxSection>
      
      <SectionDivider gradient="brain-purple" height="150px" parallaxSpeed={0.2} zIndex={2} />
      
      {/* Services section with sticky parallax */}
      <ParallaxSection 
        speed={0.1} 
        reverse={true} 
        className="fade-section" 
        sticky={true}
        stickyThreshold={0.2}
        minHeight="100vh"
        zIndex={1}
      >
        <ServicesSection />
      </ParallaxSection>
      
      <SectionDivider gradient="brain-magenta" height="150px" parallaxSpeed={0.15} zIndex={2} />
      
      {/* Benefits section with sticky effect */}
      <ParallaxSection 
        speed={0.08} 
        className="fade-section" 
        sticky={true}
        stickyThreshold={0.25}
        minHeight="100vh"
        zIndex={1}
      >
        <BenefitsSection />
      </ParallaxSection>
      
      <SectionDivider gradient="brain-blue" height="150px" parallaxSpeed={0.2} zIndex={2} />
      
      {/* Testimonials with subtle parallax */}
      <ParallaxSection 
        speed={0.12} 
        reverse={true} 
        className="fade-section"
        sticky={true}
        stickyThreshold={0.2}
        minHeight="100vh"
        zIndex={1}
      >
        <TestimonialsSection />
      </ParallaxSection>
      
      <SectionDivider gradient="brain-purple" height="150px" parallaxSpeed={0.15} zIndex={2} />
      
      {/* Why hire us section */}
      <ParallaxSection 
        speed={0.08} 
        className="fade-section"
        sticky={true}
        stickyThreshold={0.25}
        minHeight="100vh"
        zIndex={1}
      >
        <WhyHireUsSection />
      </ParallaxSection>
      
      <SectionDivider gradient="brain-magenta" height="150px" parallaxSpeed={0.2} zIndex={2} />
      
      {/* Content funnel section */}
      <ParallaxSection 
        speed={0.08} 
        className="fade-section"
        sticky={true}
        stickyThreshold={0.25}
        minHeight="100vh"
        zIndex={1}
      >
        <ContentFunnelSection />
      </ParallaxSection>
      
      <SectionDivider gradient="brain-blue" height="150px" parallaxSpeed={0.2} zIndex={2} />
      
      {/* Future insights section */}
      <ParallaxSection 
        speed={0.12} 
        reverse={true} 
        className="fade-section"
        sticky={true}
        stickyThreshold={0.2}
        minHeight="100vh"
        zIndex={1}
      >
        <FutureInsights />
      </ParallaxSection>
      
      <SectionDivider gradient="brain-purple" height="150px" parallaxSpeed={0.15} zIndex={2} />
      
      {/* Contact section - no sticky effect for last section */}
      <ParallaxSection 
        speed={0.05} 
        className="fade-section"
        zIndex={1}
      >
        <ContactSection />
      </ParallaxSection>
      
      <Footer />
      
      {/* Desktop Chatbot */}
      <Chatbot />
      
      {/* Mobile Chatbot Toggle Button - updated with brain-inspired gradient */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleMobileChatbot}
          className="bg-[#E63E8B] h-14 w-14 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition duration-300"
          style={{
            background: "linear-gradient(135deg, #357BD8, #E63E8B)",
            boxShadow: "0 4px 15px rgba(230, 62, 139, 0.5)"
          }}
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
