import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="bg-gradient-to-r from-primary to-secondary rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Agency?</h2>
              <p className="text-xl text-white/80 mb-6">
                Schedule a free consultation to see how our AI solutions can drive growth for your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="bg-white text-primary px-6 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition duration-300 shadow-lg"
                >
                  Get Started Now
                </a>
                <a 
                  href="#contact" 
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition duration-300"
                >
                  Chat with AI Assistant
                </a>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Futuristic AI visualization" 
                className="rounded-xl shadow-lg w-full h-auto" 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
