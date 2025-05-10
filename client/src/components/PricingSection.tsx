import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const [, setLocation] = useLocation();

  const handleSelectPlan = (planId: string) => {
    // In a real application, you might want to store the selected plan in state
    // and pass it to the checkout page
    setLocation('/checkout');
  };

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to supercharge your marketing efforts with AI-powered solutions.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <Card className="border-2 border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-primary/50">
            <CardHeader>
              <CardTitle className="text-xl">Starter</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <CardDescription>
                Perfect for small businesses getting started with AI marketing.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {[
                  'AI-powered chatbot integration',
                  'Basic lead scoring',
                  'Weekly performance reports',
                  'Email support',
                  '1 marketing channel integration'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleSelectPlan('starter')}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-2 border-primary relative transition-all duration-200 hover:shadow-lg">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-bl-lg rounded-tr-md">
              MOST POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Professional</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$249</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <CardDescription>
                Comprehensive AI marketing suite for growing businesses.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {[
                  'Everything in Starter',
                  'Advanced lead qualification',
                  'Custom AI voice configuration',
                  'Priority support',
                  '3 marketing channel integrations',
                  'Custom branding options',
                  'Lead lifecycle automation'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleSelectPlan('professional')}
              >
                Choose Plan
              </Button>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-2 border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-primary/50">
            <CardHeader>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$499</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <CardDescription>
                Fully-featured solution for agencies and large organizations.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {[
                  'Everything in Professional',
                  'Unlimited marketing channels',
                  'White-label solution',
                  'Dedicated account manager',
                  'API access for custom integrations',
                  'Advanced analytics dashboard',
                  'Unlimited team seats',
                  'Strategic consultation calls'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleSelectPlan('enterprise')}
              >
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center mt-12 text-gray-600">
          <p>All plans include a 14-day free trial. No credit card required to start.</p>
          <p className="mt-2">Need a custom solution? <a href="#contact" className="text-primary hover:underline">Contact us</a> for personalized pricing.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;