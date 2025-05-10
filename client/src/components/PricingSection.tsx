import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Settings } from 'lucide-react';
import CustomPlanForm from './CustomPlanForm';

const PricingSection = () => {
  const [, setLocation] = useLocation();
  const [showCustomPlanForm, setShowCustomPlanForm] = useState(false);

  const handleSelectPlan = (planId: string) => {
    if (planId === 'custom') {
      setShowCustomPlanForm(true);
    } else {
      // Standard plans go to checkout
      setLocation('/checkout');
    }
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
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
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
          
          {/* Custom Plan */}
          <Card className="border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-violet-50 transition-all duration-200 hover:shadow-lg hover:border-primary/50">
            <CardHeader>
              <CardTitle className="text-xl">Custom Plan</CardTitle>
              <div className="mt-2 font-medium text-primary">
                <span className="text-3xl font-bold">Tailored</span>
                <span className="text-gray-500 ml-1">pricing</span>
              </div>
              <CardDescription>
                Customized AI marketing solutions built specifically for your unique requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {[
                  'Completely customized solution',
                  'Mix and match features',
                  'Personalized AI training',
                  'Custom implementation timeline',
                  'Dedicated solutions architect',
                  'Custom integrations & automations',
                  'Tailored onboarding plan',
                  'Compliance & security customization'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Settings className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700" 
                onClick={() => handleSelectPlan('custom')}
              >
                Apply Now
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Custom Plan Application Form Modal */}
        {showCustomPlanForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div 
              className="max-h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="bg-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <CustomPlanForm onClose={() => setShowCustomPlanForm(false)} />
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center mt-12">
          <p className="text-gray-700 font-medium">All plans include technical support, a custom landing page, and installation assistance.</p>
          <div className="mt-6 max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 font-semibold">Don't get left behind in the AI revolution!</p>
            <p className="text-amber-700 mt-2">Marketing agencies that adopt AI now will outperform competitors by 50-300% within the next 12 months.</p>
          </div>
          <p className="mt-4 text-primary font-medium">Time is running out to gain the competitive advantage. <span className="font-bold">Act now!</span></p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;