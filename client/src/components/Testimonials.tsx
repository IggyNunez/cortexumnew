import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The AI automation tools have completely transformed how we operate. We've been able to scale our content production by 5x while maintaining quality our clients love.",
    author: "Michael Smith",
    title: "CEO, Growth Spark Agency",
    initials: "MS"
  },
  {
    quote: "The ROI has been incredible. Within 3 months, we recouped our investment and now we're able to offer services we couldn't have imagined before.",
    author: "Rachel Liu",
    title: "Founder, Digital Pulse Marketing",
    initials: "RL"
  },
  {
    quote: "Their integration team made the process painless. We were up and running with AI solutions in weeks, not months, and the impact on our client results has been game-changing.",
    author: "David Wilson",
    title: "Managing Director, AdVantage Consultancy",
    initials: "DW"
  }
];

const additionalTestimonials = [
  {
    quote: "We've grown our agency by 73% since implementing their AI solutions. Our team is more productive and our clients are ecstatic with the results.",
    author: "Sarah Johnson",
    title: "Partner, Elevate Digital",
    initials: "SJ"
  },
  {
    quote: "The support team is incredible. They were with us every step of the way, ensuring we maximized the potential of the AI tools.",
    author: "James Harris",
    title: "CEO, Precision Marketing",
    initials: "JH"
  },
  {
    quote: "What impressed me most was how quickly we saw results. Within just two weeks, we were delivering insights to clients that would have taken months to compile manually.",
    author: "Emily Rodriguez",
    title: "Creative Director, Horizon Agency",
    initials: "ER"
  }
];

const Testimonials = () => {
  const [loadedMore, setLoadedMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoadedMore(true);
      setIsLoading(false);
    }, 1000);
  };
  
  const allTestimonials = loadedMore 
    ? [...testimonials, ...additionalTestimonials] 
    : testimonials;

  return (
    <section id="testimonials" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Agency Leaders Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from marketing agency owners who have transformed their businesses with our AI solutions
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {allTestimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 rounded-xl p-8 shadow-xl"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-yellow-400 text-yellow-400 h-5 w-5" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-gray-700 flex items-center justify-center">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {!loadedMore && (
          <div className="mt-12 text-center">
            <button 
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load More Success Stories'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
