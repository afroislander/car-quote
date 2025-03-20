
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartDataItem {
  name: string;
  quotes: number;
}

interface QuotesChartProps {
  chartData: ChartDataItem[];
}

export function QuotesChart({ chartData }: QuotesChartProps) {
  return (
    <Card className="p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Weekly Quote Requests</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quotes" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
