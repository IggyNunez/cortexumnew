import { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Make sure VITE_STRIPE_PUBLIC_KEY is set in environment
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

// Initialize Stripe outside of component to avoid recreating on each render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Checkout form component that uses Stripe Elements
const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setIsProcessing(true);

    // Confirm the payment with Stripe.js
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      toast({
        title: 'Payment failed',
        description: error.message || 'An error occurred during payment processing.',
        variant: 'destructive',
      });
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <PaymentElement />
      </div>
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </Button>
    </form>
  );
};

// Main checkout page component
const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(99); // Default amount in dollars
  const { toast } = useToast();

  useEffect(() => {
    // Create a payment intent when the page loads
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest(
          'POST', 
          '/api/create-payment-intent', 
          { 
            amount,
            metadata: {
              product: 'Premium Marketing Plan',
              customer_email: 'customer@example.com' // In a real app, you'd use the actual user's email
            }
          }
        );
        
        const data = await response.json();
        
        if (data.success && data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast({
            title: 'Error',
            description: data.error || 'Failed to initialize payment.',
            variant: 'destructive',
          });
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'An unexpected error occurred.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, toast]);

  return (
    <div className="container max-w-3xl py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
          <CardDescription>
            Secure payment processing powered by Stripe
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm amount={amount} />
            </Elements>
          ) : (
            <div className="text-center py-8 text-red-500">
              Could not initialize payment system. Please try again later.
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground">
            Your payment is secure and encrypted.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutPage;