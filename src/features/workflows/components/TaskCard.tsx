import { User, Calendar, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-background rounded-lg border border-border p-4 shadow-sm hover:shadow-medium transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-foreground">{task.title}</h4>
        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        {task.assignee && (
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {task.assignee}
          </div>
        )}
        
        {task.dueDate && (
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;