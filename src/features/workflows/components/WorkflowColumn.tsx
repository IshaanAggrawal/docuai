import { Badge } from "@/components/ui/badge";
import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface WorkflowColumnProps {
  column: Column;
  tasks: Task[];
}

const WorkflowColumn = ({ column, tasks }: WorkflowColumnProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'review': return 'bg-purple-500';
      case 'done': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-accent rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(column.id)} mr-2`}></div>
          <h3 className="font-semibold text-foreground">{column.title}</h3>
        </div>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default WorkflowColumn;