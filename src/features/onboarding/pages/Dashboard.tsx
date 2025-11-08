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
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const onboardingProgress = {
    completed: 8,
    total: 12,
    percentage: 67
  };

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>
      
      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Dashboard;