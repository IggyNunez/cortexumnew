import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useStripe } from '@stripe/react-stripe-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CortexuumLogo from '@/components/CortexuumLogo';
import confetti from 'canvas-confetti';

const PaymentSuccess = () => {
  const [, setLocation] = useLocation();
  const stripe = useStripe();
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [paymentInfo, setPaymentInfo] = useState<{
    amount?: string;
    last4?: string;
    paymentMethodType?: string;
  }>({});

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!stripe) {
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const clientSecret = urlParams.get('payment_intent_client_secret');

      if (!clientSecret) {
        setPaymentStatus('error');
        return;
      }

      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
        
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          setPaymentStatus('success');
          
          // Trigger confetti animation
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          
          // Set payment details
          if (paymentIntent.amount && paymentIntent.payment_method_details) {
            const amount = (paymentIntent.amount / 100).toFixed(2);
            const last4 = paymentIntent.payment_method_details.card?.last4 || '';
            const paymentMethodType = paymentIntent.payment_method_details.type;
            
            setPaymentInfo({
              amount,
              last4,
              paymentMethodType
            });
          }
        } else {
          setPaymentStatus('error');
        }
      } catch (err) {
        console.error('Error retrieving payment intent:', err);
        setPaymentStatus('error');
      }
    };

    fetchPaymentDetails();
  }, [stripe]);

  const handleBookCall = () => {
    window.open('https://calendly.com/cortexuummarketing/30min', '_blank');
  };

  const handleReturnHome = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20 px-4 bg-gray-50">
        <div className="w-full max-w-2xl">
          <div className="mb-10 text-center">
            <CortexuumLogo variant="default" size="lg" showText />
          </div>
          
          <Card className="w-full">
            <CardHeader>
              {paymentStatus === 'loading' && (
                <>
                  <CardTitle>Processing Your Payment</CardTitle>
                  <CardDescription>Please wait while we confirm your payment details...</CardDescription>
                </>
              )}
              {paymentStatus === 'success' && (
                <>
                  <CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
                  <CardDescription>Thank you for your purchase. Your payment has been processed successfully.</CardDescription>
                </>
              )}
              {paymentStatus === 'error' && (
                <>
                  <CardTitle className="text-2xl font-bold text-red-600">Payment Verification Failed</CardTitle>
                  <CardDescription>We couldn't verify your payment details. If you believe this is an error, please contact our support team.</CardDescription>
                </>
              )}
            </CardHeader>
            
            <CardContent>
              {paymentStatus === 'loading' && (
                <div className="flex justify-center py-6">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {paymentStatus === 'success' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-green-700 mb-1">${paymentInfo.amount}</p>
                    <p className="text-sm text-green-600">Payment Confirmed</p>
                  </div>
                  
                  {paymentInfo.last4 && (
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">
                        {paymentInfo.paymentMethodType === 'card' ? 'Credit Card' : paymentInfo.paymentMethodType} •••• {paymentInfo.last4}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-medium text-xs md:text-sm">{new Date().getTime().toString(36).toUpperCase()}</span>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-700 mb-2">What's Next?</h3>
                    <p className="text-blue-600 text-sm">
                      Book a call with our team to discuss your marketing needs and get started with your custom strategy.
                    </p>
                  </div>
                </div>
              )}
              
              {paymentStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
                  <p className="text-red-700">
                    There may have been an issue with your payment. If your card was charged, please contact our support 
                    team with your order details. Otherwise, you can try again with a different payment method.
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
              {paymentStatus === 'success' && (
                <>
                  <Button onClick={handleBookCall} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    Book a Call Now
                  </Button>
                  <Button onClick={handleReturnHome} variant="outline" className="w-full sm:w-auto">
                    Return to Home
                  </Button>
                </>
              )}
              
              {paymentStatus === 'error' && (
                <>
                  <Button onClick={() => setLocation('/checkout')} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    Try Again
                  </Button>
                  <Button onClick={handleReturnHome} variant="outline" className="w-full sm:w-auto">
                    Return to Home
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;