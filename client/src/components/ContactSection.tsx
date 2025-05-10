import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Medal, Rocket, TrendingUp, Mail, Phone, MapPin } from "lucide-react";
import { Lead } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().min(2, "Company name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  message: z.string().optional(),
});

const ContactSection = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: Lead) => {
      const res = await apiRequest("POST", "/api/leads", values);
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }
      return res.json();
    },
    onSuccess: () => {
      setFormSubmitted(true);
      toast({
        title: "Success!",
        description: "Your request has been submitted successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  const resetForm = () => {
    form.reset();
    setFormSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-medium">GET STARTED</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6">Ready to Transform Your Agency?</h2>
          <p className="text-gray-600 text-lg">Fill out the form below for a personalized consultation, or use our AI chatbot to get immediate assistance.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {!formSubmitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Smith" 
                            className="px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john@yourcompany.com" 
                            className="px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Company / Agency Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Agency LLC" 
                            className="px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="(123) 456-7890" 
                            className="px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">How can we help?</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="Tell us about your agency and what you're looking to achieve..." 
                            className="px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Submitting...
                      </>
                    ) : (
                      "Schedule Your Consultation"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl text-green-500 mb-4">
                  <CheckCircle2 className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">Thank You!</h3>
                <p className="text-gray-600 mb-6">Your request has been submitted successfully. One of our AI specialists will contact you shortly.</p>
                <Button 
                  onClick={resetForm} 
                  variant="ghost" 
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  Submit another request
                </Button>
              </div>
            )}
          </motion.div>
          
          <div className="space-y-8">
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-heading font-bold mb-6">Why Work With Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Medal className="h-6 w-6 text-accent mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold text-gray-800">Industry Leading Expertise</h4>
                    <p className="text-gray-600">Our team has helped 200+ agencies implement AI solutions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Rocket className="h-6 w-6 text-accent mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold text-gray-800">Rapid Implementation</h4>
                    <p className="text-gray-600">Get up and running with AI automation in as little as 2 weeks.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-accent mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold text-gray-800">Measurable Results</h4>
                    <p className="text-gray-600">Our clients see an average 35% increase in revenue after implementation.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-primary rounded-xl shadow-lg p-8 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-heading font-bold mb-6">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className="h-6 w-6 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold">Email Us</h4>
                    <a href="mailto:hello@vibeai.com" className="text-blue-200 hover:text-white transition-colors">hello@vibeai.com</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-6 w-6 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold">Call Us</h4>
                    <a href="tel:+18005551234" className="text-blue-200 hover:text-white transition-colors">(800) 555-1234</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold">Visit Us</h4>
                    <p className="text-blue-200">123 Innovation Way, Suite 500<br />San Francisco, CA 94107</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
