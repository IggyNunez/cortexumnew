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
  
  // Get marketing settings for analytics
  const { data: settingsData } = useQuery<{ success: boolean; data: any }>({
    queryKey: ['/api/marketing-settings'],
  });
  
  const marketingSettings = settingsData?.data;
  
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
    onSuccess: (response) => {
      setFormSubmitted(true);
      toast({
        title: "Application Received",
        description: "We'll review your details and contact you within 48 hours.",
      });
      
      // Track lead conversion in Google Analytics if enabled
      if (marketingSettings?.ga_enabled && marketingSettings?.ga_measurement_id) {
        // Track general event
        trackEvent(
          'lead_submission', 
          'conversion', 
          'contact_form'
        );
        
        // Track as conversion with data
        if (response.data) {
          trackLeadConversion(response.data);
        }
      }
      
      // Track lead conversion in Facebook Pixel if enabled
      if (marketingSettings?.fb_capi_enabled && marketingSettings?.fb_pixel_id) {
        const leadData = response.data || {};
        trackFBLeadEvent(leadData);
      }
      
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
    { value: "ecommerce", label: "E-commerce Store" },
    { value: "local-business", label: "Local Business" },
    { value: "saas", label: "SaaS Company" },
    { value: "service-business", label: "Service Business" },
    { value: "coaching", label: "Coaching/Consulting" },
    { value: "b2b", label: "B2B Business" },
    { value: "info-products", label: "Information Products" },
    { value: "agency", label: "Marketing/Advertising Agency" },
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
    { value: "paid-media", label: "Paid Media (Facebook, Google, YouTube)" },
    { value: "funnel-buildouts", label: "Funnel Buildouts & Optimization" },
    { value: "offer-creation", label: "Custom Offer Creation" },
    { value: "local-marketing", label: "Local Marketing Services" },
    { value: "social-media", label: "Social Media Marketing" },
    { value: "data-analytics", label: "Data-Driven Analytics & Insights" },
    { value: "psychology-based", label: "Psychology-Based Marketing Strategies" },
    { value: "linkedin-marketing", label: "LinkedIn Marketing" },
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
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white text-on-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to See Results?
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Elevate your digital success with precision media buying & funnel expertise. Complete this form to help us understand your business needs.
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
                <h3 className="text-2xl font-bold mb-4">Message Received!</h3>
                <p className="text-gray-600 mb-6">Thank you for your interest in Cortexuum. Our team will review your details and get back to you within 48 hours with next steps for your marketing strategy.</p>
                <Button 
                  onClick={() => setFormSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 rounded-full"
                >
                  Submit Another Message
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
                              value={field.value}
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
                              value={field.value}
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

                  <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-4 mb-6">
                    <h4 className="font-bold text-amber-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Limited availability - act quickly!
                    </h4>
                    <p className="text-amber-700 text-sm mt-1 ml-7 font-medium">
                      Our client onboarding schedule is filling up fast. Submit your application now to secure priority implementation before our next price increase.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full w-full py-6 text-base font-bold shadow-lg shadow-amber-700/20 border border-amber-400 transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting Application..." : "SECURE YOUR SPOT NOW →"}
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
              <h3 className="text-2xl font-bold mb-2 text-white text-with-shadow">Act Now Before It's Too Late</h3>
              <p className="text-yellow-200 mb-6 text-sm">Marketing agencies adopting AI today are outperforming competitors by 3-5x. Don't be among the 60% of agencies predicted to lose market share in the next 6 months due to AI hesitation.</p>
              
              <h4 className="text-lg font-semibold mb-4 text-white text-with-shadow">Why Act Immediately:</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-yellow-500/50 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow"><strong>First-mover advantage:</strong> Early AI adopters are seeing 200-300% efficiency gains</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-yellow-500/50 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow"><strong>Limited onboarding slots available</strong> - our next availability may be 6+ weeks out</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-yellow-500/50 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow"><strong>Competitor threats:</strong> Over 70% of agencies are already implementing AI</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-yellow-500/50 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow"><strong>Accelerated results</strong> - see measurable improvements in 30 days</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="rounded-full bg-yellow-500/50 p-1 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/90 text-with-shadow"><strong>Price increases coming soon</strong> - lock in current rates now</span>
                </li>
              </ul>
              
              <div className="mt-6 bg-gradient-to-r from-amber-500/30 to-red-500/30 rounded-lg p-4 border border-amber-400/30">
                <p className="text-white font-bold">Don't wait until your clients start switching to AI-powered competitors.</p>
                <p className="text-yellow-200 text-sm mt-1">Apply now while we still have capacity this quarter.</p>
              </div>
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