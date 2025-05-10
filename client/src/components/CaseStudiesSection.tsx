import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      client: "A&E",
      title: "AI-Powered Content Optimization",
      description: "How A&E increased their social engagement by 217% using our AI content optimization tools.",
      metrics: [
        { label: "Engagement Increase", value: "217%" },
        { label: "Content Creation Time", value: "-65%" },
        { label: "ROI", value: "341%" }
      ],
      image: "ae"
    },
    {
      client: "Bommorito Performance",
      title: "Automated Client Reporting",
      description: "How Pete Bommorito's NFL training company saved 20+ hours per week with AI-automated reporting.",
      metrics: [
        { label: "Time Saved", value: "20+ hrs/week" },
        { label: "Client Satisfaction", value: "+42%" },
        { label: "Revenue Growth", value: "31%" }
      ],
      image: "bommorito"
    },
    {
      client: "FormRx",
      title: "AI-Driven Lead Generation",
      description: "How FormRx increased qualified leads by 89% using our voice-enabled Hume API chatbot.",
      metrics: [
        { label: "Lead Increase", value: "89%" },
        { label: "Conversion Rate", value: "+37%" },
        { label: "Customer Acquisition Cost", value: "-41%" }
      ],
      image: "formrx"
    }
  ];

  return (
    <section id="case-studies" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Success Stories with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Real Results</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            See how we've helped marketing agencies achieve extraordinary results with AI automation.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-4xl font-bold text-gray-700">
                  {study.client}
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{study.client}</div>
                <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                <p className="text-gray-600 mb-6">{study.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric, mIndex) => (
                    <div key={mIndex} className="text-center">
                      <div className="text-primary font-bold text-xl">{metric.value}</div>
                      <div className="text-gray-500 text-sm">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <a href="#contact" className="text-primary font-semibold flex items-center hover:underline">
                  Read case study <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#contact" className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
            Get Similar Results for Your Agency
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;