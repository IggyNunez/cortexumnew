import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CortexuumLogo from '@/components/CortexuumLogo';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, description }: { amount: number, description: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Error",
        description: "Stripe has not loaded yet. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment confirmation page
          return_url: window.location.origin + "/payment-success",
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
      // The payment is processed on the server in case of success
      // and the user is redirected to the return_url
    } catch (err: any) {
      toast({
        title: "Payment Error",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Complete your purchase</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="payment-form" className="space-y-6">
          <div className="space-y-1">
            <div className="text-lg font-semibold">Amount: ${amount.toFixed(2)}</div>
            <div className="text-muted-foreground text-sm">You'll be charged once you submit this form.</div>
          </div>
          <PaymentElement id="payment-element" options={{
            layout: {
              type: 'tabs',
              defaultCollapsed: false
            }
          }} />
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          form="payment-form" 
          disabled={!stripe || isProcessing}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isProcessing ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface CheckoutPageProps {
  productId?: string;
}

export default function CheckoutPage({ productId = "default" }: CheckoutPageProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [productData, setProductData] = useState({
    amount: 299,
    name: "Marketing Strategy Session",
    description: "One hour strategic consultation with our marketing experts",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Predefined product options (in a real app, these would come from a database)
  const products = {
    "strategy-call": {
      amount: 299,
      name: "Marketing Strategy Session",
      description: "One hour strategic consultation with our marketing experts",
    },
    "content-audit": {
      amount: 499,
      name: "Content Marketing Audit",
      description: "Comprehensive analysis of your current content marketing strategy",
    },
    "ai-strategy": {
      amount: 999,
      name: "AI Marketing Strategy",
      description: "Custom AI-powered marketing strategy tailored to your business",
    },
    "full-package": {
      amount: 2499,
      name: "Full Marketing Package",
      description: "Complete marketing solution including strategy, content, and implementation",
    },
    "default": {
      amount: 299,
      name: "Marketing Strategy Session",
      description: "One hour strategic consultation with our marketing experts",
    }
  };

  useEffect(() => {
    // Find the selected product data or use default
    const selectedProduct = products[productId as keyof typeof products] || products.default;
    setProductData(selectedProduct);
    
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          amount: selectedProduct.amount,
          metadata: {
            product_name: selectedProduct.name,
            product_id: productId
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create payment intent");
        }
        
        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("No client secret returned");
        }
      } catch (error: any) {
        toast({
          title: "Payment Setup Failed",
          description: error.message || "Could not initialize payment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [productId, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20 px-4 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="mb-10 text-center">
            <CortexuumLogo variant="default" size="lg" showText />
            <h1 className="text-3xl font-bold mt-4 mb-2">Secure Checkout</h1>
            <p className="text-gray-600">Complete your purchase securely with Stripe</p>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg">Setting up payment...</p>
            </div>
          ) : !clientSecret ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-red-600">Payment Setup Failed</h2>
              <p className="mt-2">Please refresh the page or try again later.</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
              <CheckoutForm 
                amount={productData.amount} 
                description={productData.description}
              />
            </Elements>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}