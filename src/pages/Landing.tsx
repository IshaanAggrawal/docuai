import { Link } from "react-router-dom";
import { Bot, MessageSquare, Shield, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const Landing = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Ask Anything",
      description: "Get instant answers from your company's documentation, wikis, and knowledge base.",
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your data stays within your organization. Enterprise-grade security and privacy.",
    },
    {
      icon: Zap,
      title: "Powered by AI",
      description: "Advanced AI understands context and provides accurate, relevant answers instantly.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Bot className="h-16 w-16 text-primary" />
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-6">
              <span className="text-gradient">DocuAI</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Instant answers from your company's knowledge base.
            </p>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Stop searching through endless documents. Ask DocuAI anything about your company's 
              policies, procedures, and knowledge – and get accurate answers in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="gradient-primary shadow-medium hover:shadow-large transition-smooth text-lg px-8 py-4">
                  Try Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-accent transition-smooth">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to find answers fast
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              DocuAI transforms how your team accesses and uses company knowledge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 text-center hover:shadow-medium transition-smooth border-border hover:border-primary/20"
              >
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teams using DocuAI to unlock their company knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button size="lg" className="gradient-primary shadow-medium hover:shadow-large transition-smooth text-lg px-8 py-4">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-background transition-smooth">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;