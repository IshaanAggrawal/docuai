import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react";
import StatsCard from "../components/StatsCard";
import ProgressChart from "../components/ProgressChart";

const Reports = () => {
  // Mock data for stats cards
  const statsData = [
    {
      title: "Total Employees",
      value: "142",
      change: 12,
      icon: <Users className="h-6 w-6 text-primary" />,
      description: "Active employees in the organization"
    },
    {
      title: "Completion Rate",
      value: "84%",
      change: 8,
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      description: "Average onboarding completion rate"
    },
    {
      title: "Avg. Time to Productivity",
      value: "28 days",
      change: -5,
      icon: <Clock className="h-6 w-6 text-primary" />,
      description: "Average time to reach full productivity"
    },
    {
      title: "Engagement Score",
      value: "4.2/5",
      change: 15,
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      description: "Average employee engagement rating"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground">Track onboarding progress and engagement metrics</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>
      
      {/* Charts */}
      <ProgressChart />
      
      {/* Additional Reports */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { user: "Alex Johnson", action: "completed onboarding", time: "2 hours ago" },
              { user: "Maria Garcia", action: "uploaded documents", time: "5 hours ago" },
              { user: "David Smith", action: "scheduled meeting", time: "1 day ago" },
              { user: "Sarah Williams", action: "completed training", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-background rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Milestones</h3>
          <div className="space-y-4">
            {[
              { title: "Quarterly Review", date: "Nov 15, 2023", progress: 75 },
              { title: "Policy Updates", date: "Dec 1, 2023", progress: 30 },
              { title: "Benefits Enrollment", date: "Dec 15, 2023", progress: 10 },
            ].map((milestone, index) => (
              <div key={index} className="py-2 border-b border-border last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{milestone.title}</p>
                  <span className="text-sm text-muted-foreground">{milestone.date}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;