import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Settings } from 'lucide-react';
import CustomPlanForm from './CustomPlanForm';

const PricingSection = () => {
  const [, setLocation] = useLocation();
  const [showCustomPlanForm, setShowCustomPlanForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('custom');

  const handleSelectPlan = (planId: string) => {
    // Set the selected plan type and show the form
    setSelectedPlan(planId);
    setShowCustomPlanForm(true);
  };

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block bg-amber-50 border-2 border-amber-400 rounded-lg px-4 py-1 mb-4">
            <p className="text-amber-700 font-medium text-sm">Limited Time Offer - Current Rates Valid Until May 31st</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Secure Your AI Advantage Today</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
            Lock in our current rates before the upcoming 30% price increase.
          </p>
          <p className="text-amber-600 font-semibold max-w-2xl mx-auto">
            Only <span className="bg-amber-100 px-2 py-0.5 rounded-full">7 implementation slots</span> remaining this month!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200 flex items-center mb-12">
          <div className="bg-amber-400 text-amber-900 rounded-full p-2 mr-4">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-amber-900">AI Implementation Is A Race Against Time</h3>
            <p className="text-amber-800">
              Every day without AI automation, your competition is gaining ground. Our clients typically see ROI within the first 30 days.
            </p>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <Card className="border-2 border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-primary/50 relative overflow-hidden">
            <div className="absolute -right-12 top-6 bg-amber-500 text-white font-bold py-1 px-10 transform rotate-45 text-xs shadow-md">
              LIMITED SPOTS
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <div className="mt-2 flex items-center">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-gray-500 ml-1">/month</span>
                    <span className="ml-2 line-through text-red-400 text-sm">$129</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full border border-green-200">
                  Save 23%
                </div>
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
            <CardFooter className="space-y-3">
              <div className="text-center text-xs text-amber-700 bg-amber-50 rounded-md p-1 font-medium">
                Only 3 spots left at this price!
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold"
                onClick={() => handleSelectPlan('starter')}
              >
                Apply Now - Limited Time Offer
              </Button>
              <p className="text-xs text-center text-gray-500">Current rates valid until May 31st</p>
            </CardFooter>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-2 border-primary relative transition-all duration-200 hover:shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-bl-lg rounded-tr-md">
              MOST POPULAR
            </div>
            <div className="absolute -right-12 top-6 bg-red-500 text-white font-bold py-1 px-10 transform rotate-45 text-xs shadow-md">
              SELLING FAST
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Professional</CardTitle>
                  <div className="mt-2 flex items-center">
                    <span className="text-3xl font-bold">$249</span>
                    <span className="text-gray-500 ml-1">/month</span>
                    <span className="ml-2 line-through text-red-400 text-sm">$329</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full border border-green-200">
                  Save 24%
                </div>
              </div>
              <CardDescription>
                Comprehensive AI marketing suite for growing businesses.
              </CardDescription>
              <div className="mt-2 text-xs bg-blue-50 text-blue-800 p-1 rounded border border-blue-100">
                <span className="font-semibold">BEST VALUE:</span> Most agencies see 3x ROI in 60 days
              </div>
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
            <CardFooter className="space-y-3">
              <div className="text-center text-xs bg-red-50 text-red-700 rounded-md p-2 font-medium border border-red-200">
                <span className="font-bold">HURRY!</span> Only 2 professional slots remaining this month!
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold shadow-lg shadow-primary/20"
                onClick={() => handleSelectPlan('professional')}
              >
                Reserve Your Spot Now
              </Button>
              <div className="flex items-center justify-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Price increases on May 31st
              </div>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-2 border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-primary/50 relative overflow-hidden">
            <div className="absolute -right-12 top-6 bg-purple-500 text-white font-bold py-1 px-10 transform rotate-45 text-xs shadow-md">
              PREMIUM TIER
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <div className="mt-2 flex items-center">
                    <span className="text-3xl font-bold">$499</span>
                    <span className="text-gray-500 ml-1">/month</span>
                    <span className="ml-2 line-through text-red-400 text-sm">$649</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full border border-green-200">
                  Save 23%
                </div>
              </div>
              <CardDescription>
                Fully-featured solution for agencies and large organizations.
              </CardDescription>
              <div className="mt-2 text-xs bg-purple-50 text-purple-800 p-1 rounded border border-purple-100">
                <span className="font-semibold">HIGH-PRIORITY SETUP:</span> Implementation within 7 days
              </div>
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
            <CardFooter className="space-y-3">
              <div className="text-center text-xs bg-purple-50 text-purple-700 rounded-md p-2 font-medium border border-purple-200">
                <span className="font-bold">EXCLUSIVE:</span> Limited to 5 new enterprise clients per quarter
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-purple-500/20" 
                onClick={() => handleSelectPlan('enterprise')}
              >
                Apply For Enterprise Access
              </Button>
              <div className="flex items-center justify-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Includes priority onboarding call within 48 hours
              </div>
            </CardFooter>
          </Card>
          
          {/* Custom Plan */}
          <Card className="border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 transition-all duration-200 hover:shadow-lg hover:border-primary/50 relative overflow-hidden">
            <div className="absolute right-0 top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold py-1 px-3 rounded-bl-lg rounded-tr-md">
              FULLY TAILORED
            </div>
            <CardHeader>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <CardTitle className="text-xl">Custom Plan</CardTitle>
                  <div className="mt-2 font-medium text-primary">
                    <span className="text-3xl font-bold">Tailored</span>
                    <span className="text-gray-500 ml-1">pricing</span>
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full border border-blue-200">
                  Best ROI
                </div>
              </div>
              <CardDescription className="mt-2">
                Customized AI marketing solutions built specifically for your unique requirements.
              </CardDescription>
              <div className="mt-2 text-xs bg-blue-100 text-blue-800 p-1 rounded border border-blue-200">
                <span className="font-semibold">FAST-TRACK AVAILABLE:</span> Implementation in as little as 14 days
              </div>
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
            <CardFooter className="space-y-3">
              <div className="text-center text-xs bg-blue-50 text-blue-700 rounded-md p-2 font-medium border border-blue-200">
                <span className="font-bold">GROW FASTER:</span> Custom plans typically deliver 3-5x ROI in first 90 days
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold shadow-lg shadow-blue-500/20" 
                onClick={() => handleSelectPlan('custom')}
              >
                Schedule Strategy Session
              </Button>
              <div className="flex items-center justify-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                No obligation consultation with our AI strategists
              </div>
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
                <CustomPlanForm 
                  onClose={() => setShowCustomPlanForm(false)} 
                  planType={selectedPlan}
                />
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