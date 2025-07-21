import { useState } from "react";
import { Search, Book, Code, Settings, Zap, ChevronRight, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sections = [
    {
      title: "Getting Started",
      icon: Zap,
      description: "Quick start guide to set up DocuAI",
      items: [
        { title: "Installation", description: "Set up DocuAI in your organization", time: "5 min" },
        { title: "First Steps", description: "Connect your first knowledge source", time: "10 min" },
        { title: "Team Setup", description: "Invite team members and set permissions", time: "5 min" },
      ]
    },
    {
      title: "Integrations",
      icon: Settings,
      description: "Connect your existing tools and platforms",
      items: [
        { title: "Notion Integration", description: "Sync your Notion workspace", time: "15 min" },
        { title: "Confluence Setup", description: "Connect Confluence spaces", time: "10 min" },
        { title: "Google Docs", description: "Import Google Drive documents", time: "10 min" },
        { title: "SharePoint", description: "Integrate Microsoft SharePoint", time: "20 min" },
      ]
    },
    {
      title: "API Reference",
      icon: Code,
      description: "Integrate DocuAI into your applications",
      items: [
        { title: "Authentication", description: "API keys and authentication methods", time: "10 min" },
        { title: "Search API", description: "Programmatic search endpoints", time: "15 min" },
        { title: "Webhooks", description: "Real-time notifications and events", time: "20 min" },
        { title: "SDKs", description: "Official client libraries", time: "5 min" },
      ]
    },
    {
      title: "Advanced Features",
      icon: Book,
      description: "Maximize your DocuAI experience",
      items: [
        { title: "Custom AI Training", description: "Train AI on your specific content", time: "30 min" },
        { title: "Analytics Dashboard", description: "Usage insights and metrics", time: "10 min" },
        { title: "Admin Controls", description: "User management and security", time: "15 min" },
        { title: "Enterprise Features", description: "SSO, compliance, and more", time: "25 min" },
      ]
    }
  ];

  const quickLinks = [
    { title: "API Status", href: "#", external: true },
    { title: "Changelog", href: "#", external: false },
    { title: "Support Center", href: "#", external: true },
    { title: "Community Forum", href: "#", external: true },
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0 || searchQuery === "");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Everything you need to get the most out of DocuAI
          </p>
          
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="pl-10 pr-4 py-3 text-lg shadow-medium transition-smooth focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-smooth text-sm"
                  >
                    <span className="text-muted-foreground">{link.title}</span>
                    {link.external ? (
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    )}
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {filteredSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item, itemIndex) => (
                      <Card
                        key={itemIndex}
                        className="group cursor-pointer transition-smooth hover:shadow-medium hover:border-primary/20"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                              {item.title}
                            </CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {item.time}
                            </Badge>
                          </div>
                          <CardDescription>
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="ghost" size="sm" className="group-hover:bg-accent transition-smooth">
                            Read More
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
              
              {filteredSections.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No results found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or browse the categories above.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <section className="py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Need more help?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our support team is here to help you succeed with DocuAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary shadow-medium hover:shadow-large transition-smooth">
              Contact Support
            </Button>
            <Button variant="outline" size="lg" className="hover:bg-background transition-smooth">
              Join Community
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Docs;