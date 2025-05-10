import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80",
      title: "AI Implementation & Integration",
      description: "We seamlessly integrate AI tools into your existing workflow and tech stack, ensuring minimal disruption and maximum impact.",
      features: [
        "Custom AI solution design for your specific needs",
        "Integration with CRM, analytics, and marketing platforms",
        "Workflow automation and process optimization"
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80",
      title: "AI Strategy & Training",
      description: "We educate your team on leveraging AI tools effectively and develop strategic roadmaps for AI-powered growth.",
      features: [
        "Comprehensive team training and skill development",
        "AI implementation strategy and roadmap creation",
        "Ongoing support and strategic consulting"
      ]
    }
  ];

  const additionalServices = [
    {
      icon: "fa-robot",
      title: "AI Chatbot Development",
      description: "Create sophisticated conversational AI tools for lead generation, customer service, and engagement."
    },
    {
      icon: "fa-chart-pie",
      title: "AI Analytics & Insights",
      description: "Leverage predictive analytics and data mining to extract actionable insights from your marketing data."
    },
    {
      icon: "fa-pencil-alt",
      title: "AI Content Creation",
      description: "Implement AI-powered content generation tools to scale your creative production efficiently."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Integration Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive solutions to elevate your agency's capabilities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover object-center hover:scale-105 transition duration-500" 
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="h-6 w-6 rounded-full gradient-bg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalServices.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-lg gradient-bg flex items-center justify-center mb-6">
                <i className={`fas ${service.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
