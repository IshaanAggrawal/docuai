import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  User, 
  Calendar,
  Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WorkflowColumn from "../components/WorkflowColumn";
import TaskCard from "../components/TaskCard";

const WorkflowBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  // Mock data for workflow columns
  const columns = [
    {
      id: "todo",
      title: "To Do",
      taskIds: ["1", "2", "3"]
    },
    {
      id: "in-progress",
      title: "In Progress",
      taskIds: ["4", "5"]
    },
    {
      id: "review",
      title: "Review",
      taskIds: ["6"]
    },
    {
      id: "done",
      title: "Done",
      taskIds: ["7", "8", "9"]
    }
  ];

  // Mock data for tasks
  const tasks = {
    "1": {
      id: "1",
      title: "Create employee handbook",
      description: "Draft the comprehensive employee handbook covering policies and procedures",
      status: "todo",
      priority: "high",
      assignee: "Sarah Johnson",
      dueDate: "2023-11-15",
      tags: ["documentation", "hr"]
    },
    "2": {
      id: "2",
      title: "Set up IT equipment",
      description: "Configure laptop, email, and software access for new hires",
      status: "todo",
      priority: "medium",
      assignee: "Mike Chen",
      dueDate: "2023-11-10",
      tags: ["it", "onboarding"]
    },
    "3": {
      id: "3",
      title: "Schedule orientation meeting",
      description: "Arrange initial meeting with HR and team leads",
      status: "todo",
      priority: "low",
      assignee: "Emma Davis",
      dueDate: "2023-11-12",
      tags: ["meeting", "hr"]
    },
    "4": {
      id: "4",
      title: "Prepare benefits enrollment",
      description: "Set up benefits portal access and enrollment materials",
      status: "in-progress",
      priority: "high",
      assignee: "Robert Kim",
      dueDate: "2023-11-08",
      tags: ["benefits", "hr"]
    },
    "5": {
      id: "5",
      title: "Review onboarding checklist",
      description: "Ensure all onboarding steps are properly documented",
      status: "in-progress",
      priority: "medium",
      assignee: "Lisa Wang",
      dueDate: "2023-11-14",
      tags: ["documentation", "qa"]
    },
    "6": {
      id: "6",
      title: "Conduct team introductions",
      description: "Facilitate introductions between new hire and team members",
      status: "review",
      priority: "medium",
      assignee: "David Brown",
      dueDate: "2023-11-09",
      tags: ["team", "onboarding"]
    },
    "7": {
      id: "7",
      title: "Complete compliance training",
      description: "Finish mandatory compliance and security training modules",
      status: "done",
      priority: "high",
      assignee: "Jennifer Lee",
      dueDate: "2023-11-01",
      tags: ["training", "compliance"]
    },
    "8": {
      id: "8",
      title: "Submit tax forms",
      description: "Collect and process tax documentation from new employees",
      status: "done",
      priority: "high",
      assignee: "Thomas Wright",
      dueDate: "2023-11-03",
      tags: ["finance", "hr"]
    },
    "9": {
      id: "9",
      title: "Activate email accounts",
      description: "Set up and verify email accounts for all new hires",
      status: "done",
      priority: "medium",
      assignee: "Patricia Miller",
      dueDate: "2023-11-02",
      tags: ["it", "communication"]
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workflow Board</h1>
          <p className="text-muted-foreground">Manage onboarding tasks and progress</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => setShowNewTaskForm(!showNewTaskForm)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="pl-10"
          />
        </div>
        <div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Workflow Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <WorkflowColumn 
            key={column.id} 
            column={column} 
            tasks={column.taskIds.map(id => tasks[id])}
          />
        ))}
      </div>

      {/* New Task Form */}
      {showNewTaskForm && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Task Title</label>
                <Input placeholder="Enter task title" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input placeholder="Enter task description" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Assignee</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Assign to..." className="pl-10" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-10" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <div className="relative">
                    <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewTaskForm(false)}>
                  Cancel
                </Button>
                <Button>
                  Create Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkflowBoard;