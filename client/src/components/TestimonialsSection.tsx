import { motion } from "framer-motion";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  index: number;
}

const Testimonial = ({ quote, name, role, company, index }: TestimonialProps) => (
  <motion.div 
    className="bg-white rounded-xl shadow-lg p-8 relative"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="text-violet-500 text-4xl absolute -top-5 -left-2">"</div>
    <p className="text-gray-600 mb-6 italic">
      {quote}
    </p>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-500">{role}, {company}</p>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Implementing Vibe's AI automation solutions has been a game-changer for our agency. We've increased client retention by 40% and reduced operational costs by 25%.",
      name: "Sarah Johnson",
      role: "CEO",
      company: "DigitalEdge Marketing"
    },
    {
      quote: "The AI chatbot implementation has completely transformed our lead generation process. We're now capturing 3x more qualified leads with half the effort.",
      name: "Michael Rodriguez",
      role: "Founder",
      company: "NextLevel Agency"
    },
    {
      quote: "Our team's productivity has increased dramatically since implementing Vibe's AI workflow automation. Tasks that took hours now happen in minutes.",
      name: "Jennifer Park",
      role: "Director",
      company: "Elevate Marketing Co."
    }
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Agency Owners Are <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Saying</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Success stories from marketing agencies that have transformed their businesses with our AI solutions.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#case-studies" className="inline-flex items-center text-primary font-semibold hover:underline">
            View our case studies <span className="ml-2">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
