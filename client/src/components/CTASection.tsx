import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://pixabay.com/get/gcdd002ca5b28b18f15ba8a82084eb13be1566b954cba3d5851ca7dcaf624339530fcc2f4ff796cd0d2fa94000f8e7b25b339c389faa9b1e42b342623d7576f31_1280.jpg" 
              alt="AI marketing automation dashboard" 
              className="rounded-xl shadow-2xl" 
            />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">Ready to Revolutionize Your Marketing Agency?</h2>
            <p className="text-xl text-gray-300">
              Join hundreds of agencies that have transformed their operations and dramatically increased their revenue with our AI solutions.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mt-1 mr-3" />
                <span>Personalized onboarding and implementation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mt-1 mr-3" />
                <span>Dedicated support from AI specialists</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mt-1 mr-3" />
                <span>Results-driven strategies tailored to your agency</span>
              </li>
            </ul>
            <div className="pt-4">
              <a 
                href="#contact" 
                className="bg-accent hover:bg-accent-dark px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Get Your Free Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
