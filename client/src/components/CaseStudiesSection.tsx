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
      client: "Jamil Damji Real Estate",
      title: "AI-Powered Lead Qualification",
      description: "How Jamil Damji's real estate business automated lead qualification and increased closing rates.",
      metrics: [
        { label: "Lead Qualification", value: "24/7" },
        { label: "Response Time", value: "-78%" },
        { label: "Closing Rate", value: "+45%" }
      ],
      image: "jamil"
    },
    {
      client: "Bommorito Performance",
      title: "Automated Client Reporting",
      description: "How Bommorito Performance elite training center saved 20+ hours per week with AI-automated reporting.",
      metrics: [
        { label: "Time Saved", value: "20+ hrs/week" },
        { label: "Client Satisfaction", value: "+42%" },
        { label: "Revenue Growth", value: "31%" }
      ],
      image: "bommorito"
    },
    {
      client: "Sunday Golf",
      title: "Amazon Store Optimization",
      description: "How Sunday Golf automated their Amazon store reports and optimized their ad campaigns for better performance.",
      metrics: [
        { label: "Ad ROI", value: "+123%" },
        { label: "Reporting Time", value: "-85%" },
        { label: "Sales Growth", value: "47%" }
      ],
      image: "sundaygolf"
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
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Success Stories with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-extrabold">Real Results</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto font-medium"
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
                <div className="text-sm text-gray-600 font-medium mb-2">{study.client}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{study.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{study.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric, mIndex) => (
                    <div key={mIndex} className="text-center">
                      <div className="text-primary font-bold text-xl">{metric.value}</div>
                      <div className="text-gray-700 text-sm font-medium">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="#contact" 
                  className="text-primary font-bold flex items-center hover:underline focus:outline-none focus:text-primary-dark"
                  aria-label={`Read ${study.client} case study`}
                >
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
          <a 
            href="#contact" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Contact us to get similar results for your agency"
          >
            Get Similar Results for Your Agency
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;