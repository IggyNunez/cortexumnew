import { motion } from "framer-motion";
import { Service } from "@/types";
import { Check } from "lucide-react";

const services: Service[] = [
  {
    id: "1",
    icon: "fa-robot",
    title: "AI Integration Services",
    description: "Seamlessly integrate AI tools into your existing workflow. We handle the technical complexities so you can focus on delivering results.",
    features: [
      "Custom AI workflow design",
      "API integration & automation",
      "Data migration assistance"
    ]
  },
  {
    id: "2",
    icon: "fa-graduation-cap",
    title: "AI Strategy Training",
    description: "Learn how to leverage AI for your agency and clients. Our training programs equip your team with the skills needed to excel.",
    features: [
      "Team workshops & certification",
      "AI tools mastery courses",
      "Strategic implementation guides"
    ]
  },
  {
    id: "3",
    icon: "fa-comments",
    title: "AI Consulting",
    description: "Get expert guidance on implementing AI solutions that deliver measurable results for your agency and clients.",
    features: [
      "AI readiness assessment",
      "ROI analysis & planning",
      "Ongoing strategic support"
    ]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-medium">OUR SERVICES</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6">Comprehensive AI Solutions for Marketing Agencies</h2>
          <p className="text-gray-600 text-lg">We provide the tools, training, and integration support to transform your marketing agency with cutting-edge AI automation.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-primary-light p-6 flex justify-center">
                <i className={`fas ${service.icon} text-4xl text-white`}></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
