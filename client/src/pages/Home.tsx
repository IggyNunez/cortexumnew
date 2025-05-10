import { useEffect } from "react";
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
import { useScrollFade } from "@/hooks/useScrollFade";
import SectionDivider from "@/components/SectionDivider";
import ParallaxSection from "@/components/ParallaxSection";
import CortexuumLogo from "@/components/CortexuumLogo";

const Home = () => {
  // Use our scroll fade hook
  useScrollFade();

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
    </div>
  );
};

export default Home;
