import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FutureInsights from "@/components/FutureInsights";
import ContactSection from "@/components/ContactSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import MobileChatbot from "@/components/MobileChatbot";
import { MessageSquare } from "lucide-react";

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
      <PricingSection />
      <ContactSection />
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
