import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const Results = () => {
  const stats = [
    { value: "147%", label: "Average ROI", description: "Agencies see significant return on their AI investment within the first 6 months." },
    { value: "68%", label: "Time Saved", description: "Reduction in time spent on repetitive tasks through AI automation." },
    { value: "41%", label: "Revenue Growth", description: "Average increase in agency revenue after implementing our AI solutions." }
  ];

  const caseStudyResults = [
    "Client reporting time reduced from 8 hours to 45 minutes per client",
    "Campaign performance improved by 32% through AI-powered optimization",
    "Team was able to take on 40% more clients without adding staff"
  ];

  return (
    <section id="results" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Results for Agencies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">See the impact our AI solutions have delivered for agencies like yours</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-xl font-semibold mb-4">{stat.label}</p>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Case Study */}
        <motion.div 
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80" 
                  alt="Marketing agency team celebrating success" 
                  className="rounded-xl shadow-md w-full h-auto" 
                />
              </div>
              <div className="md:w-2/3">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">CASE STUDY</div>
                <h3 className="text-2xl font-bold mb-4">How DigitalEdge Agency Increased Client Retention by 87%</h3>
                <p className="text-gray-700 mb-6">
                  DigitalEdge, a boutique marketing agency with 15 employees, was struggling with scaling their operations and maintaining consistent results across clients. After implementing our AI automation solutions:
                </p>
                <ul className="space-y-3 mb-6">
                  {caseStudyResults.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 mt-1 h-5 w-5" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-gray-300 flex items-center justify-center">
                    JD
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Jennifer Davis</p>
                    <p className="text-gray-600 text-sm">Founder, DigitalEdge Agency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
