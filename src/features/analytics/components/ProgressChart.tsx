import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Mock data for progress chart
const progressData = [
  { date: 'Week 1', progress: 30 },
  { date: 'Week 2', progress: 45 },
  { date: 'Week 3', progress: 60 },
  { date: 'Week 4', progress: 75 },
  { date: 'Week 5', progress: 85 },
  { date: 'Week 6', progress: 95 },
];

// Mock data for department distribution
const departmentData = [
  { name: 'Engineering', value: 35 },
  { name: 'Marketing', value: 20 },
  { name: 'Sales', value: 25 },
  { name: 'HR', value: 10 },
  { name: 'Finance', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ProgressChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Progress Over Time */}
      <div className="bg-background rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Onboarding Progress Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#3b82f6" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Department Distribution */}
      <div className="bg-background rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Department Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;