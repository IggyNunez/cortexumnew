import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Loader2 } from 'lucide-react';

const PaymentSuccessPage = () => {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'processing' | 'error'>('processing');
  
  useEffect(() => {
    // In a real application, we would check the payment status from Stripe here
    // and update the UI accordingly. For this demo, we'll simulate a successful payment.
    const timer = setTimeout(() => {
      setIsLoading(false);
      setPaymentStatus('success');
    }, 2000); // Simulate a network delay
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleGoHome = () => {
    setLocation('/');
  };
  
  return (
    <div className="container max-w-md py-16">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Payment {isLoading ? 'Processing' : 'Successful'}</CardTitle>
          <CardDescription>
            {isLoading ? 'Please wait while we process your payment' : 'Thank you for your purchase!'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex justify-center pt-6 pb-8">
          {isLoading ? (
            <Loader2 className="h-24 w-24 text-primary animate-spin" />
          ) : (
            <CheckCircle className="h-24 w-24 text-primary" />
          )}
        </CardContent>
        
        {!isLoading && (
          <CardContent>
            <div className="text-left space-y-4">
              <h3 className="font-medium">What happens next?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>You'll receive a confirmation email shortly.</li>
                <li>Our team will contact you within 24 hours to discuss your marketing needs.</li>
                <li>We'll schedule a strategy session to kickstart your marketing campaign.</li>
              </ul>
            </div>
          </CardContent>
        )}
        
        <CardFooter className="flex justify-center pb-6 pt-2">
          {!isLoading && (
            <Button onClick={handleGoHome} className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;