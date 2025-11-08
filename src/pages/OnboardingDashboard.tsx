import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  FileText, 
  Calendar, 
  Award, 
  Building, 
  UserCheck,
  ChevronRight,
  Plus,
  Search,
  Workflow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

// ... rest of the code remains the same ...
const OnboardingDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for onboarding progress
  const onboardingProgress = {
    completed: 8,
    total: 12,
    percentage: 67
  };

  // Mock data for upcoming tasks
  const upcomingTasks = [
    {
      id: 1,
      title: "Complete HR paperwork",
      dueDate: "Today",
      category: "Documentation",
      priority: "High"
    },
    {
      id: 2,
      title: "Schedule IT setup",
      dueDate: "Tomorrow",
      category: "Operations",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Review company policies",
      dueDate: "In 3 days",
      category: "Learning",
      priority: "Low"
    }
  ];

  // Mock data for onboarding modules
  const modules = [
    {
      id: 1,
      title: "Company Overview",
      description: "Learn about our mission, vision, and values",
      progress: 100,
      icon: Building,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Your Team",
      description: "Get to know your colleagues and manager",
      progress: 75,
      icon: Users,
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Policies & Procedures",
      description: "Understand company rules and guidelines",
      progress: 40,
      icon: FileText,
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Tools & Resources",
      description: "Get access to software and systems",
      progress: 20,
      icon: BookOpen,
      color: "bg-orange-500"
    }
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      title: "Welcome packet downloaded",
      time: "2 hours ago",
      icon: FileText,
      type: "completed"
    },
    {
      id: 2,
      title: "Company overview completed",
      time: "1 day ago",
      icon: Building,
      type: "completed"
    },
    {
      id: 3,
      title: "IT setup scheduled",
      time: "2 days ago",
      icon: Calendar,
      type: "scheduled"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Welcome to DocuAI Onboarding
              </h1>
              <p className="text-lg text-muted-foreground">
                Your journey to becoming a DocuAI expert starts here
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <UserCheck className="mr-2 h-5 w-5" />
                Day 15 of Onboarding
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-medium transition-smooth cursor-pointer">
            <Link to="/dashboard">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Dashboard
                </CardTitle>
                <CardDescription>
                  View your onboarding progress and tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">Go to Dashboard</Button>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover:shadow-medium transition-smooth cursor-pointer">
            <Link to="/documents">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Documents
                </CardTitle>
                <CardDescription>
                  Access company policies and resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">View Documents</Button>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover:shadow-medium transition-smooth cursor-pointer">
            <Link to="/workflows">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Workflow className="mr-2 h-5 w-5" />
                  Workflows
                </CardTitle>
                <CardDescription>
                  Track onboarding tasks and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">View Workflows</Button>
              </CardContent>
            </Link>
          </Card>
        </div>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Onboarding Progress</span>
                <Badge variant="outline">{onboardingProgress.completed}/{onboardingProgress.total} completed</Badge>
              </CardTitle>
              <CardDescription>
                Track your progress through the onboarding journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full bg-secondary rounded-full h-4">
                  <div 
                    className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${onboardingProgress.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>{onboardingProgress.percentage}%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <p className="font-medium">Completed</p>
                    <p className="text-sm text-muted-foreground">8 tasks</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <div>
                    <p className="font-medium">In Progress</p>
                    <p className="text-sm text-muted-foreground">2 tasks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>
                What you need to do next
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{task.title}</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="text-xs mr-2">
                          {task.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Learning Modules */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Learning Modules</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules..."
                className="pl-10 w-64"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card key={module.id} className="hover:shadow-medium transition-smooth">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className={`${module.color} h-2 rounded-full`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                      <Button className="w-full mt-4" variant={module.progress === 100 ? "outline" : "default"}>
                        {module.progress === 100 ? "Review" : "Continue"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest onboarding milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant={activity.type === "completed" ? "default" : "secondary"}>
                        {activity.type}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>
                Helpful tools and contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <Award className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Employee Handbook</p>
                    <p className="text-sm text-muted-foreground">Essential policies and procedures</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <Users className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Org Chart</p>
                    <p className="text-sm text-muted-foreground">Meet your team and leadership</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <Calendar className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Schedule Meeting</p>
                    <p className="text-sm text-muted-foreground">Book time with your manager</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">IT Support</p>
                    <p className="text-sm text-muted-foreground">Get help with tools and setup</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OnboardingDashboard;