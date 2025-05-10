import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Clock, Award, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const PricingPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const departmentData = {
    content: {
      title: "Content Creation",
      description: "Transform how your agency creates content, saving time and improving quality.",
      benefits: [
        "Generate SEO-optimized blog posts in minutes, not hours",
        "Create video scripts with emotional intelligence",
        "Produce multilingual content for global campaigns",
        "Edit and refine content with AI-powered suggestions",
        "Scale content production without increasing headcount"
      ]
    },
    social: {
      title: "Social Media Management",
      description: "Streamline social media workflows from planning to analytics.",
      benefits: [
        "Schedule and automate posts across all platforms",
        "Generate engaging captions and hashtags",
        "Create social media graphics with AI tools",
        "Analyze engagement and optimize posting times",
        "Respond to comments with AI-powered suggestions"
      ]
    },
    seo: {
      title: "SEO & Analytics",
      description: "Leverage AI to improve search performance and gain deeper insights.",
      benefits: [
        "Identify keyword opportunities with predictive AI",
        "Generate SEO-optimized content briefs",
        "Automate technical SEO audits and fixes",
        "Create predictive performance models",
        "Visualize complex data patterns for better decision making"
      ]
    },
    email: {
      title: "Email Marketing",
      description: "Enhance engagement and conversion through AI-powered email campaigns.",
      benefits: [
        "Create personalized email content at scale",
        "Optimize subject lines for higher open rates",
        "Implement AI-driven segmentation strategies",
        "Automate email sequence creation and A/B testing",
        "Predict optimal send times for each recipient"
      ]
    },
    ppc: {
      title: "PPC & Advertising",
      description: "Optimize ad spend and performance with AI-powered ad management.",
      benefits: [
        "Generate high-converting ad copy variants automatically",
        "Predict campaign performance before spending a dollar",
        "Implement real-time bid adjustments based on AI insights",
        "Create audience segments using predictive modeling",
        "Optimize landing pages through automated experiments"
      ]
    },
    crm: {
      title: "CRM & Client Management",
      description: "Revolutionize how your agency manages client relationships.",
      benefits: [
        "Automate personalized client communications",
        "Predict client needs before they ask",
        "Generate comprehensive client reports in seconds",
        "Identify at-risk accounts for proactive retention",
        "Create tailored upsell opportunities based on behavior"
      ]
    },
    creative: {
      title: "Creative & Design",
      description: "Streamline design workflows and enhance creative output.",
      benefits: [
        "Generate initial design concepts from text descriptions",
        "Create custom imagery without stock photo limitations",
        "Scale design production for multi-channel campaigns",
        "Automate basic design tasks like resizing and formatting",
        "Transform rough sketches into polished designs"
      ]
    },
    strategy: {
      title: "Strategy & Planning",
      description: "Leverage AI to develop more effective marketing strategies.",
      benefits: [
        "Generate data-backed strategy recommendations",
        "Predict campaign outcomes with scenario planning",
        "Identify market trends before your competitors",
        "Develop comprehensive marketing calendars in minutes",
        "Create custom reporting dashboards automatically"
      ]
    }
  };

  type DepartmentKey = keyof typeof departmentData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold mb-4">Transform Your Marketing Agency with AI</h1>
              <p className="text-xl text-gray-700 mb-8">
                Our AI-powered solutions help marketing agencies increase productivity, scale operations, and deliver better results for clients.
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex gap-2 items-center justify-center text-amber-700 mb-2">
                  <AlertCircle className="h-5 w-5" />
                  <h3 className="font-semibold">The AI Divide is Growing</h3>
                </div>
                <p className="text-amber-800">
                  Marketing agencies adopting AI are seeing a <span className="font-bold">35% increase</span> in productivity and a <span className="font-bold">28% higher</span> client retention rate. Don't get left behind.
                </p>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-center mb-8">How AI Will Transform Every Department in Your Agency</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(departmentData).map(([key, dept]) => (
                  <Card 
                    key={key}
                    className={`cursor-pointer transition-all ${selectedDepartment === key ? 'border-primary shadow-lg' : 'hover:border-primary/50 hover:shadow-md'}`}
                    onClick={() => setSelectedDepartment(key as DepartmentKey)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{dept.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                      <p className="text-primary text-sm font-medium flex items-center">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {selectedDepartment && (
                <motion.div 
                  key={selectedDepartment}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 bg-white rounded-xl border p-6 shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {departmentData[selectedDepartment as DepartmentKey].title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {departmentData[selectedDepartment as DepartmentKey].description}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedDepartment(null)}
                    >
                      Close
                    </Button>
                  </div>
                  
                  <motion.ul 
                    className="mt-4 space-y-3"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {departmentData[selectedDepartment as DepartmentKey].benefits.map((benefit, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-2"
                        variants={item}
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={() => window.location.href = '#pricing'}
                      className="gap-2"
                    >
                      View pricing plans <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-center mb-8">Why Marketing Agencies Need AI Automation Now</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-10 w-10 text-yellow-500 mb-2" />
                    <CardTitle>Competitive Advantage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Early adopters of AI marketing automation are already seeing significant advantages over competitors. Agencies using AI tools report being able to handle 2-3x more clients with the same team size.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Deliver results 40% faster than traditional methods</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Win more pitches with AI-enhanced proposals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Stand out with innovative AI-powered services</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Clock className="h-10 w-10 text-blue-500 mb-2" />
                    <CardTitle>Timing is Critical</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      The window of opportunity for gaining a first-mover advantage with AI is rapidly closing. Within 12-18 months, AI adoption will be standard across the industry, eliminating the competitive edge early adopters now enjoy.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Build AI expertise before your competitors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Develop AI-native processes from the ground up</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Lock in lower pricing before market saturation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Award className="h-10 w-10 text-purple-500 mb-2" />
                    <CardTitle>Client Expectations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Client expectations are rapidly evolving. As they become more aware of AI capabilities, they're beginning to expect the speed, personalization, and insights that only AI-enhanced agencies can provide.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Meet growing demands for faster turnarounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Provide deeper insights and better reporting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Deliver hyper-personalized marketing at scale</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-xl font-semibold text-gray-800 mb-4">The future of marketing belongs to AI-powered agencies</p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                  onClick={() => window.location.href = '#pricing'}
                >
                  Apply for AI Solutions
                </Button>
              </div>
            </div>
            
            <div id="pricing">
              <PricingSection />
            </div>
            
            <div className="mt-24 max-w-4xl mx-auto">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Don't Let Your Agency Fall Behind</h2>
                <p className="text-lg text-center mb-8">
                  Every day you wait to implement AI solutions is a day your competitors gain ground. Select a plan today and start transforming your agency.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="font-bold text-lg mb-3">Agencies Without AI</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Struggling to meet client deadlines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Limited by team size and bandwidth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Unable to scale services efficiently</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Losing clients to more innovative competitors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Decreasing profit margins on services</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md border-2 border-primary">
                    <h3 className="font-bold text-lg mb-3">Agencies With AI</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Delivering projects in half the time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Handling 3x more clients with the same team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Offering innovative, high-margin services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Attracting top-tier clients with AI capabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Increasing profit margins by 40%+</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;