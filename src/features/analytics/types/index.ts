export interface ProgressDataPoint {
  date: string;
  value: number;
}

export interface StatsCardData {
  title: string;
  value: string;
  change: number;
  icon: string;
}

export interface ReportData {
  id: string;
  title: string;
  description: string;
  data: ProgressDataPoint[];
  createdAt: string;
}