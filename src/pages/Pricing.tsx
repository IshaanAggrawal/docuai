import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 team members",
        "1,000 queries per month",
        "Basic document integration",
        "Email support",
        "30-day history",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "For growing teams with advanced needs",
      features: [
        "Up to 25 team members",
        "10,000 queries per month",
        "Advanced integrations",
        "Priority support",
        "Unlimited history",
        "Custom AI training",
        "Analytics dashboard",
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with custom requirements",
      features: [
        "Unlimited team members",
        "Unlimited queries",
        "All integrations",
        "24/7 phone support",
        "Custom deployment",
        "SSO & advanced security",
        "Dedicated success manager",
        "Custom AI models",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "How does the free trial work?",
      answer: "Start with a 14-day free trial of our Professional plan. No credit card required.",
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "What integrations are supported?",
      answer: "We support Notion, Confluence, Google Docs, SharePoint, and many more. Custom integrations available for Enterprise plans.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and never share your data with third parties.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your team. Start with a free trial, no credit card required.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative transition-smooth hover:shadow-large ${
                  plan.popular 
                    ? 'border-primary shadow-medium scale-105' 
                    : 'border-border hover:border-primary/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-primary text-primary-foreground px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <CardDescription className="mt-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full ${
                      plan.buttonVariant === 'default' 
                        ? 'gradient-primary shadow-medium hover:shadow-large' 
                        : ''
                    } transition-smooth`}
                    variant={plan.buttonVariant}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to transform your team's productivity?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of teams using DocuAI to unlock their company knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary shadow-medium hover:shadow-large transition-smooth">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="hover:bg-accent transition-smooth">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;