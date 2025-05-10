import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, trackLeadConversion } from "@/lib/analytics";
import { trackFBLeadEvent } from "@/lib/fbPixel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  companyName: z.string().min(2, { message: "Company name is required" }),
  companyWebsite: z.string().url({ message: "Please enter a valid URL" }).optional(),
  businessType: z.string(),
  companySize: z.string(),
  annualRevenue: z.string(),
  avgClientValue: z.string(),
  marketingBudget: z.string(),
  primaryChallenges: z.string().min(10, { message: "Please provide more detail" }),
  serviceInterest: z.string(),
  implementationTimeline: z.string(),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      companyWebsite: "",
      businessType: "",
      companySize: "",
      annualRevenue: "",
      avgClientValue: "",
      marketingBudget: "",
      primaryChallenges: "",
      serviceInterest: "",
      implementationTimeline: "",
      additionalInfo: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Map form field names to database schema field names
      const leadData = {
        name: data.fullName,
        email: data.email,
        company: data.companyName,
        phone: data.phone,
        message: data.additionalInfo,
        business_type: data.businessType,
        company_size: data.companySize,
        annual_revenue: data.annualRevenue,
        client_value: data.avgClientValue,
        marketing_needs: data.primaryChallenges,
        timeline: data.implementationTimeline,
        budget: data.marketingBudget,
        source: 'contact_form'
      };
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setFormSubmitted(true);
      toast({
        title: "Application Received",
        description: "We'll review your details and contact you within 48 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  const businessTypes = [
    { value: "marketing-agency", label: "Marketing Agency" },
    { value: "digital-agency", label: "Digital Agency" },
    { value: "pr-agency", label: "PR Agency" },
    { value: "seo-agency", label: "SEO Agency" },
    { value: "content-agency", label: "Content Agency" },
    { value: "social-media-agency", label: "Social Media Agency" },
    { value: "advertising-agency", label: "Advertising Agency" },
    { value: "branding-agency", label: "Branding Agency" },
    { value: "other", label: "Other" },
  ];

  const companySizes = [
    { value: "1-5", label: "1-5 employees" },
    { value: "6-10", label: "6-10 employees" },
    { value: "11-25", label: "11-25 employees" },
    { value: "26-50", label: "26-50 employees" },
    { value: "51-100", label: "51-100 employees" },
    { value: "101-250", label: "101-250 employees" },
    { value: "250+", label: "250+ employees" },
  ];
  
  const revenueRanges = [
    { value: "less-than-250k", label: "Less than $250K" },
    { value: "250k-500k", label: "$250K - $500K" },
    { value: "500k-1m", label: "$500K - $1M" },
    { value: "1m-5m", label: "$1M - $5M" },
    { value: "5m-10m", label: "$5M - $10M" },
    { value: "10m-plus", label: "$10M+" },
  ];
  
  const clientValues = [
    { value: "less-than-1k", label: "Less than $1K" },
    { value: "1k-5k", label: "$1K - $5K" },
    { value: "5k-10k", label: "$5K - $10K" },
    { value: "10k-25k", label: "$10K - $25K" },
    { value: "25k-50k", label: "$25K - $50K" },
    { value: "50k-100k", label: "$50K - $100K" },
    { value: "100k-plus", label: "$100K+" },
  ];
  
  const marketingBudgets = [
    { value: "less-than-10k", label: "Less than $10K/month" },
    { value: "10k-25k", label: "$10K - $25K/month" },
    { value: "25k-50k", label: "$25K - $50K/month" },
    { value: "50k-100k", label: "$50K - $100K/month" },
    { value: "100k-plus", label: "$100K+/month" },
  ];
  
  const serviceOptions = [
    { value: "ai-strategy", label: "AI Strategy & Consultation" },
    { value: "workflow-automation", label: "Workflow Automation" },
    { value: "chatbots", label: "AI Chatbots & Lead Generation" },
    { value: "content-creation", label: "AI Content Creation" },
    { value: "crm-integration", label: "CRM & Data Integration" },
    { value: "client-reporting", label: "Automated Client Reporting" },
    { value: "social-media", label: "Social Media Automation" },
    { value: "training", label: "AI Training for Your Team" },
    { value: "multiple", label: "Multiple Services" },
  ];
  
  const timelines = [
    { value: "immediate", label: "Immediate (0-2 weeks)" },
    { value: "short-term", label: "Short-term (1-2 months)" },
    { value: "mid-term", label: "Mid-term (3-6 months)" },
    { value: "long-term", label: "Long-term (6+ months)" },
    { value: "exploring", label: "Just exploring options" },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary to-accent text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white text-on-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Agency with AI?
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Complete this application to help us understand your business needs and how our AI solutions can drive growth and efficiency for your agency.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Application Received!</h3>
                <p className="text-gray-600 mb-6">Thank you for your interest in VibeMarketingAgency.ai. Our team will review your application and get back to you within 48 hours with next steps for your AI implementation.</p>
                <Button 
                  onClick={() => setFormSubmitted(false)}
                  className="bg-primary hover:bg-primary/90 rounded-full"
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Contact Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Full Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} className="rounded-lg" />
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
                            <FormLabel className="text-gray-700">Email*</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" {...field} className="rounded-lg" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Phone*</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} className="rounded-lg" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Company Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company" {...field} className="rounded-lg" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="companyWebsite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Company Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourcompany.com" {...field} className="rounded-lg" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Business Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Business Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Type of Business*</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {businessTypes.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companySize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Company Size*</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select company size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {companySizes.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="annualRevenue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Annual Revenue*</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select revenue range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {revenueRanges.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="avgClientValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Average Client Value*</FormLabel>
                            <FormDescription className="text-xs text-gray-500">
                              Per client/project value
                            </FormDescription>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select average value" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {clientValues.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="marketingBudget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Monthly Marketing Budget*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {marketingBudgets.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Project Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">AI Implementation Details</h3>
                    
                    <FormField
                      control={form.control}
                      name="primaryChallenges"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Primary Business Challenges*</FormLabel>
                          <FormDescription className="text-xs text-gray-500">
                            What specific challenges are you hoping to solve with AI automation?
                          </FormDescription>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your current challenges and pain points" 
                              className="min-h-32 rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="serviceInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Primary Service Interest*</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select primary interest" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="implementationTimeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Implementation Timeline*</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timelines.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Additional Information</FormLabel>
                          <FormDescription className="text-xs text-gray-500">
                            Any other details that would help us understand your needs better
                          </FormDescription>
                          <FormControl>
                            <Textarea 
                              placeholder="Additional context, requirements, or questions" 
                              className="min-h-24 rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white rounded-full w-full py-6 text-base font-bold"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>

          <motion.div 
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white text-with-shadow">Why Work With Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-white/30 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow">Proven results with 25+ marketing agencies</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-white/30 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow">Custom AI solutions tailored to your specific needs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-white/30 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow">Average 30-40% increase in operational efficiency</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-white/30 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow">Comprehensive onboarding and ongoing support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-white/30 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow">ROI-focused implementation strategies</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white text-with-shadow">Our Process</h3>
              <ol className="space-y-6">
                <li className="flex space-x-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Application Review</h4>
                    <p className="text-xs text-white/80 mt-1">We review your application to understand your specific needs</p>
                  </div>
                </li>
                <li className="flex space-x-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Strategy Call</h4>
                    <p className="text-xs text-white/80 mt-1">Detailed discussion about your challenges and goals</p>
                  </div>
                </li>
                <li className="flex space-x-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Custom Solution</h4>
                    <p className="text-xs text-white/80 mt-1">We develop a tailored AI implementation plan</p>
                  </div>
                </li>
                <li className="flex space-x-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Implementation</h4>
                    <p className="text-xs text-white/80 mt-1">Seamless integration with your existing workflow</p>
                  </div>
                </li>
              </ol>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;