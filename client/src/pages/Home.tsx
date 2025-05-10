import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Benefits from "@/components/Benefits";
import Services from "@/components/Services";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
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
      <Navbar />
      <Hero />
      <ClientLogos />
      <Benefits />
      <Services />
      <Results />
      <Testimonials />
      <CTA />
      <ContactForm />
      <Footer />
      
      {/* Fixed Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleMobileChatbot}
          className="gradient-bg h-16 w-16 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition duration-300"
        >
          <i className="fas fa-robot text-2xl"></i>
        </button>
      </div>
      
      {/* Desktop Chatbot is included in Contact Form section */}
      {/* Mobile Chatbot (fullscreen) */}
      <MobileChatbot 
        isOpen={isMobileChatbotOpen} 
        onClose={() => setIsMobileChatbotOpen(false)} 
      />
    </div>
  );
};

export default Home;
