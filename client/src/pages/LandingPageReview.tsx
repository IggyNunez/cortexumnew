import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ArrowRight, Target, Zap, X, Search, MessageSquare, Shield } from "lucide-react";

const formSchema = z.object({
  website_url: z.string().url("Please enter a valid URL"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  page_goal: z.string().min(1, "Please select a goal"),
  target_audience: z.string().min(10, "Please describe your target audience"),
  offer_description: z.string().min(10, "Please describe your offer"),
  why_right_choice: z.string().min(20, "Please explain why you're the right choice"),
  common_objections: z.string().optional(),
  monthly_traffic: z.string().min(1, "Please select your traffic range"),
});

type FormData = z.infer<typeof formSchema>;

export default function LandingPageReview() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website_url: "",
      name: "",
      email: "",
      phone: "",
      page_goal: "",
      target_audience: "",
      offer_description: "",
      why_right_choice: "",
      common_objections: "",
      monthly_traffic: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/page-reviews", { ...data, source: "linkedin_outreach" });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Request submitted",
        description: "We'll review your page and get back to you shortly.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Request Received | vibeagency.ai Landing Page Review</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
          <div className="max-w-xl text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Thanks — we'll review your responses.
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              If a walkthrough would be valuable, you'll hear from us shortly.
              <br />
              If not, we'll still share any clarity we uncover.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Return to homepage
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Free Landing Page Review | Fix Conversion Leaks | vibeagency.ai</title>
        <meta
          name="description"
          content="Your marketing isn't broken. Your landing page is. Get a free conversion audit to find where leads are leaking and what to fix first. No sales pitch."
        />
        <meta property="og:title" content="Free Landing Page Review | vibeagency.ai" />
        <meta
          property="og:description"
          content="Before spending more on ads, content, or traffic — we'll show you where conversion is leaking and what to fix first."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://vibeagency.ai/landing-page-review" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your marketing isn't broken.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Your landing page is.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
              Before spending more on ads, content, or traffic — we'll show you where conversion is leaking and what to fix first.
            </p>
            <a
              href="#form"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
            >
              <span>👉</span> Request a Landing Page Review
            </a>
            <p className="text-slate-400 mt-4 text-sm">
              No sales pitch. If we see a clear opportunity, we'll show you.
            </p>
          </div>
        </section>

        {/* Section 2: The Problem */}
        <section className="py-20 px-4 border-t border-slate-800/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              We'll show you what you've been missing.
            </h2>
            <div className="text-lg text-slate-300 space-y-4 leading-relaxed">
              <p>Traffic doesn't disappear.</p>
              <p>Attention doesn't vanish.</p>
              <p className="text-cyan-400 font-medium">
                It leaks — quietly — at specific points most founders never see.
              </p>
              <p className="pt-4">
                We'll surface those points and show you how your page should guide decisions instead of forcing them.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: What Happens After */}
        <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
              What happens after you submit
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  We review your page + responses
                </h3>
                <p className="text-slate-400">
                  We're not looking for flaws — we're looking for friction.
                </p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  We draft an optimized page direction
                </h3>
                <p className="text-slate-400">
                  This may include a revised hero, CTA flow, page structure, and messaging hierarchy.
                </p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Clear next steps (if it makes sense)
                </h3>
                <p className="text-slate-400">
                  If it makes sense to implement together, we'll outline next steps. If not, you'll still have clarity you can act on.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: What We Evaluate */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
              What we evaluate
            </h2>
            <p className="text-slate-400 text-center mb-12 text-lg">
              Beyond surface-level design
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <Target className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Message-to-market alignment</h3>
                <p className="text-slate-400 text-sm">Does your messaging resonate with your target audience?</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <Zap className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Conversion flow & cognitive friction</h3>
                <p className="text-slate-400 text-sm">Where are visitors dropping off and why?</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <MessageSquare className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Offer clarity & CTA sequencing</h3>
                <p className="text-slate-400 text-sm">Is your value proposition crystal clear?</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <Shield className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Trust signals & objection handling</h3>
                <p className="text-slate-400 text-sm">Are you addressing concerns before they arise?</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 md:col-span-2 lg:col-span-2">
                <Search className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">AI SEO + traditional SEO structure</h3>
                <p className="text-slate-400 text-sm">Ensuring your page is optimized for both human decision-making and modern search behavior.</p>
              </div>
            </div>
            <p className="text-slate-400 text-center mt-10 max-w-2xl mx-auto">
              High-converting pages today need to speak clearly to people and be structured for how search engines now interpret intent.
            </p>
          </div>
        </section>

        {/* Section 5: Who This Is For */}
        <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
              Is this a fit?
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                  <Check className="w-6 h-6" /> This is for founders who:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Are already driving traffic</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Believe in their offer</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Feel conversions lag behind attention</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Want clarity, not gimmicks</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-400 mb-6 flex items-center gap-2">
                  <X className="w-6 h-6" /> This is not for:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-slate-400">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Early-stage idea validation</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-400">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Businesses without existing traffic</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-400">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Anyone looking for "free work" with no intent</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Form */}
        <section id="form" className="py-20 px-4 scroll-mt-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Start with the form.
            </h2>
            <p className="text-xl text-slate-400 text-center mb-12">
              We'll take it from there.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="website_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Website or landing page URL *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yoursite.com/landing-page"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-slate-500">Link the page you're currently driving traffic to.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                            {...field}
                          />
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
                        <FormLabel className="text-white">Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@company.com"
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Phone number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="page_goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Primary goal of this page *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                            <SelectValue placeholder="Select a goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="book_call">Book a call</SelectItem>
                          <SelectItem value="request_quote">Request a quote</SelectItem>
                          <SelectItem value="purchase">Purchase</SelectItem>
                          <SelectItem value="start_trial">Start a trial</SelectItem>
                          <SelectItem value="join_list">Join a list</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="target_audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Who is this page primarily for? *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Role, awareness level, or situation"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offer_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Describe your offer in one sentence — no buzzwords *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="We help [audience] achieve [outcome] by [method]"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="why_right_choice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Why do you believe you're the right choice? *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What makes your approach different or better?"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="common_objections"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">What objections do you hear most before someone buys or books?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Price concerns, timing issues, trust barriers, etc."
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monthly_traffic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Approximate monthly traffic to this page *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                            <SelectValue placeholder="Select traffic range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="under_1k">&lt;1k visitors</SelectItem>
                          <SelectItem value="1k_5k">1–5k visitors</SelectItem>
                          <SelectItem value="5k_20k">5–20k visitors</SelectItem>
                          <SelectItem value="over_20k">20k+ visitors</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white font-semibold py-6 text-lg rounded-xl"
                >
                  {mutation.isPending ? "Submitting..." : "Request Your Page Review"}
                </Button>
              </form>
            </Form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-slate-800/50">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} vibeagency.ai — AI-Powered Marketing Intelligence
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}