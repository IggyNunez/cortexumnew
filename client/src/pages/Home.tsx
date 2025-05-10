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
      
      {/* Simple gradient divider */}
      <SectionDivider gradient="brain-blue" height="60px" parallaxSpeed={0.05} />
      
      {/* Client logos section */}
      <ParallaxSection 
        speed={0.03} 
        className="fade-section" 
        sticky={false}
        minHeight="auto"
        zIndex={1}
      >
        <ClientLogos />
      </ParallaxSection>
      
      <SectionDivider gradient="brain-purple" height="60px" parallaxSpeed={0.03} zIndex={2} />
      
      {/* Services section - simple regular section */}
      <section id="services" className="py-16 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <ServicesSection />
      </section>
      
      <SectionDivider gradient="brain-magenta" height="60px" parallaxSpeed={0.03} zIndex={2} />
      
      {/* Benefits section - no sticky effect for simpler scrolling */}
      <section id="benefits" className="py-16 bg-gradient-to-br from-[#ffffff] to-[#f5f5f5]">
        <BenefitsSection />
      </section>
      
      <SectionDivider gradient="brain-blue" height="60px" parallaxSpeed={0.03} zIndex={2} />
      
      {/* Testimonials section */}
      <section id="testimonials" className="py-16 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <TestimonialsSection />
      </section>
      
      <SectionDivider gradient="brain-purple" height="60px" parallaxSpeed={0.03} zIndex={2} />
      
      {/* Why hire us section */}
      <section id="why-hire-us" className="py-16 bg-gradient-to-br from-[#ffffff] to-[#f5f5f5]">
        <WhyHireUsSection />
      </section>
      
      <SectionDivider gradient="brain-magenta" height="60px" parallaxSpeed={0.03} zIndex={2} />
      
      {/* Content funnel section */}
      <section id="content-funnel" className="py-16 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <ContentFunnelSection />
      </section>
      
      <SectionDivider gradient="brain-blue" height="60px" parallaxSpeed={0.03} zIndex={2} />
      
      {/* Future insights section */}
      <section id="future-insights" className="py-16 bg-gradient-to-br from-[#ffffff] to-[#f5f5f5]">
        <FutureInsights />
      </section>
      
      <SectionDivider gradient="brain-purple" height="60px" parallaxSpeed={0.03} zIndex={2} />
      
      {/* Contact section */}
      <section id="contact" className="py-16 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <ContactSection />
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
