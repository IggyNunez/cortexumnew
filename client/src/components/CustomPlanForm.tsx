import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, SendIcon, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';

// Define the form schema
const customPlanFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  phone: z.string().min(7, { message: 'Please enter a valid phone number' }),
  company_size: z.string().optional(),
  budget: z.string().optional(),
  timeframe: z.string().optional(),
  specific_needs: z.string().min(10, { message: 'Please provide more details about your specific needs' }),
  marketing_channels: z.array(z.string()).optional(),
  contacted_via: z.string().optional(),
  terms_accepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms to submit',
  })
});

type CustomPlanFormValues = z.infer<typeof customPlanFormSchema>;

const companyOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501+', label: '501+ employees' }
];

const budgetOptions = [
  { value: 'under-1000', label: 'Under $1,000/month' },
  { value: '1000-3000', label: 'Between $1,000-$3,000/month' },
  { value: '3000-5000', label: 'Between $3,000-$5,000/month' },
  { value: '5000-10000', label: 'Between $5,000-$10,000/month' },
  { value: '10000+', label: 'Above $10,000/month' },
  { value: 'not-sure', label: 'Not sure yet' }
];

const timeframeOptions = [
  { value: 'immediate', label: 'Immediate (within 1 month)' },
  { value: 'soon', label: 'Soon (1-3 months)' },
  { value: 'planning', label: 'Planning phase (3-6 months)' },
  { value: 'long-term', label: 'Long-term (6+ months)' }
];

const marketingChannels = [
  { id: 'website', label: 'Website / SEO' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'email', label: 'Email Marketing' },
  { id: 'paid-ads', label: 'Paid Advertising' },
  { id: 'content', label: 'Content Marketing' },
  { id: 'chatbots', label: 'AI Chatbots' },
  { id: 'voice', label: 'Voice AI' },
  { id: 'crm', label: 'CRM Integration' }
];

const contactOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone call' },
  { value: 'meeting', label: 'Video meeting' },
];

interface CustomPlanFormProps {
  onClose: () => void;
}

const CustomPlanForm = ({ onClose }: CustomPlanFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<CustomPlanFormValues>({
    resolver: zodResolver(customPlanFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      company_size: 'not-sure',
      budget: 'not-sure',
      timeframe: 'planning',
      specific_needs: '',
      marketing_channels: [],
      contacted_via: 'email',
      terms_accepted: false
    }
  });

  const onSubmit = async (data: CustomPlanFormValues) => {
    try {
      setIsSubmitting(true);

      // Using our existing lead API endpoint with additional fields
      const response = await apiRequest('POST', '/api/leads', {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.specific_needs,
        business_type: 'custom-plan',
        company_size: data.company_size,
        budget: data.budget,
        timeline: data.timeframe,
        marketing_needs: data.marketing_channels?.join(', '),
        source: 'custom-plan-form'
      });

      if (!response.ok) {
        throw new Error('Failed to submit your custom plan request');
      }

      // Show success state
      setIsSuccess(true);
      toast({
        title: "Request Submitted",
        description: "Your custom plan request has been sent. We'll be in touch soon!",
      });

      // Reset form after 3 seconds and close
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting custom plan request:', error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-4xl w-full mx-auto">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-8"
          >
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Custom Plan Request Submitted!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Thank you for your interest. Our team will review your requirements and get back to you within 24 hours.
            </p>
            <Button onClick={onClose}>
              Return to Pricing
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Custom Plan Application</h2>
                <p className="text-gray-600 mt-1">Tell us about your needs and we'll create a tailored solution</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
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
                            <FormLabel>Email Address*</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@company.com" {...field} />
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
                            <FormLabel>Company/Organization*</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company name" {...field} />
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
                            <FormLabel>Phone Number*</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Project Details</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="company_size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Size</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select company size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {companyOptions.map(option => (
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
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Budget</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your budget range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This helps us recommend the right solutions for your needs
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="timeframe"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Implementation Timeframe</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select implementation timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeframeOptions.map(option => (
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
                  </div>
                </div>

                {/* Needs and Preferences */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Needs & Preferences</h3>
                  
                  <FormField
                    control={form.control}
                    name="specific_needs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specific Requirements*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what you're looking for in a custom AI marketing solution..." 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Tell us about your specific needs, challenges, and goals for your marketing AI implementation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="marketing_channels"
                      render={() => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel>Interested Marketing Channels</FormLabel>
                            <FormDescription>
                              Select all the AI marketing solutions you're interested in
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {marketingChannels.map((channel) => (
                              <FormField
                                key={channel.id}
                                control={form.control}
                                name="marketing_channels"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={channel.id}
                                      className="flex flex-row items-start space-x-2 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(channel.id)}
                                          onCheckedChange={(checked) => {
                                            const updatedValue = checked
                                              ? [...(field.value || []), channel.id]
                                              : field.value?.filter(
                                                  (value) => value !== channel.id
                                                ) || [];
                                            field.onChange(updatedValue);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal cursor-pointer">
                                        {channel.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="contacted_via"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Contact Method</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="How should we reach you?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {contactOptions.map(option => (
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
                </div>

                {/* Terms and submission */}
                <FormField
                  control={form.control}
                  name="terms_accepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the terms and conditions
                        </FormLabel>
                        <FormDescription>
                          By submitting this form, you agree to our <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 border-t flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <SendIcon className="mr-2 h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomPlanForm;