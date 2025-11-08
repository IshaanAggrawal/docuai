import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
  description: string;
}

const StatsCard = ({ title, value, change, icon, description }: StatsCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-background rounded-lg border border-border p-6 hover:shadow-medium transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <p className={`text-sm mt-2 flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span>{isPositive ? '↑' : '↓'} {Math.abs(change)}%</span>
            <span className="ml-2 text-muted-foreground">from last month</span>
          </p>
        </div>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-4">{description}</p>
    </div>
  );
};

export default StatsCard;