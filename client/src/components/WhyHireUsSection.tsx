import { motion } from "framer-motion";
import { Code, PenTool, User, LineChart } from "lucide-react";

const WhyHireUsSection = () => {
  return (
    <section className="py-16 bg-gray-50" id="why-hire-us">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Hire Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team is made up of four professionals who came together to help agencies and local businesses get the most out of AI.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {/* Developer Partner */}
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary/10 p-6">
              <Code className="h-12 w-12 text-primary mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Development Expert</h3>
              <p className="text-gray-500 text-sm">20+ Years Experience</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Our lead developer brings over 20 years of experience in the eCommerce world, helping agencies and their clients—both B2C and B2B—across retail, tech, and service industries.
              </p>
            </div>
          </motion.div>
          
          {/* Project Manager Partner */}
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-blue-50 p-6">
              <User className="h-12 w-12 text-blue-600 mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Project Manager</h3>
              <p className="text-gray-500 text-sm">15+ Years Experience</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Our dedicated project manager has over 15 years of experience orchestrating successful implementations for agencies of all sizes, ensuring smooth delivery and client satisfaction.
              </p>
            </div>
          </motion.div>
          
          {/* Copywriter Partner */}
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-amber-50 p-6">
              <PenTool className="h-12 w-12 text-amber-600 mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Copywriter</h3>
              <p className="text-gray-500 text-sm">15+ Years Experience</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Our expert copywriter has been crafting compelling content for over 15 years, specializing in marketing messaging that converts and AI prompting strategies that drive results.
              </p>
            </div>
          </motion.div>
          
          {/* Sales Manager Partner */}
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-green-50 p-6">
              <LineChart className="h-12 w-12 text-green-600 mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Sales Manager</h3>
              <p className="text-gray-500 text-sm">15+ Years Experience</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Our sales manager brings 15+ years of expertise in building effective sales processes, implementing AI-driven strategies that consistently increase conversion rates.
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How Our AI Solutions Can Help You</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Respond to leads automatically through chat, email, or text</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Set up appointments and manage schedules</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Follow up with leads so nothing slips through the cracks</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Write and run targeted email campaigns</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Handle basic support 24/7 with smart chatbots</span>
              </li>
            </ul>
            
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-gray-700 font-medium">
                We can do everything for you, or help you and your team learn how to do it yourselves.
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-amber-700 font-bold">Don't get left behind!</span>
                <a 
                  href="#contact" 
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Contact Us Today →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyHireUsSection;