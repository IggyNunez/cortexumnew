import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Bot, ShoppingBag, Share2, Rocket } from "lucide-react";

const FutureInsights = () => {
  const insights = [
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Strategic Foresight is a Must",
      description: "Combining trends (what we know) and uncertainties (what we can't control) is essential for building future-proof strategies. It's about being prepared for multiple plausible outcomes."
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI Agents are the New Influencers",
      description: "Just like social media reshaped digital influence, the next wave includes AI agents, capable of self-organizing and influencing both humans and other AI systems."
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: "Think Beyond B2C and D2C",
      description: "We're seeing the rise of AI-to-Consumer (A2C) models, where AI systems handle everything from product design to manufacturing, potentially changing traditional retail models."
    },
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: "Prepare for 520+ Marketing Channels",
      description: "The current 52 mediums for messaging are just the beginning. Expect an explosion in niche channels as AI continues to reshape the digital landscape."
    }
  ];

  const actionItems = [
    "Build agent-friendly brand identities",
    "Experiment with AI influencer pilots",
    "Embrace agent-to-agent marketing"
  ];

  return (
    <section id="insights" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How Marketing Agencies Will Help <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Brands Succeed</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The marketing landscape is evolving rapidly. Here's how forward-thinking agencies can help brands stay ahead.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {insights.map((insight, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  {insight.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
                  <p className="text-gray-600">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="p-6 bg-white rounded-full shadow-lg">
                <Rocket className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-bold mb-4">Take Action Now!</h3>
              <p className="text-gray-700 mb-6">
                There are endless opportunities and we shouldn't wait. The companies that thrive will be those that anticipate change, not just react to it.
              </p>
              <div className="space-y-3">
                {actionItems.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureInsights;