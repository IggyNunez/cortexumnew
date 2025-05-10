import { motion } from "framer-motion";
import { Testimonial } from "@/types";
import { Star } from "lucide-react";

const testimonials: Testimonial[] = [
  {
    id: "1",
    text: "Implementing Vibe AI's solutions allowed us to double our client capacity while reducing project delivery time by 40%. The ROI has been incredible.",
    name: "Sarah Johnson",
    position: "CEO",
    company: "DigitalEdge Marketing",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: "2",
    text: "The AI training program was transformative for our team. We've been able to create entirely new service offerings that our clients love and are willing to pay premium rates for.",
    name: "David Martinez",
    position: "Director",
    company: "Growth Architects",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: "3",
    text: "As a solo consultant, I was hitting a ceiling in terms of client capacity. The AI automations have allowed me to scale my business without hiring, increasing my profit margin by 35%.",
    name: "Emily Chang",
    position: "Founder",
    company: "Elevate Marketing",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-medium">SUCCESS STORIES</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6">What Agencies Are Saying</h2>
          <p className="text-gray-600 text-lg">Hear from marketing agencies and consultants who have transformed their businesses with our AI solutions.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-accent flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">{testimonial.text}</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-heading font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
