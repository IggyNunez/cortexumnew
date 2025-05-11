import React from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Calendar } from 'lucide-react';

const ResourcesSection = () => {
  const resources = [
    {
      id: 'media-checklist',
      title: 'Media Buying Checklist',
      description: 'Essential checklist for optimizing your media campaigns',
      icon: <Download className="w-6 h-6 text-blue-500" />,
      href: '#',
    },
    {
      id: 'psychology-guide',
      title: 'Psychology-Based Marketing Guide',
      description: 'Leverage psychology principles to improve conversion rates',
      icon: <Star className="w-6 h-6 text-purple-500" />,
      href: '#',
    },
    {
      id: 'content-strategy',
      title: '90-Day Content Strategy Template',
      description: 'Map out your content calendar for maximum engagement',
      icon: <Calendar className="w-6 h-6 text-green-500" />,
      href: '#',
    }
  ];

  return (
    <section id="resources" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Marketing Resources</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download our free resources to help accelerate your marketing efforts and drive better results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{resource.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{resource.description}</p>
                <a
                  href={resource.href}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Download Free Resource
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;