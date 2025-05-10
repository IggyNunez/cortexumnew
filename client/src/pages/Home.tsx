import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FutureInsights from "@/components/FutureInsights";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import MobileChatbot from "@/components/MobileChatbot";

const Home = () => {
  const [isMobileChatbotOpen, setIsMobileChatbotOpen] = useState(false);
  
  const toggleMobileChatbot = () => {
    setIsMobileChatbotOpen(!isMobileChatbotOpen);
  };

  return (
    <div className="relative">
      {/* Meta information */}
      <title>Vibe Marketing AI | AI Automation for Marketing Agencies</title>
      <meta name="description" content="Transform your marketing agency with AI automation. Increase revenue, enhance productivity, and deliver better results for clients with Vibe Marketing AI solutions." />
      
      <Navbar />
      <Hero />
      <ClientLogos />
      <ServicesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FutureInsights />
      <ContactSection />
      <Footer />
      
      {/* Desktop Chatbot */}
      <Chatbot />
      
      {/* Mobile Chatbot Toggle Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleMobileChatbot}
          className="gradient-bg h-16 w-16 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
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
