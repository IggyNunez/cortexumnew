import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  PenTool, 
  Download,
  Calendar
} from 'lucide-react';

const ContentFunnelSection = () => {
  // Temperature stages with descriptions
  const temperatureStages = [
    {
      name: "Cold Audience",
      icon: <Thermometer className="w-10 h-10 text-blue-500" />,
      description: "Complete strangers to your business who might have AI and media problems but don't know you yet.",
      strategies: [
        "Value-driven content on LinkedIn & YouTube",
        "Thought leadership articles that showcase expertise",
        "Educational content about psychology-based marketing"
      ]
    },
    {
      name: "Warm Audience",
      icon: <Thermometer className="w-10 h-10 text-yellow-500" />,
      description: "Familiar with your business and consume your content. They recognize your expertise but haven't shown buying intent.",
      strategies: [
        "Email newsletter with exclusive insights",
        "Free downloadable resources and templates",
        "Case studies and success stories"
      ]
    },
    {
      name: "Hot Audience",
      icon: <Thermometer className="w-10 h-10 text-red-500" />,
      description: "Actively showing buying intent. They've booked a call or reached out about working together.",
      strategies: [
        "Direct outreach and personalized proposals",
        "Strategy sessions and consultations",
        "Custom solution development"
      ]
    }
  ];

  // Content funnel process steps
  const funnelSteps = [
    {
      name: "Content Creation",
      icon: <PenTool className="w-8 h-8 text-purple-600" />,
      steps: [
        "Ideation: Finding topics your audience cares about",
        "Writing: Crafting clear, valuable messages",
        "Filming: Recording high-quality video content",
        "Editing: Polishing for clarity and impact",
        "Publishing: Releasing content on strategic platforms"
      ]
    },
    {
      name: "Conversion Process",
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      steps: [
        "Post: Publishing consistent, high-value content",
        "Capture: Converting viewers to email subscribers",
        "Nurture: Building trust through strategic communication",
        "Convert: Making clear calls-to-action for consultations"
      ]
    }
  ];

  // Lead magnets
  const leadMagnets = [
    {
      title: "Media Buying Checklist",
      description: "Essential checklist for optimizing your media campaigns",
      icon: <Download className="w-6 h-6 text-blue-500" />,
      link: "#lead-magnet-1"
    },
    {
      title: "Psychology-Based Marketing Guide",
      description: "Leverage psychology principles to improve conversion rates",
      icon: <Star className="w-6 h-6 text-purple-500" />,
      link: "#lead-magnet-2"
    },
    {
      title: "90-Day Content Strategy Template",
      description: "Map out your content calendar for maximum engagement",
      icon: <Calendar className="w-6 h-6 text-green-500" />,
      link: "#lead-magnet-3"
    }
  ];

  return (
    <section id="content-funnel" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our 90-Day Content Funnel Approach
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We don't just implement marketing strategies—we build systematic content funnels that consistently attract and convert your ideal clients.
          </motion.p>
        </div>

        {/* Temperature Stages */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">The Audience Temperature Journey</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {temperatureStages.map((stage, index) => (
              <motion.div 
                key={stage.name}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  {stage.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">{stage.name}</h4>
                <p className="text-gray-600 mb-5 text-center">{stage.description}</p>
                <ul className="space-y-2">
                  {stage.strategies.map((strategy, i) => (
                    <li key={i} className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Funnel Process */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">Our Content Funnel Process</h3>
          <div className="grid md:grid-cols-2 gap-10">
            {funnelSteps.map((process, index) => (
              <motion.div 
                key={process.name}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center mb-5">
                  <div className="p-3 rounded-full bg-gray-100 mr-4">
                    {process.icon}
                  </div>
                  <h4 className="text-xl font-semibold">{process.name}</h4>
                </div>
                <ol className="space-y-3 pl-6 list-decimal">
                  {process.steps.map((step, i) => (
                    <li key={i} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lead Magnets */}
        <div className="mb-12">
          <motion.h3 
            className="text-2xl font-bold text-center mb-10 text-gray-800"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Free Marketing Resources
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6">
            {leadMagnets.map((magnet, index) => (
              <motion.div 
                key={magnet.title}
                className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-gray-100 mr-3">
                    {magnet.icon}
                  </div>
                  <h4 className="font-semibold text-lg">{magnet.title}</h4>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{magnet.description}</p>
                <a 
                  href={magnet.link} 
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium"
                >
                  Download Free Resource <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default ContentFunnelSection;