import { useState } from 'react';
import { Redirect } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const { user, loginMutation, registerMutation } = useAuth();
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  // If user is already logged in, redirect to the admin page
  if (user) {
    return <Redirect to="/leads" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div className="flex flex-col justify-center">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                VibeMarketingAgency.ai
              </CardTitle>
              <CardDescription>
                Sign in to access your admin dashboard and analytics
              </CardDescription>
            </CardHeader>
            <Tabs value={tab} onValueChange={(value) => setTab(value as 'login' | 'register')}>
              <CardContent>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Sign In
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Create a username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Create a password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Create Account
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </CardContent>
            </Tabs>
            <CardFooter className="block text-center text-sm text-muted-foreground">
              <p>
                {tab === 'login' 
                  ? "Don't have an account? Click Register above." 
                  : "Already have an account? Click Login above."}
              </p>
            </CardFooter>
          </Card>
        </div>
        
        <div className="bg-primary rounded-lg p-8 flex flex-col justify-center hidden md:block">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">VibeMarketingAgency.ai</h2>
            <h3 className="text-xl font-semibold mb-6">Admin Dashboard</h3>
            <p className="mb-4">
              Welcome to your secure admin dashboard where you can:
            </p>
            <ul className="space-y-2 list-disc pl-5 mb-6">
              <li>Track and manage lead conversions</li>
              <li>Monitor the lead lifecycle</li>
              <li>Configure marketing integrations</li>
              <li>Access analytics and performance reports</li>
              <li>Customize AI chatbot responses</li>
              <li>View campaign effectiveness metrics</li>
            </ul>
            <p className="mb-2">
              Sign in to access all these features and optimize your marketing efforts.
            </p>
            <p className="text-sm opacity-80 mt-4">
              For security reasons, this portal is restricted to authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;